import {useEffect} from 'react'
import {Link} from 'react-router-dom'
import N from '../N'
import './css/intro.css'


const Intro = () => {

    const date = new Date()
    const year = date.getFullYear()


    useEffect(() => {
        if (!localStorage.getItem('hashReloaded'))
        {
            localStorage.setItem('hashReloaded', 'true')
            window.location.reload()
        } else
        {
            localStorage.removeItem('hashReloaded')
        }
    }, [])


    return (
        <>
            <div id="intro-body">
                <main id='intro-main'>
                    <div id='color'>
                        <h1>News</h1>
                        <p id>Stay informed with the latest headlines, breaking news, and in-depth analysis from around the globe. Whether you're interested in politics, technology, sports, or culture, we've got you covered.</p>
                    </div>
                    <div id='intro-maiin'>
                        <span id='logo-area'><N /></span>
                        <div>
                            <p>Join us and become part of a vibrant community of informed citizens. Gain access to exclusive content, engage in lively discussions with fellow readers, and stay ahead of the curve with our comprehensive coverage. With our commitment to quality journalism and dedication to keeping you informed, this website is your essential source for staying connected to the world. Don't miss out - join us today and experience the difference firsthand.</p>
                            <Link to='/sign-up'><button>Get Started</button></Link>
                        </div>
                    </div>
                    <article>At NEWS, we are committed to delivering timely and reliable news coverage that empowers our readers to stay informed and engaged with the world around them. From local developments to international affairs, our dedicated team of journalists works tirelessly to provide comprehensive reporting on a wide range of topics, including politics, business, science, entertainment, and more.
                        With a focus on accuracy, objectivity, and integrity, we strive to present a diverse array of perspectives, ensuring that our readers receive a well-rounded understanding of complex issues. Our commitment to journalistic excellence extends beyond mere reporting; we also offer insightful analysis, thought-provoking commentary, and in-depth investigative pieces to help our audience navigate today's rapidly changing landscape.
                        Whether you're seeking breaking news updates, in-depth features, or thought-provoking opinion pieces, [News Website Name] is your trusted source for information and insight. Join us as we embark on a journey to uncover the stories that matter, spark meaningful conversations, and inspire positive change in our world.
                    </article>
                    <footer>
                        <div>
                            <Link to='/about'>About Us</Link>
                            <Link to='/contact'>Contact Us</Link>
                            <Link to='/help'>Help Center</Link>
                        </div>
                        <div>&copy; {year} News India</div>
                    </footer>
                </main>
            </div>
        </>
    )
}

export default Intro