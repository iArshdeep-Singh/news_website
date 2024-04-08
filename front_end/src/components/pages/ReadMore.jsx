import {useEffect} from "react"
import {useDispatch, useSelector} from 'react-redux'
import {useNavigate, useParams} from 'react-router-dom'
import Layout from "../layout/Layout"
import {newsData} from "../../store/slices/newsSlice"
import {newsContent, reset} from "../../store/slices/newsContentSlice"
import ReadMoreSkeleton from "../skeletons/ReadMoreSkeleton"
import x from '../images/no.jpg'
import './css/read.css'

const ReadMore = () => {

    const {id} = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {news, content} = useSelector((state) => state)

    const i = news?.data?.[id]
    const {activeLink} = news
    
    useEffect(() => {

        hanldeData()

        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "instant"
        })
    }, [dispatch, id])


    const hanldeData = async () => {

        dispatch(reset())

        const {payload} = await dispatch(newsData(activeLink))

        const url = payload?.[id]?.url

        dispatch(newsContent(url))
    }

    return (
        <Layout>
            <>
                <div id="read-container">
                    <button onClick={() => {navigate('/')}}>Back</button>
                    {!i ?
                        (<ReadMoreSkeleton />
                        ) : (
                            <>
                                <img src={i && i.urlToImage ? i.urlToImage : x} alt="news" />
                                <h1>{i && i.title ? i.title : `[no title]`}</h1>
                                <article>{i && i?.description ? i?.description : ``}</article>
                                {content && content.data ? <article> {content?.data} </article> : <><br /><br /><br /><br /></>}
                                <div id="author"><span>Author: </span>{i && i.author && !i.author.match(/http/ || /www/ || /./) ? i.author : i?.source?.name}</div>
                                <div id="date"><span>Publish Date: </span>{i && i.publishedAt ? i.publishedAt.substring(0, 10) : "0000-00-00"}</div>
                            </>
                        )}
                </div>
            </>
        </Layout>
    )
}

export default ReadMore