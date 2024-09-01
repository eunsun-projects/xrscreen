import * as THREE from 'three';

const lights = [
    {_id: 0, target: 'painting', position: new THREE.Vector3(0, 18, -32), l: 7, shadow: true},
    {_id: 1, target: 'sculpture1', position: new THREE.Vector3(0, 20, -16), l: 7, shadow: true},
    {_id: 2, target: 'sculpture2', position: new THREE.Vector3(0, 8, 43), l: 4, shadow: true},
];

export default lights;