import {Link, useNavigate} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {useEffect, useRef} from 'react'
import {userData} from '../../store/slices/profileDataSlice'
import {setFormData, setImage, updateProfile} from '../../store/slices/editProfile'
import Spinner from '../Spinner'
import './css/editProfile.css'



const EditProfile = () => {

    const navigate = useNavigate()
    const inputRef = useRef()
    const dispatch = useDispatch()
    const d = useSelector((state) => state.user.data)
    const loading = useSelector((state) => state.user.loading)
    const {formData, data, image} = useSelector((state) => state.edit)

    const user = d?.user

    const name = data?.name
    const username = data?.username
    const success = data?.success

    const token = localStorage.getItem("user")

    useEffect(() => {
        dispatch(userData(token))
    }, [])

    if (success)
    {
        navigate('/profile')
    }

    const handleImage = () => {
        inputRef.current.click()
    }

    // set Image
    const handleImageChange = (event) => {

        const file = event.target.files[0]

        if (!formData?.name)
        {
            dispatch(setFormData({name: user.name}))
        }

        if (!formData?.username || formData?.username == user?.username)
        {
            let plus = user.username + ".go"

            dispatch(setFormData({username: plus}))
        }

        dispatch(setImage(file))
    }

    // set Form
    const handleForm = (event) => {
        const {name, value} = event.target

        if (!formData?.name)
        {
            dispatch(setFormData({name: user.name}))
        }

        if (!formData?.username || formData?.username == user?.username)
        {
            let plus = user.username + ".go"

            dispatch(setFormData({username: plus}))
        }

        dispatch(setFormData({[name]: value}))
    }

    // triger API
    const update = (event) => {
        event.preventDefault()

        const form = new FormData()

        form.append('image', image)
        form.append('jsonData', JSON.stringify(formData))

        if (formData === null && image === null)
            return null
        else
            dispatch(updateProfile({token, form}))
    }


    return (<>
        {loading ? <Spinner /> :
            <div id='edit-container'>
                <Link to='/profile'><button id='bacck'>&#8592;</button></Link>

                <div id='edit-first-container'>
                    <div id="edit-image-container" onClick={handleImage}>
                        {image ? <><img src={URL.createObjectURL(image)} alt='unsupported file' />
                            <div id='edit-select-image'>Select Image</div></> :
                            <><img src={`data:image;base64,${user?.imageString}`} alt='' />
                                <div id='edit-select-image'>Select Image</div></>}
                        <input style={{display: "none"}} onChange={handleImageChange} name='image' type='file' ref={inputRef} />
                    </div>
                    <br />
                </div>

                <div id='edit-second-container'>
                    <div className='edit-form-container'>
                        <label>Name</label>
                        <input style={name ? {borderColor: "red"} : {}} type="text" name='name' defaultValue={user?.name} onChange={handleForm} />
                        <div>{name}</div>
                    </div>

                    <div className='edit-form-container'>
                        <label>Username</label>
                        <input style={username ? {borderColor: "red"} : {}} type="text" name='username' defaultValue={user?.username} onChange={handleForm} />
                        <div>{username}</div>
                    </div>
                    <button onClick={update}>Update Profile</button>
                    <br />
                    <Link to='/delete'><button>Delete Account</button></Link>
                </div>
            </div>
        }</>
    )
}

export default EditProfile