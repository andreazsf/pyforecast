import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { LocalStorage } from "quasar";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAzzf3aExmPIUKDYfXQESrjVnVfPGUiV18",
  authDomain: "pyforecast-3dbbf.firebaseapp.com",
  projectId: "pyforecast-3dbbf",
  storageBucket: "pyforecast-3dbbf.appspot.com",
  messagingSenderId: "9948707749",
  appId: "1:9948707749:web:4190e88b789727d10d464c",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

onAuthStateChanged(auth, (user) => {
  if (user) {
    LocalStorage.set("user", user);
  } else {
    LocalStorage.remove("user");
  }
});
