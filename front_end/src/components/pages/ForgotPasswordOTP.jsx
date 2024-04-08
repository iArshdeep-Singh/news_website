import {Link, useNavigate} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {forgotOTP_API, setOTP} from '../../store/slices/forgotPasswordOTP'
import {useEffect, useRef} from 'react'
import {setNext} from '../../store/slices/forgotPassword'
import Spinner from '../Spinner'
import './css/otpVerification.css'


const ForgotPasswordOTP = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {otp, data, loading} = useSelector((state) => state.forgotOTP)
    const {iNext} = useSelector((state) => state.forgot)
    const inputRef = useRef([])
    const email = localStorage.getItem("email")


    useEffect(() => {
        if (iNext === 0)
            navigate('/forgot-password')
    }, [iNext])


    useEffect(() => {
        if (data?.success)
        {
            navigate('/update-password')
        }
    }, [data])

    const handleChange = (e, i) => {

        const {value, nextSibling} = e.target
        const newOTP = [...otp]

        newOTP[i] = value

        if (isNaN(value)) return false
        if (value === " ") return false

        dispatch(setOTP(newOTP))


        if (value && nextSibling)
        {
            nextSibling.focus()
        }
    }


    const handleKeyDown = (e, i) => {

        if ((e.key === 'Backspace' || e.key === 'Delete') && i > 0 && !otp[i])
        {
            inputRef.current[i - 1].focus()
        }
    }


    const handleSubmit = () => {

        if (otp[0] === "" || otp[1] === "" || otp[2] === "" || otp[3] === "")
            return null

        dispatch(forgotOTP_API({otp, email}))
    }

    return (
        <>
            {loading ? <Spinner /> :
                <div id='otp-body'>
                    <Link to='/forgot-password'><button id='back' onClick={() => dispatch(setNext(0))}>&#8592;</button></Link>
                    <div id='otp-container'>
                        <h2>Verify OTP</h2>

                        <p>4-digits otp has been sent to <b style={{color: "#333"}}>{email}</b>. please enter otp for email verification.<br /><span style={{color: "#01579B"}}>2:00</span> <br /><span style={{position: "absolute", left: "0", right: "0", color: "tomato"}}><b>{data?.message}</b></span></p>
                        <div id='otp-input-container'>
                            {otp.map((data, index) => (
                                <input
                                    type='text'
                                    key={index}
                                    value={data}
                                    maxLength={1}
                                    onChange={(e) => handleChange(e, index)}
                                    onKeyDown={(e) => handleKeyDown(e, index)}
                                    ref={(el) => (inputRef.current[index] = el)}
                                />
                            ))}
                        </div>
                        <button onClick={handleSubmit} style={data?.expired ? {backgroundColor: "purple"} : {}}>{data?.expired ? "Regenrate OTP" : "Submit"}</button>
                    </div>

                </div>}
        </>
    )
}

export default ForgotPasswordOTP