import {Link} from "react-router-dom"
import "./css/help.css"

const Help = () => {

    const auth = localStorage.getItem("auth")

    return (
        <>
            <div id="help-container">
                <h1><span>Help</span> Center</h1>
                <div>
                    <h2>Your Source for Assistance and Information.</h2>
                    <p>&#x275d;Welcome to our Help Center! Here you'll find answers to frequently asked questions, assistance with navigating our website, and support for any issues you may encounter. Our goal is to ensure your experience with us is seamless and enjoyable.&#x275e;</p>

                    {!auth ? <Link to='/intro'><button id="help-back">&#8592;</button></Link> : <></>}
                </div>
            </div>
        </>
    )
}

export default Help