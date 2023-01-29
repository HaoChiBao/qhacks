import { System } from '../js/firebase/system';
import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import '../css/index.css'
import '../css/all.css'

const system = new System();

function Login(){
    
    window.onload = function () {
        
        const submit = document.getElementById('submit');
        // console.log(submit)
        submit.addEventListener('click', async () => {
            
            
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            
            
            console.log(email, password)
            if (email != '' && password != '' && password.length >= 6){
                if (password.length < 6) document.getElementById('error').innerHTML = '*please fill in all fields'
                else {
                    // const redirect = await system.signInUser(email, password);
                    signInWithEmailAndPassword(system.getAuth.auth, email, password).then((promise)=>{
                        const uid = promise.user.uid;
                        
                        localStorage.setItem('uid:', uid)
                        
                        window.location.assign('/')
                      }).catch((error)=>{
                        console.log('signin error')
                        console.log(error)
                        document.getElementById('error').innerHTML = '*incorrect: email or password'
                        return false
                      })
                    // console.log(1)
                    // if (redirect != false) {console.log('success'); window.location.assign('/')} 
                    // else {console.log('error'); setError('incorrect: email or password')}
                }
                
            } else {console.log('error'); document.getElementById('error').innerHTML = '*please fill in all fields'}
        
        })
        
    }

    return (
        <section className = 'login'>
            <div className = 'form'>
                <h2>Login</h2>
                <div className = 'fill'>

                    <div className="part">
                        <input type="email" className = 'log' placeholder="email" id = "email"></input>
                    </div>

                    <div className="part">
                        <input type="password" className = 'log' placeholder="password" id = 'password'></input>
                    </div>
                    
                    <div className="part">
                        <button id = 'submit'>submit</button>
                        <div className = 'error' id = 'error'></div>
                    </div>
                </div>
            </div>
        </section>
    )

}

export default Login