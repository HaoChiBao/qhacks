import { System } from '../js/firebase/system';
import {createUserWithEmailAndPassword} from 'firebase/auth';
import { setDoc, doc } from 'firebase/firestore/lite';
import '../css/index.css'
import '../css/all.css'

const system = new System();
function Register(){

    window.onload = function () {
        
        const submit = document.getElementById('submit');
        // console.log(submit)
        submit.addEventListener('click', async () => {
            
            
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const username = document.getElementById('username').value;
            
            console.log(email, password)
            if (email != '' && password != '' && password.length >= 6){
                if (password.length < 6) document.getElementById('error').innerHTML = '*please fill in all fields'
                else {
                    // const redirect = await system.signInUser(email, password);
                    createUserWithEmailAndPassword(system.getAuth.auth, email, password).then((promise)=>{
                        const uid = promise.user.uid;
                        
                        localStorage.setItem('uid:', uid)
                        
                        console.log(uid)
                        setDoc(doc(system.db, 'users', uid), {username: username}).then(()=>{
                            console.log('user instantiated')
                            window.location.assign('/lobby')
                            
                        }).catch((error)=>{
                            console.log('register error')
                            console.log(error)
                            document.getElementById('error').innerHTML = '*incorrect: email or password'
                            return false
                        })
                    })
                }
                
            } else {console.log('error'); document.getElementById('error').innerHTML = '*please fill in all fields'}
        
        })
        
    }

    return (
        <section className = 'register'>
            <div className = 'form'>
                <h2>Register</h2>
                <div className = 'fill'>
                    <div className="part">
                        <input type="text" className= 'log' placeholder="username" id = 'username' ></input>
                    </div>

                    <div className="part">
                        <input type="email" className = 'log' placeholder="email" id = "email" ></input>
                    </div>

                    <div className="part">
                        <input type="password" className = 'log' placeholder="password" id = 'password' ></input>
                    </div>

                    <div className="part">
                        <button id = 'submit'>submit</button>
                        <div className = 'error' id ='error'></div>
                        <a href='/login'>have an account? login</a>
                    </div>
                </div>

            </div>
        </section>
    )

}

export default Register