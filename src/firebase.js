import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyD3md3tEcv2t0hoWZ_NYJQYqZD4NoxiypA",
  authDomain: "drinks-search.firebaseapp.com",
  databaseURL: "https://drinks-search-default-rtdb.firebaseio.com",
  projectId: "drinks-search",
  storageBucket: "drinks-search.appspot.com",
  messagingSenderId: "704868357723",
  appId: "1:704868357723:web:46c9c7c66fc73991fb917e",
};

firebase.initializeApp(firebaseConfig);

export default firebase;
