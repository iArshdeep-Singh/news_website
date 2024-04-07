import {Link} from "react-router-dom"
import "./css/contact.css"

const Contact = () => {

    const auth = localStorage.getItem("auth")

    return (
        <>
            <div id="contact-container">
                <h1>Contact <span>Us</span></h1>
                <div>
                    <h2>Contact any time.</h2>
                    <p id="phone"><span>&#9742;</span> +91 75270 70361</p>
                    <a id="mail" href="apsingh.hans@gmail.com"><span>&#128231;</span> apsingh.hans@gmail.com</a>
                    <p id="description">Have a news tip or a story you think we should cover? <br />Reach out to us!
                        <br />&#x275d;Your trusted source for timely news and insightful reporting. Stay informed with our diverse coverage of global events, technology, culture, and more. Join us in exploring the world's stories.&#x275e;</p>

                    {!auth ? <Link to='/intro'><button id="contact-back">&#8592;</button></Link> : <></>}
                </div>
            </div>
        </>
    )
}

export default Contact