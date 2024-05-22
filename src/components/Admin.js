// import React, { useState, useEffect } from 'react';
// import { TextField, Button, Typography, Paper, List, ListItem, ListItemText } from '@mui/material';
// import firebase from 'firebase/compat/app';
// import 'firebase/compat/firestore';
// import Navbar from './NavBar';
// import CircularProgress from '@mui/material/CircularProgress';
// const AdminPage = () => {
//   const [musicName, setMusicName] = useState('');
//   const [musicList, setMusicList] = useState([]);
//   const [loading,setLoading] = useState(false);
//   useEffect(() => {
//     // Fetch music data when the component mounts
//     const fetchMusic = async () => {
//       try {
//         const snapshot = await firebase.firestore().collection('Music').get();
//         const musicData = snapshot.docs.map(doc => ({ id: doc.id, name: doc.data().name }));
//         setMusicList(musicData);
//       } catch (error) {
//         console.error('Error fetching music:', error);
//       }
//     };

//     fetchMusic();
//   }, []);

// //   const handleAddMusic = async () => {
// //     if (!musicName.trim()) {
// //       alert('Please enter a music name.');
// //       return;
// //     }

// //     try {
// //       // Add music to the collection
// //       await firebase.firestore().collection('Music').add({ Name: musicName });
// //       // Refresh the music list
// //       const snapshot = await firebase.firestore().collection('Music').get();
// //       const musicData = snapshot.docs.map(doc => ({ id: doc.id, name: doc.data().name }));
// //       setMusicList(musicData);
// //       // Clear the input field
// //       setMusicName('');
// //     } catch (error) {
// //       console.error('Error adding music:', error);
// //       alert('Failed to add music. Please try again.');
// //     }
// //   };

// const handleAddMusic = async () => {
//     if (!musicName.trim()) {
//       alert('Please enter a music name.');
//       return;
//     }
  
//     setLoading(true);
//     try {
//       // Generate a unique document ID
//       const docRef = firebase.firestore().collection('Music').doc();
//       // Add music to the collection with the generated document ID
//       await docRef.set({ id: docRef.id, name: musicName });
//       // Refresh the music list
//       const snapshot = await firebase.firestore().collection('Music').get();
//       const musicData = snapshot.docs.map(doc => ({ id: doc.id, docid: doc.id, Name: doc.data().name }));
//       setMusicList(musicData);
//       // Clear the input field
//       setMusicName('');
//     } catch (error) {
//       console.error('Error adding music:', error);
//       alert('Failed to add music. Please try again.');
//     }
//     setLoading(false);
//   };
  
//   return (
//     <div>
//       <Navbar />
//       <Paper style={{ padding: 20, maxWidth: 600, margin: '20px auto' }}>
//         <Typography variant="h5" gutterBottom>
//           Add Music
//         </Typography>
//         <TextField
//           label="Music Name"
//           fullWidth
//           value={musicName}
//           onChange={(e) => setMusicName(e.target.value)}
//           margin="normal"
//         />
//          <Button
//           variant="contained"
//           color="primary"
//           onClick={handleAddMusic}
//           disabled={loading}
//           style={{ marginLeft: 10 }}
//         >
//           {loading ? <CircularProgress size={24} color="inherit" /> : 'Add'}
//         </Button>
//       </Paper>
//       <Paper style={{ padding: 20, maxWidth: 600, margin: '20px auto' }}>
//         <Typography variant="h5" gutterBottom>
//           Music List
//         </Typography>
//         <List>
//           {musicList.map((music, index) => (
//             <ListItem key={index}>
//               <ListItemText primary={music.Name} />
//             </ListItem>
//           ))}
//         </List>
//       </Paper>
//     </div>
//   );
// };

// export default AdminPage;



import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Paper, List, ListItem, ListItemText } from '@mui/material';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import Navbar from './NavBar';
import CircularProgress from '@mui/material/CircularProgress';

const AdminPage = () => {
  const [musicName, setMusicName] = useState('');
  const [musicList, setMusicList] = useState([]);
  const [loading,setLoading] = useState(false);

  useEffect(() => {
    // Fetch music data when the component mounts
    const fetchMusic = async () => {
      try {
        const snapshot = await firebase.firestore().collection('Music')
        // .where('Status','==','Available')
        .get();
        const musicData = snapshot.docs.map(doc => ({ id: doc.id, name: doc.data().name }));
        setMusicList(musicData);
      } catch (error) {
        console.error('Error fetching music:', error);
      }
    };

    fetchMusic();
  }, []);

  const handleAddMusic = async () => {
    if (!musicName.trim()) {
      alert('Please enter a music name.');
      return;
    }
  
    setLoading(true);
    try {
      // Generate a unique document ID
      const docRef = firebase.firestore().collection('Music').doc();
      // Add music to the collection with the generated document ID
      await docRef.set({ id: docRef.id, name: musicName });
      // Refresh the music list
      const snapshot = await firebase.firestore().collection('Music').get();
      const musicData = snapshot.docs.map(doc => ({ id: doc.id, name: doc.data().name }));
      setMusicList(musicData);
      // Clear the input field
      setMusicName('');
    } catch (error) {
      console.error('Error adding music:', error);
      alert('Failed to add music. Please try again.');
    }
    setLoading(false);
  };
  
  return (
    <div>
      <Navbar />
      <Paper style={{ padding: 20, maxWidth: 600, margin: '20px auto' ,marginTop:"100px"}}>
        <Typography variant="h5" gutterBottom>
          Add Music
        </Typography>
        <TextField
          label="Music Name"
          fullWidth
          value={musicName}
          onChange={(e) => setMusicName(e.target.value)}
          margin="normal"
        />
         <Button
          variant="contained"
          color="primary"
          onClick={handleAddMusic}
          disabled={loading}
          style={{ marginLeft: 10 }}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : 'Add'}
        </Button>
      </Paper>
      <Paper style={{ padding: 20, maxWidth: 600, margin: '20px auto' }}>
        <Typography variant="h5" gutterBottom>
          Music List
        </Typography>
        <List>
          {musicList.map((music, index) => (
            <ListItem key={index}>
                {index + 1}. 
              <ListItemText primary={music.name} />
            </ListItem>
          ))}
        </List>


      </Paper>
    </div>
  );
};

export default AdminPage;
