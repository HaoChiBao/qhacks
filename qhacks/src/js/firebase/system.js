// firebase imports
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { setDoc, doc , getFirestore} from 'firebase/firestore/lite';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword} from 'firebase/auth';

// import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.16.0/firebase-app.js';
// import { getAnalytics } from "'https://www.gstatic.com/firebasejs/9.16.0/firebase-analytics.js'";
// import { setDoc, doc } from 'https://www.gstatic.com/firebasejs/9.16.0/firebase-firestore.js';
// import { createUserWithEmailAndPassword, signInWithEmailAndPassword} from 'https://www.gstatic.com/firebasejs/9.16.0/firebase-auth.js';

//auth import
import { Auth } from './auth';

const firebaseConfig = {
  apiKey: "AIzaSyAvXTM4NRftU-kuxkJRyH6XTTUdgoIE4_8",
  authDomain: "qhacks-7dbf2.firebaseapp.com",
  projectId: "qhacks-7dbf2",
  storageBucket: "qhacks-7dbf2.appspot.com",
  messagingSenderId: "744689525359",
  appId: "1:744689525359:web:36d37c5e9abf4f2b04239a",
  measurementId: "G-Q6MYZJZL9B"
};

class System {
  constructor() {
      this.app = initializeApp(firebaseConfig);
      this.dc = getAnalytics(this.app);
      this.db = getFirestore(this.app);
      this.getAuth = new Auth();
    }
    async createUser(email, password, username){
    console.log('registering...')
    createUserWithEmailAndPassword(this.getAuth.auth, email, password).then((promise)=>{
      const uid = promise.user.uid;
      console.log(uid, '- user reference')

      setDoc(doc(this.app, 'users', uid), {username: username}).then(()=>{
        console.log('user created')
        localStorage.setItem('uid:', uid)
        
        return uid

      }).catch((error)=>{
        console.log('register error')
        console.log(error)
        return false
      })
    })
  }
  async signInUser(email, password){
    console.log('signing in...')
    signInWithEmailAndPassword(this.getAuth.auth, email, password).then((promise)=>{
      const uid = promise.user.uid;
      
      localStorage.setItem('uid:', uid)
      console.log(uid)
      return uid
    }).catch((error)=>{
      console.log('signin error')
      console.log(error)
      return false
    })
  }
}


export {System}
// exports.System = System;

// module.exports = System;