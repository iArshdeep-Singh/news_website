import {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Link, useNavigate} from 'react-router-dom'
import {signInAPI, updateFormData, setIsChecked, popupHandler} from '../../store/slices/signInSlice'
import PopupModal from '../PopupModal'
import './css/signIn.css'

const SignIn = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {data, formData, isChecked} = useSelector((state) => state.signIn)

    const {username, password} = formData


    useEffect(() => {
        if (data?.success === true)
        {
            navigate('/')
            localStorage.setItem("auth", "auth")
        }

    }, [data?.success, dispatch])

    useEffect(() => {
        if (localStorage.getItem("forgot"))
        {
            localStorage.removeItem("forgot")
        }
    }, [])

    const handleForm = (event) => {
        const {name, value} = event.target

        dispatch(updateFormData({[name]: value}))
    }

    const handleSignIn = async (event) => {
        event.preventDefault()

        const {payload} = await dispatch(signInAPI(formData))

        localStorage.setItem("user", payload?.token)
    }

    const handleInputKeyDown = (event) => {

        const {value} = event.target

        if (event.key === '' && value.trim() === '')
        {
            event.preventDefault()
            return false
        }
    }

    const handleCheckboxChange = () => {
        dispatch(setIsChecked(!isChecked))
    }

    const handleForgot = () => {
        localStorage.setItem("forgot", 'true')
    }


    return (
        <>
            <div id='signIn-body'>
                <PopupModal message={data?.error} bt={'Create Account'} link={'/sign-up'} handler={popupHandler} />
                <div id='signIn-container'>
                    <h2>Sign In</h2>

                    <div className='signIn-form-group'>
                        <input style={!data?.error && username ? {borderColor: "blue"} : data?.error || data?.username ? {borderColor: "red"} : {}} type='username' name='username' value={username} placeholder='Enter Username' onChange={handleForm} onKeyDown={handleInputKeyDown} />
                        <label style={!data?.error && username ? {color: "blue"} : {}} className='signIn-form-label'>Username</label>
                        <div className='validation-message'>{data?.username}</div>
                    </div>
                    <div className='signIn-form-group'>
                        <input style={!data?.password && password ? {borderColor: "blue"} : data?.password ? {borderColor: "red"} : {}} type={isChecked ? "name" : "password"} name='password' value={password} placeholder='Enter Password' onChange={handleForm} onKeyDown={handleInputKeyDown} />
                        <label style={!data?.password && password ? {color: "blue"} : {}} className='signIn-form-label'>Password</label>
                        <div className='validation-message'>{data?.password}</div>

                        <div style={isChecked ? {backgroundColor: "#007bff"} : {}} id='show' onClick={handleCheckboxChange}>
                            <span style={isChecked ? {} : {display: "none"}}>&#10004;</span>
                            <input
                                type="checkbox"
                                checked={isChecked}
                                onChange={handleCheckboxChange}
                            />
                        </div>
                        <span id='show-word'>Show Password</span>
                    </div>

                    <button id='sign-in' onClick={handleSignIn}>Sign In</button>
                    <Link to='/forgot-password'><button id='forgot-password' onClick={handleForgot}>Forgot Password</button></Link>
                    <p>Don't have an account? <Link to='/sign-up'>Create one</Link></p>
                </div>

            </div>
        </>
    )
}

export default SignIn