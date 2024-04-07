import {Routes, Route} from 'react-router-dom'
import Header from './components/layout/Header'
import Home from './components/pages/Home'
import ReadMore from './components/pages/ReadMore'
import RequestFailed from './components/pages/RequestFailed'
import PageNotFound from './components/pages/PageNotFound'
import Intro from './components/pages/Intro'
import SignUp from './components/pages/SignUp'
import SignIn from './components/pages/SignIn'
import Email from './components/pages/Email'
import UploadPhoto from './components/pages/UploadPhoto'
import About from './components/pages/About'
import Contact from './components/pages/Contact'
import Help from './components/pages/Help'
import Profile from './components/pages/Profile'
import EditProfile from './components/pages/EditProfile'
import Delete from './components/pages/Delete'
import OTPverification from './components/pages/OTPverification'
import ForgotPassword from './components/pages/ForgotPassword'
import TermsAndConditions from './components/pages/TermsAndConditions'
import ForgotPasswordOTP from './components/pages/ForgotPasswordOTP'
import UpdatePassword from './components/pages/UpdatePassord'
import Private from './components/Private'
import './App.css'

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route element={<Private />}>
          <Route path='/' element={<Home />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/edit-profile' element={<EditProfile />} />
          <Route path='/delete' element={<Delete />} />
        </Route>
        <Route path='/read-more/:id' element={<ReadMore />} />
        <Route path='/request-failed' element={<RequestFailed />} />
        <Route path='/intro' element={<Intro />} />
        <Route path='/sign-up' element={<SignUp />} />
        <Route path='/email-verification' element={<Email />} />
        <Route path='/otp-verification' element={<OTPverification />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/forgot-password-otp' element={<ForgotPasswordOTP />} />
        <Route path='/update-password' element={<UpdatePassword />} />
        <Route path='/upload-photo' element={<UploadPhoto />} />
        <Route path='/sign-in' element={<SignIn />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/help' element={<Help />} />
        <Route path='/about' element={<About />} />
        <Route path='/terms-and-conditions' element={<TermsAndConditions />} />
        <Route path='*' element={<PageNotFound />} />
      </Routes>
    </>
  )
}

export default App
