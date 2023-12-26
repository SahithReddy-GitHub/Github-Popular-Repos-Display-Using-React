import './index.css'

const LanguageFilterItem = props => {
  const {langData, activeId, onClickLang} = props
  const {id, language} = langData

  const extraClass = id === activeId ? 'extra-custom' : ''

  const onLang = () => {
    onClickLang(id)
  }

  return (
    <li>
      <button type="button" className={`btn ${extraClass}`} onClick={onLang}>
        {language}
      </button>
    </li>
  )
}

export default LanguageFilterItem
