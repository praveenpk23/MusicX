import React, { useState, useEffect, } from 'react';
import { FormControlLabel, Checkbox, Button, Snackbar,Typography,TextField,Autocomplete,Paper, selectClasses ,TableCell,TableRow,TableContainer,TableHead,Table,TableBody} from '@mui/material';
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
      // const today = new Date();
      // const oneWeekLater = new Date(today);
      // oneWeekLater.setDate(oneWeekLater.getDate() + 7);
      const today = new Date();

      const oneWeekLater = new Date(today);
      oneWeekLater.setDate(oneWeekLater.getDate() + 7);
      
      console.log(today);
      console.log(oneWeekLater);

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
  
  // useEffect(() => {
  //   const checkExpiredItems = async () => {
  //     try {
  //       const today = new Date();
        
  //       // Query items where EndDate is present or past
  //       const expiredItemsSnapshot = await firebase.firestore().collection('Music')
  //         .where('EndDate', '<=', today)
  //         .get();
        
  //       const batch = firebase.firestore().batch();
  
  //       expiredItemsSnapshot.forEach(doc => {
  //         const expiredData = doc.data();
  //         // Add expired data to 'Expired' collection
  //         firebase.firestore().collection('Expired').doc(doc.id).set({
  //           SongName: expiredData.SongName,
  //           Picker: expiredData.Picker,
  //           StartDate: expiredData.StartDate,
  //           EndDate: expiredData.EndDate
  //         });
  
  //         // Update status to 'Available' and remove picker, startDate, endDate
  //         batch.update(doc.ref, {
  //           Status: 'Available',
  //           Picker: firebase.firestore.FieldValue.delete(),
  //           StartDate: firebase.firestore.FieldValue.delete(),
  //           EndDate: firebase.firestore.FieldValue.delete()
  //         });
  //       });
  
  //       // Commit the batch update
  //       await batch.commit();
  //     } catch (error) {
  //       console.error('Error checking expired items:', error);
  //     }
  //   };
  
  //   checkExpiredItems();
  // }, []);
 
 
 
  useEffect(() => {
    const checkExpiredItems = async () => {
        try {
            const today = firebase.firestore.Timestamp.now(); // Convert to Firestore Timestamp
        
            // Query all items in 'Music' collection
            const musicSnapshot = await firebase.firestore().collection('Music').get();
            
            const batch = firebase.firestore().batch();
    
            musicSnapshot.forEach(doc => {
                const musicData = doc.data();
                // Check if EndDate is in the past or present
                if (musicData.EndDate <= today) {
                    const expiredDocRef = firebase.firestore().collection('Expired').doc(doc.id);
                    
                    // Add expired data to 'Expired' collection
                    batch.set(expiredDocRef, {
                        SongName: musicData.name,
                        Picker: musicData.Picker,
                        StartDate: musicData.StartDate,
                        EndDate: musicData.EndDate
                    });
            
                    // Update status to 'Available' and remove Picker, StartDate, EndDate in original 'Music' collection
                    batch.update(doc.ref, {
                        Status: 'Available',
                        Picker: firebase.firestore.FieldValue.delete(),
                        StartDate: firebase.firestore.FieldValue.delete(),
                        EndDate: firebase.firestore.FieldValue.delete()
                    });
                }
            });
    
            // Commit the batch update
            await batch.commit();
            console.log('Expired items processed successfully.');
            // fetchData()
        } catch (error) {
            console.error('Error checking expired items:', error);
            // Log additional details for debugging
            console.error('Error Details:', {
                message: error.message,
                stack: error.stack,
                code: error.code
            });
        }
    };
    
    checkExpiredItems();
}, []); // Dependency array to run once

 
 
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
// Filter
const [searchName, setSearchName] = useState('');
  const [searchArtist, setSearchArtist] = useState('');
  const [searchCategory, setSearchCategory] = useState('');
  const [searchDirector, setSearchDirector] = useState('');
  const [searchStatus, setSearchStatus] = useState('');

  // Filter music data based on search inputs
  const filteredMusicData = musicData.filter(item => 
    item.name.toLowerCase().includes(searchName.toLowerCase()) &&
    item.artist.toLowerCase().includes(searchArtist.toLowerCase()) &&
    item.category.toLowerCase().includes(searchCategory.toLowerCase()) &&
    item.musicDirector.toLowerCase().includes(searchDirector.toLowerCase()) &&
    item.Status.toLowerCase().includes(searchStatus.toLowerCase())
  );

// return (
//   <div>
//   <Navbar email={pickerEmail} />
//   <div className="container">
//     <TableContainer component={Paper}>
//       <Table className="music-table">
//         <TableHead>
//           <TableRow>
//             <TableCell>
//               <TextField 
//                 label="Name" 
//                 value={searchName} 
//                 onChange={(e) => setSearchName(e.target.value)} 
//                 variant="outlined" 
//                 size="small" 
//               />
//             </TableCell>
//             <TableCell>
//               <TextField 
//                 label="Artist" 
//                 value={searchArtist} 
//                 onChange={(e) => setSearchArtist(e.target.value)} 
//                 variant="outlined" 
//                 size="small" 
//               />
//             </TableCell>
//             <TableCell>
//               <TextField 
//                 label="Category" 
//                 value={searchCategory} 
//                 onChange={(e) => setSearchCategory(e.target.value)} 
//                 variant="outlined" 
//                 size="small" 
//               />
//             </TableCell>
//             <TableCell>
//               <TextField 
//                 label="Director" 
//                 value={searchDirector} 
//                 onChange={(e) => setSearchDirector(e.target.value)} 
//                 variant="outlined" 
//                 size="small" 
//               />
//             </TableCell>
//             <TableCell>
//               <TextField 
//                 label="Status" 
//                 value={searchStatus} 
//                 onChange={(e) => setSearchStatus(e.target.value)} 
//                 variant="outlined" 
//                 size="small" 
//               />
//             </TableCell>
//           </TableRow>
//           <TableRow>
//             <TableCell>Name</TableCell>
//             <TableCell>Artist</TableCell>
//             <TableCell>Category</TableCell>
//             <TableCell>Director</TableCell>
//             <TableCell>Status</TableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {filteredMusicData.length > 0 ? (
//             filteredMusicData.map((item) => (
//               <TableRow
//                 key={item.id}
//                 className={`${selectedItems.includes(item.id) ? 'selected' : ''} ${item.Picker === pickerEmail ? 'user-picked' : ''}`}
//                 onClick={() => item.Status === 'Available' ? handleCheckboxChange(item.id) : null}
//                 style={{ cursor: item.Status === 'Available' ? 'pointer' : 'not-allowed' }}
//               >
//                 <TableCell>{item.name}</TableCell>
//                 <TableCell>{item.artist}</TableCell>
//                 <TableCell>{item.category}</TableCell>
//                 <TableCell>{item.musicDirector}</TableCell>
//                 <TableCell>
//                   {item.Status === 'Available' ? (
//                     <Paper elevation={3} className="paper">
//                       Available
//                     </Paper>
//                   ) : (
//                     <Paper elevation={3} className={`paper unavailable ${item.Picker === pickerEmail ? 'user-picked' : ''}`}>
//                       {item.Picker === pickerEmail ? (
//                         <>
//                           <div>You picked {item.Picker}</div>
//                           <div>Start Date: {new Date(item.StartDate.toDate()).toLocaleString()}</div>
//                           <div>End Date: {new Date(item.EndDate.toDate()).toLocaleString()}</div>
//                         </>
//                       ) : (
//                         <div className='paper unavailable user-picked'>
//                           <div>Song taken by {item.Picker}</div>
//                           <div>Start Date: {new Date(item.StartDate.toDate()).toLocaleString()}</div>
//                           <div>End Date: {new Date(item.EndDate.toDate()).toLocaleString()}</div>
//                         </div>
//                       )}
//                     </Paper>
//                   )}
//                 </TableCell>
//               </TableRow>
//             ))
//           ) : (
//             <TableRow>
//               <TableCell colSpan={5} align="center">
//                 <h1 className="no-music-message">Sorry, no music left. Better luck next time.</h1>
//               </TableCell>
//             </TableRow>
//           )}
//         </TableBody>
//       </Table>
//     </TableContainer>
//     <center>
//       {Selectcount === 0 ? (
//         <h1 className="fixed-text">You already picked three songs</h1>
//       ) : (
//         <Button 
//           className="fixed-button" 
//           variant='contained'
//           style={{ position: "fixed", right: 2 }}
//           onClick={handleAbleButtonClick}
//         >
//           {loading ? <CircularProgress size={25} style={{ color: "#fff" }} /> : 'Pick'}
//         </Button>
//       )}
//     </center>
//     <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleCloseSnackbar} message={snackbarMessage} />
//   </div>
// </div>
// );

return (
  <div>
    <Navbar email={pickerEmail} />
    <div className="container">
      <center>
      <h1 style={{marginTop:"0px"}}>{language}</h1>
      </center>
      <TableContainer component={Paper} style={{ overflowX: 'auto' }}>
        
        <Table className="music-table">
          <TableHead>
            <TableRow >
              <TableCell style={{backgroundColor:"white"}} >
                <TextField 
                  label="Name (Search)" 
                  value={searchName} 
                  onChange={(e) => setSearchName(e.target.value)} 
                  variant="outlined" 
                  size="small" 
                  fullWidth
                />
              </TableCell >
              <TableCell style={{backgroundColor:"white"}}>
                <TextField 
                  label="Artist (Search)" 
                  value={searchArtist} 
                  onChange={(e) => setSearchArtist(e.target.value)} 
                  variant="outlined" 
                  size="small" 
                  fullWidth
                />
              </TableCell>
              <TableCell style={{backgroundColor:"white"}}>
                <TextField 
                  label="Category (Search)" 
                  value={searchCategory} 
                  onChange={(e) => setSearchCategory(e.target.value)} 
                  variant="outlined" 
                  size="small" 
                  fullWidth
                />
              </TableCell>
              <TableCell style={{backgroundColor:"white"}}>
                <TextField 
                  label="Director (Search)" 
                  value={searchDirector} 
                  onChange={(e) => setSearchDirector(e.target.value)} 
                  variant="outlined" 
                  size="small" 
                  fullWidth
                />
              </TableCell>
              <TableCell style={{backgroundColor:"white"}}>
                <TextField 
                  label="Status (Search)" 
                  value={searchStatus} 
                  onChange={(e) => setSearchStatus(e.target.value)} 
                  variant="outlined" 
                  size="small" 
                  fullWidth
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Artist</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Director</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredMusicData.length > 0 ? (
              filteredMusicData.map((item) => (
                <TableRow
                  key={item.id}
                  className={`${selectedItems.includes(item.id) ? 'selected' : ''} ${item.Picker === pickerEmail ? 'user-picked' : ''}`}
                  onClick={() => item.Status === 'Available' ? handleCheckboxChange(item.id) : null}
                  style={{ cursor: item.Status === 'Available' ? 'pointer' : 'not-allowed' }}
                >
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.artist}</TableCell>
                  <TableCell>{item.category}</TableCell>
                  <TableCell>{item.musicDirector}</TableCell>
                  <TableCell>
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
                          <div className='paper unavailable user-picked'>
                            <div>Song taken by {item.Picker}</div>
                            <div>Start Date: {new Date(item.StartDate.toDate()).toLocaleString()}</div>
                            <div>End Date: {new Date(item.EndDate.toDate()).toLocaleString()}</div>
                          </div>
                        )}
                      </Paper>
                    )}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  <h1 className="no-music-message">Sorry, no music left. Better luck next time.</h1>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <center>
        {Selectcount === 0 ? (
          <h1 className="fixed-text">You already picked three songs</h1>
        ) : (
          <Button 
            className="fixed-button" 
            variant='contained'
            style={{ position: "fixed", right: 2 ,marginRight:"2px"}}
            disabled={selectedItems==0}
            onClick={handleAbleButtonClick}
          >
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
































{/* <div>
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
                     <div className='paper unavailable user-picked'>
                      <div>Song taken by {item.Picker}</div>
                      <div>Start Date: {new Date(item.StartDate.toDate()).toLocaleString()}</div>
                        <div>End Date: {new Date(item.EndDate.toDate()).toLocaleString()}</div>
                     
                     </div>
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
</div> */}