import {useState} from 'react'
import {Link} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import {updateFormData} from '../../store/slices/signUpSlice'
import {imageHandler} from '../../store/slices/imageUploadSlice'
import './css/termsAndConditions.css'

const TermsAndConditions = () => {

    const dispatch = useDispatch()
    const [isChecked, setIsChecked] = useState(false)
    const {formData} = useSelector((state) => state.signUp)
    const {imageData} = useSelector((state) => state.image)

    console.log(imageData, formData, "---ksk")


    const handleCheckboxChange = () => {
        setIsChecked(!isChecked)
    }

    const setAuth = () => {
        localStorage.setItem("auth", "auth")
    }

    const reset = () => {
        dispatch(updateFormData(null))
        dispatch(imageHandler(null))
    }

    return (
        <div id='tc-body'>
            <h1>Terms and Conditions</h1>
            <p>These Terms and Conditions govern your use of this website. By accessing or using this website, you agree to be bound by these Terms and Conditions in full. If you disagree with these Terms and Conditions or any part of these Terms and Conditions, you must not use this website.</p>
            <h2>Intellectual Property Rights</h2>
            <p>Unless otherwise stated, we or our licensors own the intellectual property rights in the website and material on the website. Subject to the license below, all these intellectual property rights are reserved.</p>
            <h2>License to Use Website</h2>
            <p>You may view, download for caching purposes only, and print pages from the website for your own personal use, subject to the restrictions set out below and elsewhere in these Terms and Conditions.</p>
            <p>You must not:</p>
            <ul>
                <li>Republish material from this website (including republication on another website).</li>
                <li>Sell, rent, or sub-license material from the website.</li>
                <li>Reproduce, duplicate, copy, or otherwise exploit material on this website for commercial purposes.</li>
                <li>Edit or otherwise modify any material on the website.</li>
            </ul>
            <h2>Limitations of Liability</h2>
            <p>The information on this website is provided free-of-charge, and you acknowledge that it would be unreasonable to hold us liable in respect of this website and the information on this website. While we endeavor to ensure that the information on this website is correct, we do not warrant its completeness or accuracy; nor do we commit to ensuring that the website remains available or that the material on the website is kept up-to-date.</p>
            <p>To the maximum extent permitted by applicable law, we exclude all representations, warranties, and conditions relating to this website and the use of this website (including, without limitation, any warranties implied by law in respect of satisfactory quality, fitness for purpose, and/or the use of reasonable care and skill).</p>
            <p>Nothing in these Terms and Conditions will:</p>
            <ul>
                <li>Limit or exclude our or your liability for death or personal injury resulting from negligence.</li>
                <li>Limit or exclude our or your liability for fraud or fraudulent misrepresentation.</li>
                <li>Limit any of our or your liabilities in any way that is not permitted under applicable law.</li>
                <li>Exclude any of our or your liabilities that may not be excluded under applicable law.</li>
            </ul>
            <p>The limitations and exclusions of liability set out in this Section and elsewhere in these Terms and Conditions: (a) are subject to the preceding paragraph; and (b) govern all liabilities arising under these Terms and Conditions or in relation to the subject matter of these Terms and Conditions, including liabilities arising in contract, in tort (including negligence), and for breach of statutory duty.</p>
            <h2>Variation</h2>
            <p>We may revise these Terms and Conditions from time-to-time. Revised Terms and Conditions will apply to the use of this website from the date of the publication of the revised Terms and Conditions on this website. Please check this page regularly to ensure you are familiar with the current version.</p>
            <h2>Entire Agreement</h2>
            <p>These Terms and Conditions, together with our Privacy Policy, constitute the entire agreement between you and us in relation to your use of this website and supersede all previous agreements in respect of your use of this website.</p>
            <h2>Law and Jurisdiction</h2>
            <p>These Terms and Conditions will be governed by and construed in accordance with the laws of [your jurisdiction], and any disputes relating to these Terms and Conditions will be subject to the exclusive jurisdiction of the courts of [your jurisdiction].</p>
            <p>These Terms and Conditions were last updated on <b>March 23, 2024</b>.</p>
            <br />

            <div className={isChecked ? "custom-checkbox checked" : "custom-checkbox"} onClick={handleCheckboxChange}>
                <span>&#10004;</span>
                <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={handleCheckboxChange}
                />
            </div>
            <p style={{color: "black"}}> Yes, I Agree</p>

            <br />
            <div id='cancel-continue'>
                <Link to='/upload-photo'><button id='cancel'>Cancel</button></Link>
                <Link onClick={reset} to={isChecked ? '/' : ''}><button className={isChecked ? "continue" : "continue disable"} onClick={setAuth}>Continue</button></Link>
            </div>
        </div >
    )
}

export default TermsAndConditions