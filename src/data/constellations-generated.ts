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
    "centerX": 6137,
    "centerY": 866,
    "radius": 100,
    "discovered": false,
    "observatory": "northern",
    "stars": [
      {
        "id": "and-0",
        "x": 6516,
        "y": 795,
        "brightness": 0.9620375792412359
      },
      {
        "id": "and-1",
        "x": 6291,
        "y": 906,
        "brightness": 0.9539600694919892
      },
      {
        "id": "and-2",
        "x": 6164,
        "y": 986,
        "brightness": 0.8442559488824752
      },
      {
        "id": "and-3",
        "x": 6035,
        "y": 1015,
        "brightness": 0.9066089978527462
      },
      {
        "id": "and-4",
        "x": 6238,
        "y": 1110,
        "brightness": 0.8190373602716711
      },
      {
        "id": "and-5",
        "x": 6197,
        "y": 1096,
        "brightness": 0.8078582302172482
      },
      {
        "id": "and-6",
        "x": 6161,
        "y": 1011,
        "brightness": 0.8617579805036171
      },
      {
        "id": "and-7",
        "x": 6154,
        "y": 938,
        "brightness": 0.8695561889308879
      },
      {
        "id": "and-8",
        "x": 5909,
        "y": 779,
        "brightness": 0.9525175041596396
      },
      {
        "id": "and-9",
        "x": 5758,
        "y": 795,
        "brightness": 0.8787642494797793
      },
      {
        "id": "and-10",
        "x": 5918,
        "y": 761,
        "brightness": 0.9706663090860288
      },
      {
        "id": "and-11",
        "x": 5907,
        "y": 726,
        "brightness": 0.9590802117976294
      },
      {
        "id": "and-12",
        "x": 6236,
        "y": 858,
        "brightness": 0.9147656992589484
      },
      {
        "id": "and-13",
        "x": 6208,
        "y": 815,
        "brightness": 0.8561203879625044
      },
      {
        "id": "and-14",
        "x": 6290,
        "y": 713,
        "brightness": 0.9794980302752021
      },
      {
        "id": "and-15",
        "x": 6408,
        "y": 690,
        "brightness": 0.8405811359544688
      },
      {
        "id": "and-16",
        "x": 5942,
        "y": 726,
        "brightness": 0.8717961126497221
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
        "brightness": 0.8311662195289986
      },
      {
        "id": "aql-1",
        "x": 4962,
        "y": 1352,
        "brightness": 0.8480625825820228
      },
      {
        "id": "aql-2",
        "x": 4980,
        "y": 1393,
        "brightness": 0.8585178797244517
      },
      {
        "id": "aql-3",
        "x": 5047,
        "y": 1514,
        "brightness": 0.916655561314364
      },
      {
        "id": "aql-4",
        "x": 4969,
        "y": 1483,
        "brightness": 0.8056836865502524
      },
      {
        "id": "aql-5",
        "x": 4856,
        "y": 1448,
        "brightness": 0.8652493358414441
      },
      {
        "id": "aql-6",
        "x": 4773,
        "y": 1269,
        "brightness": 0.953390902994255
      },
      {
        "id": "aql-7",
        "x": 4776,
        "y": 1581,
        "brightness": 0.9883859285284333
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
        "brightness": 0.8922248274391695
      },
      {
        "id": "ari-1",
        "x": 530,
        "y": 1109,
        "brightness": 0.8642925443124844
      },
      {
        "id": "ari-2",
        "x": 478,
        "y": 1153,
        "brightness": 0.838519434208359
      },
      {
        "id": "ari-3",
        "x": 473,
        "y": 1178,
        "brightness": 0.8157015636762219
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
        "brightness": 0.8473921615656506
      },
      {
        "id": "aur-1",
        "x": 1320,
        "y": 733,
        "brightness": 0.8609393411401669
      },
      {
        "id": "aur-2",
        "x": 1277,
        "y": 813,
        "brightness": 0.9919329587739957
      },
      {
        "id": "aur-3",
        "x": 1237,
        "y": 947,
        "brightness": 0.9918777025011927
      },
      {
        "id": "aur-4",
        "x": 1360,
        "y": 1023,
        "brightness": 0.9702992811920857
      },
      {
        "id": "aur-5",
        "x": 1499,
        "y": 880,
        "brightness": 0.8216339313128991
      },
      {
        "id": "aur-6",
        "x": 1498,
        "y": 595,
        "brightness": 0.8801322635398034
      },
      {
        "id": "aur-7",
        "x": 1258,
        "y": 770,
        "brightness": 0.9032729308386923
      },
      {
        "id": "aur-8",
        "x": 1260,
        "y": 815,
        "brightness": 0.8936522084137619
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
        "brightness": 0.8539275462512984
      },
      {
        "id": "boo-1",
        "x": 3478,
        "y": 1193,
        "brightness": 0.8640101501359819
      },
      {
        "id": "boo-2",
        "x": 3565,
        "y": 1180,
        "brightness": 0.8668974812473763
      },
      {
        "id": "boo-3",
        "x": 3633,
        "y": 994,
        "brightness": 0.9303742408547278
      },
      {
        "id": "boo-4",
        "x": 3634,
        "y": 862,
        "brightness": 0.8587432341740229
      },
      {
        "id": "boo-5",
        "x": 3758,
        "y": 827,
        "brightness": 0.9209741304861594
      },
      {
        "id": "boo-6",
        "x": 3815,
        "y": 945,
        "brightness": 0.9956573969075023
      },
      {
        "id": "boo-7",
        "x": 3687,
        "y": 1049,
        "brightness": 0.8399943938471383
      },
      {
        "id": "boo-8",
        "x": 3671,
        "y": 1271,
        "brightness": 0.8183823621962341
      },
      {
        "id": "boo-9",
        "x": 3568,
        "y": 732,
        "brightness": 0.8346791490284258
      },
      {
        "id": "boo-10",
        "x": 3556,
        "y": 637,
        "brightness": 0.8921158501447553
      },
      {
        "id": "boo-11",
        "x": 3605,
        "y": 636,
        "brightness": 0.8321847568868502
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
        "brightness": 0.8763445322059121
      },
      {
        "id": "cam-1",
        "x": 1264,
        "y": 493,
        "brightness": 0.9118687083815054
      },
      {
        "id": "cam-2",
        "x": 1225,
        "y": 394,
        "brightness": 0.9828701862453584
      },
      {
        "id": "cam-3",
        "x": 960,
        "y": 311,
        "brightness": 0.9513330805815039
      },
      {
        "id": "cam-4",
        "x": 956,
        "y": 408,
        "brightness": 0.9779590463668599
      },
      {
        "id": "cam-5",
        "x": 871,
        "y": 501,
        "brightness": 0.9246127428979205
      },
      {
        "id": "cam-6",
        "x": 1579,
        "y": 345,
        "brightness": 0.8759038507193742
      },
      {
        "id": "cam-7",
        "x": 1750,
        "y": 217,
        "brightness": 0.8208516462438068
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
        "brightness": 0.9932500409496179
      },
      {
        "id": "cnc-1",
        "x": 2186,
        "y": 1197,
        "brightness": 0.9072884567326159
      },
      {
        "id": "cnc-2",
        "x": 2180,
        "y": 1142,
        "brightness": 0.953886799437287
      },
      {
        "id": "cnc-3",
        "x": 2194,
        "y": 1021,
        "brightness": 0.8051888190114975
      },
      {
        "id": "cnc-4",
        "x": 2069,
        "y": 1347,
        "brightness": 0.9892711666663944
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
        "brightness": 0.8037113796575756
      },
      {
        "id": "cvn-1",
        "x": 3141,
        "y": 811,
        "brightness": 0.9860565806409667
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
        "brightness": 0.8616559703101181
      },
      {
        "id": "cmi-1",
        "x": 1863,
        "y": 1362,
        "brightness": 0.8961333321863543
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
        "brightness": 0.9097474323387396
      },
      {
        "id": "cas-1",
        "x": 358,
        "y": 496,
        "brightness": 0.8355579724612648
      },
      {
        "id": "cas-2",
        "x": 236,
        "y": 488,
        "brightness": 0.9148980960650501
      },
      {
        "id": "cas-3",
        "x": 169,
        "y": 558,
        "brightness": 0.9552904107154736
      },
      {
        "id": "cas-4",
        "x": 38,
        "y": 514,
        "brightness": 0.9275716322542573
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
        "brightness": 0.8935790009328494
      },
      {
        "id": "cep-1",
        "x": 5189,
        "y": 469,
        "brightness": 0.8173236410228053
      },
      {
        "id": "cep-2",
        "x": 5327,
        "y": 457,
        "brightness": 0.97929040245382
      },
      {
        "id": "cep-3",
        "x": 5431,
        "y": 520,
        "brightness": 0.8206677016687691
      },
      {
        "id": "cep-4",
        "x": 5563,
        "y": 549,
        "brightness": 0.9131897110976548
      },
      {
        "id": "cep-5",
        "x": 5545,
        "y": 530,
        "brightness": 0.8451883081814345
      },
      {
        "id": "cep-6",
        "x": 5622,
        "y": 526,
        "brightness": 0.8233080849713088
      },
      {
        "id": "cep-7",
        "x": 5707,
        "y": 397,
        "brightness": 0.9751814272928662
      },
      {
        "id": "cep-8",
        "x": 5914,
        "y": 206,
        "brightness": 0.9034271135977292
      },
      {
        "id": "cep-9",
        "x": 5369,
        "y": 324,
        "brightness": 0.85714794196135
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
        "brightness": 0.9430047650157299
      },
      {
        "id": "com-1",
        "x": 3299,
        "y": 1035,
        "brightness": 0.979152809837747
      },
      {
        "id": "com-2",
        "x": 3112,
        "y": 1029,
        "brightness": 0.9223670805711096
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
        "brightness": 0.9073657127484523
      },
      {
        "id": "crb-1",
        "x": 3866,
        "y": 1015,
        "brightness": 0.8908890948877349
      },
      {
        "id": "crb-2",
        "x": 3895,
        "y": 1055,
        "brightness": 0.859485090931614
      },
      {
        "id": "crb-3",
        "x": 3928,
        "y": 1062,
        "brightness": 0.9599141162523968
      },
      {
        "id": "crb-4",
        "x": 3957,
        "y": 1066,
        "brightness": 0.9185153496858479
      },
      {
        "id": "crb-5",
        "x": 3990,
        "y": 1052,
        "brightness": 0.9642170374423666
      },
      {
        "id": "crb-6",
        "x": 4006,
        "y": 1002,
        "brightness": 0.9646267469784564
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
        "brightness": 0.8504890200842548
      },
      {
        "id": "cyg-1",
        "x": 5193,
        "y": 934,
        "brightness": 0.8180230529393824
      },
      {
        "id": "cyg-2",
        "x": 5093,
        "y": 829,
        "brightness": 0.9034269731492583
      },
      {
        "id": "cyg-3",
        "x": 4937,
        "y": 748,
        "brightness": 0.9599865688424805
      },
      {
        "id": "cyg-4",
        "x": 4874,
        "y": 638,
        "brightness": 0.8410474676071025
      },
      {
        "id": "cyg-5",
        "x": 4821,
        "y": 611,
        "brightness": 0.8935455968638081
      },
      {
        "id": "cyg-6",
        "x": 5173,
        "y": 745,
        "brightness": 0.9621251010320908
      },
      {
        "id": "cyg-7",
        "x": 4985,
        "y": 915,
        "brightness": 0.9749130073582575
      },
      {
        "id": "cyg-8",
        "x": 4878,
        "y": 1034,
        "brightness": 0.931618008797589
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
        "brightness": 0.8425755544025968
      },
      {
        "id": "del-1",
        "x": 5156,
        "y": 1257,
        "brightness": 0.9917086963853232
      },
      {
        "id": "del-2",
        "x": 5165,
        "y": 1235,
        "brightness": 0.960863781644409
      },
      {
        "id": "del-3",
        "x": 5194,
        "y": 1231,
        "brightness": 0.8103362155052373
      },
      {
        "id": "del-4",
        "x": 5181,
        "y": 1249,
        "brightness": 0.8664538031023676
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
        "brightness": 0.8969924348010511
      },
      {
        "id": "dra-1",
        "x": 4486,
        "y": 642,
        "brightness": 0.9346478965003903
      },
      {
        "id": "dra-2",
        "x": 4377,
        "y": 628,
        "brightness": 0.9288886792177382
      },
      {
        "id": "dra-3",
        "x": 4384,
        "y": 580,
        "brightness": 0.8294873582921167
      },
      {
        "id": "dra-4",
        "x": 4802,
        "y": 372,
        "brightness": 0.9054574268024973
      },
      {
        "id": "dra-5",
        "x": 4586,
        "y": 311,
        "brightness": 0.8214009925054847
      },
      {
        "id": "dra-6",
        "x": 4287,
        "y": 405,
        "brightness": 0.9015847493308244
      },
      {
        "id": "dra-7",
        "x": 4100,
        "y": 475,
        "brightness": 0.9531668946055786
      },
      {
        "id": "dra-8",
        "x": 4008,
        "y": 524,
        "brightness": 0.9170498695699878
      },
      {
        "id": "dra-9",
        "x": 3854,
        "y": 517,
        "brightness": 0.9978249956415447
      },
      {
        "id": "dra-10",
        "x": 3518,
        "y": 427,
        "brightness": 0.8089228515801359
      },
      {
        "id": "dra-11",
        "x": 3140,
        "y": 337,
        "brightness": 0.9716582475566861
      },
      {
        "id": "dra-12",
        "x": 2881,
        "y": 344,
        "brightness": 0.9604556637661621
      },
      {
        "id": "dra-13",
        "x": 4588,
        "y": 288,
        "brightness": 0.83770613304065
      },
      {
        "id": "dra-14",
        "x": 4951,
        "y": 329,
        "brightness": 0.9180188522058751
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
        "brightness": 0.9132170640475785
      },
      {
        "id": "equ-1",
        "x": 5310,
        "y": 1333,
        "brightness": 0.8585041549047774
      },
      {
        "id": "equ-2",
        "x": 5293,
        "y": 1331,
        "brightness": 0.9004940416559882
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
        "brightness": 0.8304466187228083
      },
      {
        "id": "gem-1",
        "x": 1596,
        "y": 1125,
        "brightness": 0.9664063368039836
      },
      {
        "id": "gem-2",
        "x": 1683,
        "y": 1081,
        "brightness": 0.9861864867849189
      },
      {
        "id": "gem-3",
        "x": 1796,
        "y": 996,
        "brightness": 0.8586036120265661
      },
      {
        "id": "gem-4",
        "x": 1894,
        "y": 969,
        "brightness": 0.9349379520634513
      },
      {
        "id": "gem-5",
        "x": 1939,
        "y": 1033,
        "brightness": 0.8409463094073719
      },
      {
        "id": "gem-6",
        "x": 1900,
        "y": 1052,
        "brightness": 0.9145754820793083
      },
      {
        "id": "gem-7",
        "x": 1834,
        "y": 1134,
        "brightness": 0.915759044781348
      },
      {
        "id": "gem-8",
        "x": 1767,
        "y": 1157,
        "brightness": 0.8320694409382909
      },
      {
        "id": "gem-9",
        "x": 1657,
        "y": 1227,
        "brightness": 0.8660299472115498
      },
      {
        "id": "gem-10",
        "x": 1689,
        "y": 1285,
        "brightness": 0.9906871455969046
      },
      {
        "id": "gem-11",
        "x": 1825,
        "y": 1224,
        "brightness": 0.8681793323095665
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
        "brightness": 0.8112535537833772
      },
      {
        "id": "her-1",
        "x": 4126,
        "y": 1142,
        "brightness": 0.9029838319087654
      },
      {
        "id": "her-2",
        "x": 4172,
        "y": 973,
        "brightness": 0.8433737457929767
      },
      {
        "id": "her-3",
        "x": 4179,
        "y": 851,
        "brightness": 0.8624579135720006
      },
      {
        "id": "her-4",
        "x": 4142,
        "y": 793,
        "brightness": 0.8683687390699499
      },
      {
        "id": "her-5",
        "x": 4082,
        "y": 728,
        "brightness": 0.8327481652703501
      },
      {
        "id": "her-6",
        "x": 4037,
        "y": 751,
        "brightness": 0.9540888064613119
      },
      {
        "id": "her-7",
        "x": 3969,
        "y": 792,
        "brightness": 0.9173139476235086
      },
      {
        "id": "her-8",
        "x": 4251,
        "y": 985,
        "brightness": 0.9563907889372049
      },
      {
        "id": "her-9",
        "x": 4313,
        "y": 887,
        "brightness": 0.932812713470027
      },
      {
        "id": "her-10",
        "x": 4484,
        "y": 879,
        "brightness": 0.946748617914126
      },
      {
        "id": "her-11",
        "x": 4349,
        "y": 881,
        "brightness": 0.9250629815782804
      },
      {
        "id": "her-12",
        "x": 4313,
        "y": 1086,
        "brightness": 0.8469611398305601
      },
      {
        "id": "her-13",
        "x": 4444,
        "y": 1038,
        "brightness": 0.9999811020856749
      },
      {
        "id": "her-14",
        "x": 4491,
        "y": 1013,
        "brightness": 0.8493890421180262
      },
      {
        "id": "her-15",
        "x": 4531,
        "y": 1021,
        "brightness": 0.8254798308529275
      },
      {
        "id": "her-16",
        "x": 4311,
        "y": 1260,
        "brightness": 0.8401395796134106
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
        "brightness": 0.9879142386017152
      },
      {
        "id": "lac-1",
        "x": 5630,
        "y": 662,
        "brightness": 0.9563045930057037
      },
      {
        "id": "lac-2",
        "x": 5623,
        "y": 705,
        "brightness": 0.8775776503541179
      },
      {
        "id": "lac-3",
        "x": 5588,
        "y": 724,
        "brightness": 0.961696137860468
      },
      {
        "id": "lac-4",
        "x": 5627,
        "y": 781,
        "brightness": 0.9117217305559226
      },
      {
        "id": "lac-5",
        "x": 5669,
        "y": 762,
        "brightness": 0.8594198554325935
      },
      {
        "id": "lac-6",
        "x": 5602,
        "y": 675,
        "brightness": 0.8395854546799887
      },
      {
        "id": "lac-7",
        "x": 5558,
        "y": 838,
        "brightness": 0.8839460618876146
      },
      {
        "id": "lac-8",
        "x": 5567,
        "y": 871,
        "brightness": 0.971198161523315
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
        "brightness": 0.8931815982655413
      },
      {
        "id": "leo-1",
        "x": 2531,
        "y": 1221,
        "brightness": 0.9219666669719105
      },
      {
        "id": "leo-2",
        "x": 2583,
        "y": 1169,
        "brightness": 0.9940274468834429
      },
      {
        "id": "leo-3",
        "x": 2809,
        "y": 1158,
        "brightness": 0.818326729787653
      },
      {
        "id": "leo-4",
        "x": 2954,
        "y": 1257,
        "brightness": 0.8309429765784608
      },
      {
        "id": "leo-5",
        "x": 2809,
        "y": 1243,
        "brightness": 0.964352856708887
      },
      {
        "id": "leo-6",
        "x": 2570,
        "y": 1110,
        "brightness": 0.8039701160564002
      },
      {
        "id": "leo-7",
        "x": 2470,
        "y": 1067,
        "brightness": 0.8269286677065875
      },
      {
        "id": "leo-8",
        "x": 2441,
        "y": 1104,
        "brightness": 0.9073488539461136
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
        "brightness": 0.8182847549414738
      },
      {
        "id": "lmi-1",
        "x": 2608,
        "y": 937,
        "brightness": 0.9945456275475546
      },
      {
        "id": "lmi-2",
        "x": 2722,
        "y": 930,
        "brightness": 0.9633690125399934
      },
      {
        "id": "lmi-3",
        "x": 2616,
        "y": 888,
        "brightness": 0.8905582865237518
      },
      {
        "id": "lmi-4",
        "x": 2393,
        "y": 893,
        "brightness": 0.9299422528727559
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
        "brightness": 0.9294196128833819
      },
      {
        "id": "lyn-1",
        "x": 1739,
        "y": 526,
        "brightness": 0.9541779560870935
      },
      {
        "id": "lyn-2",
        "x": 1861,
        "y": 680,
        "brightness": 0.8247173967549387
      },
      {
        "id": "lyn-3",
        "x": 2095,
        "y": 780,
        "brightness": 0.8060426167968207
      },
      {
        "id": "lyn-4",
        "x": 2253,
        "y": 804,
        "brightness": 0.9444591881799592
      },
      {
        "id": "lyn-5",
        "x": 2329,
        "y": 887,
        "brightness": 0.83226266357659
      },
      {
        "id": "lyn-6",
        "x": 2338,
        "y": 927,
        "brightness": 0.989520398771585
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
        "brightness": 0.8426054298807932
      },
      {
        "id": "lyr-1",
        "x": 4685,
        "y": 840,
        "brightness": 0.9328597477303181
      },
      {
        "id": "lyr-2",
        "x": 4654,
        "y": 854,
        "brightness": 0.8405077290743308
      },
      {
        "id": "lyr-3",
        "x": 4727,
        "y": 885,
        "brightness": 0.9940896155027497
      },
      {
        "id": "lyr-4",
        "x": 4746,
        "y": 955,
        "brightness": 0.8880265318680564
      },
      {
        "id": "lyr-5",
        "x": 4709,
        "y": 944,
        "brightness": 0.9555006604630225
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
        "brightness": 0.9351255173859502
      },
      {
        "id": "ori-1",
        "x": 1477,
        "y": 1162,
        "brightness": 0.9187980348543612
      },
      {
        "id": "ori-2",
        "x": 1516,
        "y": 1164,
        "brightness": 0.9869022567080086
      },
      {
        "id": "ori-3",
        "x": 1550,
        "y": 1263,
        "brightness": 0.9379482974637042
      },
      {
        "id": "ori-4",
        "x": 1510,
        "y": 1339,
        "brightness": 0.8240934272873859
      },
      {
        "id": "ori-5",
        "x": 1480,
        "y": 1377,
        "brightness": 0.8464623066192472
      },
      {
        "id": "ori-6",
        "x": 1355,
        "y": 1394,
        "brightness": 0.9115640390340807
      },
      {
        "id": "ori-7",
        "x": 1229,
        "y": 1331,
        "brightness": 0.9382822024070834
      },
      {
        "id": "ori-8",
        "x": 1244,
        "y": 1471,
        "brightness": 0.8980058604553982
      },
      {
        "id": "ori-9",
        "x": 1226,
        "y": 1459,
        "brightness": 0.9374418459868579
      },
      {
        "id": "ori-10",
        "x": 1213,
        "y": 1407,
        "brightness": 0.8992285494106026
      },
      {
        "id": "ori-11",
        "x": 1208,
        "y": 1384,
        "brightness": 0.8751891563129345
      },
      {
        "id": "ori-12",
        "x": 1211,
        "y": 1352,
        "brightness": 0.9723306623265647
      },
      {
        "id": "ori-13",
        "x": 1235,
        "y": 1275,
        "brightness": 0.8573028772822519
      },
      {
        "id": "ori-14",
        "x": 1269,
        "y": 1243,
        "brightness": 0.8128038276958169
      },
      {
        "id": "ori-15",
        "x": 1290,
        "y": 1240,
        "brightness": 0.977529303035633
      },
      {
        "id": "ori-16",
        "x": 1311,
        "y": 1637,
        "brightness": 0.9944540944434281
      },
      {
        "id": "ori-17",
        "x": 1352,
        "y": 1540,
        "brightness": 0.8972995067069359
      },
      {
        "id": "ori-18",
        "x": 1383,
        "y": 1505,
        "brightness": 0.8309118403426806
      },
      {
        "id": "ori-19",
        "x": 1396,
        "y": 1334,
        "brightness": 0.9504803382829407
      },
      {
        "id": "ori-20",
        "x": 1420,
        "y": 1532,
        "brightness": 0.8583589503544667
      },
      {
        "id": "ori-21",
        "x": 1449,
        "y": 1661,
        "brightness": 0.8125942959354845
      },
      {
        "id": "ori-22",
        "x": 1401,
        "y": 1520,
        "brightness": 0.9365794093154627
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
        "x": 5542,
        "y": 947,
        "brightness": 0.8835335609949713
      },
      {
        "id": "peg-1",
        "x": 5679,
        "y": 996,
        "brightness": 0.8190408793347292
      },
      {
        "id": "peg-2",
        "x": 5766,
        "y": 1032,
        "brightness": 0.8316632108549545
      },
      {
        "id": "peg-3",
        "x": 6035,
        "y": 1015,
        "brightness": 0.8225792441624378
      },
      {
        "id": "peg-4",
        "x": 6055,
        "y": 1247,
        "brightness": 0.801832426569973
      },
      {
        "id": "peg-5",
        "x": 5770,
        "y": 1247,
        "brightness": 0.8004561292980259
      },
      {
        "id": "peg-6",
        "x": 5695,
        "y": 1297,
        "brightness": 0.9064878214235199
      },
      {
        "id": "peg-7",
        "x": 5673,
        "y": 1319,
        "brightness": 0.8184438159103771
      },
      {
        "id": "peg-8",
        "x": 5542,
        "y": 1397,
        "brightness": 0.9092618961014118
      },
      {
        "id": "peg-9",
        "x": 5434,
        "y": 1335,
        "brightness": 0.8298793414704017
      },
      {
        "id": "peg-10",
        "x": 5708,
        "y": 1090,
        "brightness": 0.8926369237871324
      },
      {
        "id": "peg-11",
        "x": 5694,
        "y": 1107,
        "brightness": 0.957443502111361
      },
      {
        "id": "peg-12",
        "x": 5529,
        "y": 1078,
        "brightness": 0.8660290380379684
      },
      {
        "id": "peg-13",
        "x": 5436,
        "y": 1073,
        "brightness": 0.8858815954634358
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
        "brightness": 0.935607443764085
      },
      {
        "id": "per-1",
        "x": 976,
        "y": 969,
        "brightness": 0.9886888517465966
      },
      {
        "id": "per-2",
        "x": 996,
        "y": 903,
        "brightness": 0.961264663631022
      },
      {
        "id": "per-3",
        "x": 991,
        "y": 833,
        "brightness": 0.8407442332501802
      },
      {
        "id": "per-4",
        "x": 938,
        "y": 790,
        "brightness": 0.8258713546155526
      },
      {
        "id": "per-5",
        "x": 929,
        "y": 704,
        "brightness": 0.8309483775339764
      },
      {
        "id": "per-6",
        "x": 902,
        "y": 697,
        "brightness": 0.9068368038567509
      },
      {
        "id": "per-7",
        "x": 851,
        "y": 669,
        "brightness": 0.8228903900838722
      },
      {
        "id": "per-8",
        "x": 770,
        "y": 608,
        "brightness": 0.9217391852448856
      },
      {
        "id": "per-9",
        "x": 711,
        "y": 568,
        "brightness": 0.8026104545091072
      },
      {
        "id": "per-10",
        "x": 726,
        "y": 621,
        "brightness": 0.910941726377986
      },
      {
        "id": "per-11",
        "x": 788,
        "y": 673,
        "brightness": 0.8313267637074506
      },
      {
        "id": "per-12",
        "x": 790,
        "y": 752,
        "brightness": 0.9635413168895842
      },
      {
        "id": "per-13",
        "x": 784,
        "y": 817,
        "brightness": 0.9973638186662381
      },
      {
        "id": "per-14",
        "x": 797,
        "y": 840,
        "brightness": 0.8362924502465099
      },
      {
        "id": "per-15",
        "x": 772,
        "y": 853,
        "brightness": 0.9189418072709058
      },
      {
        "id": "per-16",
        "x": 745,
        "y": 839,
        "brightness": 0.9435483779510198
      },
      {
        "id": "per-17",
        "x": 749,
        "y": 816,
        "brightness": 0.8910708219838843
      },
      {
        "id": "per-18",
        "x": 1027,
        "y": 661,
        "brightness": 0.9898760887215818
      },
      {
        "id": "per-19",
        "x": 1062,
        "y": 693,
        "brightness": 0.9869365019672474
      },
      {
        "id": "per-20",
        "x": 1036,
        "y": 705,
        "brightness": 0.9193285419835195
      },
      {
        "id": "per-21",
        "x": 684,
        "y": 680,
        "brightness": 0.846467042034
      },
      {
        "id": "per-22",
        "x": 432,
        "y": 655,
        "brightness": 0.8465581829925324
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
        "brightness": 0.8488490678284615
      },
      {
        "id": "psc-1",
        "x": 299,
        "y": 999,
        "brightness": 0.9000923163000987
      },
      {
        "id": "psc-2",
        "x": 331,
        "y": 1046,
        "brightness": 0.9689813690986285
      },
      {
        "id": "psc-3",
        "x": 298,
        "y": 1149,
        "brightness": 0.8279642177070338
      },
      {
        "id": "psc-4",
        "x": 381,
        "y": 1244,
        "brightness": 0.8094183058464102
      },
      {
        "id": "psc-5",
        "x": 439,
        "y": 1347,
        "brightness": 0.8219260478975469
      },
      {
        "id": "psc-6",
        "x": 509,
        "y": 1454,
        "brightness": 0.8434546277482943
      },
      {
        "id": "psc-7",
        "x": 473,
        "y": 1447,
        "brightness": 0.8965285186542542
      },
      {
        "id": "psc-8",
        "x": 423,
        "y": 1409,
        "brightness": 0.9927136827608278
      },
      {
        "id": "psc-9",
        "x": 376,
        "y": 1398,
        "brightness": 0.9205618739186843
      },
      {
        "id": "psc-10",
        "x": 307,
        "y": 1374,
        "brightness": 0.9658592656132996
      },
      {
        "id": "psc-11",
        "x": 262,
        "y": 1368,
        "brightness": 0.9462988069081301
      },
      {
        "id": "psc-12",
        "x": 203,
        "y": 1374,
        "brightness": 0.8569194459321154
      },
      {
        "id": "psc-13",
        "x": 5997,
        "y": 1386,
        "brightness": 0.8489659925592911
      },
      {
        "id": "psc-14",
        "x": 5916,
        "y": 1406,
        "brightness": 0.9732554921983124
      },
      {
        "id": "psc-15",
        "x": 5867,
        "y": 1394,
        "brightness": 0.8093569644465921
      },
      {
        "id": "psc-16",
        "x": 5835,
        "y": 1410,
        "brightness": 0.9258004488396467
      },
      {
        "id": "psc-17",
        "x": 5822,
        "y": 1445,
        "brightness": 0.8226469518643472
      },
      {
        "id": "psc-18",
        "x": 5862,
        "y": 1479,
        "brightness": 0.9492861317901701
      },
      {
        "id": "psc-19",
        "x": 5925,
        "y": 1470,
        "brightness": 0.8229627007042823
      },
      {
        "id": "psc-20",
        "x": 5943,
        "y": 1442,
        "brightness": 0.8627039158584605
      },
      {
        "id": "psc-21",
        "x": 5766,
        "y": 1436,
        "brightness": 0.9477433005240579
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
        "brightness": 0.9309261853340401
      },
      {
        "id": "sge-1",
        "x": 4947,
        "y": 1191,
        "brightness": 0.9853234948698721
      },
      {
        "id": "sge-2",
        "x": 4995,
        "y": 1175,
        "brightness": 0.9873434043809407
      },
      {
        "id": "sge-3",
        "x": 4921,
        "y": 1209,
        "brightness": 0.8500324216730624
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
        "brightness": 0.945574715989758
      },
      {
        "id": "ser-1",
        "x": 3923,
        "y": 1172,
        "brightness": 0.8331895297617224
      },
      {
        "id": "ser-2",
        "x": 3953,
        "y": 1198,
        "brightness": 0.8034481745203672
      },
      {
        "id": "ser-3",
        "x": 3985,
        "y": 1239,
        "brightness": 0.9970659325620159
      },
      {
        "id": "ser-4",
        "x": 3895,
        "y": 1324,
        "brightness": 0.8024538854572003
      },
      {
        "id": "ser-5",
        "x": 3934,
        "y": 1393,
        "brightness": 0.9362442406142499
      },
      {
        "id": "ser-6",
        "x": 3962,
        "y": 1425,
        "brightness": 0.9911919575964092
      },
      {
        "id": "ser-7",
        "x": 4060,
        "y": 1562,
        "brightness": 0.9713826765799404
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
        "brightness": 0.9166301178709708
      },
      {
        "id": "tau-1",
        "x": 1150,
        "y": 1225,
        "brightness": 0.9271416872843014
      },
      {
        "id": "tau-2",
        "x": 1119,
        "y": 1235,
        "brightness": 0.9018602238467668
      },
      {
        "id": "tau-3",
        "x": 1082,
        "y": 1240,
        "brightness": 0.9012852655142605
      },
      {
        "id": "tau-4",
        "x": 1096,
        "y": 1208,
        "brightness": 0.8120370055884689
      },
      {
        "id": "tau-5",
        "x": 1119,
        "y": 1180,
        "brightness": 0.900202938077062
      },
      {
        "id": "tau-6",
        "x": 1360,
        "y": 1023,
        "brightness": 0.8090248566641557
      },
      {
        "id": "tau-7",
        "x": 1003,
        "y": 1292,
        "brightness": 0.8888539522707257
      },
      {
        "id": "tau-8",
        "x": 863,
        "y": 1338,
        "brightness": 0.8708831365617674
      },
      {
        "id": "tau-9",
        "x": 1013,
        "y": 1400,
        "brightness": 0.9989063282916439
      },
      {
        "id": "tau-10",
        "x": 853,
        "y": 1350,
        "brightness": 0.8047369760244173
      },
      {
        "id": "tau-11",
        "x": 904,
        "y": 1493,
        "brightness": 0.8136335248798285
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
        "brightness": 0.982801993230823
      },
      {
        "id": "tri-1",
        "x": 540,
        "y": 917,
        "brightness": 0.8443816791461185
      },
      {
        "id": "tri-2",
        "x": 572,
        "y": 936,
        "brightness": 0.9004850979396967
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
        "brightness": 0.8653241704738037
      },
      {
        "id": "uma-1",
        "x": 2766,
        "y": 471,
        "brightness": 0.9740983339682325
      },
      {
        "id": "uma-2",
        "x": 2758,
        "y": 560,
        "brightness": 0.9204937493610102
      },
      {
        "id": "uma-3",
        "x": 2974,
        "y": 605,
        "brightness": 0.9233593058807944
      },
      {
        "id": "uma-4",
        "x": 3225,
        "y": 567,
        "brightness": 0.9702581302685798
      },
      {
        "id": "uma-5",
        "x": 3350,
        "y": 585,
        "brightness": 0.9879485075385853
      },
      {
        "id": "uma-6",
        "x": 3448,
        "y": 678,
        "brightness": 0.8059975631539597
      },
      {
        "id": "uma-7",
        "x": 2942,
        "y": 704,
        "brightness": 0.9711406516915476
      },
      {
        "id": "uma-8",
        "x": 2827,
        "y": 948,
        "brightness": 0.9635307029685225
      },
      {
        "id": "uma-9",
        "x": 2826,
        "y": 974,
        "brightness": 0.8136651317493345
      },
      {
        "id": "uma-10",
        "x": 2790,
        "y": 758,
        "brightness": 0.9489454806225273
      },
      {
        "id": "uma-11",
        "x": 2593,
        "y": 808,
        "brightness": 0.9603959231294068
      },
      {
        "id": "uma-12",
        "x": 2571,
        "y": 785,
        "brightness": 0.8606301892551979
      },
      {
        "id": "uma-13",
        "x": 2381,
        "y": 449,
        "brightness": 0.8577832162180582
      },
      {
        "id": "uma-14",
        "x": 2126,
        "y": 488,
        "brightness": 0.9830086640716263
      },
      {
        "id": "uma-15",
        "x": 2462,
        "y": 516,
        "brightness": 0.8742054144193275
      },
      {
        "id": "uma-16",
        "x": 2467,
        "y": 599,
        "brightness": 0.8117914272566937
      },
      {
        "id": "uma-17",
        "x": 2387,
        "y": 639,
        "brightness": 0.8667914598400583
      },
      {
        "id": "uma-18",
        "x": 2247,
        "y": 699,
        "brightness": 0.9170163497496474
      },
      {
        "id": "uma-19",
        "x": 2265,
        "y": 714,
        "brightness": 0.92497442063598
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
        "x": 3934,
        "y": 203,
        "brightness": 0.9710140009477469
      },
      {
        "id": "umi-1",
        "x": 4073,
        "y": 237,
        "brightness": 0.87053857252777
      },
      {
        "id": "umi-2",
        "x": 3836,
        "y": 303,
        "brightness": 0.8619717873637909
      },
      {
        "id": "umi-3",
        "x": 3711,
        "y": 264,
        "brightness": 0.8012415047921821
      },
      {
        "id": "umi-4",
        "x": 4192,
        "y": 133,
        "brightness": 0.9054600163367061
      },
      {
        "id": "umi-5",
        "x": 4384,
        "y": 57,
        "brightness": 0.9278684498101558
      },
      {
        "id": "umi-6",
        "x": 633,
        "y": 12,
        "brightness": 0.8586528099392969
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
        "brightness": 0.976546341686433
      },
      {
        "id": "vul-1",
        "x": 4870,
        "y": 1089,
        "brightness": 0.8280468145463321
      },
      {
        "id": "vul-2",
        "x": 4973,
        "y": 1099,
        "brightness": 0.8843109659406093
      },
      {
        "id": "vul-3",
        "x": 5005,
        "y": 1037,
        "brightness": 0.9913072431312593
      },
      {
        "id": "vul-4",
        "x": 5066,
        "y": 1036,
        "brightness": 0.9393923424811543
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
        "brightness": 0.845831966484029
      },
      {
        "id": "ant-1",
        "x": 2613,
        "y": 2018,
        "brightness": 0.8187096030136275
      },
      {
        "id": "ant-2",
        "x": 2736,
        "y": 2119,
        "brightness": 0.9710483317156622
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
        "brightness": 0.9372280729349638
      },
      {
        "id": "aps-1",
        "x": 4085,
        "y": 2812,
        "brightness": 0.8657903662276147
      },
      {
        "id": "aps-2",
        "x": 4179,
        "y": 2792,
        "brightness": 0.8363147644391001
      },
      {
        "id": "aps-3",
        "x": 4139,
        "y": 2815,
        "brightness": 0.9567026435908458
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
        "brightness": 0.9642047059941696
      },
      {
        "id": "aqr-1",
        "x": 5219,
        "y": 1650,
        "brightness": 0.8574391825060989
      },
      {
        "id": "aqr-2",
        "x": 5381,
        "y": 1593,
        "brightness": 0.8893515280410847
      },
      {
        "id": "aqr-3",
        "x": 5524,
        "y": 1505,
        "brightness": 0.8215286259255767
      },
      {
        "id": "aqr-4",
        "x": 5590,
        "y": 1523,
        "brightness": 0.859633627924532
      },
      {
        "id": "aqr-5",
        "x": 5620,
        "y": 1500,
        "brightness": 0.8236805198576599
      },
      {
        "id": "aqr-6",
        "x": 5647,
        "y": 1502,
        "brightness": 0.8866732450959816
      },
      {
        "id": "aqr-7",
        "x": 5719,
        "y": 1626,
        "brightness": 0.9227841607353544
      },
      {
        "id": "aqr-8",
        "x": 5825,
        "y": 1653,
        "brightness": 0.9053226545855143
      },
      {
        "id": "aqr-9",
        "x": 5789,
        "y": 1853,
        "brightness": 0.9869083479062707
      },
      {
        "id": "aqr-10",
        "x": 5527,
        "y": 1731,
        "brightness": 0.981058821887797
      },
      {
        "id": "aqr-11",
        "x": 5570,
        "y": 1630,
        "brightness": 0.9057066478346965
      },
      {
        "id": "aqr-12",
        "x": 5605,
        "y": 1477,
        "brightness": 0.8314035242067523
      },
      {
        "id": "aqr-13",
        "x": 5846,
        "y": 1835,
        "brightness": 0.8930870776397314
      },
      {
        "id": "aqr-14",
        "x": 5924,
        "y": 1797,
        "brightness": 0.9204191984022962
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
        "brightness": 0.8673535670126534
      },
      {
        "id": "ara-1",
        "x": 4380,
        "y": 2511,
        "brightness": 0.9561024128569521
      },
      {
        "id": "ara-2",
        "x": 4207,
        "y": 2484,
        "brightness": 0.9662701115892076
      },
      {
        "id": "ara-3",
        "x": 4244,
        "y": 2433,
        "brightness": 0.812025578921402
      },
      {
        "id": "ara-4",
        "x": 4248,
        "y": 2386,
        "brightness": 0.9939734492092588
      },
      {
        "id": "ara-5",
        "x": 4383,
        "y": 2331,
        "brightness": 0.8103504088277539
      },
      {
        "id": "ara-6",
        "x": 4355,
        "y": 2425,
        "brightness": 0.8374446719153008
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
        "brightness": 0.8585296734412864
      },
      {
        "id": "cae-1",
        "x": 1169,
        "y": 2198,
        "brightness": 0.9401258868344379
      },
      {
        "id": "cae-2",
        "x": 1175,
        "y": 2119,
        "brightness": 0.9654107858922422
      },
      {
        "id": "cae-3",
        "x": 1268,
        "y": 2091,
        "brightness": 0.8013305525589031
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
        "brightness": 0.9006762551280664
      },
      {
        "id": "cma-1",
        "x": 1688,
        "y": 1779,
        "brightness": 0.8383275456260921
      },
      {
        "id": "cma-2",
        "x": 1763,
        "y": 1897,
        "brightness": 0.9622292587214318
      },
      {
        "id": "cma-3",
        "x": 1785,
        "y": 1940,
        "brightness": 0.990994643045068
      },
      {
        "id": "cma-4",
        "x": 1757,
        "y": 1966,
        "brightness": 0.8860605536025133
      },
      {
        "id": "cma-5",
        "x": 1744,
        "y": 1983,
        "brightness": 0.8802572071927617
      },
      {
        "id": "cma-6",
        "x": 1585,
        "y": 2001,
        "brightness": 0.8461978991906298
      },
      {
        "id": "cma-7",
        "x": 1850,
        "y": 1988,
        "brightness": 0.9160960431529019
      },
      {
        "id": "cma-8",
        "x": 1734,
        "y": 1784,
        "brightness": 0.9705864442316882
      },
      {
        "id": "cma-9",
        "x": 1766,
        "y": 1761,
        "brightness": 0.8510127118492339
      },
      {
        "id": "cma-10",
        "x": 1726,
        "y": 1701,
        "brightness": 0.8666477189320421
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
        "brightness": 0.8745710168496246
      },
      {
        "id": "cap-1",
        "x": 5088,
        "y": 1746,
        "brightness": 0.9878764707994143
      },
      {
        "id": "cap-2",
        "x": 5120,
        "y": 1797,
        "brightness": 0.9311023858372902
      },
      {
        "id": "cap-3",
        "x": 5192,
        "y": 1921,
        "brightness": 0.858055811626867
      },
      {
        "id": "cap-4",
        "x": 5216,
        "y": 1949,
        "brightness": 0.914535030893805
      },
      {
        "id": "cap-5",
        "x": 5361,
        "y": 1874,
        "brightness": 0.9478927451017222
      },
      {
        "id": "cap-6",
        "x": 5446,
        "y": 1769,
        "brightness": 0.8062114780928537
      },
      {
        "id": "cap-7",
        "x": 5417,
        "y": 1778,
        "brightness": 0.9782285688357616
      },
      {
        "id": "cap-8",
        "x": 5343,
        "y": 1781,
        "brightness": 0.8289153935701236
      },
      {
        "id": "cap-9",
        "x": 5275,
        "y": 1787,
        "brightness": 0.8462095739611266
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
        "brightness": 0.9190049123003142
      },
      {
        "id": "car-1",
        "x": 1600,
        "y": 2378,
        "brightness": 0.8709811762078907
      },
      {
        "id": "car-2",
        "x": 2305,
        "y": 2662,
        "brightness": 0.9117387186211627
      },
      {
        "id": "car-3",
        "x": 2557,
        "y": 2667,
        "brightness": 0.9016813188202119
      },
      {
        "id": "car-4",
        "x": 2679,
        "y": 2573,
        "brightness": 0.8932793013557007
      },
      {
        "id": "car-5",
        "x": 2633,
        "y": 2528,
        "brightness": 0.8651689897440324
      },
      {
        "id": "car-6",
        "x": 2571,
        "y": 2522,
        "brightness": 0.8830067001273134
      },
      {
        "id": "car-7",
        "x": 2321,
        "y": 2488,
        "brightness": 0.8884351953090056
      },
      {
        "id": "car-8",
        "x": 2094,
        "y": 2492,
        "brightness": 0.8163670115405713
      },
      {
        "id": "car-9",
        "x": 1987,
        "y": 2383,
        "brightness": 0.9642732898264768
      },
      {
        "id": "car-10",
        "x": 2040,
        "y": 2289,
        "brightness": 0.9777979110671973
      },
      {
        "id": "car-11",
        "x": 2186,
        "y": 2412,
        "brightness": 0.9747051871084551
      },
      {
        "id": "car-12",
        "x": 2777,
        "y": 2540,
        "brightness": 0.816876902891788
      },
      {
        "id": "car-13",
        "x": 2786,
        "y": 2532,
        "brightness": 0.9186519869554013
      },
      {
        "id": "car-14",
        "x": 2803,
        "y": 2505,
        "brightness": 0.8257720239390354
      },
      {
        "id": "car-15",
        "x": 2786,
        "y": 2483,
        "brightness": 0.8904558617791638
      },
      {
        "id": "car-16",
        "x": 2723,
        "y": 2481,
        "brightness": 0.8719468117833121
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
        "brightness": 0.9529182060485837
      },
      {
        "id": "cen-1",
        "x": 3035,
        "y": 2345,
        "brightness": 0.8354665938769875
      },
      {
        "id": "cen-2",
        "x": 3117,
        "y": 2337,
        "brightness": 0.8005640554172874
      },
      {
        "id": "cen-3",
        "x": 3173,
        "y": 2316,
        "brightness": 0.8695942854389714
      },
      {
        "id": "cen-4",
        "x": 3416,
        "y": 2391,
        "brightness": 0.807600955410239
      },
      {
        "id": "cen-5",
        "x": 3481,
        "y": 2288,
        "brightness": 0.9602006543990258
      },
      {
        "id": "cen-6",
        "x": 3457,
        "y": 2208,
        "brightness": 0.9116743137390407
      },
      {
        "id": "cen-7",
        "x": 3456,
        "y": 2195,
        "brightness": 0.867061708480242
      },
      {
        "id": "cen-8",
        "x": 3528,
        "y": 2106,
        "brightness": 0.9604884328515075
      },
      {
        "id": "cen-9",
        "x": 3648,
        "y": 2203,
        "brightness": 0.9027960003693788
      },
      {
        "id": "cen-10",
        "x": 3747,
        "y": 2202,
        "brightness": 0.9979959418454967
      },
      {
        "id": "cen-11",
        "x": 3336,
        "y": 2112,
        "brightness": 0.8886501680419466
      },
      {
        "id": "cen-12",
        "x": 3665,
        "y": 2514,
        "brightness": 0.9064971952856413
      },
      {
        "id": "cen-13",
        "x": 3516,
        "y": 2506,
        "brightness": 0.9091636787299695
      },
      {
        "id": "cen-14",
        "x": 3049,
        "y": 2373,
        "brightness": 0.966670553852132
      },
      {
        "id": "cen-15",
        "x": 2882,
        "y": 2491,
        "brightness": 0.9534551541539804
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
        "brightness": 0.9584222949778624
      },
      {
        "id": "cet-1",
        "x": 649,
        "y": 1407,
        "brightness": 0.9633448451194331
      },
      {
        "id": "cet-2",
        "x": 617,
        "y": 1359,
        "brightness": 0.8358997443219884
      },
      {
        "id": "cet-3",
        "x": 687,
        "y": 1331,
        "brightness": 0.9994673252568206
      },
      {
        "id": "cet-4",
        "x": 749,
        "y": 1352,
        "brightness": 0.8154480993140443
      },
      {
        "id": "cet-5",
        "x": 759,
        "y": 1432,
        "brightness": 0.9536168852087379
      },
      {
        "id": "cet-6",
        "x": 665,
        "y": 1495,
        "brightness": 0.8882056423484213
      },
      {
        "id": "cet-7",
        "x": 581,
        "y": 1550,
        "brightness": 0.8371158594541621
      },
      {
        "id": "cet-8",
        "x": 464,
        "y": 1672,
        "brightness": 0.9150592695042697
      },
      {
        "id": "cet-9",
        "x": 434,
        "y": 1766,
        "brightness": 0.9200801914363225
      },
      {
        "id": "cet-10",
        "x": 182,
        "y": 1800,
        "brightness": 0.8996648146090005
      },
      {
        "id": "cet-11",
        "x": 81,
        "y": 1647,
        "brightness": 0.8289560935569716
      },
      {
        "id": "cet-12",
        "x": 286,
        "y": 1670,
        "brightness": 0.8856334177598822
      },
      {
        "id": "cet-13",
        "x": 350,
        "y": 1636,
        "brightness": 0.9570069804596457
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
        "brightness": 0.8028822369837016
      },
      {
        "id": "cha-1",
        "x": 2648,
        "y": 2810,
        "brightness": 0.8337916326227752
      },
      {
        "id": "cha-2",
        "x": 2689,
        "y": 2841,
        "brightness": 0.9206365030566082
      },
      {
        "id": "cha-3",
        "x": 3076,
        "y": 2822,
        "brightness": 0.831162838944711
      },
      {
        "id": "cha-4",
        "x": 2998,
        "y": 2804,
        "brightness": 0.8504644338566532
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
        "brightness": 0.8780719899809935
      },
      {
        "id": "cir-1",
        "x": 3677,
        "y": 2583,
        "brightness": 0.9681719909994115
      },
      {
        "id": "cir-2",
        "x": 3847,
        "y": 2489,
        "brightness": 0.9845598250034893
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
        "brightness": 0.9034320824890594
      },
      {
        "id": "col-1",
        "x": 1462,
        "y": 2096,
        "brightness": 0.8463948714587912
      },
      {
        "id": "col-2",
        "x": 1415,
        "y": 2068,
        "brightness": 0.9498241877799987
      },
      {
        "id": "col-3",
        "x": 1380,
        "y": 2091,
        "brightness": 0.8820026260823091
      },
      {
        "id": "col-4",
        "x": 1496,
        "y": 2214,
        "brightness": 0.819167225296726
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
        "brightness": 0.8524296274423773
      },
      {
        "id": "cra-1",
        "x": 4777,
        "y": 2118,
        "brightness": 0.8437077854206082
      },
      {
        "id": "cra-2",
        "x": 4789,
        "y": 2132,
        "brightness": 0.9845852130224653
      },
      {
        "id": "cra-3",
        "x": 4792,
        "y": 2156,
        "brightness": 0.8626539387210301
      },
      {
        "id": "cra-4",
        "x": 4785,
        "y": 2175,
        "brightness": 0.8750936473529185
      },
      {
        "id": "cra-5",
        "x": 4763,
        "y": 2202,
        "brightness": 0.9125349610766809
      },
      {
        "id": "cra-6",
        "x": 4707,
        "y": 2224,
        "brightness": 0.9004207384283534
      },
      {
        "id": "cra-7",
        "x": 4640,
        "y": 2205,
        "brightness": 0.8229659049110912
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
        "brightness": 0.9742229298966425
      },
      {
        "id": "crv-1",
        "x": 3042,
        "y": 1877,
        "brightness": 0.9621233914755571
      },
      {
        "id": "crv-2",
        "x": 3066,
        "y": 1792,
        "brightness": 0.8855772592726596
      },
      {
        "id": "crv-3",
        "x": 3124,
        "y": 1775,
        "brightness": 0.9450658249155951
      },
      {
        "id": "crv-4",
        "x": 3143,
        "y": 1890,
        "brightness": 0.9758956734604431
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
        "brightness": 0.8529531921161746
      },
      {
        "id": "crt-1",
        "x": 2853,
        "y": 1681,
        "brightness": 0.9340760726219308
      },
      {
        "id": "crt-2",
        "x": 2831,
        "y": 1746,
        "brightness": 0.8561469595855506
      },
      {
        "id": "crt-3",
        "x": 2749,
        "y": 1805,
        "brightness": 0.9122492215370488
      },
      {
        "id": "crt-4",
        "x": 2799,
        "y": 1880,
        "brightness": 0.8068294096814733
      },
      {
        "id": "crt-5",
        "x": 2847,
        "y": 1813,
        "brightness": 0.8299624018956214
      },
      {
        "id": "crt-6",
        "x": 2854,
        "y": 1795,
        "brightness": 0.9861240227754693
      },
      {
        "id": "crt-7",
        "x": 2937,
        "y": 1806,
        "brightness": 0.9917070387884463
      },
      {
        "id": "crt-8",
        "x": 2983,
        "y": 1786,
        "brightness": 0.8145453103965714
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
        "brightness": 0.946912806779392
      },
      {
        "id": "cru-1",
        "x": 3063,
        "y": 2479,
        "brightness": 0.8257223846641741
      },
      {
        "id": "cru-2",
        "x": 3111,
        "y": 2552,
        "brightness": 0.9335650652458953
      },
      {
        "id": "cru-3",
        "x": 3130,
        "y": 2452,
        "brightness": 0.8519228894806343
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
        "brightness": 0.8735953452782361
      },
      {
        "id": "dor-1",
        "x": 1142,
        "y": 2417,
        "brightness": 0.8433142837765947
      },
      {
        "id": "dor-2",
        "x": 1390,
        "y": 2541,
        "brightness": 0.8559638685653984
      },
      {
        "id": "dor-3",
        "x": 1437,
        "y": 2596,
        "brightness": 0.9154591262263239
      },
      {
        "id": "dor-4",
        "x": 1475,
        "y": 2551,
        "brightness": 0.812734700106251
      },
      {
        "id": "dor-5",
        "x": 1273,
        "y": 2458,
        "brightness": 0.8474733988085627
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
        "brightness": 0.986587756046307
      },
      {
        "id": "eri-1",
        "x": 1190,
        "y": 1554,
        "brightness": 0.9159558345949548
      },
      {
        "id": "eri-2",
        "x": 1151,
        "y": 1556,
        "brightness": 0.8490014435683225
      },
      {
        "id": "eri-3",
        "x": 1049,
        "y": 1614,
        "brightness": 0.8784699682805311
      },
      {
        "id": "eri-4",
        "x": 992,
        "y": 1725,
        "brightness": 0.9253166887706384
      },
      {
        "id": "eri-5",
        "x": 942,
        "y": 1702,
        "brightness": 0.8333116576647752
      },
      {
        "id": "eri-6",
        "x": 930,
        "y": 1663,
        "brightness": 0.9864281270928285
      },
      {
        "id": "eri-7",
        "x": 887,
        "y": 1658,
        "brightness": 0.9858362036819295
      },
      {
        "id": "eri-8",
        "x": 735,
        "y": 1648,
        "brightness": 0.8724580454344579
      },
      {
        "id": "eri-9",
        "x": 684,
        "y": 1731,
        "brightness": 0.9903425560796062
      },
      {
        "id": "eri-10",
        "x": 688,
        "y": 1810,
        "brightness": 0.9400283691222399
      },
      {
        "id": "eri-11",
        "x": 760,
        "y": 1894,
        "brightness": 0.8397593651318115
      },
      {
        "id": "eri-12",
        "x": 831,
        "y": 1863,
        "brightness": 0.8135055364470509
      },
      {
        "id": "eri-13",
        "x": 891,
        "y": 1861,
        "brightness": 0.8525576962422255
      },
      {
        "id": "eri-14",
        "x": 945,
        "y": 1887,
        "brightness": 0.9892423536330296
      },
      {
        "id": "eri-15",
        "x": 1148,
        "y": 2009,
        "brightness": 0.8561125410861605
      },
      {
        "id": "eri-16",
        "x": 1100,
        "y": 2067,
        "brightness": 0.846141964034392
      },
      {
        "id": "eri-17",
        "x": 1075,
        "y": 2063,
        "brightness": 0.8867123550196747
      },
      {
        "id": "eri-18",
        "x": 956,
        "y": 2103,
        "brightness": 0.8192548854393972
      },
      {
        "id": "eri-19",
        "x": 905,
        "y": 2171,
        "brightness": 0.8618754334171634
      },
      {
        "id": "eri-20",
        "x": 833,
        "y": 2218,
        "brightness": 0.8888902707440552
      },
      {
        "id": "eri-21",
        "x": 743,
        "y": 2172,
        "brightness": 0.8109953955419056
      },
      {
        "id": "eri-22",
        "x": 669,
        "y": 2164,
        "brightness": 0.9553504236350348
      },
      {
        "id": "eri-23",
        "x": 612,
        "y": 2295,
        "brightness": 0.9645657834361625
      },
      {
        "id": "eri-24",
        "x": 569,
        "y": 2359,
        "brightness": 0.8285526647751255
      },
      {
        "id": "eri-25",
        "x": 483,
        "y": 2360,
        "brightness": 0.8224923038351928
      },
      {
        "id": "eri-26",
        "x": 407,
        "y": 2454,
        "brightness": 0.9891575318606057
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
        "brightness": 0.969018464261373
      },
      {
        "id": "for-1",
        "x": 705,
        "y": 2040,
        "brightness": 0.8437899293834585
      },
      {
        "id": "for-2",
        "x": 519,
        "y": 1988,
        "brightness": 0.8153664767639133
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
        "brightness": 0.8114962929968351
      },
      {
        "id": "gru-1",
        "x": 5702,
        "y": 2355,
        "brightness": 0.9930198562641788
      },
      {
        "id": "gru-2",
        "x": 5678,
        "y": 2281,
        "brightness": 0.8392886376105706
      },
      {
        "id": "gru-3",
        "x": 5624,
        "y": 2229,
        "brightness": 0.9585955121859653
      },
      {
        "id": "gru-4",
        "x": 5534,
        "y": 2283,
        "brightness": 0.9931461706642244
      },
      {
        "id": "gru-5",
        "x": 5622,
        "y": 2225,
        "brightness": 0.9389217036337492
      },
      {
        "id": "gru-6",
        "x": 5565,
        "y": 2189,
        "brightness": 0.8338949072872027
      },
      {
        "id": "gru-7",
        "x": 5525,
        "y": 2159,
        "brightness": 0.9650900764474216
      },
      {
        "id": "gru-8",
        "x": 5475,
        "y": 2123,
        "brightness": 0.9379660163525186
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
        "brightness": 0.9660349312102597
      },
      {
        "id": "hor-1",
        "x": 677,
        "y": 2347,
        "brightness": 0.8822140655715981
      },
      {
        "id": "hor-2",
        "x": 656,
        "y": 2376,
        "brightness": 0.8753897991628091
      },
      {
        "id": "hor-3",
        "x": 669,
        "y": 2409,
        "brightness": 0.9875515973943352
      },
      {
        "id": "hor-4",
        "x": 765,
        "y": 2496,
        "brightness": 0.8104998720661111
      },
      {
        "id": "hor-5",
        "x": 745,
        "y": 2568,
        "brightness": 0.9894894762586887
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
        "brightness": 0.8438772639272706
      },
      {
        "id": "hya-1",
        "x": 2202,
        "y": 1403,
        "brightness": 0.8895648747766848
      },
      {
        "id": "hya-2",
        "x": 2180,
        "y": 1443,
        "brightness": 0.801059473869276
      },
      {
        "id": "hya-3",
        "x": 2161,
        "y": 1444,
        "brightness": 0.9360633009307849
      },
      {
        "id": "hya-4",
        "x": 2157,
        "y": 1405,
        "brightness": 0.8784748868788581
      },
      {
        "id": "hya-5",
        "x": 2231,
        "y": 1401,
        "brightness": 0.8467048735470472
      },
      {
        "id": "hya-6",
        "x": 2310,
        "y": 1461,
        "brightness": 0.9274456747161952
      },
      {
        "id": "hya-7",
        "x": 2416,
        "y": 1519,
        "brightness": 0.8073012727407001
      },
      {
        "id": "hya-8",
        "x": 2365,
        "y": 1644,
        "brightness": 0.9187553399372141
      },
      {
        "id": "hya-9",
        "x": 2464,
        "y": 1747,
        "brightness": 0.9842407186124392
      },
      {
        "id": "hya-10",
        "x": 2544,
        "y": 1706,
        "brightness": 0.8386228172997087
      },
      {
        "id": "hya-11",
        "x": 2609,
        "y": 1781,
        "brightness": 0.9089336101617174
      },
      {
        "id": "hya-12",
        "x": 2707,
        "y": 1770,
        "brightness": 0.9186135662037744
      },
      {
        "id": "hya-13",
        "x": 2888,
        "y": 2031,
        "brightness": 0.8226832628218488
      },
      {
        "id": "hya-14",
        "x": 2970,
        "y": 2065,
        "brightness": 0.8600535558749255
      },
      {
        "id": "hya-15",
        "x": 3329,
        "y": 1886,
        "brightness": 0.8384765850356859
      },
      {
        "id": "hya-16",
        "x": 3527,
        "y": 1945,
        "brightness": 0.9851106057588112
      },
      {
        "id": "hya-17",
        "x": 3710,
        "y": 1966,
        "brightness": 0.802766582247614
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
        "brightness": 0.9553002205229404
      },
      {
        "id": "hyi-1",
        "x": 947,
        "y": 2737,
        "brightness": 0.8797623068208155
      },
      {
        "id": "hyi-2",
        "x": 665,
        "y": 2638,
        "brightness": 0.8959008184013142
      },
      {
        "id": "hyi-3",
        "x": 591,
        "y": 2644,
        "brightness": 0.8908351801717106
      },
      {
        "id": "hyi-4",
        "x": 479,
        "y": 2627,
        "brightness": 0.8792239313886091
      },
      {
        "id": "hyi-5",
        "x": 495,
        "y": 2526,
        "brightness": 0.9114317488618233
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
        "brightness": 0.912495579453082
      },
      {
        "id": "ind-1",
        "x": 5183,
        "y": 2365,
        "brightness": 0.8240960216249114
      },
      {
        "id": "ind-2",
        "x": 5228,
        "y": 2474,
        "brightness": 0.9931676029002048
      },
      {
        "id": "ind-3",
        "x": 5491,
        "y": 2417,
        "brightness": 0.8963362817848801
      },
      {
        "id": "ind-4",
        "x": 5333,
        "y": 2391,
        "brightness": 0.9926119609047146
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
        "brightness": 0.823995221793477
      },
      {
        "id": "lep-1",
        "x": 1485,
        "y": 1736,
        "brightness": 0.9214787345481812
      },
      {
        "id": "lep-2",
        "x": 1446,
        "y": 1747,
        "brightness": 0.9947324942865509
      },
      {
        "id": "lep-3",
        "x": 1386,
        "y": 1797,
        "brightness": 0.871982092293981
      },
      {
        "id": "lep-4",
        "x": 1304,
        "y": 1770,
        "brightness": 0.918134785055724
      },
      {
        "id": "lep-5",
        "x": 1273,
        "y": 1873,
        "brightness": 0.9917570497261133
      },
      {
        "id": "lep-6",
        "x": 1368,
        "y": 1846,
        "brightness": 0.8702417483630066
      },
      {
        "id": "lep-7",
        "x": 1435,
        "y": 1874,
        "brightness": 0.87154251406142
      },
      {
        "id": "lep-8",
        "x": 1464,
        "y": 1848,
        "brightness": 0.8966705105894466
      },
      {
        "id": "lep-9",
        "x": 1305,
        "y": 1716,
        "brightness": 0.9323997018442531
      },
      {
        "id": "lep-10",
        "x": 1332,
        "y": 1720,
        "brightness": 0.8635679286239603
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
        "brightness": 0.8019840295868664
      },
      {
        "id": "lib-1",
        "x": 3712,
        "y": 1767,
        "brightness": 0.8023575016524076
      },
      {
        "id": "lib-2",
        "x": 3821,
        "y": 1656,
        "brightness": 0.8763335651937108
      },
      {
        "id": "lib-3",
        "x": 3898,
        "y": 1746,
        "brightness": 0.8285292913064621
      },
      {
        "id": "lib-4",
        "x": 3904,
        "y": 1969,
        "brightness": 0.9953848544504456
      },
      {
        "id": "lib-5",
        "x": 3911,
        "y": 1996,
        "brightness": 0.8011630087545323
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
        "brightness": 0.9536326555916621
      },
      {
        "id": "lup-1",
        "x": 3916,
        "y": 2074,
        "brightness": 0.8285009285530126
      },
      {
        "id": "lup-2",
        "x": 3841,
        "y": 2104,
        "brightness": 0.845362100328121
      },
      {
        "id": "lup-3",
        "x": 3839,
        "y": 2177,
        "brightness": 0.8967248932388721
      },
      {
        "id": "lup-4",
        "x": 3744,
        "y": 2219,
        "brightness": 0.8373289015904423
      },
      {
        "id": "lup-5",
        "x": 3675,
        "y": 2290,
        "brightness": 0.8905119937437372
      },
      {
        "id": "lup-6",
        "x": 3801,
        "y": 2368,
        "brightness": 0.9290130065781615
      },
      {
        "id": "lup-7",
        "x": 3827,
        "y": 2298,
        "brightness": 0.849778248119906
      },
      {
        "id": "lup-8",
        "x": 3845,
        "y": 2245,
        "brightness": 0.971251318557856
      },
      {
        "id": "lup-9",
        "x": 3896,
        "y": 2186,
        "brightness": 0.9373754452380192
      },
      {
        "id": "lup-10",
        "x": 4001,
        "y": 2140,
        "brightness": 0.9162229707181734
      },
      {
        "id": "lup-11",
        "x": 4027,
        "y": 2113,
        "brightness": 0.900928428288696
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
        "brightness": 0.9737937929857331
      },
      {
        "id": "men-1",
        "x": 1383,
        "y": 2772,
        "brightness": 0.8774293268961024
      },
      {
        "id": "men-2",
        "x": 1230,
        "y": 2749,
        "brightness": 0.8628100170287943
      },
      {
        "id": "men-3",
        "x": 1261,
        "y": 2689,
        "brightness": 0.90624484234274
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
        "brightness": 0.8241029177921925
      },
      {
        "id": "mic-1",
        "x": 5202,
        "y": 2233,
        "brightness": 0.8340141131141351
      },
      {
        "id": "mic-2",
        "x": 5337,
        "y": 2180,
        "brightness": 0.9167525849686031
      },
      {
        "id": "mic-3",
        "x": 5325,
        "y": 2036,
        "brightness": 0.845313222152654
      },
      {
        "id": "mic-4",
        "x": 5255,
        "y": 2038,
        "brightness": 0.9592812664631738
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
        "brightness": 0.9249678539069481
      },
      {
        "id": "mon-1",
        "x": 2036,
        "y": 1550,
        "brightness": 0.8016272157013731
      },
      {
        "id": "mon-2",
        "x": 1799,
        "y": 1508,
        "brightness": 0.8166132398507328
      },
      {
        "id": "mon-3",
        "x": 1620,
        "y": 1617,
        "brightness": 0.8899589104465746
      },
      {
        "id": "mon-4",
        "x": 1562,
        "y": 1605,
        "brightness": 0.9088535830873855
      },
      {
        "id": "mon-5",
        "x": 1699,
        "y": 1460,
        "brightness": 0.8828166661247425
      },
      {
        "id": "mon-6",
        "x": 1599,
        "y": 1423,
        "brightness": 0.8377449969210018
      },
      {
        "id": "mon-7",
        "x": 1637,
        "y": 1378,
        "brightness": 0.804194917889611
      },
      {
        "id": "mon-8",
        "x": 1671,
        "y": 1335,
        "brightness": 0.8323112772769091
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
        "brightness": 0.8705837692262992
      },
      {
        "id": "mus-1",
        "x": 3073,
        "y": 2633,
        "brightness": 0.8777448941384363
      },
      {
        "id": "mus-2",
        "x": 3155,
        "y": 2652,
        "brightness": 0.8928009885987804
      },
      {
        "id": "mus-3",
        "x": 3193,
        "y": 2635,
        "brightness": 0.8701707857027359
      },
      {
        "id": "mus-4",
        "x": 3259,
        "y": 2692,
        "brightness": 0.8672708315872804
      },
      {
        "id": "mus-5",
        "x": 3135,
        "y": 2702,
        "brightness": 0.8794500378855553
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
        "brightness": 0.8234881887430318
      },
      {
        "id": "nor-1",
        "x": 4113,
        "y": 2293,
        "brightness": 0.9910659939085806
      },
      {
        "id": "nor-2",
        "x": 4083,
        "y": 2336,
        "brightness": 0.8548705355137995
      },
      {
        "id": "nor-3",
        "x": 4013,
        "y": 2320,
        "brightness": 0.845774791058003
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
        "brightness": 0.9041003380280911
      },
      {
        "id": "oct-1",
        "x": 5692,
        "y": 2856,
        "brightness": 0.8856236789533695
      },
      {
        "id": "oct-2",
        "x": 5423,
        "y": 2790,
        "brightness": 0.8610257972213607
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
        "brightness": 0.8477528310706766
      },
      {
        "id": "oph-1",
        "x": 4450,
        "y": 1455,
        "brightness": 0.8405866056485006
      },
      {
        "id": "oph-2",
        "x": 4431,
        "y": 1424,
        "brightness": 0.9259026661056999
      },
      {
        "id": "oph-3",
        "x": 4396,
        "y": 1291,
        "brightness": 0.9029952488293367
      },
      {
        "id": "oph-4",
        "x": 4240,
        "y": 1344,
        "brightness": 0.8872642137988043
      },
      {
        "id": "oph-5",
        "x": 4129,
        "y": 1467,
        "brightness": 0.8263524872070198
      },
      {
        "id": "oph-6",
        "x": 4060,
        "y": 1562,
        "brightness": 0.9003920830985048
      },
      {
        "id": "oph-7",
        "x": 4076,
        "y": 1578,
        "brightness": 0.9897768751497018
      },
      {
        "id": "oph-8",
        "x": 4155,
        "y": 1676,
        "brightness": 0.9151527726229199
      },
      {
        "id": "oph-9",
        "x": 4293,
        "y": 1762,
        "brightness": 0.9640361761950393
      },
      {
        "id": "oph-10",
        "x": 4130,
        "y": 1777,
        "brightness": 0.9430229492525753
      },
      {
        "id": "oph-11",
        "x": 4113,
        "y": 1808,
        "brightness": 0.8050658218167313
      },
      {
        "id": "oph-12",
        "x": 4100,
        "y": 1834,
        "brightness": 0.8396733417136277
      },
      {
        "id": "oph-13",
        "x": 4107,
        "y": 1891,
        "brightness": 0.867343234263834
      },
      {
        "id": "oph-14",
        "x": 4342,
        "y": 1917,
        "brightness": 0.9908996493924034
      },
      {
        "id": "oph-15",
        "x": 4364,
        "y": 1998,
        "brightness": 0.850852115123909
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
        "brightness": 0.9641164180035309
      },
      {
        "id": "pav-1",
        "x": 5187,
        "y": 2603,
        "brightness": 0.8983906323906944
      },
      {
        "id": "pav-2",
        "x": 5036,
        "y": 2603,
        "brightness": 0.9132626704069864
      },
      {
        "id": "pav-3",
        "x": 4718,
        "y": 2536,
        "brightness": 0.9219236290397163
      },
      {
        "id": "pav-4",
        "x": 4597,
        "y": 2525,
        "brightness": 0.9650733584536871
      },
      {
        "id": "pav-5",
        "x": 4536,
        "y": 2561,
        "brightness": 0.8700477873464889
      },
      {
        "id": "pav-6",
        "x": 4441,
        "y": 2579,
        "brightness": 0.9622715772010444
      },
      {
        "id": "pav-7",
        "x": 4679,
        "y": 2690,
        "brightness": 0.871388130033336
      },
      {
        "id": "pav-8",
        "x": 5002,
        "y": 2715,
        "brightness": 0.9297682298464636
      },
      {
        "id": "pav-9",
        "x": 5360,
        "y": 2589,
        "brightness": 0.8026078545708082
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
        "brightness": 0.9996666583918903
      },
      {
        "id": "phe-1",
        "x": 275,
        "y": 2279,
        "brightness": 0.8978880114220331
      },
      {
        "id": "phe-2",
        "x": 368,
        "y": 2222,
        "brightness": 0.8276220407102709
      },
      {
        "id": "phe-3",
        "x": 380,
        "y": 2318,
        "brightness": 0.9884310926678761
      },
      {
        "id": "phe-4",
        "x": 285,
        "y": 2421,
        "brightness": 0.8888214327454655
      },
      {
        "id": "phe-5",
        "x": 39,
        "y": 2262,
        "brightness": 0.9450652254401065
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
        "brightness": 0.9919951407783277
      },
      {
        "id": "pic-1",
        "x": 1458,
        "y": 2436,
        "brightness": 0.9574493228163747
      },
      {
        "id": "pic-2",
        "x": 1447,
        "y": 2351,
        "brightness": 0.8398477503795707
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
        "brightness": 0.9496595484025608
      },
      {
        "id": "psa-1",
        "x": 5740,
        "y": 1994,
        "brightness": 0.9334035317561067
      },
      {
        "id": "psa-2",
        "x": 5733,
        "y": 2042,
        "brightness": 0.9342964049870184
      },
      {
        "id": "psa-3",
        "x": 5719,
        "y": 2048,
        "brightness": 0.8997024281237157
      },
      {
        "id": "psa-4",
        "x": 5631,
        "y": 2039,
        "brightness": 0.8663376659179562
      },
      {
        "id": "psa-5",
        "x": 5535,
        "y": 2050,
        "brightness": 0.9881572926015004
      },
      {
        "id": "psa-6",
        "x": 5437,
        "y": 2050,
        "brightness": 0.8468861317665626
      },
      {
        "id": "psa-7",
        "x": 5449,
        "y": 2015,
        "brightness": 0.8031822362815331
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
        "brightness": 0.9379951099990641
      },
      {
        "id": "pup-1",
        "x": 1821,
        "y": 2118,
        "brightness": 0.9625776243561868
      },
      {
        "id": "pup-2",
        "x": 1897,
        "y": 1973,
        "brightness": 0.8528253269014824
      },
      {
        "id": "pup-3",
        "x": 1912,
        "y": 1947,
        "brightness": 0.9426124428258152
      },
      {
        "id": "pup-4",
        "x": 1955,
        "y": 1914,
        "brightness": 0.9884424511855036
      },
      {
        "id": "pup-5",
        "x": 1987,
        "y": 1881,
        "brightness": 0.9729259957795828
      },
      {
        "id": "pup-6",
        "x": 2031,
        "y": 1905,
        "brightness": 0.9890811588972519
      },
      {
        "id": "pup-7",
        "x": 2015,
        "y": 2167,
        "brightness": 0.8238656770648374
      },
      {
        "id": "pup-8",
        "x": 2040,
        "y": 2289,
        "brightness": 0.9052982799369602
      },
      {
        "id": "pup-9",
        "x": 1950,
        "y": 1932,
        "brightness": 0.9437998791833546
      },
      {
        "id": "pup-10",
        "x": 1933,
        "y": 1983,
        "brightness": 0.8829312563988367
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
        "brightness": 0.96788831716629
      },
      {
        "id": "pyx-1",
        "x": 2167,
        "y": 2088,
        "brightness": 0.8833753126829565
      },
      {
        "id": "pyx-2",
        "x": 2182,
        "y": 2053,
        "brightness": 0.836499349289955
      },
      {
        "id": "pyx-3",
        "x": 2211,
        "y": 1962,
        "brightness": 0.9271306778619474
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
        "brightness": 0.977485759581396
      },
      {
        "id": "ret-1",
        "x": 1069,
        "y": 2488,
        "brightness": 0.8185994236307744
      },
      {
        "id": "ret-2",
        "x": 995,
        "y": 2523,
        "brightness": 0.8398380785977514
      },
      {
        "id": "ret-3",
        "x": 934,
        "y": 2580,
        "brightness": 0.8212925192251116
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
        "brightness": 0.8803468026254212
      },
      {
        "id": "sgr-1",
        "x": 4601,
        "y": 2073,
        "brightness": 0.8095897303428186
      },
      {
        "id": "sgr-2",
        "x": 4587,
        "y": 1997,
        "brightness": 0.9099359908386905
      },
      {
        "id": "sgr-3",
        "x": 4617,
        "y": 1924,
        "brightness": 0.8105609728203123
      },
      {
        "id": "sgr-4",
        "x": 4557,
        "y": 1851,
        "brightness": 0.9456860343107947
      },
      {
        "id": "sgr-5",
        "x": 4844,
        "y": 2241,
        "brightness": 0.8696941362458291
      },
      {
        "id": "sgr-6",
        "x": 4850,
        "y": 2177,
        "brightness": 0.9308962763907552
      },
      {
        "id": "sgr-7",
        "x": 4761,
        "y": 1998,
        "brightness": 0.9988786987246079
      },
      {
        "id": "sgr-8",
        "x": 4690,
        "y": 1950,
        "brightness": 0.8174319297759418
      },
      {
        "id": "sgr-9",
        "x": 4980,
        "y": 2198,
        "brightness": 0.826967903090245
      },
      {
        "id": "sgr-10",
        "x": 4999,
        "y": 2088,
        "brightness": 0.8707596513628793
      },
      {
        "id": "sgr-11",
        "x": 4983,
        "y": 1938,
        "brightness": 0.8426071882574545
      },
      {
        "id": "sgr-12",
        "x": 4903,
        "y": 1915,
        "brightness": 0.9493965879174144
      },
      {
        "id": "sgr-13",
        "x": 4855,
        "y": 1908,
        "brightness": 0.9081251523593097
      },
      {
        "id": "sgr-14",
        "x": 4815,
        "y": 1921,
        "brightness": 0.9465129153268366
      },
      {
        "id": "sgr-15",
        "x": 4730,
        "y": 1938,
        "brightness": 0.9314217627019246
      },
      {
        "id": "sgr-16",
        "x": 4524,
        "y": 2007,
        "brightness": 0.8967025212462056
      },
      {
        "id": "sgr-17",
        "x": 4779,
        "y": 1961,
        "brightness": 0.915705389902804
      },
      {
        "id": "sgr-18",
        "x": 4770,
        "y": 1862,
        "brightness": 0.9515652940423243
      },
      {
        "id": "sgr-19",
        "x": 4791,
        "y": 1850,
        "brightness": 0.8026229212206422
      },
      {
        "id": "sgr-20",
        "x": 4823,
        "y": 1816,
        "brightness": 0.8656438805127021
      },
      {
        "id": "sgr-21",
        "x": 4840,
        "y": 1797,
        "brightness": 0.9970888215618494
      },
      {
        "id": "sgr-22",
        "x": 4841,
        "y": 1766,
        "brightness": 0.9493625824279325
      },
      {
        "id": "sgr-23",
        "x": 4741,
        "y": 1852,
        "brightness": 0.9870125047236504
      },
      {
        "id": "sgr-24",
        "x": 4726,
        "y": 1879,
        "brightness": 0.8789035799587607
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
        "brightness": 0.9191774773314597
      },
      {
        "id": "sco-1",
        "x": 4001,
        "y": 1877,
        "brightness": 0.8032006281162725
      },
      {
        "id": "sco-2",
        "x": 4023,
        "y": 1830,
        "brightness": 0.9322153362448276
      },
      {
        "id": "sco-3",
        "x": 4088,
        "y": 1927,
        "brightness": 0.9511836808003576
      },
      {
        "id": "sco-4",
        "x": 4123,
        "y": 1941,
        "brightness": 0.9084795467720117
      },
      {
        "id": "sco-5",
        "x": 4150,
        "y": 1970,
        "brightness": 0.8248953083132584
      },
      {
        "id": "sco-6",
        "x": 4209,
        "y": 2072,
        "brightness": 0.9098950742268365
      },
      {
        "id": "sco-7",
        "x": 4216,
        "y": 2134,
        "brightness": 0.9323117459045256
      },
      {
        "id": "sco-8",
        "x": 4227,
        "y": 2206,
        "brightness": 0.9238286489830263
      },
      {
        "id": "sco-9",
        "x": 4301,
        "y": 2221,
        "brightness": 0.8747200542358097
      },
      {
        "id": "sco-10",
        "x": 4405,
        "y": 2217,
        "brightness": 0.8246520245274083
      },
      {
        "id": "sco-11",
        "x": 4448,
        "y": 2169,
        "brightness": 0.9948484382974709
      },
      {
        "id": "sco-12",
        "x": 4427,
        "y": 2151,
        "brightness": 0.9709273033239887
      },
      {
        "id": "sco-13",
        "x": 4390,
        "y": 2118,
        "brightness": 0.8440572678108241
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
        "brightness": 0.8170175813006866
      },
      {
        "id": "scl-1",
        "x": 5954,
        "y": 1969,
        "brightness": 0.9453193296731285
      },
      {
        "id": "scl-2",
        "x": 5828,
        "y": 2042,
        "brightness": 0.9596332571799959
      },
      {
        "id": "scl-3",
        "x": 5887,
        "y": 2130,
        "brightness": 0.896033666946441
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
        "brightness": 0.8416067610132602
      },
      {
        "id": "sct-1",
        "x": 4697,
        "y": 1579,
        "brightness": 0.9585456990860669
      },
      {
        "id": "sct-2",
        "x": 4676,
        "y": 1651,
        "brightness": 0.8651566204103037
      },
      {
        "id": "sct-3",
        "x": 4622,
        "y": 1743,
        "brightness": 0.8697976550530743
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
        "brightness": 0.8590511704892203
      },
      {
        "id": "ser-2-1",
        "x": 4407,
        "y": 1757,
        "brightness": 0.898315528573863
      },
      {
        "id": "ser-2-2",
        "x": 4496,
        "y": 1663,
        "brightness": 0.9458689008654716
      },
      {
        "id": "ser-2-3",
        "x": 4513,
        "y": 1636,
        "brightness": 0.9270734933141783
      },
      {
        "id": "ser-2-4",
        "x": 4589,
        "y": 1548,
        "brightness": 0.8991527468394612
      },
      {
        "id": "ser-2-5",
        "x": 4734,
        "y": 1430,
        "brightness": 0.8462453573140938
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
        "brightness": 0.8426826916889327
      },
      {
        "id": "sex-1",
        "x": 2469,
        "y": 1635,
        "brightness": 0.9667758227166958
      },
      {
        "id": "sex-2",
        "x": 2623,
        "y": 1546,
        "brightness": 0.9558228829554706
      },
      {
        "id": "sex-3",
        "x": 2626,
        "y": 1511,
        "brightness": 0.9895178080638304
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
        "brightness": 0.9413168756583034
      },
      {
        "id": "tel-1",
        "x": 4612,
        "y": 2266,
        "brightness": 0.8352837667583211
      },
      {
        "id": "tel-2",
        "x": 4620,
        "y": 2318,
        "brightness": 0.9315956946150501
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
        "brightness": 0.9667389310868187
      },
      {
        "id": "tra-1",
        "x": 3980,
        "y": 2557,
        "brightness": 0.8390983919204051
      },
      {
        "id": "tra-2",
        "x": 3829,
        "y": 2645,
        "brightness": 0.9423663392915564
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
        "x": 5577,
        "y": 2504,
        "brightness": 0.9179641395380415
      },
      {
        "id": "tuc-1",
        "x": 5823,
        "y": 2471,
        "brightness": 0.9626311986326831
      },
      {
        "id": "tuc-2",
        "x": 6131,
        "y": 2549,
        "brightness": 0.8470375434153091
      },
      {
        "id": "tuc-3",
        "x": 6084,
        "y": 2581,
        "brightness": 0.9180036666935544
      },
      {
        "id": "tuc-4",
        "x": 6000,
        "y": 2593,
        "brightness": 0.960585588248384
      },
      {
        "id": "tuc-5",
        "x": 5614,
        "y": 2583,
        "brightness": 0.9168854771759366
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
        "brightness": 0.8302401163450512
      },
      {
        "id": "vel-1",
        "x": 2342,
        "y": 2417,
        "brightness": 0.95389019032676
      },
      {
        "id": "vel-2",
        "x": 2487,
        "y": 2409,
        "brightness": 0.850996310239613
      },
      {
        "id": "vel-3",
        "x": 2695,
        "y": 2324,
        "brightness": 0.9789725476399406
      },
      {
        "id": "vel-4",
        "x": 2561,
        "y": 2202,
        "brightness": 0.8345303135326871
      },
      {
        "id": "vel-5",
        "x": 2378,
        "y": 2174,
        "brightness": 0.9076005804447795
      },
      {
        "id": "vel-6",
        "x": 2283,
        "y": 2224,
        "brightness": 0.9097147504996413
      },
      {
        "id": "vel-7",
        "x": 2040,
        "y": 2289,
        "brightness": 0.8498269138811367
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
        "brightness": 0.9321621733572834
      },
      {
        "id": "vir-1",
        "x": 2961,
        "y": 1471,
        "brightness": 0.8342914041060577
      },
      {
        "id": "vir-2",
        "x": 3083,
        "y": 1511,
        "brightness": 0.9074928492880081
      },
      {
        "id": "vir-3",
        "x": 3174,
        "y": 1524,
        "brightness": 0.9114367170695223
      },
      {
        "id": "vir-4",
        "x": 3291,
        "y": 1592,
        "brightness": 0.9787429386867073
      },
      {
        "id": "vir-5",
        "x": 3355,
        "y": 1686,
        "brightness": 0.8976684051700952
      },
      {
        "id": "vir-6",
        "x": 3567,
        "y": 1600,
        "brightness": 0.9600352072925542
      },
      {
        "id": "vir-7",
        "x": 3679,
        "y": 1594,
        "brightness": 0.90223623575523
      },
      {
        "id": "vir-8",
        "x": 3259,
        "y": 1317,
        "brightness": 0.955293237574757
      },
      {
        "id": "vir-9",
        "x": 3232,
        "y": 1443,
        "brightness": 0.9446885513070986
      },
      {
        "id": "vir-10",
        "x": 3395,
        "y": 1510,
        "brightness": 0.8942357495639015
      },
      {
        "id": "vir-11",
        "x": 3507,
        "y": 1474,
        "brightness": 0.9007337692076389
      },
      {
        "id": "vir-12",
        "x": 3693,
        "y": 1468,
        "brightness": 0.8950658389939989
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
        "brightness": 0.8280919652309646
      },
      {
        "id": "vol-1",
        "x": 2107,
        "y": 2602,
        "brightness": 0.8584351010637274
      },
      {
        "id": "vol-2",
        "x": 2033,
        "y": 2644,
        "brightness": 0.857622474062326
      },
      {
        "id": "vol-3",
        "x": 1820,
        "y": 2633,
        "brightness": 0.9734582143768504
      },
      {
        "id": "vol-4",
        "x": 1786,
        "y": 2675,
        "brightness": 0.9494873285424674
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
