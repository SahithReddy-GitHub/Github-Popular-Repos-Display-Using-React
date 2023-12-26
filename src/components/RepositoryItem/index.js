import './index.css'

const RepositoryItem = props => {
  const {details} = props
  const {avatarUrl, forksCount, starsCount, name, issuesCount} = details

  return (
    <li className="list-custom">
      <img src={avatarUrl} alt={name} className="img" />
      <h1 className="head">{name}</h1>
      <div className="card">
        <img
          src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
          alt="stars"
          className="card-img"
        />
        <p className="para">{starsCount}</p>
      </div>
      <div className="card">
        <img
          src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
          alt="forks"
          className="card-img"
        />
        <p className="para">{forksCount}</p>
      </div>
      <div className="card">
        <img
          src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
          alt="open issues"
          className="card-img"
        />
        <p className="para">{issuesCount}</p>
      </div>
    </li>
  )
}

export default RepositoryItem
