import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import firebase from './firebase';
import 'firebase/auth';
import Login from './components/Login';
import SignUp from './components/Signup';
import Home from './components/Home';
import AdminPage from './components/Admin';
const App = () => {
  return (
   <>
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path='/SignUp' element={<SignUp />} />
          <Route path='/Home' element={<Home />} />
          <Route path='/Admin' element={<AdminPage />} />
        </Routes>
      </div>
    </Router>
   </>
 
   

  );
};

export default App;
