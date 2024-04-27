import {Link, Redirect} from 'react-router-dom'

import Cookies from 'js-cookie'

import './index.css'

const EmptyCart = () => {
  const jwtToken = Cookies.get('jwt_token')
  if (jwtToken === undefined) {
    return <Redirect to="/login" />
  }
  return (
    <>
      <div className="cart-container">
        <img
          src="https://res.cloudinary.com/dqfqwre2q/image/upload/v1713688691/llogo-car_gg4zor.png"
          alt="empty cart"
          className="cart-img"
        />
        <h1 className="empty">Your cart is empty</h1>
        <Link to="/">
          <button type="button" className="shopty">
            Shop Now
          </button>
        </Link>
      </div>
    </>
  )
}

export default EmptyCart
