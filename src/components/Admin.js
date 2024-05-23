

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
//         const snapshot = await firebase.firestore().collection('Music')
        // .where('Status','==','Available')
//         .get();
//         const musicData = snapshot.docs.map(doc => ({ id: doc.id, name: doc.data().name }));
//         setMusicList(musicData);
//       } catch (error) {
//         console.error('Error fetching music:', error);
//       }
//     };

//     fetchMusic();
//   }, []);

//   const handleAddMusic = async () => {
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
//       const musicData = snapshot.docs.map(doc => ({ id: doc.id, name: doc.data().name }));
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
//       <Paper style={{ padding: 20, maxWidth: 600, margin: '20px auto' ,marginTop:"100px"}}>
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
//                 {index + 1}. 
//               <ListItemText primary={music.name} />
//             </ListItem>
//           ))}
//         </List>


//       </Paper>
//     </div>
//   );
// };

// export default AdminPage;



// import React, { useState, useEffect } from 'react';
// import { TextField, Button, Typography, Paper, List, ListItem, ListItemText, IconButton } from '@mui/material';
// import { Edit, Delete, Save, Cancel } from '@mui/icons-material';
// import firebase from 'firebase/compat/app';
// import 'firebase/compat/firestore';
// import Navbar from './NavBar';
// import CircularProgress from '@mui/material/CircularProgress';

// const AdminPage = () => {
//   const [musicName, setMusicName] = useState('');
//   const [musicList, setMusicList] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [editingId, setEditingId] = useState(null);
//   const [editingName, setEditingName] = useState('');

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

//   const handleAddMusic = async () => {
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
//       const musicData = snapshot.docs.map(doc => ({ id: doc.id, name: doc.data().name }));
//       setMusicList(musicData);
//       // Clear the input field
//       setMusicName('');
//     } catch (error) {
//       console.error('Error adding music:', error);
//       alert('Failed to add music. Please try again.');
//     }
//     setLoading(false);
//   };

//   const handleEditMusic = (id, name) => {
//     setEditingId(id);
//     setEditingName(name);
//   };

//   const handleSaveEdit = async (id) => {
//     if (!editingName.trim()) {
//       alert('Please enter a music name.');
//       return;
//     }

//     setLoading(true);
//     try {
//       await firebase.firestore().collection('Music').doc(id).update({ name: editingName });
//       const snapshot = await firebase.firestore().collection('Music').get();
//       const musicData = snapshot.docs.map(doc => ({ id: doc.id, name: doc.data().name }));
//       setMusicList(musicData);
//       setEditingId(null);
//       setEditingName('');
//     } catch (error) {
//       console.error('Error updating music:', error);
//       alert('Failed to update music. Please try again.');
//     }
//     setLoading(false);
//   };

//   const handleDeleteMusic = async (id) => {
//     setLoading(true);
//     try {
//       await firebase.firestore().collection('Music').doc(id).delete();
//       const snapshot = await firebase.firestore().collection('Music').get();
//       const musicData = snapshot.docs.map(doc => ({ id: doc.id, name: doc.data().name }));
//       setMusicList(musicData);
//     } catch (error) {
//       console.error('Error deleting music:', error);
//       alert('Failed to delete music. Please try again.');
//     }
//     setLoading(false);
//   };

//   const handleCancelEdit = () => {
//     setEditingId(null);
//     setEditingName('');
//   };

//   return (
//     <div>
//       <Navbar />
//       <Paper style={{ padding: 20, maxWidth: 600, margin: '20px auto', marginTop: "100px" }}>
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
//         <Button
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
//           {musicList.map((music) => (
//             <ListItem key={music.id} divider>
//               {editingId === music.id ? (
//                 <>
//                   <TextField
//                     value={editingName}
//                     onChange={(e) => setEditingName(e.target.value)}
//                     margin="normal"
//                   />
//                   <IconButton onClick={() => handleSaveEdit(music.id)} color="primary">
//                     <Save />
//                   </IconButton>
//                   <IconButton onClick={handleCancelEdit} color="secondary">
//                     <Cancel />
//                   </IconButton>
//                 </>
//               ) : (
//                 <>
//                   <ListItemText primary={music.name} />
//                   <IconButton onClick={() => handleEditMusic(music.id, music.name)} color="primary">
//                     <Edit />
//                   </IconButton>
//                   <IconButton onClick={() => handleDeleteMusic(music.id)} color="secondary">
//                     <Delete />
//                   </IconButton>
//                 </>
//               )}
//             </ListItem>
//           ))}
//         </List>
//       </Paper>
//     </div>
//   );
// };

// export default AdminPage;


import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Paper, List, ListItem, ListItemText, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import Navbar from './NavBar';

const AdminPage = () => {
  const [musicName, setMusicName] = useState('');
  const [musicList, setMusicList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editingName, setEditingName] = useState('');
  const [openConfirm, setOpenConfirm] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    // Fetch music data when the component mounts
    const fetchMusic = async () => {
      try {
        const snapshot = await firebase.firestore().collection('Music').where('Status','==','Available').get();
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

  const handleEditMusic = (id, name) => {
    setEditingId(id);
    setEditingName(name);
  };

  const handleSaveEdit = async (id) => {
    if (!editingName.trim()) {
      alert('Please enter a music name.');
      return;
    }

    setLoading(true);
    try {
      await firebase.firestore().collection('Music').doc(id).update({ name: editingName });
      const snapshot = await firebase.firestore().collection('Music').get();
      const musicData = snapshot.docs.map(doc => ({ id: doc.id, name: doc.data().name }));
      setMusicList(musicData);
      setEditingId(null);
      setEditingName('');
    } catch (error) {
      console.error('Error updating music:', error);
      alert('Failed to update music. Please try again.');
    }
    setLoading(false);
  };

  const handleDeleteMusic = async (id) => {
    setLoading(true);
    try {
      await firebase.firestore().collection('Music').doc(id).delete();
      const snapshot = await firebase.firestore().collection('Music').get();
      const musicData = snapshot.docs.map(doc => ({ id: doc.id, name: doc.data().name }));
      setMusicList(musicData);
    } catch (error) {
      console.error('Error deleting music:', error);
      alert('Failed to delete music. Please try again.');
    }
    setLoading(false);
  };

  const confirmDeleteMusic = (id) => {
    setDeleteId(id);
    setOpenConfirm(true);
  };

  const handleConfirmClose = () => {
    setOpenConfirm(false);
    setDeleteId(null);
  };

  const handleConfirmDelete = () => {
    handleDeleteMusic(deleteId);
    handleConfirmClose();
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditingName('');
  };

  return (
    <div>
      <Navbar />
      <Paper style={{ padding: 20, maxWidth: 600, margin: '20px auto', marginTop: "100px" }}>
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
          {musicList.map((music) => (
            <ListItem key={music.id} divider>
              {editingId === music.id ? (
                <>
                  <TextField
                    value={editingName}
                    onChange={(e) => setEditingName(e.target.value)}
                    margin="normal"
                    fullWidth
                  />
                  <Button onClick={() => handleSaveEdit(music.id)} color="primary" variant="contained" style={{ marginLeft: 10 }}>
                    Save
                  </Button>
                  <Button onClick={handleCancelEdit} color="secondary" variant="contained" style={{ marginLeft: 10 }}>
                    Cancel
                  </Button>
                </>
              ) : (
                <>
                  <ListItemText primary={music.name} />
                  <Button onClick={() => handleEditMusic(music.id, music.name)} color="primary" variant="outlined" style={{ marginLeft: 10 }}>
                    Edit
                  </Button>
                  <Button onClick={() => confirmDeleteMusic(music.id)} color="secondary" variant="outlined" style={{ marginLeft: 10 }}>
                    Delete
                  </Button>
                </>
              )}
            </ListItem>
          ))}
        </List>
      </Paper>
      <Dialog
        open={openConfirm}
        onClose={handleConfirmClose}
      >
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this music item?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleConfirmClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmDelete} color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AdminPage;
