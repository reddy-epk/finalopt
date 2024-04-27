import './index.css'

const NotFound = () => (
  <div className="main-container">
    <img
      src="https://res.cloudinary.com/dqfqwre2q/image/upload/v1713691571/not%20found.png"
      className="not-found"
      alt="not found"
    />
    <h1 className="head">Page Not Found</h1>
    <p className="para">
      We are sorry, the page you requested could not be found.
    </p>
  </div>
)

export default NotFound
