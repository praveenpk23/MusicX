

// import React, { useState, useEffect } from 'react';
// import { CircularProgress, Paper, TableCell, TableRow, TableContainer, TableHead, Table, TableBody } from '@mui/material';
// import firebase from 'firebase/compat/app';
// import 'firebase/compat/auth';
// import 'firebase/compat/firestore';
// import { useParams } from 'react-router-dom';
// import './components/Home.css';

// const MusicPicker = () => {
//   const [musicData, setMusicData] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const { language } = useParams();
//   const [pickerEmail, setPickerEmail] = useState('');

//   useEffect(() => {
//     const fetchMusicData = async () => {
//       setLoading(true);
//       try {
//         const user = firebase.auth().currentUser;
//         if (user && user.email) {
//           setPickerEmail(user.email);
//           const musicRef = firebase.firestore().collection('Music');
//           const querySnapshot = await musicRef.where('Picker', '==', user.email).get();
//           const musicList = querySnapshot.docs.map(doc => doc.data());
//           setMusicData(musicList);
//         }
//       } catch (error) {
//         console.error('Error fetching music data:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchMusicData();
//   }, []);

//   return (
//     <div>
//       <div className="">
//         {loading ? (
//           <CircularProgress />
//         ) : (
//           <div>
//             {musicData.length > 0 ? (
//               <TableContainer component={Paper}>
//                 <center>
//                   <h2>Selected Music</h2>
//                 </center>
//                 <Table>
//                   <TableHead>
//                     <TableRow style={{ backgroundColor: "lightgray" }}>
//                       <TableCell>Title</TableCell>
//                       <TableCell>Artist</TableCell>
//                       <TableCell>Album</TableCell>
//                       <TableCell>Language</TableCell>
//                     </TableRow>
//                   </TableHead>
//                   <TableBody>
//                     {musicData.map((music, index) => (
//                       <TableRow style={{background:"lightgreen"}} key={index}>
//                         <TableCell>{music.name}</TableCell>
//                         <TableCell>{music.artist}</TableCell>
//                         <TableCell>{music.category}</TableCell>
//                         <TableCell>{music.language}</TableCell>
//                       </TableRow>
//                     ))}
//                   </TableBody>
//                 </Table>
//               </TableContainer>
//             ) : (
//               <center>
//                 <h2>No music selected</h2>
//               </center>
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default MusicPicker;


import React, { useState, useEffect } from 'react';
import { CircularProgress, Paper, TableCell, TableRow, TableContainer, TableHead, Table, TableBody } from '@mui/material';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { useParams } from 'react-router-dom';
import './components/Home.css';

const MusicPicker = () => {
  const [musicData, setMusicData] = useState([]);
  const [loading, setLoading] = useState(false);
  const { language } = useParams();
  const [pickerEmail, setPickerEmail] = useState('');
  const MAX_SELECTIONS = 3;

  useEffect(() => {
    const fetchMusicData = async () => {
      setLoading(true);
      try {
        const user = firebase.auth().currentUser;
        if (user && user.email) {
          setPickerEmail(user.email);
          const musicRef = firebase.firestore().collection('Music');
          const querySnapshot = await musicRef.where('Picker', '==', user.email).get();
          const musicList = querySnapshot.docs.map(doc => doc.data());
          setMusicData(musicList);
        }
      } catch (error) {
        console.error('Error fetching music data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMusicData();
  }, []);

  const remainingSelections = MAX_SELECTIONS - musicData.length;

  return (
    <div>
      <div className="">
        {loading ? (
          <CircularProgress />
        ) : (
          <div>
            {musicData.length > 0 ? (
              <TableContainer component={Paper}>
                <center>
                  <h2>Selected Music</h2>
                </center>
                <Table>
                  <TableHead>
                    <TableRow style={{ backgroundColor: "lightgray" }}>
                      <TableCell>Title</TableCell>
                      <TableCell>Artist</TableCell>
                      <TableCell>Album</TableCell>
                      <TableCell>Language</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {musicData.map((music, index) => (
                      <TableRow key={index}>
                        <TableCell>{music.name}</TableCell>
                        <TableCell>{music.artist}</TableCell>
                        <TableCell>{music.category}</TableCell>
                        <TableCell>{music.language}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            ) : (
              <center>
                <h2>No music selected</h2>
              </center>
            )}
            {remainingSelections > 0 && (
              <center>
                <h3>You can select {remainingSelections} more music{remainingSelections > 1 ? 's' : ''}.</h3>
              </center>
            )}
            {remainingSelections === 0 && (
              <center>
                <h3>All selected</h3>
              </center>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MusicPicker;
