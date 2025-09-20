import { initializeApp, getApps, type FirebaseApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyD4AduRftjuvRjQVyaG599TBrwg2MUl82U",
    authDomain: "previous-year-question-p-15701.firebaseapp.com",
    databaseURL: "https://previous-year-question-p-15701-default-rtdb.firebaseio.com",
    projectId: "previous-year-question-p-15701",
    storageBucket: "previous-year-question-p-15701.firebasestorage.app",
    messagingSenderId: "557731065291",
    appId: "1:557731065291:web:213770145be93fa9bd1a4e"
};

let app: FirebaseApp;
if (!getApps().length) {
    app = initializeApp(firebaseConfig);
} else {
    app = getApps()[0];
}

const db = getDatabase(app);

export { app, db };
