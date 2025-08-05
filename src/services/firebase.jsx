
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
   apiKey: "AIzaSyDn-87ibRR9sAs4Y7ublPedzDphCNvlsj0",
  authDomain: "album-fetch.firebaseapp.com",
  projectId: "album-fetch",
  storageBucket: "album-fetch.firebasestorage.app",
  messagingSenderId: "808866215073",
  appId: "1:808866215073:web:09ed999620b578ee082ce0",
  measurementId: "G-64RJW87Z06"

};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
