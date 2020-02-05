import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: process.env.FB_API_KEY,
  authDomain: process.env.FB_AUTH_DOMAIN,
  databaseURL: process.env.FB_DB_URL,
  projectId: process.env.FB_PROJECT_ID,
  storageBucket: process.env.FB_STORAGE_BUCKET,
  messagingSenderId: process.env.FB_MESSAGING_SENDER_ID,
  appId: process.env.FB_APP_ID,
  measurementId: process.env.FB_MEASUREMENT_ID
};

!firebase.apps.length ? firebase.initializeApp(firebaseConfig) : ''
export const GoogleProvider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();
export const DB = firebase.database();
export default firebase
