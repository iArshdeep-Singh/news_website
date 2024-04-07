import Layout from "../layout/Layout"
import {useSelector} from "react-redux"
import './css/request.css'
import {useNavigate} from "react-router-dom"


const RequestFailed = () => {

    const navigate = useNavigate()
    const {error} = useSelector(state => state.news)

    if (!error)
    {
        navigate('/')
    }

    return (
        <Layout>
            <div id="error-container">
                <h1>&#9888;</h1>
                <h1>Error <span>{error?.response?.status ? error?.response?.status : ":("}</span></h1>
                <p >{error?.message}</p>
                <p >{error?.response?.status ? 'Refresh Page & Try Again' : "Check Your Internet Connection & Refresh Once"}</p>
                <button style={error?.response?.status ? {} : {display: "none"}} onClick={() => navigate('/')}>Go Back</button>
            </div>
        </Layout>
    )
}

export default RequestFailed