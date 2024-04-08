import {useRef} from 'react'
import {Link} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {uploadImage, imageHandler, setNull} from '../../store/slices/imageUploadSlice'
import './css/uploadPhoto.css'


const UploadPhoto = () => {

    const dispatch = useDispatch()
    const {imageData, data} = useSelector((state) => state.image)
    const inputRef = useRef(null)
    const token = localStorage.getItem("user")

    const success = data?.success
    const message = data?.message
    const image = imageData?.image

    const handleImage = () => {
        inputRef.current.click()
        dispatch(setNull())
    }

    const handleImageChange = (event) => {
        const name = event.target.name
        const file = event.target.files[0]

        dispatch(imageHandler({[name]: file}))
    }

    const handleUpload = async () => {

        const formData = new FormData()

        formData.append('image', image)

        if (!image)
            return null

        dispatch(uploadImage({formData, token}))
    }

    return (
        <>
            <div id='uploadPhoto-body'>

                {/* <Link to='/email-verification'><button id='back'>&#8592;</button></Link> */}
                <div id='uploadPhoto-container'>
                    <h2>Set Profile Photo</h2>
                    <p>Please upload the photo if available, or you can skip for now and upload it later.<br /><b style={{position: "absolute", left: "0", right: "0", color: "tomato"}}>{message}</b></p>

                    <div id="image-container" onClick={handleImage}>
                        {image ? <><img src={URL.createObjectURL(image)} alt='unsupported file' /></> :
                            <><div id='select-image'>Select Image</div></>}
                        <input style={{display: "none"}} onChange={handleImageChange} name='image' type='file' ref={inputRef} />
                    </div>

                    <button onClick={handleUpload}>Upload</button>
                    <Link to='/terms-and-conditions'><button style={success ? {color: "white", backgroundColor: "#01579B", fontWeight: "normal"} : {}}>{success ? <>Next</> : <>Skip</>}</button></Link>
                </div>

            </div >
        </>
    )
}

export default UploadPhoto