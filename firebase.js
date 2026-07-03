import { initializeApp } from "https://www.gstatic.com/firebasejs/12.15.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, query, orderBy } from "https://www.gstatic.com/firebasejs/12.15.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyCL0OdorkZ1Y-lAGxh_J5MxRZMgFplZMjo",
    authDomain: "test-2430c.firebaseapp.com",
    projectId: "test-2430c",
    storageBucket: "test-2430c.firebasestorage.app",
    messagingSenderId: "78873597685",
    appId: "1:78873597685:web:ea25cb60c1eac7af7217bc",
    measurementId: "G-RNBHVTQQNR"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db, collection, addDoc, getDocs, query, orderBy };