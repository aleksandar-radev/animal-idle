import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getDatabase, ref, onValue } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAMS1UbAUbXbyalJh4argrqWYSgg2Rrkqg",
  authDomain: "animal-idle-v1.firebaseapp.com",
  databaseURL: "https://animal-idle-v1-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "animal-idle-v1",
  storageBucket: "animal-idle-v1.appspot.com",
  messagingSenderId: "79194368784",
  appId: "1:79194368784:web:ae58a4ca85c979d7fd5395",
  measurementId: "G-L06KLWGC80"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const database = getDatabase(app);

const repo = {
  getData: () => {
    const starCountRef = ref(database, 'totalVisits');
    let value;
    onValue(starCountRef, async (snapshot) => {
      value = await snapshot.val();
    });
    return value;
  }
}

export default repo;