import React from 'react'
import '../css/all.css'
import '../css/main.css'
import {doc, getDoc, getDocs, updateDoc, collection} from 'firebase/firestore/lite';
import { System } from '../js/firebase/system';

import { OrbitControls, Stars, Html } from '@react-three/drei'
import { Physics, usePlane, useBox } from '@react-three/cannon'
//help me import oribitcontrols 
// import { OrbitControls } from 'drei'

import { useState } from 'react';

import { Canvas, useThree } from 'react-three-fiber'

console.log('main instant')
const roomID = localStorage.getItem('room:'); 
const uid = localStorage.getItem('uid:');
const username = localStorage.getItem('username:');
const system = new System();

function Box(props){
    const [ref, api] = useBox(() => ({ mass: 1, position: [0, 2, 0] }));
    const [pos, setPos] = useState([0, 0, 2]);

    if (props.id == uid) {
        
        window.addEventListener('keydown', (e) => {e = e.key; e = e.toLowerCase()
            switch (e) {
                case 'w':
                    api.velocity.set(0, 0, -5);
                    break;
                case 'a':
                    api.velocity.set(-5, 0, 0);
                    break;
                case 's':
                    api.velocity.set(0, 0, 5);
                    break;
                case 'd':
                    api.velocity.set(5, 0, 0);
                    break;
                case ' ':
                    api.velocity.set(0, 5, 0);
                    break;
            }
            // console.log(e)
            // api.velocity.set(0, 2, 0);
        })
    }

    return (
        <mesh 
            // onClick={() => {api.velocity.set(0, 2, 0);}}
            ref={ref}
            // position={[0, 2, 0]}>
            position={pos}>

            <boxBufferGeometry attach = 'geometry' args = {[1, 1, 1]} />
            <meshLambertMaterial attach = 'material' color = {props.colour} />
            <Html distanceFactor={10}>
                <div className="chat-content">
                    <div className = 'name' id = 'name'>{props.name}</div>
                    <div className = "chat" id = {props.id}>
                        {/* chat here */}
                        {props.chat}
                    </div>
                </div>
            </Html>
        </mesh>
    )
}

function Plane() {
    const [ref] = usePlane(() => ({
        rotation: [-Math.PI / 2, 0, 0],
    }));
    return (
        <mesh ref={ref} rotation={[-Math.PI / 2, 0, 0]}>
            <planeBufferGeometry attach="geometry" args={[100, 100]} />
            <meshLambertMaterial attach="material" color="lightblue" />
        </mesh>
    );
}

export default function Main() {
    const deg2rad = degrees => degrees * (Math.PI / 180);
    

    window.onload = function () {
        const roomREF = document.getElementById('r-id');
        roomREF.innerHTML = roomID;

        const promptElmt = document.getElementById('lob-que-prompt')
        promptElmt.addEventListener('keydown', () => {
            const userRef = document.getElementById(uid);
            const text = promptElmt.value;

            if (text==''){
                userRef.innerHTML = 'chat here';
            } else {
                userRef.innerHTML = text;
            }
        })

        const submit = document.getElementById('submit');
        submit.addEventListener('click', () => {
            const gpt = document.querySelector('#GPT');
            const prompt = promptElmt.value;
            
            let url = "https://api.openai.com/v1/engines/text-davinci-003/completions";
    
            // let key = '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'
            let key = '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'
            let bearer = 'Bearer ' + key
            // console.log(bearer)
            console.log('requesting gpt')
            fetch(url, {
                method: 'POST',
                headers: {
                    'Authorization': bearer,
                    'Content-Type': 'application/json'
                    // 'Content-Type: application/json'
                },
                body: JSON.stringify({
                    prompt: prompt,
                    temperature: 0.9,
                    max_tokens: 256,
                    top_p: 1,
                    frequency_penalty: 0,
                    presence_penalty: 0,
                    stream: false,
                })

            })
            .then((response) => {return response.json()})
            .then((data)=>{
                // console.log(Object.keys(data))
                console.log(data)
                console.log(data['choices'][0].text)   
                
                const text = data['choices'][0].text
                gpt.innerHTML = text
            })
            .catch(error => {
                console.log(error)
            })

        })

        // const loop = setInterval(() => {
        //     console.log('cum')
        // }, 1000);
    }
    
    const ref = collection(system.db, 'rooms');
    getDocs(ref).then((promise) => {
        // bruh why tf this so long
        const data = promise.docs[0]._document.data.value.mapValue.fields
        
        const users = Object.keys(data) 
        // console.log(users)
        
    }).catch((error) => {
        console.log(error)
    })

    console.log('finally')
    return (
        <div className = 'main'>
            <div id='r-id'></div>
            <div className="ask">
                <input id='lob-que-prompt' placeholder='question here'></input>
                <button id='submit'>ask</button>
            </div>
            <Canvas>
                <OrbitControls/>
                <Stars/>
                <ambientLight intensity = {0.5} />
                {/* lighting */}
                <spotLight position = {[30, 50, 10]} angle = {0.45} />
                <Physics>
                    {/* {names.map((nm, i) => <Box name = {nm}/>)} */}
                    <Box name = {username} id = {uid} chat = {'chat\nhere'} colour = {'hotpink'}/>
                    <Box name = {'Virtual Therapist'} id = {'GPT'} chat = {'Please Ask\nMe A Question'} colour = {'grey'}/>
                    <Box name = {'Helper'} id = {'help'} chat = {'Please Ask\nMe A Question'} colour = {'beige'}/>
                    <Plane/>
                </Physics>
            </Canvas>
        </div>
    )
    
}