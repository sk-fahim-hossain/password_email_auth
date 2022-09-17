import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyDD0jqYz9qm5bN0TDOl9RrjAObVVeeEl0I",
    authDomain: "password-email-firbase.firebaseapp.com",
    projectId: "password-email-firbase",
    storageBucket: "password-email-firbase.appspot.com",
    messagingSenderId: "1085757478080",
    appId: "1:1085757478080:web:4c274f1dcdab3aa4058925"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;