import {Component} from 'react'
import Loader from 'react-loader-spinner'

import './index.css'
import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

class GithubPopularRepos extends Component {
  state = {
    activeId: languageFiltersData[0].id,
    isLoading: true,
    fetchedData: [],
  }

  componentDidMount = () => {
    this.fetchDataApi()
  }

  fetchDataApi = async () => {
    this.setState({isLoading: true, fetchedData: []})
    const {activeId} = this.state

    const url = `https://apis.ccbp.in/popular-repos?language=${activeId}`
    const options = {
      method: 'GET',
    }

    try {
      const response = await fetch(url, options)

      // Check if the response is successful (status code 200)
      if (response.ok) {
        const data = await response.json()
        const updatedData = data.popular_repos.map(eachData => ({
          avatarUrl: eachData.avatar_url,
          forksCount: eachData.forks_count,
          id: eachData.id,
          issuesCount: eachData.issues_count,
          name: eachData.name,
          starsCount: eachData.stars_count,
        }))
        this.setState({fetchedData: updatedData, isLoading: false})
      } else {
        // Handle error cases when the response is not successful
        console.error('Failed to fetch data')
        this.setState({isLoading: false})
      }
    } catch (error) {
      console.error('Error during fetch:', error.message)
      this.setState({isLoading: false})
    }
  }

  renderFetchedData = () => {
    const {fetchedData} = this.state

    if (fetchedData.length === 0) {
      return (
        <div className="wrong-card">
          <img
            src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
            alt="failure view"
            className="wrong-img"
          />
          <h1 className="wrong-head">Something Went Wrong</h1>
        </div>
      )
    }

    return (
      <ul className="cards-list">
        {fetchedData.map(each => (
          <RepositoryItem key={each.id} details={each} />
        ))}
      </ul>
    )
  }

  onClickLang = id => {
    this.setState({activeId: id}, this.fetchDataApi)
  }

  render() {
    const {isLoading, activeId} = this.state

    return (
      <div className="bg-custom">
        <div className="cona">
          <h1 className="main-head">Popular</h1>
          <ul className="lang-list">
            {languageFiltersData.map(eachLang => (
              <LanguageFilterItem
                key={eachLang.id}
                langData={eachLang}
                activeId={activeId}
                onClickLang={this.onClickLang}
              />
            ))}
          </ul>
          {isLoading ? (
            <div data-testid="loader">
              <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
            </div>
          ) : (
            this.renderFetchedData()
          )}
        </div>
      </div>
    )
  }
}

export default GithubPopularRepos
