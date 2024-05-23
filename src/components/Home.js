import React, { useState, useEffect } from 'react';
import { FormControlLabel, Checkbox, Button, Snackbar,Typography,TextField,Autocomplete,Paper  } from '@mui/material';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Navbar from './NavBar';
import './Home.css'
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
      const musicCollection = await firebase.firestore().collection('Music')
      // .where('Status', '==', 'Available')
      .get();
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
  const [loading,setLoading] = useState(false);
const handleAbleButtonClick = async () => {
  setLoading(true)
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
      setLoading(false)
      // Add the data to the 'Selected' collection
      selectedItemsData.forEach(data => {
        firebase.firestore().collection('Selected').add(data);
      });
      setSnackbarOpen(true);
      setLoading(false)
      Navigation('/')
      // Fetch data again after updating
      fetchData();
    } catch (error) {
      console.error('Error picking items:', error);
      setSnackbarMessage('Failed to pick items. Please try again.');
      setSnackbarOpen(true);
      setLoading(false)
    }
  };
  
  
  const fetchData = async () => {
    const musicCollection = await firebase.firestore().collection('Music')
    // .where('Status', '==', 'Available')
    .get();
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
  
  

  // return (
  //   <div>
  //     <Navbar email={pickerEmail} />
  //     <div className="container">
  //       {musicData.length > 0 ? (
  //         musicData.map((item) => (
  //           <center key={item.id}>
  //             <div className="music-item">
  //               <FormControlLabel
  //                 label={item.name}
  //                 control={
  //                   <Checkbox
  //                     checked={selectedItems.includes(item.id)}
  //                     onChange={() => handleCheckboxChange(item.id)}
  //                     disabled={item.Status !== 'Available'}
  //                   />
  //                 }
  //               />
  //               {item.Status !== 'Available' && (
  //                 <span className="unavailable-text">Music Not Available</span>
  //               )}
  //             </div>
  //           </center>
  //         ))
  //       ) : (
  //         <center>
  //           <h1 className="no-music-message">Sorry, no music left. Better luck next time.</h1>
  //         </center>
  //       )}
  //       <center>
  //         {picked ? (
  //           <h1 className="fixed-text">
  //             You already picked three musics
  //           </h1>
  //         ) : (
  //           <Button
  //             className="fixed-button"
  //             variant='contained'
  //             disabled={selectedItems.length !== 3}
  //             onClick={handleAbleButtonClick}
  //           >
  //             Pick
  //           </Button>
  //         )}
  //       </center>
  //       <Snackbar
  //         open={snackbarOpen}
  //         autoHideDuration={6000}
  //         onClose={handleCloseSnackbar}
  //         message={snackbarMessage}
  //       />
  //     </div>
  //   </div>
  // );

  return (
    <div>
      <Navbar email={pickerEmail} />
      <div className="container">
        {musicData.length > 0 ? (
          musicData.map((item) => (
            <center key={item.id}>
              <div className="music-item">
                {item.Status === 'Available' ? (
                  <Paper
                    elevation={3}
                    className={`paper ${selectedItems.includes(item.id) ? 'selected' : ''}`}
                    onClick={() =>{
                      if(picked){
                        setSnackbarMessage('You can only select up to 3 items.');
                        setSnackbarOpen(true);
                        return false
                      }
                      else{
                        handleCheckboxChange(item.id)
                      }
                    }}
                  >
                    <span style={{fontSize:"larger"}}>
                      <bold>
                        {item.name}
                      </bold>
                      </span> 
                  </Paper>
                ) : (
                  <>
                 {item.Picker == pickerEmail ? ( <Paper
                    elevation={3}
                    className={`paper unavailable ${selectedItems.includes(item.id) ? 'selected' : ''}`}
                    style={{backgroundColor:"#1db954"}}
                  >
                    <span style={{fontSize:"larger"}}>
<bold>
  {item.name}
</bold>

                    </span>
                     {item.Status !== 'Available' && (
                  <p style={{color:"red"}}>You picked {item.Picker}</p>
                )}
                  </Paper>):(
                     <Paper
                     elevation={3}
                     className={`paper unavailable ${selectedItems.includes(item.id) ? 'selected' : ''}`}
                   >
                     <span style={{fontSize:"larger"}}>
<bold>
  {item.name}
</bold>

                     </span>
                      {item.Status !== 'Available' && (
                   <p style={{color:"red"}}>Song taken by {item.Picker}</p>
                 )}
                   </Paper>
                  )}
                  </>
                )}
                {/* {item.Status !== 'Available' && (
                  <span className="unavailable-text">Song taken by {item.Picker}</span>
                )} */}
              </div>
            </center>
          ))
        ) : (
          <center>
            <h1 className="no-music-message">Sorry, no music left. Better luck next time.</h1>
          </center>
        )}
        <center>
          {picked ? (
           <>
                   <center>
        <h1 className="fixed-text" >
          <center>
          You already picked three songs

          </center>
            </h1>
        </center>
           </>
          ) : (
            <Button
              className="fixed-button"
              variant='contained'
              disabled={selectedItems.length !== 3 || loading}
              onClick={handleAbleButtonClick}
              style={{position:"fixed",right:1}}
            >
              {loading ? (  <CircularProgress size={25} style={{ color: "#fff" }} />):'Pick'}
            </Button>

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
