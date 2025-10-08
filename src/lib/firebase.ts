import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  projectId: 'studio-3270485801-c5528',
  appId: '1:106437942750:web:e7563acb693cc6ee30514f',
  storageBucket: 'studio-3270485801-c5528.firebasestorage.app',
  apiKey: 'AIzaSyDcc474oF1Umt8vIZlFYngNbNYOwsV3qQw',
  authDomain: 'studio-3270485801-c5528.firebaseapp.com',
  measurementId: '',
  messagingSenderId: '106437942750',
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);

export { app, auth };
