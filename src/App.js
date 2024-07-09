import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import firebase from './firebase';
import 'firebase/auth';
import Login from './components/Login';
import SignUp from './components/Signup';
import Home from './components/Home';
import AdminPage from './components/Admin';
import LanguageSelectionPage from './components/LanguagePick';
import ForgotPassword from './components/ForgotPassword'
import ForgotPassT from './components/ForgotPass.Token'
const App = () => {
  return (
   <>
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path='/SignUp' element={<SignUp />} />
          <Route path='/ForgotPassword' element={<ForgotPassword />} />
          <Route path='/ForgotPassword/:token' element={<ForgotPassT />} />
          <Route path='/Home' element={<LanguageSelectionPage />} />
          <Route path='/Home/:language' element={<Home />} />
          <Route path='/Admin' element={<AdminPage />} />
        </Routes>
      </div>
    </Router>
   </>
 
   

  );
};

export default App;
