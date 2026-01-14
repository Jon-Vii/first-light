// AUTO-GENERATED FILE - Do not edit directly
// Generated from d3-celestial constellation data
// Source: https://github.com/ofrohn/d3-celestial

import type { ConstellationData, Observatory } from './types';

export const SKY_WIDTH = 6000;
export const SKY_HEIGHT = 3000;

export type { Observatory };
export type { ConstellationData };

export const OBSERVATORIES: Record<Observatory, { id: Observatory; name: string; location: string; description: string }> = {
  northern: {
    id: 'northern',
    name: 'Alpine Observatory',
    location: 'Swiss Alps, 46°N',
    description: 'A historic mountain observatory with crisp, clear skies perfect for viewing northern constellations.',
  },
  southern: {
    id: 'southern',
    name: 'Atacama Observatory',
    location: 'Chile, 24°S',
    description: 'One of the driest places on Earth, offering unparalleled views of the southern celestial hemisphere.',
  },
};

export const CONSTELLATIONS: ConstellationData[] = [
  {
    "id": "and",
    "name": "Andromeda",
    "latinName": "Andromeda",
    "description": "The Chained Princess - Home to the Andromeda Galaxy, our nearest major galaxy.",
    "centerX": 137,
    "centerY": 866,
    "radius": 100,
    "discovered": false,
    "observatory": "northern",
    "stars": [
      {
        "id": "and-0",
        "x": 516,
        "y": 795,
        "brightness": 0.8141025134893581
      },
      {
        "id": "and-1",
        "x": 291,
        "y": 906,
        "brightness": 0.9656718979970569
      },
      {
        "id": "and-2",
        "x": 164,
        "y": 986,
        "brightness": 0.9190036468291775
      },
      {
        "id": "and-3",
        "x": 35,
        "y": 1015,
        "brightness": 0.9691302138597312
      },
      {
        "id": "and-4",
        "x": 238,
        "y": 1110,
        "brightness": 0.9008305980209566
      },
      {
        "id": "and-5",
        "x": 197,
        "y": 1096,
        "brightness": 0.8980770133418114
      },
      {
        "id": "and-6",
        "x": 161,
        "y": 1011,
        "brightness": 0.8676135813353353
      },
      {
        "id": "and-7",
        "x": 154,
        "y": 938,
        "brightness": 0.9636998751278829
      },
      {
        "id": "and-8",
        "x": -91,
        "y": 779,
        "brightness": 0.800932614565556
      },
      {
        "id": "and-9",
        "x": -242,
        "y": 795,
        "brightness": 0.8638914012990118
      },
      {
        "id": "and-10",
        "x": -82,
        "y": 761,
        "brightness": 0.8003631878606594
      },
      {
        "id": "and-11",
        "x": -93,
        "y": 726,
        "brightness": 0.8195937037044394
      },
      {
        "id": "and-12",
        "x": 236,
        "y": 858,
        "brightness": 0.9841662648841576
      },
      {
        "id": "and-13",
        "x": 208,
        "y": 815,
        "brightness": 0.8643902264213131
      },
      {
        "id": "and-14",
        "x": 290,
        "y": 713,
        "brightness": 0.8771707427674319
      },
      {
        "id": "and-15",
        "x": 408,
        "y": 690,
        "brightness": 0.8979894026798375
      },
      {
        "id": "and-16",
        "x": -58,
        "y": 726,
        "brightness": 0.9058768426758672
      }
    ],
    "connections": [
      [
        0,
        1
      ],
      [
        1,
        2
      ],
      [
        2,
        3
      ],
      [
        4,
        5
      ],
      [
        5,
        6
      ],
      [
        6,
        2
      ],
      [
        2,
        7
      ],
      [
        7,
        8
      ],
      [
        8,
        9
      ],
      [
        8,
        10
      ],
      [
        10,
        11
      ],
      [
        1,
        12
      ],
      [
        12,
        13
      ],
      [
        13,
        14
      ],
      [
        14,
        15
      ],
      [
        10,
        16
      ]
    ],
    "set": "royal"
  },
  {
    "id": "aql",
    "name": "Aquila",
    "latinName": "Aquila",
    "description": "The Eagle - Contains Altair, one of the Summer Triangle stars.",
    "centerX": 4913,
    "centerY": 1420,
    "radius": 100,
    "discovered": false,
    "observatory": "northern",
    "stars": [
      {
        "id": "aql-0",
        "x": 4943,
        "y": 1323,
        "brightness": 0.8279436666605731
      },
      {
        "id": "aql-1",
        "x": 4962,
        "y": 1352,
        "brightness": 0.8306782306995987
      },
      {
        "id": "aql-2",
        "x": 4980,
        "y": 1393,
        "brightness": 0.8633703533700812
      },
      {
        "id": "aql-3",
        "x": 5047,
        "y": 1514,
        "brightness": 0.8072889144743572
      },
      {
        "id": "aql-4",
        "x": 4969,
        "y": 1483,
        "brightness": 0.9093661431474751
      },
      {
        "id": "aql-5",
        "x": 4856,
        "y": 1448,
        "brightness": 0.9353302338305756
      },
      {
        "id": "aql-6",
        "x": 4773,
        "y": 1269,
        "brightness": 0.9233610290181822
      },
      {
        "id": "aql-7",
        "x": 4776,
        "y": 1581,
        "brightness": 0.9183289319209849
      }
    ],
    "connections": [
      [
        0,
        1
      ],
      [
        1,
        2
      ],
      [
        2,
        3
      ],
      [
        3,
        4
      ],
      [
        4,
        5
      ],
      [
        5,
        6
      ],
      [
        6,
        1
      ],
      [
        1,
        5
      ],
      [
        5,
        7
      ]
    ]
  },
  {
    "id": "ari",
    "name": "Aries",
    "latinName": "Aries",
    "description": "The Ram - A zodiac constellation marking the spring equinox.",
    "centerX": 547,
    "centerY": 1122,
    "radius": 100,
    "discovered": false,
    "observatory": "northern",
    "stars": [
      {
        "id": "ari-0",
        "x": 708,
        "y": 1046,
        "brightness": 0.8627363415734451
      },
      {
        "id": "ari-1",
        "x": 530,
        "y": 1109,
        "brightness": 0.9714727404434647
      },
      {
        "id": "ari-2",
        "x": 478,
        "y": 1153,
        "brightness": 0.918122917960012
      },
      {
        "id": "ari-3",
        "x": 473,
        "y": 1178,
        "brightness": 0.9447476738473627
      }
    ],
    "connections": [
      [
        0,
        1
      ],
      [
        1,
        2
      ],
      [
        2,
        3
      ]
    ],
    "set": "zodiac"
  },
  {
    "id": "aur",
    "name": "Auriga",
    "latinName": "Auriga",
    "description": "The Charioteer - Contains bright Capella, the sixth-brightest star.",
    "centerX": 1356,
    "centerY": 814,
    "radius": 100,
    "discovered": false,
    "observatory": "northern",
    "stars": [
      {
        "id": "aur-0",
        "x": 1498,
        "y": 751,
        "brightness": 0.851003733213534
      },
      {
        "id": "aur-1",
        "x": 1320,
        "y": 733,
        "brightness": 0.9987300371478717
      },
      {
        "id": "aur-2",
        "x": 1277,
        "y": 813,
        "brightness": 0.8721137540890453
      },
      {
        "id": "aur-3",
        "x": 1237,
        "y": 947,
        "brightness": 0.8383994266025002
      },
      {
        "id": "aur-4",
        "x": 1360,
        "y": 1023,
        "brightness": 0.9606876798429935
      },
      {
        "id": "aur-5",
        "x": 1499,
        "y": 880,
        "brightness": 0.9847821962110072
      },
      {
        "id": "aur-6",
        "x": 1498,
        "y": 595,
        "brightness": 0.9142518172101785
      },
      {
        "id": "aur-7",
        "x": 1258,
        "y": 770,
        "brightness": 0.9267504166360693
      },
      {
        "id": "aur-8",
        "x": 1260,
        "y": 815,
        "brightness": 0.9006046729690445
      }
    ],
    "connections": [
      [
        0,
        1
      ],
      [
        1,
        2
      ],
      [
        2,
        3
      ],
      [
        3,
        4
      ],
      [
        4,
        5
      ],
      [
        5,
        0
      ],
      [
        0,
        6
      ],
      [
        6,
        1
      ],
      [
        1,
        7
      ],
      [
        7,
        8
      ]
    ]
  },
  {
    "id": "boo",
    "name": "Boötes",
    "latinName": "Boötes",
    "description": "The Herdsman - Contains Arcturus, the fourth-brightest star in the sky.",
    "centerX": 3618,
    "centerY": 961,
    "radius": 100,
    "discovered": false,
    "observatory": "northern",
    "stars": [
      {
        "id": "boo-0",
        "x": 3447,
        "y": 1209,
        "brightness": 0.859700234105281
      },
      {
        "id": "boo-1",
        "x": 3478,
        "y": 1193,
        "brightness": 0.8700003253252987
      },
      {
        "id": "boo-2",
        "x": 3565,
        "y": 1180,
        "brightness": 0.9963637914003568
      },
      {
        "id": "boo-3",
        "x": 3633,
        "y": 994,
        "brightness": 0.8367637273199132
      },
      {
        "id": "boo-4",
        "x": 3634,
        "y": 862,
        "brightness": 0.9176608345906236
      },
      {
        "id": "boo-5",
        "x": 3758,
        "y": 827,
        "brightness": 0.9692822114903988
      },
      {
        "id": "boo-6",
        "x": 3815,
        "y": 945,
        "brightness": 0.9072246019224877
      },
      {
        "id": "boo-7",
        "x": 3687,
        "y": 1049,
        "brightness": 0.9921483159310973
      },
      {
        "id": "boo-8",
        "x": 3671,
        "y": 1271,
        "brightness": 0.8867843749678986
      },
      {
        "id": "boo-9",
        "x": 3568,
        "y": 732,
        "brightness": 0.9939222614364893
      },
      {
        "id": "boo-10",
        "x": 3556,
        "y": 637,
        "brightness": 0.8057838769149148
      },
      {
        "id": "boo-11",
        "x": 3605,
        "y": 636,
        "brightness": 0.9426699777654164
      }
    ],
    "connections": [
      [
        0,
        1
      ],
      [
        1,
        2
      ],
      [
        2,
        3
      ],
      [
        3,
        4
      ],
      [
        4,
        5
      ],
      [
        5,
        6
      ],
      [
        6,
        7
      ],
      [
        7,
        2
      ],
      [
        2,
        8
      ],
      [
        4,
        9
      ],
      [
        9,
        10
      ],
      [
        10,
        11
      ],
      [
        11,
        9
      ]
    ],
    "set": "ursa"
  },
  {
    "id": "cam",
    "name": "Camelopardalis",
    "latinName": "Camelopardalis",
    "description": "The Giraffe - A large but faint northern constellation.",
    "centerX": 1231,
    "centerY": 409,
    "radius": 100,
    "discovered": false,
    "observatory": "northern",
    "stars": [
      {
        "id": "cam-0",
        "x": 1239,
        "y": 604,
        "brightness": 0.9768612820095175
      },
      {
        "id": "cam-1",
        "x": 1264,
        "y": 493,
        "brightness": 0.8063346882050675
      },
      {
        "id": "cam-2",
        "x": 1225,
        "y": 394,
        "brightness": 0.8094945891020434
      },
      {
        "id": "cam-3",
        "x": 960,
        "y": 311,
        "brightness": 0.8126394979428062
      },
      {
        "id": "cam-4",
        "x": 956,
        "y": 408,
        "brightness": 0.9896426118600434
      },
      {
        "id": "cam-5",
        "x": 871,
        "y": 501,
        "brightness": 0.9032732118650165
      },
      {
        "id": "cam-6",
        "x": 1579,
        "y": 345,
        "brightness": 0.9250958998098653
      },
      {
        "id": "cam-7",
        "x": 1750,
        "y": 217,
        "brightness": 0.9783822075340747
      }
    ],
    "connections": [
      [
        0,
        1
      ],
      [
        1,
        2
      ],
      [
        2,
        3
      ],
      [
        3,
        4
      ],
      [
        4,
        5
      ],
      [
        2,
        6
      ],
      [
        6,
        7
      ]
    ]
  },
  {
    "id": "cnc",
    "name": "Cancer",
    "latinName": "Cancer",
    "description": "The Crab - A zodiac constellation containing the Beehive Cluster.",
    "centerX": 2175,
    "centerY": 1202,
    "radius": 100,
    "discovered": false,
    "observatory": "northern",
    "stars": [
      {
        "id": "cnc-0",
        "x": 2244,
        "y": 1302,
        "brightness": 0.8200145598607185
      },
      {
        "id": "cnc-1",
        "x": 2186,
        "y": 1197,
        "brightness": 0.8544628409183378
      },
      {
        "id": "cnc-2",
        "x": 2180,
        "y": 1142,
        "brightness": 0.9510058345677103
      },
      {
        "id": "cnc-3",
        "x": 2194,
        "y": 1021,
        "brightness": 0.8701847515250873
      },
      {
        "id": "cnc-4",
        "x": 2069,
        "y": 1347,
        "brightness": 0.9698344661302024
      }
    ],
    "connections": [
      [
        0,
        1
      ],
      [
        1,
        2
      ],
      [
        2,
        3
      ],
      [
        1,
        4
      ]
    ],
    "set": "zodiac"
  },
  {
    "id": "cvn",
    "name": "Canes Venatici",
    "latinName": "Canes Venatici",
    "description": "The Hunting Dogs - Contains the beautiful Whirlpool Galaxy.",
    "centerX": 3187,
    "centerY": 836,
    "radius": 63,
    "discovered": false,
    "observatory": "northern",
    "stars": [
      {
        "id": "cvn-0",
        "x": 3233,
        "y": 861,
        "brightness": 0.9527464574216251
      },
      {
        "id": "cvn-1",
        "x": 3141,
        "y": 811,
        "brightness": 0.9417653569406148
      }
    ],
    "connections": [
      [
        0,
        1
      ]
    ],
    "set": "ursa"
  },
  {
    "id": "cmi",
    "name": "Canis Minor",
    "latinName": "Canis Minor",
    "description": "The Little Dog - Contains Procyon, the eighth-brightest star.",
    "centerX": 1889,
    "centerY": 1388,
    "radius": 50,
    "discovered": false,
    "observatory": "northern",
    "stars": [
      {
        "id": "cmi-0",
        "x": 1914,
        "y": 1413,
        "brightness": 0.8681298747845952
      },
      {
        "id": "cmi-1",
        "x": 1863,
        "y": 1362,
        "brightness": 0.900925940837916
      }
    ],
    "connections": [
      [
        0,
        1
      ]
    ],
    "set": "orion"
  },
  {
    "id": "cas",
    "name": "Cassiopeia",
    "latinName": "Cassiopeia",
    "description": "The Queen - Famous W-shaped constellation circling the North Pole.",
    "centerX": 256,
    "centerY": 499,
    "radius": 100,
    "discovered": false,
    "observatory": "northern",
    "stars": [
      {
        "id": "cas-0",
        "x": 477,
        "y": 439,
        "brightness": 0.9394848860470987
      },
      {
        "id": "cas-1",
        "x": 358,
        "y": 496,
        "brightness": 0.9783928902940284
      },
      {
        "id": "cas-2",
        "x": 236,
        "y": 488,
        "brightness": 0.8674068850392996
      },
      {
        "id": "cas-3",
        "x": 169,
        "y": 558,
        "brightness": 0.868900895431771
      },
      {
        "id": "cas-4",
        "x": 38,
        "y": 514,
        "brightness": 0.8884670548490403
      }
    ],
    "connections": [
      [
        0,
        1
      ],
      [
        1,
        2
      ],
      [
        2,
        3
      ],
      [
        3,
        4
      ]
    ],
    "set": "royal"
  },
  {
    "id": "cep",
    "name": "Cepheus",
    "latinName": "Cepheus",
    "description": "The King - A circumpolar constellation, husband of Cassiopeia.",
    "centerX": 5479,
    "centerY": 443,
    "radius": 100,
    "discovered": false,
    "observatory": "northern",
    "stars": [
      {
        "id": "cep-0",
        "x": 5123,
        "y": 450,
        "brightness": 0.8501373425112565
      },
      {
        "id": "cep-1",
        "x": 5189,
        "y": 469,
        "brightness": 0.8651881273578926
      },
      {
        "id": "cep-2",
        "x": 5327,
        "y": 457,
        "brightness": 0.8141153514471642
      },
      {
        "id": "cep-3",
        "x": 5431,
        "y": 520,
        "brightness": 0.8092458614930269
      },
      {
        "id": "cep-4",
        "x": 5563,
        "y": 549,
        "brightness": 0.9625469435907534
      },
      {
        "id": "cep-5",
        "x": 5545,
        "y": 530,
        "brightness": 0.9711766303896939
      },
      {
        "id": "cep-6",
        "x": 5622,
        "y": 526,
        "brightness": 0.8230367629903199
      },
      {
        "id": "cep-7",
        "x": 5707,
        "y": 397,
        "brightness": 0.8218017537114877
      },
      {
        "id": "cep-8",
        "x": 5914,
        "y": 206,
        "brightness": 0.8477163547518884
      },
      {
        "id": "cep-9",
        "x": 5369,
        "y": 324,
        "brightness": 0.8092561154018787
      }
    ],
    "connections": [
      [
        0,
        1
      ],
      [
        1,
        2
      ],
      [
        2,
        3
      ],
      [
        3,
        4
      ],
      [
        4,
        5
      ],
      [
        5,
        6
      ],
      [
        6,
        7
      ],
      [
        7,
        8
      ],
      [
        8,
        9
      ],
      [
        9,
        2
      ],
      [
        9,
        7
      ]
    ],
    "set": "royal"
  },
  {
    "id": "com",
    "name": "Coma Berenices",
    "latinName": "Coma Berenices",
    "description": "Berenice's Hair - Named after an Egyptian queen's sacrifice.",
    "centerX": 3234,
    "centerY": 1091,
    "radius": 100,
    "discovered": false,
    "observatory": "northern",
    "stars": [
      {
        "id": "com-0",
        "x": 3292,
        "y": 1208,
        "brightness": 0.9097500503512723
      },
      {
        "id": "com-1",
        "x": 3299,
        "y": 1035,
        "brightness": 0.8540457590908355
      },
      {
        "id": "com-2",
        "x": 3112,
        "y": 1029,
        "brightness": 0.9952746752596914
      }
    ],
    "connections": [
      [
        0,
        1
      ],
      [
        1,
        2
      ]
    ]
  },
  {
    "id": "crb",
    "name": "Corona Borealis",
    "latinName": "Corona Borealis",
    "description": "The Northern Crown - A distinctive semicircular constellation.",
    "centerX": 3933,
    "centerY": 1033,
    "radius": 95,
    "discovered": false,
    "observatory": "northern",
    "stars": [
      {
        "id": "crb-0",
        "x": 3887,
        "y": 977,
        "brightness": 0.8653284911562453
      },
      {
        "id": "crb-1",
        "x": 3866,
        "y": 1015,
        "brightness": 0.9960594504052629
      },
      {
        "id": "crb-2",
        "x": 3895,
        "y": 1055,
        "brightness": 0.8786592518795133
      },
      {
        "id": "crb-3",
        "x": 3928,
        "y": 1062,
        "brightness": 0.9583296342095776
      },
      {
        "id": "crb-4",
        "x": 3957,
        "y": 1066,
        "brightness": 0.949299481001254
      },
      {
        "id": "crb-5",
        "x": 3990,
        "y": 1052,
        "brightness": 0.9237628431172362
      },
      {
        "id": "crb-6",
        "x": 4006,
        "y": 1002,
        "brightness": 0.9426563487601143
      }
    ],
    "connections": [
      [
        0,
        1
      ],
      [
        1,
        2
      ],
      [
        2,
        3
      ],
      [
        3,
        4
      ],
      [
        4,
        5
      ],
      [
        5,
        6
      ]
    ]
  },
  {
    "id": "cyg",
    "name": "Cygnus",
    "latinName": "Cygnus",
    "description": "The Swan - Contains Deneb and the Northern Cross asterism.",
    "centerX": 5029,
    "centerY": 828,
    "radius": 100,
    "discovered": false,
    "observatory": "northern",
    "stars": [
      {
        "id": "cyg-0",
        "x": 5304,
        "y": 996,
        "brightness": 0.849402564529294
      },
      {
        "id": "cyg-1",
        "x": 5193,
        "y": 934,
        "brightness": 0.8589290976163007
      },
      {
        "id": "cyg-2",
        "x": 5093,
        "y": 829,
        "brightness": 0.9588997819531633
      },
      {
        "id": "cyg-3",
        "x": 4937,
        "y": 748,
        "brightness": 0.8199156521303517
      },
      {
        "id": "cyg-4",
        "x": 4874,
        "y": 638,
        "brightness": 0.8779415992515263
      },
      {
        "id": "cyg-5",
        "x": 4821,
        "y": 611,
        "brightness": 0.8792770583598375
      },
      {
        "id": "cyg-6",
        "x": 5173,
        "y": 745,
        "brightness": 0.8347441838127664
      },
      {
        "id": "cyg-7",
        "x": 4985,
        "y": 915,
        "brightness": 0.9001277596404251
      },
      {
        "id": "cyg-8",
        "x": 4878,
        "y": 1034,
        "brightness": 0.8077904812970126
      }
    ],
    "connections": [
      [
        0,
        1
      ],
      [
        1,
        2
      ],
      [
        2,
        3
      ],
      [
        3,
        4
      ],
      [
        4,
        5
      ],
      [
        6,
        2
      ],
      [
        2,
        7
      ],
      [
        7,
        8
      ]
    ]
  },
  {
    "id": "del",
    "name": "Delphinus",
    "latinName": "Delphinus",
    "description": "The Dolphin - A small but distinctive constellation.",
    "centerX": 5167,
    "centerY": 1257,
    "radius": 75,
    "discovered": false,
    "observatory": "northern",
    "stars": [
      {
        "id": "del-0",
        "x": 5138,
        "y": 1312,
        "brightness": 0.9864496992711562
      },
      {
        "id": "del-1",
        "x": 5156,
        "y": 1257,
        "brightness": 0.8340724316697852
      },
      {
        "id": "del-2",
        "x": 5165,
        "y": 1235,
        "brightness": 0.8626024074011661
      },
      {
        "id": "del-3",
        "x": 5194,
        "y": 1231,
        "brightness": 0.8163157952244241
      },
      {
        "id": "del-4",
        "x": 5181,
        "y": 1249,
        "brightness": 0.9554074626028239
      }
    ],
    "connections": [
      [
        0,
        1
      ],
      [
        1,
        2
      ],
      [
        2,
        3
      ],
      [
        3,
        4
      ],
      [
        4,
        1
      ]
    ],
    "set": "waters"
  },
  {
    "id": "dra",
    "name": "Draco",
    "latinName": "Draco",
    "description": "The Dragon - Winds around the north celestial pole.",
    "centerX": 4162,
    "centerY": 449,
    "radius": 100,
    "discovered": false,
    "observatory": "northern",
    "stars": [
      {
        "id": "dra-0",
        "x": 4473,
        "y": 552,
        "brightness": 0.9929337146311159
      },
      {
        "id": "dra-1",
        "x": 4486,
        "y": 642,
        "brightness": 0.8352062132145452
      },
      {
        "id": "dra-2",
        "x": 4377,
        "y": 628,
        "brightness": 0.9859379035577541
      },
      {
        "id": "dra-3",
        "x": 4384,
        "y": 580,
        "brightness": 0.8025481168572877
      },
      {
        "id": "dra-4",
        "x": 4802,
        "y": 372,
        "brightness": 0.9304158027147511
      },
      {
        "id": "dra-5",
        "x": 4586,
        "y": 311,
        "brightness": 0.8230890355561601
      },
      {
        "id": "dra-6",
        "x": 4287,
        "y": 405,
        "brightness": 0.9070741167370802
      },
      {
        "id": "dra-7",
        "x": 4100,
        "y": 475,
        "brightness": 0.9010971415635695
      },
      {
        "id": "dra-8",
        "x": 4008,
        "y": 524,
        "brightness": 0.9314913514275216
      },
      {
        "id": "dra-9",
        "x": 3854,
        "y": 517,
        "brightness": 0.9340960949424073
      },
      {
        "id": "dra-10",
        "x": 3518,
        "y": 427,
        "brightness": 0.9538228296887146
      },
      {
        "id": "dra-11",
        "x": 3140,
        "y": 337,
        "brightness": 0.9459344090200028
      },
      {
        "id": "dra-12",
        "x": 2881,
        "y": 344,
        "brightness": 0.8117113264041282
      },
      {
        "id": "dra-13",
        "x": 4588,
        "y": 288,
        "brightness": 0.9829825934724616
      },
      {
        "id": "dra-14",
        "x": 4951,
        "y": 329,
        "brightness": 0.8151084324001137
      }
    ],
    "connections": [
      [
        0,
        1
      ],
      [
        1,
        2
      ],
      [
        2,
        3
      ],
      [
        3,
        0
      ],
      [
        0,
        4
      ],
      [
        4,
        5
      ],
      [
        5,
        6
      ],
      [
        6,
        7
      ],
      [
        7,
        8
      ],
      [
        8,
        9
      ],
      [
        9,
        10
      ],
      [
        10,
        11
      ],
      [
        11,
        12
      ],
      [
        5,
        13
      ],
      [
        4,
        14
      ]
    ],
    "set": "ursa"
  },
  {
    "id": "equ",
    "name": "Equuleus",
    "latinName": "Equuleus",
    "description": "The Little Horse - The second-smallest constellation.",
    "centerX": 5306,
    "centerY": 1359,
    "radius": 66,
    "discovered": false,
    "observatory": "northern",
    "stars": [
      {
        "id": "equ-0",
        "x": 5316,
        "y": 1413,
        "brightness": 0.9842508769737538
      },
      {
        "id": "equ-1",
        "x": 5310,
        "y": 1333,
        "brightness": 0.8526742328854678
      },
      {
        "id": "equ-2",
        "x": 5293,
        "y": 1331,
        "brightness": 0.885772400317591
      }
    ],
    "connections": [
      [
        0,
        1
      ],
      [
        1,
        2
      ]
    ],
    "set": "waters"
  },
  {
    "id": "gem",
    "name": "Gemini",
    "latinName": "Gemini",
    "description": "The Twins - A zodiac constellation with bright Castor and Pollux.",
    "centerX": 1762,
    "centerY": 1117,
    "radius": 100,
    "discovered": false,
    "observatory": "northern",
    "stars": [
      {
        "id": "gem-0",
        "x": 1562,
        "y": 1125,
        "brightness": 0.8137539895667106
      },
      {
        "id": "gem-1",
        "x": 1596,
        "y": 1125,
        "brightness": 0.8320782225508746
      },
      {
        "id": "gem-2",
        "x": 1683,
        "y": 1081,
        "brightness": 0.8449116438845717
      },
      {
        "id": "gem-3",
        "x": 1796,
        "y": 996,
        "brightness": 0.8524230963413896
      },
      {
        "id": "gem-4",
        "x": 1894,
        "y": 969,
        "brightness": 0.9306799077367541
      },
      {
        "id": "gem-5",
        "x": 1939,
        "y": 1033,
        "brightness": 0.9212943239055351
      },
      {
        "id": "gem-6",
        "x": 1900,
        "y": 1052,
        "brightness": 0.9337932533924422
      },
      {
        "id": "gem-7",
        "x": 1834,
        "y": 1134,
        "brightness": 0.9720791841041134
      },
      {
        "id": "gem-8",
        "x": 1767,
        "y": 1157,
        "brightness": 0.874679003681686
      },
      {
        "id": "gem-9",
        "x": 1657,
        "y": 1227,
        "brightness": 0.8056647973188308
      },
      {
        "id": "gem-10",
        "x": 1689,
        "y": 1285,
        "brightness": 0.8190888959757494
      },
      {
        "id": "gem-11",
        "x": 1825,
        "y": 1224,
        "brightness": 0.90718870935963
      }
    ],
    "connections": [
      [
        0,
        1
      ],
      [
        1,
        2
      ],
      [
        2,
        3
      ],
      [
        3,
        4
      ],
      [
        4,
        5
      ],
      [
        5,
        6
      ],
      [
        6,
        7
      ],
      [
        7,
        8
      ],
      [
        8,
        9
      ],
      [
        9,
        10
      ],
      [
        7,
        11
      ]
    ],
    "set": "zodiac"
  },
  {
    "id": "her",
    "name": "Hercules",
    "latinName": "Hercules",
    "description": "The Hero - The fifth-largest constellation, containing M13.",
    "centerX": 4252,
    "centerY": 957,
    "radius": 100,
    "discovered": false,
    "observatory": "northern",
    "stars": [
      {
        "id": "her-0",
        "x": 4091,
        "y": 1181,
        "brightness": 0.922918030890558
      },
      {
        "id": "her-1",
        "x": 4126,
        "y": 1142,
        "brightness": 0.949757962699606
      },
      {
        "id": "her-2",
        "x": 4172,
        "y": 973,
        "brightness": 0.9051438762309074
      },
      {
        "id": "her-3",
        "x": 4179,
        "y": 851,
        "brightness": 0.812547959767702
      },
      {
        "id": "her-4",
        "x": 4142,
        "y": 793,
        "brightness": 0.8930169194605309
      },
      {
        "id": "her-5",
        "x": 4082,
        "y": 728,
        "brightness": 0.9718142412344245
      },
      {
        "id": "her-6",
        "x": 4037,
        "y": 751,
        "brightness": 0.953384741156154
      },
      {
        "id": "her-7",
        "x": 3969,
        "y": 792,
        "brightness": 0.8009860354411373
      },
      {
        "id": "her-8",
        "x": 4251,
        "y": 985,
        "brightness": 0.8872547667012995
      },
      {
        "id": "her-9",
        "x": 4313,
        "y": 887,
        "brightness": 0.9516248615264347
      },
      {
        "id": "her-10",
        "x": 4484,
        "y": 879,
        "brightness": 0.9313374744548829
      },
      {
        "id": "her-11",
        "x": 4349,
        "y": 881,
        "brightness": 0.9151492964050284
      },
      {
        "id": "her-12",
        "x": 4313,
        "y": 1086,
        "brightness": 0.883896803356221
      },
      {
        "id": "her-13",
        "x": 4444,
        "y": 1038,
        "brightness": 0.8835240449998751
      },
      {
        "id": "her-14",
        "x": 4491,
        "y": 1013,
        "brightness": 0.8034019879010855
      },
      {
        "id": "her-15",
        "x": 4531,
        "y": 1021,
        "brightness": 0.9930392499233256
      },
      {
        "id": "her-16",
        "x": 4311,
        "y": 1260,
        "brightness": 0.9462608979251946
      }
    ],
    "connections": [
      [
        0,
        1
      ],
      [
        1,
        2
      ],
      [
        2,
        3
      ],
      [
        3,
        4
      ],
      [
        4,
        5
      ],
      [
        5,
        6
      ],
      [
        6,
        7
      ],
      [
        2,
        8
      ],
      [
        3,
        9
      ],
      [
        10,
        11
      ],
      [
        11,
        9
      ],
      [
        9,
        8
      ],
      [
        8,
        12
      ],
      [
        12,
        13
      ],
      [
        13,
        14
      ],
      [
        14,
        15
      ],
      [
        16,
        1
      ]
    ]
  },
  {
    "id": "lac",
    "name": "Lacerta",
    "latinName": "Lacerta",
    "description": "The Lizard - A small constellation between Cygnus and Andromeda.",
    "centerX": 5607,
    "centerY": 739,
    "radius": 100,
    "discovered": false,
    "observatory": "northern",
    "stars": [
      {
        "id": "lac-0",
        "x": 5598,
        "y": 630,
        "brightness": 0.8365025089848012
      },
      {
        "id": "lac-1",
        "x": 5630,
        "y": 662,
        "brightness": 0.834569448318575
      },
      {
        "id": "lac-2",
        "x": 5623,
        "y": 705,
        "brightness": 0.8870338171334105
      },
      {
        "id": "lac-3",
        "x": 5588,
        "y": 724,
        "brightness": 0.8757991010103438
      },
      {
        "id": "lac-4",
        "x": 5627,
        "y": 781,
        "brightness": 0.8091689847009631
      },
      {
        "id": "lac-5",
        "x": 5669,
        "y": 762,
        "brightness": 0.9836852091068291
      },
      {
        "id": "lac-6",
        "x": 5602,
        "y": 675,
        "brightness": 0.9687419772031012
      },
      {
        "id": "lac-7",
        "x": 5558,
        "y": 838,
        "brightness": 0.8065097617720215
      },
      {
        "id": "lac-8",
        "x": 5567,
        "y": 871,
        "brightness": 0.9374944723492988
      }
    ],
    "connections": [
      [
        0,
        1
      ],
      [
        1,
        2
      ],
      [
        2,
        3
      ],
      [
        3,
        4
      ],
      [
        4,
        5
      ],
      [
        5,
        2
      ],
      [
        2,
        6
      ],
      [
        6,
        0
      ],
      [
        4,
        7
      ],
      [
        7,
        8
      ]
    ]
  },
  {
    "id": "leo",
    "name": "Leo",
    "latinName": "Leo",
    "description": "The Lion - A zodiac constellation with bright Regulus.",
    "centerX": 2634,
    "centerY": 1181,
    "radius": 100,
    "discovered": false,
    "observatory": "northern",
    "stars": [
      {
        "id": "leo-0",
        "x": 2535,
        "y": 1301,
        "brightness": 0.8090964992034285
      },
      {
        "id": "leo-1",
        "x": 2531,
        "y": 1221,
        "brightness": 0.9068307300707328
      },
      {
        "id": "leo-2",
        "x": 2583,
        "y": 1169,
        "brightness": 0.821732705981124
      },
      {
        "id": "leo-3",
        "x": 2809,
        "y": 1158,
        "brightness": 0.9363948053880715
      },
      {
        "id": "leo-4",
        "x": 2954,
        "y": 1257,
        "brightness": 0.9682008675440522
      },
      {
        "id": "leo-5",
        "x": 2809,
        "y": 1243,
        "brightness": 0.8517611778156693
      },
      {
        "id": "leo-6",
        "x": 2570,
        "y": 1110,
        "brightness": 0.9264383754873768
      },
      {
        "id": "leo-7",
        "x": 2470,
        "y": 1067,
        "brightness": 0.9293312603177386
      },
      {
        "id": "leo-8",
        "x": 2441,
        "y": 1104,
        "brightness": 0.8843509415158317
      }
    ],
    "connections": [
      [
        0,
        1
      ],
      [
        1,
        2
      ],
      [
        2,
        3
      ],
      [
        3,
        4
      ],
      [
        4,
        5
      ],
      [
        5,
        0
      ],
      [
        2,
        6
      ],
      [
        6,
        7
      ],
      [
        7,
        8
      ]
    ],
    "set": "zodiac"
  },
  {
    "id": "lmi",
    "name": "Leo Minor",
    "latinName": "Leo Minor",
    "description": "The Little Lion - A small constellation between Leo and Ursa Major.",
    "centerX": 2574,
    "centerY": 912,
    "radius": 100,
    "discovered": false,
    "observatory": "northern",
    "stars": [
      {
        "id": "lmi-0",
        "x": 2531,
        "y": 913,
        "brightness": 0.8019669124004651
      },
      {
        "id": "lmi-1",
        "x": 2608,
        "y": 937,
        "brightness": 0.9412151848797383
      },
      {
        "id": "lmi-2",
        "x": 2722,
        "y": 930,
        "brightness": 0.8080856465015132
      },
      {
        "id": "lmi-3",
        "x": 2616,
        "y": 888,
        "brightness": 0.8164938039217599
      },
      {
        "id": "lmi-4",
        "x": 2393,
        "y": 893,
        "brightness": 0.9409908237074786
      }
    ],
    "connections": [
      [
        0,
        1
      ],
      [
        1,
        2
      ],
      [
        2,
        3
      ],
      [
        3,
        0
      ],
      [
        0,
        4
      ]
    ]
  },
  {
    "id": "lyn",
    "name": "Lynx",
    "latinName": "Lynx",
    "description": "The Lynx - A faint constellation requiring keen eyes to see.",
    "centerX": 2028,
    "centerY": 731,
    "radius": 100,
    "discovered": false,
    "observatory": "northern",
    "stars": [
      {
        "id": "lyn-0",
        "x": 1582,
        "y": 516,
        "brightness": 0.883369839401581
      },
      {
        "id": "lyn-1",
        "x": 1739,
        "y": 526,
        "brightness": 0.9381889512413711
      },
      {
        "id": "lyn-2",
        "x": 1861,
        "y": 680,
        "brightness": 0.9532377199067924
      },
      {
        "id": "lyn-3",
        "x": 2095,
        "y": 780,
        "brightness": 0.8498084267840755
      },
      {
        "id": "lyn-4",
        "x": 2253,
        "y": 804,
        "brightness": 0.9604556564552976
      },
      {
        "id": "lyn-5",
        "x": 2329,
        "y": 887,
        "brightness": 0.9112195109023127
      },
      {
        "id": "lyn-6",
        "x": 2338,
        "y": 927,
        "brightness": 0.8140364371071755
      }
    ],
    "connections": [
      [
        0,
        1
      ],
      [
        1,
        2
      ],
      [
        2,
        3
      ],
      [
        3,
        4
      ],
      [
        4,
        5
      ],
      [
        5,
        6
      ]
    ]
  },
  {
    "id": "lyr",
    "name": "Lyra",
    "latinName": "Lyra",
    "description": "The Lyre - Contains Vega, the fifth-brightest star.",
    "centerX": 4701,
    "centerY": 892,
    "radius": 93,
    "discovered": false,
    "observatory": "northern",
    "stars": [
      {
        "id": "lyr-0",
        "x": 4687,
        "y": 873,
        "brightness": 0.8356549144954738
      },
      {
        "id": "lyr-1",
        "x": 4685,
        "y": 840,
        "brightness": 0.9702407991448296
      },
      {
        "id": "lyr-2",
        "x": 4654,
        "y": 854,
        "brightness": 0.9080966014423039
      },
      {
        "id": "lyr-3",
        "x": 4727,
        "y": 885,
        "brightness": 0.8821961969444646
      },
      {
        "id": "lyr-4",
        "x": 4746,
        "y": 955,
        "brightness": 0.9383081133792291
      },
      {
        "id": "lyr-5",
        "x": 4709,
        "y": 944,
        "brightness": 0.8311215369428024
      }
    ],
    "connections": [
      [
        0,
        1
      ],
      [
        1,
        2
      ],
      [
        2,
        0
      ],
      [
        0,
        3
      ],
      [
        3,
        4
      ],
      [
        4,
        5
      ],
      [
        5,
        0
      ]
    ]
  },
  {
    "id": "ori",
    "name": "Orion",
    "latinName": "Orion",
    "description": "The Hunter - The most recognizable constellation in the sky.",
    "centerX": 1359,
    "centerY": 1385,
    "radius": 100,
    "discovered": false,
    "observatory": "northern",
    "stars": [
      {
        "id": "ori-0",
        "x": 1532,
        "y": 1254,
        "brightness": 0.904646799840533
      },
      {
        "id": "ori-1",
        "x": 1477,
        "y": 1162,
        "brightness": 0.9091880226211849
      },
      {
        "id": "ori-2",
        "x": 1516,
        "y": 1164,
        "brightness": 0.9989973427974634
      },
      {
        "id": "ori-3",
        "x": 1550,
        "y": 1263,
        "brightness": 0.8196568057243592
      },
      {
        "id": "ori-4",
        "x": 1510,
        "y": 1339,
        "brightness": 0.9235293118316876
      },
      {
        "id": "ori-5",
        "x": 1480,
        "y": 1377,
        "brightness": 0.8458317975158701
      },
      {
        "id": "ori-6",
        "x": 1355,
        "y": 1394,
        "brightness": 0.9635645328922935
      },
      {
        "id": "ori-7",
        "x": 1229,
        "y": 1331,
        "brightness": 0.9063113244875118
      },
      {
        "id": "ori-8",
        "x": 1244,
        "y": 1471,
        "brightness": 0.9914544912666516
      },
      {
        "id": "ori-9",
        "x": 1226,
        "y": 1459,
        "brightness": 0.9304562742654133
      },
      {
        "id": "ori-10",
        "x": 1213,
        "y": 1407,
        "brightness": 0.9556642842779295
      },
      {
        "id": "ori-11",
        "x": 1208,
        "y": 1384,
        "brightness": 0.8987067524504406
      },
      {
        "id": "ori-12",
        "x": 1211,
        "y": 1352,
        "brightness": 0.9023114925038728
      },
      {
        "id": "ori-13",
        "x": 1235,
        "y": 1275,
        "brightness": 0.9432435755574186
      },
      {
        "id": "ori-14",
        "x": 1269,
        "y": 1243,
        "brightness": 0.9490376374053637
      },
      {
        "id": "ori-15",
        "x": 1290,
        "y": 1240,
        "brightness": 0.8052165298436887
      },
      {
        "id": "ori-16",
        "x": 1311,
        "y": 1637,
        "brightness": 0.9358398756901107
      },
      {
        "id": "ori-17",
        "x": 1352,
        "y": 1540,
        "brightness": 0.911377912713316
      },
      {
        "id": "ori-18",
        "x": 1383,
        "y": 1505,
        "brightness": 0.8240795292658448
      },
      {
        "id": "ori-19",
        "x": 1396,
        "y": 1334,
        "brightness": 0.8314171213190171
      },
      {
        "id": "ori-20",
        "x": 1420,
        "y": 1532,
        "brightness": 0.9137682665817501
      },
      {
        "id": "ori-21",
        "x": 1449,
        "y": 1661,
        "brightness": 0.9973256324813933
      },
      {
        "id": "ori-22",
        "x": 1401,
        "y": 1520,
        "brightness": 0.9396674462203674
      }
    ],
    "connections": [
      [
        0,
        1
      ],
      [
        1,
        2
      ],
      [
        2,
        3
      ],
      [
        3,
        4
      ],
      [
        4,
        5
      ],
      [
        5,
        6
      ],
      [
        6,
        7
      ],
      [
        8,
        9
      ],
      [
        9,
        10
      ],
      [
        10,
        11
      ],
      [
        11,
        12
      ],
      [
        12,
        7
      ],
      [
        7,
        13
      ],
      [
        13,
        14
      ],
      [
        14,
        15
      ],
      [
        16,
        17
      ],
      [
        17,
        18
      ],
      [
        18,
        6
      ],
      [
        6,
        19
      ],
      [
        19,
        5
      ],
      [
        5,
        20
      ],
      [
        20,
        21
      ],
      [
        20,
        22
      ],
      [
        22,
        18
      ]
    ],
    "set": "orion"
  },
  {
    "id": "peg",
    "name": "Pegasus",
    "latinName": "Pegasus",
    "description": "The Winged Horse - Famous for its Great Square asterism.",
    "centerX": 5683,
    "centerY": 1156,
    "radius": 100,
    "discovered": false,
    "observatory": "northern",
    "stars": [
      {
        "id": "peg-0",
        "x": -458,
        "y": 947,
        "brightness": 0.8050447155138003
      },
      {
        "id": "peg-1",
        "x": -321,
        "y": 996,
        "brightness": 0.8030629233099448
      },
      {
        "id": "peg-2",
        "x": -234,
        "y": 1032,
        "brightness": 0.9950327993460771
      },
      {
        "id": "peg-3",
        "x": 35,
        "y": 1015,
        "brightness": 0.9391954401520762
      },
      {
        "id": "peg-4",
        "x": 55,
        "y": 1247,
        "brightness": 0.8400720774634325
      },
      {
        "id": "peg-5",
        "x": -230,
        "y": 1247,
        "brightness": 0.9696230606674061
      },
      {
        "id": "peg-6",
        "x": -305,
        "y": 1297,
        "brightness": 0.9798393872783847
      },
      {
        "id": "peg-7",
        "x": -327,
        "y": 1319,
        "brightness": 0.8461654150032246
      },
      {
        "id": "peg-8",
        "x": -458,
        "y": 1397,
        "brightness": 0.8208254563147799
      },
      {
        "id": "peg-9",
        "x": -566,
        "y": 1335,
        "brightness": 0.9561830657885434
      },
      {
        "id": "peg-10",
        "x": -292,
        "y": 1090,
        "brightness": 0.9208227144075812
      },
      {
        "id": "peg-11",
        "x": -306,
        "y": 1107,
        "brightness": 0.979922812704524
      },
      {
        "id": "peg-12",
        "x": -471,
        "y": 1078,
        "brightness": 0.8563713536921225
      },
      {
        "id": "peg-13",
        "x": -564,
        "y": 1073,
        "brightness": 0.982576733252823
      }
    ],
    "connections": [
      [
        0,
        1
      ],
      [
        1,
        2
      ],
      [
        2,
        3
      ],
      [
        3,
        4
      ],
      [
        4,
        5
      ],
      [
        5,
        6
      ],
      [
        6,
        7
      ],
      [
        7,
        8
      ],
      [
        8,
        9
      ],
      [
        5,
        2
      ],
      [
        2,
        10
      ],
      [
        10,
        11
      ],
      [
        11,
        12
      ],
      [
        12,
        13
      ]
    ],
    "set": "royal"
  },
  {
    "id": "per",
    "name": "Perseus",
    "latinName": "Perseus",
    "description": "The Hero - Contains the famous variable star Algol.",
    "centerX": 843,
    "centerY": 753,
    "radius": 100,
    "discovered": false,
    "observatory": "northern",
    "stars": [
      {
        "id": "per-0",
        "x": 935,
        "y": 962,
        "brightness": 0.8877378459687407
      },
      {
        "id": "per-1",
        "x": 976,
        "y": 969,
        "brightness": 0.9703209187072045
      },
      {
        "id": "per-2",
        "x": 996,
        "y": 903,
        "brightness": 0.8805163102595949
      },
      {
        "id": "per-3",
        "x": 991,
        "y": 833,
        "brightness": 0.9033567930467652
      },
      {
        "id": "per-4",
        "x": 938,
        "y": 790,
        "brightness": 0.8603793449395984
      },
      {
        "id": "per-5",
        "x": 929,
        "y": 704,
        "brightness": 0.8755325060997159
      },
      {
        "id": "per-6",
        "x": 902,
        "y": 697,
        "brightness": 0.9256425099707398
      },
      {
        "id": "per-7",
        "x": 851,
        "y": 669,
        "brightness": 0.8396059666553728
      },
      {
        "id": "per-8",
        "x": 770,
        "y": 608,
        "brightness": 0.9243011061942741
      },
      {
        "id": "per-9",
        "x": 711,
        "y": 568,
        "brightness": 0.9104960249640448
      },
      {
        "id": "per-10",
        "x": 726,
        "y": 621,
        "brightness": 0.8582791310913493
      },
      {
        "id": "per-11",
        "x": 788,
        "y": 673,
        "brightness": 0.9324945807310577
      },
      {
        "id": "per-12",
        "x": 790,
        "y": 752,
        "brightness": 0.8593794368944553
      },
      {
        "id": "per-13",
        "x": 784,
        "y": 817,
        "brightness": 0.8266539645903908
      },
      {
        "id": "per-14",
        "x": 797,
        "y": 840,
        "brightness": 0.8985374208506975
      },
      {
        "id": "per-15",
        "x": 772,
        "y": 853,
        "brightness": 0.9970456690247861
      },
      {
        "id": "per-16",
        "x": 745,
        "y": 839,
        "brightness": 0.8878252616499777
      },
      {
        "id": "per-17",
        "x": 749,
        "y": 816,
        "brightness": 0.9659749361426693
      },
      {
        "id": "per-18",
        "x": 1027,
        "y": 661,
        "brightness": 0.8051257990225796
      },
      {
        "id": "per-19",
        "x": 1062,
        "y": 693,
        "brightness": 0.9107005751864264
      },
      {
        "id": "per-20",
        "x": 1036,
        "y": 705,
        "brightness": 0.9202011681726855
      },
      {
        "id": "per-21",
        "x": 684,
        "y": 680,
        "brightness": 0.8046992703889432
      },
      {
        "id": "per-22",
        "x": 432,
        "y": 655,
        "brightness": 0.9783149120842973
      }
    ],
    "connections": [
      [
        0,
        1
      ],
      [
        1,
        2
      ],
      [
        2,
        3
      ],
      [
        3,
        4
      ],
      [
        4,
        5
      ],
      [
        5,
        6
      ],
      [
        6,
        7
      ],
      [
        7,
        8
      ],
      [
        8,
        9
      ],
      [
        9,
        10
      ],
      [
        10,
        11
      ],
      [
        11,
        12
      ],
      [
        12,
        13
      ],
      [
        13,
        14
      ],
      [
        14,
        15
      ],
      [
        15,
        16
      ],
      [
        16,
        17
      ],
      [
        17,
        13
      ],
      [
        18,
        19
      ],
      [
        19,
        20
      ],
      [
        20,
        5
      ],
      [
        11,
        21
      ],
      [
        21,
        22
      ]
    ],
    "set": "royal"
  },
  {
    "id": "psc",
    "name": "Pisces",
    "latinName": "Pisces",
    "description": "The Fishes - A zodiac constellation with the spring equinox point.",
    "centerX": 161,
    "centerY": 1344,
    "radius": 100,
    "discovered": false,
    "observatory": "northern",
    "stars": [
      {
        "id": "psc-0",
        "x": 307,
        "y": 1090,
        "brightness": 0.8116502565131215
      },
      {
        "id": "psc-1",
        "x": 299,
        "y": 999,
        "brightness": 0.9505914583279129
      },
      {
        "id": "psc-2",
        "x": 331,
        "y": 1046,
        "brightness": 0.9040686677014191
      },
      {
        "id": "psc-3",
        "x": 298,
        "y": 1149,
        "brightness": 0.8391660998055941
      },
      {
        "id": "psc-4",
        "x": 381,
        "y": 1244,
        "brightness": 0.9066911899601847
      },
      {
        "id": "psc-5",
        "x": 439,
        "y": 1347,
        "brightness": 0.84043256384245
      },
      {
        "id": "psc-6",
        "x": 509,
        "y": 1454,
        "brightness": 0.8742848322766322
      },
      {
        "id": "psc-7",
        "x": 473,
        "y": 1447,
        "brightness": 0.8516590355557264
      },
      {
        "id": "psc-8",
        "x": 423,
        "y": 1409,
        "brightness": 0.8131456382987123
      },
      {
        "id": "psc-9",
        "x": 376,
        "y": 1398,
        "brightness": 0.867487939386208
      },
      {
        "id": "psc-10",
        "x": 307,
        "y": 1374,
        "brightness": 0.8432939908825346
      },
      {
        "id": "psc-11",
        "x": 262,
        "y": 1368,
        "brightness": 0.8518134525500852
      },
      {
        "id": "psc-12",
        "x": 203,
        "y": 1374,
        "brightness": 0.8885784895840335
      },
      {
        "id": "psc-13",
        "x": -3,
        "y": 1386,
        "brightness": 0.9400418683137564
      },
      {
        "id": "psc-14",
        "x": -84,
        "y": 1406,
        "brightness": 0.8473524468846513
      },
      {
        "id": "psc-15",
        "x": -133,
        "y": 1394,
        "brightness": 0.8320908282397148
      },
      {
        "id": "psc-16",
        "x": -165,
        "y": 1410,
        "brightness": 0.9447054953338444
      },
      {
        "id": "psc-17",
        "x": -178,
        "y": 1445,
        "brightness": 0.9972939006935937
      },
      {
        "id": "psc-18",
        "x": -138,
        "y": 1479,
        "brightness": 0.9323032034839318
      },
      {
        "id": "psc-19",
        "x": -75,
        "y": 1470,
        "brightness": 0.9546501528197082
      },
      {
        "id": "psc-20",
        "x": -57,
        "y": 1442,
        "brightness": 0.9332684416363568
      },
      {
        "id": "psc-21",
        "x": -234,
        "y": 1436,
        "brightness": 0.8431775247398605
      }
    ],
    "connections": [
      [
        0,
        1
      ],
      [
        1,
        2
      ],
      [
        2,
        0
      ],
      [
        0,
        3
      ],
      [
        3,
        4
      ],
      [
        4,
        5
      ],
      [
        5,
        6
      ],
      [
        6,
        7
      ],
      [
        7,
        8
      ],
      [
        8,
        9
      ],
      [
        9,
        10
      ],
      [
        10,
        11
      ],
      [
        11,
        12
      ],
      [
        12,
        13
      ],
      [
        13,
        14
      ],
      [
        14,
        15
      ],
      [
        15,
        16
      ],
      [
        16,
        17
      ],
      [
        17,
        18
      ],
      [
        18,
        19
      ],
      [
        19,
        20
      ],
      [
        20,
        14
      ],
      [
        17,
        21
      ]
    ],
    "set": "zodiac"
  },
  {
    "id": "sge",
    "name": "Sagitta",
    "latinName": "Sagitta",
    "description": "The Arrow - The third-smallest constellation.",
    "centerX": 4945,
    "centerY": 1194,
    "radius": 64,
    "discovered": false,
    "observatory": "northern",
    "stars": [
      {
        "id": "sge-0",
        "x": 4917,
        "y": 1200,
        "brightness": 0.8521605536842954
      },
      {
        "id": "sge-1",
        "x": 4947,
        "y": 1191,
        "brightness": 0.8910624182531965
      },
      {
        "id": "sge-2",
        "x": 4995,
        "y": 1175,
        "brightness": 0.8017481555571638
      },
      {
        "id": "sge-3",
        "x": 4921,
        "y": 1209,
        "brightness": 0.9449399644506281
      }
    ],
    "connections": [
      [
        0,
        1
      ],
      [
        1,
        2
      ],
      [
        3,
        1
      ]
    ]
  },
  {
    "id": "ser",
    "name": "Serpens",
    "latinName": "Serpens",
    "description": "The Serpent - The only constellation split into two parts.",
    "centerX": 3957,
    "centerY": 1320,
    "radius": 100,
    "discovered": false,
    "observatory": "northern",
    "stars": [
      {
        "id": "ser-0",
        "x": 3942,
        "y": 1243,
        "brightness": 0.8072298422645828
      },
      {
        "id": "ser-1",
        "x": 3923,
        "y": 1172,
        "brightness": 0.909429287864517
      },
      {
        "id": "ser-2",
        "x": 3953,
        "y": 1198,
        "brightness": 0.9498075704983726
      },
      {
        "id": "ser-3",
        "x": 3985,
        "y": 1239,
        "brightness": 0.8960676078152137
      },
      {
        "id": "ser-4",
        "x": 3895,
        "y": 1324,
        "brightness": 0.8817278788187468
      },
      {
        "id": "ser-5",
        "x": 3934,
        "y": 1393,
        "brightness": 0.8887623200878702
      },
      {
        "id": "ser-6",
        "x": 3962,
        "y": 1425,
        "brightness": 0.9190650709773713
      },
      {
        "id": "ser-7",
        "x": 4060,
        "y": 1562,
        "brightness": 0.9222344039856168
      }
    ],
    "connections": [
      [
        0,
        1
      ],
      [
        1,
        2
      ],
      [
        2,
        3
      ],
      [
        3,
        0
      ],
      [
        0,
        4
      ],
      [
        4,
        5
      ],
      [
        5,
        6
      ],
      [
        6,
        7
      ]
    ]
  },
  {
    "id": "tau",
    "name": "Taurus",
    "latinName": "Taurus",
    "description": "The Bull - A zodiac constellation with the Pleiades and Hyades.",
    "centerX": 1081,
    "centerY": 1261,
    "radius": 100,
    "discovered": false,
    "observatory": "northern",
    "stars": [
      {
        "id": "tau-0",
        "x": 1407,
        "y": 1148,
        "brightness": 0.8662151049398551
      },
      {
        "id": "tau-1",
        "x": 1150,
        "y": 1225,
        "brightness": 0.8256446983358255
      },
      {
        "id": "tau-2",
        "x": 1119,
        "y": 1235,
        "brightness": 0.8998206507361886
      },
      {
        "id": "tau-3",
        "x": 1082,
        "y": 1240,
        "brightness": 0.9515141375504628
      },
      {
        "id": "tau-4",
        "x": 1096,
        "y": 1208,
        "brightness": 0.9605906995383388
      },
      {
        "id": "tau-5",
        "x": 1119,
        "y": 1180,
        "brightness": 0.8677582806082472
      },
      {
        "id": "tau-6",
        "x": 1360,
        "y": 1023,
        "brightness": 0.88569267457151
      },
      {
        "id": "tau-7",
        "x": 1003,
        "y": 1292,
        "brightness": 0.8365503204409322
      },
      {
        "id": "tau-8",
        "x": 863,
        "y": 1338,
        "brightness": 0.9700656889021327
      },
      {
        "id": "tau-9",
        "x": 1013,
        "y": 1400,
        "brightness": 0.836824288549485
      },
      {
        "id": "tau-10",
        "x": 853,
        "y": 1350,
        "brightness": 0.9316822777023632
      },
      {
        "id": "tau-11",
        "x": 904,
        "y": 1493,
        "brightness": 0.8397513615320403
      }
    ],
    "connections": [
      [
        0,
        1
      ],
      [
        1,
        2
      ],
      [
        2,
        3
      ],
      [
        3,
        4
      ],
      [
        4,
        5
      ],
      [
        5,
        6
      ],
      [
        3,
        7
      ],
      [
        7,
        8
      ],
      [
        8,
        9
      ],
      [
        8,
        10
      ],
      [
        10,
        11
      ]
    ],
    "set": "zodiac"
  },
  {
    "id": "tri",
    "name": "Triangulum",
    "latinName": "Triangulum",
    "description": "The Triangle - A small northern constellation.",
    "centerX": 528,
    "centerY": 953,
    "radius": 94,
    "discovered": false,
    "observatory": "northern",
    "stars": [
      {
        "id": "tri-0",
        "x": 471,
        "y": 1007,
        "brightness": 0.9572863218939716
      },
      {
        "id": "tri-1",
        "x": 540,
        "y": 917,
        "brightness": 0.8846715685801385
      },
      {
        "id": "tri-2",
        "x": 572,
        "y": 936,
        "brightness": 0.8284206936366535
      }
    ],
    "connections": [
      [
        0,
        1
      ],
      [
        1,
        2
      ],
      [
        2,
        0
      ]
    ]
  },
  {
    "id": "uma",
    "name": "Ursa Major",
    "latinName": "Ursa Major",
    "description": "The Great Bear - Contains the famous Big Dipper asterism.",
    "centerX": 2723,
    "centerY": 655,
    "radius": 100,
    "discovered": false,
    "observatory": "northern",
    "stars": [
      {
        "id": "uma-0",
        "x": 3064,
        "y": 549,
        "brightness": 0.9786356373706543
      },
      {
        "id": "uma-1",
        "x": 2766,
        "y": 471,
        "brightness": 0.9336449655932556
      },
      {
        "id": "uma-2",
        "x": 2758,
        "y": 560,
        "brightness": 0.8420305823118279
      },
      {
        "id": "uma-3",
        "x": 2974,
        "y": 605,
        "brightness": 0.9180157904852739
      },
      {
        "id": "uma-4",
        "x": 3225,
        "y": 567,
        "brightness": 0.9000574967081229
      },
      {
        "id": "uma-5",
        "x": 3350,
        "y": 585,
        "brightness": 0.9305899968716004
      },
      {
        "id": "uma-6",
        "x": 3448,
        "y": 678,
        "brightness": 0.9927739183733356
      },
      {
        "id": "uma-7",
        "x": 2942,
        "y": 704,
        "brightness": 0.9631990235260188
      },
      {
        "id": "uma-8",
        "x": 2827,
        "y": 948,
        "brightness": 0.9498761069425334
      },
      {
        "id": "uma-9",
        "x": 2826,
        "y": 974,
        "brightness": 0.9595097801736119
      },
      {
        "id": "uma-10",
        "x": 2790,
        "y": 758,
        "brightness": 0.9993258583434056
      },
      {
        "id": "uma-11",
        "x": 2593,
        "y": 808,
        "brightness": 0.8347958822837276
      },
      {
        "id": "uma-12",
        "x": 2571,
        "y": 785,
        "brightness": 0.9213031348880275
      },
      {
        "id": "uma-13",
        "x": 2381,
        "y": 449,
        "brightness": 0.9497252066038842
      },
      {
        "id": "uma-14",
        "x": 2126,
        "y": 488,
        "brightness": 0.9754339441093167
      },
      {
        "id": "uma-15",
        "x": 2462,
        "y": 516,
        "brightness": 0.9415522197984032
      },
      {
        "id": "uma-16",
        "x": 2467,
        "y": 599,
        "brightness": 0.9895709862993809
      },
      {
        "id": "uma-17",
        "x": 2387,
        "y": 639,
        "brightness": 0.8697719843456712
      },
      {
        "id": "uma-18",
        "x": 2247,
        "y": 699,
        "brightness": 0.9848419114817674
      },
      {
        "id": "uma-19",
        "x": 2265,
        "y": 714,
        "brightness": 0.9508129357512837
      }
    ],
    "connections": [
      [
        0,
        1
      ],
      [
        1,
        2
      ],
      [
        2,
        3
      ],
      [
        3,
        0
      ],
      [
        0,
        4
      ],
      [
        4,
        5
      ],
      [
        5,
        6
      ],
      [
        3,
        7
      ],
      [
        7,
        8
      ],
      [
        8,
        9
      ],
      [
        7,
        10
      ],
      [
        10,
        11
      ],
      [
        10,
        12
      ],
      [
        1,
        13
      ],
      [
        13,
        14
      ],
      [
        14,
        15
      ],
      [
        15,
        2
      ],
      [
        2,
        16
      ],
      [
        16,
        17
      ],
      [
        17,
        18
      ],
      [
        19,
        17
      ]
    ],
    "set": "ursa"
  },
  {
    "id": "umi",
    "name": "Ursa Minor",
    "latinName": "Ursa Minor",
    "description": "The Little Bear - Contains Polaris, the North Star.",
    "centerX": 4395,
    "centerY": 173,
    "radius": 100,
    "discovered": false,
    "observatory": "northern",
    "stars": [
      {
        "id": "umi-0",
        "x": -2066,
        "y": 203,
        "brightness": 0.9285760413273649
      },
      {
        "id": "umi-1",
        "x": -1927,
        "y": 237,
        "brightness": 0.9780159124299705
      },
      {
        "id": "umi-2",
        "x": -2164,
        "y": 303,
        "brightness": 0.9113549336999769
      },
      {
        "id": "umi-3",
        "x": -2289,
        "y": 264,
        "brightness": 0.8437530535538073
      },
      {
        "id": "umi-4",
        "x": -1808,
        "y": 133,
        "brightness": 0.8972891110859377
      },
      {
        "id": "umi-5",
        "x": -1616,
        "y": 57,
        "brightness": 0.9329129835256954
      },
      {
        "id": "umi-6",
        "x": 633,
        "y": 12,
        "brightness": 0.8263902618524108
      }
    ],
    "connections": [
      [
        0,
        1
      ],
      [
        1,
        2
      ],
      [
        2,
        3
      ],
      [
        3,
        0
      ],
      [
        0,
        4
      ],
      [
        4,
        5
      ],
      [
        5,
        6
      ]
    ],
    "set": "ursa"
  },
  {
    "id": "vul",
    "name": "Vulpecula",
    "latinName": "Vulpecula",
    "description": "The Fox - A faint northern constellation.",
    "centerX": 4946,
    "centerY": 1081,
    "radius": 100,
    "discovered": false,
    "observatory": "northern",
    "stars": [
      {
        "id": "vul-0",
        "x": 4818,
        "y": 1143,
        "brightness": 0.9816357722696114
      },
      {
        "id": "vul-1",
        "x": 4870,
        "y": 1089,
        "brightness": 0.8531573427968083
      },
      {
        "id": "vul-2",
        "x": 4973,
        "y": 1099,
        "brightness": 0.8181322364277801
      },
      {
        "id": "vul-3",
        "x": 5005,
        "y": 1037,
        "brightness": 0.8542894494803024
      },
      {
        "id": "vul-4",
        "x": 5066,
        "y": 1036,
        "brightness": 0.8593183232368922
      }
    ],
    "connections": [
      [
        0,
        1
      ],
      [
        1,
        2
      ],
      [
        2,
        3
      ],
      [
        3,
        4
      ]
    ]
  },
  {
    "id": "ant",
    "name": "Antlia",
    "latinName": "Antlia",
    "description": "The Air Pump - A faint southern constellation representing a vacuum pump.",
    "centerX": 2574,
    "centerY": 2079,
    "radius": 100,
    "discovered": false,
    "observatory": "southern",
    "stars": [
      {
        "id": "ant-0",
        "x": 2372,
        "y": 2099,
        "brightness": 0.9311171574669322
      },
      {
        "id": "ant-1",
        "x": 2613,
        "y": 2018,
        "brightness": 0.9037913335869069
      },
      {
        "id": "ant-2",
        "x": 2736,
        "y": 2119,
        "brightness": 0.9994483843075656
      }
    ],
    "connections": [
      [
        0,
        1
      ],
      [
        1,
        2
      ]
    ],
    "set": "instruments"
  },
  {
    "id": "aps",
    "name": "Apus",
    "latinName": "Apus",
    "description": "The Bird of Paradise - A southern constellation near the celestial pole.",
    "centerX": 4026,
    "centerY": 2809,
    "radius": 100,
    "discovered": false,
    "observatory": "southern",
    "stars": [
      {
        "id": "aps-0",
        "x": 3699,
        "y": 2817,
        "brightness": 0.9204020027230465
      },
      {
        "id": "aps-1",
        "x": 4085,
        "y": 2812,
        "brightness": 0.8066017073391205
      },
      {
        "id": "aps-2",
        "x": 4179,
        "y": 2792,
        "brightness": 0.9219459455538215
      },
      {
        "id": "aps-3",
        "x": 4139,
        "y": 2815,
        "brightness": 0.8957456390374968
      }
    ],
    "connections": [
      [
        0,
        1
      ],
      [
        1,
        2
      ],
      [
        2,
        3
      ]
    ],
    "set": "birds"
  },
  {
    "id": "aqr",
    "name": "Aquarius",
    "latinName": "Aquarius",
    "description": "The Water Bearer - A zodiac constellation associated with water.",
    "centerX": 5599,
    "centerY": 1636,
    "radius": 100,
    "discovered": false,
    "observatory": "southern",
    "stars": [
      {
        "id": "aqr-0",
        "x": 5199,
        "y": 1658,
        "brightness": 0.9388970708562452
      },
      {
        "id": "aqr-1",
        "x": 5219,
        "y": 1650,
        "brightness": 0.907918032042788
      },
      {
        "id": "aqr-2",
        "x": 5381,
        "y": 1593,
        "brightness": 0.8969502711187839
      },
      {
        "id": "aqr-3",
        "x": 5524,
        "y": 1505,
        "brightness": 0.9824144265667699
      },
      {
        "id": "aqr-4",
        "x": 5590,
        "y": 1523,
        "brightness": 0.9182925523484914
      },
      {
        "id": "aqr-5",
        "x": 5620,
        "y": 1500,
        "brightness": 0.988788710866792
      },
      {
        "id": "aqr-6",
        "x": 5647,
        "y": 1502,
        "brightness": 0.9187292596808825
      },
      {
        "id": "aqr-7",
        "x": 5719,
        "y": 1626,
        "brightness": 0.9763970725294512
      },
      {
        "id": "aqr-8",
        "x": 5825,
        "y": 1653,
        "brightness": 0.8718813923367816
      },
      {
        "id": "aqr-9",
        "x": 5789,
        "y": 1853,
        "brightness": 0.8308230276299959
      },
      {
        "id": "aqr-10",
        "x": 5527,
        "y": 1731,
        "brightness": 0.9855256645064241
      },
      {
        "id": "aqr-11",
        "x": 5570,
        "y": 1630,
        "brightness": 0.8381320384531101
      },
      {
        "id": "aqr-12",
        "x": 5605,
        "y": 1477,
        "brightness": 0.9070001538893653
      },
      {
        "id": "aqr-13",
        "x": 5846,
        "y": 1835,
        "brightness": 0.8949516296792757
      },
      {
        "id": "aqr-14",
        "x": 5924,
        "y": 1797,
        "brightness": 0.9218866084411889
      }
    ],
    "connections": [
      [
        0,
        1
      ],
      [
        1,
        2
      ],
      [
        2,
        3
      ],
      [
        3,
        4
      ],
      [
        4,
        5
      ],
      [
        5,
        6
      ],
      [
        6,
        7
      ],
      [
        7,
        8
      ],
      [
        8,
        9
      ],
      [
        2,
        10
      ],
      [
        3,
        11
      ],
      [
        5,
        12
      ],
      [
        13,
        8
      ],
      [
        8,
        14
      ]
    ],
    "set": "zodiac"
  },
  {
    "id": "ara",
    "name": "Ara",
    "latinName": "Ara",
    "description": "The Altar - A southern constellation representing a ceremonial altar.",
    "centerX": 4310,
    "centerY": 2430,
    "radius": 100,
    "discovered": false,
    "observatory": "southern",
    "stars": [
      {
        "id": "ara-0",
        "x": 4356,
        "y": 2440,
        "brightness": 0.9782156529003548
      },
      {
        "id": "ara-1",
        "x": 4380,
        "y": 2511,
        "brightness": 0.8356714403788633
      },
      {
        "id": "ara-2",
        "x": 4207,
        "y": 2484,
        "brightness": 0.8705490013956221
      },
      {
        "id": "ara-3",
        "x": 4244,
        "y": 2433,
        "brightness": 0.9634809861591372
      },
      {
        "id": "ara-4",
        "x": 4248,
        "y": 2386,
        "brightness": 0.9705563521927922
      },
      {
        "id": "ara-5",
        "x": 4383,
        "y": 2331,
        "brightness": 0.8962674401824309
      },
      {
        "id": "ara-6",
        "x": 4355,
        "y": 2425,
        "brightness": 0.9281571646637415
      }
    ],
    "connections": [
      [
        0,
        1
      ],
      [
        1,
        2
      ],
      [
        2,
        3
      ],
      [
        3,
        4
      ],
      [
        4,
        5
      ],
      [
        5,
        6
      ]
    ],
    "set": "centaur"
  },
  {
    "id": "cae",
    "name": "Caelum",
    "latinName": "Caelum",
    "description": "The Chisel - One of the faintest constellations in the sky.",
    "centerX": 1185,
    "centerY": 2164,
    "radius": 100,
    "discovered": false,
    "observatory": "southern",
    "stars": [
      {
        "id": "cae-0",
        "x": 1128,
        "y": 2249,
        "brightness": 0.8609509960922431
      },
      {
        "id": "cae-1",
        "x": 1169,
        "y": 2198,
        "brightness": 0.8447228165377355
      },
      {
        "id": "cae-2",
        "x": 1175,
        "y": 2119,
        "brightness": 0.972493431654848
      },
      {
        "id": "cae-3",
        "x": 1268,
        "y": 2091,
        "brightness": 0.9679003740997714
      }
    ],
    "connections": [
      [
        0,
        1
      ],
      [
        1,
        2
      ],
      [
        2,
        3
      ]
    ],
    "set": "instruments"
  },
  {
    "id": "cma",
    "name": "Canis Major",
    "latinName": "Canis Major",
    "description": "The Great Dog - Contains Sirius, the brightest star in the night sky.",
    "centerX": 1727,
    "centerY": 1873,
    "radius": 100,
    "discovered": false,
    "observatory": "southern",
    "stars": [
      {
        "id": "cma-0",
        "x": 1595,
        "y": 1799,
        "brightness": 0.9560949438026355
      },
      {
        "id": "cma-1",
        "x": 1688,
        "y": 1779,
        "brightness": 0.9062878489845538
      },
      {
        "id": "cma-2",
        "x": 1763,
        "y": 1897,
        "brightness": 0.8440813411457039
      },
      {
        "id": "cma-3",
        "x": 1785,
        "y": 1940,
        "brightness": 0.9639271612324523
      },
      {
        "id": "cma-4",
        "x": 1757,
        "y": 1966,
        "brightness": 0.9099243554576216
      },
      {
        "id": "cma-5",
        "x": 1744,
        "y": 1983,
        "brightness": 0.8504771555488673
      },
      {
        "id": "cma-6",
        "x": 1585,
        "y": 2001,
        "brightness": 0.9687050111924971
      },
      {
        "id": "cma-7",
        "x": 1850,
        "y": 1988,
        "brightness": 0.8668078176664555
      },
      {
        "id": "cma-8",
        "x": 1734,
        "y": 1784,
        "brightness": 0.9074694688886303
      },
      {
        "id": "cma-9",
        "x": 1766,
        "y": 1761,
        "brightness": 0.9420612658183847
      },
      {
        "id": "cma-10",
        "x": 1726,
        "y": 1701,
        "brightness": 0.8844418619969598
      }
    ],
    "connections": [
      [
        0,
        1
      ],
      [
        1,
        2
      ],
      [
        2,
        3
      ],
      [
        3,
        4
      ],
      [
        4,
        5
      ],
      [
        5,
        6
      ],
      [
        7,
        3
      ],
      [
        1,
        8
      ],
      [
        8,
        9
      ],
      [
        9,
        10
      ],
      [
        10,
        8
      ]
    ],
    "set": "orion"
  },
  {
    "id": "cap",
    "name": "Capricornus",
    "latinName": "Capricornus",
    "description": "The Sea Goat - An ancient zodiac constellation.",
    "centerX": 5253,
    "centerY": 1811,
    "radius": 100,
    "discovered": false,
    "observatory": "southern",
    "stars": [
      {
        "id": "cap-0",
        "x": 5074,
        "y": 1708,
        "brightness": 0.918318027061323
      },
      {
        "id": "cap-1",
        "x": 5088,
        "y": 1746,
        "brightness": 0.9271969228608663
      },
      {
        "id": "cap-2",
        "x": 5120,
        "y": 1797,
        "brightness": 0.8566238549977294
      },
      {
        "id": "cap-3",
        "x": 5192,
        "y": 1921,
        "brightness": 0.9051161073729076
      },
      {
        "id": "cap-4",
        "x": 5216,
        "y": 1949,
        "brightness": 0.9252833148616013
      },
      {
        "id": "cap-5",
        "x": 5361,
        "y": 1874,
        "brightness": 0.9459648630142948
      },
      {
        "id": "cap-6",
        "x": 5446,
        "y": 1769,
        "brightness": 0.8966186470493547
      },
      {
        "id": "cap-7",
        "x": 5417,
        "y": 1778,
        "brightness": 0.9614893617977183
      },
      {
        "id": "cap-8",
        "x": 5343,
        "y": 1781,
        "brightness": 0.9274357521466446
      },
      {
        "id": "cap-9",
        "x": 5275,
        "y": 1787,
        "brightness": 0.9183776042090379
      }
    ],
    "connections": [
      [
        0,
        1
      ],
      [
        1,
        2
      ],
      [
        2,
        3
      ],
      [
        3,
        4
      ],
      [
        4,
        5
      ],
      [
        5,
        6
      ],
      [
        6,
        7
      ],
      [
        7,
        8
      ],
      [
        8,
        9
      ],
      [
        9,
        0
      ]
    ],
    "set": "zodiac"
  },
  {
    "id": "car",
    "name": "Carina",
    "latinName": "Carina",
    "description": "The Keel - Part of the ancient ship Argo Navis, contains Canopus.",
    "centerX": 2383,
    "centerY": 2480,
    "radius": 100,
    "discovered": false,
    "observatory": "southern",
    "stars": [
      {
        "id": "car-0",
        "x": 1657,
        "y": 2220,
        "brightness": 0.8562365630759688
      },
      {
        "id": "car-1",
        "x": 1600,
        "y": 2378,
        "brightness": 0.9702415098521188
      },
      {
        "id": "car-2",
        "x": 2305,
        "y": 2662,
        "brightness": 0.9795787597954736
      },
      {
        "id": "car-3",
        "x": 2557,
        "y": 2667,
        "brightness": 0.9477960912931426
      },
      {
        "id": "car-4",
        "x": 2679,
        "y": 2573,
        "brightness": 0.9976681983885547
      },
      {
        "id": "car-5",
        "x": 2633,
        "y": 2528,
        "brightness": 0.8430458552668444
      },
      {
        "id": "car-6",
        "x": 2571,
        "y": 2522,
        "brightness": 0.8012508220944046
      },
      {
        "id": "car-7",
        "x": 2321,
        "y": 2488,
        "brightness": 0.9629043036079219
      },
      {
        "id": "car-8",
        "x": 2094,
        "y": 2492,
        "brightness": 0.9169894227850757
      },
      {
        "id": "car-9",
        "x": 1987,
        "y": 2383,
        "brightness": 0.8952183005032528
      },
      {
        "id": "car-10",
        "x": 2040,
        "y": 2289,
        "brightness": 0.9520962973935678
      },
      {
        "id": "car-11",
        "x": 2186,
        "y": 2412,
        "brightness": 0.8961040696484842
      },
      {
        "id": "car-12",
        "x": 2777,
        "y": 2540,
        "brightness": 0.8863555800352615
      },
      {
        "id": "car-13",
        "x": 2786,
        "y": 2532,
        "brightness": 0.8483497187185652
      },
      {
        "id": "car-14",
        "x": 2803,
        "y": 2505,
        "brightness": 0.8516268031561549
      },
      {
        "id": "car-15",
        "x": 2786,
        "y": 2483,
        "brightness": 0.8726773164520872
      },
      {
        "id": "car-16",
        "x": 2723,
        "y": 2481,
        "brightness": 0.8819708125664849
      }
    ],
    "connections": [
      [
        0,
        1
      ],
      [
        1,
        2
      ],
      [
        2,
        3
      ],
      [
        3,
        4
      ],
      [
        4,
        5
      ],
      [
        5,
        6
      ],
      [
        6,
        7
      ],
      [
        7,
        8
      ],
      [
        8,
        9
      ],
      [
        9,
        10
      ],
      [
        10,
        11
      ],
      [
        11,
        7
      ],
      [
        4,
        12
      ],
      [
        12,
        13
      ],
      [
        13,
        14
      ],
      [
        14,
        15
      ],
      [
        15,
        16
      ],
      [
        16,
        5
      ]
    ],
    "set": "argo"
  },
  {
    "id": "cen",
    "name": "Centaurus",
    "latinName": "Centaurus",
    "description": "The Centaur - Contains Alpha Centauri, the closest star system to Earth.",
    "centerX": 3334,
    "centerY": 2312,
    "radius": 100,
    "discovered": false,
    "observatory": "southern",
    "stars": [
      {
        "id": "cen-0",
        "x": 2838,
        "y": 2408,
        "brightness": 0.9420483233286854
      },
      {
        "id": "cen-1",
        "x": 3035,
        "y": 2345,
        "brightness": 0.8984834571851784
      },
      {
        "id": "cen-2",
        "x": 3117,
        "y": 2337,
        "brightness": 0.8010266966890683
      },
      {
        "id": "cen-3",
        "x": 3173,
        "y": 2316,
        "brightness": 0.9295120268230238
      },
      {
        "id": "cen-4",
        "x": 3416,
        "y": 2391,
        "brightness": 0.8360894490278
      },
      {
        "id": "cen-5",
        "x": 3481,
        "y": 2288,
        "brightness": 0.8327341668945891
      },
      {
        "id": "cen-6",
        "x": 3457,
        "y": 2208,
        "brightness": 0.9595531176346312
      },
      {
        "id": "cen-7",
        "x": 3456,
        "y": 2195,
        "brightness": 0.9845070807142746
      },
      {
        "id": "cen-8",
        "x": 3528,
        "y": 2106,
        "brightness": 0.9536760396251988
      },
      {
        "id": "cen-9",
        "x": 3648,
        "y": 2203,
        "brightness": 0.9988241222882103
      },
      {
        "id": "cen-10",
        "x": 3747,
        "y": 2202,
        "brightness": 0.9523847074838022
      },
      {
        "id": "cen-11",
        "x": 3336,
        "y": 2112,
        "brightness": 0.9305442104491496
      },
      {
        "id": "cen-12",
        "x": 3665,
        "y": 2514,
        "brightness": 0.8980051102820646
      },
      {
        "id": "cen-13",
        "x": 3516,
        "y": 2506,
        "brightness": 0.9779233102274602
      },
      {
        "id": "cen-14",
        "x": 3049,
        "y": 2373,
        "brightness": 0.8249167960665732
      },
      {
        "id": "cen-15",
        "x": 2882,
        "y": 2491,
        "brightness": 0.9384290053856048
      }
    ],
    "connections": [
      [
        0,
        1
      ],
      [
        1,
        2
      ],
      [
        2,
        3
      ],
      [
        3,
        4
      ],
      [
        4,
        5
      ],
      [
        5,
        6
      ],
      [
        6,
        7
      ],
      [
        7,
        8
      ],
      [
        8,
        9
      ],
      [
        9,
        10
      ],
      [
        7,
        11
      ],
      [
        12,
        4
      ],
      [
        4,
        13
      ],
      [
        2,
        14
      ],
      [
        14,
        15
      ]
    ],
    "set": "centaur"
  },
  {
    "id": "cet",
    "name": "Cetus",
    "latinName": "Cetus",
    "description": "The Sea Monster - A large constellation containing the variable star Mira.",
    "centerX": 513,
    "centerY": 1540,
    "radius": 100,
    "discovered": false,
    "observatory": "southern",
    "stars": [
      {
        "id": "cet-0",
        "x": 680,
        "y": 1446,
        "brightness": 0.9643077541314413
      },
      {
        "id": "cet-1",
        "x": 649,
        "y": 1407,
        "brightness": 0.9043599604214109
      },
      {
        "id": "cet-2",
        "x": 617,
        "y": 1359,
        "brightness": 0.8196912800154832
      },
      {
        "id": "cet-3",
        "x": 687,
        "y": 1331,
        "brightness": 0.8997589272040505
      },
      {
        "id": "cet-4",
        "x": 749,
        "y": 1352,
        "brightness": 0.9331205598776523
      },
      {
        "id": "cet-5",
        "x": 759,
        "y": 1432,
        "brightness": 0.9827811148346953
      },
      {
        "id": "cet-6",
        "x": 665,
        "y": 1495,
        "brightness": 0.8409535936351942
      },
      {
        "id": "cet-7",
        "x": 581,
        "y": 1550,
        "brightness": 0.9669626926269772
      },
      {
        "id": "cet-8",
        "x": 464,
        "y": 1672,
        "brightness": 0.9287197122563539
      },
      {
        "id": "cet-9",
        "x": 434,
        "y": 1766,
        "brightness": 0.997831613055914
      },
      {
        "id": "cet-10",
        "x": 182,
        "y": 1800,
        "brightness": 0.8104580571864782
      },
      {
        "id": "cet-11",
        "x": 81,
        "y": 1647,
        "brightness": 0.9623500241290699
      },
      {
        "id": "cet-12",
        "x": 286,
        "y": 1670,
        "brightness": 0.8651650046250386
      },
      {
        "id": "cet-13",
        "x": 350,
        "y": 1636,
        "brightness": 0.8172962286035186
      }
    ],
    "connections": [
      [
        0,
        1
      ],
      [
        1,
        2
      ],
      [
        2,
        3
      ],
      [
        3,
        4
      ],
      [
        4,
        5
      ],
      [
        5,
        0
      ],
      [
        0,
        6
      ],
      [
        6,
        7
      ],
      [
        7,
        8
      ],
      [
        8,
        9
      ],
      [
        9,
        10
      ],
      [
        10,
        11
      ],
      [
        11,
        12
      ],
      [
        12,
        13
      ],
      [
        13,
        8
      ]
    ],
    "set": "royal"
  },
  {
    "id": "cha",
    "name": "Chamaeleon",
    "latinName": "Chamaeleon",
    "description": "The Chameleon - A small far-southern constellation.",
    "centerX": 2698,
    "centerY": 2812,
    "radius": 100,
    "discovered": false,
    "observatory": "southern",
    "stars": [
      {
        "id": "cha-0",
        "x": 2077,
        "y": 2782,
        "brightness": 0.8666857773858997
      },
      {
        "id": "cha-1",
        "x": 2648,
        "y": 2810,
        "brightness": 0.967113167641141
      },
      {
        "id": "cha-2",
        "x": 2689,
        "y": 2841,
        "brightness": 0.9982230383133219
      },
      {
        "id": "cha-3",
        "x": 3076,
        "y": 2822,
        "brightness": 0.9752601834535132
      },
      {
        "id": "cha-4",
        "x": 2998,
        "y": 2804,
        "brightness": 0.862119334727811
      }
    ],
    "connections": [
      [
        0,
        1
      ],
      [
        1,
        2
      ],
      [
        2,
        3
      ],
      [
        3,
        4
      ],
      [
        4,
        1
      ]
    ],
    "set": "birds"
  },
  {
    "id": "cir",
    "name": "Circinus",
    "latinName": "Circinus",
    "description": "The Compass - A small southern constellation near Centaurus.",
    "centerX": 3782,
    "centerY": 2517,
    "radius": 100,
    "discovered": false,
    "observatory": "southern",
    "stars": [
      {
        "id": "cir-0",
        "x": 3823,
        "y": 2480,
        "brightness": 0.8132007857331751
      },
      {
        "id": "cir-1",
        "x": 3677,
        "y": 2583,
        "brightness": 0.8028743574149665
      },
      {
        "id": "cir-2",
        "x": 3847,
        "y": 2489,
        "brightness": 0.9602310799474051
      }
    ],
    "connections": [
      [
        0,
        1
      ],
      [
        1,
        2
      ]
    ],
    "set": "instruments"
  },
  {
    "id": "col",
    "name": "Columba",
    "latinName": "Columba",
    "description": "The Dove - Represents the dove that followed Noah's Ark.",
    "centerX": 1469,
    "centerY": 2105,
    "radius": 100,
    "discovered": false,
    "observatory": "southern",
    "stars": [
      {
        "id": "col-0",
        "x": 1592,
        "y": 2057,
        "brightness": 0.8382717830025674
      },
      {
        "id": "col-1",
        "x": 1462,
        "y": 2096,
        "brightness": 0.8012879652795848
      },
      {
        "id": "col-2",
        "x": 1415,
        "y": 2068,
        "brightness": 0.9520381260768872
      },
      {
        "id": "col-3",
        "x": 1380,
        "y": 2091,
        "brightness": 0.8350592729197194
      },
      {
        "id": "col-4",
        "x": 1496,
        "y": 2214,
        "brightness": 0.9237011841011147
      }
    ],
    "connections": [
      [
        0,
        1
      ],
      [
        1,
        2
      ],
      [
        2,
        3
      ],
      [
        1,
        4
      ]
    ],
    "set": "argo"
  },
  {
    "id": "cra",
    "name": "Corona Australis",
    "latinName": "Corona Australis",
    "description": "The Southern Crown - A small arc-shaped southern constellation.",
    "centerX": 4750,
    "centerY": 2166,
    "radius": 100,
    "discovered": false,
    "observatory": "southern",
    "stars": [
      {
        "id": "cra-0",
        "x": 4745,
        "y": 2118,
        "brightness": 0.9477606981956151
      },
      {
        "id": "cra-1",
        "x": 4777,
        "y": 2118,
        "brightness": 0.8429724514111648
      },
      {
        "id": "cra-2",
        "x": 4789,
        "y": 2132,
        "brightness": 0.9319648964034708
      },
      {
        "id": "cra-3",
        "x": 4792,
        "y": 2156,
        "brightness": 0.9254587869757929
      },
      {
        "id": "cra-4",
        "x": 4785,
        "y": 2175,
        "brightness": 0.8108424260766369
      },
      {
        "id": "cra-5",
        "x": 4763,
        "y": 2202,
        "brightness": 0.881933486328356
      },
      {
        "id": "cra-6",
        "x": 4707,
        "y": 2224,
        "brightness": 0.8605983248986376
      },
      {
        "id": "cra-7",
        "x": 4640,
        "y": 2205,
        "brightness": 0.9192794567258602
      }
    ],
    "connections": [
      [
        0,
        1
      ],
      [
        1,
        2
      ],
      [
        2,
        3
      ],
      [
        3,
        4
      ],
      [
        4,
        5
      ],
      [
        5,
        6
      ],
      [
        6,
        7
      ]
    ]
  },
  {
    "id": "crv",
    "name": "Corvus",
    "latinName": "Corvus",
    "description": "The Crow - A small constellation known since ancient times.",
    "centerX": 3082,
    "centerY": 1849,
    "radius": 100,
    "discovered": false,
    "observatory": "southern",
    "stars": [
      {
        "id": "crv-0",
        "x": 3035,
        "y": 1912,
        "brightness": 0.9937050938804446
      },
      {
        "id": "crv-1",
        "x": 3042,
        "y": 1877,
        "brightness": 0.839766831749164
      },
      {
        "id": "crv-2",
        "x": 3066,
        "y": 1792,
        "brightness": 0.8287169207163059
      },
      {
        "id": "crv-3",
        "x": 3124,
        "y": 1775,
        "brightness": 0.8308809947484482
      },
      {
        "id": "crv-4",
        "x": 3143,
        "y": 1890,
        "brightness": 0.8669241324210412
      }
    ],
    "connections": [
      [
        0,
        1
      ],
      [
        1,
        2
      ],
      [
        2,
        3
      ],
      [
        3,
        4
      ],
      [
        4,
        1
      ]
    ],
    "set": "centaur"
  },
  {
    "id": "crt",
    "name": "Crater",
    "latinName": "Crater",
    "description": "The Cup - Represents a chalice in Greek mythology.",
    "centerX": 2862,
    "centerY": 1775,
    "radius": 100,
    "discovered": false,
    "observatory": "southern",
    "stars": [
      {
        "id": "crt-0",
        "x": 2903,
        "y": 1663,
        "brightness": 0.9837183352932632
      },
      {
        "id": "crt-1",
        "x": 2853,
        "y": 1681,
        "brightness": 0.9795894918351852
      },
      {
        "id": "crt-2",
        "x": 2831,
        "y": 1746,
        "brightness": 0.8976022431630696
      },
      {
        "id": "crt-3",
        "x": 2749,
        "y": 1805,
        "brightness": 0.9772809328786458
      },
      {
        "id": "crt-4",
        "x": 2799,
        "y": 1880,
        "brightness": 0.8301225722760361
      },
      {
        "id": "crt-5",
        "x": 2847,
        "y": 1813,
        "brightness": 0.9044129345866233
      },
      {
        "id": "crt-6",
        "x": 2854,
        "y": 1795,
        "brightness": 0.8235612705813838
      },
      {
        "id": "crt-7",
        "x": 2937,
        "y": 1806,
        "brightness": 0.8469161735394345
      },
      {
        "id": "crt-8",
        "x": 2983,
        "y": 1786,
        "brightness": 0.9950112351033353
      }
    ],
    "connections": [
      [
        0,
        1
      ],
      [
        1,
        2
      ],
      [
        2,
        3
      ],
      [
        3,
        4
      ],
      [
        4,
        5
      ],
      [
        5,
        6
      ],
      [
        6,
        7
      ],
      [
        7,
        8
      ],
      [
        2,
        6
      ]
    ],
    "set": "centaur"
  },
  {
    "id": "cru",
    "name": "Crux",
    "latinName": "Crux",
    "description": "The Southern Cross - The smallest constellation but most famous southern one.",
    "centerX": 3126,
    "centerY": 2495,
    "radius": 88,
    "discovered": false,
    "observatory": "southern",
    "stars": [
      {
        "id": "cru-0",
        "x": 3199,
        "y": 2495,
        "brightness": 0.934551486585232
      },
      {
        "id": "cru-1",
        "x": 3063,
        "y": 2479,
        "brightness": 0.9385125336032566
      },
      {
        "id": "cru-2",
        "x": 3111,
        "y": 2552,
        "brightness": 0.9641856008533269
      },
      {
        "id": "cru-3",
        "x": 3130,
        "y": 2452,
        "brightness": 0.8574868162917751
      }
    ],
    "connections": [
      [
        0,
        1
      ],
      [
        2,
        3
      ]
    ],
    "set": "centaur"
  },
  {
    "id": "dor",
    "name": "Dorado",
    "latinName": "Dorado",
    "description": "The Swordfish - Contains the Large Magellanic Cloud.",
    "centerX": 1297,
    "centerY": 2487,
    "radius": 100,
    "discovered": false,
    "observatory": "southern",
    "stars": [
      {
        "id": "dor-0",
        "x": 1067,
        "y": 2358,
        "brightness": 0.8923378558056041
      },
      {
        "id": "dor-1",
        "x": 1142,
        "y": 2417,
        "brightness": 0.915445606225866
      },
      {
        "id": "dor-2",
        "x": 1390,
        "y": 2541,
        "brightness": 0.9459307150260597
      },
      {
        "id": "dor-3",
        "x": 1437,
        "y": 2596,
        "brightness": 0.9877892477067998
      },
      {
        "id": "dor-4",
        "x": 1475,
        "y": 2551,
        "brightness": 0.879861586188173
      },
      {
        "id": "dor-5",
        "x": 1273,
        "y": 2458,
        "brightness": 0.9141050549603372
      }
    ],
    "connections": [
      [
        0,
        1
      ],
      [
        1,
        2
      ],
      [
        2,
        3
      ],
      [
        3,
        4
      ],
      [
        4,
        2
      ],
      [
        2,
        5
      ],
      [
        5,
        1
      ]
    ],
    "set": "waters"
  },
  {
    "id": "eri",
    "name": "Eridanus",
    "latinName": "Eridanus",
    "description": "The River - A long winding constellation representing a river.",
    "centerX": 869,
    "centerY": 1933,
    "radius": 100,
    "discovered": false,
    "observatory": "southern",
    "stars": [
      {
        "id": "eri-0",
        "x": 1283,
        "y": 1585,
        "brightness": 0.9478881665917057
      },
      {
        "id": "eri-1",
        "x": 1190,
        "y": 1554,
        "brightness": 0.805588095395527
      },
      {
        "id": "eri-2",
        "x": 1151,
        "y": 1556,
        "brightness": 0.9835070626865329
      },
      {
        "id": "eri-3",
        "x": 1049,
        "y": 1614,
        "brightness": 0.8361805552714764
      },
      {
        "id": "eri-4",
        "x": 992,
        "y": 1725,
        "brightness": 0.9652977572368066
      },
      {
        "id": "eri-5",
        "x": 942,
        "y": 1702,
        "brightness": 0.810882226863823
      },
      {
        "id": "eri-6",
        "x": 930,
        "y": 1663,
        "brightness": 0.9631877500197802
      },
      {
        "id": "eri-7",
        "x": 887,
        "y": 1658,
        "brightness": 0.9293136256681728
      },
      {
        "id": "eri-8",
        "x": 735,
        "y": 1648,
        "brightness": 0.8574096538376796
      },
      {
        "id": "eri-9",
        "x": 684,
        "y": 1731,
        "brightness": 0.816823232767848
      },
      {
        "id": "eri-10",
        "x": 688,
        "y": 1810,
        "brightness": 0.8522519991365208
      },
      {
        "id": "eri-11",
        "x": 760,
        "y": 1894,
        "brightness": 0.8312150218153026
      },
      {
        "id": "eri-12",
        "x": 831,
        "y": 1863,
        "brightness": 0.9524561765361508
      },
      {
        "id": "eri-13",
        "x": 891,
        "y": 1861,
        "brightness": 0.9100911359189551
      },
      {
        "id": "eri-14",
        "x": 945,
        "y": 1887,
        "brightness": 0.8621345894300049
      },
      {
        "id": "eri-15",
        "x": 1148,
        "y": 2009,
        "brightness": 0.8707371331876952
      },
      {
        "id": "eri-16",
        "x": 1100,
        "y": 2067,
        "brightness": 0.870954863636297
      },
      {
        "id": "eri-17",
        "x": 1075,
        "y": 2063,
        "brightness": 0.8309511303639479
      },
      {
        "id": "eri-18",
        "x": 956,
        "y": 2103,
        "brightness": 0.9977547694461462
      },
      {
        "id": "eri-19",
        "x": 905,
        "y": 2171,
        "brightness": 0.8832691741569463
      },
      {
        "id": "eri-20",
        "x": 833,
        "y": 2218,
        "brightness": 0.858727467937631
      },
      {
        "id": "eri-21",
        "x": 743,
        "y": 2172,
        "brightness": 0.9675427310088469
      },
      {
        "id": "eri-22",
        "x": 669,
        "y": 2164,
        "brightness": 0.9777295607759133
      },
      {
        "id": "eri-23",
        "x": 612,
        "y": 2295,
        "brightness": 0.8178102848535956
      },
      {
        "id": "eri-24",
        "x": 569,
        "y": 2359,
        "brightness": 0.8618646022794484
      },
      {
        "id": "eri-25",
        "x": 483,
        "y": 2360,
        "brightness": 0.9459167856002355
      },
      {
        "id": "eri-26",
        "x": 407,
        "y": 2454,
        "brightness": 0.9032114628245754
      }
    ],
    "connections": [
      [
        0,
        1
      ],
      [
        1,
        2
      ],
      [
        2,
        3
      ],
      [
        3,
        4
      ],
      [
        4,
        5
      ],
      [
        5,
        6
      ],
      [
        6,
        7
      ],
      [
        7,
        8
      ],
      [
        8,
        9
      ],
      [
        9,
        10
      ],
      [
        10,
        11
      ],
      [
        11,
        12
      ],
      [
        12,
        13
      ],
      [
        13,
        14
      ],
      [
        14,
        15
      ],
      [
        15,
        16
      ],
      [
        16,
        17
      ],
      [
        17,
        18
      ],
      [
        18,
        19
      ],
      [
        19,
        20
      ],
      [
        20,
        21
      ],
      [
        21,
        22
      ],
      [
        22,
        23
      ],
      [
        23,
        24
      ],
      [
        24,
        25
      ],
      [
        25,
        26
      ]
    ],
    "set": "waters"
  },
  {
    "id": "for",
    "name": "Fornax",
    "latinName": "Fornax",
    "description": "The Furnace - Contains the Fornax Cluster of galaxies.",
    "centerX": 675,
    "centerY": 2004,
    "radius": 100,
    "discovered": false,
    "observatory": "southern",
    "stars": [
      {
        "id": "for-0",
        "x": 800,
        "y": 1983,
        "brightness": 0.8782105229608553
      },
      {
        "id": "for-1",
        "x": 705,
        "y": 2040,
        "brightness": 0.9482501924081531
      },
      {
        "id": "for-2",
        "x": 519,
        "y": 1988,
        "brightness": 0.8125424935226585
      }
    ],
    "connections": [
      [
        0,
        1
      ],
      [
        1,
        2
      ]
    ],
    "set": "instruments"
  },
  {
    "id": "gru",
    "name": "Grus",
    "latinName": "Grus",
    "description": "The Crane - A graceful bird constellation in the southern sky.",
    "centerX": 5609,
    "centerY": 2247,
    "radius": 100,
    "discovered": false,
    "observatory": "southern",
    "stars": [
      {
        "id": "gru-0",
        "x": 5754,
        "y": 2379,
        "brightness": 0.8807233621646954
      },
      {
        "id": "gru-1",
        "x": 5702,
        "y": 2355,
        "brightness": 0.8834597761382939
      },
      {
        "id": "gru-2",
        "x": 5678,
        "y": 2281,
        "brightness": 0.9809492803633229
      },
      {
        "id": "gru-3",
        "x": 5624,
        "y": 2229,
        "brightness": 0.8046678812491861
      },
      {
        "id": "gru-4",
        "x": 5534,
        "y": 2283,
        "brightness": 0.919578624166178
      },
      {
        "id": "gru-5",
        "x": 5622,
        "y": 2225,
        "brightness": 0.9873455464335607
      },
      {
        "id": "gru-6",
        "x": 5565,
        "y": 2189,
        "brightness": 0.8320711568100384
      },
      {
        "id": "gru-7",
        "x": 5525,
        "y": 2159,
        "brightness": 0.9952393134323949
      },
      {
        "id": "gru-8",
        "x": 5475,
        "y": 2123,
        "brightness": 0.9520717648370667
      }
    ],
    "connections": [
      [
        0,
        1
      ],
      [
        1,
        2
      ],
      [
        2,
        3
      ],
      [
        3,
        4
      ],
      [
        4,
        2
      ],
      [
        5,
        6
      ],
      [
        6,
        7
      ],
      [
        7,
        8
      ]
    ],
    "set": "birds"
  },
  {
    "id": "hor",
    "name": "Horologium",
    "latinName": "Horologium",
    "description": "The Pendulum Clock - A faint southern constellation.",
    "centerX": 762,
    "centerY": 2400,
    "radius": 100,
    "discovered": false,
    "observatory": "southern",
    "stars": [
      {
        "id": "hor-0",
        "x": 1058,
        "y": 2205,
        "brightness": 0.956689949466345
      },
      {
        "id": "hor-1",
        "x": 677,
        "y": 2347,
        "brightness": 0.9379198983033612
      },
      {
        "id": "hor-2",
        "x": 656,
        "y": 2376,
        "brightness": 0.857503980121587
      },
      {
        "id": "hor-3",
        "x": 669,
        "y": 2409,
        "brightness": 0.8819705654629583
      },
      {
        "id": "hor-4",
        "x": 765,
        "y": 2496,
        "brightness": 0.864829904396634
      },
      {
        "id": "hor-5",
        "x": 745,
        "y": 2568,
        "brightness": 0.8502738251460566
      }
    ],
    "connections": [
      [
        0,
        1
      ],
      [
        1,
        2
      ],
      [
        2,
        3
      ],
      [
        3,
        4
      ],
      [
        4,
        5
      ]
    ],
    "set": "instruments"
  },
  {
    "id": "hya",
    "name": "Hydra",
    "latinName": "Hydra",
    "description": "The Water Snake - The largest of all 88 constellations.",
    "centerX": 2609,
    "centerY": 1667,
    "radius": 100,
    "discovered": false,
    "observatory": "southern",
    "stars": [
      {
        "id": "hya-0",
        "x": 2195,
        "y": 1393,
        "brightness": 0.8314677741555458
      },
      {
        "id": "hya-1",
        "x": 2202,
        "y": 1403,
        "brightness": 0.9585773590034516
      },
      {
        "id": "hya-2",
        "x": 2180,
        "y": 1443,
        "brightness": 0.9611840158420162
      },
      {
        "id": "hya-3",
        "x": 2161,
        "y": 1444,
        "brightness": 0.900478123803866
      },
      {
        "id": "hya-4",
        "x": 2157,
        "y": 1405,
        "brightness": 0.9156324789015544
      },
      {
        "id": "hya-5",
        "x": 2231,
        "y": 1401,
        "brightness": 0.8795860767681675
      },
      {
        "id": "hya-6",
        "x": 2310,
        "y": 1461,
        "brightness": 0.8069869275114702
      },
      {
        "id": "hya-7",
        "x": 2416,
        "y": 1519,
        "brightness": 0.927494358928875
      },
      {
        "id": "hya-8",
        "x": 2365,
        "y": 1644,
        "brightness": 0.9812998051355774
      },
      {
        "id": "hya-9",
        "x": 2464,
        "y": 1747,
        "brightness": 0.8083304247455858
      },
      {
        "id": "hya-10",
        "x": 2544,
        "y": 1706,
        "brightness": 0.9063069942411794
      },
      {
        "id": "hya-11",
        "x": 2609,
        "y": 1781,
        "brightness": 0.8044170634999979
      },
      {
        "id": "hya-12",
        "x": 2707,
        "y": 1770,
        "brightness": 0.9937208734951619
      },
      {
        "id": "hya-13",
        "x": 2888,
        "y": 2031,
        "brightness": 0.9785876381566133
      },
      {
        "id": "hya-14",
        "x": 2970,
        "y": 2065,
        "brightness": 0.8161665163722794
      },
      {
        "id": "hya-15",
        "x": 3329,
        "y": 1886,
        "brightness": 0.9395426915872489
      },
      {
        "id": "hya-16",
        "x": 3527,
        "y": 1945,
        "brightness": 0.862418678819602
      },
      {
        "id": "hya-17",
        "x": 3710,
        "y": 1966,
        "brightness": 0.9001727186926257
      }
    ],
    "connections": [
      [
        0,
        1
      ],
      [
        1,
        2
      ],
      [
        2,
        3
      ],
      [
        3,
        4
      ],
      [
        4,
        0
      ],
      [
        0,
        5
      ],
      [
        5,
        6
      ],
      [
        6,
        7
      ],
      [
        7,
        8
      ],
      [
        8,
        9
      ],
      [
        9,
        10
      ],
      [
        10,
        11
      ],
      [
        11,
        12
      ],
      [
        12,
        13
      ],
      [
        13,
        14
      ],
      [
        14,
        15
      ],
      [
        15,
        16
      ],
      [
        16,
        17
      ]
    ],
    "set": "waters"
  },
  {
    "id": "hyi",
    "name": "Hydrus",
    "latinName": "Hydrus",
    "description": "The Lesser Water Snake - A southern constellation near the pole.",
    "centerX": 547,
    "centerY": 2660,
    "radius": 100,
    "discovered": false,
    "observatory": "southern",
    "stars": [
      {
        "id": "hyi-0",
        "x": 107,
        "y": 2788,
        "brightness": 0.8657841041641771
      },
      {
        "id": "hyi-1",
        "x": 947,
        "y": 2737,
        "brightness": 0.897030344869424
      },
      {
        "id": "hyi-2",
        "x": 665,
        "y": 2638,
        "brightness": 0.8106392773090512
      },
      {
        "id": "hyi-3",
        "x": 591,
        "y": 2644,
        "brightness": 0.862384803640242
      },
      {
        "id": "hyi-4",
        "x": 479,
        "y": 2627,
        "brightness": 0.9032803077210454
      },
      {
        "id": "hyi-5",
        "x": 495,
        "y": 2526,
        "brightness": 0.8288533703253654
      }
    ],
    "connections": [
      [
        0,
        1
      ],
      [
        1,
        2
      ],
      [
        2,
        3
      ],
      [
        3,
        4
      ],
      [
        4,
        5
      ]
    ],
    "set": "waters"
  },
  {
    "id": "ind",
    "name": "Indus",
    "latinName": "Indus",
    "description": "The Indian - A southern constellation with no bright stars.",
    "centerX": 5278,
    "centerY": 2387,
    "radius": 100,
    "discovered": false,
    "observatory": "southern",
    "stars": [
      {
        "id": "ind-0",
        "x": 5157,
        "y": 2288,
        "brightness": 0.8973356735578666
      },
      {
        "id": "ind-1",
        "x": 5183,
        "y": 2365,
        "brightness": 0.8552976456842316
      },
      {
        "id": "ind-2",
        "x": 5228,
        "y": 2474,
        "brightness": 0.9559094052702524
      },
      {
        "id": "ind-3",
        "x": 5491,
        "y": 2417,
        "brightness": 0.9343024137201071
      },
      {
        "id": "ind-4",
        "x": 5333,
        "y": 2391,
        "brightness": 0.8658146464040566
      }
    ],
    "connections": [
      [
        0,
        1
      ],
      [
        1,
        2
      ],
      [
        2,
        3
      ],
      [
        3,
        4
      ],
      [
        4,
        0
      ]
    ],
    "set": "centaur"
  },
  {
    "id": "lep",
    "name": "Lepus",
    "latinName": "Lepus",
    "description": "The Hare - Sits at Orion's feet in the winter sky.",
    "centerX": 1393,
    "centerY": 1789,
    "radius": 100,
    "discovered": false,
    "observatory": "southern",
    "stars": [
      {
        "id": "lep-0",
        "x": 1526,
        "y": 1749,
        "brightness": 0.9234418904583939
      },
      {
        "id": "lep-1",
        "x": 1485,
        "y": 1736,
        "brightness": 0.8720294145111143
      },
      {
        "id": "lep-2",
        "x": 1446,
        "y": 1747,
        "brightness": 0.9707719449458521
      },
      {
        "id": "lep-3",
        "x": 1386,
        "y": 1797,
        "brightness": 0.976510805971686
      },
      {
        "id": "lep-4",
        "x": 1304,
        "y": 1770,
        "brightness": 0.890186099379687
      },
      {
        "id": "lep-5",
        "x": 1273,
        "y": 1873,
        "brightness": 0.8544944422948368
      },
      {
        "id": "lep-6",
        "x": 1368,
        "y": 1846,
        "brightness": 0.850310440797485
      },
      {
        "id": "lep-7",
        "x": 1435,
        "y": 1874,
        "brightness": 0.9899009271402823
      },
      {
        "id": "lep-8",
        "x": 1464,
        "y": 1848,
        "brightness": 0.8844096445229653
      },
      {
        "id": "lep-9",
        "x": 1305,
        "y": 1716,
        "brightness": 0.8831816853062892
      },
      {
        "id": "lep-10",
        "x": 1332,
        "y": 1720,
        "brightness": 0.9804255367530154
      }
    ],
    "connections": [
      [
        0,
        1
      ],
      [
        1,
        2
      ],
      [
        2,
        3
      ],
      [
        3,
        4
      ],
      [
        4,
        5
      ],
      [
        5,
        6
      ],
      [
        6,
        7
      ],
      [
        7,
        8
      ],
      [
        9,
        4
      ],
      [
        4,
        10
      ]
    ],
    "set": "orion"
  },
  {
    "id": "lib",
    "name": "Libra",
    "latinName": "Libra",
    "description": "The Scales - The only zodiac constellation representing an object.",
    "centerX": 3836,
    "centerY": 1843,
    "radius": 100,
    "discovered": false,
    "observatory": "southern",
    "stars": [
      {
        "id": "lib-0",
        "x": 3767,
        "y": 1921,
        "brightness": 0.8445531640017194
      },
      {
        "id": "lib-1",
        "x": 3712,
        "y": 1767,
        "brightness": 0.9769771603779505
      },
      {
        "id": "lib-2",
        "x": 3821,
        "y": 1656,
        "brightness": 0.8722359721984887
      },
      {
        "id": "lib-3",
        "x": 3898,
        "y": 1746,
        "brightness": 0.8748280703055417
      },
      {
        "id": "lib-4",
        "x": 3904,
        "y": 1969,
        "brightness": 0.8470587110135857
      },
      {
        "id": "lib-5",
        "x": 3911,
        "y": 1996,
        "brightness": 0.8224103576699049
      }
    ],
    "connections": [
      [
        0,
        1
      ],
      [
        1,
        2
      ],
      [
        2,
        3
      ],
      [
        3,
        4
      ],
      [
        4,
        5
      ],
      [
        1,
        3
      ]
    ],
    "set": "zodiac"
  },
  {
    "id": "lup",
    "name": "Lupus",
    "latinName": "Lupus",
    "description": "The Wolf - An ancient constellation near Centaurus.",
    "centerX": 3865,
    "centerY": 2190,
    "radius": 100,
    "discovered": false,
    "observatory": "southern",
    "stars": [
      {
        "id": "lup-0",
        "x": 3962,
        "y": 2060,
        "brightness": 0.9668409236435893
      },
      {
        "id": "lup-1",
        "x": 3916,
        "y": 2074,
        "brightness": 0.9076404688667518
      },
      {
        "id": "lup-2",
        "x": 3841,
        "y": 2104,
        "brightness": 0.8252638546414409
      },
      {
        "id": "lup-3",
        "x": 3839,
        "y": 2177,
        "brightness": 0.8194756330839293
      },
      {
        "id": "lup-4",
        "x": 3744,
        "y": 2219,
        "brightness": 0.8196620683681652
      },
      {
        "id": "lup-5",
        "x": 3675,
        "y": 2290,
        "brightness": 0.8407488296122446
      },
      {
        "id": "lup-6",
        "x": 3801,
        "y": 2368,
        "brightness": 0.8428208535972105
      },
      {
        "id": "lup-7",
        "x": 3827,
        "y": 2298,
        "brightness": 0.8477952674687916
      },
      {
        "id": "lup-8",
        "x": 3845,
        "y": 2245,
        "brightness": 0.849259981408015
      },
      {
        "id": "lup-9",
        "x": 3896,
        "y": 2186,
        "brightness": 0.9633984085653047
      },
      {
        "id": "lup-10",
        "x": 4001,
        "y": 2140,
        "brightness": 0.8872265967451215
      },
      {
        "id": "lup-11",
        "x": 4027,
        "y": 2113,
        "brightness": 0.8995689071331661
      }
    ],
    "connections": [
      [
        0,
        1
      ],
      [
        1,
        2
      ],
      [
        2,
        3
      ],
      [
        3,
        4
      ],
      [
        4,
        5
      ],
      [
        5,
        6
      ],
      [
        6,
        7
      ],
      [
        7,
        8
      ],
      [
        8,
        9
      ],
      [
        9,
        10
      ],
      [
        10,
        11
      ],
      [
        3,
        9
      ]
    ],
    "set": "centaur"
  },
  {
    "id": "men",
    "name": "Mensa",
    "latinName": "Mensa",
    "description": "The Table Mountain - The faintest named constellation.",
    "centerX": 1354,
    "centerY": 2739,
    "radius": 100,
    "discovered": false,
    "observatory": "southern",
    "stars": [
      {
        "id": "men-0",
        "x": 1543,
        "y": 2746,
        "brightness": 0.8319809649490628
      },
      {
        "id": "men-1",
        "x": 1383,
        "y": 2772,
        "brightness": 0.8621646534556205
      },
      {
        "id": "men-2",
        "x": 1230,
        "y": 2749,
        "brightness": 0.8847721611483306
      },
      {
        "id": "men-3",
        "x": 1261,
        "y": 2689,
        "brightness": 0.8207511570133645
      }
    ],
    "connections": [
      [
        0,
        1
      ],
      [
        1,
        2
      ],
      [
        2,
        3
      ]
    ],
    "set": "instruments"
  },
  {
    "id": "mic",
    "name": "Microscopium",
    "latinName": "Microscopium",
    "description": "The Microscope - A faint southern constellation.",
    "centerX": 5265,
    "centerY": 2110,
    "radius": 100,
    "discovered": false,
    "observatory": "southern",
    "stars": [
      {
        "id": "mic-0",
        "x": 5208,
        "y": 2063,
        "brightness": 0.8428827413447809
      },
      {
        "id": "mic-1",
        "x": 5202,
        "y": 2233,
        "brightness": 0.9462203230338211
      },
      {
        "id": "mic-2",
        "x": 5337,
        "y": 2180,
        "brightness": 0.9976662631264042
      },
      {
        "id": "mic-3",
        "x": 5325,
        "y": 2036,
        "brightness": 0.9059060080687924
      },
      {
        "id": "mic-4",
        "x": 5255,
        "y": 2038,
        "brightness": 0.9051836491973301
      }
    ],
    "connections": [
      [
        0,
        1
      ],
      [
        1,
        2
      ],
      [
        2,
        3
      ],
      [
        3,
        4
      ],
      [
        4,
        0
      ]
    ],
    "set": "instruments"
  },
  {
    "id": "mon",
    "name": "Monoceros",
    "latinName": "Monoceros",
    "description": "The Unicorn - Located on the celestial equator.",
    "centerX": 1727,
    "centerY": 1504,
    "radius": 100,
    "discovered": false,
    "observatory": "southern",
    "stars": [
      {
        "id": "mon-0",
        "x": 1922,
        "y": 1659,
        "brightness": 0.9684246875855334
      },
      {
        "id": "mon-1",
        "x": 2036,
        "y": 1550,
        "brightness": 0.89566299389944
      },
      {
        "id": "mon-2",
        "x": 1799,
        "y": 1508,
        "brightness": 0.8381074778610379
      },
      {
        "id": "mon-3",
        "x": 1620,
        "y": 1617,
        "brightness": 0.9561306543972554
      },
      {
        "id": "mon-4",
        "x": 1562,
        "y": 1605,
        "brightness": 0.8001202153333986
      },
      {
        "id": "mon-5",
        "x": 1699,
        "y": 1460,
        "brightness": 0.9013155520440307
      },
      {
        "id": "mon-6",
        "x": 1599,
        "y": 1423,
        "brightness": 0.9396920826461419
      },
      {
        "id": "mon-7",
        "x": 1637,
        "y": 1378,
        "brightness": 0.8187779146884577
      },
      {
        "id": "mon-8",
        "x": 1671,
        "y": 1335,
        "brightness": 0.8217232304063987
      }
    ],
    "connections": [
      [
        0,
        1
      ],
      [
        1,
        2
      ],
      [
        2,
        3
      ],
      [
        3,
        4
      ],
      [
        2,
        5
      ],
      [
        5,
        6
      ],
      [
        6,
        7
      ],
      [
        7,
        8
      ]
    ],
    "set": "orion"
  },
  {
    "id": "mus",
    "name": "Musca",
    "latinName": "Musca",
    "description": "The Fly - A small constellation near the Southern Cross.",
    "centerX": 3126,
    "centerY": 2654,
    "radius": 100,
    "discovered": false,
    "observatory": "southern",
    "stars": [
      {
        "id": "mus-0",
        "x": 2940,
        "y": 2612,
        "brightness": 0.8253466018697452
      },
      {
        "id": "mus-1",
        "x": 3073,
        "y": 2633,
        "brightness": 0.9680067800790437
      },
      {
        "id": "mus-2",
        "x": 3155,
        "y": 2652,
        "brightness": 0.8508931128882933
      },
      {
        "id": "mus-3",
        "x": 3193,
        "y": 2635,
        "brightness": 0.9383905281960497
      },
      {
        "id": "mus-4",
        "x": 3259,
        "y": 2692,
        "brightness": 0.9868819065717711
      },
      {
        "id": "mus-5",
        "x": 3135,
        "y": 2702,
        "brightness": 0.9323010642435965
      }
    ],
    "connections": [
      [
        0,
        1
      ],
      [
        1,
        2
      ],
      [
        2,
        3
      ],
      [
        3,
        4
      ],
      [
        4,
        5
      ],
      [
        5,
        2
      ]
    ],
    "set": "birds"
  },
  {
    "id": "nor",
    "name": "Norma",
    "latinName": "Norma",
    "description": "The Carpenter's Square - A small southern constellation.",
    "centerX": 4059,
    "centerY": 2301,
    "radius": 69,
    "discovered": false,
    "observatory": "southern",
    "stars": [
      {
        "id": "nor-0",
        "x": 4027,
        "y": 2253,
        "brightness": 0.8662795457165883
      },
      {
        "id": "nor-1",
        "x": 4113,
        "y": 2293,
        "brightness": 0.970345657280872
      },
      {
        "id": "nor-2",
        "x": 4083,
        "y": 2336,
        "brightness": 0.9705760126396118
      },
      {
        "id": "nor-3",
        "x": 4013,
        "y": 2320,
        "brightness": 0.8571638617180998
      }
    ],
    "connections": [
      [
        0,
        1
      ],
      [
        1,
        2
      ],
      [
        2,
        3
      ],
      [
        3,
        0
      ]
    ],
    "set": "instruments"
  },
  {
    "id": "oct",
    "name": "Octans",
    "latinName": "Octans",
    "description": "The Octant - Contains the south celestial pole.",
    "centerX": 4909,
    "centerY": 2847,
    "radius": 100,
    "discovered": false,
    "observatory": "southern",
    "stars": [
      {
        "id": "oct-0",
        "x": 3612,
        "y": 2894,
        "brightness": 0.9558932058093097
      },
      {
        "id": "oct-1",
        "x": 5692,
        "y": 2856,
        "brightness": 0.9707630162374117
      },
      {
        "id": "oct-2",
        "x": 5423,
        "y": 2790,
        "brightness": 0.8211706128587003
      }
    ],
    "connections": [
      [
        0,
        1
      ],
      [
        1,
        2
      ],
      [
        2,
        0
      ]
    ],
    "set": "instruments"
  },
  {
    "id": "oph",
    "name": "Ophiuchus",
    "latinName": "Ophiuchus",
    "description": "The Serpent Bearer - A large constellation on the celestial equator.",
    "centerX": 4243,
    "centerY": 1653,
    "radius": 100,
    "discovered": false,
    "observatory": "southern",
    "stars": [
      {
        "id": "oph-0",
        "x": 4496,
        "y": 1663,
        "brightness": 0.8268355624592925
      },
      {
        "id": "oph-1",
        "x": 4450,
        "y": 1455,
        "brightness": 0.8253975539907579
      },
      {
        "id": "oph-2",
        "x": 4431,
        "y": 1424,
        "brightness": 0.8621658239880422
      },
      {
        "id": "oph-3",
        "x": 4396,
        "y": 1291,
        "brightness": 0.9500038802953227
      },
      {
        "id": "oph-4",
        "x": 4240,
        "y": 1344,
        "brightness": 0.9792128783217411
      },
      {
        "id": "oph-5",
        "x": 4129,
        "y": 1467,
        "brightness": 0.9397723691141788
      },
      {
        "id": "oph-6",
        "x": 4060,
        "y": 1562,
        "brightness": 0.8944018811446295
      },
      {
        "id": "oph-7",
        "x": 4076,
        "y": 1578,
        "brightness": 0.9499329698466898
      },
      {
        "id": "oph-8",
        "x": 4155,
        "y": 1676,
        "brightness": 0.9918936345441665
      },
      {
        "id": "oph-9",
        "x": 4293,
        "y": 1762,
        "brightness": 0.9692172598900592
      },
      {
        "id": "oph-10",
        "x": 4130,
        "y": 1777,
        "brightness": 0.9193254303070616
      },
      {
        "id": "oph-11",
        "x": 4113,
        "y": 1808,
        "brightness": 0.9986046374654511
      },
      {
        "id": "oph-12",
        "x": 4100,
        "y": 1834,
        "brightness": 0.8193478830287544
      },
      {
        "id": "oph-13",
        "x": 4107,
        "y": 1891,
        "brightness": 0.8838376571003304
      },
      {
        "id": "oph-14",
        "x": 4342,
        "y": 1917,
        "brightness": 0.8183320243631839
      },
      {
        "id": "oph-15",
        "x": 4364,
        "y": 1998,
        "brightness": 0.943767110474179
      }
    ],
    "connections": [
      [
        0,
        1
      ],
      [
        1,
        2
      ],
      [
        2,
        3
      ],
      [
        3,
        4
      ],
      [
        4,
        5
      ],
      [
        5,
        6
      ],
      [
        6,
        7
      ],
      [
        7,
        8
      ],
      [
        8,
        9
      ],
      [
        4,
        8
      ],
      [
        8,
        10
      ],
      [
        10,
        11
      ],
      [
        11,
        12
      ],
      [
        12,
        13
      ],
      [
        2,
        9
      ],
      [
        9,
        14
      ],
      [
        14,
        15
      ]
    ]
  },
  {
    "id": "pav",
    "name": "Pavo",
    "latinName": "Pavo",
    "description": "The Peacock - A southern constellation with a bright alpha star.",
    "centerX": 4866,
    "centerY": 2585,
    "radius": 100,
    "discovered": false,
    "observatory": "southern",
    "stars": [
      {
        "id": "pav-0",
        "x": 5107,
        "y": 2446,
        "brightness": 0.9693014462760375
      },
      {
        "id": "pav-1",
        "x": 5187,
        "y": 2603,
        "brightness": 0.9737576027894747
      },
      {
        "id": "pav-2",
        "x": 5036,
        "y": 2603,
        "brightness": 0.9699218816569689
      },
      {
        "id": "pav-3",
        "x": 4718,
        "y": 2536,
        "brightness": 0.8695471255428961
      },
      {
        "id": "pav-4",
        "x": 4597,
        "y": 2525,
        "brightness": 0.9091187271407456
      },
      {
        "id": "pav-5",
        "x": 4536,
        "y": 2561,
        "brightness": 0.9045476440126013
      },
      {
        "id": "pav-6",
        "x": 4441,
        "y": 2579,
        "brightness": 0.9482287192028196
      },
      {
        "id": "pav-7",
        "x": 4679,
        "y": 2690,
        "brightness": 0.8193399380392145
      },
      {
        "id": "pav-8",
        "x": 5002,
        "y": 2715,
        "brightness": 0.8519159822548583
      },
      {
        "id": "pav-9",
        "x": 5360,
        "y": 2589,
        "brightness": 0.8287583253883802
      }
    ],
    "connections": [
      [
        0,
        1
      ],
      [
        1,
        2
      ],
      [
        2,
        3
      ],
      [
        3,
        4
      ],
      [
        4,
        5
      ],
      [
        5,
        6
      ],
      [
        6,
        7
      ],
      [
        7,
        8
      ],
      [
        8,
        1
      ],
      [
        1,
        9
      ]
    ],
    "set": "birds"
  },
  {
    "id": "phe",
    "name": "Phoenix",
    "latinName": "Phoenix",
    "description": "The Phoenix - A southern constellation representing the mythical bird.",
    "centerX": 243,
    "centerY": 2285,
    "radius": 100,
    "discovered": false,
    "observatory": "southern",
    "stars": [
      {
        "id": "phe-0",
        "x": 110,
        "y": 2205,
        "brightness": 0.8815159933310321
      },
      {
        "id": "phe-1",
        "x": 275,
        "y": 2279,
        "brightness": 0.9662805673525853
      },
      {
        "id": "phe-2",
        "x": 368,
        "y": 2222,
        "brightness": 0.9994757309054684
      },
      {
        "id": "phe-3",
        "x": 380,
        "y": 2318,
        "brightness": 0.9340158144724282
      },
      {
        "id": "phe-4",
        "x": 285,
        "y": 2421,
        "brightness": 0.9352786477056872
      },
      {
        "id": "phe-5",
        "x": 39,
        "y": 2262,
        "brightness": 0.9617258155865084
      }
    ],
    "connections": [
      [
        0,
        1
      ],
      [
        1,
        2
      ],
      [
        2,
        3
      ],
      [
        3,
        4
      ],
      [
        4,
        1
      ],
      [
        1,
        5
      ],
      [
        5,
        0
      ]
    ],
    "set": "birds"
  },
  {
    "id": "pic",
    "name": "Pictor",
    "latinName": "Pictor",
    "description": "The Painter's Easel - A faint southern constellation.",
    "centerX": 1535,
    "centerY": 2440,
    "radius": 100,
    "discovered": false,
    "observatory": "southern",
    "stars": [
      {
        "id": "pic-0",
        "x": 1701,
        "y": 2532,
        "brightness": 0.8706143177902081
      },
      {
        "id": "pic-1",
        "x": 1458,
        "y": 2436,
        "brightness": 0.9705366965890998
      },
      {
        "id": "pic-2",
        "x": 1447,
        "y": 2351,
        "brightness": 0.8794071564107162
      }
    ],
    "connections": [
      [
        0,
        1
      ],
      [
        1,
        2
      ]
    ],
    "set": "instruments"
  },
  {
    "id": "psa",
    "name": "Piscis Austrinus",
    "latinName": "Piscis Austrinus",
    "description": "The Southern Fish - Contains bright Fomalhaut.",
    "centerX": 5614,
    "centerY": 2024,
    "radius": 100,
    "discovered": false,
    "observatory": "southern",
    "stars": [
      {
        "id": "psa-0",
        "x": 5669,
        "y": 1951,
        "brightness": 0.8173142179137206
      },
      {
        "id": "psa-1",
        "x": 5740,
        "y": 1994,
        "brightness": 0.8679648591151496
      },
      {
        "id": "psa-2",
        "x": 5733,
        "y": 2042,
        "brightness": 0.8640983132651506
      },
      {
        "id": "psa-3",
        "x": 5719,
        "y": 2048,
        "brightness": 0.8293613261715242
      },
      {
        "id": "psa-4",
        "x": 5631,
        "y": 2039,
        "brightness": 0.8062369619907787
      },
      {
        "id": "psa-5",
        "x": 5535,
        "y": 2050,
        "brightness": 0.845835945974486
      },
      {
        "id": "psa-6",
        "x": 5437,
        "y": 2050,
        "brightness": 0.8651226634901257
      },
      {
        "id": "psa-7",
        "x": 5449,
        "y": 2015,
        "brightness": 0.8519572352849939
      }
    ],
    "connections": [
      [
        0,
        1
      ],
      [
        1,
        2
      ],
      [
        2,
        3
      ],
      [
        3,
        4
      ],
      [
        4,
        5
      ],
      [
        5,
        6
      ],
      [
        6,
        7
      ],
      [
        7,
        5
      ],
      [
        5,
        0
      ]
    ],
    "set": "waters"
  },
  {
    "id": "pup",
    "name": "Puppis",
    "latinName": "Puppis",
    "description": "The Stern - Part of the ancient ship Argo Navis.",
    "centerX": 1927,
    "centerY": 2030,
    "radius": 100,
    "discovered": false,
    "observatory": "southern",
    "stars": [
      {
        "id": "pup-0",
        "x": 1657,
        "y": 2220,
        "brightness": 0.8825591774934303
      },
      {
        "id": "pup-1",
        "x": 1821,
        "y": 2118,
        "brightness": 0.9615357632732143
      },
      {
        "id": "pup-2",
        "x": 1897,
        "y": 1973,
        "brightness": 0.9500665807578159
      },
      {
        "id": "pup-3",
        "x": 1912,
        "y": 1947,
        "brightness": 0.9844293818429337
      },
      {
        "id": "pup-4",
        "x": 1955,
        "y": 1914,
        "brightness": 0.890720129743307
      },
      {
        "id": "pup-5",
        "x": 1987,
        "y": 1881,
        "brightness": 0.9895183314026903
      },
      {
        "id": "pup-6",
        "x": 2031,
        "y": 1905,
        "brightness": 0.8029373538590434
      },
      {
        "id": "pup-7",
        "x": 2015,
        "y": 2167,
        "brightness": 0.8096121514760684
      },
      {
        "id": "pup-8",
        "x": 2040,
        "y": 2289,
        "brightness": 0.9876014855258036
      },
      {
        "id": "pup-9",
        "x": 1950,
        "y": 1932,
        "brightness": 0.9562201673171213
      },
      {
        "id": "pup-10",
        "x": 1933,
        "y": 1983,
        "brightness": 0.875452043370325
      }
    ],
    "connections": [
      [
        0,
        1
      ],
      [
        1,
        2
      ],
      [
        2,
        3
      ],
      [
        3,
        4
      ],
      [
        4,
        5
      ],
      [
        5,
        6
      ],
      [
        6,
        7
      ],
      [
        7,
        8
      ],
      [
        4,
        9
      ],
      [
        9,
        10
      ],
      [
        10,
        2
      ]
    ],
    "set": "argo"
  },
  {
    "id": "pyx",
    "name": "Pyxis",
    "latinName": "Pyxis",
    "description": "The Compass - Represents a ship's compass.",
    "centerX": 2144,
    "centerY": 2068,
    "radius": 100,
    "discovered": false,
    "observatory": "southern",
    "stars": [
      {
        "id": "pyx-0",
        "x": 2015,
        "y": 2167,
        "brightness": 0.9123169410664539
      },
      {
        "id": "pyx-1",
        "x": 2167,
        "y": 2088,
        "brightness": 0.8271716473055335
      },
      {
        "id": "pyx-2",
        "x": 2182,
        "y": 2053,
        "brightness": 0.8488962425570431
      },
      {
        "id": "pyx-3",
        "x": 2211,
        "y": 1962,
        "brightness": 0.8168145718267559
      }
    ],
    "connections": [
      [
        0,
        1
      ],
      [
        1,
        2
      ],
      [
        2,
        3
      ]
    ],
    "set": "argo"
  },
  {
    "id": "ret",
    "name": "Reticulum",
    "latinName": "Reticulum",
    "description": "The Reticle - A small southern constellation.",
    "centerX": 1015,
    "centerY": 2533,
    "radius": 100,
    "discovered": false,
    "observatory": "southern",
    "stars": [
      {
        "id": "ret-0",
        "x": 1060,
        "y": 2541,
        "brightness": 0.9559366623789922
      },
      {
        "id": "ret-1",
        "x": 1069,
        "y": 2488,
        "brightness": 0.9029519659440427
      },
      {
        "id": "ret-2",
        "x": 995,
        "y": 2523,
        "brightness": 0.8862316527927726
      },
      {
        "id": "ret-3",
        "x": 934,
        "y": 2580,
        "brightness": 0.8933390297526117
      }
    ],
    "connections": [
      [
        0,
        1
      ],
      [
        1,
        2
      ],
      [
        2,
        3
      ],
      [
        3,
        0
      ]
    ],
    "set": "instruments"
  },
  {
    "id": "sgr",
    "name": "Sagittarius",
    "latinName": "Sagittarius",
    "description": "The Archer - Points toward the galactic center.",
    "centerX": 4767,
    "centerY": 1961,
    "radius": 100,
    "discovered": false,
    "observatory": "southern",
    "stars": [
      {
        "id": "sgr-0",
        "x": 4573,
        "y": 2113,
        "brightness": 0.9512633442492763
      },
      {
        "id": "sgr-1",
        "x": 4601,
        "y": 2073,
        "brightness": 0.8818174971031921
      },
      {
        "id": "sgr-2",
        "x": 4587,
        "y": 1997,
        "brightness": 0.8303650478883117
      },
      {
        "id": "sgr-3",
        "x": 4617,
        "y": 1924,
        "brightness": 0.8653116513409257
      },
      {
        "id": "sgr-4",
        "x": 4557,
        "y": 1851,
        "brightness": 0.8446531238946895
      },
      {
        "id": "sgr-5",
        "x": 4844,
        "y": 2241,
        "brightness": 0.84447730817424
      },
      {
        "id": "sgr-6",
        "x": 4850,
        "y": 2177,
        "brightness": 0.9535287704973786
      },
      {
        "id": "sgr-7",
        "x": 4761,
        "y": 1998,
        "brightness": 0.8040848004198032
      },
      {
        "id": "sgr-8",
        "x": 4690,
        "y": 1950,
        "brightness": 0.8123231313345722
      },
      {
        "id": "sgr-9",
        "x": 4980,
        "y": 2198,
        "brightness": 0.9717971238906248
      },
      {
        "id": "sgr-10",
        "x": 4999,
        "y": 2088,
        "brightness": 0.8831803317033939
      },
      {
        "id": "sgr-11",
        "x": 4983,
        "y": 1938,
        "brightness": 0.976964979805244
      },
      {
        "id": "sgr-12",
        "x": 4903,
        "y": 1915,
        "brightness": 0.8907507450793544
      },
      {
        "id": "sgr-13",
        "x": 4855,
        "y": 1908,
        "brightness": 0.904571893200845
      },
      {
        "id": "sgr-14",
        "x": 4815,
        "y": 1921,
        "brightness": 0.989502512229444
      },
      {
        "id": "sgr-15",
        "x": 4730,
        "y": 1938,
        "brightness": 0.9550005228870875
      },
      {
        "id": "sgr-16",
        "x": 4524,
        "y": 2007,
        "brightness": 0.8507418375056299
      },
      {
        "id": "sgr-17",
        "x": 4779,
        "y": 1961,
        "brightness": 0.8212252350222796
      },
      {
        "id": "sgr-18",
        "x": 4770,
        "y": 1862,
        "brightness": 0.8078913140704578
      },
      {
        "id": "sgr-19",
        "x": 4791,
        "y": 1850,
        "brightness": 0.961257432320045
      },
      {
        "id": "sgr-20",
        "x": 4823,
        "y": 1816,
        "brightness": 0.993103061070739
      },
      {
        "id": "sgr-21",
        "x": 4840,
        "y": 1797,
        "brightness": 0.85521492412042
      },
      {
        "id": "sgr-22",
        "x": 4841,
        "y": 1766,
        "brightness": 0.882173679853451
      },
      {
        "id": "sgr-23",
        "x": 4741,
        "y": 1852,
        "brightness": 0.8885069085199013
      },
      {
        "id": "sgr-24",
        "x": 4726,
        "y": 1879,
        "brightness": 0.8525609086198251
      }
    ],
    "connections": [
      [
        0,
        1
      ],
      [
        1,
        2
      ],
      [
        2,
        3
      ],
      [
        3,
        4
      ],
      [
        5,
        6
      ],
      [
        6,
        7
      ],
      [
        7,
        8
      ],
      [
        8,
        3
      ],
      [
        9,
        10
      ],
      [
        10,
        11
      ],
      [
        11,
        12
      ],
      [
        12,
        13
      ],
      [
        13,
        14
      ],
      [
        14,
        15
      ],
      [
        15,
        8
      ],
      [
        8,
        2
      ],
      [
        2,
        16
      ],
      [
        16,
        1
      ],
      [
        1,
        7
      ],
      [
        7,
        17
      ],
      [
        17,
        15
      ],
      [
        15,
        18
      ],
      [
        18,
        19
      ],
      [
        19,
        20
      ],
      [
        20,
        21
      ],
      [
        21,
        22
      ],
      [
        18,
        23
      ],
      [
        23,
        24
      ],
      [
        24,
        15
      ]
    ],
    "set": "zodiac"
  },
  {
    "id": "sco",
    "name": "Scorpius",
    "latinName": "Scorpius",
    "description": "The Scorpion - A striking zodiac constellation with red Antares.",
    "centerX": 4215,
    "centerY": 2055,
    "radius": 100,
    "discovered": false,
    "observatory": "southern",
    "stars": [
      {
        "id": "sco-0",
        "x": 3995,
        "y": 1935,
        "brightness": 0.8385916002053803
      },
      {
        "id": "sco-1",
        "x": 4001,
        "y": 1877,
        "brightness": 0.8557943454324607
      },
      {
        "id": "sco-2",
        "x": 4023,
        "y": 1830,
        "brightness": 0.9977631293770515
      },
      {
        "id": "sco-3",
        "x": 4088,
        "y": 1927,
        "brightness": 0.8575936060678527
      },
      {
        "id": "sco-4",
        "x": 4123,
        "y": 1941,
        "brightness": 0.8901911858439252
      },
      {
        "id": "sco-5",
        "x": 4150,
        "y": 1970,
        "brightness": 0.9852105263168878
      },
      {
        "id": "sco-6",
        "x": 4209,
        "y": 2072,
        "brightness": 0.8034301079272552
      },
      {
        "id": "sco-7",
        "x": 4216,
        "y": 2134,
        "brightness": 0.8857701349949305
      },
      {
        "id": "sco-8",
        "x": 4227,
        "y": 2206,
        "brightness": 0.8778530591190079
      },
      {
        "id": "sco-9",
        "x": 4301,
        "y": 2221,
        "brightness": 0.8336098481889017
      },
      {
        "id": "sco-10",
        "x": 4405,
        "y": 2217,
        "brightness": 0.9632508632439393
      },
      {
        "id": "sco-11",
        "x": 4448,
        "y": 2169,
        "brightness": 0.8150431304688831
      },
      {
        "id": "sco-12",
        "x": 4427,
        "y": 2151,
        "brightness": 0.980827094886256
      },
      {
        "id": "sco-13",
        "x": 4390,
        "y": 2118,
        "brightness": 0.8903270823316684
      }
    ],
    "connections": [
      [
        0,
        1
      ],
      [
        1,
        2
      ],
      [
        1,
        3
      ],
      [
        3,
        4
      ],
      [
        4,
        5
      ],
      [
        5,
        6
      ],
      [
        6,
        7
      ],
      [
        7,
        8
      ],
      [
        8,
        9
      ],
      [
        9,
        10
      ],
      [
        10,
        11
      ],
      [
        11,
        12
      ],
      [
        12,
        13
      ]
    ],
    "set": "zodiac"
  },
  {
    "id": "scl",
    "name": "Sculptor",
    "latinName": "Sculptor",
    "description": "The Sculptor - Contains the south galactic pole.",
    "centerX": 5978,
    "centerY": 2033,
    "radius": 100,
    "discovered": false,
    "observatory": "southern",
    "stars": [
      {
        "id": "scl-0",
        "x": 244,
        "y": 1989,
        "brightness": 0.9245480182863678
      },
      {
        "id": "scl-1",
        "x": -46,
        "y": 1969,
        "brightness": 0.9714150042256682
      },
      {
        "id": "scl-2",
        "x": -172,
        "y": 2042,
        "brightness": 0.9561433931818096
      },
      {
        "id": "scl-3",
        "x": -113,
        "y": 2130,
        "brightness": 0.8206717394490327
      }
    ],
    "connections": [
      [
        0,
        1
      ],
      [
        1,
        2
      ],
      [
        2,
        3
      ]
    ],
    "set": "instruments"
  },
  {
    "id": "sct",
    "name": "Scutum",
    "latinName": "Scutum",
    "description": "The Shield - A small but distinctive constellation.",
    "centerX": 4661,
    "centerY": 1653,
    "radius": 100,
    "discovered": false,
    "observatory": "southern",
    "stars": [
      {
        "id": "sct-0",
        "x": 4647,
        "y": 1637,
        "brightness": 0.8377307846268215
      },
      {
        "id": "sct-1",
        "x": 4697,
        "y": 1579,
        "brightness": 0.9105744694559162
      },
      {
        "id": "sct-2",
        "x": 4676,
        "y": 1651,
        "brightness": 0.8103478841069628
      },
      {
        "id": "sct-3",
        "x": 4622,
        "y": 1743,
        "brightness": 0.8054527183081841
      }
    ],
    "connections": [
      [
        0,
        1
      ],
      [
        1,
        2
      ],
      [
        2,
        3
      ],
      [
        3,
        0
      ]
    ]
  },
  {
    "id": "ser-2",
    "name": "Serpens",
    "latinName": "Serpens",
    "description": "The Serpent - The only constellation split into two parts.",
    "centerX": 4505,
    "centerY": 1633,
    "radius": 100,
    "discovered": false,
    "observatory": "southern",
    "stars": [
      {
        "id": "ser-2-0",
        "x": 4293,
        "y": 1762,
        "brightness": 0.8087975004033275
      },
      {
        "id": "ser-2-1",
        "x": 4407,
        "y": 1757,
        "brightness": 0.9863506232515857
      },
      {
        "id": "ser-2-2",
        "x": 4496,
        "y": 1663,
        "brightness": 0.8486922232276494
      },
      {
        "id": "ser-2-3",
        "x": 4513,
        "y": 1636,
        "brightness": 0.8281447587077291
      },
      {
        "id": "ser-2-4",
        "x": 4589,
        "y": 1548,
        "brightness": 0.9524651202739871
      },
      {
        "id": "ser-2-5",
        "x": 4734,
        "y": 1430,
        "brightness": 0.8704659556832214
      }
    ],
    "connections": [
      [
        0,
        1
      ],
      [
        1,
        2
      ],
      [
        2,
        3
      ],
      [
        3,
        4
      ],
      [
        4,
        5
      ]
    ]
  },
  {
    "id": "sex",
    "name": "Sextans",
    "latinName": "Sextans",
    "description": "The Sextant - A faint equatorial constellation.",
    "centerX": 2563,
    "centerY": 1550,
    "radius": 100,
    "discovered": false,
    "observatory": "southern",
    "stars": [
      {
        "id": "sex-0",
        "x": 2533,
        "y": 1506,
        "brightness": 0.9824031578217349
      },
      {
        "id": "sex-1",
        "x": 2469,
        "y": 1635,
        "brightness": 0.9365702636275175
      },
      {
        "id": "sex-2",
        "x": 2623,
        "y": 1546,
        "brightness": 0.9656708549453068
      },
      {
        "id": "sex-3",
        "x": 2626,
        "y": 1511,
        "brightness": 0.9630685360479383
      }
    ],
    "connections": [
      [
        0,
        1
      ],
      [
        1,
        2
      ],
      [
        2,
        3
      ]
    ],
    "set": "centaur"
  },
  {
    "id": "tel",
    "name": "Telescopium",
    "latinName": "Telescopium",
    "description": "The Telescope - A small southern constellation.",
    "centerX": 4593,
    "centerY": 2283,
    "radius": 59,
    "discovered": false,
    "observatory": "southern",
    "stars": [
      {
        "id": "tel-0",
        "x": 4547,
        "y": 2266,
        "brightness": 0.8626055308250712
      },
      {
        "id": "tel-1",
        "x": 4612,
        "y": 2266,
        "brightness": 0.9000104604217579
      },
      {
        "id": "tel-2",
        "x": 4620,
        "y": 2318,
        "brightness": 0.9981566516687942
      }
    ],
    "connections": [
      [
        0,
        1
      ],
      [
        1,
        2
      ]
    ],
    "set": "instruments"
  },
  {
    "id": "tra",
    "name": "Triangulum Australe",
    "latinName": "Triangulum Australe",
    "description": "The Southern Triangle - A distinctive southern constellation.",
    "centerX": 4004,
    "centerY": 2617,
    "radius": 100,
    "discovered": false,
    "observatory": "southern",
    "stars": [
      {
        "id": "tra-0",
        "x": 4203,
        "y": 2650,
        "brightness": 0.9519165168651667
      },
      {
        "id": "tra-1",
        "x": 3980,
        "y": 2557,
        "brightness": 0.8358360324495577
      },
      {
        "id": "tra-2",
        "x": 3829,
        "y": 2645,
        "brightness": 0.9938928650093711
      }
    ],
    "connections": [
      [
        0,
        1
      ],
      [
        1,
        2
      ],
      [
        2,
        0
      ]
    ],
    "set": "centaur"
  },
  {
    "id": "tuc",
    "name": "Tucana",
    "latinName": "Tucana",
    "description": "The Toucan - Contains the Small Magellanic Cloud.",
    "centerX": 5872,
    "centerY": 2547,
    "radius": 100,
    "discovered": false,
    "observatory": "southern",
    "stars": [
      {
        "id": "tuc-0",
        "x": -423,
        "y": 2504,
        "brightness": 0.9378524758174054
      },
      {
        "id": "tuc-1",
        "x": -177,
        "y": 2471,
        "brightness": 0.9730749883493461
      },
      {
        "id": "tuc-2",
        "x": 131,
        "y": 2549,
        "brightness": 0.8667526382527393
      },
      {
        "id": "tuc-3",
        "x": 84,
        "y": 2581,
        "brightness": 0.9126668966920307
      },
      {
        "id": "tuc-4",
        "x": 0,
        "y": 2593,
        "brightness": 0.8981599952746229
      },
      {
        "id": "tuc-5",
        "x": -386,
        "y": 2583,
        "brightness": 0.9676048558212889
      }
    ],
    "connections": [
      [
        0,
        1
      ],
      [
        1,
        2
      ],
      [
        2,
        3
      ],
      [
        3,
        4
      ],
      [
        4,
        5
      ],
      [
        5,
        0
      ]
    ],
    "set": "birds"
  },
  {
    "id": "vel",
    "name": "Vela",
    "latinName": "Vela",
    "description": "The Sails - Part of the ancient ship Argo Navis.",
    "centerX": 2372,
    "centerY": 2306,
    "radius": 100,
    "discovered": false,
    "observatory": "southern",
    "stars": [
      {
        "id": "vel-0",
        "x": 2186,
        "y": 2412,
        "brightness": 0.8243727523378922
      },
      {
        "id": "vel-1",
        "x": 2342,
        "y": 2417,
        "brightness": 0.8850285947511517
      },
      {
        "id": "vel-2",
        "x": 2487,
        "y": 2409,
        "brightness": 0.9533820948975937
      },
      {
        "id": "vel-3",
        "x": 2695,
        "y": 2324,
        "brightness": 0.9195633123086012
      },
      {
        "id": "vel-4",
        "x": 2561,
        "y": 2202,
        "brightness": 0.922140379279194
      },
      {
        "id": "vel-5",
        "x": 2378,
        "y": 2174,
        "brightness": 0.9899010139559334
      },
      {
        "id": "vel-6",
        "x": 2283,
        "y": 2224,
        "brightness": 0.8308547964799462
      },
      {
        "id": "vel-7",
        "x": 2040,
        "y": 2289,
        "brightness": 0.900899755846368
      }
    ],
    "connections": [
      [
        0,
        1
      ],
      [
        1,
        2
      ],
      [
        2,
        3
      ],
      [
        3,
        4
      ],
      [
        4,
        5
      ],
      [
        5,
        6
      ],
      [
        6,
        7
      ]
    ],
    "set": "argo"
  },
  {
    "id": "vir",
    "name": "Virgo",
    "latinName": "Virgo",
    "description": "The Maiden - The second-largest constellation with bright Spica.",
    "centerX": 3318,
    "centerY": 1506,
    "radius": 100,
    "discovered": false,
    "observatory": "southern",
    "stars": [
      {
        "id": "vir-0",
        "x": 2941,
        "y": 1391,
        "brightness": 0.8124477820779787
      },
      {
        "id": "vir-1",
        "x": 2961,
        "y": 1471,
        "brightness": 0.8112523001898236
      },
      {
        "id": "vir-2",
        "x": 3083,
        "y": 1511,
        "brightness": 0.8234221097273043
      },
      {
        "id": "vir-3",
        "x": 3174,
        "y": 1524,
        "brightness": 0.9034627944381266
      },
      {
        "id": "vir-4",
        "x": 3291,
        "y": 1592,
        "brightness": 0.9833854300463666
      },
      {
        "id": "vir-5",
        "x": 3355,
        "y": 1686,
        "brightness": 0.9667195789042042
      },
      {
        "id": "vir-6",
        "x": 3567,
        "y": 1600,
        "brightness": 0.9320635943838315
      },
      {
        "id": "vir-7",
        "x": 3679,
        "y": 1594,
        "brightness": 0.9702136697449237
      },
      {
        "id": "vir-8",
        "x": 3259,
        "y": 1317,
        "brightness": 0.914716745615606
      },
      {
        "id": "vir-9",
        "x": 3232,
        "y": 1443,
        "brightness": 0.851568754022226
      },
      {
        "id": "vir-10",
        "x": 3395,
        "y": 1510,
        "brightness": 0.8222087566951789
      },
      {
        "id": "vir-11",
        "x": 3507,
        "y": 1474,
        "brightness": 0.824282774766779
      },
      {
        "id": "vir-12",
        "x": 3693,
        "y": 1468,
        "brightness": 0.810710319355084
      }
    ],
    "connections": [
      [
        0,
        1
      ],
      [
        1,
        2
      ],
      [
        2,
        3
      ],
      [
        3,
        4
      ],
      [
        4,
        5
      ],
      [
        5,
        6
      ],
      [
        6,
        7
      ],
      [
        8,
        9
      ],
      [
        9,
        3
      ],
      [
        4,
        10
      ],
      [
        10,
        11
      ],
      [
        11,
        12
      ]
    ],
    "set": "zodiac"
  },
  {
    "id": "vol",
    "name": "Volans",
    "latinName": "Volans",
    "description": "The Flying Fish - A small southern constellation.",
    "centerX": 2001,
    "centerY": 2632,
    "radius": 100,
    "discovered": false,
    "observatory": "southern",
    "stars": [
      {
        "id": "vol-0",
        "x": 2260,
        "y": 2607,
        "brightness": 0.9640106646371132
      },
      {
        "id": "vol-1",
        "x": 2107,
        "y": 2602,
        "brightness": 0.8363170234166893
      },
      {
        "id": "vol-2",
        "x": 2033,
        "y": 2644,
        "brightness": 0.8529787389518142
      },
      {
        "id": "vol-3",
        "x": 1820,
        "y": 2633,
        "brightness": 0.9955115328298534
      },
      {
        "id": "vol-4",
        "x": 1786,
        "y": 2675,
        "brightness": 0.8616923686621855
      }
    ],
    "connections": [
      [
        0,
        1
      ],
      [
        1,
        2
      ],
      [
        2,
        3
      ],
      [
        3,
        4
      ],
      [
        4,
        2
      ],
      [
        2,
        0
      ]
    ],
    "set": "waters"
  }
];

export function getConstellation(id: string): ConstellationData | undefined {
  return CONSTELLATIONS.find(c => c.id === id);
}

export function getUndiscoveredConstellations(): ConstellationData[] {
  return CONSTELLATIONS.filter(c => !c.discovered);
}

export function getDiscoveredConstellations(): ConstellationData[] {
  return CONSTELLATIONS.filter(c => c.discovered);
}

export function getConstellationsByObservatory(observatory: Observatory): ConstellationData[] {
  return CONSTELLATIONS.filter(c => c.observatory === observatory);
}
