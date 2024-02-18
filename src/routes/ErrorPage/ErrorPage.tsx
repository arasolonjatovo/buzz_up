import { useRouteError, Link } from 'react-router-dom'
import './ErrorPage.scss'

export default function ErrorPage() {
  const error = useRouteError()
  console.error(error)

  return (
    <div id="error-page">
      <div className="content-wrapper">
        <div className="text-container">
          <h1>Oops!</h1>
          <p>Sorry, an unexpected error has occurred.</p>
          <p>Error code : 404</p>
          <p>Here is a link to be helpful for you :</p>
          <Link className="link" to="/todo">
            GO BACK TO HOME
          </Link>
        </div>
        <div className="image-container">
          <img
            src="https://www.pokepedia.fr/images/4/44/Psykokwak-RFVF.png"
            alt="Psykokwak"
          />
        </div>
      </div>
    </div>
  )
}
