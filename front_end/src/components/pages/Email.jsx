import {Link, useNavigate} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {nextKey} from '../../store/slices/signUpSlice'
import {emailAPI, setMail, setNext} from '../../store/slices/emailSlice'
import {useEffect} from 'react'
import Spinner from '../Spinner'
import './css/email.css'


const Email = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {next} = useSelector((state) => state.signUp)
    const {email, data, iNext, validation, loading} = useSelector((state) => state.email)

    const token = localStorage.getItem("user")

    useEffect(() => {
        if (next === 0)
        {
            navigate('/sign-up')
        }
    }, [])

    useEffect(() => {
        if (data?.success && iNext === 1)
        {
            navigate("/otp-verification")
        }
    }, [data])

    const handleForm = (event) => {
        const {value} = event.target
        dispatch(setMail(value))
    }


    const handleClick = () => {

        if (!email || validation)
            return null
        dispatch(emailAPI({token, email}))
        dispatch(setNext(1))
    }

    return (
        <>
            {loading ? <Spinner /> :
                <div id='email-body'>
                    <Link to='/sign-up'><button id='back' onClick={() => dispatch(nextKey(0))}>&#8592;</button></Link>
                    <div id='email-container'>
                        <h2>Email Verification</h2>

                        <p>Adding an email is beneficial for you. It helps in recovering your password if you forget it in the future. For now, you can skip adding an email.<br /><b style={{position: "absolute", left: "0", right: "0", color: "tomato"}}>{data?.message}</b></p>
                        <div className='email-form-group'>
                            <input type='username' name='email' value={email} onChange={handleForm} placeholder='email' />
                            <label className='email-form-label'>Email</label>
                            <div className='validation-message'>{validation ? validation : ""}</div>
                        </div>

                        <button onClick={handleClick}>Generate OTP</button>
                        <Link to='/upload-photo'><button id='skip'>Skip</button></Link>
                    </div>

                </div>}
        </>
    )
}

export default Email