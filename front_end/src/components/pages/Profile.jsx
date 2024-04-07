import {Link} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {useEffect} from 'react'
import {setPopup, userData} from '../../store/slices/profileDataSlice'
import {setNull} from '../../store/slices/editProfile'
import PopupModal from '../PopupModal'
import x from '../images/profile.jpg'
import Spinner from '../Spinner'
import './css/profile.css'

const Profile = () => {

    const dispatch = useDispatch()
    const {data, loading} = useSelector((state) => state.user)


    const user = data?.user
    const image = data?.user?.imageString


    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    const rawDate = user?.createdAt.slice(0, 10)
    const day = rawDate?.slice(8, 10)
    const month = rawDate?.slice(5, 7) - 1
    const year = rawDate?.slice(0, 4)


    const date = `${months[month]} ${day?.charAt(0) == 0 ? day?.charAt(1) : day}, ${year}`

    const token = localStorage.getItem("user")

    useEffect(() => {
        dispatch(userData(token))
        dispatch(setNull())
    }, [])


    console.log(data, "--user data")

    const logout = () => {
        dispatch(setPopup(true))
    }

    return (
        <>
            {loading ? <Spinner /> :
                <div id='profile-container'>

                    <PopupModal message={"Are you sure?"} bt={"Yes"} link={'/intro'} handler={setPopup} />
                    <div id='first-container'>
                        {image ? <img src={`data:image;base64,${image}`} alt='profile' />
                            : <img src={x} alt='profile' />}
                    </div>
                    <div id='second-container'>
                        <h1>{user?.name}</h1>
                        <h3>@{user?.username}</h3>
                        <p>Jioned {date}</p>
                        {/* <p>Jioned </p> */}
                        <Link to='/edit-profile'><button>Edit Profile</button></Link>
                        <br />
                        <Link><button onClick={logout}>Logout</button></Link>
                    </div>
                </div>}
        </>
    )
}


export default Profile