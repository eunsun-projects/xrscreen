import randomString from "../utils/randomstring";

const objectsToLoadY = [
    {
        id: '01_kwak1',
        type: 'mp.gltfLoader',
        inputs: {
            url: '',
        },
        position: [ 29.064070375741878, 0.8, -3.577735150519743],
        rotation: [0, 0, 0],
        scale: [0.15, 0.15, 0.15],
        shadowScale : {
            x : 1.5,
            y : 1.5,
            z : 1.5
        },
        shadowPosition : {
            x: 29.064070375741878,
            y: 0,
            z: -3.577735150519743
        }
    },
    {
        id: '02_kwak2',
        type: 'mp.gltfLoader',
        inputs: {
            url: '',
        },
        position: [ 25.829034033042507, 0, -5.948807325727982 ],
        rotation: [0, -145, 0],
        scale: [0.3, 0.3, 0.3],
        shadowScale : {
            x : 1.8,
            y : 1.8,
            z : 1.8
        },
        shadowPosition : {
            x: 25.829034033042507,
            y: 0,
            z: -5.948807325727982
        }
    },
    {
        id: '03_ahn',
        type: 'mp.gltfLoader',
        inputs: {
            url: '',
        },
        position: [ 17.665622028326702, 0, -11.11898608297653 ],
        rotation: [0, 0, 0],
        scale: [1.5, 1.5, 1.5],
        shadowScale : {
            x : 1.6,
            y : 1.6,
            z : 1.6
        },
        shadowPosition : {
            x: 17.665622028326702,
            y: 0,
            z: -11.11898608297653
        }
    },
    {
        id: '04_oh',
        type: 'mp.gltfLoader',
        inputs: {
            url: '',
        },
        position: [ 9.004537548053872, 0, -8.542391366439461 ],
        rotation: [0, 0, 0],
        scale: [1, 1, 1],
        shadowScale : {
            x : 2,
            y : 2,
            z : 2
        },
        shadowPosition : {
            x: 9.004537548053872,
            y: 0,
            z: -8.542391366439461
        }
    },
    {
        id: '05_jang',
        type: 'mp.gltfLoader',
        inputs: {
            url: '',
        },
        position: [ 21.76999854741998, 1.2, -8.986029396839877 ],
        rotation: [0, -120, 0],
        scale: [0.05, 0.05, 0.05],
        shadowScale : {
            x : 1.5,
            y : 1.5,
            z : 1.5
        },
        shadowPosition : {
            x: 21.76999854741998,
            y: 0,
            z: -8.986029396839877
        }
    },
    {
        id: '06_jung_leg',
        type: 'mp.gltfLoader',
        inputs: {
            url: '',
        },
        position: [ 4, 0, -3 ],
        rotation: [0, 0, 0],
        scale: [0.36, 0.36, 0.36],
        shadowScale : {
            x : 3,
            y : 3,
            z : 3
        },
        shadowPosition : {
            x: 4,
            y: 0,
            z: -3
        }
    },
    {
        id: '07_jung_power',
        type: 'mp.gltfLoader',
        inputs: {
            url: '',
        },
        position: [ 1.0720059205260961, 0, 0.3389242590135968 ],
        rotation: [0, 0, 0],
        scale: [0.2, 0.2, 0.2],
        shadowScale : {
            x : 1.7,
            y : 1.7,
            z : 1.7
        },
        shadowPosition : {
            x: 1.0720059205260961,
            y: 0,
            z: 0.3389242590135968
        }
    },
    {
        id: '08_jung_snake',
        type: 'mp.gltfLoader',
        inputs: {
            url: '',
        },
        position: [ 6, 0, 0.6419325301259069 ],
        rotation: [0, 25, 0],
        scale: [0.15, 0.15, 0.15],
        shadowScale : {
            x : 1.2,
            y : 1.2,
            z : 1.2
        },
        shadowPosition : {
            x: 6,
            y: 0,
            z: 0.6419325301259069
        }
    },
    {
        id: '09_joo',
        type: 'mp.gltfLoader',
        inputs: {
            url: '',
        },
        position: [ 11.78761950513903, 0, -2.2582975121618842 ],
        rotation: [0, 70, 0],
        scale: [0.085, 0.085, 0.085],
        shadowScale : {
            x : 3,
            y : 3,
            z : 3
        },
        shadowPosition : {
            x: 11.78761950513903,
            y: 0,
            z: -2.2582975121618842
        }
    },
    {
        id: '10_hong',
        type: 'mp.gltfLoader',
        inputs: {
            url: '',
        },
        position: [ 19.219748458531523, 0, -4.313225915298276 ],
        rotation: [0, 0, 0],
        scale: [2, 2, 2],
        shadowScale : {
            x : 1.8,
            y : 1.8,
            z : 1.8
        },
        shadowPosition : {
            x: 19.219748458531523,
            y: 0,
            z: -4.313225915298276
        }
    }
]

// 태그 생성용
const inputData = [ 
    
    {
        "number" : 0,
        "sid": randomString(11),
        "enabled": true,
        "url": "",
        "label": "저글링 1 (흰 머리) | 3D상세보기",
        "description": "{곽인탄}",
        "parsedDescription": [],
        "anchorPosition": {"x": 29.06,"y": 0,"z": -3.57},
        "color": {"r": 0.3,"g": 0.3,"b": 0.3},
        "stemVector": {"x": 0, "y": 3.5, "z": 0},
        "stemVisible": false,
        "floorIndex": 0,
        "floorInfo": {"id": "0", "sequence": 0},
        "media":{"src":"", "type": "mattertag.media.none"},
        "discPosition": {},
        "stemHeight":0.5,
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
        "label": "저글링 2 (토끼 머리) | 3D상세보기",
        "description": "{곽인탄}",
        "parsedDescription": [],
        "anchorPosition": {"x": 25.82,"y": 0,"z": -5.94},
        "color": {"r": 0.3,"g": 0.3,"b": 0.3},
        "stemVector": {"x": 0, "y": 4.2, "z": 0},
        "stemVisible": false,
        "floorIndex": 0,
        "floorInfo": {"id": "0", "sequence": 0},
        "media":{"src":"", "type": "mattertag.media.none"},
        "discPosition": {},
        "stemHeight":0.5,
        "roomId": "",
        "id": randomString(11),
        "keywords":[],
        "xyzAttach": "glb"
    },
    {
        "number" : 2,
        "sid": randomString(11),
        "enabled": true,
        "url": "",
        "label": "풍경조각1 | 3D상세보기",
        "description": "{안민환}",
        "parsedDescription": [],
        "anchorPosition": {"x": 17.66,"y": 0,"z": -11.11},
        "color": {"r": 0.3,"g": 0.3,"b": 0.3},
        "stemVector": {"x": 0, "y": 3, "z": 0},
        "stemVisible": false,
        "floorIndex": 0,
        "floorInfo": {"id": "0", "sequence": 0},
        "media":{"src":"", "type": "mattertag.media.none"},
        "discPosition": {},
        "stemHeight":0.5,
        "roomId": "",
        "id": randomString(11),
        "keywords":[],
        "xyzAttach": "glb"
    },
    {
        "number" : 3,
        "sid": randomString(11),
        "enabled": true,
        "url": "",
        "label": "안녕? | 3D상세보기",
        "description": "{오제성}",
        "parsedDescription": [],
        "anchorPosition": {"x": 9,"y": 0,"z": -7.5},
        "color": {"r": 0.3,"g": 0.3,"b": 0.3},
        "stemVector": {"x": 0, "y": 2.2, "z": 0},
        "stemVisible": false,
        "floorIndex": 0,
        "floorInfo": {"id": "0", "sequence": 0},
        "media":{"src":"", "type": "mattertag.media.none"},
        "discPosition": {},
        "stemHeight":0.5,
        "roomId": "",
        "id": randomString(11),
        "keywords":[],
        "xyzAttach": "glb"
    },
    {
        "number" : 4,
        "sid": randomString(11),
        "enabled": true,
        "url": "",
        "label": "신상 | 3D상세보기",
        "description": "{장준호}",
        "parsedDescription": [],
        "anchorPosition": {"x": 21.76,"y": 0,"z": -8.96},
        "color": {"r": 0.3,"g": 0.3,"b": 0.3},
        "stemVector": {"x": 0, "y": 3.7, "z": 0},
        "stemVisible": false,
        "floorIndex": 0,
        "floorInfo": {"id": "0", "sequence": 0},
        "media":{"src":"", "type": "mattertag.media.none"},
        "discPosition": {},
        "stemHeight":0.5,
        "roomId": "",
        "id": randomString(11),
        "keywords":[],
        "xyzAttach": "glb"
    },
    {
        "number" : 5,
        "sid": randomString(11),
        "enabled": true,
        "url": "",
        "label": "Leg Parts | 3D상세보기",
        "description": "{정성진}",
        "parsedDescription": [],
        "anchorPosition": {"x": 4,"y": 0,"z": -3},
        "color": {"r": 0.3,"g": 0.3,"b": 0.3},
        "stemVector": {"x": 0, "y": 2.2, "z": 0},
        "stemVisible": false,
        "floorIndex": 0,
        "floorInfo": {"id": "0", "sequence": 0},
        "media":{"src":"", "type": "mattertag.media.none"},
        "discPosition": {},
        "stemHeight":0.5,
        "roomId": "",
        "id": randomString(11),
        "keywords":[],
        "xyzAttach": "glb"
    },
    {
        "number" : 6,
        "sid": randomString(11),
        "enabled": true,
        "url": "",
        "label": "힘의 계승 | 3D상세보기",
        "description": "{정성진}",
        "parsedDescription": [],
        "anchorPosition": {"x": 1,"y": 0,"z": -1},
        "color": {"r": 0.3,"g": 0.3,"b": 0.3},
        "stemVector": {"x": 0, "y": 2.2, "z": 0},
        "stemVisible": false,
        "floorIndex": 0,
        "floorInfo": {"id": "0", "sequence": 0},
        "media":{"src":"", "type": "mattertag.media.none"},
        "discPosition": {},
        "stemHeight":0.5,
        "roomId": "",
        "id": randomString(11),
        "keywords":[],
        "xyzAttach": "glb"
    },
    {
        "number" : 7,
        "sid": randomString(11),
        "enabled": true,
        "url": "",
        "label": "뱀을 움켜쥔 팔(L) | 3D상세보기",
        "description": "{정성진}",
        "parsedDescription": [],
        "anchorPosition": {"x": 6,"y": 0,"z": 0.64},
        "color": {"r": 0.3,"g": 0.3,"b": 0.3},
        "stemVector": {"x": 0, "y": 2.2, "z": 0},
        "stemVisible": false,
        "floorIndex": 0,
        "floorInfo": {"id": "0", "sequence": 0},
        "media":{"src":"", "type": "mattertag.media.none"},
        "discPosition": {},
        "stemHeight":0.5,
        "roomId": "",
        "id": randomString(11),
        "keywords":[],
        "xyzAttach": "glb"
    },
    {
        "number" : 8,
        "sid": randomString(11),
        "enabled": true,
        "url": "",
        "label": "Self portrait | 3D상세보기",
        "description": "{주슬아}",
        "parsedDescription": [],
        "anchorPosition": {"x": 11.78,"y": 0,"z": -2.25},
        "color": {"r": 0.3,"g": 0.3,"b": 0.3},
        "stemVector": {"x": 0, "y": 2.2, "z": 0},
        "stemVisible": false,
        "floorIndex": 0,
        "floorInfo": {"id": "0", "sequence": 0},
        "media":{"src":"", "type": "mattertag.media.none"},
        "discPosition": {},
        "stemHeight":0.5,
        "roomId": "",
        "id": randomString(11),
        "keywords":[],
        "xyzAttach": "glb"
    },
    {
        "number" : 9,
        "sid": randomString(11),
        "enabled": true,
        "url": "",
        "label": "물에서 온 여신상 | 3D상세보기",
        "description": "{홍자영}",
        "parsedDescription": [],
        "anchorPosition": {"x": 19.21,"y": 0,"z": -4.31},
        "color": {"r": 0.3,"g": 0.3,"b": 0.3},
        "stemVector": {"x": 0, "y": 2.6, "z": 0},
        "stemVisible": false,
        "floorIndex": 0,
        "floorInfo": {"id": "0", "sequence": 0},
        "media":{"src":"", "type": "mattertag.media.none"},
        "discPosition": {},
        "stemHeight":0.5,
        "roomId": "",
        "id": randomString(11),
        "keywords":[],
        "xyzAttach": "glb"
    },
    {
        "number" : 10,
        "sid": randomString(11),
        "enabled": true,
        "url": "",
        "label": "전시 포스터",
        "description": "",
        "parsedDescription": [],
        "anchorPosition": {"x": 11.8,"y": 0,"z": -13.5},
        "color": {"r": 0,"g": 0,"b": 0},
        "stemVector": {"x": 0, "y": 1, "z": 0},
        "stemVisible": false,
        "floorIndex": 0,
        "floorInfo": {"id": "0", "sequence": 0},
        "media":{"src":"", "type": "mattertag.media.none"},
        "discPosition": {},
        "stemHeight":0.5,
        "roomId": "",
        "id": randomString(11),
        "keywords":[],
        "xyzAttach": "mp4"
    },

    //작품정보태그
    {
        "number" : 11,
        "sid": randomString(11),
        "enabled": true,
        "url": "",
        "label": "저글링 1 (흰 머리) | 작품정보",
        "description": 
`저글링 1 (흰 머리)
2023
30x17x16cm
석고, 레진, 철

‘저글링 1 (흰 머리)’ 는 대형 설치 작품 ‘저글링’ 을 구성하는 작은 조각들 중의 일부이다. 작품을 조형하는 과정에서 작은 조각들은 실시간으로 제작되는데 어느 순간부터 이 조각들을 ‘저글링’ 이라고 부르기 시작했다. 곡예사가 서커스를 하듯이, 여기서 조각가는 다양한 조각들을 컨트롤하며 관객 앞에서 재주를 부린다. 작은 조각들은 조각 주변을 교차하며 유기적으로 확장한다. 이제 조각은 허공에서 유연하게 유동한다.

Juggling 1 (White Hair)
2023
30x17x16cm
plaster, resin, steel{곽인탄}`,
        "parsedDescription": [],
        "anchorPosition": {"x": 29.06,"y": 0,"z": -3.57},
        "color": {"r": 0.6,"g": 0.6,"b": 0.6},
        "stemVector": {"x": 0, "y": 3.3, "z": 0},
        "stemVisible": false,
        "floorIndex": 0,
        "floorInfo": {"id": "0", "sequence": 0},
        "media":{"src":"", "type": "mattertag.media.none"},
        "discPosition": {},
        "stemHeight":0.5,
        "roomId": "",
        "id": randomString(11),
        "keywords":[],
        "xyzAttach": "none"
    },
    {
        "number" : 12,
        "sid": randomString(11),
        "enabled": true,
        "url": "",
        "label": "저글링 2 (토끼 머리) | 작품정보",
        "description": 
`저글링 2 (토끼 머리)
2023
36x12x14cm
레진

'저글링 2 (토끼 머리)' 는 대형 설치 작품 ‘저글링’ 을 구성하는 작은 조각들 중의 일부이다. 작품을 조형하는 과정에서 작은 조각들은 실시간으로 제작되는데 어느 순간부터 이 조각들을 ‘저글링’ 이라고 부르기 시작했다. 곡예사가 서커스를 하듯이, 여기서 조각가는 다양한 조각들을 컨트롤하며 관객 앞에서 재주를 부린다. 작은 조각들은 조각 주변을 교차하며 유기적으로 확장한다. 이제 조각은 허공에서 유연하게 유동한다.

Juggling 2 (Rabbit Head)
2023
36x12x14cm
resin{곽인탄}`,
        "parsedDescription": [],
        "anchorPosition": {"x": 25.82,"y": 0,"z": -5.94},
        "color": {"r": 0.6,"g": 0.6,"b": 0.6},
        "stemVector": {"x": 0, "y": 4, "z": 0},
        "stemVisible": false,
        "floorIndex": 0,
        "floorInfo": {"id": "0", "sequence": 0},
        "media":{"src":"", "type": "mattertag.media.none"},
        "discPosition": {},
        "stemHeight":0.5,
        "roomId": "",
        "id": randomString(11),
        "keywords":[],
        "xyzAttach": "none"
    },
    {
        "number" : 13,
        "sid": randomString(11),
        "enabled": true,
        "url": "",
        "label": "풍경조각1 | 작품정보",
        "description": 
`풍경조각1	
2022
110X50X30cm
레진, 우레탄폼, 나무 위 유화

나는 개인적이고 내밀한 경험을 바탕으로 실존에 대한 물음을 탐구한다. 주변인의 죽음을 목격하면서 '나'라는 존재의 의구심과 죽음 너머에 대한 질문은 조각의 안과 밖을 연구하고 여백을 살피는 방법으로 이어지게 된다. 또한, 재료를 다루는 방식과 개인의 서사가 일맥상통할 수 있는 연구를 지속하며 작업방식의 당위성을 찾는 데 주력하고 있다. 조형의 시작은 루치오폰타나(Lucio pontana)의 ‘공간주의’를 참조하며 조각에 칼집을 통해 덩어리의 내부와 외부를 연결-확장한다. 한편으로 조각에 칼집은 아가미 역할을 하기도 하며 조각이 숨을 쉬며 이내 새로운 형태의 진화가 가능해진다. 또한 삶 이전을 대변하는 축경, 사후를 질문하며 시공을 담은 풍경조각을 실험 중에 있다. 이를 통해 매체적으로 불가능했던 다양한 풍경의 개념을 조각에 결합시키면서 단일조각의 확장 가능성을 모색한다.

Landscape sculpture 1
2022
110X50X30cm

In my work, I explore questions about existence based on personal and intimate experiences. Witnessing the deaths of those around me haslead to inquiries about the skepticism of self and the questions beyond death, which in turn lead to the exploration of the inner and outer aspects of sculpture and the contemplation of space. Additionally, Ifocus on the coherence between the approach to materials and personal narratives, striving to find justification in my artistic process. The starting point of my sculptural practice references Lucio Fontana's ""Spatialism,"" connecting and expanding the interior and exterior of a mass through incisions. In a way, these incisions in sculpture also serve as gills, allowing the sculpture to breathe and enabling the evolution into new forms{안민환}`,
        "parsedDescription": [],
        "anchorPosition": {"x": 17.66,"y": 0,"z": -11.11},
        "color": {"r": 0.6,"g": 0.6,"b": 0.6},
        "stemVector": {"x": 0, "y": 2.8, "z": 0},
        "stemVisible": false,
        "floorIndex": 0,
        "floorInfo": {"id": "0", "sequence": 0},
        "media":{"src":"", "type": "mattertag.media.none"},
        "discPosition": {},
        "stemHeight":0.5,
        "roomId": "",
        "id": randomString(11),
        "keywords":[],
        "xyzAttach": "none"
    },
    {
        "number" : 14,
        "sid": randomString(11),
        "enabled": true,
        "url": "",
        "label": "안녕? | 작품정보",
        "description": 
`안녕?
2023
12x12x3m(d)
바위, 석고

전국의 미지정 문화재를 찾아다니는 일은 인디에나 존스나 툼 레이더에서 보여지는 것처럼 역동적이지 않다. 오히려 장거리 운전으로 몸은 무척이나 피로하고, 차에서 내려서도 네이버 지도와 아마추어 연구가들의 블로그 글에 의지해 여기저기 헤매야 한다. 더위, 추위, 우천, 모기, 풀독은 기본이고 처음 만나는 동네 주민에게 길을 묻는 것은 지금도 익숙하지 않고 어렵기만 하다. 겨우겨우 현장에 도착하면 상당히 뿌듯하지만 굴러오는 돌, 도굴꾼과의 결투, 부비트랩 따위도 실은 없다. 실로 깊숙히 고요한 동굴에 들어가는 순간이다. 일자(一者/미지정문화재)와 타자(他者/나)가 드디어 서로를 마주하는 숭고한 시간일지도 모르겠다. 그래서 이 경험의 연속이 지루하고 건조하기 보다 심심함에 더 가깝게 느껴진다. 몇 년간 적지 않은 시간을 미지정 문화재들과 보내며 나는 그 심심함 속에서 지속적으로 작업에 대한 방법론을 바꿔왔다. 처음 스마트폰 카메라로 찍었던 대상을 디지털 카메라로, 필름카메라로, 탁본, 드로잉, 더 나아가 3D스캐너로 촬영하였고, 대상을 작업으로 구현하는 방식도 사진보고 만들기, 가상세계로 이주하기, 3D출력으로 거푸집 만들기, 세라믹 치환 등 점차 다양하게 전개하였다. 대상을 조우함에 있어 정형화된 방법론이라는 심심함에서 벗어나고자 시도하였던 것이고 그 시간은 아마도 사색의 순간이었을 것이라 믿는다. 결국 사색의 시간이 대상과 나의 관계를 다시 정립하는 계기였고 작업과 대상의 관계를 다시 고찰하게 하는 동력이었다. 그리고 이 심심함과 움직임의 궤적을 또 다시 돌아보며 <Connectome>(2022)연작을 구상하였다. 기존 작업의 주제와 형식에서 발생하는 관성에서 벗어나고자 하였고 오히려 깊고 깊은 한적한 심심함으로 향하는 길목에 놓이기를 바라는 작업이다. <Connectome>연작은 미지정 문화재들에 도달하기까지의 과정을 서술하는 방식으로 전개하였다. 서술이라는 표현이 부정확하지만 행위와 과정 중 순간적으로 보고 느꼈던 것을 흙 작업으로 나열하고자 하였기에 서술이라는 단어가 가장 가깝게 다가온다. 북한산 승가사 가는 길에 만난 산개들, 죽림굴 대재 공소의 성심, 아양동 보살입상 촬영 당시 공수를 주신 보살님, 어느 산악회에서 산속에 표시한 산불조심 리본, 달마산 미황사에서 만난 고양이, 비 오는 날 초전리 미륵불에 붙어있던 수많은 개구리들, 이 모든 순간들이 심심한 산책자를 멈추게 하는 요소였다. 한병철이 <피로사회>에서 언급한 ‘깊은 심심함’과 ‘사색’에 관해 진심으로 수긍하기 시작한 것도 위의 순간들을 구현하기 시작할 무렵이었다. 걷고 있는 사람이 걷는 것이 심심하다는 숙고가 없었다면 그 뒤에 달리기, 뜀박질도, 높이 뛰기도 없었을 것이고 더 나아가 춤이라는 전혀 다른 궤적의 움직임도 없었을 것이다. 미지정 문화재를 만나야 한다는 목적이 다분이 직선적이었다면 그 과정에서 발생하는 비효율적 움직임은 춤이라는 복잡한 곡선이다. 따라서 본 연작은 그 춤을 서술하기 위함이고 다시 그 춤을 복기하고 해석하기 위함이다. 때로는 이렇게 작업하고 있는 나의 신경계에 집중하여 그 안에 존재하는 모든 심심한 신경 세포들이 외부의 사건과 어떻게 반응하는지 전체적 지도를 밝히고 싶기도 하다. 그렇게 사색을 통한 초연함과는 거리가 먼 춤의 예술은 없는 것일까.

hello?
2023
12x12x3m(d){오제성}`,
        "parsedDescription": [],
        "anchorPosition": {"x": 9,"y": 0,"z": -7.5},
        "color": {"r": 0.6,"g": 0.6,"b": 0.6},
        "stemVector": {"x": 0, "y": 2, "z": 0},
        "stemVisible": false,
        "floorIndex": 0,
        "floorInfo": {"id": "0", "sequence": 0},
        "media":{"src":"", "type": "mattertag.media.none"},
        "discPosition": {},
        "stemHeight":0.5,
        "roomId": "",
        "id": randomString(11),
        "keywords":[],
        "xyzAttach": "none"
    },
    {
        "number" : 15,
        "sid": randomString(11),
        "enabled": true,
        "url": "",
        "label": "신상 | 작품정보",
        "description": 
`신상
2023
88x68x58cm
나무

조각을 하는 마음, 조각적으로 조각조각 하는 마음에는 잡히지 않는것을 만지고 싶은 마음, 죽음을, 잊혀짐을 붙잡는 마음 상상을 만지고 싶은 마음이 있는것 같다. 작업실에 방문하는 친구들을 이 마음으로 기억하고 싶어 아마추어 3d스캐너를 한대 구해 그들을 디지털 캐스팅하고 있다. 트래킹을 놓치지 않기 위해 움직이지 않는 가장 효율적인 동작을 찾다 보니 옆으로 누워 잠자는(죽은듯이)동작을 주문하게 되었다. 이렇게 캐스팅한 덩어리를 보고 있자니 작은 가구정도의 머리속에서 내 작업실 손님의 신성에 대해, 조각적으로 조각조각하는 기도를 하고 싶은 욕심이 생긴다

God statue
2023
88x68x58cm
wood{장준호}`,
        "parsedDescription": [],
        "anchorPosition": {"x": 21.76,"y": 0,"z": -8.96},
        "color": {"r": 0.6,"g": 0.6,"b": 0.6},
        "stemVector": {"x": 0, "y": 3.5, "z": 0},
        "stemVisible": false,
        "floorIndex": 0,
        "floorInfo": {"id": "0", "sequence": 0},
        "media":{"src":"", "type": "mattertag.media.none"},
        "discPosition": {},
        "stemHeight":0.5,
        "roomId": "",
        "id": randomString(11),
        "keywords":[],
        "xyzAttach": "none"
    },
    {
        "number" : 16,
        "sid": randomString(11),
        "enabled": true,
        "url": "",
        "label": "Leg Parts | 작품정보",
        "description": 
`Leg Parts
2021
51x100x100cm
폴리스틸렌, 디지털 프린트, 자석, 각파이프

가소성이 좋은 물질을 지지체 삼기도 하며 그 표면에서 전통 재료의 물성을 연기하는 동시에 두께가 부여된 이미지를 합성하고 현실과 웹이 뒤섞인 오늘날 물질의 성질 이전에 물질의 존재 자체가 무용지물이 되어버린 상황을 기본값으로 제시한다. 더 나아가 물성 기반의 조각이 디지털, 미디어의 인식 전환을 통해 변환되는 모습을 상상하며 가변성에 초점을 맞춰 모든 작업을 자석으로 체결 할 수 있는 모듈 부품으로 제작해 구조와 형태가 상황에 따라 다양하게 변형이 가능한 한시적 형태의 조각을 실험한다.{정성진}`,
        "parsedDescription": [],
        "anchorPosition": {"x": 4,"y": 0,"z": -3},
        "color": {"r": 0.6,"g": 0.6,"b": 0.6},
        "stemVector": {"x": 0, "y": 2, "z": 0},
        "stemVisible": false,
        "floorIndex": 0,
        "floorInfo": {"id": "0", "sequence": 0},
        "media":{"src":"", "type": "mattertag.media.none"},
        "discPosition": {},
        "stemHeight":0.5,
        "roomId": "",
        "id": randomString(11),
        "keywords":[],
        "xyzAttach": "none"
    },
    {
        "number" : 17,
        "sid": randomString(11),
        "enabled": true,
        "url": "",
        "label": "힘의 계승 | 작품정보",
        "description": 
`힘의 계승
2022
184x105x62cm
PLA, 레진, 에폭시 퍼티, 스티로폼, 철 파이프, 자석, 폴리스티렌, 디지털 프린트, 스타코

인간 형상의 지속적인 탐구는 전통을 계승하는 하나의 수단이자 장르다. 인간의 손에 의해 창조되는 미술이 인간의 형태를 띄거나, 주제 혹은 소재로써 탐구가 계속되고 잇다는 것은 우리 삶에 밀접하게 와닿기 때문에 자연스러운 것일지 모른다. 앞서 언급한 ‘전통’, 지금 내가 감각하고 있는 자연스러운 전통은 무엇이며 그 출발지와 유입 경로는 현재 어디일까. 나라와 인종, 미술 등 공동체라는 함께 속한 범주 안에서는 공동으로 주입된 기억을 가지고 있다. 하지만 스마트폰이 재매개한 현재에선 손쉽게 전통과 역사에 대한 보다 자세한 정보들을 습득할 수 있게 되었고, 이는 더욱 매몰되어 마치 직접 경험한 생경한 역사를 기억하고 있다는 착각을  불러온다. 닿을 수 없는 것에서 오는 환상통을 겪는 당인으로서의 나는 조각가 류인의 작품을 참조 삼아 기억을 지배한 기록과 이식된 경험의 간극 속 시공간을 역 추적 해본다.

succession of power
2022
184x105x62cm{정성진}`,
        "parsedDescription": [],
        "anchorPosition": {"x": 1,"y": 0,"z": -1},
        "color": {"r": 0.6,"g": 0.6,"b": 0.6},
        "stemVector": {"x": 0, "y": 2, "z": 0},
        "stemVisible": false,
        "floorIndex": 0,
        "floorInfo": {"id": "0", "sequence": 0},
        "media":{"src":"", "type": "mattertag.media.none"},
        "discPosition": {},
        "stemHeight":0.5,
        "roomId": "",
        "id": randomString(11),
        "keywords":[],
        "xyzAttach": "none"
    },
    {
        "number" : 18,
        "sid": randomString(11),
        "enabled": true,
        "url": "",
        "label": "뱀을 움켜쥔 팔(L) | 작품정보",
        "description": 
`뱀을 움켜쥔 팔(L)
2022
가변설치
PLA, 자석, 파이프

가소성이 좋은 물질을 지지체 삼기도 하며 그 표면에서 전통 재료의 물성을 연기하는 동시에 두께가 부여된 이미지를 합성하고 현실과 웹이 뒤섞인 오늘날 물질의 성질 이전에 물질의 존재 자체가 무용지물이 되어버린 상황을 기본값으로 제시한다. 더 나아가 물성 기반의 조각이 디지털, 미디어의 인식 전환을 통해 변환되는 모습을 상상하며 가변성에 초점을 맞춰 모든 작업을 자석으로 체결 할 수 있는 모듈 부품으로 제작해 구조와 형태가 상황에 따라 다양하게 변형이 가능한 한시적 형태의 조각을 실험한다.

Arm clutching a snake(L)
2022
dimensions variable
PLA, Magnet, Steel Pipe

I often use materials with good malleability as a support, simulating the properties of traditional materials on their surface. At the same time, I synthesize images with added depth, reflecting today's mix of reality and the web. I present a default scenario where the very existence of material has become redundant, overshadowing its innate properties. Furthermore, I imagine how tangible-based sculptures transform through a shift in digital and media perception. Focusing on adaptability, I manufacture all pieces as modular components that can be connected with magnets, allowing the structure and form to be variably transformed depending on the situation, experimenting with temporary forms of sculpture.{정성진}`,
        "parsedDescription": [],
        "anchorPosition": {"x": 6,"y": 0,"z": 0.64},
        "color": {"r": 0.6,"g": 0.6,"b": 0.6},
        "stemVector": {"x": 0, "y": 2, "z": 0},
        "stemVisible": false,
        "floorIndex": 0,
        "floorInfo": {"id": "0", "sequence": 0},
        "media":{"src":"", "type": "mattertag.media.none"},
        "discPosition": {},
        "stemHeight":0.5,
        "roomId": "",
        "id": randomString(11),
        "keywords":[],
        "xyzAttach": "none"
    },
    {
        "number" : 19,
        "sid": randomString(11),
        "enabled": true,
        "url": "",
        "label": "Self portrait | 작품정보",
        "description": 
`Self portrait
2023
not exist
digital file

작업은 지인들의 장례식장에서 그들의 영정 사진을 보던 경험에서 비롯되었다. 언젠가 나의 가족은 미래에 맞이할 그들의 죽음을 위해 멋지게 꾸미고 포즈를 취하여 초상화를 찍었다. 당신의 사라짐을 위해 포즈를 기록하는 행위가 생경하게 다가왔고, 나의 장례식에 놓일 포즈는 무엇이 되어야 할지 고민이 되었다. 눕는 포즈. 누워있는 자세는 여러 코드를 가지고 있다. 게으름, 병듬, 나약함, 편안함, 안락함, 죽음, 피곤함, 기이함 등 수직적 직립의 세계의 이상과는 다른 것들을 내포한다. 이런 생각으로 가장 먼저 누워가는 모습을 3D 스캔하고, 이를 플렉시블 레진을 이용하여 출력한다. 이후 기계의 크기에 맞춰 출력해내기 위해 몸을 분할한다. 그리고 출력해서 분할된 몸의 여러 면에는 유토를 이용해 덩어리를 발생시켰다. 그러자 유연한 레진의 몸체는 덩어리의 무게로 인해 바닥을 향해 기울었다. 이런 작업의 과정 중 수장고에 제출하는 파일은 작업의 최초 과정인 물리적 실체의 사물인 '나'를 기록한 것이다. 즉, 수장고에 남겨진 데이터는 가상의 세계에서 영원히 존재하는 것에 대한 이야기가 아니라, 그저 대상이 그 포즈로 존재했었다는 기록이다.

Self portrait
2023
not exist
digital file

The project originated from an experience of viewing the memorial photos of acquaintances at their funeral home. Someday, for my own family's future deaths, I decided to elegantly decorate and capture portraits of them posing. The act of recording poses for one's own disappearance felt unfamiliar, and I pondered on what pose should be taken for my own funeral. I chose a lying-down pose. The act of lying down encompasses various connotations beyond the vertical posture of the world, including laziness, sickness, weakness, comfort, coziness, death, tiredness, and eeriness. With these thoughts in mind, I first 3D-scanned the posture of lying down, and then I printed it using flexible resin. Subsequently, I divided the body to fit the machine's size requirements and used a 3D printer to produce the divided parts. I then used Yuto to generate lumps on the surfaces of the segmented body. As a result, the flexible resin body tilted towards the ground due to the weight of the lumps. Throughout this process, the files submitted to the SUJANGGO are records of the initial stage of the physical entity, 'myself,' captured in that particular pose. In other words, the data left in the SUJANGGO is not a story of something perpetually existing in the virtual world, but simply a record that the subject once existed in that pose.{주슬아}`,
        "parsedDescription": [],
        "anchorPosition": {"x": 11.78,"y": 0,"z": -2.25},
        "color": {"r": 0.6,"g": 0.6,"b": 0.6},
        "stemVector": {"x": 0, "y": 2, "z": 0},
        "stemVisible": false,
        "floorIndex": 0,
        "floorInfo": {"id": "0", "sequence": 0},
        "media":{"src":"", "type": "mattertag.media.none"},
        "discPosition": {},
        "stemHeight":0.5,
        "roomId": "",
        "id": randomString(11),
        "keywords":[],
        "xyzAttach": "none"
    },
    {
        "number" : 20,
        "sid": randomString(11),
        "enabled": true,
        "url": "",
        "label": "물에서 온 여신상 | 작품정보",
        "description": 
`물에서 온 여신상
2023
40x25x28cm
철망, 석고붕대, 제스모나이트, 갑오징어뼈, 조개 껍데기, 돌

고대의 모계사회 시대에 만들어진 여신상이 해저에서 발견되었다는 상상을 기반으로 만들어진 조각이다.

Statue of Goddess from Water
2023
40x25x28cm
wire mesh, plaster bandage, jesmonite, cuttlebone, shells, stones

This sculpture is made from an imaginary representation of a statue of a goddess of an ancient matriarchal society that was found by means of underwater archaeology.{홍자영}`,
        "parsedDescription": [],
        "anchorPosition": {"x": 19.21,"y": 0,"z": -4.31},
        "color": {"r": 0.6,"g": 0.6,"b": 0.6},
        "stemVector": {"x": 0, "y": 2.4, "z": 0},
        "stemVisible": false,
        "floorIndex": 0,
        "floorInfo": {"id": "0", "sequence": 0},
        "media":{"src":"", "type": "mattertag.media.none"},
        "discPosition": {},
        "stemHeight":0.5,
        "roomId": "",
        "id": randomString(11),
        "keywords":[],
        "xyzAttach": "none"
    },
    {
        "number" : 21,
        "sid": randomString(11),
        "enabled": true,
        "url": "",
        "label": "전시 서문 | 박주원",
        "description": 
`조각모음(Defragmentation)은 컴퓨터 시스템을 관리하는 환경에서 진행하는 단편화 제거 작업을 뜻한다. 단편화는 컴퓨터 기억 장치의 비어있는 공간 혹은 자료가 여러 조각으로 나누어지는 것을 의미하는데, 이는 사용할 수 있는 기억 장치의 공간을 줄이거나 컴퓨터의 수행 속도를 늦추는 작업이다. 따라서 조각모음은 이런 단편화를 제거하여 낭비되는 공간을 없애고 파일을 하나로 이어주며 프로그램을 효과적으로 사용할 수 있게 해주는 작업이다. 이에 빗대어 이번 전시를 통해 전통 재료의 조각과 데이터를 기반으로 제작된 조각을 함께 선보이며 새로운 조각성에 관한 이야기들을 집약시키는 '조각모음'을 실행해보고자 한다. 전시의 제목인 ‘조각모음’은 최근 진행되고 있는 많은 조각 전시에서 등장하는 조각에 관한 이야기와 작가들의 물음들을 모두 모아보자는 뜻을 지닌다. 동시에 또 다른, 전시에 숨겨져 있는 여러 겹의 조각모음을 뜻하기도 한다.

이 전시는 작가들과 함께한 기록과 기억의 조각들로부터 시작된다. 우리는 약 3개월이라는 시간 동안 워크숍과 작업실 방문 등을 하며 함께 시간을 보냈다. 미술계 분들과 8회의 워크숍을 진행하면서 ‘기술과 예술’에 대한 생각을 정리하고, 워크숍이 마무리된 후에는 각 작가의 작업실을 방문하면서 작업과 작가의 삶에 관한 이야기를 나누었다. ‘예술과 기술의 융합’을 주제로 하는 프로젝트인 언폴드엑스 기획자캠프의 결과물로서 우리가 전시를 보여주고자 할 때 가장 고민이 되었던 것은 ‘예술’과 ‘기술’이라는 각각의 커다란 의미를 지닌 단어가 이질적으로 돋보이지 않도록 하는 것이었다. 만남의 초반에는 문자 그대로의 ‘예술과 기술의 융합’이라는 의미에 조금 갇혀있었던 듯하다. 글로 쓰여 있는 것에 사람들은 쉽게 현혹되기에, 예술/기술/융합이라는 단어 중 어느 한 단어에 부등호가 쏠리는 의미 부여를 제거하고 세 단어의 접점을 찾을 수 있도록 우리는 많은 이야기를 나누었다.

함께 시간을 보내며 관찰자 입장에 있던 나는 작가들이 ‘기술’이라는 낯설고도 모호한 단어 앞에서 느끼는 오해와 어떤 두려움을 거두고 다시 ‘예술’이라는 본질적 단어에 집중하는 것을 목격하였다. ‘예술/기술/융합’이라는 비닐 장막 같은 단어들이 걷히자, 뒤에서 잠시 숨을 고르고 있다가 다시 등장한 ‘작가가 생각하는 예술은 무엇인가’라는 본질적인 질문을 작가들은 성실히 마주했다. 만남이 마지막으로 향할수록 작가들은 저마다의 방식으로 예술/기술/융합을 뒤섞어 다시 본래 이야기들을 엮어내고 있었다. 시대가 파도처럼 밀려 보내준 거대 단어 앞에서 우리는 조금 겁을 먹고 있었던 것이 아닐까? 언어로 명명되기 이전에 이미 예술을 하는 사람들은 기술을 자신이 뜻하는 바를 표현하기 위해서 사용하고 있었는데 말이다. 일곱 명의 작가가 자신의 이야기들을 솔직하게 나눈 시간의 조각들은 또 다르게 엮여 새로운 조각모음으로 치환된다.

이번 전시에서 주로 사용한 기술은 3D 스캔/프린팅, VR과 전통 조각술이다. 3D 스캔 작업을 하면서 보다 정교한 결과물을 위해서 역설계 과정을 거치게 되는데 이는 원본을 스캔한 후 사물 혹은 물질을 재구성하는 것을 의미한다. 이와 같은 스캔과 역설계 과정을 통해 전통적 조각들은 작가들의 주관적 편집을 거쳐 재맥락화된다. 각기 다른 생각과 필요성, 다른 재료들로 3D 기술을 사용한 작가들의 작품은 각자의 성격대로 각자의 모습을 하고 나온다. 또한 screenxyz, SUJANGGO수장고와의 협력을 통해 온오프라인에서 느낄 수 있는 조각의 성질들을 전시 안에서 배열해보고자 한다. VR 역시 현시하고 있는 공간 자체를 프로그램 안에서 실제에 가깝게 재맥락화하여 보여준다는 특성이 있다. 문래예술공장 갤러리 M30에서 이뤄지는 전시와는 또 다른 맥락으로 진행되는 가상공간 안의 VR 전시를 통해, 임시적이고 가변적인 공간에서 전통적 성질을 벗어난 조각이 주는 흥미로운 지점들을 관람객들과 함께 공유하고자 한다. 또한 몇 년간 온라인 공간에서의 조각 아카이브에 관해 탐구해온 SUJANGGO수장고 온라인 사이트에서 조각모음 참여작가들의 작품들을 3D 스캔본으로 보고 또한 관람객 스스로 다른 형질로 변형시키거나 가공하게 함으로써, 기술을 사용했을 때의 조각의 시각성과 촉각성에 대한 사유를 전시에 오는 이들 혹은 온라인으로 작품을 만나보는 이들과 함께 나눠보고자 한다. screenxyz의 화면과 SUJANGGO수장고 사이트에서 만나는 온라인상의 조각들과 갤러리 M30에서 전시되는 조각들의 속성이 다르기에, 이를 통해 실재하는 조각은 무엇이며 또한 원본은 무엇인지에 대한 논의로의 확장을 유도해보고자 한다. 한편 작가들이 전시를 준비하며 나온, 그들의 작업 전반을 설명하는 부산물의 조각들은 전시장 밖 아카이브 테이블에 또 다른 맥락으로 전시된다. 이로써 전시는 4개의 채널(갤러리 M30, SUJANGGO수장고 온라인사이트, screenxyz의 VR 화면, 아카이브 테이블)이 혼재되며, 보는 사람으로 하여금 변주되는 차원에서 조각에 관한 이야기들을 동시에 감각하게 한다.

곽인탄은 유기적인 구조 위에 다양한 조각들이 자율적으로 변화하며 유동하는 조각을 선보인다. 무수히 많은 작은 조각들로 이루어진 곽인탄의 조각은 그 자체로 조각적 유희의 장이 된다. 실시간으로 제작되는 작은 조각들은 우연적으로 재배열되어 주변을 교차하며 공간으로 연장된다. <저글링>의 작은 조각들은 제목과 동일하게 '저글링'이라고 불리는데 묘기를 부리듯 서커스 무대와 유사하게 긴장감을 만들어낸다. 작가의 조각은 여러 조각으로 분해되고 허공에서 무대를 장식함으로써 유희의 장이 되는 것을 시도한다.
안민환은 조각이라는 매체가 풍경을 담을 수 있는지에 대한 질문을 시작으로 여백과 페인팅 그리고 자연의 풍경을 조각에 결합한다. 이를 바탕으로 단일조각의 확장 가능성을 모색하는 ‘풍경조각’ 시리즈를 연구하고 있다. <범굴암 5.8개척>은 암벽등반을 통해 바위를 스캔하며 왜곡된 3D 데이터와 텍스쳐 풍경을 재구성한다. <범굴암 5.8개척 분재>는 등반 당시의 자연에 압도되던 무력감에서 시작한 작품이다. 작가의 작품에 표현된 자연의 순간순간의 틈새들은 그 자체로 작가의 여정과 감정을 말해주는 동시에 풍경을 다르게 보기를 유도한다.
오제성은 지속적으로 관심을 가져온 비지정문화재를 소재로 동시에 공존할 수 없는 것들에 대한 새로운 서술과 역사화를 시도한다. <갓트론>은 다양한 거석의 접목을 통한 변신 거석으로 비지정문화재의 역사를 재구성한다. 한편 AI 이미지 형성 기술을 통해 명령어가 변환되어 만들어진 조각가 오귀스트 로댕(Auguste Rodin)의 이미지와 그 이미지가 언어 합성 기술을 통해 로댕의 어록을 낭독하는 모습을 함께 보여주는 <죽은자가 말을 한다>는 명령어와 데이터로 깎고 새겨진 조각의 모습과 의미를 추적한다.
장준호는 <신상>을 통해 죽음과 잊힘을 붙잡고자 하는 작가의 마음에 집중한다. 작업실에 방문하는 사람들을 기억하고 싶은 마음으로 작가는 그들을 디지털 캐스팅한다. 트래킹을 놓치지 않기 위해서 모델에게 움직이지 않고 잠을 자는 모습의 동작을 주문하기에, 구현된 캐스팅 덩어리는 현실의 데스마스크(death mask)와도 같은 모습을 한다. 애초 조각에서 인체상을 빼고는 말할 수 없기에, 작가의 절단된 인체 조각은 조각을 만들기 시작했던 인간 본연의 마음이 무엇인지를 생각해보게 한다.
정성진은 실재와 가상의 구분이 모호해진 흐름 속에서 물성을 기반으로 한 조각이 디지털, 미디어의 인식 전환을 통해 재구축되는 방식을 고민하고 실험한다. 모듈러 조각 방식을 도입한 작가의 조각은 유동적 결합을 통해 한시적으로 재배치된다. 가변성이 바탕이 되는 조각들은 존재하는 현상과 이야기들을 무한히 교배하면서 호환되고 확장된다. <카운터 가제트>는 기술과 조각의 상호보완적 균형을 생각하며 헤파이스토스(Hephaestus)와 시바신(siva)이라는 창조와 파괴의 신에 관한 이야기를 혼종적 내러티브로 표현한 작품이다.
주슬아는 기록 사진의 포즈에 관심을 가지고 작업을 시작하여 몸을 땅에 기대는 과정을 기록하기 위해 누워있는 이미지를 수집하고, 이를 인쇄한 종이에 유토를 덧발라 스캔해 다시 인쇄하는 과정을 거친 <Reclining>을 선보인다. 몸을 땅에 기대는 포즈를 3D 스캔하여 움직임으로 인한 노이즈를 포함한 형태를 3D 프린트로 출력했으며, 이 과정에서 몸의 질감을 연상시키는 재질을 사용하였다. 이것은 몸과 땅 사이의 관계와 유사하게 물질 간의 상호작용에 대한 작가의 고민을 반영한 것이다.
홍자영은 관념적인 자연의 풍경을 3D매체와 왁스 등을 통해 구현한다. <산수조각>에서 작가는 범관의 계산행려도(溪山行旅圖)와 직접 경험한 풍경을 참고하여 만든 이상향적인 산수화를 모래로 깎아 만들고 3D스캔, 프린트하여 원본이 보존되지 않는 조각을 전시장에 옮기는 시도를 한다. 창경궁 자경전 터에 있는 괴석 받침을 스캔해 좌대로 만든 <팔각괴석받침>과 산과 구름, 물의 형상을 왁스로 그린 <The Gate of Wind and Water>을 함께 선보인다. 이를 통해 작가는 시점의 다변화가 가능한 상상과 실제의 혼합체인 현대적 산수화를 제시한다.`,
        "parsedDescription": [],
        "anchorPosition": {"x": 11.8,"y": 0,"z": -13.5},
        "color": {"r": 0,"g": 0,"b": 0},
        "stemVector": {"x": 0, "y": 0.8, "z": 0},
        "stemVisible": false,
        "floorIndex": 0,
        "floorInfo": {"id": "0", "sequence": 0},
        "media":{"src":"", "type": "mattertag.media.none"},
        "discPosition": {},
        "stemHeight":0.5,
        "roomId": "",
        "id": randomString(11),
        "keywords":[],
        "xyzAttach": "none"
    },
    {
        "number" : 3,
        "sid": randomString(11),
        "enabled": true,
        "url": "",
        "label": "UNUSUAL DIVE",
        "description": "{오제성}",
        "parsedDescription": [],
        "anchorPosition": {"x": 9,"y": 0,"z": -7.5},
        "color": {"r": 0,"g": 0,"b": 0},
        "stemVector": {"x": 0, "y": 2.4, "z": 0},
        "stemVisible": false,
        "floorIndex": 0,
        "floorInfo": {"id": "0", "sequence": 0},
        "media":{"src":"", "type": "mattertag.media.none"},
        "discPosition": {},
        "stemHeight":0.5,
        "roomId": "",
        "id": randomString(11),
        "keywords":[],
        "xyzAttach": "link"
    },
]

export { objectsToLoadY, inputData }