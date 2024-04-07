import {useEffect} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {signUpAPI, updateFormData, nextKey, setIsChecked} from '../../store/slices/signUpSlice'
import './css/signUp.css'


const SignUp = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {formData, data, validation, next, isChecked} = useSelector((state) => state.signUp)
    const {name, username, password} = formData


    useEffect(() => {
        if (data?.success === true && next === 1)
        {
            navigate('/email-verification')
        }
    }, [data?.success, dispatch, next])


    const handleForm = (event) => {

        const {name, value} = event.target

        if (value.length === 1 && value.trim() === "")
            return

        dispatch(updateFormData({[name]: value}))
    }


    const handleInputKeyDown = (event) => {

        const {value} = event.target

        if (event.key === '' && value.trim() === '')
        {
            event.preventDefault()
            return false
        }
    }

    const handleNext = async () => {

        dispatch(nextKey(1))

        if (data?.success === true)
            return null

        const {payload} = await dispatch(signUpAPI(formData))
        localStorage.setItem("user", payload?.token)
    }

    const handleCheckboxChange = () => {
        dispatch(setIsChecked(!isChecked))
    }


    return (
        <>
            <div id='signup-body'>

                <div id='signup-container'>
                    <Link to='/intro'><button id='back'>&#8592;</button></Link>
                    <h2>Create Account</h2>
                    <div className='signup-form-group'>
                        <input style={!validation?.name && !data?.name && name ? {borderColor: "blue"} : data?.name ? {borderColor: "red"} : {}} type='text' name='name' value={name} onChange={handleForm} placeholder='Name' onKeyDown={handleInputKeyDown} />
                        <label style={!validation?.name && !data?.name && name ? {color: "blue"} : {}} className='signup-form-label'>Name</label>
                        <div style={validation?.name ? {color: "blue"} : {}}>{validation?.name ? validation?.name : data?.name}</div>
                    </div>
                    <div className='signup-form-group'>
                        <input style={!validation?.username && !data?.username && username ? {borderColor: "blue"} : data?.username ? {borderColor: "red"} : {}} type='username' name='username' value={username} onChange={handleForm} placeholder='Set Username' onKeyDown={handleInputKeyDown} />
                        <label style={!validation?.username && !data?.username && username ? {color: "blue"} : {}} className='signup-form-label'>Set Username</label>
                        <div style={validation?.username ? {color: "blue"} : {}}>{validation?.username ? validation?.username : data?.username}</div>
                    </div>
                    <div className='signup-form-group'>
                        <input style={!validation?.password && !data?.password && password ? {borderColor: "blue"} : data?.password ? {borderColor: "red"} : {}} type={isChecked ? "name" : "password"} name='password' value={password} onChange={handleForm} placeholder='Set Password' onKeyDown={handleInputKeyDown} />
                        <label style={!validation?.password && !data?.password && password ? {color: "blue"} : {}} className='signup-form-label'>Set Password</label>
                        <div style={validation?.password ? {color: "blue"} : {}}>{validation?.password ? validation?.password : data?.password}</div>
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

                    <button onClick={handleNext} id='next-button'>Next</button>
                    <p>Already have an account? <Link to='/sign-in'>Login</Link></p>
                </div>
            </div>
        </>
    )
}

export default SignUp