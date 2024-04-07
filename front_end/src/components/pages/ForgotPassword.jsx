import {Link, Navigate, useNavigate} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {setMail, forgotAPI, setNext} from '../../store/slices/forgotPassword'
import Spinner from '../Spinner'
import './css/email.css'
import {useEffect} from 'react'

const ForgotPassword = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {data, email, loading, iNext} = useSelector((state) => state.forgot)

    console.log(email, "---email")
    console.log(data, "---email")

    useEffect(() => {
        if (data?.success && iNext)
        {
            navigate('/forgot-password-otp')
        }
    }, [data])

    const handleForm = (event) => {
        const {value} = event.target

        dispatch(setMail(value))
    }

    const handleClick = () => {
        if (!email)
            return null
        localStorage.setItem("email", email)
        dispatch(forgotAPI(email))
        dispatch(setNext(1))
    }

    return (
        <>
            {loading ? <Spinner /> :
                <div id='email-body'>
                    <Link to='/sign-in'><button id='back'>&#8592;</button></Link>
                    <div id='email-container'>

                        <p>Enter your registered email to recover your password.<br /><b style={{position: "absolute", left: "0", right: "0", color: "tomato"}}>{data?.message}</b></p>
                        <div className='email-form-group'>
                            <input type='username' name='email' onChange={handleForm} placeholder='email' />
                            <label className='email-form-label'>Email</label>
                            <div className='validation-message'></div>
                        </div>

                        <button onClick={handleClick}>Generate OTP</button>
                    </div>

                </div>}
        </>
    )
}

export default ForgotPassword