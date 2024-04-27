import CartContext from '../../context/CartContext'

import './index.css'

const CartSummary = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value
      let total = 0
      cartList.forEach(eachCartItem => {
        total += eachCartItem.price.replace('₹', '') * eachCartItem.quantity
      })

      return (
        <>
          <div className="cart-summary-container" data-testid="item-quantity">
            <h1 className="order-total-value">
              Total:({cartList.length} Items):
            </h1>
            <p data-testid="total-price">total order cost</p>
            <button type="button" className="checkout-button">
              Checkout
            </button>
          </div>
        </>
      )
    }}
  </CartContext.Consumer>
)

export default CartSummary
