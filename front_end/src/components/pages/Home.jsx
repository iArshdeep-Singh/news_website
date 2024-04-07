import {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Link, useNavigate} from 'react-router-dom'
import Layout from '../layout/Layout'
import HomeSkeleton from '../skeletons/HomeSkeleton'
import {switchAllHead, updatePageBack, updatePageNext} from '../../store/slices/newsSlice'
import TopButton from '../TopButton'
import no from '../images/no.jpg'
import './css/home.css'


const Home = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {data, loading, error, switchTo, activeLink} = useSelector((state) => state.news)
    const {page, query} = activeLink
    console.log(activeLink.page, "--Page")
    console.log(switchTo, "--S")


    useEffect(() => {
        if (error)
        {
            // navigate('/request-failed')
        }
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "instant"
        })
    }, [data, switchTo])


    const switchStyle = {
        color: "white",
        backgroundColor: "#01579B"
    }

    return (
        <Layout>
            <div style={activeLink.query || error ? {display: "none"} : {}} id='all-headlines'>
                <button style={switchTo === "everything" ? switchStyle : {}} onClick={() => dispatch(switchAllHead("everything"))}>All</button>
                <button style={switchTo === "top-headlines" ? switchStyle : {}} onClick={() => dispatch(switchAllHead("top-headlines"))}>Top Headlines</button>
            </div>
            <div id='home-container'>
                {loading ? (
                    <HomeSkeleton />
                ) : (
                    data && data.length > 0 ? data.map((i, index) => {
                        return (
                            <div className='card'>
                                <img src={i?.urlToImage ? i?.urlToImage : no} alt='news' loading='lazy' />
                                <div className='card-content'>
                                    <h3>{i?.title ? i?.title : `[no title]`}</h3>
                                    <p>{i?.description ? i?.description : `[no description]`}</p>
                                    <Link to={`/read-more/${index}`} >Read More</Link>
                                </div>
                            </div>
                        )
                    })
                        : <h1 id="no-result">No Result Found.</h1>
                )}
                {
                    data && data.length > 0 && !query ? <div id='pagination-buttons'>
                        <button style={page === 1 ? {display: "none"} : {}} onClick={() => dispatch(updatePageBack())}>Back</button>
                        <button style={page === 4 || data.length < 25 ? {display: "none"} : {}} onClick={() => dispatch(updatePageNext())}>Next</button>
                    </div> : <></>
                }
                <TopButton />
            </div>
        </Layout >
    )
}

export default Home