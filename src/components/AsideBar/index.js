import './index.css'

const AsideBar = props => {
  const {changeShelve, bookshelvesList, bookshelfName} = props

  return (
    <div className="aside-conatiner">
      <h1 className="aside-heading">Bookshelves</h1>
      <ul className="book-shelves-list-small-device">
        {bookshelvesList.map(eachShelve => {
          const {value} = eachShelve
          const activeTab =
            eachShelve.value === bookshelfName ? 'active-tab-item' : 'tab-item'
          return (
            <li className="shleve-item" key={eachShelve.id}>
              <button
                type="button"
                key="label"
                className={activeTab}
                onClick={() => changeShelve(value)}
              >
                {eachShelve.label}
              </button>
            </li>
          )
        })}
      </ul>
      <ul className="book-shelves-list-large-device">
        {bookshelvesList.map(eachShelve => {
          const activeLink =
            eachShelve.value === bookshelfName ? 'active-tab-link' : 'tab-link'
          return (
            <li className="shleve-item-large" key={eachShelve.id}>
              <button
                type="button"
                className={activeLink}
                onClick={() => changeShelve(eachShelve.value)}
              >
                {eachShelve.label}
              </button>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
export default AsideBar
