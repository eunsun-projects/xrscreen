import randomString from "../utils/randomstring";

const objectsToLoadY = [
    {
        id: '01_TheDawnofChristianity',
        type: 'mp.gltfLoader',
        inputs: {
            url: '',
        },
        position: [ 2, 0, -1],
        rotation: [0, 0, 0],
        scale: [0.3, 0.3, 0.3],
        shadowScale : {
            x : 1,
            y : 1,
            z : 1
        },
        shadowPosition : {
            x: 2,
            y: 0.02,
            z: -1
        }
    }
];

const inputData = [
    {
        "number" : 0,
        "sid": randomString(11),
        "enabled": true,
        "url": "",
        "label": "The Dawn of Christianity",
        "description": "메트로폴리탄 미술관 소장품 The Dawn of Christianity\n[출처](https://www.metmuseum.org/art/collection/search/11677)",
        "parsedDescription": [],
        "anchorPosition": {"x": 1.3,"y": 0,"z": -1},
        "color": {"r": 0.9,"g": 0.9,"b": 0.9},
        "stemVector": {"x": 0, "y": 0.1, "z": 0},
        "stemVisible": false,
        "floorIndex": 0,
        "floorInfo": {"id": "0", "sequence": 0},
        "media":{"src":"", "type": "mattertag.media.none"},
        "discPosition": {},
        "stemHeight":0.2,
        "roomId": "",
        "id": randomString(11),
        "keywords":[],
        "xyzAttach": "glb"
    },
    {
        "number" : 1,
        "sid": randomString(11),
        "enabled": true,
        "url": "",
        "label": "about GPU-online",
        "description": "GPU의 가상 스테이지 “GPU-online”입니다.\n현재 샘플 조각 작품 'The Dawn of Christianity'가 삽입되어있습니다.\nGPU-online에는 평면, 입체, 미디어 등 다양한 형태의 데이터 삽입이 가능하여\n이곳을 다채로운 전시와 쇼케이스의 장으로 활용할 수 있습니다.\n[공간 사용 문의하기](https://screenxyz.net/contact)",
        "parsedDescription": [],
        "anchorPosition": {"x": 1.3,"y": 1,"z": -2.2},
        "color": {"r": 0.9,"g": 0.9,"b": 0.9},
        "stemVector": {"x": 0, "y": 0.1, "z": 0},
        "stemVisible": false,
        "floorIndex": 0,
        "floorInfo": {"id": "0", "sequence": 0},
        "media":{"src":"", "type": "mattertag.media.none"},
        "discPosition": {},
        "stemHeight":0.2,
        "roomId": "",
        "id": randomString(11),
        "keywords":[],
        "xyzAttach": "none"
    }
];

export { objectsToLoadY, inputData }