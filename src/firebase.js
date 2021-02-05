import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyAAljEL2aYOXP7FsNApWpdqo6Y52a9_ZXQ",
    authDomain: "netflix-clone-e9ce7.firebaseapp.com",
    projectId: "netflix-clone-e9ce7",
    storageBucket: "netflix-clone-e9ce7.appspot.com",
    messagingSenderId: "896804457421",
    appId: "1:896804457421:web:89322d6b374e4a31b55284"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();

export { auth };
export default db;