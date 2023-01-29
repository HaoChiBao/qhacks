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
            console.log(e)
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
            <meshLambertMaterial attach = 'material' color = 'grey' />
            <Html distanceFactor={10}>
                <div className="chat-content" id = {props.id}>
                    <div className = 'name' id = 'name'>{props.name}</div>
                    <div className = "chat">
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

        // const loop = setInterval(() => {
        //     console.log('cum')
        // }, 1000);
    }
    
    const ref = collection(system.db, 'rooms');
    getDocs(ref).then((promise) => {
        // bruh why tf this so long
        const data = promise.docs[0]._document.data.value.mapValue.fields
        
        const users = Object.keys(data) 
        console.log(users)
        
    }).catch((error) => {
        console.log(error)
    })

    console.log('finally')
    return (
        <div className = 'main'>
            <div id='r-id'></div>
            <Canvas>
                <OrbitControls/>
                <Stars/>
                <ambientLight intensity = {0.5} />
                {/* lighting */}
                <spotLight position = {[30, 50, 10]} angle = {0.45} />
                <Physics>
                    {/* {names.map((nm, i) => <Box name = {nm}/>)} */}
                    <Box name = {'You'} id = {uid} chat = {'chat\nhere'}/>
                    <Box name = {'GPT'} id = {'GPT'} chat = {'Please Ask\nMe A Question'}/>
                    <Plane/>
                </Physics>
            </Canvas>
        </div>
    )
    
}