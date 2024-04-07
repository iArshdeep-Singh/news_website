import {useEffect} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {deleteAPI, popupHandler, setIsChecked, setPassword} from '../../store/slices/deleteSlice'
import PopupModal from '../PopupModal'
import './css/delete.css'

const Delete = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {isChecked, password, data, popupX} = useSelector(state => state.delete)
    const token = localStorage.getItem("user")


    console.log(password, "--password")

    useEffect(() => {
        if (data?.success && !popupX)
        {
            navigate('/intro')
        }
    }, [dispatch, data, popupX])



    const changePassword = (event) => {
        const {value} = event.target
        dispatch(setPassword(value))
    }

    const handleCheckboxChange = () => {
        dispatch(setIsChecked(!isChecked))
    }

    const deleteAccount = () => {
        if (!password)
            return null
        else
            dispatch(deleteAPI({token, password}))
        dispatch(popupHandler(true))
    }

    return (
        <div id="delete-body">

            <PopupModal message={data?.message} bt={'OK'} link={'/intro'} handler={popupHandler} />

            <Link to='/edit-profile'><button id='back'>&#8592;</button></Link>

            <div id='delete-container'>
                <div id='delete-form'>
                    <label>Enter Password</label>
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
                    <button onClick={deleteAccount}>Delete</button>
                </div>
            </div>
        </div>
    )
}

export default Delete