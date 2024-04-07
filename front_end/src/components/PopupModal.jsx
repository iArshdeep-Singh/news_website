import {Link} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import './popup.css'

const PopupModal = ({message, bt, link, handler}) => {

    const dispatch = useDispatch()
    const {popup} = useSelector(state => state.signIn)
    const {popupX} = useSelector(state => state.delete)
    const {popupXX} = useSelector(state => state.user)

    const handlePopup = () => {
        dispatch(handler(false))
        localStorage.clear()
    }

    return (
        <>
            <div className={popup || popupX || popupXX ? 'popup-body' : 'popup-body none'}>
                <div id="popup-container">
                    <div onClick={handlePopup}>&#x2716;</div>
                    <p>{message}</p>
                    <Link to={`${link}`}><button onClick={handlePopup}>{bt}</button></Link>
                </div>
            </div>
        </>
    )
}

export default PopupModal