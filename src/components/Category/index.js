import Categories from '../Categories'
import './index.css'

const Category = props => {
  const {details, updateActiveCategory, activeCategory} = props
  return (
    <div className="categories">
      <p>Categories</p>
      <button type="button" className="all-products">
        All products
      </button>
      {details.map(eachItem => (
        <Categories
          key={eachItem.name}
          categoryDetails={eachItem}
          updateActiveCategory={updateActiveCategory}
          isActive={eachItem.name === activeCategory}
        />
      ))}
    </div>
  )
}

export default Category
