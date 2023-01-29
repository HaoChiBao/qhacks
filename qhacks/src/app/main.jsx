import React from 'react'
import '../css/all.css'
import '../css/main.css'

import { OrbitControls, Stars, Html } from '@react-three/drei'
import { Physics, usePlane, useBox } from '@react-three/cannon'
//help me import oribitcontrols 
// import { OrbitControls } from 'drei'

import { Canvas, useThree } from 'react-three-fiber'

console.log('main instant')

function Box(){
    const [ref, api] = useBox(() => ({ mass: 1, position: [0, 2, 0] }));
    // let pos = [0, 2, 0]

    window.addEventListener('keydown', (e) => {e = e.key; e = e.toLowerCase()
        switch (e) {
            case 'w':
                api.velocity.set(0, 0, -2);
                // pos = [0, 2, -2]
                break;
            case 'a':
                api.velocity.set(-2, 0, 0);
                // pos = [-2, 0, 0]
                break;
            case 's':
                api.velocity.set(0, 0, 2);
                // pos = [0, 0, 2]
                break;
            case 'd':
                api.velocity.set(2, 0, 0);
                // pos = [2, 0, 0]
                break;
        }
        console.log(e)
        // api.velocity.set(0, 2, 0);
    })
    return (
        <mesh 
            // onClick={() => {api.velocity.set(0, 2, 0);}}
            ref={ref}
            position={[0, 2, 0]}
            // position={pos}
        >

            <boxBufferGeometry attach = 'geometry' args = {[1, 1, 1]} />
            <meshLambertMaterial attach = 'material' color = 'grey' />
            <Html distanceFactor={10}>
                <div className="chat-content">
                content here
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

    return (
        <React.Fragment>
            <Canvas>
                <OrbitControls/>
                <Stars/>
                <ambientLight intensity = {0.5} />
                {/* lighting */}
                <spotLight position = {[30, 50, 10]} angle = {0.45} />
                <Physics>
                    <Box/>
                    <Plane/>
                </Physics>
            </Canvas>
        </React.Fragment>
    )
}