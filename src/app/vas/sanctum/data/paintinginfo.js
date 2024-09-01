import * as THREE from 'three';

const paintings = [ 
    { _id : 0, 
        userData: {
            type: "painting", 
            info: {
                title: 'orange', artist: 'Eun Oh', year: '2017', mate: 'sadf', 
                desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
            }}, w: 5, h: 5, position: new THREE.Vector3(-10, 3, -19.9), lr: "front", poster: '../assets/objsviewer/orange.webp' }, 
    { _id : 1, 
        userData: {
            type: "painting", 
            info: {
                title: 'madlen', artist: 'Eun Oh', year: '2017', mate: 'sadf',
                desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
            }}, w: 5, h: 5, position: new THREE.Vector3(10, 3, -19.9), lr: "front", poster: '../assets/objsviewer/madlen.webp' },
    { _id : 2, 
        userData: {
            type: "painting", 
            info: {
                title: 'dojagi', artist: 'Eun Oh', year: '2017', mate: 'sadf', 
                desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
            }}, w: 5, h: 5, position: new THREE.Vector3(-19.9, 3, -10), lr: "left", poster: '../assets/objsviewer/dojagi.webp'},
    { _id : 3, 
        userData: {
            type: "painting", 
            info: {
                title: 'lemoncake', artist: 'Eun Oh', year: '2017', mate: 'sadf', 
                desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
            }}, w: 5, h: 5, position: new THREE.Vector3(19.9, 3, -10), lr: "right", poster: '../assets/objsviewer/lemoncake.webp'},
    { _id : 4, 
        userData: {
            type: "painting", 
            info: {
                title: 'sisaw', artist: 'Eun Oh', year: '2017', mate: 'sadf', 
                desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
            }}, w: 5, h: 5, position: new THREE.Vector3(-19.5, 3, 10), lr: "left", poster: '../assets/objsviewer/sisaw.webp'},
    { _id : 5, 
        userData: {
            type: "painting", 
            info: {
                title: 'misun', artist: 'Eun Oh', year: '2017', mate: 'sadf', 
                desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
            }}, w: 5, h: 5, position: new THREE.Vector3(19.5, 3, 10), lr: "right", poster: '../assets/objsviewer/misun.webp' }, 
    { _id : 6, 
        userData: {
            type: "painting", 
            info: {
                title: '3dtouch', artist: 'Eun Oh', year: '2017', mate: 'sadf', 
                desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
            }}, w: 5, h: 5, position: new THREE.Vector3(-10, 3, 19.5), lr: "back", poster: '../assets/objsviewer/3dtouch.webp' },
    { _id : 7, 
        userData: {
            type: "painting", 
            info: {
                title: 'painting', artist: 'Eun Oh', year: '2017', mate: 'sadf', 
                desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
            }}, w: 5, h: 5, position: new THREE.Vector3(10, 3, 19.5), lr: "back", poster: '../assets/objsviewer/painting.webp'},
];
export default paintings;