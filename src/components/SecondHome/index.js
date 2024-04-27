import {Component} from 'react'
import {ThreeDots} from 'react-loader-spinner'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import Products from '../Products'
import Category from '../Category'
import Footer from '../Footer'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Home extends Component {
  state = {
    categories: [],
    selectedCategory: null,
    isLoading: true,
    error: null,
    productQuantities: {},
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.fetchData()
  }

  fetchData = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const jwtToken = Cookies.get('jwt_Token')
    const url = 'https://run.mocky.io/v3/947e05e1-cd6a-4af9-93e7-0727fba9fec4'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken},`,
      },
    }
    try {
      const response = await fetch(url, options)
      const data = await response.json()
      this.setState({categories: data.categories})
    } catch (err) {
      this.setState({error: err.message})
    } finally {
      this.setState({isLoading: false})
    }
    this.setState({
      apiStatus: apiStatusConstants.success,
    })
  }

  handleCategoryClick = async category => {
    this.setState({isLoading: true})
    try {
      const delay = ms => new Promise(res => setTimeout(res, ms))
      await delay(1000)
      this.setState({selectedCategory: category})
    } catch (err) {
      this.setState({error: err.message})
    } finally {
      this.setState({isLoading: false})
    }
  }

  handleIncrement = productId => {
    this.setState(prevState => ({
      productQuantities: {
        ...prevState.productQuantities,
        [productId]: (prevState.productQuantities[productId] || 0) + 1,
      },
    }))
  }

  handleDecrement = productId => {
    this.setState(prevState => ({
      productQuantities: {
        ...prevState.productQuantities,
        [productId]: Math.max(
          (prevState.productQuantities[productId] || 1) - 1,
          0,
        ),
      },
    }))
  }

  getContent = () => {
    const {isLoading, error, selectedCategory, categories, productQuantities} =
      this.state
    if (isLoading) {
      return (
        <div className="spinner-container">
          <ThreeDots
            visible
            height="80"
            width="80"
            color="#4fa94d"
            radius="9"
            ariaLabel="three-dots-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />
        </div>
      )
    }

    if (error) {
      return <h2>Error: {error}</h2>
    }

    return (
      <>
        {selectedCategory === null ? (
          <h2>All Products</h2>
        ) : (
          <h2>{selectedCategory.name}</h2>
        )}
        <ul className="product-list">
          {selectedCategory === null
            ? categories.map(category => (
                <div key={category.name} className="category-group">
                  <h2>{category.name}</h2>
                  <div className="home-fixer">
                    {category.products.map(product => (
                      <li key={product.id} className="product-item">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="img"
                        />
                        <div className="product-details">
                          <div className="info">
                            <p className="pname">{product.name}</p>
                            <p className="pweight">{product.weight}</p>
                            <p className="pro-price">{product.price}</p>
                          </div>
                          {productQuantities[product.id] ? (
                            <div className="quantity-controls">
                              <button
                                type="button"
                                className="add-button-card"
                                onClick={() => this.handleDecrement(product.id)}
                              >
                                -
                              </button>
                              <span className="quantity">
                                {productQuantities[product.id]}
                              </span>
                              <button
                                type="button"
                                className="add-button-card"
                                onClick={() => this.handleIncrement(product.id)}
                              >
                                +
                              </button>
                            </div>
                          ) : (
                            <button
                              type="button"
                              id="add-button-card"
                              onClick={() => this.handleIncrement(product.id)}
                            >
                              Add
                            </button>
                          )}
                        </div>
                      </li>
                    ))}
                  </div>
                </div>
              ))
            : selectedCategory.products.map(product => (
                <li key={product.id} className="product-item">
                  <img src={product.image} alt={product.name} className="img" />
                  <div className="product-details">
                    <div className="info">
                      <p className="pname">{product.name}</p>
                      <p className="pweight">{product.weight}</p>
                      <p className="pro-price">{product.price}</p>
                    </div>
                    {productQuantities[product.id] ? (
                      <div className="quantity-controls">
                        <button
                          type="button"
                          className="add-button-card"
                          onClick={() => this.handleDecrement(product.id)}
                        >
                          -
                        </button>
                        <span className="quanter">
                          {productQuantities[product.id]}
                        </span>
                        <button
                          type="button"
                          className="add-button-card"
                          onClick={() => this.handleIncrement(product.id)}
                        >
                          +
                        </button>
                      </div>
                    ) : (
                      <button
                        type="button"
                        id="add-button-card"
                        onClick={() => this.handleIncrement(product.id)}
                      >
                        Add
                      </button>
                    )}
                  </div>
                </li>
              ))}
        </ul>
        <hr />
      </>
    )
  }

  renderCategoryButtons = () => {
    const {selectedCategory, categories} = this.state

    return (
      <ul className="sidebar-list">
        <li key="all-products">
          <button
            type="button"
            className={`buttonsy ${selectedCategory === null ? 'pk' : ''}`}
            onClick={() => this.handleCategoryClick(null)}
          >
            All Products
          </button>
        </li>
        {categories.map(category => (
          <li key={category.name}>
            <button
              type="button"
              className={`buttonsy ${
                selectedCategory?.name === category.name ? 'pk' : ''
              }`}
              onClick={() => this.handleCategoryClick(category)}
            >
              {category.name}
            </button>
          </li>
        ))}
      </ul>
    )
  }

  render() {
    return (
      <div className="content">
        <div className="main-sidebar">
          <div className="sidebar">
            <h2 className="categories">Categories</h2>
            {this.renderCategoryButtons()}
          </div>
        </div>
        <div className="main-content">{this.getContent()}</div>
      </div>
    )
  }
}

export default Home
