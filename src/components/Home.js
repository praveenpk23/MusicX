import React, { useState, useEffect, } from 'react';
import { FormControlLabel, Checkbox, Button, Snackbar,Typography,TextField,Autocomplete,Paper, selectClasses  } from '@mui/material';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { CircularProgress } from '@mui/material';
import { useNavigate,useParams } from 'react-router-dom';
import Navbar from './NavBar';
import './Home.css'
const MusicPicker = () => {
  const [musicData, setMusicData] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [pickerEmail, setPickerEmail] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const Navigation = useNavigate();


  const handleCheckboxChange = (id) => {
    let updatedSelectedItems;
    const C = Selectcount+3
    
    if (selectedItems.includes(id)) {
      updatedSelectedItems = selectedItems.filter(item => item !== id);
    } else {  
     
      updatedSelectedItems = [...selectedItems, id];
    }
    setSelectedItems(updatedSelectedItems);
  };
  const { language } = useParams();

  useEffect(() => {
    fetchData();
  },[]);
const [Selectcount,setSelectCount] = useState('')
useEffect(() => {


  fetchPickCount();
}, []); // Empty dependency array ensures this effect runs only once on component mount
const fetchPickCount = async () => {
if(pickerEmail){
  try {
    const musicSelectSnapshot = await firebase.firestore().collection('Music')
      .where('Picker', '==', pickerEmail)
      .get();

    const numberOfPicks = musicSelectSnapshot.docs.length;
    setSelectCount(numberOfPicks);
  } catch (error) {
    console.error('Error fetching pick count:', error);
    setSelectCount(0);
  }
}
};

const fetchData = async () => {
  try {
    // Fetch music data where language matches and status is "Available"
    const musicCollection = await firebase.firestore().collection('Music')
      .where('language', '==', language)
      // .where('Status', '==', 'Available')
      .get(); 
    // Map the documents to create a list of music items
      const musicList = musicCollection.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    // Set the music data
    setMusicData(musicList);
  } catch (error) {
    console.error('Error fetching music:', error);
  }
};
  const [loading,setLoading] = useState(false);

  // const handleAbleButtonClick = async () => {
  //   setLoading(true);
  //   try {
  //     // Check if all selected items have a status of "Available"
  //     const unavailableItems = selectedItems.filter(itemId => {
  //       const item = musicData.find(item => item.id === itemId);
  //       return item && item.Status !== 'Available';
  //     });
  
  //     if (unavailableItems.length > 0) {
  //       setSnackbarMessage('Some items are not available. Please try different ones.');
  //       setSnackbarOpen(true);
  //       setLoading(false);
  //       return;
  //     }
  
  //     // Check if any of the selected items have been picked by someone else
  //     const pickedItems = await Promise.all(selectedItems.map(async itemId => {
  //       const itemDoc = await firebase.firestore().collection('Music').doc(itemId).get();
  //       return itemDoc.data().Picker ? itemId : null;
  //     }));
  
  //     if (pickedItems.filter(item => item !== null).length > 0) {
  //       setSnackbarMessage('Someone has already picked one of the selected items. Please choose different items.');
  //       setSnackbarOpen(true);
  //       fetchData();
  //       setLoading(false);
  //       return;
  //     }
  
  //     // Check how many items the picker has already picked
  //     const pickedByUser = await firebase.firestore().collection('Music')
  //       .where('Picker', '==', pickerEmail)
  //       .get();
  
  //     const pickedCount = pickedByUser.size;
  
  //     if (pickedCount >= 3) {
  //       setSnackbarMessage('You have already picked the maximum number of items.');
  //       setSnackbarOpen(true);
  //       setLoading(false);
  //       setPicked(true);
  //       return;
  //     }
  
  //     const remainingSlots = 3 - pickedCount;
  
  //     if (selectedItems.length > remainingSlots) {
  //       setSnackbarMessage(`You can only pick ${remainingSlots} more item(s).`);
  //       setSnackbarOpen(true);
  //       setLoading(false);
  //       return;
  //     }
  
  //     const batch = firebase.firestore().batch();
  
  //     // Update status of selected items to "Picked" and set picker's email
  //     selectedItems.forEach(itemId => {
  //       const musicRef = firebase.firestore().collection('Music').doc(itemId);
  //       batch.update(musicRef, { Status: 'Picked', Picker: pickerEmail, Date: new Date() });
  //     });
  
  //     // Commit the batch update
  //     await batch.commit();
  
  //     setSnackbarMessage('Items successfully picked.');
  //     setSnackbarOpen(true);
  //     setLoading(false);
  //     // Navigation('/');
  
  //     // Fetch data again after updating
  //     fetchData();
  //   } catch (error) {
  //     console.error('Error picking items:', error);
  //     setSnackbarMessage('Failed to pick items. Please try again.');
  //     setSnackbarOpen(true);
  //     setLoading(false);
  //   }
  // };
 
  const handleAbleButtonClick = async () => {
    setLoading(true);
    try {
      // Check if all selected items have a status of "Available"
      const unavailableItems = selectedItems.filter(itemId => {
        const item = musicData.find(item => item.id === itemId);
        return item && item.Status !== 'Available';
      });
  
      if (unavailableItems.length > 0) {
        setSnackbarMessage('Some items are not available. Please try different ones.');
        setSnackbarOpen(true);
        setLoading(false);
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
        setLoading(false);
        return;
      }
  
      // Check how many items the picker has already picked
      const pickedByUser = await firebase.firestore().collection('Music')
        .where('Picker', '==', pickerEmail)
        .get();
  
      const pickedCount = pickedByUser.size;
  
      if (pickedCount >= 3) {
        setSnackbarMessage('You have already picked the maximum number of items.');
        setSnackbarOpen(true);
        setLoading(false);
        setPicked(true);
        return;
      }
  
      const remainingSlots = 3 - pickedCount;
  
      if (selectedItems.length > remainingSlots) {
        setSnackbarMessage(`You can only pick ${remainingSlots} more item(s).`);
        setSnackbarOpen(true);
        setLoading(false);
        return;
      }
  
      const batch = firebase.firestore().batch();
  
      // Update status of selected items to "Picked" and set picker's email and dates
      const today = new Date();
      const oneWeekLater = new Date(today);
      oneWeekLater.setDate(oneWeekLater.getDate() + 7);
  
      selectedItems.forEach(itemId => {
        const musicRef = firebase.firestore().collection('Music').doc(itemId);
        batch.update(musicRef, { 
          Status: 'Picked', 
          Picker: pickerEmail, 
          StartDate: today, 
          EndDate: oneWeekLater
        });
      });
  
      // Commit the batch update
      await batch.commit();
  
      setSnackbarMessage('Items successfully picked.');
      setSnackbarOpen(true);
      setLoading(false);
      // Navigation('/');
  
      // Fetch data again after updating
      fetchData();
    } catch (error) {
      console.error('Error picking items:', error);
      setSnackbarMessage('Failed to pick items. Please try again.');
      setSnackbarOpen(true);
      setLoading(false);
    }
  };
  
  useEffect(() => {
    const checkExpiredItems = async () => {
      try {
        const today = new Date();
        
        // Set time to 00:00:00 for accurate comparison
        today.setHours(0, 0, 0, 0);
  
        // Query items where EndDate is present or past
        const expiredItemsSnapshot = await firebase.firestore().collection('Music')
          .where('EndDate', '<=', today)
          .get();
        
        const batch = firebase.firestore().batch();
  
        expiredItemsSnapshot.forEach(doc => {
          const expiredData = doc.data();
          // Add expired data to 'Expired' collection
          firebase.firestore().collection('Expired').doc(doc.id).set({
            SongName: expiredData.SongName,
            Picker: expiredData.Picker,
            StartDate: expiredData.StartDate,
            EndDate: expiredData.EndDate
          });
  
          // Update status to 'Available' and remove picker, startDate, endDate
          batch.update(doc.ref, {
            Status: 'Available',
            Picker: firebase.firestore.FieldValue.delete(),
            StartDate: firebase.firestore.FieldValue.delete(),
            EndDate: firebase.firestore.FieldValue.delete()
          });
        });
  
        // Commit the batch update
        await batch.commit();
      } catch (error) {
        console.error('Error checking expired items:', error);
      }
    };
  
    checkExpiredItems();
  }, []);
  
  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(async (user) => {
      if (user && user.email) {
        await setPickerEmail(user.email);
        // Fetch pick count once pickerEmail is set
        await fetchPickCount();
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
  
console.log(musicData)
return (
  // <div>
  //   <Navbar email={pickerEmail} />

  //   <div className="container">
  //     {musicData.length > 0 ? (
  //       musicData.map((item) => (
  //         <center key={item.id}>
  //           <div className="music-item">
  //             {item.Status === 'Available' ? (
  //               <Paper
  //                 elevation={3}
  //                 className={`paper ${selectedItems.includes(item.id) ? 'selected' : ''}`}
  //                 onClick={() => handleCheckboxChange(item.id)}
  //               >
  //                 <div className="music-info">
  //                   <div className="music-name">
  //                     <b>{item.name}</b>
  //                   </div>
  //                   <div>
  //                     Artist: {item.artist}<br />
  //                     Category: {item.category}<br />
  //                     Director: {item.musicDirector}
  //                   </div>
  //                 </div>
  //               </Paper>
  //             ) : (
  //               <>
  //                 {item.Picker === pickerEmail ? (
  //                   <Paper
  //                     elevation={3}
  //                     className={`paper unavailable ${selectedItems.includes(item.id) ? 'selected' : ''}`}
  //                     style={{ backgroundColor: "#1db954" }}
  //                   >
  //                     <div className="music-info">
  //                       <div className="music-name">
  //                         <b>{item.name}</b>
  //                       </div>
  //                       <div>
  //                         Artist: {item.artist}<br />
  //                         Category: {item.category}<br />
  //                         Director: {item.musicDirector}<br />
  //                         Start Date: {new Date(item.StartDate).toLocaleString()}<br />
  //                         End Date: {new Date(item.EndDate).toLocaleString()}
  //                       </div>
  //                     </div>
  //                     <p style={{ color: "red" }}>You picked {item.Picker}</p>
  //                   </Paper>
  //                 ) : (
  //                   <Paper
  //                     elevation={3}
  //                     className={`paper unavailable ${selectedItems.includes(item.id) ? 'selected' : ''}`}
  //                   >
  //                     <div className="music-info">
  //                       <div className="music-name">
  //                         <b>{item.name}</b>
  //                       </div>
  //                       <div>
  //                         Artist: {item.artist}<br />
  //                         Category: {item.category}<br />
  //                         Director: {item.musicDirector}
  //                       </div>
  //                     </div>
  //                     <p style={{ color: "red" }}>Song taken by {item.Picker}</p>
  //                   </Paper>
  //                 )}
  //               </>
  //             )}
  //           </div>
  //         </center>
  //       ))
  //     ) : (
  //       <center>
  //         <h1 className="no-music-message">Sorry, no music left. Better luck next time.</h1>
  //       </center>
  //     )}
  //     <center>
  //       {Selectcount === 0 ? (
  //         <h1 className="fixed-text">
  //           You already picked three songs
  //         </h1>
  //       ) : (
  //         <Button
  //           className="fixed-button"
  //           variant='contained'
  //           onClick={handleAbleButtonClick}
  //           style={{ position: "fixed", right: 1 }}
  //         >
  //           {loading ? <CircularProgress size={25} style={{ color: "#fff" }} /> : 'Pick'}
  //         </Button>
  //       )}
  //     </center>
  //     <Snackbar
  //       open={snackbarOpen}
  //       autoHideDuration={6000}
  //       onClose={handleCloseSnackbar}
  //       message={snackbarMessage}
  //     />
  //   </div>
  // </div>

<div>
  <Navbar email={pickerEmail} />
  <div className="container">
    {musicData.length > 0 ? (
      <table className="music-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Artist</th>
            <th>Category</th>
            <th>Director</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {musicData.map((item) => (
            <tr
              key={item.id}
              className={`${selectedItems.includes(item.id) ? 'selected' : ''} ${item.Picker === pickerEmail ? 'user-picked' : ''}`}
              onClick={() => item.Status === 'Available' ? handleCheckboxChange(item.id) : null}
              style={{ cursor: item.Status === 'Available' ? 'pointer' : 'not-allowed' }}
            >
              <td>{item.name}</td>
              <td>{item.artist}</td>
              <td>{item.category}</td>
              <td>{item.musicDirector}</td>
              <td>
                {item.Status === 'Available' ? (
                  <Paper elevation={3} className="paper">
                    Available
                  </Paper>
                ) : (
                  <Paper elevation={3} className={`paper unavailable ${item.Picker === pickerEmail ? 'user-picked' : ''}`}>
                    {item.Picker === pickerEmail ? (
                      <>
                        <div>You picked {item.Picker}</div>
                        <div>Start Date: {new Date(item.StartDate.toDate()).toLocaleString()}</div>
                        <div>End Date: {new Date(item.EndDate.toDate()).toLocaleString()}</div>
                     
                      </>
                    ) : (
                     <>
                      <div>Song taken by {item.Picker}</div>
                      <div>Start Date: {new Date(item.StartDate.toDate()).toLocaleString()}</div>
                        <div>End Date: {new Date(item.EndDate.toDate()).toLocaleString()}</div>
                     
                     </>
                    )}
                  </Paper>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    ) : (
      <center>
        <h1 className="no-music-message">Sorry, no music left. Better luck next time.</h1>
      </center>
    )}
    <center>
      {Selectcount === 0 ? (
        <h1 className="fixed-text">You already picked three songs</h1>
      ) : (
        <Button className="fixed-button" variant='contained'
        style={{position:"fixed",right:2}}
        onClick={handleAbleButtonClick}>
          {loading ? <CircularProgress size={25} style={{ color: "#fff" }} /> : 'Pick'}
        </Button>
      )}
    </center>
    <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleCloseSnackbar} message={snackbarMessage} />
  </div>
</div>
);
};



export default MusicPicker;
