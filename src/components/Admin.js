

// import React, { useState, useEffect } from 'react';
// import { TextField, Button, Typography, Paper, List, ListItem, ListItemText, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
// import firebase from 'firebase/compat/app';
// import 'firebase/compat/firestore';
// import Navbar from './NavBar';

// const AdminPage = () => {
//   const [musicName, setMusicName] = useState('');
//   const [musicList, setMusicList] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [editingId, setEditingId] = useState(null);
//   const [editingName, setEditingName] = useState('');
//   const [openConfirm, setOpenConfirm] = useState(false);
//   const [deleteId, setDeleteId] = useState(null);

//   useEffect(() => {
//     // Fetch music data when the component mounts
//     const fetchMusic = async () => {
//       try {
//         const snapshot = await firebase.firestore().collection('Music')
//         // .where('Status','==','Available')
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

//   const confirmDeleteMusic = (id) => {
//     setDeleteId(id);
//     setOpenConfirm(true);
//   };

//   const handleConfirmClose = () => {
//     setOpenConfirm(false);
//     setDeleteId(null);
//   };

//   const handleConfirmDelete = () => {
//     handleDeleteMusic(deleteId);
//     handleConfirmClose();
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
//                     fullWidth
//                   />
//                   <Button onClick={() => handleSaveEdit(music.id)} color="primary" variant="contained" style={{ marginLeft: 10 }}>
//                     Save
//                   </Button>
//                   <Button onClick={handleCancelEdit} color="secondary" variant="contained" style={{ marginLeft: 10 }}>
//                     Cancel
//                   </Button>
//                 </>
//               ) : (
//                 <>
//                   <ListItemText primary={music.name} />
//                   <Button onClick={() => handleEditMusic(music.id, music.name)} color="primary" variant="outlined" style={{ marginLeft: 10 }}>
//                     Edit
//                   </Button>
//                   <Button onClick={() => confirmDeleteMusic(music.id)} color="secondary" variant="outlined" style={{ marginLeft: 10 }}>
//                     Delete
//                   </Button>
//                 </>
//               )}
//             </ListItem>
//           ))}
//         </List>
//       </Paper>
//       <Dialog
//         open={openConfirm}
//         onClose={handleConfirmClose}
//       >
//         <DialogTitle>Confirm Deletion</DialogTitle>
//         <DialogContent>
//           <DialogContentText>
//             Are you sure you want to delete this music item?
//           </DialogContentText>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleConfirmClose} color="primary">
//             Cancel
//           </Button>
//           <Button onClick={handleConfirmDelete} color="secondary">
//             Delete
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </div>
//   );
// };

// export default AdminPage;



import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Paper, List, ListItem, ListItemText, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import Navbar from './NavBar';

const AdminPage = () => {
  const [musicName, setMusicName] = useState('');
  const [artist, setArtist] = useState('');
  const [musicDirector, setMusicDirector] = useState('');
  const [category, setCategory] = useState('');
  const [language, setLanguage] = useState('');
  const [musicList, setMusicList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editingMusic, setEditingMusic] = useState({
    name: '',
    artist: '',
    musicDirector: '',
    category: '',
    language: ''
  });
  const [openConfirm, setOpenConfirm] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    // Fetch music data when the component mounts
    const fetchMusic = async () => {
      try {
        const snapshot = await firebase.firestore().collection('Music').get();
        const musicData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setMusicList(musicData);
      } catch (error) {
        console.error('Error fetching music:', error);
      }
    };

    fetchMusic();
  }, []);

  const handleAddMusic = async () => {
    if (!musicName.trim() || !artist.trim() || !musicDirector.trim() || !category || !language) {
      alert('Please fill out all fields.');
      return;
    }

    setLoading(true);
    try {
      const docRef = firebase.firestore().collection('Music').doc();
      await docRef.set({ 
        id: docRef.id, 
        name: musicName, 
        artist, 
        musicDirector, 
        category, 
        language 
      });
      const snapshot = await firebase.firestore().collection('Music').get();
      const musicData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setMusicList(musicData);
      setMusicName('');
      setArtist('');
      setMusicDirector('');
      setCategory('');
      setLanguage('');
    } catch (error) {
      console.error('Error adding music:', error);
      alert('Failed to add music. Please try again.');
    }
    setLoading(false);
  };

  const handleEditMusic = (music) => {
    setEditingId(music.id);
    setEditingMusic(music);
  };

  const handleSaveEdit = async (id) => {
    if (!editingMusic.name.trim() || !editingMusic.artist.trim() || !editingMusic.musicDirector.trim() || !editingMusic.category || !editingMusic.language) {
      alert('Please fill out all fields.');
      return;
    }

    setLoading(true);
    try {
      await firebase.firestore().collection('Music').doc(id).update(editingMusic);
      const snapshot = await firebase.firestore().collection('Music').get();
      const musicData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setMusicList(musicData);
      setEditingId(null);
      setEditingMusic({
        name: '',
        artist: '',
        musicDirector: '',
        category: '',
        language: ''
      });
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
      const musicData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
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
    setEditingMusic({
      name: '',
      artist: '',
      musicDirector: '',
      category: '',
      language: ''
    });
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
        <TextField
          label="Artist"
          fullWidth
          value={artist}
          onChange={(e) => setArtist(e.target.value)}
          margin="normal"
        />
        <TextField
          label="Music Director"
          fullWidth
          value={musicDirector}
          onChange={(e) => setMusicDirector(e.target.value)}
          margin="normal"
        />
        <FormControl fullWidth margin="normal">
          <InputLabel>Category</InputLabel>
          <Select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <MenuItem value="Album">Album</MenuItem>
            <MenuItem value="Movie">Movie</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth margin="normal">
          <InputLabel>Language</InputLabel>
          <Select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          >
            <MenuItem value="Tamil">Tamil</MenuItem>
            <MenuItem value="English">English</MenuItem>
            <MenuItem value="Malayalam">Malayalam</MenuItem>
            <MenuItem value="Hindi">Hindi</MenuItem>
          </Select>
        </FormControl>
        <Button
          variant="contained"
          color="primary"
          onClick={handleAddMusic}
          disabled={loading}
          style={{ marginTop: 10 }}
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
                    label="Music Name"
                    fullWidth
                    value={editingMusic.name}
                    onChange={(e) => setEditingMusic({ ...editingMusic, name: e.target.value })}
                    margin="normal"
                  />
                  <TextField
                    label="Artist"
                    fullWidth
                    value={editingMusic.artist}
                    onChange={(e) => setEditingMusic({ ...editingMusic, artist: e.target.value })}
                    margin="normal"
                  />
                  <TextField
                    label="Music Director"
                    fullWidth
                    value={editingMusic.musicDirector}
                    onChange={(e) => setEditingMusic({ ...editingMusic, musicDirector: e.target.value })}
                    margin="normal"
                  />
                  <FormControl fullWidth margin="normal">
                    <InputLabel>Category</InputLabel>
                    <Select
                      value={editingMusic.category}
                      onChange={(e) => setEditingMusic({ ...editingMusic, category: e.target.value })}
                      variant='outlined'
                    >
                      <MenuItem value="Album">Album</MenuItem>
                      <MenuItem value="Movie">Movie</MenuItem>
                    </Select>
                  </FormControl>
                  <FormControl fullWidth margin="normal">
                    <InputLabel>Language</InputLabel>
                    <Select
                      value={editingMusic.language}
                      onChange={(e) => setEditingMusic({ ...editingMusic, language: e.target.value })}
                      variant='outlined'
                    >
                      <MenuItem value="Tamil">Tamil</MenuItem>
                      <MenuItem value="English">English</MenuItem>
                      <MenuItem value="Malayalam">Malayalam</MenuItem>
                      <MenuItem value="Hindi">Hindi</MenuItem>
                    </Select>
                  </FormControl>
                  <Button onClick={() => handleSaveEdit(music.id)} color="primary" variant="contained" style={{ marginTop: 10 }}>
                    Save
                  </Button>
                  <Button onClick={handleCancelEdit} color="secondary" variant="contained" style={{ marginTop: 10, marginLeft: 10 }}>
                    Cancel
                  </Button>
                </>
              ) : (
                <>
                  <ListItemText
                    primary={`${music.name} (${music.category} - ${music.language})`}
                    secondary={`Artist: ${music.artist}, Music Director: ${music.musicDirector}`}
                  />
                  <Button onClick={() => handleEditMusic(music)} color="primary" variant="outlined" style={{ marginLeft: 10 }}>
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
