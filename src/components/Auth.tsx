import { useEffect, useState } from "react";
import { onAuthStateChanged  } from 'firebase/auth'
import App from "../App";
import {  auth } from '../auth/firebase'

const AuthProvider = () => {
  const initialState = {
    status: 'loading',
    token: ''
  }
  const [authState, setAuthState] = useState(initialState);


  useEffect(() => {
    return onAuthStateChanged(auth, async user => {
      if (user) {
        
        const token = await user.getIdToken()
        setAuthState({status: 'in', token: token });
      } else {
        setAuthState({ status: 'out', token: '' })
      }
    })
  }, []);

  return (
    <App />
  );
};

export default AuthProvider;