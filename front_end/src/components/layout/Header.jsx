import {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Link, useNavigate} from 'react-router-dom'
import {switchLink, newsData, handleSearch, handleSideBar} from '../../store/slices/newsSlice'
import './css/header.css'


const Header = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {activeLink, error, searchTerms, sideBar} = useSelector((state) => state.news)
    const {country, category, page} = activeLink

    const auth = localStorage.getItem("auth")

    useEffect(() => {

        if (error)
        {
            navigate('/request-failed')
        }
        handleAPI()
    }, [dispatch, activeLink, page])

    const handleAPI = async () => {

     dispatch(newsData(activeLink))
    }


    const handleNav = () => {
        navigate('/')
    }

    const handleKeyDown = (event) => {
        if (event.key === 'Enter')
        {
            // scrollTop()
            navigate('/')
            dispatch(switchLink({endpoint: "everything", query: searchTerms, country: null, category: null, page: page}))
        }
    }


    const handleClick = () => {
        if (!searchTerms)
            return null
        navigate('/')
        dispatch(switchLink({endpoint: "everything", query: searchTerms, country: null, category: null, page: page}))
    }

    const handleLogo = () => {
        navigate('/')
        dispatch(switchLink({endpoint: "everything", category: null, country: null, query: null, page: page}))
    }

    let linkStyle = {
        borderBottom: "0.125vw solid #cc0000",
        color: "#cc0000",
    }

    return (
        <nav id='nav'>

            <span onClick={handleLogo}>{!auth ? <>News</> : <>N<span>ews</span></>}</span>
                <div>
                    <input type='text' value={searchTerms} onChange={(e) => dispatch(handleSearch(e.target.value))} onKeyDown={handleKeyDown} placeholder='Search...' />
                    <button onClick={handleClick}>&#128269;</button>
                </div>

                <div id='links-container'>
                    <div id='links' onClick={handleNav}>
                        <Link href="#" style={country === 'in' ? linkStyle : {}} onClick={() => dispatch(switchLink({endpoint: "everything", country: 'in', category: null, query: null, page: page}))}>India</Link>
                        <Link href="#" style={category === 'sports' ? linkStyle : {}} onClick={() => dispatch(switchLink({endpoint: "everything", category: 'sports', country: null, query: null, page: page}))}>Sports</Link>
                        <Link href="#" style={category === 'science' ? linkStyle : {}} onClick={() => dispatch(switchLink({endpoint: "everything", category: 'science', country: null, query: null, page: page}))}>Science</Link>
                        <Link href="#" style={category === 'business' ? linkStyle : {}} onClick={() => dispatch(switchLink({endpoint: "everything", category: 'business', country: null, query: null, page: page}))}>Business</Link>
                        <Link href="#" style={category === 'technology' ? linkStyle : {}} onClick={() => dispatch(switchLink({endpoint: "everything", category: 'technology', country: null, query: null, page: page}))}>Technology</Link>
                        <Link href="#" style={category === 'entertainment' ? linkStyle : {}} onClick={() => dispatch(switchLink({endpoint: "everything", category: 'entertainment', country: null, query: null, page: page}))}>Entertainment</Link>
                    </div>
                </div>

                <div id="profile" onClick={() => dispatch(handleSideBar(`${sideBar === "close" ? "open" : "close"}`))}>{sideBar === "close" ? <span>&#9776;</span> : <span>&#x2716;</span>} </div>
                <div className={sideBar === "open" ? 'sidebar' : 'sidebar close'}>
                    <ul className='sidebar-menu' >
                        <Link to='/profile'><li onClick={() => dispatch(handleSideBar("close"))}>Profile</li></Link>
                        <Link to='/about'><li onClick={() => dispatch(handleSideBar("close"))}>About Us</li></Link>
                        <Link to='/contact'><li onClick={() => dispatch(handleSideBar("close"))}>Contact Us</li></Link>
                        <Link to='/help'><li onClick={() => dispatch(handleSideBar("close"))}>Help Center</li></Link>
                    </ul>
                </div>

        </nav >

    )
}

export default Header
