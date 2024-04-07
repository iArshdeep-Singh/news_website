import {useEffect} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {updatePasswordAPI, popupHandler, setGo, setIsChecked, setPassword} from '../../store/slices/updatePassword'
import PopupModal from '../PopupModal'
import Spinner from '../Spinner'
import './css/delete.css'


const UpdatePassword = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {isChecked, password, data, loading} = useSelector(state => state.updatePassword)
    const email = localStorage.getItem("email")

    console.log(password, "--password")

    useEffect(() => {
        if (data?.success)
        {
            alert("Password Updated Successfully.")
            localStorage.removeItem("email")
            navigate('/sign-in')
        }
    }, [dispatch, data])



    const changePassword = (event) => {
        const {value} = event.target
        dispatch(setPassword(value))
    }

    const handleCheckboxChange = () => {
        dispatch(setIsChecked(!isChecked))
    }

    const updatePassword = () => {
        if (!password)
            return null
        else
            dispatch(updatePasswordAPI({email, password}))
    }

    return (
        <>
            {loading ? <Spinner /> :
                <div id="delete-body">

                    <PopupModal message={data?.message} bt={'OK'} link={'/intro'} handler={popupHandler} />

                    <Link to='/forgot-password-otp'><button id='back'>&#8592;</button></Link>

                    <div id='delete-container'>
                        <div id='delete-form'>
                            <label>Set New Password</label>
                            <input style={data?.password ? {borderColor: "red"} : {}} type={isChecked ? "name" : "password"} name="password" onChange={changePassword} />
                            <div id='validation-message'>{data?.password}</div>

                            <div style={isChecked ? {backgroundColor: "#007bff"} : {}} id='show' onClick={handleCheckboxChange}>
                                <span style={isChecked ? {} : {display: "none"}}>&#10004;</span>
                                <input
                                    type="checkbox"
                                    checked={isChecked}
                                    onChange={handleCheckboxChange}
                                />
                            </div>
                            <span id='show-word'>Show Password</span>

                            <br />
                            <button onClick={updatePassword}>Update</button>
                        </div>
                    </div>
                </div>}
        </>
    )
}

export default UpdatePassword