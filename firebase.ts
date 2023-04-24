import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBQmSzgcMPy9Ww_7xMioFAWxc9_pOj2Sig",
  authDomain: "brightdata-c536e.firebaseapp.com",
  projectId: "brightdata-c536e",
  storageBucket: "brightdata-c536e.appspot.com",
  messagingSenderId: "915208000352",
  appId: "1:915208000352:web:851b71326fbb3656044405",
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };
