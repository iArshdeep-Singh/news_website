import {Link} from "react-router-dom"
import "./css/about.css"


const About = () => {

    const auth = localStorage.getItem("auth")

    return (
        <>
            <div id="about-container">
                <h1>About <span>Us</span></h1>
                <div>
                    <h2>Who we are?</h2>
                    <p>&#x275d;Stay informed and engaged with our comprehensive news coverage. From global affairs to loal happenings, technology advancements to cultural trends, our dedicated team of journalists delivers timely and accurate information. With a commitment to journalistic integrity and a passion for storytelling, we bring you the stories that matter most. Join us as we navigate the ever-evolving landscape of news, providing insights and updates to keep you in the know.&#x275e;</p>

                    {!auth ? <Link to='/intro'><button id="about-back">&#8592;</button></Link> : <></>}
                </div>
            </div>
        </>
    )
}

export default About