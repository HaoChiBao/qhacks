import { System } from '../js/firebase/system';
import {doc, getDoc, updateDoc} from 'firebase/firestore/lite';
import '../css/index.css'
import '../css/all.css'

const system = new System();

function Lobby(){
    
    window.onload = function () {
        const submit = document.getElementById('submit');
        submit.addEventListener('click', () => {
            const uid = localStorage.getItem('uid:');
            const lobby = document.getElementById('lobby-input').value;

            const ref = doc(system.db, 'rooms', lobby);
            const field = getDoc(ref).then((doc) => {
                const data = doc.data();
                data[uid] = {
                    pos: [0, 0, 2],
                    chat: '',
                }
                const update = data[uid]
                updateDoc(ref, {
                    [uid]: update
                }).then(() => {
                    localStorage.setItem('room:', lobby)
                    window.location.assign('/main')
                })
            }).catch((error) => {
                console.log(error)
            })

        })
    }

    return (
        <section className = 'lobby'>
            <div className = 'lobby-form'>
                <h2>enter lobby id</h2>
                <div className = 'lobby-fill'>
                    <input type="text" className = 'log' placeholder="lobby id" id = "lobby-input"></input>
                    <button id = 'submit'>submit</button>
                </div>
            </div>
        </section>
    )

}

export default Lobby