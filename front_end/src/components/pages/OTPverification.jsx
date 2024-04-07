import {Link, useNavigate} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {otpAPI, setOTP} from '../../store/slices/otpSlice'
import {useEffect, useRef} from 'react'
import {userData} from '../../store/slices/profileDataSlice'
import {setNext} from '../../store/slices/emailSlice'
import Spinner from '../Spinner'
import './css/otpVerification.css'

const OTPverification = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {otp, time, data, loading} = useSelector((state) => state.otp)
    const email = useSelector((state) => state.user?.data?.user?.email)
    const {iNext} = useSelector((state) => state.email)
    const inputRef = useRef([])
    const token = localStorage.getItem("user")

    useEffect(() => {
        dispatch(userData(token))
    }, [])


    useEffect(() => {
        // if (iNext === 0)
        //     navigate('/email-verification')
    }, [iNext])


    useEffect(() => {
        if (data?.success)
        {
            navigate('/upload-photo')
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

        dispatch(otpAPI({otp, token}))
        console.log("ouweoruoweuoriuweu")
    }

    return (
        <>
            {loading ? <Spinner /> :
                <div id='otp-body'>
                    <Link to='/email-verification'><button id='back' onClick={() => dispatch(setNext(0))}>&#8592;</button></Link>
                    <div id='otp-container'>
                        <h2>Verify OTP</h2>

                        <p>4-digits otp has been sent to <b style={{color: "#333"}}>{email}</b>. OTP will expire in <br /><span style={{color: "crimson"}}>2:00</span> minutes. <br /><span style={{position: "absolute", left: "0", right: "0", color: "tomato"}}><b>{data?.message}</b></span></p>
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

export default OTPverification