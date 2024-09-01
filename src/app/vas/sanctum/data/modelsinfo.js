import * as THREE from 'three';

const sanctumModels = [ 
    { 
        _id : 0, 
        userdata: {
            type: "gltf", 
            info: {
                title: 'object03', artist: 'screenxyz', year: '2023', mate: '3D Object',
                desc: "먹으로 그린 듯 한 이 회화는 당연하게도 4개의 레이어로 구성된 가상 이미지입니다. 맵핑에 사용된 이미지는 2048x2048 픽셀로, 확대해도 꽤 괜찮아 보입니다. 벽에서 일정 거리를 두고 걸려있는 것처럼 설정되어, 알 수 없는 존재감을 가지는 것 같기도 합니다."
            }
        }, 
        position: new THREE.Vector3(0, -1.5, -48), 
        obj : '/assets/vas/sanctum/objs/minimal_painting.glb', 
        poster: '/assets/vas/sanctum/objs/minimal_painting.webp',
        pedestal : false
    }, 
    { 
        _id : 1, 
        userdata: {
            type: "gltf", 
            info: {
                title: 'object02', artist: 'screenxyz', year: '2023', mate: '3D Object', 
                desc: "세월의 풍파를 이겨내며 부식되어 버린 철 재질을 연상시키는 팔면체 오브젝트는 실제로 2메가바이트 크기의 gltf 파일입니다. 실제 세상에서 이렇게 움직이려면 상당한 수준의 기술이 필요하겠지만, 이곳에서는 모든 조건을 거스르듯 존재하고 있습니다."
            }
        }, 
        position: new THREE.Vector3(0, -8, -10), 
        obj : '/assets/vas/sanctum/objs/octa.glb', 
        poster: '/assets/vas/sanctum/objs/minimal_painting.webp',
        pedestal : false 
    },
    { 
        _id : 2, 
        userdata: {
            type: "gltf", 
            info: {
                title: 'object01', artist: 'screenxyz', year: '2023', mate: '3D Object',
                desc: "가상의 공간에서 만남을 추구하면 안되는 걸까요? 여기에는 오로지 환영 뿐 자연도 인공도 없습니다. 그러나 이 환영 제단은 어쩌면 더 광활한 만남의 장이 될 수 있을 지도 모릅니다."
            }
        }, 
        position: new THREE.Vector3(0, -3, 30), 
        obj : '/assets/vas/sanctum/objs/ufan.glb', 
        poster: '/assets/vas/sanctum/objs/minimal_painting.webp',
        pedestal : false
    },
];
export default sanctumModels;