import React,{useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './NavBar';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import './LanguagePick.css'; // Import the CSS file
import PickX from '../PickDetail'

const LanguageSelectionPage = () => {
  const navigate = useNavigate();
const [UserX,setUserX] = useState('');
  const handleLanguageSelection = (language) => {
    navigate(`/Home/${language}`);
  };
  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(async (user) => {
      if (user && user.email) {
        await setUserX(user.email);
        // Fetch pick count once pickerEmail is set
        // await fetchPickCount();
      } else {
        navigate('/');
      }
    });
    return () => unsubscribe();
}, []);


  return (
    <div>
      <Navbar />
      <center>
      <h1 style={{marginTop:"80px"}}> Welcome {UserX} </h1>
      </center>
      <center className='MT'>
      <div className="language-container">
        <div className="language-button" onClick={() => handleLanguageSelection('English')}>English</div>
        <div className="language-button" onClick={() => handleLanguageSelection('Tamil')}>Tamil</div>
        <div className="language-button" onClick={() => handleLanguageSelection('Malayalam')}>Malayalam</div>
        <div className="language-button" onClick={() => handleLanguageSelection('Hindi')}>Hindi</div>
      </div>
      <hr />
      <PickX />
      </center>
    </div>
  );
};

export default LanguageSelectionPage;
