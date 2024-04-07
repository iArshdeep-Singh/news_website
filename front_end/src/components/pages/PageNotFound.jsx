import {useNavigate} from 'react-router-dom'
import './css/pageNotFound.css'

const PageNotFound = () => {

    const navigate = useNavigate()

    return (
        <div id="page-not-found">
            <h1>&#9760;</h1>
            <h1>Error <span>404</span></h1>
            <p>Page Not Found</p>
            <button onClick={() => navigate('/')}>Go Back</button>
        </div>
    )
}

export default PageNotFound