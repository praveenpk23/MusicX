import React, { useState, useEffect } from 'react';
import { FormControlLabel, Checkbox, Button, Snackbar,Typography,TextField,Autocomplete } from '@mui/material';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { useNavigate } from 'react-router-dom';
import Navbar from './NavBar';
const MusicPicker = () => {
  const [musicData, setMusicData] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [pickerEmail, setPickerEmail] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const Navigation = useNavigate();

  // Fetch user email from Firebase auth context

  useEffect(() => {
    // Fetch music data where status is "Available"
    const fetchData = async () => {
      const musicCollection = await firebase.firestore().collection('Music').where('Status', '==', 'Available').get();
      const musicList = musicCollection.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setMusicData(musicList);
    };

    fetchData();
  }, []);

  const handleCheckboxChange = (id) => {
    let updatedSelectedItems;
    if (selectedItems.includes(id)) {
      updatedSelectedItems = selectedItems.filter(item => item !== id);
    } else {
      if (selectedItems.length >= 3) {
        setSnackbarMessage('You can only select up to 3 items.');
        setSnackbarOpen(true);
        return;
      }
      updatedSelectedItems = [...selectedItems, id];
    }
    setSelectedItems(updatedSelectedItems);
  };

//   const handleAbleButtonClick = async () => {
//     // Check if all selected items have a status of "Available"
//     const unavailableItems = selectedItems.filter(itemId => {
//       const item = musicData.find(item => item.id === itemId);
//       return item && item.Status !== 'Available';
//     });
  
//     if (unavailableItems.length > 0) {
//       setSnackbarMessage('Some items are not available. Please try different ones.');
//       setSnackbarOpen(true);
//       return;
//     }
  
//     // Update status of selected items to "Picked" and set picker's email
//     const batch = firebase.firestore().batch();
//     selectedItems.forEach(itemId => {
//       const musicRef = firebase.firestore().collection('Music').doc(itemId);
//       batch.update(musicRef, { Status: 'Picked', Picker: pickerEmail });
//     });
  
//     await batch.commit();
  
//     setSnackbarMessage('Items successfully picked.');
//     setSnackbarOpen(true);
  
//     // Fetch data again after updating
//     fetchData();
//   };
  
const handleAbleButtonClick = async () => {
    try {
      // Check if all selected items have a status of "Available"
      const unavailableItems = selectedItems.filter(itemId => {
        const item = musicData.find(item => item.id === itemId);
        return item && item.Status !== 'Available';
      });
    
      if (unavailableItems.length > 0) {
        setSnackbarMessage('Some items are not available. Please try different ones.');
        setSnackbarOpen(true);
        return;
      }
  
      // Check if any of the selected items have been picked by someone else
      const pickedItems = await Promise.all(selectedItems.map(async itemId => {
        const itemDoc = await firebase.firestore().collection('Music').doc(itemId).get();
        return itemDoc.data().Picker ? itemId : null;
      }));
  
      if (pickedItems.filter(item => item !== null).length > 0) {
        setSnackbarMessage('Someone has already picked one of the selected items. Please choose different items.');
        setSnackbarOpen(true);
        fetchData();    
        return;
      }
    
      const batch = firebase.firestore().batch();
    
      // Update status of selected items to "Picked" and set picker's email
      selectedItems.forEach(itemId => {
        const musicRef = firebase.firestore().collection('Music').doc(itemId);
        batch.update(musicRef, { Status: 'Picked', Picker: pickerEmail,Date:new Date() });
      });
    
      // Commit the batch update
      await batch.commit();
    
      // Add selected items and picker's email to the 'Selected' collection
      const selectedItemsData = selectedItems.map(itemId => ({
        itemId: itemId,
        pickerEmail: pickerEmail
      }));
    
      
    
      setSnackbarMessage('Items successfully picked.');
      // Add the data to the 'Selected' collection
      selectedItemsData.forEach(data => {
        firebase.firestore().collection('Selected').add(data);
      });
      setSnackbarOpen(true);
      Navigation('/')
      // Fetch data again after updating
      fetchData();
    } catch (error) {
      console.error('Error picking items:', error);
      setSnackbarMessage('Failed to pick items. Please try again.');
      setSnackbarOpen(true);
    }
  };
  
  
  const fetchData = async () => {
    const musicCollection = await firebase.firestore().collection('Music').where('Status', '==', 'Available').get();
    const musicList = musicCollection.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setMusicData(musicList);
  };

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(async (user) => {
        if (user && user.email) {
            setPickerEmail(user.email);
        } else {
            Navigation('/');
        }
    });
    return () => unsubscribe();
}, []);

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };
  const [picked,setPicked] = useState(false);
  useEffect(() => {
    const checkPickedItems = async () => {
      try {
        const musicRef = await firebase.firestore().collection('Selected').where('pickerEmail', '==', pickerEmail).get();
        if (!musicRef.empty) {
          // If there are picked items for the current user, set picked state to true
          setPicked(true);
        } else {
          // If there are no picked items for the current user, set picked state to false
          setPicked(false);
        }
      } catch (error) {
        console.error('Error checking picked items:', error);
      }
    };
  
    checkPickedItems();
  }, [pickerEmail]);
  
  

  return (
  <div>
        <Navbar email={pickerEmail} />
      <div style={{marginTop:"60px"}} > 
      {musicData.map(item => (
        <div key={item.id}>
          <FormControlLabel
            control={
              <Checkbox
                checked={selectedItems.includes(item.id)}
                onChange={() => handleCheckboxChange(item.id)}
              />
            }
            label={`${item.name} `}
          />
        </div>
      ))}
      {musicData.length == 0 && (<center> <h1  style={{color:"red"}}>Sorry No music left , better luck next time.</h1> </center>)}
      <center>
        {picked ? (<> <h1 style={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: 1000 ,color:'red'}}> You already picked the three musics </h1> </>) :(
            <>
                  <Button style={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: 1000 }} variant='contained' disabled={selectedItems.length !== 3} onClick={handleAbleButtonClick}>Pick</Button>

            </>
        )}
      </center>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message={snackbarMessage}
      />
    </div>
  </div>
  );
};



export default MusicPicker;
