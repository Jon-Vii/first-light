// src/game/StarField.ts
class StarField {
  skyWidth;
  skyHeight;
  stars;
  backgroundStars;
  time = 0;
  constructor(skyWidth, skyHeight) {
    this.skyWidth = skyWidth;
    this.skyHeight = skyHeight;
    this.stars = this.generateStars(800);
    this.backgroundStars = this.generateBackgroundStars(200);
  }
  generateStars(count) {
    const stars = [];
    let seed = 12345;
    const random = () => {
      seed = seed * 1103515245 + 12345 & 2147483647;
      return seed / 2147483647;
    };
    for (let i = 0;i < count; i++) {
      stars.push({
        x: random() * this.skyWidth,
        y: random() * this.skyHeight,
        size: random() * 2 + 0.5,
        brightness: random() * 0.5 + 0.5,
        twinkleOffset: random() * Math.PI * 2
      });
    }
    return stars;
  }
  generateBackgroundStars(count) {
    const stars = [];
    let seed = 67890;
    const random = () => {
      seed = seed * 1103515245 + 12345 & 2147483647;
      return seed / 2147483647;
    };
    for (let i = 0;i < count; i++) {
      stars.push({
        x: random() * this.skyWidth,
        y: random() * this.skyHeight,
        size: random() * 1.5 + 0.3,
        brightness: random() * 0.6 + 0.2,
        twinkleOffset: random() * Math.PI * 2
      });
    }
    return stars;
  }
  getBackgroundStars() {
    return this.backgroundStars;
  }
  render(ctx, viewX, viewY, canvasWidth, canvasHeight, telescopePos) {
    this.time += 0.016;
    for (const star of this.stars) {
      const screenX = star.x - viewX + canvasWidth / 2;
      const screenY = star.y - viewY + canvasHeight / 2;
      if (screenX < -50 || screenX > canvasWidth + 50 || screenY < -50 || screenY > canvasHeight + 50) {
        continue;
      }
      const twinkle = Math.sin(this.time * 2 + star.twinkleOffset) * 0.2 + 0.8;
      const brightness = star.brightness * twinkle;
      this.drawStar(ctx, screenX, screenY, star.size, brightness);
    }
  }
  drawStar(ctx, x, y, size, brightness) {
    const glowGradient = ctx.createRadialGradient(x, y, 0, x, y, size * 4);
    glowGradient.addColorStop(0, `rgba(200, 210, 255, ${brightness * 0.3})`);
    glowGradient.addColorStop(0.5, `rgba(200, 210, 255, ${brightness * 0.1})`);
    glowGradient.addColorStop(1, "rgba(200, 210, 255, 0)");
    ctx.beginPath();
    ctx.arc(x, y, size * 4, 0, Math.PI * 2);
    ctx.fillStyle = glowGradient;
    ctx.fill();
    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, 255, 255, ${brightness})`;
    ctx.fill();
  }
}

// src/game/Telescope.ts
class Telescope {
  element;
  radius;
  currentOffsetX = 0;
  currentOffsetY = 0;
  targetOffsetX = 0;
  targetOffsetY = 0;
  defaultLagFactor = 0.06;
  currentLagFactor = 0.06;
  radiusMultiplier = 1;
  resizeHandler;
  constructor(element) {
    this.element = element;
    this.radius = this.calculateRadius();
    this.resizeHandler = () => {
      this.radius = this.calculateRadius();
      this.updateElementPosition();
    };
    window.addEventListener("resize", this.resizeHandler);
    this.updateElementPosition();
  }
  calculateRadius() {
    return Math.min(window.innerWidth, window.innerHeight) * 0.36 * this.radiusMultiplier;
  }
  setDriftFactor(factor) {
    this.currentLagFactor = this.defaultLagFactor + factor * 0.14;
  }
  destroy() {
    window.removeEventListener("resize", this.resizeHandler);
  }
  setRadiusMultiplier(multiplier) {
    this.radiusMultiplier = multiplier;
    this.radius = this.calculateRadius();
  }
  update(mouseX, mouseY, deltaTime) {
    this.targetOffsetX = mouseX - window.innerWidth / 2;
    this.targetOffsetY = mouseY - window.innerHeight / 2;
    const lagAmount = 1 - Math.pow(1 - this.currentLagFactor, deltaTime * 60);
    const dx = this.targetOffsetX - this.currentOffsetX;
    const dy = this.targetOffsetY - this.currentOffsetY;
    this.currentOffsetX += dx * lagAmount;
    this.currentOffsetY += dy * lagAmount;
  }
  updateElementPosition() {
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    this.element.style.left = `${centerX}px`;
    this.element.style.top = `${centerY}px`;
  }
  getPosition() {
    return {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2
    };
  }
  getViewOffset() {
    return {
      x: this.currentOffsetX,
      y: this.currentOffsetY
    };
  }
  getRadius() {
    return this.radius;
  }
  magnification = 1;
  setMagnification(level) {
    this.magnification = level;
  }
  getMagnification() {
    return this.magnification;
  }
  getInWorldRadius() {
    return this.radius / this.magnification;
  }
}

// src/data/constellations-generated.ts
var SKY_WIDTH = 6000;
var SKY_HEIGHT = 3000;
var OBSERVATORIES = {
  northern: {
    id: "northern",
    name: "Alpine Observatory",
    location: "Swiss Alps, 46°N",
    description: "A historic mountain observatory with crisp, clear skies perfect for viewing northern constellations."
  },
  southern: {
    id: "southern",
    name: "Atacama Observatory",
    location: "Chile, 24°S",
    description: "One of the driest places on Earth, offering unparalleled views of the southern celestial hemisphere."
  }
};
var CONSTELLATIONS = [
  {
    id: "and",
    name: "Andromeda",
    latinName: "Andromeda",
    description: "The Chained Princess - Home to the Andromeda Galaxy, our nearest major galaxy.",
    centerX: 6137,
    centerY: 866,
    radius: 100,
    discovered: false,
    observatory: "northern",
    stars: [
      {
        id: "and-0",
        x: 6516,
        y: 795,
        brightness: 0.9620375792412359
      },
      {
        id: "and-1",
        x: 6291,
        y: 906,
        brightness: 0.9539600694919892
      },
      {
        id: "and-2",
        x: 6164,
        y: 986,
        brightness: 0.8442559488824752
      },
      {
        id: "and-3",
        x: 6035,
        y: 1015,
        brightness: 0.9066089978527462
      },
      {
        id: "and-4",
        x: 6238,
        y: 1110,
        brightness: 0.8190373602716711
      },
      {
        id: "and-5",
        x: 6197,
        y: 1096,
        brightness: 0.8078582302172482
      },
      {
        id: "and-6",
        x: 6161,
        y: 1011,
        brightness: 0.8617579805036171
      },
      {
        id: "and-7",
        x: 6154,
        y: 938,
        brightness: 0.8695561889308879
      },
      {
        id: "and-8",
        x: 5909,
        y: 779,
        brightness: 0.9525175041596396
      },
      {
        id: "and-9",
        x: 5758,
        y: 795,
        brightness: 0.8787642494797793
      },
      {
        id: "and-10",
        x: 5918,
        y: 761,
        brightness: 0.9706663090860288
      },
      {
        id: "and-11",
        x: 5907,
        y: 726,
        brightness: 0.9590802117976294
      },
      {
        id: "and-12",
        x: 6236,
        y: 858,
        brightness: 0.9147656992589484
      },
      {
        id: "and-13",
        x: 6208,
        y: 815,
        brightness: 0.8561203879625044
      },
      {
        id: "and-14",
        x: 6290,
        y: 713,
        brightness: 0.9794980302752021
      },
      {
        id: "and-15",
        x: 6408,
        y: 690,
        brightness: 0.8405811359544688
      },
      {
        id: "and-16",
        x: 5942,
        y: 726,
        brightness: 0.8717961126497221
      }
    ],
    connections: [
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
    set: "royal"
  },
  {
    id: "aql",
    name: "Aquila",
    latinName: "Aquila",
    description: "The Eagle - Contains Altair, one of the Summer Triangle stars.",
    centerX: 4913,
    centerY: 1420,
    radius: 100,
    discovered: false,
    observatory: "northern",
    stars: [
      {
        id: "aql-0",
        x: 4943,
        y: 1323,
        brightness: 0.8311662195289986
      },
      {
        id: "aql-1",
        x: 4962,
        y: 1352,
        brightness: 0.8480625825820228
      },
      {
        id: "aql-2",
        x: 4980,
        y: 1393,
        brightness: 0.8585178797244517
      },
      {
        id: "aql-3",
        x: 5047,
        y: 1514,
        brightness: 0.916655561314364
      },
      {
        id: "aql-4",
        x: 4969,
        y: 1483,
        brightness: 0.8056836865502524
      },
      {
        id: "aql-5",
        x: 4856,
        y: 1448,
        brightness: 0.8652493358414441
      },
      {
        id: "aql-6",
        x: 4773,
        y: 1269,
        brightness: 0.953390902994255
      },
      {
        id: "aql-7",
        x: 4776,
        y: 1581,
        brightness: 0.9883859285284333
      }
    ],
    connections: [
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
    id: "ari",
    name: "Aries",
    latinName: "Aries",
    description: "The Ram - A zodiac constellation marking the spring equinox.",
    centerX: 547,
    centerY: 1122,
    radius: 100,
    discovered: false,
    observatory: "northern",
    stars: [
      {
        id: "ari-0",
        x: 708,
        y: 1046,
        brightness: 0.8922248274391695
      },
      {
        id: "ari-1",
        x: 530,
        y: 1109,
        brightness: 0.8642925443124844
      },
      {
        id: "ari-2",
        x: 478,
        y: 1153,
        brightness: 0.838519434208359
      },
      {
        id: "ari-3",
        x: 473,
        y: 1178,
        brightness: 0.8157015636762219
      }
    ],
    connections: [
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
    set: "zodiac"
  },
  {
    id: "aur",
    name: "Auriga",
    latinName: "Auriga",
    description: "The Charioteer - Contains bright Capella, the sixth-brightest star.",
    centerX: 1356,
    centerY: 814,
    radius: 100,
    discovered: false,
    observatory: "northern",
    stars: [
      {
        id: "aur-0",
        x: 1498,
        y: 751,
        brightness: 0.8473921615656506
      },
      {
        id: "aur-1",
        x: 1320,
        y: 733,
        brightness: 0.8609393411401669
      },
      {
        id: "aur-2",
        x: 1277,
        y: 813,
        brightness: 0.9919329587739957
      },
      {
        id: "aur-3",
        x: 1237,
        y: 947,
        brightness: 0.9918777025011927
      },
      {
        id: "aur-4",
        x: 1360,
        y: 1023,
        brightness: 0.9702992811920857
      },
      {
        id: "aur-5",
        x: 1499,
        y: 880,
        brightness: 0.8216339313128991
      },
      {
        id: "aur-6",
        x: 1498,
        y: 595,
        brightness: 0.8801322635398034
      },
      {
        id: "aur-7",
        x: 1258,
        y: 770,
        brightness: 0.9032729308386923
      },
      {
        id: "aur-8",
        x: 1260,
        y: 815,
        brightness: 0.8936522084137619
      }
    ],
    connections: [
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
    id: "boo",
    name: "Boötes",
    latinName: "Boötes",
    description: "The Herdsman - Contains Arcturus, the fourth-brightest star in the sky.",
    centerX: 3618,
    centerY: 961,
    radius: 100,
    discovered: false,
    observatory: "northern",
    stars: [
      {
        id: "boo-0",
        x: 3447,
        y: 1209,
        brightness: 0.8539275462512984
      },
      {
        id: "boo-1",
        x: 3478,
        y: 1193,
        brightness: 0.8640101501359819
      },
      {
        id: "boo-2",
        x: 3565,
        y: 1180,
        brightness: 0.8668974812473763
      },
      {
        id: "boo-3",
        x: 3633,
        y: 994,
        brightness: 0.9303742408547278
      },
      {
        id: "boo-4",
        x: 3634,
        y: 862,
        brightness: 0.8587432341740229
      },
      {
        id: "boo-5",
        x: 3758,
        y: 827,
        brightness: 0.9209741304861594
      },
      {
        id: "boo-6",
        x: 3815,
        y: 945,
        brightness: 0.9956573969075023
      },
      {
        id: "boo-7",
        x: 3687,
        y: 1049,
        brightness: 0.8399943938471383
      },
      {
        id: "boo-8",
        x: 3671,
        y: 1271,
        brightness: 0.8183823621962341
      },
      {
        id: "boo-9",
        x: 3568,
        y: 732,
        brightness: 0.8346791490284258
      },
      {
        id: "boo-10",
        x: 3556,
        y: 637,
        brightness: 0.8921158501447553
      },
      {
        id: "boo-11",
        x: 3605,
        y: 636,
        brightness: 0.8321847568868502
      }
    ],
    connections: [
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
    set: "ursa"
  },
  {
    id: "cam",
    name: "Camelopardalis",
    latinName: "Camelopardalis",
    description: "The Giraffe - A large but faint northern constellation.",
    centerX: 1231,
    centerY: 409,
    radius: 100,
    discovered: false,
    observatory: "northern",
    stars: [
      {
        id: "cam-0",
        x: 1239,
        y: 604,
        brightness: 0.8763445322059121
      },
      {
        id: "cam-1",
        x: 1264,
        y: 493,
        brightness: 0.9118687083815054
      },
      {
        id: "cam-2",
        x: 1225,
        y: 394,
        brightness: 0.9828701862453584
      },
      {
        id: "cam-3",
        x: 960,
        y: 311,
        brightness: 0.9513330805815039
      },
      {
        id: "cam-4",
        x: 956,
        y: 408,
        brightness: 0.9779590463668599
      },
      {
        id: "cam-5",
        x: 871,
        y: 501,
        brightness: 0.9246127428979205
      },
      {
        id: "cam-6",
        x: 1579,
        y: 345,
        brightness: 0.8759038507193742
      },
      {
        id: "cam-7",
        x: 1750,
        y: 217,
        brightness: 0.8208516462438068
      }
    ],
    connections: [
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
    id: "cnc",
    name: "Cancer",
    latinName: "Cancer",
    description: "The Crab - A zodiac constellation containing the Beehive Cluster.",
    centerX: 2175,
    centerY: 1202,
    radius: 100,
    discovered: false,
    observatory: "northern",
    stars: [
      {
        id: "cnc-0",
        x: 2244,
        y: 1302,
        brightness: 0.9932500409496179
      },
      {
        id: "cnc-1",
        x: 2186,
        y: 1197,
        brightness: 0.9072884567326159
      },
      {
        id: "cnc-2",
        x: 2180,
        y: 1142,
        brightness: 0.953886799437287
      },
      {
        id: "cnc-3",
        x: 2194,
        y: 1021,
        brightness: 0.8051888190114975
      },
      {
        id: "cnc-4",
        x: 2069,
        y: 1347,
        brightness: 0.9892711666663944
      }
    ],
    connections: [
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
    set: "zodiac"
  },
  {
    id: "cvn",
    name: "Canes Venatici",
    latinName: "Canes Venatici",
    description: "The Hunting Dogs - Contains the beautiful Whirlpool Galaxy.",
    centerX: 3187,
    centerY: 836,
    radius: 63,
    discovered: false,
    observatory: "northern",
    stars: [
      {
        id: "cvn-0",
        x: 3233,
        y: 861,
        brightness: 0.8037113796575756
      },
      {
        id: "cvn-1",
        x: 3141,
        y: 811,
        brightness: 0.9860565806409667
      }
    ],
    connections: [
      [
        0,
        1
      ]
    ],
    set: "ursa"
  },
  {
    id: "cmi",
    name: "Canis Minor",
    latinName: "Canis Minor",
    description: "The Little Dog - Contains Procyon, the eighth-brightest star.",
    centerX: 1889,
    centerY: 1388,
    radius: 50,
    discovered: false,
    observatory: "northern",
    stars: [
      {
        id: "cmi-0",
        x: 1914,
        y: 1413,
        brightness: 0.8616559703101181
      },
      {
        id: "cmi-1",
        x: 1863,
        y: 1362,
        brightness: 0.8961333321863543
      }
    ],
    connections: [
      [
        0,
        1
      ]
    ],
    set: "orion"
  },
  {
    id: "cas",
    name: "Cassiopeia",
    latinName: "Cassiopeia",
    description: "The Queen - Famous W-shaped constellation circling the North Pole.",
    centerX: 256,
    centerY: 499,
    radius: 100,
    discovered: false,
    observatory: "northern",
    stars: [
      {
        id: "cas-0",
        x: 477,
        y: 439,
        brightness: 0.9097474323387396
      },
      {
        id: "cas-1",
        x: 358,
        y: 496,
        brightness: 0.8355579724612648
      },
      {
        id: "cas-2",
        x: 236,
        y: 488,
        brightness: 0.9148980960650501
      },
      {
        id: "cas-3",
        x: 169,
        y: 558,
        brightness: 0.9552904107154736
      },
      {
        id: "cas-4",
        x: 38,
        y: 514,
        brightness: 0.9275716322542573
      }
    ],
    connections: [
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
    set: "royal"
  },
  {
    id: "cep",
    name: "Cepheus",
    latinName: "Cepheus",
    description: "The King - A circumpolar constellation, husband of Cassiopeia.",
    centerX: 5479,
    centerY: 443,
    radius: 100,
    discovered: false,
    observatory: "northern",
    stars: [
      {
        id: "cep-0",
        x: 5123,
        y: 450,
        brightness: 0.8935790009328494
      },
      {
        id: "cep-1",
        x: 5189,
        y: 469,
        brightness: 0.8173236410228053
      },
      {
        id: "cep-2",
        x: 5327,
        y: 457,
        brightness: 0.97929040245382
      },
      {
        id: "cep-3",
        x: 5431,
        y: 520,
        brightness: 0.8206677016687691
      },
      {
        id: "cep-4",
        x: 5563,
        y: 549,
        brightness: 0.9131897110976548
      },
      {
        id: "cep-5",
        x: 5545,
        y: 530,
        brightness: 0.8451883081814345
      },
      {
        id: "cep-6",
        x: 5622,
        y: 526,
        brightness: 0.8233080849713088
      },
      {
        id: "cep-7",
        x: 5707,
        y: 397,
        brightness: 0.9751814272928662
      },
      {
        id: "cep-8",
        x: 5914,
        y: 206,
        brightness: 0.9034271135977292
      },
      {
        id: "cep-9",
        x: 5369,
        y: 324,
        brightness: 0.85714794196135
      }
    ],
    connections: [
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
    set: "royal"
  },
  {
    id: "com",
    name: "Coma Berenices",
    latinName: "Coma Berenices",
    description: "Berenice's Hair - Named after an Egyptian queen's sacrifice.",
    centerX: 3234,
    centerY: 1091,
    radius: 100,
    discovered: false,
    observatory: "northern",
    stars: [
      {
        id: "com-0",
        x: 3292,
        y: 1208,
        brightness: 0.9430047650157299
      },
      {
        id: "com-1",
        x: 3299,
        y: 1035,
        brightness: 0.979152809837747
      },
      {
        id: "com-2",
        x: 3112,
        y: 1029,
        brightness: 0.9223670805711096
      }
    ],
    connections: [
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
    id: "crb",
    name: "Corona Borealis",
    latinName: "Corona Borealis",
    description: "The Northern Crown - A distinctive semicircular constellation.",
    centerX: 3933,
    centerY: 1033,
    radius: 95,
    discovered: false,
    observatory: "northern",
    stars: [
      {
        id: "crb-0",
        x: 3887,
        y: 977,
        brightness: 0.9073657127484523
      },
      {
        id: "crb-1",
        x: 3866,
        y: 1015,
        brightness: 0.8908890948877349
      },
      {
        id: "crb-2",
        x: 3895,
        y: 1055,
        brightness: 0.859485090931614
      },
      {
        id: "crb-3",
        x: 3928,
        y: 1062,
        brightness: 0.9599141162523968
      },
      {
        id: "crb-4",
        x: 3957,
        y: 1066,
        brightness: 0.9185153496858479
      },
      {
        id: "crb-5",
        x: 3990,
        y: 1052,
        brightness: 0.9642170374423666
      },
      {
        id: "crb-6",
        x: 4006,
        y: 1002,
        brightness: 0.9646267469784564
      }
    ],
    connections: [
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
    id: "cyg",
    name: "Cygnus",
    latinName: "Cygnus",
    description: "The Swan - Contains Deneb and the Northern Cross asterism.",
    centerX: 5029,
    centerY: 828,
    radius: 100,
    discovered: false,
    observatory: "northern",
    stars: [
      {
        id: "cyg-0",
        x: 5304,
        y: 996,
        brightness: 0.8504890200842548
      },
      {
        id: "cyg-1",
        x: 5193,
        y: 934,
        brightness: 0.8180230529393824
      },
      {
        id: "cyg-2",
        x: 5093,
        y: 829,
        brightness: 0.9034269731492583
      },
      {
        id: "cyg-3",
        x: 4937,
        y: 748,
        brightness: 0.9599865688424805
      },
      {
        id: "cyg-4",
        x: 4874,
        y: 638,
        brightness: 0.8410474676071025
      },
      {
        id: "cyg-5",
        x: 4821,
        y: 611,
        brightness: 0.8935455968638081
      },
      {
        id: "cyg-6",
        x: 5173,
        y: 745,
        brightness: 0.9621251010320908
      },
      {
        id: "cyg-7",
        x: 4985,
        y: 915,
        brightness: 0.9749130073582575
      },
      {
        id: "cyg-8",
        x: 4878,
        y: 1034,
        brightness: 0.931618008797589
      }
    ],
    connections: [
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
    id: "del",
    name: "Delphinus",
    latinName: "Delphinus",
    description: "The Dolphin - A small but distinctive constellation.",
    centerX: 5167,
    centerY: 1257,
    radius: 75,
    discovered: false,
    observatory: "northern",
    stars: [
      {
        id: "del-0",
        x: 5138,
        y: 1312,
        brightness: 0.8425755544025968
      },
      {
        id: "del-1",
        x: 5156,
        y: 1257,
        brightness: 0.9917086963853232
      },
      {
        id: "del-2",
        x: 5165,
        y: 1235,
        brightness: 0.960863781644409
      },
      {
        id: "del-3",
        x: 5194,
        y: 1231,
        brightness: 0.8103362155052373
      },
      {
        id: "del-4",
        x: 5181,
        y: 1249,
        brightness: 0.8664538031023676
      }
    ],
    connections: [
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
    set: "waters"
  },
  {
    id: "dra",
    name: "Draco",
    latinName: "Draco",
    description: "The Dragon - Winds around the north celestial pole.",
    centerX: 4162,
    centerY: 449,
    radius: 100,
    discovered: false,
    observatory: "northern",
    stars: [
      {
        id: "dra-0",
        x: 4473,
        y: 552,
        brightness: 0.8969924348010511
      },
      {
        id: "dra-1",
        x: 4486,
        y: 642,
        brightness: 0.9346478965003903
      },
      {
        id: "dra-2",
        x: 4377,
        y: 628,
        brightness: 0.9288886792177382
      },
      {
        id: "dra-3",
        x: 4384,
        y: 580,
        brightness: 0.8294873582921167
      },
      {
        id: "dra-4",
        x: 4802,
        y: 372,
        brightness: 0.9054574268024973
      },
      {
        id: "dra-5",
        x: 4586,
        y: 311,
        brightness: 0.8214009925054847
      },
      {
        id: "dra-6",
        x: 4287,
        y: 405,
        brightness: 0.9015847493308244
      },
      {
        id: "dra-7",
        x: 4100,
        y: 475,
        brightness: 0.9531668946055786
      },
      {
        id: "dra-8",
        x: 4008,
        y: 524,
        brightness: 0.9170498695699878
      },
      {
        id: "dra-9",
        x: 3854,
        y: 517,
        brightness: 0.9978249956415447
      },
      {
        id: "dra-10",
        x: 3518,
        y: 427,
        brightness: 0.8089228515801359
      },
      {
        id: "dra-11",
        x: 3140,
        y: 337,
        brightness: 0.9716582475566861
      },
      {
        id: "dra-12",
        x: 2881,
        y: 344,
        brightness: 0.9604556637661621
      },
      {
        id: "dra-13",
        x: 4588,
        y: 288,
        brightness: 0.83770613304065
      },
      {
        id: "dra-14",
        x: 4951,
        y: 329,
        brightness: 0.9180188522058751
      }
    ],
    connections: [
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
    set: "ursa"
  },
  {
    id: "equ",
    name: "Equuleus",
    latinName: "Equuleus",
    description: "The Little Horse - The second-smallest constellation.",
    centerX: 5306,
    centerY: 1359,
    radius: 66,
    discovered: false,
    observatory: "northern",
    stars: [
      {
        id: "equ-0",
        x: 5316,
        y: 1413,
        brightness: 0.9132170640475785
      },
      {
        id: "equ-1",
        x: 5310,
        y: 1333,
        brightness: 0.8585041549047774
      },
      {
        id: "equ-2",
        x: 5293,
        y: 1331,
        brightness: 0.9004940416559882
      }
    ],
    connections: [
      [
        0,
        1
      ],
      [
        1,
        2
      ]
    ],
    set: "waters"
  },
  {
    id: "gem",
    name: "Gemini",
    latinName: "Gemini",
    description: "The Twins - A zodiac constellation with bright Castor and Pollux.",
    centerX: 1762,
    centerY: 1117,
    radius: 100,
    discovered: false,
    observatory: "northern",
    stars: [
      {
        id: "gem-0",
        x: 1562,
        y: 1125,
        brightness: 0.8304466187228083
      },
      {
        id: "gem-1",
        x: 1596,
        y: 1125,
        brightness: 0.9664063368039836
      },
      {
        id: "gem-2",
        x: 1683,
        y: 1081,
        brightness: 0.9861864867849189
      },
      {
        id: "gem-3",
        x: 1796,
        y: 996,
        brightness: 0.8586036120265661
      },
      {
        id: "gem-4",
        x: 1894,
        y: 969,
        brightness: 0.9349379520634513
      },
      {
        id: "gem-5",
        x: 1939,
        y: 1033,
        brightness: 0.8409463094073719
      },
      {
        id: "gem-6",
        x: 1900,
        y: 1052,
        brightness: 0.9145754820793083
      },
      {
        id: "gem-7",
        x: 1834,
        y: 1134,
        brightness: 0.915759044781348
      },
      {
        id: "gem-8",
        x: 1767,
        y: 1157,
        brightness: 0.8320694409382909
      },
      {
        id: "gem-9",
        x: 1657,
        y: 1227,
        brightness: 0.8660299472115498
      },
      {
        id: "gem-10",
        x: 1689,
        y: 1285,
        brightness: 0.9906871455969046
      },
      {
        id: "gem-11",
        x: 1825,
        y: 1224,
        brightness: 0.8681793323095665
      }
    ],
    connections: [
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
    set: "zodiac"
  },
  {
    id: "her",
    name: "Hercules",
    latinName: "Hercules",
    description: "The Hero - The fifth-largest constellation, containing M13.",
    centerX: 4252,
    centerY: 957,
    radius: 100,
    discovered: false,
    observatory: "northern",
    stars: [
      {
        id: "her-0",
        x: 4091,
        y: 1181,
        brightness: 0.8112535537833772
      },
      {
        id: "her-1",
        x: 4126,
        y: 1142,
        brightness: 0.9029838319087654
      },
      {
        id: "her-2",
        x: 4172,
        y: 973,
        brightness: 0.8433737457929767
      },
      {
        id: "her-3",
        x: 4179,
        y: 851,
        brightness: 0.8624579135720006
      },
      {
        id: "her-4",
        x: 4142,
        y: 793,
        brightness: 0.8683687390699499
      },
      {
        id: "her-5",
        x: 4082,
        y: 728,
        brightness: 0.8327481652703501
      },
      {
        id: "her-6",
        x: 4037,
        y: 751,
        brightness: 0.9540888064613119
      },
      {
        id: "her-7",
        x: 3969,
        y: 792,
        brightness: 0.9173139476235086
      },
      {
        id: "her-8",
        x: 4251,
        y: 985,
        brightness: 0.9563907889372049
      },
      {
        id: "her-9",
        x: 4313,
        y: 887,
        brightness: 0.932812713470027
      },
      {
        id: "her-10",
        x: 4484,
        y: 879,
        brightness: 0.946748617914126
      },
      {
        id: "her-11",
        x: 4349,
        y: 881,
        brightness: 0.9250629815782804
      },
      {
        id: "her-12",
        x: 4313,
        y: 1086,
        brightness: 0.8469611398305601
      },
      {
        id: "her-13",
        x: 4444,
        y: 1038,
        brightness: 0.9999811020856749
      },
      {
        id: "her-14",
        x: 4491,
        y: 1013,
        brightness: 0.8493890421180262
      },
      {
        id: "her-15",
        x: 4531,
        y: 1021,
        brightness: 0.8254798308529275
      },
      {
        id: "her-16",
        x: 4311,
        y: 1260,
        brightness: 0.8401395796134106
      }
    ],
    connections: [
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
    id: "lac",
    name: "Lacerta",
    latinName: "Lacerta",
    description: "The Lizard - A small constellation between Cygnus and Andromeda.",
    centerX: 5607,
    centerY: 739,
    radius: 100,
    discovered: false,
    observatory: "northern",
    stars: [
      {
        id: "lac-0",
        x: 5598,
        y: 630,
        brightness: 0.9879142386017152
      },
      {
        id: "lac-1",
        x: 5630,
        y: 662,
        brightness: 0.9563045930057037
      },
      {
        id: "lac-2",
        x: 5623,
        y: 705,
        brightness: 0.8775776503541179
      },
      {
        id: "lac-3",
        x: 5588,
        y: 724,
        brightness: 0.961696137860468
      },
      {
        id: "lac-4",
        x: 5627,
        y: 781,
        brightness: 0.9117217305559226
      },
      {
        id: "lac-5",
        x: 5669,
        y: 762,
        brightness: 0.8594198554325935
      },
      {
        id: "lac-6",
        x: 5602,
        y: 675,
        brightness: 0.8395854546799887
      },
      {
        id: "lac-7",
        x: 5558,
        y: 838,
        brightness: 0.8839460618876146
      },
      {
        id: "lac-8",
        x: 5567,
        y: 871,
        brightness: 0.971198161523315
      }
    ],
    connections: [
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
    id: "leo",
    name: "Leo",
    latinName: "Leo",
    description: "The Lion - A zodiac constellation with bright Regulus.",
    centerX: 2634,
    centerY: 1181,
    radius: 100,
    discovered: false,
    observatory: "northern",
    stars: [
      {
        id: "leo-0",
        x: 2535,
        y: 1301,
        brightness: 0.8931815982655413
      },
      {
        id: "leo-1",
        x: 2531,
        y: 1221,
        brightness: 0.9219666669719105
      },
      {
        id: "leo-2",
        x: 2583,
        y: 1169,
        brightness: 0.9940274468834429
      },
      {
        id: "leo-3",
        x: 2809,
        y: 1158,
        brightness: 0.818326729787653
      },
      {
        id: "leo-4",
        x: 2954,
        y: 1257,
        brightness: 0.8309429765784608
      },
      {
        id: "leo-5",
        x: 2809,
        y: 1243,
        brightness: 0.964352856708887
      },
      {
        id: "leo-6",
        x: 2570,
        y: 1110,
        brightness: 0.8039701160564002
      },
      {
        id: "leo-7",
        x: 2470,
        y: 1067,
        brightness: 0.8269286677065875
      },
      {
        id: "leo-8",
        x: 2441,
        y: 1104,
        brightness: 0.9073488539461136
      }
    ],
    connections: [
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
    set: "zodiac"
  },
  {
    id: "lmi",
    name: "Leo Minor",
    latinName: "Leo Minor",
    description: "The Little Lion - A small constellation between Leo and Ursa Major.",
    centerX: 2574,
    centerY: 912,
    radius: 100,
    discovered: false,
    observatory: "northern",
    stars: [
      {
        id: "lmi-0",
        x: 2531,
        y: 913,
        brightness: 0.8182847549414738
      },
      {
        id: "lmi-1",
        x: 2608,
        y: 937,
        brightness: 0.9945456275475546
      },
      {
        id: "lmi-2",
        x: 2722,
        y: 930,
        brightness: 0.9633690125399934
      },
      {
        id: "lmi-3",
        x: 2616,
        y: 888,
        brightness: 0.8905582865237518
      },
      {
        id: "lmi-4",
        x: 2393,
        y: 893,
        brightness: 0.9299422528727559
      }
    ],
    connections: [
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
    id: "lyn",
    name: "Lynx",
    latinName: "Lynx",
    description: "The Lynx - A faint constellation requiring keen eyes to see.",
    centerX: 2028,
    centerY: 731,
    radius: 100,
    discovered: false,
    observatory: "northern",
    stars: [
      {
        id: "lyn-0",
        x: 1582,
        y: 516,
        brightness: 0.9294196128833819
      },
      {
        id: "lyn-1",
        x: 1739,
        y: 526,
        brightness: 0.9541779560870935
      },
      {
        id: "lyn-2",
        x: 1861,
        y: 680,
        brightness: 0.8247173967549387
      },
      {
        id: "lyn-3",
        x: 2095,
        y: 780,
        brightness: 0.8060426167968207
      },
      {
        id: "lyn-4",
        x: 2253,
        y: 804,
        brightness: 0.9444591881799592
      },
      {
        id: "lyn-5",
        x: 2329,
        y: 887,
        brightness: 0.83226266357659
      },
      {
        id: "lyn-6",
        x: 2338,
        y: 927,
        brightness: 0.989520398771585
      }
    ],
    connections: [
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
    id: "lyr",
    name: "Lyra",
    latinName: "Lyra",
    description: "The Lyre - Contains Vega, the fifth-brightest star.",
    centerX: 4701,
    centerY: 892,
    radius: 93,
    discovered: false,
    observatory: "northern",
    stars: [
      {
        id: "lyr-0",
        x: 4687,
        y: 873,
        brightness: 0.8426054298807932
      },
      {
        id: "lyr-1",
        x: 4685,
        y: 840,
        brightness: 0.9328597477303181
      },
      {
        id: "lyr-2",
        x: 4654,
        y: 854,
        brightness: 0.8405077290743308
      },
      {
        id: "lyr-3",
        x: 4727,
        y: 885,
        brightness: 0.9940896155027497
      },
      {
        id: "lyr-4",
        x: 4746,
        y: 955,
        brightness: 0.8880265318680564
      },
      {
        id: "lyr-5",
        x: 4709,
        y: 944,
        brightness: 0.9555006604630225
      }
    ],
    connections: [
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
    id: "ori",
    name: "Orion",
    latinName: "Orion",
    description: "The Hunter - The most recognizable constellation in the sky.",
    centerX: 1359,
    centerY: 1385,
    radius: 100,
    discovered: false,
    observatory: "northern",
    stars: [
      {
        id: "ori-0",
        x: 1532,
        y: 1254,
        brightness: 0.9351255173859502
      },
      {
        id: "ori-1",
        x: 1477,
        y: 1162,
        brightness: 0.9187980348543612
      },
      {
        id: "ori-2",
        x: 1516,
        y: 1164,
        brightness: 0.9869022567080086
      },
      {
        id: "ori-3",
        x: 1550,
        y: 1263,
        brightness: 0.9379482974637042
      },
      {
        id: "ori-4",
        x: 1510,
        y: 1339,
        brightness: 0.8240934272873859
      },
      {
        id: "ori-5",
        x: 1480,
        y: 1377,
        brightness: 0.8464623066192472
      },
      {
        id: "ori-6",
        x: 1355,
        y: 1394,
        brightness: 0.9115640390340807
      },
      {
        id: "ori-7",
        x: 1229,
        y: 1331,
        brightness: 0.9382822024070834
      },
      {
        id: "ori-8",
        x: 1244,
        y: 1471,
        brightness: 0.8980058604553982
      },
      {
        id: "ori-9",
        x: 1226,
        y: 1459,
        brightness: 0.9374418459868579
      },
      {
        id: "ori-10",
        x: 1213,
        y: 1407,
        brightness: 0.8992285494106026
      },
      {
        id: "ori-11",
        x: 1208,
        y: 1384,
        brightness: 0.8751891563129345
      },
      {
        id: "ori-12",
        x: 1211,
        y: 1352,
        brightness: 0.9723306623265647
      },
      {
        id: "ori-13",
        x: 1235,
        y: 1275,
        brightness: 0.8573028772822519
      },
      {
        id: "ori-14",
        x: 1269,
        y: 1243,
        brightness: 0.8128038276958169
      },
      {
        id: "ori-15",
        x: 1290,
        y: 1240,
        brightness: 0.977529303035633
      },
      {
        id: "ori-16",
        x: 1311,
        y: 1637,
        brightness: 0.9944540944434281
      },
      {
        id: "ori-17",
        x: 1352,
        y: 1540,
        brightness: 0.8972995067069359
      },
      {
        id: "ori-18",
        x: 1383,
        y: 1505,
        brightness: 0.8309118403426806
      },
      {
        id: "ori-19",
        x: 1396,
        y: 1334,
        brightness: 0.9504803382829407
      },
      {
        id: "ori-20",
        x: 1420,
        y: 1532,
        brightness: 0.8583589503544667
      },
      {
        id: "ori-21",
        x: 1449,
        y: 1661,
        brightness: 0.8125942959354845
      },
      {
        id: "ori-22",
        x: 1401,
        y: 1520,
        brightness: 0.9365794093154627
      }
    ],
    connections: [
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
    set: "orion"
  },
  {
    id: "peg",
    name: "Pegasus",
    latinName: "Pegasus",
    description: "The Winged Horse - Famous for its Great Square asterism.",
    centerX: 5683,
    centerY: 1156,
    radius: 100,
    discovered: false,
    observatory: "northern",
    stars: [
      {
        id: "peg-0",
        x: 5542,
        y: 947,
        brightness: 0.8835335609949713
      },
      {
        id: "peg-1",
        x: 5679,
        y: 996,
        brightness: 0.8190408793347292
      },
      {
        id: "peg-2",
        x: 5766,
        y: 1032,
        brightness: 0.8316632108549545
      },
      {
        id: "peg-3",
        x: 6035,
        y: 1015,
        brightness: 0.8225792441624378
      },
      {
        id: "peg-4",
        x: 6055,
        y: 1247,
        brightness: 0.801832426569973
      },
      {
        id: "peg-5",
        x: 5770,
        y: 1247,
        brightness: 0.8004561292980259
      },
      {
        id: "peg-6",
        x: 5695,
        y: 1297,
        brightness: 0.9064878214235199
      },
      {
        id: "peg-7",
        x: 5673,
        y: 1319,
        brightness: 0.8184438159103771
      },
      {
        id: "peg-8",
        x: 5542,
        y: 1397,
        brightness: 0.9092618961014118
      },
      {
        id: "peg-9",
        x: 5434,
        y: 1335,
        brightness: 0.8298793414704017
      },
      {
        id: "peg-10",
        x: 5708,
        y: 1090,
        brightness: 0.8926369237871324
      },
      {
        id: "peg-11",
        x: 5694,
        y: 1107,
        brightness: 0.957443502111361
      },
      {
        id: "peg-12",
        x: 5529,
        y: 1078,
        brightness: 0.8660290380379684
      },
      {
        id: "peg-13",
        x: 5436,
        y: 1073,
        brightness: 0.8858815954634358
      }
    ],
    connections: [
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
    set: "royal"
  },
  {
    id: "per",
    name: "Perseus",
    latinName: "Perseus",
    description: "The Hero - Contains the famous variable star Algol.",
    centerX: 843,
    centerY: 753,
    radius: 100,
    discovered: false,
    observatory: "northern",
    stars: [
      {
        id: "per-0",
        x: 935,
        y: 962,
        brightness: 0.935607443764085
      },
      {
        id: "per-1",
        x: 976,
        y: 969,
        brightness: 0.9886888517465966
      },
      {
        id: "per-2",
        x: 996,
        y: 903,
        brightness: 0.961264663631022
      },
      {
        id: "per-3",
        x: 991,
        y: 833,
        brightness: 0.8407442332501802
      },
      {
        id: "per-4",
        x: 938,
        y: 790,
        brightness: 0.8258713546155526
      },
      {
        id: "per-5",
        x: 929,
        y: 704,
        brightness: 0.8309483775339764
      },
      {
        id: "per-6",
        x: 902,
        y: 697,
        brightness: 0.9068368038567509
      },
      {
        id: "per-7",
        x: 851,
        y: 669,
        brightness: 0.8228903900838722
      },
      {
        id: "per-8",
        x: 770,
        y: 608,
        brightness: 0.9217391852448856
      },
      {
        id: "per-9",
        x: 711,
        y: 568,
        brightness: 0.8026104545091072
      },
      {
        id: "per-10",
        x: 726,
        y: 621,
        brightness: 0.910941726377986
      },
      {
        id: "per-11",
        x: 788,
        y: 673,
        brightness: 0.8313267637074506
      },
      {
        id: "per-12",
        x: 790,
        y: 752,
        brightness: 0.9635413168895842
      },
      {
        id: "per-13",
        x: 784,
        y: 817,
        brightness: 0.9973638186662381
      },
      {
        id: "per-14",
        x: 797,
        y: 840,
        brightness: 0.8362924502465099
      },
      {
        id: "per-15",
        x: 772,
        y: 853,
        brightness: 0.9189418072709058
      },
      {
        id: "per-16",
        x: 745,
        y: 839,
        brightness: 0.9435483779510198
      },
      {
        id: "per-17",
        x: 749,
        y: 816,
        brightness: 0.8910708219838843
      },
      {
        id: "per-18",
        x: 1027,
        y: 661,
        brightness: 0.9898760887215818
      },
      {
        id: "per-19",
        x: 1062,
        y: 693,
        brightness: 0.9869365019672474
      },
      {
        id: "per-20",
        x: 1036,
        y: 705,
        brightness: 0.9193285419835195
      },
      {
        id: "per-21",
        x: 684,
        y: 680,
        brightness: 0.846467042034
      },
      {
        id: "per-22",
        x: 432,
        y: 655,
        brightness: 0.8465581829925324
      }
    ],
    connections: [
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
    set: "royal"
  },
  {
    id: "psc",
    name: "Pisces",
    latinName: "Pisces",
    description: "The Fishes - A zodiac constellation with the spring equinox point.",
    centerX: 161,
    centerY: 1344,
    radius: 100,
    discovered: false,
    observatory: "northern",
    stars: [
      {
        id: "psc-0",
        x: 307,
        y: 1090,
        brightness: 0.8488490678284615
      },
      {
        id: "psc-1",
        x: 299,
        y: 999,
        brightness: 0.9000923163000987
      },
      {
        id: "psc-2",
        x: 331,
        y: 1046,
        brightness: 0.9689813690986285
      },
      {
        id: "psc-3",
        x: 298,
        y: 1149,
        brightness: 0.8279642177070338
      },
      {
        id: "psc-4",
        x: 381,
        y: 1244,
        brightness: 0.8094183058464102
      },
      {
        id: "psc-5",
        x: 439,
        y: 1347,
        brightness: 0.8219260478975469
      },
      {
        id: "psc-6",
        x: 509,
        y: 1454,
        brightness: 0.8434546277482943
      },
      {
        id: "psc-7",
        x: 473,
        y: 1447,
        brightness: 0.8965285186542542
      },
      {
        id: "psc-8",
        x: 423,
        y: 1409,
        brightness: 0.9927136827608278
      },
      {
        id: "psc-9",
        x: 376,
        y: 1398,
        brightness: 0.9205618739186843
      },
      {
        id: "psc-10",
        x: 307,
        y: 1374,
        brightness: 0.9658592656132996
      },
      {
        id: "psc-11",
        x: 262,
        y: 1368,
        brightness: 0.9462988069081301
      },
      {
        id: "psc-12",
        x: 203,
        y: 1374,
        brightness: 0.8569194459321154
      },
      {
        id: "psc-13",
        x: 5997,
        y: 1386,
        brightness: 0.8489659925592911
      },
      {
        id: "psc-14",
        x: 5916,
        y: 1406,
        brightness: 0.9732554921983124
      },
      {
        id: "psc-15",
        x: 5867,
        y: 1394,
        brightness: 0.8093569644465921
      },
      {
        id: "psc-16",
        x: 5835,
        y: 1410,
        brightness: 0.9258004488396467
      },
      {
        id: "psc-17",
        x: 5822,
        y: 1445,
        brightness: 0.8226469518643472
      },
      {
        id: "psc-18",
        x: 5862,
        y: 1479,
        brightness: 0.9492861317901701
      },
      {
        id: "psc-19",
        x: 5925,
        y: 1470,
        brightness: 0.8229627007042823
      },
      {
        id: "psc-20",
        x: 5943,
        y: 1442,
        brightness: 0.8627039158584605
      },
      {
        id: "psc-21",
        x: 5766,
        y: 1436,
        brightness: 0.9477433005240579
      }
    ],
    connections: [
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
    set: "zodiac"
  },
  {
    id: "sge",
    name: "Sagitta",
    latinName: "Sagitta",
    description: "The Arrow - The third-smallest constellation.",
    centerX: 4945,
    centerY: 1194,
    radius: 64,
    discovered: false,
    observatory: "northern",
    stars: [
      {
        id: "sge-0",
        x: 4917,
        y: 1200,
        brightness: 0.9309261853340401
      },
      {
        id: "sge-1",
        x: 4947,
        y: 1191,
        brightness: 0.9853234948698721
      },
      {
        id: "sge-2",
        x: 4995,
        y: 1175,
        brightness: 0.9873434043809407
      },
      {
        id: "sge-3",
        x: 4921,
        y: 1209,
        brightness: 0.8500324216730624
      }
    ],
    connections: [
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
    id: "ser",
    name: "Serpens",
    latinName: "Serpens",
    description: "The Serpent - The only constellation split into two parts.",
    centerX: 3957,
    centerY: 1320,
    radius: 100,
    discovered: false,
    observatory: "northern",
    stars: [
      {
        id: "ser-0",
        x: 3942,
        y: 1243,
        brightness: 0.945574715989758
      },
      {
        id: "ser-1",
        x: 3923,
        y: 1172,
        brightness: 0.8331895297617224
      },
      {
        id: "ser-2",
        x: 3953,
        y: 1198,
        brightness: 0.8034481745203672
      },
      {
        id: "ser-3",
        x: 3985,
        y: 1239,
        brightness: 0.9970659325620159
      },
      {
        id: "ser-4",
        x: 3895,
        y: 1324,
        brightness: 0.8024538854572003
      },
      {
        id: "ser-5",
        x: 3934,
        y: 1393,
        brightness: 0.9362442406142499
      },
      {
        id: "ser-6",
        x: 3962,
        y: 1425,
        brightness: 0.9911919575964092
      },
      {
        id: "ser-7",
        x: 4060,
        y: 1562,
        brightness: 0.9713826765799404
      }
    ],
    connections: [
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
    id: "tau",
    name: "Taurus",
    latinName: "Taurus",
    description: "The Bull - A zodiac constellation with the Pleiades and Hyades.",
    centerX: 1081,
    centerY: 1261,
    radius: 100,
    discovered: false,
    observatory: "northern",
    stars: [
      {
        id: "tau-0",
        x: 1407,
        y: 1148,
        brightness: 0.9166301178709708
      },
      {
        id: "tau-1",
        x: 1150,
        y: 1225,
        brightness: 0.9271416872843014
      },
      {
        id: "tau-2",
        x: 1119,
        y: 1235,
        brightness: 0.9018602238467668
      },
      {
        id: "tau-3",
        x: 1082,
        y: 1240,
        brightness: 0.9012852655142605
      },
      {
        id: "tau-4",
        x: 1096,
        y: 1208,
        brightness: 0.8120370055884689
      },
      {
        id: "tau-5",
        x: 1119,
        y: 1180,
        brightness: 0.900202938077062
      },
      {
        id: "tau-6",
        x: 1360,
        y: 1023,
        brightness: 0.8090248566641557
      },
      {
        id: "tau-7",
        x: 1003,
        y: 1292,
        brightness: 0.8888539522707257
      },
      {
        id: "tau-8",
        x: 863,
        y: 1338,
        brightness: 0.8708831365617674
      },
      {
        id: "tau-9",
        x: 1013,
        y: 1400,
        brightness: 0.9989063282916439
      },
      {
        id: "tau-10",
        x: 853,
        y: 1350,
        brightness: 0.8047369760244173
      },
      {
        id: "tau-11",
        x: 904,
        y: 1493,
        brightness: 0.8136335248798285
      }
    ],
    connections: [
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
    set: "zodiac"
  },
  {
    id: "tri",
    name: "Triangulum",
    latinName: "Triangulum",
    description: "The Triangle - A small northern constellation.",
    centerX: 528,
    centerY: 953,
    radius: 94,
    discovered: false,
    observatory: "northern",
    stars: [
      {
        id: "tri-0",
        x: 471,
        y: 1007,
        brightness: 0.982801993230823
      },
      {
        id: "tri-1",
        x: 540,
        y: 917,
        brightness: 0.8443816791461185
      },
      {
        id: "tri-2",
        x: 572,
        y: 936,
        brightness: 0.9004850979396967
      }
    ],
    connections: [
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
    id: "uma",
    name: "Ursa Major",
    latinName: "Ursa Major",
    description: "The Great Bear - Contains the famous Big Dipper asterism.",
    centerX: 2723,
    centerY: 655,
    radius: 100,
    discovered: false,
    observatory: "northern",
    stars: [
      {
        id: "uma-0",
        x: 3064,
        y: 549,
        brightness: 0.8653241704738037
      },
      {
        id: "uma-1",
        x: 2766,
        y: 471,
        brightness: 0.9740983339682325
      },
      {
        id: "uma-2",
        x: 2758,
        y: 560,
        brightness: 0.9204937493610102
      },
      {
        id: "uma-3",
        x: 2974,
        y: 605,
        brightness: 0.9233593058807944
      },
      {
        id: "uma-4",
        x: 3225,
        y: 567,
        brightness: 0.9702581302685798
      },
      {
        id: "uma-5",
        x: 3350,
        y: 585,
        brightness: 0.9879485075385853
      },
      {
        id: "uma-6",
        x: 3448,
        y: 678,
        brightness: 0.8059975631539597
      },
      {
        id: "uma-7",
        x: 2942,
        y: 704,
        brightness: 0.9711406516915476
      },
      {
        id: "uma-8",
        x: 2827,
        y: 948,
        brightness: 0.9635307029685225
      },
      {
        id: "uma-9",
        x: 2826,
        y: 974,
        brightness: 0.8136651317493345
      },
      {
        id: "uma-10",
        x: 2790,
        y: 758,
        brightness: 0.9489454806225273
      },
      {
        id: "uma-11",
        x: 2593,
        y: 808,
        brightness: 0.9603959231294068
      },
      {
        id: "uma-12",
        x: 2571,
        y: 785,
        brightness: 0.8606301892551979
      },
      {
        id: "uma-13",
        x: 2381,
        y: 449,
        brightness: 0.8577832162180582
      },
      {
        id: "uma-14",
        x: 2126,
        y: 488,
        brightness: 0.9830086640716263
      },
      {
        id: "uma-15",
        x: 2462,
        y: 516,
        brightness: 0.8742054144193275
      },
      {
        id: "uma-16",
        x: 2467,
        y: 599,
        brightness: 0.8117914272566937
      },
      {
        id: "uma-17",
        x: 2387,
        y: 639,
        brightness: 0.8667914598400583
      },
      {
        id: "uma-18",
        x: 2247,
        y: 699,
        brightness: 0.9170163497496474
      },
      {
        id: "uma-19",
        x: 2265,
        y: 714,
        brightness: 0.92497442063598
      }
    ],
    connections: [
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
    set: "ursa"
  },
  {
    id: "umi",
    name: "Ursa Minor",
    latinName: "Ursa Minor",
    description: "The Little Bear - Contains Polaris, the North Star.",
    centerX: 4395,
    centerY: 173,
    radius: 100,
    discovered: false,
    observatory: "northern",
    stars: [
      {
        id: "umi-0",
        x: 3934,
        y: 203,
        brightness: 0.9710140009477469
      },
      {
        id: "umi-1",
        x: 4073,
        y: 237,
        brightness: 0.87053857252777
      },
      {
        id: "umi-2",
        x: 3836,
        y: 303,
        brightness: 0.8619717873637909
      },
      {
        id: "umi-3",
        x: 3711,
        y: 264,
        brightness: 0.8012415047921821
      },
      {
        id: "umi-4",
        x: 4192,
        y: 133,
        brightness: 0.9054600163367061
      },
      {
        id: "umi-5",
        x: 4384,
        y: 57,
        brightness: 0.9278684498101558
      },
      {
        id: "umi-6",
        x: 633,
        y: 12,
        brightness: 0.8586528099392969
      }
    ],
    connections: [
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
    set: "ursa"
  },
  {
    id: "vul",
    name: "Vulpecula",
    latinName: "Vulpecula",
    description: "The Fox - A faint northern constellation.",
    centerX: 4946,
    centerY: 1081,
    radius: 100,
    discovered: false,
    observatory: "northern",
    stars: [
      {
        id: "vul-0",
        x: 4818,
        y: 1143,
        brightness: 0.976546341686433
      },
      {
        id: "vul-1",
        x: 4870,
        y: 1089,
        brightness: 0.8280468145463321
      },
      {
        id: "vul-2",
        x: 4973,
        y: 1099,
        brightness: 0.8843109659406093
      },
      {
        id: "vul-3",
        x: 5005,
        y: 1037,
        brightness: 0.9913072431312593
      },
      {
        id: "vul-4",
        x: 5066,
        y: 1036,
        brightness: 0.9393923424811543
      }
    ],
    connections: [
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
    id: "ant",
    name: "Antlia",
    latinName: "Antlia",
    description: "The Air Pump - A faint southern constellation representing a vacuum pump.",
    centerX: 2574,
    centerY: 2079,
    radius: 100,
    discovered: false,
    observatory: "southern",
    stars: [
      {
        id: "ant-0",
        x: 2372,
        y: 2099,
        brightness: 0.845831966484029
      },
      {
        id: "ant-1",
        x: 2613,
        y: 2018,
        brightness: 0.8187096030136275
      },
      {
        id: "ant-2",
        x: 2736,
        y: 2119,
        brightness: 0.9710483317156622
      }
    ],
    connections: [
      [
        0,
        1
      ],
      [
        1,
        2
      ]
    ],
    set: "instruments"
  },
  {
    id: "aps",
    name: "Apus",
    latinName: "Apus",
    description: "The Bird of Paradise - A southern constellation near the celestial pole.",
    centerX: 4026,
    centerY: 2809,
    radius: 100,
    discovered: false,
    observatory: "southern",
    stars: [
      {
        id: "aps-0",
        x: 3699,
        y: 2817,
        brightness: 0.9372280729349638
      },
      {
        id: "aps-1",
        x: 4085,
        y: 2812,
        brightness: 0.8657903662276147
      },
      {
        id: "aps-2",
        x: 4179,
        y: 2792,
        brightness: 0.8363147644391001
      },
      {
        id: "aps-3",
        x: 4139,
        y: 2815,
        brightness: 0.9567026435908458
      }
    ],
    connections: [
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
    set: "birds"
  },
  {
    id: "aqr",
    name: "Aquarius",
    latinName: "Aquarius",
    description: "The Water Bearer - A zodiac constellation associated with water.",
    centerX: 5599,
    centerY: 1636,
    radius: 100,
    discovered: false,
    observatory: "southern",
    stars: [
      {
        id: "aqr-0",
        x: 5199,
        y: 1658,
        brightness: 0.9642047059941696
      },
      {
        id: "aqr-1",
        x: 5219,
        y: 1650,
        brightness: 0.8574391825060989
      },
      {
        id: "aqr-2",
        x: 5381,
        y: 1593,
        brightness: 0.8893515280410847
      },
      {
        id: "aqr-3",
        x: 5524,
        y: 1505,
        brightness: 0.8215286259255767
      },
      {
        id: "aqr-4",
        x: 5590,
        y: 1523,
        brightness: 0.859633627924532
      },
      {
        id: "aqr-5",
        x: 5620,
        y: 1500,
        brightness: 0.8236805198576599
      },
      {
        id: "aqr-6",
        x: 5647,
        y: 1502,
        brightness: 0.8866732450959816
      },
      {
        id: "aqr-7",
        x: 5719,
        y: 1626,
        brightness: 0.9227841607353544
      },
      {
        id: "aqr-8",
        x: 5825,
        y: 1653,
        brightness: 0.9053226545855143
      },
      {
        id: "aqr-9",
        x: 5789,
        y: 1853,
        brightness: 0.9869083479062707
      },
      {
        id: "aqr-10",
        x: 5527,
        y: 1731,
        brightness: 0.981058821887797
      },
      {
        id: "aqr-11",
        x: 5570,
        y: 1630,
        brightness: 0.9057066478346965
      },
      {
        id: "aqr-12",
        x: 5605,
        y: 1477,
        brightness: 0.8314035242067523
      },
      {
        id: "aqr-13",
        x: 5846,
        y: 1835,
        brightness: 0.8930870776397314
      },
      {
        id: "aqr-14",
        x: 5924,
        y: 1797,
        brightness: 0.9204191984022962
      }
    ],
    connections: [
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
    set: "zodiac"
  },
  {
    id: "ara",
    name: "Ara",
    latinName: "Ara",
    description: "The Altar - A southern constellation representing a ceremonial altar.",
    centerX: 4310,
    centerY: 2430,
    radius: 100,
    discovered: false,
    observatory: "southern",
    stars: [
      {
        id: "ara-0",
        x: 4356,
        y: 2440,
        brightness: 0.8673535670126534
      },
      {
        id: "ara-1",
        x: 4380,
        y: 2511,
        brightness: 0.9561024128569521
      },
      {
        id: "ara-2",
        x: 4207,
        y: 2484,
        brightness: 0.9662701115892076
      },
      {
        id: "ara-3",
        x: 4244,
        y: 2433,
        brightness: 0.812025578921402
      },
      {
        id: "ara-4",
        x: 4248,
        y: 2386,
        brightness: 0.9939734492092588
      },
      {
        id: "ara-5",
        x: 4383,
        y: 2331,
        brightness: 0.8103504088277539
      },
      {
        id: "ara-6",
        x: 4355,
        y: 2425,
        brightness: 0.8374446719153008
      }
    ],
    connections: [
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
    set: "centaur"
  },
  {
    id: "cae",
    name: "Caelum",
    latinName: "Caelum",
    description: "The Chisel - One of the faintest constellations in the sky.",
    centerX: 1185,
    centerY: 2164,
    radius: 100,
    discovered: false,
    observatory: "southern",
    stars: [
      {
        id: "cae-0",
        x: 1128,
        y: 2249,
        brightness: 0.8585296734412864
      },
      {
        id: "cae-1",
        x: 1169,
        y: 2198,
        brightness: 0.9401258868344379
      },
      {
        id: "cae-2",
        x: 1175,
        y: 2119,
        brightness: 0.9654107858922422
      },
      {
        id: "cae-3",
        x: 1268,
        y: 2091,
        brightness: 0.8013305525589031
      }
    ],
    connections: [
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
    set: "instruments"
  },
  {
    id: "cma",
    name: "Canis Major",
    latinName: "Canis Major",
    description: "The Great Dog - Contains Sirius, the brightest star in the night sky.",
    centerX: 1727,
    centerY: 1873,
    radius: 100,
    discovered: false,
    observatory: "southern",
    stars: [
      {
        id: "cma-0",
        x: 1595,
        y: 1799,
        brightness: 0.9006762551280664
      },
      {
        id: "cma-1",
        x: 1688,
        y: 1779,
        brightness: 0.8383275456260921
      },
      {
        id: "cma-2",
        x: 1763,
        y: 1897,
        brightness: 0.9622292587214318
      },
      {
        id: "cma-3",
        x: 1785,
        y: 1940,
        brightness: 0.990994643045068
      },
      {
        id: "cma-4",
        x: 1757,
        y: 1966,
        brightness: 0.8860605536025133
      },
      {
        id: "cma-5",
        x: 1744,
        y: 1983,
        brightness: 0.8802572071927617
      },
      {
        id: "cma-6",
        x: 1585,
        y: 2001,
        brightness: 0.8461978991906298
      },
      {
        id: "cma-7",
        x: 1850,
        y: 1988,
        brightness: 0.9160960431529019
      },
      {
        id: "cma-8",
        x: 1734,
        y: 1784,
        brightness: 0.9705864442316882
      },
      {
        id: "cma-9",
        x: 1766,
        y: 1761,
        brightness: 0.8510127118492339
      },
      {
        id: "cma-10",
        x: 1726,
        y: 1701,
        brightness: 0.8666477189320421
      }
    ],
    connections: [
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
    set: "orion"
  },
  {
    id: "cap",
    name: "Capricornus",
    latinName: "Capricornus",
    description: "The Sea Goat - An ancient zodiac constellation.",
    centerX: 5253,
    centerY: 1811,
    radius: 100,
    discovered: false,
    observatory: "southern",
    stars: [
      {
        id: "cap-0",
        x: 5074,
        y: 1708,
        brightness: 0.8745710168496246
      },
      {
        id: "cap-1",
        x: 5088,
        y: 1746,
        brightness: 0.9878764707994143
      },
      {
        id: "cap-2",
        x: 5120,
        y: 1797,
        brightness: 0.9311023858372902
      },
      {
        id: "cap-3",
        x: 5192,
        y: 1921,
        brightness: 0.858055811626867
      },
      {
        id: "cap-4",
        x: 5216,
        y: 1949,
        brightness: 0.914535030893805
      },
      {
        id: "cap-5",
        x: 5361,
        y: 1874,
        brightness: 0.9478927451017222
      },
      {
        id: "cap-6",
        x: 5446,
        y: 1769,
        brightness: 0.8062114780928537
      },
      {
        id: "cap-7",
        x: 5417,
        y: 1778,
        brightness: 0.9782285688357616
      },
      {
        id: "cap-8",
        x: 5343,
        y: 1781,
        brightness: 0.8289153935701236
      },
      {
        id: "cap-9",
        x: 5275,
        y: 1787,
        brightness: 0.8462095739611266
      }
    ],
    connections: [
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
    set: "zodiac"
  },
  {
    id: "car",
    name: "Carina",
    latinName: "Carina",
    description: "The Keel - Part of the ancient ship Argo Navis, contains Canopus.",
    centerX: 2383,
    centerY: 2480,
    radius: 100,
    discovered: false,
    observatory: "southern",
    stars: [
      {
        id: "car-0",
        x: 1657,
        y: 2220,
        brightness: 0.9190049123003142
      },
      {
        id: "car-1",
        x: 1600,
        y: 2378,
        brightness: 0.8709811762078907
      },
      {
        id: "car-2",
        x: 2305,
        y: 2662,
        brightness: 0.9117387186211627
      },
      {
        id: "car-3",
        x: 2557,
        y: 2667,
        brightness: 0.9016813188202119
      },
      {
        id: "car-4",
        x: 2679,
        y: 2573,
        brightness: 0.8932793013557007
      },
      {
        id: "car-5",
        x: 2633,
        y: 2528,
        brightness: 0.8651689897440324
      },
      {
        id: "car-6",
        x: 2571,
        y: 2522,
        brightness: 0.8830067001273134
      },
      {
        id: "car-7",
        x: 2321,
        y: 2488,
        brightness: 0.8884351953090056
      },
      {
        id: "car-8",
        x: 2094,
        y: 2492,
        brightness: 0.8163670115405713
      },
      {
        id: "car-9",
        x: 1987,
        y: 2383,
        brightness: 0.9642732898264768
      },
      {
        id: "car-10",
        x: 2040,
        y: 2289,
        brightness: 0.9777979110671973
      },
      {
        id: "car-11",
        x: 2186,
        y: 2412,
        brightness: 0.9747051871084551
      },
      {
        id: "car-12",
        x: 2777,
        y: 2540,
        brightness: 0.816876902891788
      },
      {
        id: "car-13",
        x: 2786,
        y: 2532,
        brightness: 0.9186519869554013
      },
      {
        id: "car-14",
        x: 2803,
        y: 2505,
        brightness: 0.8257720239390354
      },
      {
        id: "car-15",
        x: 2786,
        y: 2483,
        brightness: 0.8904558617791638
      },
      {
        id: "car-16",
        x: 2723,
        y: 2481,
        brightness: 0.8719468117833121
      }
    ],
    connections: [
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
    set: "argo"
  },
  {
    id: "cen",
    name: "Centaurus",
    latinName: "Centaurus",
    description: "The Centaur - Contains Alpha Centauri, the closest star system to Earth.",
    centerX: 3334,
    centerY: 2312,
    radius: 100,
    discovered: false,
    observatory: "southern",
    stars: [
      {
        id: "cen-0",
        x: 2838,
        y: 2408,
        brightness: 0.9529182060485837
      },
      {
        id: "cen-1",
        x: 3035,
        y: 2345,
        brightness: 0.8354665938769875
      },
      {
        id: "cen-2",
        x: 3117,
        y: 2337,
        brightness: 0.8005640554172874
      },
      {
        id: "cen-3",
        x: 3173,
        y: 2316,
        brightness: 0.8695942854389714
      },
      {
        id: "cen-4",
        x: 3416,
        y: 2391,
        brightness: 0.807600955410239
      },
      {
        id: "cen-5",
        x: 3481,
        y: 2288,
        brightness: 0.9602006543990258
      },
      {
        id: "cen-6",
        x: 3457,
        y: 2208,
        brightness: 0.9116743137390407
      },
      {
        id: "cen-7",
        x: 3456,
        y: 2195,
        brightness: 0.867061708480242
      },
      {
        id: "cen-8",
        x: 3528,
        y: 2106,
        brightness: 0.9604884328515075
      },
      {
        id: "cen-9",
        x: 3648,
        y: 2203,
        brightness: 0.9027960003693788
      },
      {
        id: "cen-10",
        x: 3747,
        y: 2202,
        brightness: 0.9979959418454967
      },
      {
        id: "cen-11",
        x: 3336,
        y: 2112,
        brightness: 0.8886501680419466
      },
      {
        id: "cen-12",
        x: 3665,
        y: 2514,
        brightness: 0.9064971952856413
      },
      {
        id: "cen-13",
        x: 3516,
        y: 2506,
        brightness: 0.9091636787299695
      },
      {
        id: "cen-14",
        x: 3049,
        y: 2373,
        brightness: 0.966670553852132
      },
      {
        id: "cen-15",
        x: 2882,
        y: 2491,
        brightness: 0.9534551541539804
      }
    ],
    connections: [
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
    set: "centaur"
  },
  {
    id: "cet",
    name: "Cetus",
    latinName: "Cetus",
    description: "The Sea Monster - A large constellation containing the variable star Mira.",
    centerX: 513,
    centerY: 1540,
    radius: 100,
    discovered: false,
    observatory: "southern",
    stars: [
      {
        id: "cet-0",
        x: 680,
        y: 1446,
        brightness: 0.9584222949778624
      },
      {
        id: "cet-1",
        x: 649,
        y: 1407,
        brightness: 0.9633448451194331
      },
      {
        id: "cet-2",
        x: 617,
        y: 1359,
        brightness: 0.8358997443219884
      },
      {
        id: "cet-3",
        x: 687,
        y: 1331,
        brightness: 0.9994673252568206
      },
      {
        id: "cet-4",
        x: 749,
        y: 1352,
        brightness: 0.8154480993140443
      },
      {
        id: "cet-5",
        x: 759,
        y: 1432,
        brightness: 0.9536168852087379
      },
      {
        id: "cet-6",
        x: 665,
        y: 1495,
        brightness: 0.8882056423484213
      },
      {
        id: "cet-7",
        x: 581,
        y: 1550,
        brightness: 0.8371158594541621
      },
      {
        id: "cet-8",
        x: 464,
        y: 1672,
        brightness: 0.9150592695042697
      },
      {
        id: "cet-9",
        x: 434,
        y: 1766,
        brightness: 0.9200801914363225
      },
      {
        id: "cet-10",
        x: 182,
        y: 1800,
        brightness: 0.8996648146090005
      },
      {
        id: "cet-11",
        x: 81,
        y: 1647,
        brightness: 0.8289560935569716
      },
      {
        id: "cet-12",
        x: 286,
        y: 1670,
        brightness: 0.8856334177598822
      },
      {
        id: "cet-13",
        x: 350,
        y: 1636,
        brightness: 0.9570069804596457
      }
    ],
    connections: [
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
    set: "royal"
  },
  {
    id: "cha",
    name: "Chamaeleon",
    latinName: "Chamaeleon",
    description: "The Chameleon - A small far-southern constellation.",
    centerX: 2698,
    centerY: 2812,
    radius: 100,
    discovered: false,
    observatory: "southern",
    stars: [
      {
        id: "cha-0",
        x: 2077,
        y: 2782,
        brightness: 0.8028822369837016
      },
      {
        id: "cha-1",
        x: 2648,
        y: 2810,
        brightness: 0.8337916326227752
      },
      {
        id: "cha-2",
        x: 2689,
        y: 2841,
        brightness: 0.9206365030566082
      },
      {
        id: "cha-3",
        x: 3076,
        y: 2822,
        brightness: 0.831162838944711
      },
      {
        id: "cha-4",
        x: 2998,
        y: 2804,
        brightness: 0.8504644338566532
      }
    ],
    connections: [
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
    set: "birds"
  },
  {
    id: "cir",
    name: "Circinus",
    latinName: "Circinus",
    description: "The Compass - A small southern constellation near Centaurus.",
    centerX: 3782,
    centerY: 2517,
    radius: 100,
    discovered: false,
    observatory: "southern",
    stars: [
      {
        id: "cir-0",
        x: 3823,
        y: 2480,
        brightness: 0.8780719899809935
      },
      {
        id: "cir-1",
        x: 3677,
        y: 2583,
        brightness: 0.9681719909994115
      },
      {
        id: "cir-2",
        x: 3847,
        y: 2489,
        brightness: 0.9845598250034893
      }
    ],
    connections: [
      [
        0,
        1
      ],
      [
        1,
        2
      ]
    ],
    set: "instruments"
  },
  {
    id: "col",
    name: "Columba",
    latinName: "Columba",
    description: "The Dove - Represents the dove that followed Noah's Ark.",
    centerX: 1469,
    centerY: 2105,
    radius: 100,
    discovered: false,
    observatory: "southern",
    stars: [
      {
        id: "col-0",
        x: 1592,
        y: 2057,
        brightness: 0.9034320824890594
      },
      {
        id: "col-1",
        x: 1462,
        y: 2096,
        brightness: 0.8463948714587912
      },
      {
        id: "col-2",
        x: 1415,
        y: 2068,
        brightness: 0.9498241877799987
      },
      {
        id: "col-3",
        x: 1380,
        y: 2091,
        brightness: 0.8820026260823091
      },
      {
        id: "col-4",
        x: 1496,
        y: 2214,
        brightness: 0.819167225296726
      }
    ],
    connections: [
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
    set: "argo"
  },
  {
    id: "cra",
    name: "Corona Australis",
    latinName: "Corona Australis",
    description: "The Southern Crown - A small arc-shaped southern constellation.",
    centerX: 4750,
    centerY: 2166,
    radius: 100,
    discovered: false,
    observatory: "southern",
    stars: [
      {
        id: "cra-0",
        x: 4745,
        y: 2118,
        brightness: 0.8524296274423773
      },
      {
        id: "cra-1",
        x: 4777,
        y: 2118,
        brightness: 0.8437077854206082
      },
      {
        id: "cra-2",
        x: 4789,
        y: 2132,
        brightness: 0.9845852130224653
      },
      {
        id: "cra-3",
        x: 4792,
        y: 2156,
        brightness: 0.8626539387210301
      },
      {
        id: "cra-4",
        x: 4785,
        y: 2175,
        brightness: 0.8750936473529185
      },
      {
        id: "cra-5",
        x: 4763,
        y: 2202,
        brightness: 0.9125349610766809
      },
      {
        id: "cra-6",
        x: 4707,
        y: 2224,
        brightness: 0.9004207384283534
      },
      {
        id: "cra-7",
        x: 4640,
        y: 2205,
        brightness: 0.8229659049110912
      }
    ],
    connections: [
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
    id: "crv",
    name: "Corvus",
    latinName: "Corvus",
    description: "The Crow - A small constellation known since ancient times.",
    centerX: 3082,
    centerY: 1849,
    radius: 100,
    discovered: false,
    observatory: "southern",
    stars: [
      {
        id: "crv-0",
        x: 3035,
        y: 1912,
        brightness: 0.9742229298966425
      },
      {
        id: "crv-1",
        x: 3042,
        y: 1877,
        brightness: 0.9621233914755571
      },
      {
        id: "crv-2",
        x: 3066,
        y: 1792,
        brightness: 0.8855772592726596
      },
      {
        id: "crv-3",
        x: 3124,
        y: 1775,
        brightness: 0.9450658249155951
      },
      {
        id: "crv-4",
        x: 3143,
        y: 1890,
        brightness: 0.9758956734604431
      }
    ],
    connections: [
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
    set: "centaur"
  },
  {
    id: "crt",
    name: "Crater",
    latinName: "Crater",
    description: "The Cup - Represents a chalice in Greek mythology.",
    centerX: 2862,
    centerY: 1775,
    radius: 100,
    discovered: false,
    observatory: "southern",
    stars: [
      {
        id: "crt-0",
        x: 2903,
        y: 1663,
        brightness: 0.8529531921161746
      },
      {
        id: "crt-1",
        x: 2853,
        y: 1681,
        brightness: 0.9340760726219308
      },
      {
        id: "crt-2",
        x: 2831,
        y: 1746,
        brightness: 0.8561469595855506
      },
      {
        id: "crt-3",
        x: 2749,
        y: 1805,
        brightness: 0.9122492215370488
      },
      {
        id: "crt-4",
        x: 2799,
        y: 1880,
        brightness: 0.8068294096814733
      },
      {
        id: "crt-5",
        x: 2847,
        y: 1813,
        brightness: 0.8299624018956214
      },
      {
        id: "crt-6",
        x: 2854,
        y: 1795,
        brightness: 0.9861240227754693
      },
      {
        id: "crt-7",
        x: 2937,
        y: 1806,
        brightness: 0.9917070387884463
      },
      {
        id: "crt-8",
        x: 2983,
        y: 1786,
        brightness: 0.8145453103965714
      }
    ],
    connections: [
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
    set: "centaur"
  },
  {
    id: "cru",
    name: "Crux",
    latinName: "Crux",
    description: "The Southern Cross - The smallest constellation but most famous southern one.",
    centerX: 3126,
    centerY: 2495,
    radius: 88,
    discovered: false,
    observatory: "southern",
    stars: [
      {
        id: "cru-0",
        x: 3199,
        y: 2495,
        brightness: 0.946912806779392
      },
      {
        id: "cru-1",
        x: 3063,
        y: 2479,
        brightness: 0.8257223846641741
      },
      {
        id: "cru-2",
        x: 3111,
        y: 2552,
        brightness: 0.9335650652458953
      },
      {
        id: "cru-3",
        x: 3130,
        y: 2452,
        brightness: 0.8519228894806343
      }
    ],
    connections: [
      [
        0,
        1
      ],
      [
        2,
        3
      ]
    ],
    set: "centaur"
  },
  {
    id: "dor",
    name: "Dorado",
    latinName: "Dorado",
    description: "The Swordfish - Contains the Large Magellanic Cloud.",
    centerX: 1297,
    centerY: 2487,
    radius: 100,
    discovered: false,
    observatory: "southern",
    stars: [
      {
        id: "dor-0",
        x: 1067,
        y: 2358,
        brightness: 0.8735953452782361
      },
      {
        id: "dor-1",
        x: 1142,
        y: 2417,
        brightness: 0.8433142837765947
      },
      {
        id: "dor-2",
        x: 1390,
        y: 2541,
        brightness: 0.8559638685653984
      },
      {
        id: "dor-3",
        x: 1437,
        y: 2596,
        brightness: 0.9154591262263239
      },
      {
        id: "dor-4",
        x: 1475,
        y: 2551,
        brightness: 0.812734700106251
      },
      {
        id: "dor-5",
        x: 1273,
        y: 2458,
        brightness: 0.8474733988085627
      }
    ],
    connections: [
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
    set: "waters"
  },
  {
    id: "eri",
    name: "Eridanus",
    latinName: "Eridanus",
    description: "The River - A long winding constellation representing a river.",
    centerX: 869,
    centerY: 1933,
    radius: 100,
    discovered: false,
    observatory: "southern",
    stars: [
      {
        id: "eri-0",
        x: 1283,
        y: 1585,
        brightness: 0.986587756046307
      },
      {
        id: "eri-1",
        x: 1190,
        y: 1554,
        brightness: 0.9159558345949548
      },
      {
        id: "eri-2",
        x: 1151,
        y: 1556,
        brightness: 0.8490014435683225
      },
      {
        id: "eri-3",
        x: 1049,
        y: 1614,
        brightness: 0.8784699682805311
      },
      {
        id: "eri-4",
        x: 992,
        y: 1725,
        brightness: 0.9253166887706384
      },
      {
        id: "eri-5",
        x: 942,
        y: 1702,
        brightness: 0.8333116576647752
      },
      {
        id: "eri-6",
        x: 930,
        y: 1663,
        brightness: 0.9864281270928285
      },
      {
        id: "eri-7",
        x: 887,
        y: 1658,
        brightness: 0.9858362036819295
      },
      {
        id: "eri-8",
        x: 735,
        y: 1648,
        brightness: 0.8724580454344579
      },
      {
        id: "eri-9",
        x: 684,
        y: 1731,
        brightness: 0.9903425560796062
      },
      {
        id: "eri-10",
        x: 688,
        y: 1810,
        brightness: 0.9400283691222399
      },
      {
        id: "eri-11",
        x: 760,
        y: 1894,
        brightness: 0.8397593651318115
      },
      {
        id: "eri-12",
        x: 831,
        y: 1863,
        brightness: 0.8135055364470509
      },
      {
        id: "eri-13",
        x: 891,
        y: 1861,
        brightness: 0.8525576962422255
      },
      {
        id: "eri-14",
        x: 945,
        y: 1887,
        brightness: 0.9892423536330296
      },
      {
        id: "eri-15",
        x: 1148,
        y: 2009,
        brightness: 0.8561125410861605
      },
      {
        id: "eri-16",
        x: 1100,
        y: 2067,
        brightness: 0.846141964034392
      },
      {
        id: "eri-17",
        x: 1075,
        y: 2063,
        brightness: 0.8867123550196747
      },
      {
        id: "eri-18",
        x: 956,
        y: 2103,
        brightness: 0.8192548854393972
      },
      {
        id: "eri-19",
        x: 905,
        y: 2171,
        brightness: 0.8618754334171634
      },
      {
        id: "eri-20",
        x: 833,
        y: 2218,
        brightness: 0.8888902707440552
      },
      {
        id: "eri-21",
        x: 743,
        y: 2172,
        brightness: 0.8109953955419056
      },
      {
        id: "eri-22",
        x: 669,
        y: 2164,
        brightness: 0.9553504236350348
      },
      {
        id: "eri-23",
        x: 612,
        y: 2295,
        brightness: 0.9645657834361625
      },
      {
        id: "eri-24",
        x: 569,
        y: 2359,
        brightness: 0.8285526647751255
      },
      {
        id: "eri-25",
        x: 483,
        y: 2360,
        brightness: 0.8224923038351928
      },
      {
        id: "eri-26",
        x: 407,
        y: 2454,
        brightness: 0.9891575318606057
      }
    ],
    connections: [
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
    set: "waters"
  },
  {
    id: "for",
    name: "Fornax",
    latinName: "Fornax",
    description: "The Furnace - Contains the Fornax Cluster of galaxies.",
    centerX: 675,
    centerY: 2004,
    radius: 100,
    discovered: false,
    observatory: "southern",
    stars: [
      {
        id: "for-0",
        x: 800,
        y: 1983,
        brightness: 0.969018464261373
      },
      {
        id: "for-1",
        x: 705,
        y: 2040,
        brightness: 0.8437899293834585
      },
      {
        id: "for-2",
        x: 519,
        y: 1988,
        brightness: 0.8153664767639133
      }
    ],
    connections: [
      [
        0,
        1
      ],
      [
        1,
        2
      ]
    ],
    set: "instruments"
  },
  {
    id: "gru",
    name: "Grus",
    latinName: "Grus",
    description: "The Crane - A graceful bird constellation in the southern sky.",
    centerX: 5609,
    centerY: 2247,
    radius: 100,
    discovered: false,
    observatory: "southern",
    stars: [
      {
        id: "gru-0",
        x: 5754,
        y: 2379,
        brightness: 0.8114962929968351
      },
      {
        id: "gru-1",
        x: 5702,
        y: 2355,
        brightness: 0.9930198562641788
      },
      {
        id: "gru-2",
        x: 5678,
        y: 2281,
        brightness: 0.8392886376105706
      },
      {
        id: "gru-3",
        x: 5624,
        y: 2229,
        brightness: 0.9585955121859653
      },
      {
        id: "gru-4",
        x: 5534,
        y: 2283,
        brightness: 0.9931461706642244
      },
      {
        id: "gru-5",
        x: 5622,
        y: 2225,
        brightness: 0.9389217036337492
      },
      {
        id: "gru-6",
        x: 5565,
        y: 2189,
        brightness: 0.8338949072872027
      },
      {
        id: "gru-7",
        x: 5525,
        y: 2159,
        brightness: 0.9650900764474216
      },
      {
        id: "gru-8",
        x: 5475,
        y: 2123,
        brightness: 0.9379660163525186
      }
    ],
    connections: [
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
    set: "birds"
  },
  {
    id: "hor",
    name: "Horologium",
    latinName: "Horologium",
    description: "The Pendulum Clock - A faint southern constellation.",
    centerX: 762,
    centerY: 2400,
    radius: 100,
    discovered: false,
    observatory: "southern",
    stars: [
      {
        id: "hor-0",
        x: 1058,
        y: 2205,
        brightness: 0.9660349312102597
      },
      {
        id: "hor-1",
        x: 677,
        y: 2347,
        brightness: 0.8822140655715981
      },
      {
        id: "hor-2",
        x: 656,
        y: 2376,
        brightness: 0.8753897991628091
      },
      {
        id: "hor-3",
        x: 669,
        y: 2409,
        brightness: 0.9875515973943352
      },
      {
        id: "hor-4",
        x: 765,
        y: 2496,
        brightness: 0.8104998720661111
      },
      {
        id: "hor-5",
        x: 745,
        y: 2568,
        brightness: 0.9894894762586887
      }
    ],
    connections: [
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
    set: "instruments"
  },
  {
    id: "hya",
    name: "Hydra",
    latinName: "Hydra",
    description: "The Water Snake - The largest of all 88 constellations.",
    centerX: 2609,
    centerY: 1667,
    radius: 100,
    discovered: false,
    observatory: "southern",
    stars: [
      {
        id: "hya-0",
        x: 2195,
        y: 1393,
        brightness: 0.8438772639272706
      },
      {
        id: "hya-1",
        x: 2202,
        y: 1403,
        brightness: 0.8895648747766848
      },
      {
        id: "hya-2",
        x: 2180,
        y: 1443,
        brightness: 0.801059473869276
      },
      {
        id: "hya-3",
        x: 2161,
        y: 1444,
        brightness: 0.9360633009307849
      },
      {
        id: "hya-4",
        x: 2157,
        y: 1405,
        brightness: 0.8784748868788581
      },
      {
        id: "hya-5",
        x: 2231,
        y: 1401,
        brightness: 0.8467048735470472
      },
      {
        id: "hya-6",
        x: 2310,
        y: 1461,
        brightness: 0.9274456747161952
      },
      {
        id: "hya-7",
        x: 2416,
        y: 1519,
        brightness: 0.8073012727407001
      },
      {
        id: "hya-8",
        x: 2365,
        y: 1644,
        brightness: 0.9187553399372141
      },
      {
        id: "hya-9",
        x: 2464,
        y: 1747,
        brightness: 0.9842407186124392
      },
      {
        id: "hya-10",
        x: 2544,
        y: 1706,
        brightness: 0.8386228172997087
      },
      {
        id: "hya-11",
        x: 2609,
        y: 1781,
        brightness: 0.9089336101617174
      },
      {
        id: "hya-12",
        x: 2707,
        y: 1770,
        brightness: 0.9186135662037744
      },
      {
        id: "hya-13",
        x: 2888,
        y: 2031,
        brightness: 0.8226832628218488
      },
      {
        id: "hya-14",
        x: 2970,
        y: 2065,
        brightness: 0.8600535558749255
      },
      {
        id: "hya-15",
        x: 3329,
        y: 1886,
        brightness: 0.8384765850356859
      },
      {
        id: "hya-16",
        x: 3527,
        y: 1945,
        brightness: 0.9851106057588112
      },
      {
        id: "hya-17",
        x: 3710,
        y: 1966,
        brightness: 0.802766582247614
      }
    ],
    connections: [
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
    set: "waters"
  },
  {
    id: "hyi",
    name: "Hydrus",
    latinName: "Hydrus",
    description: "The Lesser Water Snake - A southern constellation near the pole.",
    centerX: 547,
    centerY: 2660,
    radius: 100,
    discovered: false,
    observatory: "southern",
    stars: [
      {
        id: "hyi-0",
        x: 107,
        y: 2788,
        brightness: 0.9553002205229404
      },
      {
        id: "hyi-1",
        x: 947,
        y: 2737,
        brightness: 0.8797623068208155
      },
      {
        id: "hyi-2",
        x: 665,
        y: 2638,
        brightness: 0.8959008184013142
      },
      {
        id: "hyi-3",
        x: 591,
        y: 2644,
        brightness: 0.8908351801717106
      },
      {
        id: "hyi-4",
        x: 479,
        y: 2627,
        brightness: 0.8792239313886091
      },
      {
        id: "hyi-5",
        x: 495,
        y: 2526,
        brightness: 0.9114317488618233
      }
    ],
    connections: [
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
    set: "waters"
  },
  {
    id: "ind",
    name: "Indus",
    latinName: "Indus",
    description: "The Indian - A southern constellation with no bright stars.",
    centerX: 5278,
    centerY: 2387,
    radius: 100,
    discovered: false,
    observatory: "southern",
    stars: [
      {
        id: "ind-0",
        x: 5157,
        y: 2288,
        brightness: 0.912495579453082
      },
      {
        id: "ind-1",
        x: 5183,
        y: 2365,
        brightness: 0.8240960216249114
      },
      {
        id: "ind-2",
        x: 5228,
        y: 2474,
        brightness: 0.9931676029002048
      },
      {
        id: "ind-3",
        x: 5491,
        y: 2417,
        brightness: 0.8963362817848801
      },
      {
        id: "ind-4",
        x: 5333,
        y: 2391,
        brightness: 0.9926119609047146
      }
    ],
    connections: [
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
    set: "centaur"
  },
  {
    id: "lep",
    name: "Lepus",
    latinName: "Lepus",
    description: "The Hare - Sits at Orion's feet in the winter sky.",
    centerX: 1393,
    centerY: 1789,
    radius: 100,
    discovered: false,
    observatory: "southern",
    stars: [
      {
        id: "lep-0",
        x: 1526,
        y: 1749,
        brightness: 0.823995221793477
      },
      {
        id: "lep-1",
        x: 1485,
        y: 1736,
        brightness: 0.9214787345481812
      },
      {
        id: "lep-2",
        x: 1446,
        y: 1747,
        brightness: 0.9947324942865509
      },
      {
        id: "lep-3",
        x: 1386,
        y: 1797,
        brightness: 0.871982092293981
      },
      {
        id: "lep-4",
        x: 1304,
        y: 1770,
        brightness: 0.918134785055724
      },
      {
        id: "lep-5",
        x: 1273,
        y: 1873,
        brightness: 0.9917570497261133
      },
      {
        id: "lep-6",
        x: 1368,
        y: 1846,
        brightness: 0.8702417483630066
      },
      {
        id: "lep-7",
        x: 1435,
        y: 1874,
        brightness: 0.87154251406142
      },
      {
        id: "lep-8",
        x: 1464,
        y: 1848,
        brightness: 0.8966705105894466
      },
      {
        id: "lep-9",
        x: 1305,
        y: 1716,
        brightness: 0.9323997018442531
      },
      {
        id: "lep-10",
        x: 1332,
        y: 1720,
        brightness: 0.8635679286239603
      }
    ],
    connections: [
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
    set: "orion"
  },
  {
    id: "lib",
    name: "Libra",
    latinName: "Libra",
    description: "The Scales - The only zodiac constellation representing an object.",
    centerX: 3836,
    centerY: 1843,
    radius: 100,
    discovered: false,
    observatory: "southern",
    stars: [
      {
        id: "lib-0",
        x: 3767,
        y: 1921,
        brightness: 0.8019840295868664
      },
      {
        id: "lib-1",
        x: 3712,
        y: 1767,
        brightness: 0.8023575016524076
      },
      {
        id: "lib-2",
        x: 3821,
        y: 1656,
        brightness: 0.8763335651937108
      },
      {
        id: "lib-3",
        x: 3898,
        y: 1746,
        brightness: 0.8285292913064621
      },
      {
        id: "lib-4",
        x: 3904,
        y: 1969,
        brightness: 0.9953848544504456
      },
      {
        id: "lib-5",
        x: 3911,
        y: 1996,
        brightness: 0.8011630087545323
      }
    ],
    connections: [
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
    set: "zodiac"
  },
  {
    id: "lup",
    name: "Lupus",
    latinName: "Lupus",
    description: "The Wolf - An ancient constellation near Centaurus.",
    centerX: 3865,
    centerY: 2190,
    radius: 100,
    discovered: false,
    observatory: "southern",
    stars: [
      {
        id: "lup-0",
        x: 3962,
        y: 2060,
        brightness: 0.9536326555916621
      },
      {
        id: "lup-1",
        x: 3916,
        y: 2074,
        brightness: 0.8285009285530126
      },
      {
        id: "lup-2",
        x: 3841,
        y: 2104,
        brightness: 0.845362100328121
      },
      {
        id: "lup-3",
        x: 3839,
        y: 2177,
        brightness: 0.8967248932388721
      },
      {
        id: "lup-4",
        x: 3744,
        y: 2219,
        brightness: 0.8373289015904423
      },
      {
        id: "lup-5",
        x: 3675,
        y: 2290,
        brightness: 0.8905119937437372
      },
      {
        id: "lup-6",
        x: 3801,
        y: 2368,
        brightness: 0.9290130065781615
      },
      {
        id: "lup-7",
        x: 3827,
        y: 2298,
        brightness: 0.849778248119906
      },
      {
        id: "lup-8",
        x: 3845,
        y: 2245,
        brightness: 0.971251318557856
      },
      {
        id: "lup-9",
        x: 3896,
        y: 2186,
        brightness: 0.9373754452380192
      },
      {
        id: "lup-10",
        x: 4001,
        y: 2140,
        brightness: 0.9162229707181734
      },
      {
        id: "lup-11",
        x: 4027,
        y: 2113,
        brightness: 0.900928428288696
      }
    ],
    connections: [
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
    set: "centaur"
  },
  {
    id: "men",
    name: "Mensa",
    latinName: "Mensa",
    description: "The Table Mountain - The faintest named constellation.",
    centerX: 1354,
    centerY: 2739,
    radius: 100,
    discovered: false,
    observatory: "southern",
    stars: [
      {
        id: "men-0",
        x: 1543,
        y: 2746,
        brightness: 0.9737937929857331
      },
      {
        id: "men-1",
        x: 1383,
        y: 2772,
        brightness: 0.8774293268961024
      },
      {
        id: "men-2",
        x: 1230,
        y: 2749,
        brightness: 0.8628100170287943
      },
      {
        id: "men-3",
        x: 1261,
        y: 2689,
        brightness: 0.90624484234274
      }
    ],
    connections: [
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
    set: "instruments"
  },
  {
    id: "mic",
    name: "Microscopium",
    latinName: "Microscopium",
    description: "The Microscope - A faint southern constellation.",
    centerX: 5265,
    centerY: 2110,
    radius: 100,
    discovered: false,
    observatory: "southern",
    stars: [
      {
        id: "mic-0",
        x: 5208,
        y: 2063,
        brightness: 0.8241029177921925
      },
      {
        id: "mic-1",
        x: 5202,
        y: 2233,
        brightness: 0.8340141131141351
      },
      {
        id: "mic-2",
        x: 5337,
        y: 2180,
        brightness: 0.9167525849686031
      },
      {
        id: "mic-3",
        x: 5325,
        y: 2036,
        brightness: 0.845313222152654
      },
      {
        id: "mic-4",
        x: 5255,
        y: 2038,
        brightness: 0.9592812664631738
      }
    ],
    connections: [
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
    set: "instruments"
  },
  {
    id: "mon",
    name: "Monoceros",
    latinName: "Monoceros",
    description: "The Unicorn - Located on the celestial equator.",
    centerX: 1727,
    centerY: 1504,
    radius: 100,
    discovered: false,
    observatory: "southern",
    stars: [
      {
        id: "mon-0",
        x: 1922,
        y: 1659,
        brightness: 0.9249678539069481
      },
      {
        id: "mon-1",
        x: 2036,
        y: 1550,
        brightness: 0.8016272157013731
      },
      {
        id: "mon-2",
        x: 1799,
        y: 1508,
        brightness: 0.8166132398507328
      },
      {
        id: "mon-3",
        x: 1620,
        y: 1617,
        brightness: 0.8899589104465746
      },
      {
        id: "mon-4",
        x: 1562,
        y: 1605,
        brightness: 0.9088535830873855
      },
      {
        id: "mon-5",
        x: 1699,
        y: 1460,
        brightness: 0.8828166661247425
      },
      {
        id: "mon-6",
        x: 1599,
        y: 1423,
        brightness: 0.8377449969210018
      },
      {
        id: "mon-7",
        x: 1637,
        y: 1378,
        brightness: 0.804194917889611
      },
      {
        id: "mon-8",
        x: 1671,
        y: 1335,
        brightness: 0.8323112772769091
      }
    ],
    connections: [
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
    set: "orion"
  },
  {
    id: "mus",
    name: "Musca",
    latinName: "Musca",
    description: "The Fly - A small constellation near the Southern Cross.",
    centerX: 3126,
    centerY: 2654,
    radius: 100,
    discovered: false,
    observatory: "southern",
    stars: [
      {
        id: "mus-0",
        x: 2940,
        y: 2612,
        brightness: 0.8705837692262992
      },
      {
        id: "mus-1",
        x: 3073,
        y: 2633,
        brightness: 0.8777448941384363
      },
      {
        id: "mus-2",
        x: 3155,
        y: 2652,
        brightness: 0.8928009885987804
      },
      {
        id: "mus-3",
        x: 3193,
        y: 2635,
        brightness: 0.8701707857027359
      },
      {
        id: "mus-4",
        x: 3259,
        y: 2692,
        brightness: 0.8672708315872804
      },
      {
        id: "mus-5",
        x: 3135,
        y: 2702,
        brightness: 0.8794500378855553
      }
    ],
    connections: [
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
    set: "birds"
  },
  {
    id: "nor",
    name: "Norma",
    latinName: "Norma",
    description: "The Carpenter's Square - A small southern constellation.",
    centerX: 4059,
    centerY: 2301,
    radius: 69,
    discovered: false,
    observatory: "southern",
    stars: [
      {
        id: "nor-0",
        x: 4027,
        y: 2253,
        brightness: 0.8234881887430318
      },
      {
        id: "nor-1",
        x: 4113,
        y: 2293,
        brightness: 0.9910659939085806
      },
      {
        id: "nor-2",
        x: 4083,
        y: 2336,
        brightness: 0.8548705355137995
      },
      {
        id: "nor-3",
        x: 4013,
        y: 2320,
        brightness: 0.845774791058003
      }
    ],
    connections: [
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
    set: "instruments"
  },
  {
    id: "oct",
    name: "Octans",
    latinName: "Octans",
    description: "The Octant - Contains the south celestial pole.",
    centerX: 4909,
    centerY: 2847,
    radius: 100,
    discovered: false,
    observatory: "southern",
    stars: [
      {
        id: "oct-0",
        x: 3612,
        y: 2894,
        brightness: 0.9041003380280911
      },
      {
        id: "oct-1",
        x: 5692,
        y: 2856,
        brightness: 0.8856236789533695
      },
      {
        id: "oct-2",
        x: 5423,
        y: 2790,
        brightness: 0.8610257972213607
      }
    ],
    connections: [
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
    set: "instruments"
  },
  {
    id: "oph",
    name: "Ophiuchus",
    latinName: "Ophiuchus",
    description: "The Serpent Bearer - A large constellation on the celestial equator.",
    centerX: 4243,
    centerY: 1653,
    radius: 100,
    discovered: false,
    observatory: "southern",
    stars: [
      {
        id: "oph-0",
        x: 4496,
        y: 1663,
        brightness: 0.8477528310706766
      },
      {
        id: "oph-1",
        x: 4450,
        y: 1455,
        brightness: 0.8405866056485006
      },
      {
        id: "oph-2",
        x: 4431,
        y: 1424,
        brightness: 0.9259026661056999
      },
      {
        id: "oph-3",
        x: 4396,
        y: 1291,
        brightness: 0.9029952488293367
      },
      {
        id: "oph-4",
        x: 4240,
        y: 1344,
        brightness: 0.8872642137988043
      },
      {
        id: "oph-5",
        x: 4129,
        y: 1467,
        brightness: 0.8263524872070198
      },
      {
        id: "oph-6",
        x: 4060,
        y: 1562,
        brightness: 0.9003920830985048
      },
      {
        id: "oph-7",
        x: 4076,
        y: 1578,
        brightness: 0.9897768751497018
      },
      {
        id: "oph-8",
        x: 4155,
        y: 1676,
        brightness: 0.9151527726229199
      },
      {
        id: "oph-9",
        x: 4293,
        y: 1762,
        brightness: 0.9640361761950393
      },
      {
        id: "oph-10",
        x: 4130,
        y: 1777,
        brightness: 0.9430229492525753
      },
      {
        id: "oph-11",
        x: 4113,
        y: 1808,
        brightness: 0.8050658218167313
      },
      {
        id: "oph-12",
        x: 4100,
        y: 1834,
        brightness: 0.8396733417136277
      },
      {
        id: "oph-13",
        x: 4107,
        y: 1891,
        brightness: 0.867343234263834
      },
      {
        id: "oph-14",
        x: 4342,
        y: 1917,
        brightness: 0.9908996493924034
      },
      {
        id: "oph-15",
        x: 4364,
        y: 1998,
        brightness: 0.850852115123909
      }
    ],
    connections: [
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
    id: "pav",
    name: "Pavo",
    latinName: "Pavo",
    description: "The Peacock - A southern constellation with a bright alpha star.",
    centerX: 4866,
    centerY: 2585,
    radius: 100,
    discovered: false,
    observatory: "southern",
    stars: [
      {
        id: "pav-0",
        x: 5107,
        y: 2446,
        brightness: 0.9641164180035309
      },
      {
        id: "pav-1",
        x: 5187,
        y: 2603,
        brightness: 0.8983906323906944
      },
      {
        id: "pav-2",
        x: 5036,
        y: 2603,
        brightness: 0.9132626704069864
      },
      {
        id: "pav-3",
        x: 4718,
        y: 2536,
        brightness: 0.9219236290397163
      },
      {
        id: "pav-4",
        x: 4597,
        y: 2525,
        brightness: 0.9650733584536871
      },
      {
        id: "pav-5",
        x: 4536,
        y: 2561,
        brightness: 0.8700477873464889
      },
      {
        id: "pav-6",
        x: 4441,
        y: 2579,
        brightness: 0.9622715772010444
      },
      {
        id: "pav-7",
        x: 4679,
        y: 2690,
        brightness: 0.871388130033336
      },
      {
        id: "pav-8",
        x: 5002,
        y: 2715,
        brightness: 0.9297682298464636
      },
      {
        id: "pav-9",
        x: 5360,
        y: 2589,
        brightness: 0.8026078545708082
      }
    ],
    connections: [
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
    set: "birds"
  },
  {
    id: "phe",
    name: "Phoenix",
    latinName: "Phoenix",
    description: "The Phoenix - A southern constellation representing the mythical bird.",
    centerX: 243,
    centerY: 2285,
    radius: 100,
    discovered: false,
    observatory: "southern",
    stars: [
      {
        id: "phe-0",
        x: 110,
        y: 2205,
        brightness: 0.9996666583918903
      },
      {
        id: "phe-1",
        x: 275,
        y: 2279,
        brightness: 0.8978880114220331
      },
      {
        id: "phe-2",
        x: 368,
        y: 2222,
        brightness: 0.8276220407102709
      },
      {
        id: "phe-3",
        x: 380,
        y: 2318,
        brightness: 0.9884310926678761
      },
      {
        id: "phe-4",
        x: 285,
        y: 2421,
        brightness: 0.8888214327454655
      },
      {
        id: "phe-5",
        x: 39,
        y: 2262,
        brightness: 0.9450652254401065
      }
    ],
    connections: [
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
    set: "birds"
  },
  {
    id: "pic",
    name: "Pictor",
    latinName: "Pictor",
    description: "The Painter's Easel - A faint southern constellation.",
    centerX: 1535,
    centerY: 2440,
    radius: 100,
    discovered: false,
    observatory: "southern",
    stars: [
      {
        id: "pic-0",
        x: 1701,
        y: 2532,
        brightness: 0.9919951407783277
      },
      {
        id: "pic-1",
        x: 1458,
        y: 2436,
        brightness: 0.9574493228163747
      },
      {
        id: "pic-2",
        x: 1447,
        y: 2351,
        brightness: 0.8398477503795707
      }
    ],
    connections: [
      [
        0,
        1
      ],
      [
        1,
        2
      ]
    ],
    set: "instruments"
  },
  {
    id: "psa",
    name: "Piscis Austrinus",
    latinName: "Piscis Austrinus",
    description: "The Southern Fish - Contains bright Fomalhaut.",
    centerX: 5614,
    centerY: 2024,
    radius: 100,
    discovered: false,
    observatory: "southern",
    stars: [
      {
        id: "psa-0",
        x: 5669,
        y: 1951,
        brightness: 0.9496595484025608
      },
      {
        id: "psa-1",
        x: 5740,
        y: 1994,
        brightness: 0.9334035317561067
      },
      {
        id: "psa-2",
        x: 5733,
        y: 2042,
        brightness: 0.9342964049870184
      },
      {
        id: "psa-3",
        x: 5719,
        y: 2048,
        brightness: 0.8997024281237157
      },
      {
        id: "psa-4",
        x: 5631,
        y: 2039,
        brightness: 0.8663376659179562
      },
      {
        id: "psa-5",
        x: 5535,
        y: 2050,
        brightness: 0.9881572926015004
      },
      {
        id: "psa-6",
        x: 5437,
        y: 2050,
        brightness: 0.8468861317665626
      },
      {
        id: "psa-7",
        x: 5449,
        y: 2015,
        brightness: 0.8031822362815331
      }
    ],
    connections: [
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
    set: "waters"
  },
  {
    id: "pup",
    name: "Puppis",
    latinName: "Puppis",
    description: "The Stern - Part of the ancient ship Argo Navis.",
    centerX: 1927,
    centerY: 2030,
    radius: 100,
    discovered: false,
    observatory: "southern",
    stars: [
      {
        id: "pup-0",
        x: 1657,
        y: 2220,
        brightness: 0.9379951099990641
      },
      {
        id: "pup-1",
        x: 1821,
        y: 2118,
        brightness: 0.9625776243561868
      },
      {
        id: "pup-2",
        x: 1897,
        y: 1973,
        brightness: 0.8528253269014824
      },
      {
        id: "pup-3",
        x: 1912,
        y: 1947,
        brightness: 0.9426124428258152
      },
      {
        id: "pup-4",
        x: 1955,
        y: 1914,
        brightness: 0.9884424511855036
      },
      {
        id: "pup-5",
        x: 1987,
        y: 1881,
        brightness: 0.9729259957795828
      },
      {
        id: "pup-6",
        x: 2031,
        y: 1905,
        brightness: 0.9890811588972519
      },
      {
        id: "pup-7",
        x: 2015,
        y: 2167,
        brightness: 0.8238656770648374
      },
      {
        id: "pup-8",
        x: 2040,
        y: 2289,
        brightness: 0.9052982799369602
      },
      {
        id: "pup-9",
        x: 1950,
        y: 1932,
        brightness: 0.9437998791833546
      },
      {
        id: "pup-10",
        x: 1933,
        y: 1983,
        brightness: 0.8829312563988367
      }
    ],
    connections: [
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
    set: "argo"
  },
  {
    id: "pyx",
    name: "Pyxis",
    latinName: "Pyxis",
    description: "The Compass - Represents a ship's compass.",
    centerX: 2144,
    centerY: 2068,
    radius: 100,
    discovered: false,
    observatory: "southern",
    stars: [
      {
        id: "pyx-0",
        x: 2015,
        y: 2167,
        brightness: 0.96788831716629
      },
      {
        id: "pyx-1",
        x: 2167,
        y: 2088,
        brightness: 0.8833753126829565
      },
      {
        id: "pyx-2",
        x: 2182,
        y: 2053,
        brightness: 0.836499349289955
      },
      {
        id: "pyx-3",
        x: 2211,
        y: 1962,
        brightness: 0.9271306778619474
      }
    ],
    connections: [
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
    set: "argo"
  },
  {
    id: "ret",
    name: "Reticulum",
    latinName: "Reticulum",
    description: "The Reticle - A small southern constellation.",
    centerX: 1015,
    centerY: 2533,
    radius: 100,
    discovered: false,
    observatory: "southern",
    stars: [
      {
        id: "ret-0",
        x: 1060,
        y: 2541,
        brightness: 0.977485759581396
      },
      {
        id: "ret-1",
        x: 1069,
        y: 2488,
        brightness: 0.8185994236307744
      },
      {
        id: "ret-2",
        x: 995,
        y: 2523,
        brightness: 0.8398380785977514
      },
      {
        id: "ret-3",
        x: 934,
        y: 2580,
        brightness: 0.8212925192251116
      }
    ],
    connections: [
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
    set: "instruments"
  },
  {
    id: "sgr",
    name: "Sagittarius",
    latinName: "Sagittarius",
    description: "The Archer - Points toward the galactic center.",
    centerX: 4767,
    centerY: 1961,
    radius: 100,
    discovered: false,
    observatory: "southern",
    stars: [
      {
        id: "sgr-0",
        x: 4573,
        y: 2113,
        brightness: 0.8803468026254212
      },
      {
        id: "sgr-1",
        x: 4601,
        y: 2073,
        brightness: 0.8095897303428186
      },
      {
        id: "sgr-2",
        x: 4587,
        y: 1997,
        brightness: 0.9099359908386905
      },
      {
        id: "sgr-3",
        x: 4617,
        y: 1924,
        brightness: 0.8105609728203123
      },
      {
        id: "sgr-4",
        x: 4557,
        y: 1851,
        brightness: 0.9456860343107947
      },
      {
        id: "sgr-5",
        x: 4844,
        y: 2241,
        brightness: 0.8696941362458291
      },
      {
        id: "sgr-6",
        x: 4850,
        y: 2177,
        brightness: 0.9308962763907552
      },
      {
        id: "sgr-7",
        x: 4761,
        y: 1998,
        brightness: 0.9988786987246079
      },
      {
        id: "sgr-8",
        x: 4690,
        y: 1950,
        brightness: 0.8174319297759418
      },
      {
        id: "sgr-9",
        x: 4980,
        y: 2198,
        brightness: 0.826967903090245
      },
      {
        id: "sgr-10",
        x: 4999,
        y: 2088,
        brightness: 0.8707596513628793
      },
      {
        id: "sgr-11",
        x: 4983,
        y: 1938,
        brightness: 0.8426071882574545
      },
      {
        id: "sgr-12",
        x: 4903,
        y: 1915,
        brightness: 0.9493965879174144
      },
      {
        id: "sgr-13",
        x: 4855,
        y: 1908,
        brightness: 0.9081251523593097
      },
      {
        id: "sgr-14",
        x: 4815,
        y: 1921,
        brightness: 0.9465129153268366
      },
      {
        id: "sgr-15",
        x: 4730,
        y: 1938,
        brightness: 0.9314217627019246
      },
      {
        id: "sgr-16",
        x: 4524,
        y: 2007,
        brightness: 0.8967025212462056
      },
      {
        id: "sgr-17",
        x: 4779,
        y: 1961,
        brightness: 0.915705389902804
      },
      {
        id: "sgr-18",
        x: 4770,
        y: 1862,
        brightness: 0.9515652940423243
      },
      {
        id: "sgr-19",
        x: 4791,
        y: 1850,
        brightness: 0.8026229212206422
      },
      {
        id: "sgr-20",
        x: 4823,
        y: 1816,
        brightness: 0.8656438805127021
      },
      {
        id: "sgr-21",
        x: 4840,
        y: 1797,
        brightness: 0.9970888215618494
      },
      {
        id: "sgr-22",
        x: 4841,
        y: 1766,
        brightness: 0.9493625824279325
      },
      {
        id: "sgr-23",
        x: 4741,
        y: 1852,
        brightness: 0.9870125047236504
      },
      {
        id: "sgr-24",
        x: 4726,
        y: 1879,
        brightness: 0.8789035799587607
      }
    ],
    connections: [
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
    set: "zodiac"
  },
  {
    id: "sco",
    name: "Scorpius",
    latinName: "Scorpius",
    description: "The Scorpion - A striking zodiac constellation with red Antares.",
    centerX: 4215,
    centerY: 2055,
    radius: 100,
    discovered: false,
    observatory: "southern",
    stars: [
      {
        id: "sco-0",
        x: 3995,
        y: 1935,
        brightness: 0.9191774773314597
      },
      {
        id: "sco-1",
        x: 4001,
        y: 1877,
        brightness: 0.8032006281162725
      },
      {
        id: "sco-2",
        x: 4023,
        y: 1830,
        brightness: 0.9322153362448276
      },
      {
        id: "sco-3",
        x: 4088,
        y: 1927,
        brightness: 0.9511836808003576
      },
      {
        id: "sco-4",
        x: 4123,
        y: 1941,
        brightness: 0.9084795467720117
      },
      {
        id: "sco-5",
        x: 4150,
        y: 1970,
        brightness: 0.8248953083132584
      },
      {
        id: "sco-6",
        x: 4209,
        y: 2072,
        brightness: 0.9098950742268365
      },
      {
        id: "sco-7",
        x: 4216,
        y: 2134,
        brightness: 0.9323117459045256
      },
      {
        id: "sco-8",
        x: 4227,
        y: 2206,
        brightness: 0.9238286489830263
      },
      {
        id: "sco-9",
        x: 4301,
        y: 2221,
        brightness: 0.8747200542358097
      },
      {
        id: "sco-10",
        x: 4405,
        y: 2217,
        brightness: 0.8246520245274083
      },
      {
        id: "sco-11",
        x: 4448,
        y: 2169,
        brightness: 0.9948484382974709
      },
      {
        id: "sco-12",
        x: 4427,
        y: 2151,
        brightness: 0.9709273033239887
      },
      {
        id: "sco-13",
        x: 4390,
        y: 2118,
        brightness: 0.8440572678108241
      }
    ],
    connections: [
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
    set: "zodiac"
  },
  {
    id: "scl",
    name: "Sculptor",
    latinName: "Sculptor",
    description: "The Sculptor - Contains the south galactic pole.",
    centerX: 5978,
    centerY: 2033,
    radius: 100,
    discovered: false,
    observatory: "southern",
    stars: [
      {
        id: "scl-0",
        x: 244,
        y: 1989,
        brightness: 0.8170175813006866
      },
      {
        id: "scl-1",
        x: 5954,
        y: 1969,
        brightness: 0.9453193296731285
      },
      {
        id: "scl-2",
        x: 5828,
        y: 2042,
        brightness: 0.9596332571799959
      },
      {
        id: "scl-3",
        x: 5887,
        y: 2130,
        brightness: 0.896033666946441
      }
    ],
    connections: [
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
    set: "instruments"
  },
  {
    id: "sct",
    name: "Scutum",
    latinName: "Scutum",
    description: "The Shield - A small but distinctive constellation.",
    centerX: 4661,
    centerY: 1653,
    radius: 100,
    discovered: false,
    observatory: "southern",
    stars: [
      {
        id: "sct-0",
        x: 4647,
        y: 1637,
        brightness: 0.8416067610132602
      },
      {
        id: "sct-1",
        x: 4697,
        y: 1579,
        brightness: 0.9585456990860669
      },
      {
        id: "sct-2",
        x: 4676,
        y: 1651,
        brightness: 0.8651566204103037
      },
      {
        id: "sct-3",
        x: 4622,
        y: 1743,
        brightness: 0.8697976550530743
      }
    ],
    connections: [
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
    id: "ser-2",
    name: "Serpens",
    latinName: "Serpens",
    description: "The Serpent - The only constellation split into two parts.",
    centerX: 4505,
    centerY: 1633,
    radius: 100,
    discovered: false,
    observatory: "southern",
    stars: [
      {
        id: "ser-2-0",
        x: 4293,
        y: 1762,
        brightness: 0.8590511704892203
      },
      {
        id: "ser-2-1",
        x: 4407,
        y: 1757,
        brightness: 0.898315528573863
      },
      {
        id: "ser-2-2",
        x: 4496,
        y: 1663,
        brightness: 0.9458689008654716
      },
      {
        id: "ser-2-3",
        x: 4513,
        y: 1636,
        brightness: 0.9270734933141783
      },
      {
        id: "ser-2-4",
        x: 4589,
        y: 1548,
        brightness: 0.8991527468394612
      },
      {
        id: "ser-2-5",
        x: 4734,
        y: 1430,
        brightness: 0.8462453573140938
      }
    ],
    connections: [
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
    id: "sex",
    name: "Sextans",
    latinName: "Sextans",
    description: "The Sextant - A faint equatorial constellation.",
    centerX: 2563,
    centerY: 1550,
    radius: 100,
    discovered: false,
    observatory: "southern",
    stars: [
      {
        id: "sex-0",
        x: 2533,
        y: 1506,
        brightness: 0.8426826916889327
      },
      {
        id: "sex-1",
        x: 2469,
        y: 1635,
        brightness: 0.9667758227166958
      },
      {
        id: "sex-2",
        x: 2623,
        y: 1546,
        brightness: 0.9558228829554706
      },
      {
        id: "sex-3",
        x: 2626,
        y: 1511,
        brightness: 0.9895178080638304
      }
    ],
    connections: [
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
    set: "centaur"
  },
  {
    id: "tel",
    name: "Telescopium",
    latinName: "Telescopium",
    description: "The Telescope - A small southern constellation.",
    centerX: 4593,
    centerY: 2283,
    radius: 59,
    discovered: false,
    observatory: "southern",
    stars: [
      {
        id: "tel-0",
        x: 4547,
        y: 2266,
        brightness: 0.9413168756583034
      },
      {
        id: "tel-1",
        x: 4612,
        y: 2266,
        brightness: 0.8352837667583211
      },
      {
        id: "tel-2",
        x: 4620,
        y: 2318,
        brightness: 0.9315956946150501
      }
    ],
    connections: [
      [
        0,
        1
      ],
      [
        1,
        2
      ]
    ],
    set: "instruments"
  },
  {
    id: "tra",
    name: "Triangulum Australe",
    latinName: "Triangulum Australe",
    description: "The Southern Triangle - A distinctive southern constellation.",
    centerX: 4004,
    centerY: 2617,
    radius: 100,
    discovered: false,
    observatory: "southern",
    stars: [
      {
        id: "tra-0",
        x: 4203,
        y: 2650,
        brightness: 0.9667389310868187
      },
      {
        id: "tra-1",
        x: 3980,
        y: 2557,
        brightness: 0.8390983919204051
      },
      {
        id: "tra-2",
        x: 3829,
        y: 2645,
        brightness: 0.9423663392915564
      }
    ],
    connections: [
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
    set: "centaur"
  },
  {
    id: "tuc",
    name: "Tucana",
    latinName: "Tucana",
    description: "The Toucan - Contains the Small Magellanic Cloud.",
    centerX: 5872,
    centerY: 2547,
    radius: 100,
    discovered: false,
    observatory: "southern",
    stars: [
      {
        id: "tuc-0",
        x: 5577,
        y: 2504,
        brightness: 0.9179641395380415
      },
      {
        id: "tuc-1",
        x: 5823,
        y: 2471,
        brightness: 0.9626311986326831
      },
      {
        id: "tuc-2",
        x: 6131,
        y: 2549,
        brightness: 0.8470375434153091
      },
      {
        id: "tuc-3",
        x: 6084,
        y: 2581,
        brightness: 0.9180036666935544
      },
      {
        id: "tuc-4",
        x: 6000,
        y: 2593,
        brightness: 0.960585588248384
      },
      {
        id: "tuc-5",
        x: 5614,
        y: 2583,
        brightness: 0.9168854771759366
      }
    ],
    connections: [
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
    set: "birds"
  },
  {
    id: "vel",
    name: "Vela",
    latinName: "Vela",
    description: "The Sails - Part of the ancient ship Argo Navis.",
    centerX: 2372,
    centerY: 2306,
    radius: 100,
    discovered: false,
    observatory: "southern",
    stars: [
      {
        id: "vel-0",
        x: 2186,
        y: 2412,
        brightness: 0.8302401163450512
      },
      {
        id: "vel-1",
        x: 2342,
        y: 2417,
        brightness: 0.95389019032676
      },
      {
        id: "vel-2",
        x: 2487,
        y: 2409,
        brightness: 0.850996310239613
      },
      {
        id: "vel-3",
        x: 2695,
        y: 2324,
        brightness: 0.9789725476399406
      },
      {
        id: "vel-4",
        x: 2561,
        y: 2202,
        brightness: 0.8345303135326871
      },
      {
        id: "vel-5",
        x: 2378,
        y: 2174,
        brightness: 0.9076005804447795
      },
      {
        id: "vel-6",
        x: 2283,
        y: 2224,
        brightness: 0.9097147504996413
      },
      {
        id: "vel-7",
        x: 2040,
        y: 2289,
        brightness: 0.8498269138811367
      }
    ],
    connections: [
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
    set: "argo"
  },
  {
    id: "vir",
    name: "Virgo",
    latinName: "Virgo",
    description: "The Maiden - The second-largest constellation with bright Spica.",
    centerX: 3318,
    centerY: 1506,
    radius: 100,
    discovered: false,
    observatory: "southern",
    stars: [
      {
        id: "vir-0",
        x: 2941,
        y: 1391,
        brightness: 0.9321621733572834
      },
      {
        id: "vir-1",
        x: 2961,
        y: 1471,
        brightness: 0.8342914041060577
      },
      {
        id: "vir-2",
        x: 3083,
        y: 1511,
        brightness: 0.9074928492880081
      },
      {
        id: "vir-3",
        x: 3174,
        y: 1524,
        brightness: 0.9114367170695223
      },
      {
        id: "vir-4",
        x: 3291,
        y: 1592,
        brightness: 0.9787429386867073
      },
      {
        id: "vir-5",
        x: 3355,
        y: 1686,
        brightness: 0.8976684051700952
      },
      {
        id: "vir-6",
        x: 3567,
        y: 1600,
        brightness: 0.9600352072925542
      },
      {
        id: "vir-7",
        x: 3679,
        y: 1594,
        brightness: 0.90223623575523
      },
      {
        id: "vir-8",
        x: 3259,
        y: 1317,
        brightness: 0.955293237574757
      },
      {
        id: "vir-9",
        x: 3232,
        y: 1443,
        brightness: 0.9446885513070986
      },
      {
        id: "vir-10",
        x: 3395,
        y: 1510,
        brightness: 0.8942357495639015
      },
      {
        id: "vir-11",
        x: 3507,
        y: 1474,
        brightness: 0.9007337692076389
      },
      {
        id: "vir-12",
        x: 3693,
        y: 1468,
        brightness: 0.8950658389939989
      }
    ],
    connections: [
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
    set: "zodiac"
  },
  {
    id: "vol",
    name: "Volans",
    latinName: "Volans",
    description: "The Flying Fish - A small southern constellation.",
    centerX: 2001,
    centerY: 2632,
    radius: 100,
    discovered: false,
    observatory: "southern",
    stars: [
      {
        id: "vol-0",
        x: 2260,
        y: 2607,
        brightness: 0.8280919652309646
      },
      {
        id: "vol-1",
        x: 2107,
        y: 2602,
        brightness: 0.8584351010637274
      },
      {
        id: "vol-2",
        x: 2033,
        y: 2644,
        brightness: 0.857622474062326
      },
      {
        id: "vol-3",
        x: 1820,
        y: 2633,
        brightness: 0.9734582143768504
      },
      {
        id: "vol-4",
        x: 1786,
        y: 2675,
        brightness: 0.9494873285424674
      }
    ],
    connections: [
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
    set: "waters"
  }
];
function getConstellationsByObservatory(observatory) {
  return CONSTELLATIONS.filter((c) => c.observatory === observatory);
}
// src/game/Constellation.ts
class Constellation {
  get id() {
    return this.data.id;
  }
  get name() {
    return this.data.name;
  }
  get x() {
    return this.data.centerX;
  }
  get y() {
    return this.data.centerY;
  }
  get radius() {
    return this.data.radius;
  }
  containsPoint(x, y) {
    const dx = x - this.x;
    const dy = y - this.y;
    return dx * dx + dy * dy < this.radius * this.radius;
  }
  data;
  hoverTime = 0;
  _discoveryProgress = 0;
  isAnimating = false;
  animationTime = 0;
  revealedConnections = 0;
  currentConnectionProgress = 0;
  lastRevealedConnections = 0;
  onAnimationComplete = null;
  onConnectionRevealed = null;
  starActivationTimes = new Map;
  cosmicFlashTime = 0;
  colors = {
    coreWhite: "rgba(255, 255, 245, ",
    innerGold: "rgba(255, 225, 130, ",
    midAmber: "rgba(255, 190, 80, ",
    outerGlow: "rgba(220, 160, 60, ",
    cosmicHaze: "rgba(180, 140, 100, "
  };
  hoverTimeRequired = 2;
  animationDuration = 3.5;
  starFlashDuration = 0.6;
  cosmicFlashDuration = 1.2;
  scale = 0.85;
  constructor(data) {
    this.data = { ...data };
  }
  getScaledStarPosition(star) {
    const dx = star.x - this.data.centerX;
    const dy = star.y - this.data.centerY;
    return {
      x: this.data.centerX + dx * this.scale,
      y: this.data.centerY + dy * this.scale
    };
  }
  getData() {
    return this.data;
  }
  getAnimationDuration() {
    return this.animationDuration;
  }
  setOnAnimationComplete(callback) {
    this.onAnimationComplete = callback;
  }
  setOnConnectionRevealed(callback) {
    this.onConnectionRevealed = callback;
  }
  get isDiscovered() {
    return this.data.discovered;
  }
  get discoveryProgress() {
    return this._discoveryProgress;
  }
  addHoverTime(deltaTime) {
    if (this.data.discovered || this.isAnimating)
      return false;
    this.hoverTime += deltaTime;
    this._discoveryProgress = Math.min(1, this.hoverTime / this.hoverTimeRequired);
    if (this.hoverTime >= this.hoverTimeRequired) {
      this.discover();
      return true;
    }
    return false;
  }
  resetHoverTime() {
    this.hoverTime = 0;
    this._discoveryProgress = 0;
  }
  discover() {
    this.data.discovered = true;
    this.isAnimating = true;
    this.animationTime = 0;
    this.revealedConnections = 0;
    this.starActivationTimes.clear();
    this.cosmicFlashTime = 0;
  }
  cancelDiscovery() {
    if (!this.isAnimating)
      return;
    this.data.discovered = false;
    this.isAnimating = false;
    this.animationTime = 0;
    this.revealedConnections = 0;
    this.currentConnectionProgress = 0;
    this.starActivationTimes.clear();
    this.cosmicFlashTime = 0;
    this.hoverTime = 0;
    this._discoveryProgress = 0;
    this.onAnimationComplete = null;
    this.onConnectionRevealed = null;
  }
  isAnimatingDiscovery() {
    return this.isAnimating;
  }
  update(deltaTime, isInView = true) {
    if (!this.isAnimating)
      return;
    if (!isInView)
      return;
    const wasFirstFrame = this.animationTime === 0;
    this.animationTime += deltaTime;
    if (wasFirstFrame && this.data.connections.length > 0) {
      const firstConnection = this.data.connections[0];
      if (firstConnection) {
        const [starIdx1] = firstConnection;
        if (starIdx1 !== undefined) {
          this.starActivationTimes.set(starIdx1, this.animationTime);
          if (this.onConnectionRevealed) {
            this.onConnectionRevealed(-1, this.data.connections.length);
          }
        }
      }
    }
    const totalProgress = Math.min(1, this.animationTime / this.animationDuration);
    const connectionProgress = totalProgress * this.data.connections.length;
    const newRevealedConnections = Math.floor(connectionProgress);
    this.currentConnectionProgress = connectionProgress - newRevealedConnections;
    if (newRevealedConnections > this.revealedConnections) {
      for (let i = this.revealedConnections;i < newRevealedConnections; i++) {
        if (this.onConnectionRevealed) {
          this.onConnectionRevealed(i, this.data.connections.length);
        }
        const connection = this.data.connections[i];
        if (connection) {
          const [, starIdx2] = connection;
          if (starIdx2 !== undefined && !this.starActivationTimes.has(starIdx2)) {
            this.starActivationTimes.set(starIdx2, this.animationTime);
          }
        }
      }
    }
    this.revealedConnections = newRevealedConnections;
    if (this.animationTime >= this.animationDuration) {
      this.isAnimating = false;
      this.revealedConnections = this.data.connections.length;
      this.currentConnectionProgress = 0;
      if (this.onAnimationComplete) {
        this.onAnimationComplete();
        this.onAnimationComplete = null;
        this.onConnectionRevealed = null;
      }
    }
  }
  render(ctx, viewX, viewY, canvasWidth, canvasHeight, opacityMultiplier = 1) {
    let effectiveViewX = viewX;
    const dx = this.data.centerX - viewX;
    if (dx < -SKY_WIDTH / 2)
      effectiveViewX -= SKY_WIDTH;
    else if (dx > SKY_WIDTH / 2)
      effectiveViewX += SKY_WIDTH;
    const centerScreenX = this.data.centerX - effectiveViewX + canvasWidth / 2;
    const centerScreenY = this.data.centerY - viewY + canvasHeight / 2;
    if (Math.abs(centerScreenX - canvasWidth / 2) > canvasWidth || Math.abs(centerScreenY - canvasHeight / 2) > canvasHeight) {
      return;
    }
    if (this.data.discovered) {
      this.renderDiscovered(ctx, effectiveViewX, viewY, canvasWidth, canvasHeight, opacityMultiplier);
    } else if (this._discoveryProgress > 0) {
      this.renderHint(ctx, effectiveViewX, viewY, canvasWidth, canvasHeight);
    }
  }
  renderHint(ctx, viewX, viewY, canvasWidth, canvasHeight) {
    const alpha = this._discoveryProgress * 0.5;
    for (const star of this.data.stars) {
      const pos = this.getScaledStarPosition(star);
      const screenX = pos.x - viewX + canvasWidth / 2;
      const screenY = pos.y - viewY + canvasHeight / 2;
      const pulse = Math.sin(Date.now() * 0.005) * 0.3 + 0.7;
      const size = 3 + star.brightness * 2;
      ctx.beginPath();
      ctx.arc(screenX, screenY, size * 3, 0, Math.PI * 2);
      const glowGradient = ctx.createRadialGradient(screenX, screenY, 0, screenX, screenY, size * 3);
      glowGradient.addColorStop(0, `rgba(255, 217, 61, ${alpha * pulse * 0.5})`);
      glowGradient.addColorStop(1, "rgba(255, 217, 61, 0)");
      ctx.fillStyle = glowGradient;
      ctx.fill();
    }
  }
  renderDiscovered(ctx, viewX, viewY, canvasWidth, canvasHeight, opacityMultiplier = 1) {
    const centerScreenX = this.data.centerX - viewX + canvasWidth / 2;
    const centerScreenY = this.data.centerY - viewY + canvasHeight / 2;
    const justCompleted = this.isAnimating && this.revealedConnections === this.data.connections.length;
    if (justCompleted && this.cosmicFlashTime === 0) {
      this.cosmicFlashTime = this.animationTime;
    }
    let cosmicFlashIntensity = 0;
    if (this.cosmicFlashTime > 0) {
      const timeSinceFlash = this.animationTime - this.cosmicFlashTime;
      if (timeSinceFlash < this.cosmicFlashDuration) {
        const progress = timeSinceFlash / this.cosmicFlashDuration;
        cosmicFlashIntensity = Math.sin(progress * Math.PI);
      }
    }
    const baseAlpha = (this.isAnimating ? 0.8 : 0.6) * opacityMultiplier;
    const lineAlpha = baseAlpha + cosmicFlashIntensity * 0.4;
    if (cosmicFlashIntensity > 0) {
      const shockwaveRadius = cosmicFlashIntensity * 350;
      const shockwaveGradient = ctx.createRadialGradient(centerScreenX, centerScreenY, shockwaveRadius * 0.7, centerScreenX, centerScreenY, shockwaveRadius);
      shockwaveGradient.addColorStop(0, `rgba(255, 220, 100, 0)`);
      shockwaveGradient.addColorStop(0.5, `rgba(255, 180, 50, ${cosmicFlashIntensity * 0.4})`);
      shockwaveGradient.addColorStop(1, `rgba(255, 140, 30, 0)`);
      ctx.beginPath();
      ctx.arc(centerScreenX, centerScreenY, shockwaveRadius, 0, Math.PI * 2);
      ctx.fillStyle = shockwaveGradient;
      ctx.fill();
      const glowGradient = ctx.createRadialGradient(centerScreenX, centerScreenY, 0, centerScreenX, centerScreenY, 180);
      glowGradient.addColorStop(0, `rgba(255, 250, 220, ${cosmicFlashIntensity * 0.5})`);
      glowGradient.addColorStop(0.4, `rgba(255, 200, 100, ${cosmicFlashIntensity * 0.3})`);
      glowGradient.addColorStop(1, `rgba(255, 160, 50, 0)`);
      ctx.beginPath();
      ctx.arc(centerScreenX, centerScreenY, 180, 0, Math.PI * 2);
      ctx.fillStyle = glowGradient;
      ctx.fill();
    }
    ctx.lineCap = "round";
    const connectionsToRender = this.isAnimating ? this.revealedConnections : this.data.connections.length;
    const shouldWrapLine = (x1, x2) => {
      const distance = Math.abs(x2 - x1);
      return distance > SKY_WIDTH / 2;
    };
    const drawWrappedLine = (x1Coord, y1Coord, x2Coord, y2Coord, viewXCoord, canvasWidthParam, alpha) => {
      const screenX1 = x1Coord - viewXCoord + canvasWidthParam / 2;
      const screenY1 = y1Coord;
      const screenX2 = x2Coord - viewXCoord + canvasWidthParam / 2;
      const screenY2 = y2Coord;
      if (shouldWrapLine(x1Coord, x2Coord)) {
        const leftX = x1Coord < x2Coord ? x1Coord : x2Coord;
        const rightX = x1Coord < x2Coord ? x2Coord : x1Coord;
        const leftY = x1Coord < x2Coord ? y1Coord : y2Coord;
        const rightY = x1Coord < x2Coord ? y2Coord : y1Coord;
        const leftScreenX = leftX - viewXCoord + canvasWidthParam / 2;
        const rightScreenX = rightX - viewXCoord + canvasWidthParam / 2;
        const wrappedRightX = rightX - SKY_WIDTH;
        const wrappedScreenX = wrappedRightX - viewXCoord + canvasWidthParam / 2;
        const wrappedLeftX = leftX + SKY_WIDTH;
        const wrappedLeftScreenX = wrappedLeftX - viewXCoord + canvasWidthParam / 2;
        const margin = 200;
        const leftStarVisible = leftScreenX >= -margin && leftScreenX <= canvasWidthParam + margin;
        const rightStarVisible = rightScreenX >= -margin && rightScreenX <= canvasWidthParam + margin;
        if (leftStarVisible || wrappedScreenX >= -margin && wrappedScreenX <= canvasWidthParam + margin) {
          this.drawGlowingLine(ctx, leftScreenX, leftY, wrappedScreenX, rightY, alpha);
        }
        if (rightStarVisible || wrappedLeftScreenX >= -margin && wrappedLeftScreenX <= canvasWidthParam + margin) {
          this.drawGlowingLine(ctx, wrappedLeftScreenX, leftY, rightScreenX, rightY, alpha);
        }
      } else {
        this.drawGlowingLine(ctx, screenX1, screenY1, screenX2, screenY2, alpha);
      }
    };
    for (let i = 0;i < connectionsToRender; i++) {
      const connection = this.data.connections[i];
      if (!connection)
        continue;
      const [starIdx1, starIdx2] = connection;
      const star1 = this.data.stars[starIdx1];
      const star2 = this.data.stars[starIdx2];
      if (!star1 || !star2)
        continue;
      const pos1 = this.getScaledStarPosition(star1);
      const pos2 = this.getScaledStarPosition(star2);
      const y1 = pos1.y - viewY + canvasHeight / 2;
      const y2 = pos2.y - viewY + canvasHeight / 2;
      drawWrappedLine(pos1.x, y1, pos2.x, y2, viewX, canvasWidth, lineAlpha);
    }
    if (this.isAnimating && this.revealedConnections < this.data.connections.length) {
      const currentConnection = this.data.connections[this.revealedConnections];
      if (currentConnection) {
        const [starIdx1, starIdx2] = currentConnection;
        const star1 = this.data.stars[starIdx1];
        const star2 = this.data.stars[starIdx2];
        if (star1 && star2) {
          const pos1 = this.getScaledStarPosition(star1);
          const pos2 = this.getScaledStarPosition(star2);
          const y1 = pos1.y - viewY + canvasHeight / 2;
          const y2 = pos2.y - viewY + canvasHeight / 2;
          const progress = this.currentConnectionProgress;
          let partialX = pos1.x;
          let partialY = y1;
          if (shouldWrapLine(pos1.x, pos2.x)) {
            const dx = pos2.x - pos1.x;
            if (Math.abs(dx) > SKY_WIDTH / 2) {
              const adjustedX2 = dx > 0 ? pos2.x - SKY_WIDTH : pos2.x + SKY_WIDTH;
              partialX = pos1.x + (adjustedX2 - pos1.x) * progress;
              if (partialX < 0)
                partialX += SKY_WIDTH;
              if (partialX >= SKY_WIDTH)
                partialX -= SKY_WIDTH;
            }
          } else {
            partialX = pos1.x + (pos2.x - pos1.x) * progress;
          }
          partialY = y1 + (y2 - y1) * progress;
          drawWrappedLine(pos1.x, y1, partialX, partialY, viewX, canvasWidth, lineAlpha);
          const partialScreenX = partialX - viewX + canvasWidth / 2;
          this.drawSparkHead(ctx, partialScreenX, partialY);
        }
      }
    }
    for (let starIdx = 0;starIdx < this.data.stars.length; starIdx++) {
      const star = this.data.stars[starIdx];
      if (!star)
        continue;
      const pos = this.getScaledStarPosition(star);
      const screenX = pos.x - viewX + canvasWidth / 2;
      const screenY = pos.y - viewY + canvasHeight / 2;
      const activationTime = this.starActivationTimes.get(starIdx);
      const isActivated = activationTime !== undefined;
      let size = 3 + star.brightness * 3;
      let starAlpha = baseAlpha + cosmicFlashIntensity * 0.3;
      let flashProgress = 0;
      if (this.isAnimating && !isActivated) {
        const hintAlpha = 0.35;
        const hintSize = 3 + star.brightness * 2;
        const pulse = Math.sin(Date.now() * 0.005) * 0.3 + 0.7;
        ctx.beginPath();
        ctx.arc(screenX, screenY, hintSize * 3, 0, Math.PI * 2);
        const glowGradient = ctx.createRadialGradient(screenX, screenY, 0, screenX, screenY, hintSize * 3);
        glowGradient.addColorStop(0, `rgba(255, 217, 61, ${hintAlpha * pulse * 0.5})`);
        glowGradient.addColorStop(1, "rgba(255, 217, 61, 0)");
        ctx.fillStyle = glowGradient;
        ctx.fill();
        continue;
      }
      if (this.isAnimating && isActivated) {
        const timeSinceActivation = this.animationTime - activationTime;
        if (timeSinceActivation < this.starFlashDuration) {
          flashProgress = Math.sin(timeSinceActivation / this.starFlashDuration * Math.PI);
          size *= 1 + flashProgress * 0.4;
          starAlpha = Math.min(1, starAlpha + flashProgress * 0.3);
        }
      }
      this.renderCosmicStar(ctx, screenX, screenY, size, starAlpha, isActivated, flashProgress);
    }
    if (!this.isAnimating) {
      ctx.font = '16px "Cormorant Garamond", serif';
      ctx.fillStyle = `rgba(255, 220, 180, ${0.7 * opacityMultiplier})`;
      ctx.textAlign = "center";
      ctx.shadowColor = `rgba(255, 180, 80, ${0.5 * opacityMultiplier})`;
      ctx.shadowBlur = 10;
      ctx.fillText(this.data.name, centerScreenX, centerScreenY + this.data.radius + 35);
      ctx.shadowBlur = 0;
    }
  }
  drawGlowingLine(ctx, x1, y1, x2, y2, alpha) {
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.strokeStyle = `${this.colors.outerGlow}${alpha * 0.2})`;
    ctx.lineWidth = 12;
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.strokeStyle = `${this.colors.midAmber}${alpha * 0.4})`;
    ctx.lineWidth = 6;
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.strokeStyle = `${this.colors.innerGold}${alpha * 0.7})`;
    ctx.lineWidth = 3;
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.strokeStyle = `${this.colors.coreWhite}${alpha * 0.9})`;
    ctx.lineWidth = 1.5;
    ctx.stroke();
  }
  drawSparkHead(ctx, x, y) {
    const sparkSize = 10;
    const time = Date.now() * 0.01;
    const flicker = 0.85 + Math.sin(time) * 0.15;
    const outerGlow = ctx.createRadialGradient(x, y, 0, x, y, sparkSize * 2.5);
    outerGlow.addColorStop(0, `rgba(255, 160, 60, ${0.8 * flicker})`);
    outerGlow.addColorStop(0.5, `rgba(220, 100, 40, ${0.4 * flicker})`);
    outerGlow.addColorStop(1, "rgba(180, 80, 60, 0)");
    ctx.beginPath();
    ctx.arc(x, y, sparkSize * 2.5, 0, Math.PI * 2);
    ctx.fillStyle = outerGlow;
    ctx.fill();
    const coreGlow = ctx.createRadialGradient(x, y, 0, x, y, sparkSize);
    coreGlow.addColorStop(0, `rgba(255, 255, 250, ${flicker})`);
    coreGlow.addColorStop(0.4, `rgba(255, 230, 150, ${0.9 * flicker})`);
    coreGlow.addColorStop(0.7, `rgba(255, 180, 80, ${0.5 * flicker})`);
    coreGlow.addColorStop(1, "rgba(255, 140, 50, 0)");
    ctx.beginPath();
    ctx.arc(x, y, sparkSize, 0, Math.PI * 2);
    ctx.fillStyle = coreGlow;
    ctx.fill();
    ctx.beginPath();
    ctx.arc(x, y, sparkSize * 0.25, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, 255, 255, ${flicker})`;
    ctx.fill();
  }
  renderCosmicStar(ctx, x, y, size, alpha, isActivated, flashProgress) {
    const coronaMultiplier = isActivated ? 1 + flashProgress * 0.6 : 0.5;
    if (isActivated) {
      const outerRadius = size * 6 * coronaMultiplier;
      const outerHaze = ctx.createRadialGradient(x, y, size * 2, x, y, outerRadius);
      outerHaze.addColorStop(0, `${this.colors.outerGlow}${alpha * 0.15})`);
      outerHaze.addColorStop(0.6, `${this.colors.cosmicHaze}${alpha * 0.08})`);
      outerHaze.addColorStop(1, "rgba(180, 140, 100, 0)");
      ctx.beginPath();
      ctx.arc(x, y, outerRadius, 0, Math.PI * 2);
      ctx.fillStyle = outerHaze;
      ctx.fill();
    }
    const amberRadius = size * 4 * coronaMultiplier;
    const amberGlow = ctx.createRadialGradient(x, y, size, x, y, amberRadius);
    amberGlow.addColorStop(0, `${this.colors.midAmber}${alpha * 0.4})`);
    amberGlow.addColorStop(0.6, `${this.colors.outerGlow}${alpha * 0.2})`);
    amberGlow.addColorStop(1, "rgba(220, 160, 60, 0)");
    ctx.beginPath();
    ctx.arc(x, y, amberRadius, 0, Math.PI * 2);
    ctx.fillStyle = amberGlow;
    ctx.fill();
    const goldRadius = size * 2.5 * coronaMultiplier;
    const goldGlow = ctx.createRadialGradient(x, y, 0, x, y, goldRadius);
    goldGlow.addColorStop(0, `${this.colors.innerGold}${alpha * 0.7})`);
    goldGlow.addColorStop(0.5, `${this.colors.midAmber}${alpha * 0.4})`);
    goldGlow.addColorStop(1, "rgba(255, 190, 80, 0)");
    ctx.beginPath();
    ctx.arc(x, y, goldRadius, 0, Math.PI * 2);
    ctx.fillStyle = goldGlow;
    ctx.fill();
    ctx.beginPath();
    ctx.arc(x, y, size * 0.8, 0, Math.PI * 2);
    ctx.fillStyle = `${this.colors.coreWhite}${Math.min(1, alpha * 1.1)})`;
    ctx.fill();
  }
}

// src/game/Nebula.ts
class Nebula {
  id;
  name;
  x;
  y;
  radius;
  isDiscovered = false;
  discoveryProgress = 0;
  data;
  hoverTime = 0;
  hoverTimeRequired = 2;
  isAnimating = false;
  animationTime = 0;
  animationDuration = 4;
  bloomProgress = 0;
  onAnimationComplete = null;
  timeOffset;
  constructor(data) {
    this.data = data;
    this.id = data.id;
    this.name = data.name;
    this.x = data.x;
    this.y = data.y;
    this.radius = Math.max(data.width, data.height) * 1;
    this.timeOffset = Math.random() * 1000;
  }
  getData() {
    return this.data;
  }
  containsPoint(x, y) {
    const dx = x - this.x;
    const dy = y - this.y;
    return dx * dx + dy * dy < this.radius * this.radius;
  }
  update(dt, _isInView) {
    if (this.isAnimating) {
      this.animationTime += dt;
      this.bloomProgress = Math.min(1, this.animationTime / this.animationDuration);
      if (this.animationTime >= this.animationDuration) {
        this.isAnimating = false;
        this.bloomProgress = 1;
        if (this.onAnimationComplete) {
          this.onAnimationComplete();
          this.onAnimationComplete = null;
        }
      }
    } else if (this.isDiscovered) {
      this.bloomProgress = 1;
    }
  }
  addHoverTime(dt) {
    if (this.isDiscovered || this.isAnimating)
      return false;
    this.hoverTime += dt;
    this.discoveryProgress = Math.min(1, this.hoverTime / this.hoverTimeRequired);
    if (this.hoverTime >= this.hoverTimeRequired) {
      this.discover();
      return true;
    }
    return false;
  }
  resetHoverTime() {
    this.hoverTime = 0;
    this.discoveryProgress = 0;
  }
  discover() {
    this.isDiscovered = true;
    this.isAnimating = true;
    this.animationTime = 0;
    this.bloomProgress = 0;
  }
  setOnAnimationComplete(callback) {
    this.onAnimationComplete = callback;
  }
  render(ctx, viewX, viewY, canvasWidth, canvasHeight, scale = 1, glowMultiplier = 1) {
    const screenX = this.x - viewX + canvasWidth / 2;
    const screenY = this.y - viewY + canvasHeight / 2;
    const visualRadius = this.radius * scale * 1.5;
    if (screenX + visualRadius < 0 || screenX - visualRadius > canvasWidth || screenY + visualRadius < 0 || screenY - visualRadius > canvasHeight) {
      return;
    }
    let globalAlpha = 0;
    if (this.isDiscovered) {
      globalAlpha = this.bloomProgress;
    } else {
      globalAlpha = 0.1 + this.discoveryProgress * 0.3;
    }
    if (globalAlpha <= 0.01)
      return;
    ctx.save();
    ctx.translate(this.x - viewX + canvasWidth / 2, this.y - viewY + canvasHeight / 2);
    ctx.scale(scale, scale);
    if (this.data.rotation)
      ctx.rotate(this.data.rotation);
    const time = Date.now() / 1000 + this.timeOffset;
    const breathScale = 1 + Math.sin(time * 0.5) * 0.03;
    ctx.scale(breathScale, breathScale);
    if (this.data.layers) {
      for (const layer of this.data.layers) {
        ctx.globalCompositeOperation = layer.blendMode || "screen";
        this.drawLayer(ctx, layer, globalAlpha, time, glowMultiplier);
      }
    } else {}
    if (this.isDiscovered && !this.isAnimating) {
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      const screenX2 = this.x - viewX + canvasWidth / 2;
      const screenY2 = this.y - viewY + canvasHeight / 2;
      ctx.globalCompositeOperation = "source-over";
      ctx.globalAlpha = 1;
      ctx.font = '16px "Cormorant Garamond", serif';
      ctx.fillStyle = `rgba(220, 200, 255, 0.7)`;
      ctx.textAlign = "center";
      ctx.fillText(this.name, screenX2, screenY2 + this.radius * 0.8 + 20);
    }
    ctx.restore();
  }
  drawLayer(ctx, layer, globalAlpha, time, glowMultiplier = 1) {
    const layerAlpha = layer.opacity * globalAlpha * glowMultiplier;
    if (layerAlpha <= 0)
      return;
    ctx.save();
    const layerSeed = layer.offsetX * 13 + layer.offsetY * 17;
    const wanderX = Math.sin(time * 0.3 + layerSeed) * 5;
    const wanderY = Math.cos(time * 0.4 + layerSeed) * 5;
    ctx.translate(layer.offsetX + wanderX, layer.offsetY + wanderY);
    if (layer.rotation)
      ctx.rotate(layer.rotation);
    const grad = ctx.createRadialGradient(0, 0, 0, 0, 0, Math.max(layer.width, layer.height) / 2);
    grad.addColorStop(0, layer.color);
    grad.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = grad;
    ctx.globalAlpha = layerAlpha;
    ctx.beginPath();
    if (layer.shape === "ellipse") {
      ctx.ellipse(0, 0, layer.width / 2, layer.height / 2, 0, 0, Math.PI * 2);
    } else if (layer.shape === "streak") {
      ctx.ellipse(0, 0, layer.width / 2, layer.height / 6, 0, 0, Math.PI * 2);
    } else {
      ctx.ellipse(0, 0, layer.width / 2, layer.height / 2, 0, 0, Math.PI * 2);
    }
    ctx.fill();
    ctx.restore();
  }
}

// src/game/StarCluster.ts
class StarCluster {
  id;
  name;
  x;
  y;
  radius;
  isDiscovered = false;
  discoveryProgress = 0;
  data;
  stars = [];
  hoverTime = 0;
  hoverTimeRequired = 2;
  isAnimating = false;
  animationTime = 0;
  animationDuration = 2.5;
  onAnimationComplete = null;
  constructor(data) {
    this.data = data;
    this.id = data.id;
    this.name = data.name;
    this.x = data.x;
    this.y = data.y;
    this.radius = data.radius;
    this.generateStars();
  }
  getData() {
    return this.data;
  }
  generateStars() {
    for (let i = 0;i < this.data.starCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const r = Math.pow(Math.random(), 0.5) * this.data.radius;
      this.stars.push({
        x: Math.cos(angle) * r,
        y: Math.sin(angle) * r,
        size: Math.random() * 1.5 + 0.5,
        brightness: Math.random() * 0.5 + 0.5
      });
    }
  }
  containsPoint(x, y) {
    const dx = x - this.x;
    const dy = y - this.y;
    return dx * dx + dy * dy < this.radius * this.radius;
  }
  addHoverTime(dt) {
    if (this.isDiscovered || this.isAnimating)
      return false;
    this.hoverTime += dt;
    this.discoveryProgress = Math.min(1, this.hoverTime / this.hoverTimeRequired);
    if (this.hoverTime >= this.hoverTimeRequired) {
      this.discover();
      return true;
    }
    return false;
  }
  resetHoverTime() {
    this.hoverTime = 0;
    this.discoveryProgress = 0;
  }
  discover() {
    this.isDiscovered = true;
    this.isAnimating = true;
    this.animationTime = 0;
    const spread = this.animationDuration * 0.7;
    for (const star of this.stars) {
      star.activationTime = Math.random() * spread;
    }
  }
  setOnAnimationComplete(callback) {
    this.onAnimationComplete = callback;
  }
  update(dt, _isInView) {
    if (this.isAnimating) {
      this.animationTime += dt;
      if (this.animationTime >= this.animationDuration) {
        this.isAnimating = false;
        if (this.onAnimationComplete) {
          this.onAnimationComplete();
          this.onAnimationComplete = null;
        }
      }
    }
  }
  render(ctx, viewX, viewY, canvasWidth, canvasHeight, scale = 1, glowMultiplier = 1) {
    const centerX = this.x - viewX + canvasWidth / 2;
    const centerY = this.y - viewY + canvasHeight / 2;
    const visualRadius = this.radius * scale * 1.5;
    if (centerX + visualRadius < 0 || centerX - visualRadius > canvasWidth || centerY + visualRadius < 0 || centerY - visualRadius > canvasHeight) {
      return;
    }
    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.scale(scale, scale);
    ctx.translate(-centerX, -centerY);
    if (!this.isDiscovered && this.discoveryProgress > 0) {
      ctx.save();
      const hintAlpha = this.discoveryProgress * 0.3;
      const pulse = 1 + Math.sin(Date.now() * 0.005) * 0.1;
      const grad = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, this.radius * 1.5);
      grad.addColorStop(0, `rgba(200, 220, 255, ${hintAlpha * pulse})`);
      grad.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(centerX, centerY, this.radius * 1.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
    if (this.isDiscovered) {
      const alpha = this.isAnimating ? Math.min(1, this.animationTime / 1) : 1;
      if (alpha > 0) {
        ctx.save();
        ctx.globalAlpha = alpha * glowMultiplier;
        ctx.globalCompositeOperation = "screen";
        for (const star of this.stars) {
          if (star.brightness < 0.6)
            continue;
          const sx = centerX + star.x;
          const sy = centerY + star.y;
          const color = this.data.color || "#A0C0FF";
          const grad = ctx.createRadialGradient(sx, sy, 0, sx, sy, star.size * 30);
          grad.addColorStop(0, color + "22");
          grad.addColorStop(1, "#00000000");
          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.arc(sx, sy, star.size * 30, 0, Math.PI * 2);
          ctx.fill();
          ctx.save();
          ctx.translate(sx, sy);
          ctx.rotate(star.x * 0.01 + star.y * 0.01);
          const wispGrad = ctx.createLinearGradient(-20, 0, 20, 0);
          wispGrad.addColorStop(0, "#00000000");
          wispGrad.addColorStop(0.5, color + "11");
          wispGrad.addColorStop(1, "#00000000");
          ctx.fillStyle = wispGrad;
          ctx.fillRect(-20, -10, 40, 20);
          ctx.restore();
        }
        ctx.restore();
      }
      for (const star of this.stars) {
        let starAlpha = 0;
        let starSize = star.size;
        if (this.isAnimating && star.activationTime !== undefined) {
          if (this.animationTime < star.activationTime)
            continue;
          const timeSinceActive = this.animationTime - star.activationTime;
          if (timeSinceActive < 0.3) {
            const pop = Math.sin(timeSinceActive / 0.3 * Math.PI);
            starSize = star.size * (1 + pop * 2);
            starAlpha = 1;
          } else {
            starAlpha = star.brightness;
          }
        } else {
          starAlpha = star.brightness;
        }
        const sx = centerX + star.x;
        const sy = centerY + star.y;
        ctx.beginPath();
        ctx.arc(sx, sy, starSize, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${starAlpha})`;
        ctx.fill();
        if (starAlpha > 0.5) {
          ctx.beginPath();
          ctx.arc(sx, sy, starSize * 3, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(160, 200, 255, ${starAlpha * 0.3})`;
          ctx.fill();
        }
      }
      if (!this.isAnimating) {
        ctx.font = '14px "Cormorant Garamond", serif';
        ctx.fillStyle = `rgba(200, 220, 255, 0.7)`;
        ctx.textAlign = "center";
        ctx.fillText(this.name, centerX, centerY + this.radius + 25);
      }
    }
    ctx.restore();
  }
}

// src/game/Galaxy.ts
class Galaxy {
  id;
  name;
  x;
  y;
  radius;
  isDiscovered = false;
  discoveryProgress = 0;
  data;
  hoverTime = 0;
  hoverTimeRequired = 2;
  isAnimating = false;
  animationTime = 0;
  animationDuration = 5;
  bloomProgress = 0;
  onAnimationComplete = null;
  timeOffset;
  rotationSpeed;
  constructor(data) {
    this.data = data;
    this.id = data.id;
    this.name = data.name;
    this.x = data.x;
    this.y = data.y;
    this.radius = Math.max(data.width, data.height) * 1;
    this.timeOffset = Math.random() * 1000;
    this.rotationSpeed = data.galaxyType === "spiral" ? 0.00005 : 0;
  }
  getData() {
    return this.data;
  }
  containsPoint(x, y) {
    const dx = x - this.x;
    const dy = y - this.y;
    return dx * dx + dy * dy < this.radius * this.radius;
  }
  update(dt, _isInView) {
    if (this.isAnimating) {
      this.animationTime += dt;
      this.bloomProgress = Math.min(1, this.animationTime / this.animationDuration);
      if (this.animationTime >= this.animationDuration) {
        this.isAnimating = false;
        this.bloomProgress = 1;
        if (this.onAnimationComplete) {
          this.onAnimationComplete();
          this.onAnimationComplete = null;
        }
      }
    } else if (this.isDiscovered) {
      this.bloomProgress = 1;
    }
  }
  addHoverTime(dt) {
    if (this.isDiscovered || this.isAnimating)
      return false;
    this.hoverTime += dt;
    this.discoveryProgress = Math.min(1, this.hoverTime / this.hoverTimeRequired);
    if (this.hoverTime >= this.hoverTimeRequired) {
      this.discover();
      return true;
    }
    return false;
  }
  resetHoverTime() {
    this.hoverTime = 0;
    this.discoveryProgress = 0;
  }
  discover() {
    this.isDiscovered = true;
    this.isAnimating = true;
    this.animationTime = 0;
    this.bloomProgress = 0;
  }
  setOnAnimationComplete(callback) {
    this.onAnimationComplete = callback;
  }
  render(ctx, viewX, viewY, canvasWidth, canvasHeight, scale = 1, glowMultiplier = 1) {
    const screenX = this.x - viewX + canvasWidth / 2;
    const screenY = this.y - viewY + canvasHeight / 2;
    const visualRadius = this.radius * scale * 1.5;
    if (screenX + visualRadius < 0 || screenX - visualRadius > canvasWidth || screenY + visualRadius < 0 || screenY - visualRadius > canvasHeight) {
      return;
    }
    let globalAlpha = 0;
    if (this.isDiscovered) {
      globalAlpha = this.bloomProgress;
    } else {
      globalAlpha = 0.05 + this.discoveryProgress * 0.25;
    }
    if (globalAlpha <= 0.01)
      return;
    ctx.save();
    ctx.translate(this.x - viewX + canvasWidth / 2, this.y - viewY + canvasHeight / 2);
    ctx.scale(scale, scale);
    if (this.data.rotation)
      ctx.rotate(this.data.rotation);
    if (this.rotationSpeed > 0) {
      const time2 = Date.now() / 1000 + this.timeOffset;
      ctx.rotate(time2 * this.rotationSpeed);
    }
    const time = Date.now() / 1000 + this.timeOffset;
    const breathScale = 1 + Math.sin(time * 0.3) * 0.02;
    ctx.scale(breathScale, breathScale);
    if (this.data.layers) {
      for (const layer of this.data.layers) {
        ctx.globalCompositeOperation = layer.blendMode || "screen";
        this.drawLayer(ctx, layer, globalAlpha, time, glowMultiplier);
      }
    }
    if (this.isDiscovered && !this.isAnimating) {
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      const screenX2 = this.x - viewX + canvasWidth / 2;
      const screenY2 = this.y - viewY + canvasHeight / 2;
      ctx.globalCompositeOperation = "source-over";
      ctx.globalAlpha = 1;
      ctx.font = '15px "Cormorant Garamond", serif';
      ctx.fillStyle = `rgba(200, 210, 230, 0.75)`;
      ctx.textAlign = "center";
      ctx.fillText(this.name, screenX2, screenY2 + this.radius * 0.8 + 22);
    }
    ctx.restore();
  }
  drawLayer(ctx, layer, globalAlpha, time, glowMultiplier = 1) {
    const layerAlpha = layer.opacity * globalAlpha * glowMultiplier;
    if (layerAlpha <= 0)
      return;
    ctx.save();
    const layerSeed = layer.offsetX * 13 + layer.offsetY * 17;
    const wanderX = Math.sin(time * 0.2 + layerSeed) * 3;
    const wanderY = Math.cos(time * 0.25 + layerSeed) * 3;
    ctx.translate(layer.offsetX + wanderX, layer.offsetY + wanderY);
    if (layer.rotation)
      ctx.rotate(layer.rotation);
    const grad = ctx.createRadialGradient(0, 0, 0, 0, 0, Math.max(layer.width, layer.height) / 2);
    grad.addColorStop(0, layer.color);
    grad.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = grad;
    ctx.globalAlpha = layerAlpha;
    ctx.beginPath();
    if (layer.shape === "ellipse") {
      ctx.ellipse(0, 0, layer.width / 2, layer.height / 2, 0, 0, Math.PI * 2);
    } else if (layer.shape === "streak") {
      ctx.ellipse(0, 0, layer.width / 2, layer.height / 6, 0, 0, Math.PI * 2);
    } else {
      ctx.ellipse(0, 0, layer.width / 2, layer.height / 2, 0, 0, Math.PI * 2);
    }
    ctx.fill();
    ctx.restore();
  }
}

// src/data/sets.ts
var CONSTELLATION_SETS = {
  zodiac: {
    id: "zodiac",
    name: "The Zodiac",
    description: "The twelve constellations lying along the plane of the ecliptic.",
    upgradeId: "wide_angle",
    upgradeName: "Wide Angle Lens",
    upgradeDescription: "Increases the viewport field of view by 15%."
  },
  ursa: {
    id: "ursa",
    name: "The Great Bears",
    description: "The guardians of the North Pole.",
    upgradeId: "stabilizer",
    upgradeName: "Gyroscopic Stabilizer",
    upgradeDescription: "Significantly reduces telescope drift and lag."
  },
  royal: {
    id: "royal",
    name: "The Royal Family",
    description: "The saga of Andromeda, bringing together Queen, King, and Hero."
  },
  orion: {
    id: "orion",
    name: "The Hunter's Circle",
    description: "Bright constellations surrounding the mighty Orion."
  },
  waters: {
    id: "waters",
    name: "The Heavenly Waters",
    description: "Creatures of the celestial ocean."
  },
  argo: {
    id: "argo",
    name: "Argo Navis",
    description: "The great ship of Jason and the Argonauts, now split into three parts.",
    upgradeId: "wide_angle",
    upgradeName: "Wide Angle Lens",
    upgradeDescription: "Increases the viewport field of view by 15%."
  },
  birds: {
    id: "birds",
    name: "The Southern Birds",
    description: "Exotic birds of the southern skies, introduced by explorers."
  },
  instruments: {
    id: "instruments",
    name: "La Caille's Instruments",
    description: "Scientific tools and instruments comprising the modern constellations.",
    upgradeId: "stabilizer",
    upgradeName: "Gyroscopic Stabilizer",
    upgradeDescription: "Significantly improves stability and reduces drift."
  },
  centaur: {
    id: "centaur",
    name: "The Centaur's Family",
    description: "Dominant constellations of the southern Milky Way."
  }
};

// src/data/nebulae.ts
var NEBULAE = [
  {
    id: "orion_nebula",
    name: "Orion Nebula (M42)",
    x: 1380,
    y: 1510,
    width: 64,
    height: 56,
    rotation: Math.PI / 12,
    observatory: "northern",
    layers: [
      { offsetX: 32, offsetY: -3, width: 150, height: 135, color: "#3d1a28", opacity: 0.09, shape: "cloud", blendMode: "screen" },
      { offsetX: 30, offsetY: -2, width: 130, height: 120, color: "#4a2233", opacity: 0.12, shape: "cloud", blendMode: "screen" },
      { offsetX: -22, offsetY: -20, width: 75, height: 60, rotation: -0.3, color: "#773355", opacity: 0.16, shape: "cloud", blendMode: "screen" },
      { offsetX: -18, offsetY: -24, width: 60, height: 52, rotation: -0.25, color: "#884466", opacity: 0.18, shape: "cloud", blendMode: "screen" },
      { offsetX: -12, offsetY: -28, width: 48, height: 45, rotation: -0.2, color: "#994477", opacity: 0.19, shape: "cloud", blendMode: "screen" },
      { offsetX: -15, offsetY: -22, width: 42, height: 38, rotation: -0.18, color: "#aa5588", opacity: 0.21, shape: "cloud", blendMode: "screen" },
      { offsetX: 35, offsetY: -18, width: 72, height: 58, rotation: 0.25, color: "#663344", opacity: 0.17, shape: "cloud", blendMode: "screen" },
      { offsetX: 42, offsetY: -14, width: 62, height: 50, rotation: 0.22, color: "#773355", opacity: 0.19, shape: "cloud", blendMode: "screen" },
      { offsetX: 48, offsetY: -10, width: 52, height: 44, rotation: 0.2, color: "#884466", opacity: 0.2, shape: "cloud", blendMode: "screen" },
      { offsetX: 40, offsetY: -12, width: 45, height: 40, rotation: 0.18, color: "#994477", opacity: 0.22, shape: "cloud", blendMode: "screen" },
      { offsetX: 28, offsetY: 18, width: 65, height: 52, rotation: 0.12, color: "#884466", opacity: 0.18, shape: "cloud", blendMode: "screen" },
      { offsetX: 32, offsetY: 22, width: 55, height: 45, rotation: 0.1, color: "#994477", opacity: 0.2, shape: "cloud", blendMode: "screen" },
      { offsetX: 18, offsetY: 2, width: 85, height: 72, color: "#884466", opacity: 0.2, shape: "cloud", blendMode: "screen" },
      { offsetX: 20, offsetY: 0, width: 72, height: 62, color: "#994477", opacity: 0.22, shape: "cloud", blendMode: "screen" },
      { offsetX: 22, offsetY: -2, width: 62, height: 54, color: "#aa5577", opacity: 0.24, shape: "cloud", blendMode: "screen" },
      { offsetX: 24, offsetY: -4, width: 52, height: 46, color: "#bb6688", opacity: 0.26, shape: "cloud", blendMode: "screen" },
      { offsetX: 25, offsetY: -5, width: 44, height: 40, color: "#cc7799", opacity: 0.28, shape: "cloud", blendMode: "screen" },
      { offsetX: 26, offsetY: -6, width: 36, height: 34, color: "#dd88aa", opacity: 0.3, shape: "cloud", blendMode: "screen" },
      { offsetX: 10, offsetY: 8, width: 38, height: 32, rotation: -0.22, color: "#668877", opacity: 0.17, shape: "cloud", blendMode: "screen" },
      { offsetX: 36, offsetY: 6, width: 35, height: 30, rotation: 0.2, color: "#779988", opacity: 0.16, shape: "cloud", blendMode: "screen" },
      { offsetX: 22, offsetY: -8, width: 30, height: 26, rotation: 0.1, color: "#88aa99", opacity: 0.15, shape: "cloud", blendMode: "screen" },
      { offsetX: 24, offsetY: -8, width: 7, height: 7, color: "#ddeeff", opacity: 0.72, shape: "ellipse", blendMode: "screen" },
      { offsetX: 24, offsetY: -8, width: 4, height: 4, color: "#ffffff", opacity: 0.86, shape: "ellipse", blendMode: "screen" },
      { offsetX: 28, offsetY: -7, width: 6, height: 6, color: "#ddeeff", opacity: 0.7, shape: "ellipse", blendMode: "screen" },
      { offsetX: 28, offsetY: -7, width: 3, height: 3, color: "#ffffff", opacity: 0.84, shape: "ellipse", blendMode: "screen" },
      { offsetX: 25, offsetY: -4, width: 8, height: 8, color: "#ddeeff", opacity: 0.74, shape: "ellipse", blendMode: "screen" },
      { offsetX: 25, offsetY: -4, width: 4, height: 4, color: "#ffffff", opacity: 0.88, shape: "ellipse", blendMode: "screen" },
      { offsetX: 28, offsetY: -3, width: 9, height: 9, color: "#eef4ff", opacity: 0.77, shape: "ellipse", blendMode: "screen" },
      { offsetX: 28, offsetY: -3, width: 5, height: 5, color: "#ffffff", opacity: 0.92, shape: "ellipse", blendMode: "screen" },
      { offsetX: 26, offsetY: -5, width: 22, height: 20, color: "#cce4ff", opacity: 0.48, shape: "ellipse", blendMode: "screen" },
      { offsetX: 26, offsetY: -5, width: 14, height: 13, color: "#ddeeff", opacity: 0.58, shape: "ellipse", blendMode: "screen" },
      { offsetX: 18, offsetY: -22, width: 58, height: 38, rotation: 0.32, color: "#0a0508", opacity: 0.88, shape: "cloud", blendMode: "source-over" },
      { offsetX: 15, offsetY: -24, width: 46, height: 30, rotation: 0.35, color: "#050305", opacity: 0.95, shape: "cloud", blendMode: "source-over" },
      { offsetX: 13, offsetY: -26, width: 36, height: 24, rotation: 0.38, color: "#000000", opacity: 1, shape: "cloud", blendMode: "source-over" },
      { offsetX: 20, offsetY: -18, width: 32, height: 22, rotation: 0.25, color: "#0f0a0f", opacity: 0.75, shape: "cloud", blendMode: "source-over" },
      { offsetX: 32, offsetY: -16, width: 28, height: 20, rotation: -0.22, color: "#140a14", opacity: 0.7, shape: "cloud", blendMode: "source-over" },
      { offsetX: 8, offsetY: -42, width: 42, height: 38, color: "#884466", opacity: 0.23, shape: "cloud", blendMode: "screen" },
      { offsetX: 8, offsetY: -42, width: 34, height: 32, color: "#994477", opacity: 0.27, shape: "cloud", blendMode: "screen" },
      { offsetX: 8, offsetY: -42, width: 26, height: 25, color: "#aa5588", opacity: 0.31, shape: "ellipse", blendMode: "screen" },
      { offsetX: 8, offsetY: -42, width: 17, height: 16, color: "#bb6699", opacity: 0.37, shape: "ellipse", blendMode: "screen" },
      { offsetX: 8, offsetY: -42, width: 10, height: 9, color: "#cc7799", opacity: 0.46, shape: "ellipse", blendMode: "screen" },
      { offsetX: 8, offsetY: -42, width: 6, height: 5, color: "#ddaacc", opacity: 0.56, shape: "ellipse", blendMode: "screen" },
      { offsetX: 6, offsetY: -36, width: 20, height: 16, rotation: -0.5, color: "#663344", opacity: 0.19, shape: "streak", blendMode: "screen" },
      { offsetX: 14, offsetY: -32, width: 32, height: 14, rotation: 0.12, color: "#0a0508", opacity: 0.68, shape: "streak", blendMode: "source-over" },
      { offsetX: 16, offsetY: 24, width: 44, height: 13, rotation: -0.16, color: "#773355", opacity: 0.15, shape: "streak", blendMode: "screen" },
      { offsetX: 38, offsetY: 26, width: 42, height: 12, rotation: 0.18, color: "#664444", opacity: 0.14, shape: "streak", blendMode: "screen" },
      { offsetX: 8, offsetY: -20, width: 36, height: 11, rotation: -0.28, color: "#884466", opacity: 0.14, shape: "streak", blendMode: "screen" },
      { offsetX: 42, offsetY: -14, width: 34, height: 10, rotation: 0.26, color: "#775544", opacity: 0.13, shape: "streak", blendMode: "screen" },
      { offsetX: -10, offsetY: -18, width: 30, height: 24, rotation: -0.2, color: "#bb7788", opacity: 0.18, shape: "cloud", blendMode: "screen" },
      { offsetX: 50, offsetY: -8, width: 32, height: 26, rotation: 0.22, color: "#aa6677", opacity: 0.17, shape: "cloud", blendMode: "screen" }
    ],
    features: [
      { description: "Contains dark dust lanes forming a 'Fish Mouth' shape", isPresent: true, category: "structure" },
      { description: "Has a bright central star cluster (Trapezium)", isPresent: true, category: "component" },
      { description: "Shows a companion nebula (M43)", isPresent: true, category: "component" },
      { description: "Displays greenish OIII emission regions", isPresent: true, category: "color" },
      { description: "Has a ring or shell structure", isPresent: false, category: "structure" },
      { description: "Shows dark pillar structures", isPresent: false, category: "structure" }
    ]
  },
  {
    id: "ring_nebula",
    name: "Ring Nebula (M57)",
    x: 3850,
    y: 1200,
    width: 32,
    height: 32,
    rotation: Math.PI / 18,
    observatory: "northern",
    layers: [
      { offsetX: 0, offsetY: 0, width: 76, height: 74, color: "#5a3344", opacity: 0.1, shape: "cloud", blendMode: "screen" },
      { offsetX: 0, offsetY: 0, width: 68, height: 66, color: "#6b4455", opacity: 0.13, shape: "ellipse", blendMode: "screen" },
      { offsetX: 0, offsetY: 0, width: 60, height: 58, color: "#995555", opacity: 0.24, shape: "ellipse", blendMode: "screen" },
      { offsetX: 0, offsetY: 0, width: 54, height: 52, color: "#aa6666", opacity: 0.26, shape: "ellipse", blendMode: "screen" },
      { offsetX: 0, offsetY: 0, width: 50, height: 48, color: "#bb7777", opacity: 0.22, shape: "ellipse", blendMode: "screen" },
      { offsetX: 0, offsetY: 0, width: 46, height: 44, color: "#889988", opacity: 0.28, shape: "ellipse", blendMode: "screen" },
      { offsetX: 0, offsetY: 0, width: 44, height: 42, color: "#99aa99", opacity: 0.24, shape: "ellipse", blendMode: "screen" },
      { offsetX: 0, offsetY: 0, width: 40, height: 38, color: "#5a9999", opacity: 0.32, shape: "ellipse", blendMode: "screen" },
      { offsetX: 0, offsetY: 0, width: 38, height: 36, color: "#6baaaa", opacity: 0.35, shape: "ellipse", blendMode: "screen" },
      { offsetX: 0, offsetY: 0, width: 36, height: 34, color: "#7cbbbb", opacity: 0.3, shape: "ellipse", blendMode: "screen" },
      { offsetX: 0, offsetY: 0, width: 34, height: 32, color: "#8dcccc", opacity: 0.38, shape: "ellipse", blendMode: "screen" },
      { offsetX: 0, offsetY: 0, width: 24, height: 22, color: "#0a0a14", opacity: 0.65, shape: "ellipse", blendMode: "source-over" },
      { offsetX: 0, offsetY: 0, width: 20, height: 18, color: "#050508", opacity: 0.75, shape: "ellipse", blendMode: "source-over" },
      { offsetX: 0, offsetY: 0, width: 7, height: 7, color: "#d4d4bb", opacity: 0.62, shape: "ellipse", blendMode: "screen" },
      { offsetX: 0, offsetY: 0, width: 4, height: 4, color: "#e4e4cc", opacity: 0.72, shape: "ellipse", blendMode: "screen" },
      { offsetX: 0, offsetY: 0, width: 2, height: 2, color: "#ffffff", opacity: 0.85, shape: "ellipse", blendMode: "screen" },
      { offsetX: 13, offsetY: -9, width: 15, height: 13, rotation: 0.35, color: "#7aaa99", opacity: 0.26, shape: "cloud", blendMode: "screen" },
      { offsetX: -15, offsetY: 11, width: 17, height: 15, rotation: -0.52, color: "#6b9988", opacity: 0.24, shape: "cloud", blendMode: "screen" },
      { offsetX: 9, offsetY: 13, width: 14, height: 12, rotation: 0.8, color: "#8bbb99", opacity: 0.22, shape: "cloud", blendMode: "screen" },
      { offsetX: -11, offsetY: -12, width: 16, height: 14, rotation: -0.7, color: "#7caa88", opacity: 0.25, shape: "cloud", blendMode: "screen" },
      { offsetX: -10, offsetY: 0, width: 11, height: 10, rotation: 0.2, color: "#9dccbb", opacity: 0.28, shape: "cloud", blendMode: "screen" },
      { offsetX: 10, offsetY: -1, width: 12, height: 11, rotation: -0.3, color: "#8dbbaa", opacity: 0.27, shape: "cloud", blendMode: "screen" }
    ],
    features: [
      { description: "Has a ring or shell structure", isPresent: true, category: "structure" },
      { description: "Shows a central white dwarf star", isPresent: true, category: "component" },
      { description: "Displays blue-green OIII emission in the inner ring", isPresent: true, category: "color" },
      { description: "Shows a red outer shell from H-alpha emission", isPresent: true, category: "color" },
      { description: "Contains dark pillar structures", isPresent: false, category: "structure" },
      { description: "Has a central pulsar", isPresent: false, category: "component" }
    ]
  },
  {
    id: "crab_nebula",
    name: "Crab Nebula (M1)",
    x: 1250,
    y: 1280,
    width: 44,
    height: 36,
    rotation: Math.PI / 7,
    observatory: "northern",
    layers: [
      { offsetX: 0, offsetY: 0, width: 92, height: 76, color: "#5a3322", opacity: 0.11, shape: "cloud", blendMode: "screen" },
      { offsetX: 0, offsetY: 0, width: 82, height: 68, color: "#6b4433", opacity: 0.14, shape: "cloud", blendMode: "screen" },
      { offsetX: 0, offsetY: 0, width: 72, height: 60, color: "#7a4433", opacity: 0.18, shape: "cloud", blendMode: "screen" },
      { offsetX: -4, offsetY: 2, width: 64, height: 54, color: "#8b5544", opacity: 0.2, shape: "cloud", blendMode: "screen" },
      { offsetX: -18, offsetY: -14, width: 52, height: 15, rotation: 0.55, color: "#aa5533", opacity: 0.26, shape: "streak", blendMode: "screen" },
      { offsetX: -16, offsetY: -12, width: 46, height: 13, rotation: 0.6, color: "#bb6644", opacity: 0.28, shape: "streak", blendMode: "screen" },
      { offsetX: -14, offsetY: -10, width: 40, height: 11, rotation: 0.65, color: "#cc7755", opacity: 0.24, shape: "streak", blendMode: "screen" },
      { offsetX: 22, offsetY: -10, width: 48, height: 14, rotation: -0.38, color: "#995533", opacity: 0.24, shape: "streak", blendMode: "screen" },
      { offsetX: 20, offsetY: -8, width: 42, height: 12, rotation: -0.42, color: "#aa6644", opacity: 0.26, shape: "streak", blendMode: "screen" },
      { offsetX: 18, offsetY: -6, width: 36, height: 10, rotation: -0.46, color: "#bb7755", opacity: 0.22, shape: "streak", blendMode: "screen" },
      { offsetX: -14, offsetY: 18, width: 44, height: 13, rotation: -0.75, color: "#b85533", opacity: 0.23, shape: "streak", blendMode: "screen" },
      { offsetX: -12, offsetY: 16, width: 38, height: 11, rotation: -0.8, color: "#c96644", opacity: 0.25, shape: "streak", blendMode: "screen" },
      { offsetX: -10, offsetY: 14, width: 32, height: 9, rotation: -0.85, color: "#da7755", opacity: 0.21, shape: "streak", blendMode: "screen" },
      { offsetX: 16, offsetY: 20, width: 42, height: 14, rotation: 0.88, color: "#8b4433", opacity: 0.25, shape: "streak", blendMode: "screen" },
      { offsetX: 14, offsetY: 18, width: 36, height: 12, rotation: 0.92, color: "#9c5544", opacity: 0.27, shape: "streak", blendMode: "screen" },
      { offsetX: 12, offsetY: 16, width: 30, height: 10, rotation: 0.96, color: "#ad6655", opacity: 0.23, shape: "streak", blendMode: "screen" },
      { offsetX: -8, offsetY: -8, width: 34, height: 11, rotation: 0.18, color: "#cc7755", opacity: 0.2, shape: "streak", blendMode: "screen" },
      { offsetX: 10, offsetY: -4, width: 32, height: 10, rotation: -0.25, color: "#bb6644", opacity: 0.22, shape: "streak", blendMode: "screen" },
      { offsetX: -6, offsetY: 8, width: 30, height: 9, rotation: 1.05, color: "#aa5533", opacity: 0.21, shape: "streak", blendMode: "screen" },
      { offsetX: 8, offsetY: 6, width: 28, height: 9, rotation: -1.1, color: "#995544", opacity: 0.19, shape: "streak", blendMode: "screen" },
      { offsetX: 0, offsetY: -12, width: 24, height: 7, rotation: 0, color: "#dd8866", opacity: 0.18, shape: "streak", blendMode: "screen" },
      { offsetX: -10, offsetY: 0, width: 22, height: 7, rotation: 0.5, color: "#cc7755", opacity: 0.17, shape: "streak", blendMode: "screen" },
      { offsetX: 10, offsetY: 10, width: 20, height: 6, rotation: -0.6, color: "#bb6644", opacity: 0.16, shape: "streak", blendMode: "screen" },
      { offsetX: 0, offsetY: 0, width: 28, height: 24, color: "#d4aa77", opacity: 0.32, shape: "cloud", blendMode: "screen" },
      { offsetX: 0, offsetY: 0, width: 20, height: 18, color: "#e4bb88", opacity: 0.38, shape: "cloud", blendMode: "screen" },
      { offsetX: 0, offsetY: 0, width: 14, height: 12, color: "#f4cc99", opacity: 0.46, shape: "ellipse", blendMode: "screen" },
      { offsetX: 0, offsetY: 0, width: 6, height: 5, color: "#ffddaa", opacity: 0.68, shape: "ellipse", blendMode: "screen" },
      { offsetX: 0, offsetY: 0, width: 3, height: 2, color: "#ffffff", opacity: 0.82, shape: "ellipse", blendMode: "screen" },
      { offsetX: -20, offsetY: -10, width: 12, height: 10, rotation: 0.4, color: "#ee9977", opacity: 0.28, shape: "cloud", blendMode: "screen" },
      { offsetX: 18, offsetY: 12, width: 11, height: 9, rotation: -0.5, color: "#dd8866", opacity: 0.26, shape: "cloud", blendMode: "screen" },
      { offsetX: -8, offsetY: 14, width: 10, height: 8, rotation: 0.7, color: "#cc7755", opacity: 0.24, shape: "cloud", blendMode: "screen" }
    ],
    features: [
      { description: "Shows filamentary structure throughout", isPresent: true, category: "structure" },
      { description: "Has a central pulsar", isPresent: true, category: "component" },
      { description: "Displays an irregular, chaotic shape", isPresent: true, category: "structure" },
      { description: "Shows orange-red emission", isPresent: true, category: "color" },
      { description: "Has a ring or shell structure", isPresent: false, category: "structure" },
      { description: "Contains a companion nebula", isPresent: false, category: "component" }
    ]
  },
  {
    id: "eagle_nebula",
    name: "Eagle Nebula (M16)",
    x: 4200,
    y: 1650,
    width: 40,
    height: 64,
    rotation: Math.PI / 12,
    observatory: "southern",
    layers: [
      { offsetX: 0, offsetY: 0, width: 102, height: 138, color: "#6b3344", opacity: 0.13, shape: "cloud", blendMode: "screen" },
      { offsetX: -6, offsetY: -12, width: 88, height: 118, color: "#7a4455", opacity: 0.16, shape: "cloud", blendMode: "screen" },
      { offsetX: -4, offsetY: -8, width: 72, height: 96, color: "#885566", opacity: 0.18, shape: "cloud", blendMode: "screen" },
      { offsetX: 0, offsetY: 8, width: 56, height: 52, color: "#994466", opacity: 0.22, shape: "cloud", blendMode: "screen" },
      { offsetX: -2, offsetY: 6, width: 44, height: 42, color: "#aa5577", opacity: 0.24, shape: "cloud", blendMode: "screen" },
      { offsetX: -15, offsetY: -6, width: 20, height: 84, rotation: -0.12, color: "#0f0a0f", opacity: 0.92, shape: "streak", blendMode: "source-over" },
      { offsetX: -16, offsetY: -8, width: 17, height: 78, rotation: -0.14, color: "#0a0508", opacity: 0.96, shape: "streak", blendMode: "source-over" },
      { offsetX: -17, offsetY: -10, width: 14, height: 72, rotation: -0.15, color: "#050305", opacity: 1, shape: "streak", blendMode: "source-over" },
      { offsetX: -24, offsetY: -8, width: 12, height: 68, rotation: -0.1, color: "#994466", opacity: 0.32, shape: "streak", blendMode: "screen" },
      { offsetX: -26, offsetY: -6, width: 9, height: 58, rotation: -0.08, color: "#aa5577", opacity: 0.28, shape: "streak", blendMode: "screen" },
      { offsetX: 0, offsetY: 6, width: 22, height: 76, rotation: 0.04, color: "#140a0f", opacity: 0.9, shape: "streak", blendMode: "source-over" },
      { offsetX: -1, offsetY: 4, width: 19, height: 70, rotation: 0.05, color: "#0f0a0a", opacity: 0.94, shape: "streak", blendMode: "source-over" },
      { offsetX: -2, offsetY: 2, width: 16, height: 64, rotation: 0.06, color: "#0a0508", opacity: 1, shape: "streak", blendMode: "source-over" },
      { offsetX: 9, offsetY: 4, width: 13, height: 62, rotation: 0.08, color: "#aa5566", opacity: 0.34, shape: "streak", blendMode: "screen" },
      { offsetX: 11, offsetY: 6, width: 10, height: 52, rotation: 0.1, color: "#bb6677", opacity: 0.3, shape: "streak", blendMode: "screen" },
      { offsetX: 17, offsetY: 16, width: 24, height: 60, rotation: 0.18, color: "#1a0f14", opacity: 0.88, shape: "streak", blendMode: "source-over" },
      { offsetX: 16, offsetY: 14, width: 21, height: 56, rotation: 0.2, color: "#140a0f", opacity: 0.92, shape: "streak", blendMode: "source-over" },
      { offsetX: 15, offsetY: 12, width: 18, height: 50, rotation: 0.22, color: "#0f0a0a", opacity: 1, shape: "streak", blendMode: "source-over" },
      { offsetX: 26, offsetY: 16, width: 12, height: 48, rotation: 0.16, color: "#995566", opacity: 0.3, shape: "streak", blendMode: "screen" },
      { offsetX: 28, offsetY: 18, width: 9, height: 40, rotation: 0.14, color: "#aa6677", opacity: 0.26, shape: "streak", blendMode: "screen" },
      { offsetX: -16, offsetY: -46, width: 16, height: 15, color: "#cc8899", opacity: 0.38, shape: "cloud", blendMode: "screen" },
      { offsetX: -17, offsetY: -48, width: 12, height: 11, color: "#ddaaaa", opacity: 0.44, shape: "ellipse", blendMode: "screen" },
      { offsetX: -18, offsetY: -50, width: 8, height: 7, color: "#eeccbb", opacity: 0.52, shape: "ellipse", blendMode: "screen" },
      { offsetX: -1, offsetY: -36, width: 14, height: 13, color: "#bb7788", opacity: 0.4, shape: "cloud", blendMode: "screen" },
      { offsetX: -2, offsetY: -38, width: 10, height: 9, color: "#cc99aa", opacity: 0.48, shape: "ellipse", blendMode: "screen" },
      { offsetX: 16, offsetY: -22, width: 12, height: 11, color: "#aa6677", opacity: 0.36, shape: "cloud", blendMode: "screen" },
      { offsetX: 17, offsetY: -24, width: 8, height: 7, color: "#bb8899", opacity: 0.42, shape: "ellipse", blendMode: "screen" },
      { offsetX: -32, offsetY: 26, width: 42, height: 46, rotation: -0.28, color: "#6b3344", opacity: 0.16, shape: "cloud", blendMode: "screen" },
      { offsetX: 30, offsetY: 34, width: 46, height: 50, rotation: 0.35, color: "#774455", opacity: 0.15, shape: "cloud", blendMode: "screen" },
      { offsetX: -18, offsetY: -54, width: 28, height: 24, rotation: -0.15, color: "#885566", opacity: 0.18, shape: "cloud", blendMode: "screen" },
      { offsetX: 22, offsetY: 42, width: 32, height: 28, rotation: 0.25, color: "#774455", opacity: 0.14, shape: "cloud", blendMode: "screen" }
    ],
    features: [
      { description: "Contains dark pillar structures (Pillars of Creation)", isPresent: true, category: "structure" },
      { description: "Shows bright star-forming regions at pillar tips", isPresent: true, category: "component" },
      { description: "Displays silhouetted dust columns", isPresent: true, category: "structure" },
      { description: "Shows red and green emission nebulosity", isPresent: true, category: "color" },
      { description: "Has a ring or shell structure", isPresent: false, category: "structure" },
      { description: "Shows filamentary structure", isPresent: false, category: "structure" }
    ]
  },
  {
    id: "lagoon_nebula",
    name: "Lagoon Nebula (M8)",
    x: 4550,
    y: 1850,
    width: 64,
    height: 48,
    rotation: Math.PI / 9,
    observatory: "southern",
    layers: [
      { offsetX: 0, offsetY: 0, width: 138, height: 98, color: "#5a2244", opacity: 0.12, shape: "cloud", blendMode: "screen" },
      { offsetX: -4, offsetY: -2, width: 118, height: 84, color: "#6b3355", opacity: 0.15, shape: "cloud", blendMode: "screen" },
      { offsetX: -8, offsetY: -16, width: 88, height: 42, color: "#884466", opacity: 0.2, shape: "cloud", blendMode: "screen" },
      { offsetX: -6, offsetY: -18, width: 72, height: 36, color: "#994477", opacity: 0.22, shape: "cloud", blendMode: "screen" },
      { offsetX: -4, offsetY: -20, width: 58, height: 30, color: "#aa5588", opacity: 0.24, shape: "cloud", blendMode: "screen" },
      { offsetX: 4, offsetY: 12, width: 92, height: 46, color: "#7a3355", opacity: 0.19, shape: "cloud", blendMode: "screen" },
      { offsetX: 6, offsetY: 14, width: 76, height: 38, color: "#8b4466", opacity: 0.21, shape: "cloud", blendMode: "screen" },
      { offsetX: 8, offsetY: 16, width: 62, height: 32, color: "#9c5577", opacity: 0.23, shape: "cloud", blendMode: "screen" },
      { offsetX: -20, offsetY: -8, width: 48, height: 38, color: "#bb6688", opacity: 0.26, shape: "cloud", blendMode: "screen" },
      { offsetX: -22, offsetY: -10, width: 38, height: 32, color: "#cc7799", opacity: 0.28, shape: "cloud", blendMode: "screen" },
      { offsetX: -24, offsetY: -12, width: 28, height: 24, color: "#dd88aa", opacity: 0.32, shape: "cloud", blendMode: "screen" },
      { offsetX: 16, offsetY: 4, width: 52, height: 42, color: "#aa5577", opacity: 0.25, shape: "cloud", blendMode: "screen" },
      { offsetX: 18, offsetY: 6, width: 42, height: 34, color: "#bb6688", opacity: 0.27, shape: "cloud", blendMode: "screen" },
      { offsetX: 20, offsetY: 8, width: 32, height: 26, color: "#cc7799", opacity: 0.3, shape: "cloud", blendMode: "screen" },
      { offsetX: 0, offsetY: 0, width: 96, height: 18, rotation: 0.08, color: "#0a0508", opacity: 0.9, shape: "streak", blendMode: "source-over" },
      { offsetX: -2, offsetY: 1, width: 82, height: 14, rotation: 0.1, color: "#050305", opacity: 0.95, shape: "streak", blendMode: "source-over" },
      { offsetX: 0, offsetY: 2, width: 68, height: 12, rotation: 0.08, color: "#000000", opacity: 1, shape: "streak", blendMode: "source-over" },
      { offsetX: 12, offsetY: -4, width: 44, height: 10, rotation: 0.15, color: "#140a14", opacity: 0.75, shape: "streak", blendMode: "source-over" },
      { offsetX: -16, offsetY: 3, width: 38, height: 9, rotation: -0.12, color: "#1a0f14", opacity: 0.7, shape: "streak", blendMode: "source-over" },
      { offsetX: -26, offsetY: -10, width: 20, height: 18, color: "#e4ccaa", opacity: 0.38, shape: "cloud", blendMode: "screen" },
      { offsetX: -28, offsetY: -12, width: 14, height: 13, color: "#f4ddbb", opacity: 0.45, shape: "ellipse", blendMode: "screen" },
      { offsetX: 22, offsetY: 8, width: 22, height: 20, color: "#d4bbaa", opacity: 0.36, shape: "cloud", blendMode: "screen" },
      { offsetX: 24, offsetY: 10, width: 16, height: 14, color: "#e4ccbb", opacity: 0.42, shape: "ellipse", blendMode: "screen" },
      { offsetX: -12, offsetY: -22, width: 18, height: 16, rotation: 0.25, color: "#cc8899", opacity: 0.28, shape: "cloud", blendMode: "screen" },
      { offsetX: 14, offsetY: 18, width: 20, height: 18, rotation: -0.3, color: "#bb7788", opacity: 0.26, shape: "cloud", blendMode: "screen" },
      { offsetX: -42, offsetY: -12, width: 48, height: 36, rotation: -0.35, color: "#663344", opacity: 0.14, shape: "cloud", blendMode: "screen" },
      { offsetX: 38, offsetY: 14, width: 52, height: 38, rotation: 0.4, color: "#774455", opacity: 0.15, shape: "cloud", blendMode: "screen" }
    ],
    features: [
      { description: "Has a dark lane bisecting the nebula", isPresent: true, category: "structure" },
      { description: "Shows bright hourglass-shaped regions", isPresent: true, category: "structure" },
      { description: "Contains an embedded star cluster", isPresent: true, category: "component" },
      { description: "Displays pink-red emission nebulosity", isPresent: true, category: "color" },
      { description: "Shows dark pillar structures", isPresent: false, category: "structure" },
      { description: "Has a ring or shell structure", isPresent: false, category: "structure" }
    ]
  },
  {
    id: "horsehead_nebula",
    name: "Horsehead Nebula",
    x: 1450,
    y: 1450,
    width: 28,
    height: 40,
    rotation: Math.PI / 10,
    observatory: "northern",
    layers: [
      { offsetX: 0, offsetY: 0, width: 92, height: 132, color: "#6b2233", opacity: 0.14, shape: "cloud", blendMode: "screen" },
      { offsetX: -4, offsetY: -8, width: 78, height: 116, color: "#7a3344", opacity: 0.18, shape: "cloud", blendMode: "screen" },
      { offsetX: 2, offsetY: 4, width: 68, height: 98, color: "#884455", opacity: 0.2, shape: "cloud", blendMode: "screen" },
      { offsetX: -2, offsetY: 0, width: 56, height: 82, color: "#994466", opacity: 0.22, shape: "cloud", blendMode: "screen" },
      { offsetX: 0, offsetY: -4, width: 48, height: 70, color: "#aa5577", opacity: 0.2, shape: "cloud", blendMode: "screen" },
      { offsetX: 2, offsetY: 12, width: 42, height: 38, rotation: 0.08, color: "#0a0508", opacity: 1, shape: "cloud", blendMode: "source-over" },
      { offsetX: 0, offsetY: 10, width: 36, height: 34, rotation: 0.05, color: "#050305", opacity: 1, shape: "cloud", blendMode: "source-over" },
      { offsetX: -1, offsetY: 9, width: 32, height: 30, rotation: 0.03, color: "#000000", opacity: 1, shape: "cloud", blendMode: "source-over" },
      { offsetX: -2, offsetY: -2, width: 26, height: 32, rotation: -0.05, color: "#0a0508", opacity: 1, shape: "cloud", blendMode: "source-over" },
      { offsetX: -3, offsetY: -4, width: 22, height: 28, rotation: -0.08, color: "#050305", opacity: 1, shape: "cloud", blendMode: "source-over" },
      { offsetX: -5, offsetY: -13, width: 20, height: 22, rotation: -0.12, color: "#000000", opacity: 1, shape: "cloud", blendMode: "source-over" },
      { offsetX: -6, offsetY: -15, width: 18, height: 19, rotation: -0.14, color: "#000000", opacity: 1, shape: "cloud", blendMode: "source-over" },
      { offsetX: -11, offsetY: -17, width: 16, height: 15, rotation: -0.18, color: "#000000", opacity: 1, shape: "ellipse", blendMode: "source-over" },
      { offsetX: -13, offsetY: -18, width: 13, height: 12, rotation: -0.2, color: "#000000", opacity: 1, shape: "ellipse", blendMode: "source-over" },
      { offsetX: -4, offsetY: -24, width: 10, height: 12, rotation: -0.25, color: "#0a0508", opacity: 0.98, shape: "ellipse", blendMode: "source-over" },
      { offsetX: -8, offsetY: -26, width: 8, height: 10, rotation: -0.35, color: "#050305", opacity: 0.95, shape: "ellipse", blendMode: "source-over" },
      { offsetX: -14, offsetY: -10, width: 18, height: 28, rotation: -0.15, color: "#cc7766", opacity: 0.18, shape: "streak", blendMode: "screen" },
      { offsetX: -16, offsetY: -4, width: 14, height: 22, rotation: -0.12, color: "#bb6655", opacity: 0.16, shape: "streak", blendMode: "screen" },
      { offsetX: -10, offsetY: -12, width: 12, height: 16, rotation: -0.18, color: "#dd8877", opacity: 0.14, shape: "streak", blendMode: "screen" },
      { offsetX: 8, offsetY: 20, width: 36, height: 42, rotation: 0.25, color: "#1a0f14", opacity: 0.75, shape: "cloud", blendMode: "source-over" },
      { offsetX: 12, offsetY: 24, width: 28, height: 34, rotation: 0.3, color: "#0f0a0f", opacity: 0.85, shape: "cloud", blendMode: "source-over" },
      { offsetX: -8, offsetY: 18, width: 24, height: 28, rotation: -0.2, color: "#140a14", opacity: 0.65, shape: "cloud", blendMode: "source-over" }
    ],
    features: [
      { description: "Shows a horse-shaped dark cloud silhouette", isPresent: true, category: "structure" },
      { description: "Has a bright ionization rim along its edge", isPresent: true, category: "structure" },
      { description: "Appears as a dark absorption nebula", isPresent: true, category: "structure" },
      { description: "Shows pink-red background emission", isPresent: true, category: "color" },
      { description: "Contains bright star-forming pillars", isPresent: false, category: "structure" },
      { description: "Has a central white dwarf", isPresent: false, category: "component" }
    ]
  },
  {
    id: "helix_nebula",
    name: "Helix Nebula (NGC 7293)",
    x: 5150,
    y: 1750,
    width: 52,
    height: 52,
    rotation: Math.PI / 15,
    observatory: "southern",
    layers: [
      { offsetX: 0, offsetY: 0, width: 118, height: 118, color: "#5a4433", opacity: 0.1, shape: "cloud", blendMode: "screen" },
      { offsetX: 0, offsetY: 0, width: 108, height: 108, color: "#6b5544", opacity: 0.13, shape: "cloud", blendMode: "screen" },
      { offsetX: 0, offsetY: 0, width: 100, height: 100, color: "#885544", opacity: 0.17, shape: "ellipse", blendMode: "screen" },
      { offsetX: 0, offsetY: 0, width: 92, height: 92, color: "#997755", opacity: 0.19, shape: "ellipse", blendMode: "screen" },
      { offsetX: 0, offsetY: 0, width: 86, height: 86, color: "#aa8866", opacity: 0.18, shape: "ellipse", blendMode: "screen" },
      { offsetX: 0, offsetY: 0, width: 78, height: 78, color: "#aa8866", opacity: 0.22, shape: "ellipse", blendMode: "screen" },
      { offsetX: 0, offsetY: 0, width: 72, height: 72, color: "#bb9977", opacity: 0.24, shape: "ellipse", blendMode: "screen" },
      { offsetX: 0, offsetY: 0, width: 68, height: 68, color: "#ccaa88", opacity: 0.2, shape: "ellipse", blendMode: "screen" },
      { offsetX: 0, offsetY: 0, width: 62, height: 62, color: "#99aa99", opacity: 0.26, shape: "ellipse", blendMode: "screen" },
      { offsetX: 0, offsetY: 0, width: 58, height: 58, color: "#88bb99", opacity: 0.24, shape: "ellipse", blendMode: "screen" },
      { offsetX: 0, offsetY: 0, width: 52, height: 52, color: "#66aa99", opacity: 0.3, shape: "ellipse", blendMode: "screen" },
      { offsetX: 0, offsetY: 0, width: 48, height: 48, color: "#77bbaa", opacity: 0.32, shape: "ellipse", blendMode: "screen" },
      { offsetX: 0, offsetY: 0, width: 44, height: 44, color: "#88ccbb", opacity: 0.28, shape: "ellipse", blendMode: "screen" },
      { offsetX: 0, offsetY: 0, width: 40, height: 40, color: "#99ddcc", opacity: 0.34, shape: "ellipse", blendMode: "screen" },
      { offsetX: 0, offsetY: 0, width: 28, height: 28, color: "#0f1419", opacity: 0.58, shape: "ellipse", blendMode: "source-over" },
      { offsetX: 0, offsetY: 0, width: 22, height: 22, color: "#0a0f14", opacity: 0.68, shape: "ellipse", blendMode: "source-over" },
      { offsetX: 0, offsetY: 0, width: 18, height: 18, color: "#050a0f", opacity: 0.75, shape: "ellipse", blendMode: "source-over" },
      { offsetX: 0, offsetY: 0, width: 8, height: 8, color: "#d4d4bb", opacity: 0.68, shape: "ellipse", blendMode: "screen" },
      { offsetX: 0, offsetY: 0, width: 5, height: 5, color: "#e4e4cc", opacity: 0.78, shape: "ellipse", blendMode: "screen" },
      { offsetX: 0, offsetY: 0, width: 3, height: 3, color: "#f4f4dd", opacity: 0.88, shape: "ellipse", blendMode: "screen" },
      { offsetX: 0, offsetY: 0, width: 1, height: 1, color: "#ffffff", opacity: 0.95, shape: "ellipse", blendMode: "screen" },
      { offsetX: 18, offsetY: -16, width: 14, height: 12, rotation: 0.38, color: "#88aa88", opacity: 0.24, shape: "cloud", blendMode: "screen" },
      { offsetX: 22, offsetY: -12, width: 12, height: 10, rotation: 0.42, color: "#99bb99", opacity: 0.22, shape: "cloud", blendMode: "screen" },
      { offsetX: 16, offsetY: -20, width: 11, height: 10, rotation: 0.35, color: "#779977", opacity: 0.2, shape: "cloud", blendMode: "screen" },
      { offsetX: -20, offsetY: -14, width: 13, height: 11, rotation: -0.35, color: "#669966", opacity: 0.23, shape: "cloud", blendMode: "screen" },
      { offsetX: -16, offsetY: -18, width: 12, height: 10, rotation: -0.4, color: "#77aa77", opacity: 0.25, shape: "cloud", blendMode: "screen" },
      { offsetX: -22, offsetY: -10, width: 11, height: 9, rotation: -0.3, color: "#889988", opacity: 0.21, shape: "cloud", blendMode: "screen" },
      { offsetX: 20, offsetY: 16, width: 15, height: 13, rotation: 0.75, color: "#aa9977", opacity: 0.22, shape: "cloud", blendMode: "screen" },
      { offsetX: 16, offsetY: 20, width: 13, height: 11, rotation: 0.8, color: "#99aa88", opacity: 0.24, shape: "cloud", blendMode: "screen" },
      { offsetX: 22, offsetY: 12, width: 12, height: 10, rotation: 0.7, color: "#88bb99", opacity: 0.2, shape: "cloud", blendMode: "screen" },
      { offsetX: -18, offsetY: 18, width: 14, height: 12, rotation: -0.72, color: "#779988", opacity: 0.25, shape: "cloud", blendMode: "screen" },
      { offsetX: -22, offsetY: 14, width: 12, height: 11, rotation: -0.68, color: "#88aa99", opacity: 0.23, shape: "cloud", blendMode: "screen" },
      { offsetX: -16, offsetY: 22, width: 13, height: 10, rotation: -0.78, color: "#668877", opacity: 0.21, shape: "cloud", blendMode: "screen" },
      { offsetX: 12, offsetY: -10, width: 10, height: 9, rotation: 0.5, color: "#99ccbb", opacity: 0.26, shape: "cloud", blendMode: "screen" },
      { offsetX: -12, offsetY: 10, width: 11, height: 9, rotation: -0.55, color: "#88bbaa", opacity: 0.27, shape: "cloud", blendMode: "screen" },
      { offsetX: 10, offsetY: 12, width: 9, height: 8, rotation: 0.9, color: "#77aa99", opacity: 0.24, shape: "cloud", blendMode: "screen" },
      { offsetX: -10, offsetY: -12, width: 10, height: 8, rotation: -0.85, color: "#88cc99", opacity: 0.25, shape: "cloud", blendMode: "screen" }
    ],
    features: [
      { description: "Has a ring or shell structure", isPresent: true, category: "structure" },
      { description: "Shows a central white dwarf star", isPresent: true, category: "component" },
      { description: "Displays cometary knots texture throughout", isPresent: true, category: "structure" },
      { description: "Shows blue-green inner ring emission", isPresent: true, category: "color" },
      { description: "Has a horse-shaped silhouette", isPresent: false, category: "structure" },
      { description: "Contains dark pillar structures", isPresent: false, category: "structure" }
    ]
  }
];
function getNebulaeByObservatory(observatory) {
  return NEBULAE.filter((n) => n.observatory === observatory);
}

// src/data/clusters.ts
var CLUSTERS = [
  {
    id: "pleiades",
    name: "The Pleiades (M45)",
    x: 950,
    y: 1150,
    starCount: 50,
    radius: 48,
    color: "#A0C0FF",
    observatory: "northern"
  },
  {
    id: "hyades",
    name: "Hyades",
    x: 1100,
    y: 1300,
    starCount: 40,
    radius: 60,
    color: "#FFD0A0",
    observatory: "northern"
  },
  {
    id: "beehive",
    name: "Beehive Cluster (M44)",
    x: 2100,
    y: 1400,
    starCount: 60,
    radius: 42,
    color: "#FFFFFF",
    observatory: "northern"
  },
  {
    id: "double_cluster",
    name: "Double Cluster (NGC 869/884)",
    x: 650,
    y: 950,
    starCount: 70,
    radius: 36,
    color: "#B0D0FF",
    observatory: "northern"
  },
  {
    id: "jewel_box",
    name: "Jewel Box (NGC 4755)",
    x: 3300,
    y: 2100,
    starCount: 50,
    radius: 30,
    color: "#FFA0C0",
    observatory: "southern"
  },
  {
    id: "47_tucanae",
    name: "47 Tucanae (NGC 104)",
    x: 550,
    y: 2300,
    starCount: 120,
    radius: 54,
    color: "#FFFFB0",
    observatory: "southern"
  },
  {
    id: "omega_centauri",
    name: "Omega Centauri (NGC 5139)",
    x: 3500,
    y: 2000,
    starCount: 150,
    radius: 66,
    color: "#FFFFE0",
    observatory: "southern"
  }
];
function getClustersByObservatory(observatory) {
  return CLUSTERS.filter((c) => c.observatory === observatory);
}

// src/data/galaxies.ts
var GALAXIES = [
  {
    id: "andromeda",
    name: "Andromeda Galaxy (M31)",
    x: 200,
    y: 1100,
    width: 54,
    height: 36,
    rotation: Math.PI / 8,
    galaxyType: "spiral",
    observatory: "northern",
    layers: [
      { offsetX: 0, offsetY: 0, width: 130, height: 88, rotation: 0.3, color: "#443344", opacity: 0.07, shape: "ellipse", blendMode: "screen" },
      { offsetX: 0, offsetY: 0, width: 115, height: 78, rotation: 0.3, color: "#554455", opacity: 0.09, shape: "ellipse", blendMode: "screen" },
      { offsetX: 0, offsetY: 0, width: 102, height: 70, rotation: 0.3, color: "#665566", opacity: 0.11, shape: "ellipse", blendMode: "screen" },
      { offsetX: 0, offsetY: 0, width: 94, height: 54, rotation: 0.3, color: "#887788", opacity: 0.16, shape: "ellipse", blendMode: "screen" },
      { offsetX: 0, offsetY: 0, width: 86, height: 50, rotation: 0.3, color: "#998899", opacity: 0.18, shape: "ellipse", blendMode: "screen" },
      { offsetX: -28, offsetY: -14, width: 68, height: 26, rotation: -0.35, color: "#7788aa", opacity: 0.17, shape: "cloud", blendMode: "screen" },
      { offsetX: -32, offsetY: -12, width: 58, height: 22, rotation: -0.42, color: "#8899bb", opacity: 0.19, shape: "cloud", blendMode: "screen" },
      { offsetX: -36, offsetY: -10, width: 48, height: 18, rotation: -0.48, color: "#99aacc", opacity: 0.15, shape: "cloud", blendMode: "screen" },
      { offsetX: 25, offsetY: 11, width: 64, height: 24, rotation: 0.48, color: "#6677aa", opacity: 0.18, shape: "cloud", blendMode: "screen" },
      { offsetX: 29, offsetY: 13, width: 54, height: 20, rotation: 0.55, color: "#7788bb", opacity: 0.2, shape: "cloud", blendMode: "screen" },
      { offsetX: 33, offsetY: 15, width: 44, height: 16, rotation: 0.62, color: "#8899cc", opacity: 0.16, shape: "cloud", blendMode: "screen" },
      { offsetX: -26, offsetY: -10, width: 11, height: 9, rotation: -0.4, color: "#aaccee", opacity: 0.24, shape: "cloud", blendMode: "screen" },
      { offsetX: 24, offsetY: 10, width: 10, height: 8, rotation: 0.5, color: "#99bbdd", opacity: 0.22, shape: "cloud", blendMode: "screen" },
      { offsetX: 0, offsetY: 0, width: 78, height: 46, rotation: 0.3, color: "#aa99aa", opacity: 0.22, shape: "ellipse", blendMode: "screen" },
      { offsetX: 0, offsetY: 0, width: 70, height: 41, rotation: 0.3, color: "#bbaaaa", opacity: 0.24, shape: "ellipse", blendMode: "screen" },
      { offsetX: 0, offsetY: 0, width: 62, height: 37, rotation: 0.3, color: "#ccbbaa", opacity: 0.26, shape: "ellipse", blendMode: "screen" },
      { offsetX: 0, offsetY: 0, width: 52, height: 31, rotation: 0.3, color: "#ccbbaa", opacity: 0.28, shape: "ellipse", blendMode: "screen" },
      { offsetX: 0, offsetY: 0, width: 44, height: 26, rotation: 0.3, color: "#d4ccbb", opacity: 0.3, shape: "ellipse", blendMode: "screen" },
      { offsetX: -16, offsetY: -6, width: 42, height: 10, rotation: 0.25, color: "#0f0a0f", opacity: 0.38, shape: "streak", blendMode: "source-over" },
      { offsetX: -14, offsetY: -5, width: 36, height: 8, rotation: 0.22, color: "#1a1419", opacity: 0.32, shape: "streak", blendMode: "source-over" },
      { offsetX: 18, offsetY: 4, width: 38, height: 9, rotation: 0.38, color: "#140a14", opacity: 0.35, shape: "streak", blendMode: "source-over" },
      { offsetX: 16, offsetY: 3, width: 32, height: 7, rotation: 0.42, color: "#1a1419", opacity: 0.28, shape: "streak", blendMode: "source-over" },
      { offsetX: 0, offsetY: 0, width: 34, height: 20, rotation: 0.3, color: "#d4ccbb", opacity: 0.34, shape: "ellipse", blendMode: "screen" },
      { offsetX: 0, offsetY: 0, width: 27, height: 16, rotation: 0.3, color: "#e4d4bb", opacity: 0.38, shape: "ellipse", blendMode: "screen" },
      { offsetX: 0, offsetY: 0, width: 21, height: 13, rotation: 0.3, color: "#f4e4cc", opacity: 0.44, shape: "ellipse", blendMode: "screen" },
      { offsetX: 0, offsetY: 0, width: 15, height: 10, rotation: 0.3, color: "#ffffdd", opacity: 0.52, shape: "ellipse", blendMode: "screen" },
      { offsetX: 0, offsetY: 0, width: 10, height: 7, rotation: 0.3, color: "#ffffee", opacity: 0.62, shape: "ellipse", blendMode: "screen" },
      { offsetX: 0, offsetY: 0, width: 6, height: 4, rotation: 0.3, color: "#ffffff", opacity: 0.72, shape: "ellipse", blendMode: "screen" },
      { offsetX: 24, offsetY: 14, width: 11, height: 10, color: "#998899", opacity: 0.22, shape: "ellipse", blendMode: "screen" },
      { offsetX: 24, offsetY: 14, width: 7, height: 7, color: "#bbaaaa", opacity: 0.28, shape: "ellipse", blendMode: "screen" },
      { offsetX: 24, offsetY: 14, width: 4, height: 4, color: "#d4ccbb", opacity: 0.36, shape: "ellipse", blendMode: "screen" },
      { offsetX: -42, offsetY: -16, width: 14, height: 11, color: "#887788", opacity: 0.18, shape: "ellipse", blendMode: "screen" },
      { offsetX: -42, offsetY: -16, width: 9, height: 7, color: "#aa99aa", opacity: 0.24, shape: "ellipse", blendMode: "screen" },
      { offsetX: -42, offsetY: -16, width: 5, height: 4, color: "#ccbbaa", opacity: 0.32, shape: "ellipse", blendMode: "screen" }
    ],
    features: [
      { description: "Has visible spiral arms", isPresent: true, category: "structure" },
      { description: "Shows prominent dust lanes", isPresent: true, category: "structure" },
      { description: "Has companion galaxies visible (M32, M110)", isPresent: true, category: "component" },
      { description: "Displays a large central bulge", isPresent: true, category: "structure" },
      { description: "Has an edge-on orientation", isPresent: false, category: "morphology" },
      { description: "Shows a central bar structure", isPresent: false, category: "structure" }
    ]
  },
  {
    id: "whirlpool",
    name: "Whirlpool Galaxy (M51)",
    x: 3200,
    y: 1150,
    width: 33,
    height: 33,
    rotation: 0,
    galaxyType: "spiral",
    observatory: "northern",
    layers: [
      { offsetX: 0, offsetY: 0, width: 76, height: 76, color: "#443355", opacity: 0.08, shape: "cloud", blendMode: "screen" },
      { offsetX: 0, offsetY: 0, width: 68, height: 68, color: "#554466", opacity: 0.11, shape: "cloud", blendMode: "screen" },
      { offsetX: 0, offsetY: 0, width: 58, height: 58, color: "#776688", opacity: 0.15, shape: "ellipse", blendMode: "screen" },
      { offsetX: -6, offsetY: -16, width: 32, height: 13, rotation: -0.65, color: "#6677aa", opacity: 0.18, shape: "cloud", blendMode: "screen" },
      { offsetX: 4, offsetY: -18, width: 28, height: 11, rotation: -0.3, color: "#7788bb", opacity: 0.2, shape: "cloud", blendMode: "screen" },
      { offsetX: 12, offsetY: -12, width: 36, height: 14, rotation: 0.15, color: "#7788bb", opacity: 0.22, shape: "cloud", blendMode: "screen" },
      { offsetX: 18, offsetY: -2, width: 32, height: 13, rotation: 0.65, color: "#8899cc", opacity: 0.21, shape: "cloud", blendMode: "screen" },
      { offsetX: 16, offsetY: 8, width: 28, height: 12, rotation: 1.15, color: "#8899bb", opacity: 0.2, shape: "cloud", blendMode: "screen" },
      { offsetX: 6, offsetY: 16, width: 24, height: 11, rotation: 1.65, color: "#7788aa", opacity: 0.19, shape: "cloud", blendMode: "screen" },
      { offsetX: -4, offsetY: 18, width: 30, height: 12, rotation: 2.05, color: "#6677aa", opacity: 0.19, shape: "cloud", blendMode: "screen" },
      { offsetX: -14, offsetY: 14, width: 28, height: 11, rotation: 2.4, color: "#7788bb", opacity: 0.21, shape: "cloud", blendMode: "screen" },
      { offsetX: -18, offsetY: 4, width: 34, height: 13, rotation: -2.85, color: "#7788bb", opacity: 0.23, shape: "cloud", blendMode: "screen" },
      { offsetX: -16, offsetY: -8, width: 30, height: 12, rotation: -2.35, color: "#8899cc", opacity: 0.22, shape: "cloud", blendMode: "screen" },
      { offsetX: -8, offsetY: -14, width: 26, height: 11, rotation: -1.85, color: "#8899bb", opacity: 0.21, shape: "cloud", blendMode: "screen" },
      { offsetX: 14, offsetY: -10, width: 10, height: 9, rotation: 0.4, color: "#99ccee", opacity: 0.28, shape: "cloud", blendMode: "screen" },
      { offsetX: 18, offsetY: 2, width: 9, height: 8, rotation: 0.8, color: "#aaddff", opacity: 0.32, shape: "cloud", blendMode: "screen" },
      { offsetX: 12, offsetY: 12, width: 8, height: 8, rotation: 1.3, color: "#88bbdd", opacity: 0.26, shape: "cloud", blendMode: "screen" },
      { offsetX: -12, offsetY: 14, width: 9, height: 8, rotation: 2.3, color: "#99ccee", opacity: 0.3, shape: "cloud", blendMode: "screen" },
      { offsetX: -18, offsetY: 2, width: 10, height: 9, rotation: -2.7, color: "#aaddff", opacity: 0.29, shape: "cloud", blendMode: "screen" },
      { offsetX: -14, offsetY: -10, width: 8, height: 7, rotation: -2, color: "#88bbdd", opacity: 0.27, shape: "cloud", blendMode: "screen" },
      { offsetX: 0, offsetY: 0, width: 32, height: 32, color: "#aa9988", opacity: 0.24, shape: "ellipse", blendMode: "screen" },
      { offsetX: 0, offsetY: 0, width: 26, height: 26, color: "#bbaa99", opacity: 0.27, shape: "ellipse", blendMode: "screen" },
      { offsetX: 0, offsetY: 0, width: 22, height: 22, color: "#ccbbaa", opacity: 0.3, shape: "ellipse", blendMode: "screen" },
      { offsetX: 0, offsetY: 0, width: 17, height: 17, color: "#d4ccbb", opacity: 0.36, shape: "ellipse", blendMode: "screen" },
      { offsetX: 0, offsetY: 0, width: 13, height: 13, color: "#e4d4bb", opacity: 0.42, shape: "ellipse", blendMode: "screen" },
      { offsetX: 0, offsetY: 0, width: 9, height: 9, color: "#f4e4cc", opacity: 0.5, shape: "ellipse", blendMode: "screen" },
      { offsetX: 0, offsetY: 0, width: 6, height: 6, color: "#ffffee", opacity: 0.6, shape: "ellipse", blendMode: "screen" },
      { offsetX: 0, offsetY: 0, width: 3, height: 3, color: "#ffffff", opacity: 0.7, shape: "ellipse", blendMode: "screen" },
      { offsetX: 27, offsetY: 22, width: 19, height: 17, rotation: 0.3, color: "#887788", opacity: 0.18, shape: "ellipse", blendMode: "screen" },
      { offsetX: 27, offsetY: 22, width: 14, height: 13, rotation: 0.3, color: "#998899", opacity: 0.23, shape: "ellipse", blendMode: "screen" },
      { offsetX: 27, offsetY: 22, width: 10, height: 9, rotation: 0.3, color: "#bbaaaa", opacity: 0.28, shape: "ellipse", blendMode: "screen" },
      { offsetX: 27, offsetY: 22, width: 6, height: 6, rotation: 0.3, color: "#d4ccbb", opacity: 0.36, shape: "ellipse", blendMode: "screen" },
      { offsetX: 27, offsetY: 22, width: 3, height: 3, rotation: 0.3, color: "#e4ddcc", opacity: 0.48, shape: "ellipse", blendMode: "screen" },
      { offsetX: 14, offsetY: 11, width: 20, height: 16, rotation: 0.75, color: "#665577", opacity: 0.13, shape: "cloud", blendMode: "screen" },
      { offsetX: 18, offsetY: 14, width: 16, height: 13, rotation: 0.8, color: "#776688", opacity: 0.15, shape: "cloud", blendMode: "screen" },
      { offsetX: 21, offsetY: 16, width: 14, height: 11, rotation: 0.9, color: "#8899aa", opacity: 0.17, shape: "cloud", blendMode: "screen" }
    ],
    features: [
      { description: "Has visible spiral arms", isPresent: true, category: "structure" },
      { description: "Shows blue star-forming regions in the arms", isPresent: true, category: "structure" },
      { description: "Has a companion galaxy in tidal interaction (NGC 5195)", isPresent: true, category: "component" },
      { description: "Displays a face-on orientation", isPresent: true, category: "morphology" },
      { description: "Has an edge-on orientation", isPresent: false, category: "morphology" },
      { description: "Shows a prominent dust lane", isPresent: false, category: "structure" }
    ]
  },
  {
    id: "sombrero",
    name: "Sombrero Galaxy (M104)",
    x: 3100,
    y: 1600,
    width: 42,
    height: 15,
    rotation: Math.PI / 20,
    galaxyType: "spiral",
    observatory: "southern",
    layers: [
      { offsetX: 0, offsetY: 0, width: 96, height: 48, rotation: 0, color: "#443344", opacity: 0.08, shape: "ellipse", blendMode: "screen" },
      { offsetX: 0, offsetY: 0, width: 88, height: 42, rotation: 0, color: "#554455", opacity: 0.11, shape: "ellipse", blendMode: "screen" },
      { offsetX: 0, offsetY: 0, width: 82, height: 32, rotation: 0, color: "#776677", opacity: 0.16, shape: "ellipse", blendMode: "screen" },
      { offsetX: 0, offsetY: 0, width: 76, height: 28, rotation: 0, color: "#887788", opacity: 0.18, shape: "ellipse", blendMode: "screen" },
      { offsetX: 0, offsetY: 0, width: 70, height: 24, rotation: 0, color: "#998899", opacity: 0.22, shape: "ellipse", blendMode: "screen" },
      { offsetX: 0, offsetY: 0, width: 66, height: 22, rotation: 0, color: "#aa99aa", opacity: 0.24, shape: "ellipse", blendMode: "screen" },
      { offsetX: 0, offsetY: 0, width: 62, height: 20, rotation: 0, color: "#bbaaaa", opacity: 0.26, shape: "ellipse", blendMode: "screen" },
      { offsetX: 0, offsetY: -5, width: 64, height: 10, rotation: 0, color: "#bbaaaa", opacity: 0.2, shape: "ellipse", blendMode: "screen" },
      { offsetX: 0, offsetY: -6, width: 58, height: 8, rotation: 0, color: "#ccbbbb", opacity: 0.22, shape: "ellipse", blendMode: "screen" },
      { offsetX: 0, offsetY: 5, width: 64, height: 10, rotation: 0, color: "#bbaaaa", opacity: 0.2, shape: "ellipse", blendMode: "screen" },
      { offsetX: 0, offsetY: 6, width: 58, height: 8, rotation: 0, color: "#ccbbbb", opacity: 0.22, shape: "ellipse", blendMode: "screen" },
      { offsetX: 0, offsetY: 0, width: 76, height: 8, rotation: 0, color: "#0a0508", opacity: 0.88, shape: "streak", blendMode: "source-over" },
      { offsetX: 0, offsetY: 0, width: 70, height: 6, rotation: 0, color: "#050305", opacity: 0.94, shape: "streak", blendMode: "source-over" },
      { offsetX: 0, offsetY: 0, width: 64, height: 5, rotation: 0, color: "#000000", opacity: 1, shape: "streak", blendMode: "source-over" },
      { offsetX: 0, offsetY: -1, width: 58, height: 4, rotation: 0, color: "#0f0a0f", opacity: 0.75, shape: "streak", blendMode: "source-over" },
      { offsetX: 0, offsetY: 1, width: 58, height: 4, rotation: 0, color: "#0f0a0f", opacity: 0.75, shape: "streak", blendMode: "source-over" },
      { offsetX: 0, offsetY: 0, width: 34, height: 32, rotation: 0, color: "#bbaa99", opacity: 0.28, shape: "ellipse", blendMode: "screen" },
      { offsetX: 0, offsetY: 0, width: 30, height: 28, rotation: 0, color: "#ccbbaa", opacity: 0.32, shape: "ellipse", blendMode: "screen" },
      { offsetX: 0, offsetY: 0, width: 26, height: 24, rotation: 0, color: "#d4ccbb", opacity: 0.36, shape: "ellipse", blendMode: "screen" },
      { offsetX: 0, offsetY: 0, width: 22, height: 21, rotation: 0, color: "#e4d4bb", opacity: 0.42, shape: "ellipse", blendMode: "screen" },
      { offsetX: 0, offsetY: 0, width: 18, height: 17, rotation: 0, color: "#f4e4cc", opacity: 0.48, shape: "ellipse", blendMode: "screen" },
      { offsetX: 0, offsetY: 0, width: 14, height: 14, rotation: 0, color: "#ffffdd", opacity: 0.56, shape: "ellipse", blendMode: "screen" },
      { offsetX: 0, offsetY: 0, width: 10, height: 11, rotation: 0, color: "#ffffee", opacity: 0.64, shape: "ellipse", blendMode: "screen" },
      { offsetX: 0, offsetY: 0, width: 7, height: 8, rotation: 0, color: "#ffffff", opacity: 0.72, shape: "ellipse", blendMode: "screen" },
      { offsetX: 0, offsetY: 0, width: 4, height: 5, rotation: 0, color: "#ffffff", opacity: 0.82, shape: "ellipse", blendMode: "screen" },
      { offsetX: 0, offsetY: 0, width: 2, height: 2, rotation: 0, color: "#ffffff", opacity: 0.92, shape: "ellipse", blendMode: "screen" },
      { offsetX: -8, offsetY: 0, width: 12, height: 18, rotation: 0, color: "#d4ccbb", opacity: 0.16, shape: "ellipse", blendMode: "screen" },
      { offsetX: 8, offsetY: 0, width: 12, height: 18, rotation: 0, color: "#d4ccbb", opacity: 0.16, shape: "ellipse", blendMode: "screen" }
    ],
    features: [
      { description: "Has a prominent dust lane bisecting the disk", isPresent: true, category: "structure" },
      { description: "Shows a large central bulge", isPresent: true, category: "structure" },
      { description: "Has an edge-on orientation", isPresent: true, category: "morphology" },
      { description: "Displays a thin extended disk", isPresent: true, category: "structure" },
      { description: "Has visible spiral arms", isPresent: false, category: "structure" },
      { description: "Shows a face-on orientation", isPresent: false, category: "morphology" }
    ]
  }
];
function getGalaxiesByObservatory(observatory) {
  return GALAXIES.filter((g) => g.observatory === observatory);
}

// src/ui/DiscoveriesTab.ts
class DiscoveriesTab {
  listElement;
  countElement;
  progressCountElement;
  progressFillElement;
  panelElement;
  discoveriesByObservatory = new Map([
    ["northern", []],
    ["southern", []]
  ]);
  totalItems = 0;
  currentObservatory;
  setSections = new Map;
  RING_CIRCUMFERENCE = 97.4;
  constructor(observatory = "northern") {
    this.listElement = document.getElementById("discoveries-list");
    this.countElement = document.querySelector(".discovery-count");
    this.progressCountElement = document.querySelector(".progress-count");
    this.progressFillElement = document.querySelector(".progress-fill");
    this.panelElement = document.getElementById("discoveries-panel");
    this.currentObservatory = observatory;
    this.calculateTotalItems();
    this.updateCount();
    this.updateHeader();
  }
  calculateTotalItems() {
    const constellations = getConstellationsByObservatory(this.currentObservatory).length;
    const nebulae = NEBULAE.length;
    const clusters = CLUSTERS.length;
    const galaxies = GALAXIES.length;
    this.totalItems = constellations + nebulae + clusters + galaxies;
  }
  getCurrentDiscoveries() {
    return this.discoveriesByObservatory.get(this.currentObservatory) || [];
  }
  setObservatory(observatory) {
    this.currentObservatory = observatory;
    this.calculateTotalItems();
    this.setSections.clear();
    if (this.listElement) {
      this.listElement.innerHTML = "";
    }
    this.render();
    this.updateCount();
    this.updateHeader();
  }
  addDiscovery(item) {
    const discoveries = this.getCurrentDiscoveries();
    if (discoveries.some((d) => d.id === item.id))
      return;
    discoveries.push(item);
    this.updateCount();
    this.addCardToSet(item);
    const toggle = document.getElementById("discoveries-toggle");
    if (toggle) {
      toggle.classList.add("pulse");
      setTimeout(() => toggle.classList.remove("pulse"), 500);
    }
  }
  updateCount() {
    const discoveries = this.getCurrentDiscoveries();
    const count = discoveries.length;
    if (this.countElement) {
      this.countElement.textContent = `${count}/${this.totalItems}`;
    }
    if (this.progressCountElement) {
      this.progressCountElement.textContent = String(count);
    }
    if (this.progressFillElement) {
      const progress = this.totalItems > 0 ? count / this.totalItems : 0;
      const offset = this.RING_CIRCUMFERENCE * (1 - progress);
      this.progressFillElement.style.strokeDashoffset = String(offset);
    }
  }
  getSetSection(setId, type) {
    const list = this.listElement;
    if (!list)
      throw new Error("Discoveries list element not found");
    let key = setId || "misc";
    let title = "Other Constellations";
    let upgradeText = "";
    if (type === "nebula") {
      key = "nebulae";
      title = "Nebulae";
    } else if (type === "cluster") {
      key = "clusters";
      title = "Star Clusters";
    } else if (type === "galaxy") {
      key = "galaxies";
      title = "Galaxies";
    } else if (setId && CONSTELLATION_SETS[setId]) {
      const set = CONSTELLATION_SETS[setId];
      title = set.name;
      if (set.upgradeName) {
        upgradeText = `<span class="set-upgrade-hint">${set.upgradeName}</span>`;
      }
    }
    if (this.setSections.has(key)) {
      return this.setSections.get(key);
    }
    const section = document.createElement("div");
    section.className = "discovery-set-section";
    section.dataset.set = key;
    const header = document.createElement("div");
    header.className = "discovery-set-header";
    header.innerHTML = `
        <div class="set-title-row">
          <h4>${title}</h4>
          ${upgradeText}
        </div>
        <div class="set-progress-text">0 discovered</div>
    `;
    section.appendChild(header);
    const grid = document.createElement("div");
    grid.className = "discovery-set-grid";
    section.appendChild(grid);
    list.appendChild(section);
    this.setSections.set(key, section);
    return section;
  }
  updateSetProgress(setId, section, type) {
    const discoveries = this.getCurrentDiscoveries();
    let setDiscoveries = 0;
    let setTotal = 0;
    let isSet = false;
    if (type === "constellation" && setId && CONSTELLATION_SETS[setId]) {
      setDiscoveries = discoveries.filter((d) => d.set === setId).length;
      setTotal = getConstellationsByObservatory(this.currentObservatory).filter((d) => d.set === setId).length;
      isSet = true;
    } else if (type === "nebula") {
      setDiscoveries = discoveries.filter((d) => ("layers" in d) && !("galaxyType" in d)).length;
      setTotal = NEBULAE.length;
    } else if (type === "cluster") {
      setDiscoveries = discoveries.filter((d) => ("starCount" in d)).length;
      setTotal = CLUSTERS.length;
    } else if (type === "galaxy") {
      setDiscoveries = discoveries.filter((d) => ("galaxyType" in d)).length;
      setTotal = GALAXIES.length;
    } else {
      return;
    }
    const progressEl = section.querySelector(".set-progress-text");
    if (progressEl) {
      progressEl.textContent = `${setDiscoveries} / ${setTotal} discovered`;
      if (setDiscoveries === setTotal && setTotal > 0) {
        progressEl.classList.add("completed");
        progressEl.textContent = isSet ? "✦ Set Complete ✦" : "✦ All Found ✦";
        section.classList.add("set-completed");
      }
    }
  }
  addCardToSet(item) {
    if (!this.listElement)
      return;
    let type = "constellation";
    let setId = undefined;
    let description = "";
    if ("connections" in item) {
      type = "constellation";
      setId = item.set;
      description = item.latinName || "";
    } else if ("galaxyType" in item) {
      type = "galaxy";
      const galaxyItem = item;
      description = `${galaxyItem.galaxyType.charAt(0).toUpperCase() + galaxyItem.galaxyType.slice(1)} Galaxy`;
    } else if ("layers" in item) {
      type = "nebula";
      description = "Nebula";
    } else if ("starCount" in item) {
      type = "cluster";
      description = "Star Cluster";
    }
    const section = this.getSetSection(setId, type);
    const grid = section.querySelector(".discovery-set-grid");
    if (!grid)
      return;
    const card = document.createElement("div");
    card.className = "discovery-card";
    const icon = this.generateIcon(item);
    card.innerHTML = `
      <div class="discovery-icon">
        ${icon}
      </div>
      <div class="discovery-info">
        <h3>${item.name}</h3>
        <p>${description}</p>
      </div>
    `;
    card.style.opacity = "0";
    card.style.transform = "translateY(-20px) rotate(-0.3deg)";
    grid.prepend(card);
    this.updateSetProgress(setId || "", section, type);
    requestAnimationFrame(() => {
      card.style.transition = "all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)";
      card.style.opacity = "1";
      card.style.transform = "translateY(0) rotate(-0.3deg)";
    });
  }
  generateIcon(data) {
    if ("connections" in data) {
      return this.generateConstellationSVG(data);
    } else if ("galaxyType" in data) {
      return this.generateGalaxySVG(data);
    } else if ("layers" in data) {
      return this.generateNebulaSVG(data);
    } else {
      return this.generateClusterSVG(data);
    }
  }
  generateNebulaSVG(data) {
    const layer1 = data.layers[0];
    const layer2 = data.layers[1] || layer1;
    const color1 = layer1 ? layer1.color : "#8866aa";
    const color2 = layer2 ? layer2.color : "#aabbcc";
    return `<svg viewBox="0 0 100 100" class="miniature">
        <filter id="blur-${data.id}">
           <feGaussianBlur in="SourceGraphic" stdDeviation="5" />
        </filter>
        <circle cx="50" cy="50" r="40" fill="${color1}" filter="url(#blur-${data.id})" opacity="0.6" />
        <circle cx="50" cy="50" r="25" fill="${color2}" filter="url(#blur-${data.id})" opacity="0.8" />
      </svg>`;
  }
  generateClusterSVG(data) {
    let circles = "";
    for (let i = 0;i < 8; i++) {
      const angle = i / 8 * Math.PI * 2;
      const r = 20 + i % 3 * 5;
      const cx = 50 + Math.cos(angle) * r;
      const cy = 50 + Math.sin(angle) * r;
      circles += `<circle cx="${cx}" cy="${cy}" r="${2 + i % 2}" fill="#3d2e24" opacity="0.8" />`;
    }
    circles += `<circle cx="50" cy="50" r="40" fill="${data.color}" opacity="0.15" />`;
    circles += `<circle cx="50" cy="50" r="5" fill="#3d2e24" />`;
    return `<svg viewBox="0 0 100 100" class="miniature">
         ${circles}
      </svg>`;
  }
  generateConstellationSVG(data) {
    const minX = Math.min(...data.stars.map((s) => s.x));
    const maxX = Math.max(...data.stars.map((s) => s.x));
    const minY = Math.min(...data.stars.map((s) => s.y));
    const maxY = Math.max(...data.stars.map((s) => s.y));
    const padding = 50;
    const width = maxX - minX + padding * 2;
    const height = maxY - minY + padding * 2;
    const mapX = (x) => (x - minX + padding) / width * 100;
    const mapY = (y) => (y - minY + padding) / height * 100;
    let svg = `<svg viewBox="0 0 100 100" class="constellation-miniature">`;
    data.connections.forEach(([startIdx, endIdx]) => {
      const start = data.stars[startIdx];
      const end = data.stars[endIdx];
      if (start && end) {
        svg += `<line
          x1="${mapX(start.x)}" y1="${mapY(start.y)}"
          x2="${mapX(end.x)}" y2="${mapY(end.y)}"
          stroke="#3d2e24"
          stroke-width="1.5"
          stroke-linecap="round"
          opacity="0.5" />`;
      }
    });
    data.stars.forEach((star) => {
      const cx = mapX(star.x);
      const cy = mapY(star.y);
      const r = 2.5 + star.brightness * 1.5;
      svg += `<circle cx="${cx}" cy="${cy}" r="${r}" fill="#1a1410" />`;
    });
    svg += `</svg>`;
    return svg;
  }
  generateGalaxySVG(data) {
    let svg = `<svg viewBox="0 0 100 100" class="miniature">`;
    svg += `<defs>
      <radialGradient id="galaxy-grad-${data.id}" cx="50%" cy="50%" r="50%">
        <stop offset="0%" style="stop-color:#c4c4bb;stop-opacity:0.8" />
        <stop offset="40%" style="stop-color:#998899;stop-opacity:0.5" />
        <stop offset="100%" style="stop-color:#554455;stop-opacity:0" />
      </radialGradient>
    </defs>`;
    if (data.galaxyType === "spiral") {
      svg += `<ellipse cx="50" cy="50" rx="45" ry="35" fill="url(#galaxy-grad-${data.id})" opacity="0.5" />`;
      svg += `<ellipse cx="50" cy="50" rx="30" ry="23" fill="url(#galaxy-grad-${data.id})" opacity="0.6" />`;
      svg += `<ellipse cx="50" cy="50" rx="12" ry="10" fill="#d4ccbb" opacity="0.8" />`;
      svg += `<ellipse cx="50" cy="50" rx="6" ry="5" fill="#f4e4cc" opacity="0.9" />`;
    } else if (data.galaxyType === "elliptical") {
      svg += `<ellipse cx="50" cy="50" rx="40" ry="40" fill="url(#galaxy-grad-${data.id})" opacity="0.6" />`;
      svg += `<ellipse cx="50" cy="50" rx="25" ry="25" fill="#ccbbaa" opacity="0.7" />`;
      svg += `<ellipse cx="50" cy="50" rx="12" ry="12" fill="#e4d4bb" opacity="0.8" />`;
    } else {
      svg += `<ellipse cx="50" cy="50" rx="35" ry="28" fill="url(#galaxy-grad-${data.id})" opacity="0.5" transform="rotate(15 50 50)" />`;
      svg += `<ellipse cx="45" cy="55" rx="20" ry="18" fill="#998899" opacity="0.6" />`;
      svg += `<ellipse cx="55" cy="45" rx="15" ry="12" fill="#bbaaaa" opacity="0.5" />`;
    }
    svg += `</svg>`;
    return svg;
  }
  getDiscoveries() {
    return this.getCurrentDiscoveries();
  }
  updateHeader() {
    const header = this.panelElement?.querySelector(".journal-header h2");
    if (!header)
      return;
    const observatoryName = this.currentObservatory === "northern" ? "Alpine Observatory" : "Andean Observatory";
    header.textContent = `Field Notes - ${observatoryName}`;
  }
  render() {
    const discoveries = this.getCurrentDiscoveries();
    for (const item of discoveries) {
      this.addCardToSet(item);
    }
  }
  destroy() {
    this.setSections.clear();
    if (this.listElement) {
      this.listElement.innerHTML = "";
    }
  }
}

// src/ui/ModalManager.ts
class ModalManager {
  activeModal = null;
  backdrop;
  container;
  constructor() {
    let backdrop = document.getElementById("modal-backdrop");
    if (!backdrop) {
      backdrop = document.createElement("div");
      backdrop.id = "modal-backdrop";
      backdrop.className = "hidden";
      document.body.appendChild(backdrop);
    }
    this.backdrop = backdrop;
    let container = document.getElementById("modal-container");
    if (!container) {
      container = document.createElement("div");
      container.id = "modal-container";
      document.body.appendChild(container);
    }
    this.container = container;
    this.backdrop.addEventListener("click", () => this.hide());
  }
  show(modalElement) {
    if (this.activeModal) {
      this.hide();
    }
    this.activeModal = modalElement;
    this.container.appendChild(modalElement);
    this.backdrop.classList.remove("hidden");
    requestAnimationFrame(() => {
      this.backdrop.classList.add("active");
      modalElement.classList.add("active");
    });
  }
  hide(onComplete) {
    if (!this.activeModal) {
      onComplete?.();
      return;
    }
    this.backdrop.classList.remove("active");
    if (this.activeModal) {
      this.activeModal.classList.remove("active");
    }
    setTimeout(() => {
      if (this.activeModal) {
        this.container.removeChild(this.activeModal);
        this.activeModal = null;
      }
      this.backdrop.classList.add("hidden");
      onComplete?.();
    }, 300);
  }
  isModalActive() {
    return this.activeModal !== null;
  }
}

// src/ui/PatternMatchModal.ts
class PatternMatchModal {
  constellation;
  data;
  canvas;
  ctx;
  modalElement;
  targetStars;
  clickedStars;
  decoyStars = [];
  onComplete;
  phase = "study";
  studyTimeRemaining;
  studyTimer = null;
  bounds;
  scale = 1;
  offsetX = 0;
  offsetY = 0;
  animationFrameId = null;
  animationStartTime = 0;
  clickHandler = null;
  animatingConnections = new Map;
  audioManager;
  constructor(constellation, onComplete, audioManager) {
    this.constellation = constellation;
    this.data = constellation.getData();
    this.onComplete = onComplete;
    this.audioManager = audioManager;
    this.studyTimeRemaining = this.calculateStudyTime();
    this.targetStars = new Set;
    for (let i = 0;i < this.data.stars.length; i++) {
      this.targetStars.add(i);
    }
    this.clickedStars = new Set;
    this.modalElement = this.createModalElement();
    this.canvas = this.modalElement.querySelector("canvas");
    const ctx = this.canvas.getContext("2d");
    if (!ctx)
      throw new Error("Could not get 2D context");
    this.ctx = ctx;
    this.calculateBounds();
    this.generateDecoyStars();
    this.startStudyPhase();
  }
  createModalElement() {
    const modal = document.createElement("div");
    modal.className = "pattern-match-modal";
    modal.innerHTML = `
      <div class="modal-frame">
        <div class="frame-corner tl"></div>
        <div class="frame-corner tr"></div>
        <div class="frame-corner bl"></div>
        <div class="frame-corner br"></div>

        <div class="modal-content">
          <div class="modal-header">
            <div class="header-line"></div>
            <h3 class="modal-title"></h3>
            <div class="header-line"></div>
          </div>

          <p class="modal-instruction"></p>

          <div class="countdown-container">
            <div class="hourglass">
              <div class="hourglass-top"></div>
              <div class="hourglass-bottom"></div>
              <div class="sand"></div>
            </div>
            <span class="countdown-text"></span>
          </div>

          <canvas width="600" height="300"></canvas>

          <div class="progress-container hidden">
            <div class="progress-text"></div>
          </div>
        </div>
      </div>
    `;
    return modal;
  }
  calculateStudyTime() {
    const starCount = this.data.stars.length;
    return Math.max(5, 5 + (starCount - 10) * 0.3);
  }
  getConnectionKey(idx1, idx2) {
    return idx1 < idx2 ? `${idx1}-${idx2}` : `${idx2}-${idx1}`;
  }
  calculateBounds() {
    let minX = Infinity, maxX = -Infinity;
    let minY = Infinity, maxY = -Infinity;
    for (const star of this.data.stars) {
      minX = Math.min(minX, star.x);
      maxX = Math.max(maxX, star.x);
      minY = Math.min(minY, star.y);
      maxY = Math.max(maxY, star.y);
    }
    const width = maxX - minX;
    const height = maxY - minY;
    this.bounds = { minX, maxX, minY, maxY, width, height };
    const targetWidth = this.canvas.width * 0.8;
    const targetHeight = this.canvas.height * 0.8;
    this.scale = Math.min(targetWidth / width, targetHeight / height);
    this.offsetX = (this.canvas.width - width * this.scale) / 2;
    this.offsetY = (this.canvas.height - height * this.scale) / 2;
  }
  worldToCanvas(x, y) {
    return {
      x: (x - this.bounds.minX) * this.scale + this.offsetX,
      y: (y - this.bounds.minY) * this.scale + this.offsetY
    };
  }
  generateDecoyStars() {
    const targetCount = this.targetStars.size;
    const decoyCount = Math.floor(targetCount * 2.5);
    const padding = 50;
    const minX = padding;
    const maxX = this.canvas.width - padding;
    const minY = padding;
    const maxY = this.canvas.height - padding;
    const minDistance = 25;
    for (let i = 0;i < decoyCount; i++) {
      let attempts = 0;
      let validPosition = false;
      let x = 0, y = 0;
      while (!validPosition && attempts < 50) {
        x = minX + Math.random() * (maxX - minX);
        y = minY + Math.random() * (maxY - minY);
        validPosition = true;
        for (const star of this.data.stars) {
          const starPos = this.worldToCanvas(star.x, star.y);
          const dx = x - starPos.x;
          const dy = y - starPos.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < minDistance) {
            validPosition = false;
            break;
          }
        }
        attempts++;
      }
      if (validPosition) {
        this.decoyStars.push({ x, y });
      }
    }
  }
  startStudyPhase() {
    this.phase = "study";
    this.updateInstructions();
    this.renderStudyPhase();
    const modalContent = this.modalElement.querySelector(".modal-content");
    modalContent.classList.add("phase-study");
    this.studyTimer = window.setInterval(() => {
      this.studyTimeRemaining -= 0.1;
      this.updateCountdown();
      const countdownContainer = this.modalElement.querySelector(".countdown-container");
      if (this.studyTimeRemaining <= 2 && this.studyTimeRemaining > 0) {
        countdownContainer.classList.add("urgent");
      }
      if (this.studyTimeRemaining <= 0) {
        this.startChallengePhase();
      }
    }, 100);
  }
  startAnimationLoop() {
    this.animationStartTime = performance.now();
    const animate = () => {
      this.renderChallengePhase();
      this.animationFrameId = requestAnimationFrame(animate);
    };
    this.animationFrameId = requestAnimationFrame(animate);
  }
  startChallengePhase() {
    if (this.studyTimer) {
      clearInterval(this.studyTimer);
      this.studyTimer = null;
    }
    const modalContent = this.modalElement.querySelector(".modal-content");
    modalContent.classList.add("phase-transitioning");
    setTimeout(() => {
      this.phase = "challenge";
      this.updateInstructions();
      this.renderChallengePhase();
      modalContent.classList.remove("phase-study", "phase-transitioning");
      modalContent.classList.add("phase-challenge");
      this.clickHandler = this.handleClick.bind(this);
      this.canvas.addEventListener("click", this.clickHandler);
      this.startAnimationLoop();
    }, 350);
  }
  updateInstructions() {
    const titleEl = this.modalElement.querySelector(".modal-title");
    const instructionEl = this.modalElement.querySelector(".modal-instruction");
    if (this.phase === "study") {
      titleEl.textContent = this.data.name;
      instructionEl.textContent = "Study this pattern carefully...";
    } else {
      titleEl.textContent = "Reconstruct the Pattern";
      instructionEl.textContent = "Click the stars to reconstruct the constellation";
      this.modalElement.querySelector(".countdown-container").classList.add("hidden");
      this.modalElement.querySelector(".progress-container").classList.remove("hidden");
      this.updateProgress();
    }
  }
  updateCountdown() {
    const countdownText = this.modalElement.querySelector(".countdown-text");
    countdownText.textContent = `${Math.ceil(this.studyTimeRemaining)}s`;
    const progress = 1 - this.studyTimeRemaining / 5;
    const sand = this.modalElement.querySelector(".sand");
    if (sand) {
      sand.style.setProperty("--progress", progress.toString());
    }
  }
  updateProgress() {
    const progressText = this.modalElement.querySelector(".progress-text");
    const clicked = this.clickedStars.size;
    const total = this.targetStars.size;
    const percent = clicked / total * 100;
    progressText.textContent = `${clicked} of ${total} stars identified`;
    const progressContainer = this.modalElement.querySelector(".progress-container");
    if (progressContainer) {
      progressContainer.style.setProperty("--progress-percent", `${percent}%`);
    }
  }
  handleClick(event) {
    const rect = this.canvas.getBoundingClientRect();
    const canvasX = event.clientX - rect.left;
    const canvasY = event.clientY - rect.top;
    const clickRadius = 15;
    let clicked = false;
    for (let i = 0;i < this.data.stars.length; i++) {
      if (this.clickedStars.has(i))
        continue;
      const star = this.data.stars[i];
      const starPos = this.worldToCanvas(star.x, star.y);
      const dx = canvasX - starPos.x;
      const dy = canvasY - starPos.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < clickRadius) {
        this.clickedStars.add(i);
        this.onStarClicked(i, true);
        clicked = true;
        break;
      }
    }
    if (!clicked) {
      this.onStarClicked(-1, false);
    }
  }
  onStarClicked(starIndex, correct) {
    if (correct) {
      if (this.audioManager) {
        const noteIndex = this.clickedStars.size % 5;
        this.audioManager.playStarConnectionSound(noteIndex, 5);
      }
      this.canvas.classList.add("star-clicked");
      setTimeout(() => {
        this.canvas.classList.remove("star-clicked");
      }, 300);
      for (const [idx1, idx2] of this.data.connections) {
        if ((idx1 === starIndex || idx2 === starIndex) && this.clickedStars.has(idx1) && this.clickedStars.has(idx2)) {
          const key = this.getConnectionKey(idx1, idx2);
          if (!this.animatingConnections.has(key)) {
            this.animatingConnections.set(key, 0);
          }
        }
      }
      this.updateProgress();
      if (this.checkComplete()) {
        this.completeChallenge();
      }
    } else {
      if (this.audioManager) {
        this.playErrorTone();
      }
      this.flashIncorrect();
    }
  }
  playErrorTone() {
    if (!this.audioManager || !this.audioManager.audioContext)
      return;
    const ctx = this.audioManager.audioContext;
    const masterGain = this.audioManager.masterGain;
    if (!ctx || !masterGain)
      return;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.value = 150;
    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.03, now + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
    osc.connect(gain);
    gain.connect(masterGain);
    osc.start(now);
    osc.stop(now + 0.15);
  }
  flashIncorrect() {
    this.canvas.style.filter = "brightness(1.3) sepia(0.3)";
    setTimeout(() => {
      this.canvas.style.filter = "none";
    }, 150);
  }
  checkComplete() {
    return this.clickedStars.size === this.targetStars.size;
  }
  completeChallenge() {
    const instructionEl = this.modalElement.querySelector(".modal-instruction");
    instructionEl.textContent = "Pattern Complete!";
    instructionEl.classList.add("pattern-complete");
    setTimeout(() => {
      this.onComplete();
    }, 1500);
  }
  renderStudyPhase() {
    const ctx = this.ctx;
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    ctx.save();
    ctx.strokeStyle = "rgba(212, 168, 75, 0.8)";
    ctx.lineWidth = 2;
    ctx.shadowColor = "rgba(212, 168, 75, 0.5)";
    ctx.shadowBlur = 8;
    for (const [idx1, idx2] of this.data.connections) {
      const star1 = this.data.stars[idx1];
      const star2 = this.data.stars[idx2];
      const pos1 = this.worldToCanvas(star1.x, star1.y);
      const pos2 = this.worldToCanvas(star2.x, star2.y);
      ctx.beginPath();
      ctx.moveTo(pos1.x, pos1.y);
      ctx.lineTo(pos2.x, pos2.y);
      ctx.stroke();
    }
    for (const star of this.data.stars) {
      const size = 3 + star.brightness * 2;
      const pos = this.worldToCanvas(star.x, star.y);
      ctx.shadowColor = "rgba(255, 255, 255, 0.8)";
      ctx.shadowBlur = 12;
      ctx.fillStyle = "#ffffff";
      ctx.beginPath();
      ctx.arc(pos.x, pos.y, size, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
  }
  renderChallengePhase() {
    const ctx = this.ctx;
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    ctx.save();
    const elapsedTime = performance.now() - this.animationStartTime;
    const pulseIntensity = Math.sin(elapsedTime / 1000) * 0.15 + 0.85;
    for (const [idx1, idx2] of this.data.connections) {
      if (this.clickedStars.has(idx1) && this.clickedStars.has(idx2)) {
        const key = this.getConnectionKey(idx1, idx2);
        const star1 = this.data.stars[idx1];
        const star2 = this.data.stars[idx2];
        const pos1 = this.worldToCanvas(star1.x, star1.y);
        const pos2 = this.worldToCanvas(star2.x, star2.y);
        let progress = this.animatingConnections.get(key);
        if (progress !== undefined && progress < 1) {
          progress = Math.min(1, progress + 0.05);
          this.animatingConnections.set(key, progress);
          ctx.strokeStyle = "rgba(212, 168, 75, 0.9)";
          ctx.lineWidth = 3;
          ctx.shadowColor = "rgba(212, 168, 75, 0.8)";
          ctx.shadowBlur = 12;
          const dx = pos2.x - pos1.x;
          const dy = pos2.y - pos1.y;
          ctx.beginPath();
          ctx.moveTo(pos1.x, pos1.y);
          ctx.lineTo(pos1.x + dx * progress, pos1.y + dy * progress);
          ctx.stroke();
        } else {
          ctx.strokeStyle = "rgba(212, 168, 75, 0.6)";
          ctx.lineWidth = 2;
          ctx.shadowColor = "rgba(212, 168, 75, 0.4)";
          ctx.shadowBlur = 8;
          ctx.beginPath();
          ctx.moveTo(pos1.x, pos1.y);
          ctx.lineTo(pos2.x, pos2.y);
          ctx.stroke();
        }
      }
    }
    ctx.shadowBlur = 0;
    ctx.fillStyle = "rgba(200, 200, 200, 0.3)";
    for (const decoy of this.decoyStars) {
      ctx.beginPath();
      ctx.arc(decoy.x, decoy.y, 2, 0, Math.PI * 2);
      ctx.fill();
    }
    for (let i = 0;i < this.data.stars.length; i++) {
      const star = this.data.stars[i];
      const isClicked = this.clickedStars.has(i);
      const pos = this.worldToCanvas(star.x, star.y);
      if (isClicked) {
        const size = 3 + star.brightness * 2;
        ctx.shadowColor = "rgba(255, 255, 255, 0.8)";
        ctx.shadowBlur = 12;
        ctx.fillStyle = "#ffffff";
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, size, 0, Math.PI * 2);
        ctx.fill();
      } else {
        const baseSize = 2.5;
        const size = baseSize * pulseIntensity;
        const alpha = 0.5 * pulseIntensity;
        ctx.shadowBlur = 0;
        ctx.fillStyle = `rgba(200, 200, 200, ${alpha})`;
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, size, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    ctx.restore();
  }
  render() {
    return this.modalElement;
  }
  destroy() {
    if (this.studyTimer) {
      clearInterval(this.studyTimer);
    }
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
    if (this.clickHandler) {
      this.canvas.removeEventListener("click", this.clickHandler);
      this.clickHandler = null;
    }
  }
}

// src/ui/BaseDSOModal.ts
class BaseDSOModal {
  celestialObject;
  onComplete;
  audioManager;
  canvas;
  ctx;
  modalElement;
  phase = "study";
  studyTimeRemaining;
  studyTimeDuration;
  studyTimer = null;
  constructor(celestialObject, onComplete, studyDuration = 5, audioManager) {
    this.celestialObject = celestialObject;
    this.onComplete = onComplete;
    this.studyTimeDuration = studyDuration;
    this.studyTimeRemaining = studyDuration;
    this.audioManager = audioManager;
    this.modalElement = this.createModalElement();
    this.canvas = this.modalElement.querySelector("canvas");
    const ctx = this.canvas.getContext("2d");
    if (!ctx)
      throw new Error("Could not get 2D context");
    this.ctx = ctx;
    this.startStudyPhase();
  }
  createModalElement() {
    const modal = document.createElement("div");
    modal.className = "dso-modal";
    modal.innerHTML = `
      <div class="modal-frame">
        <div class="frame-corner tl"></div>
        <div class="frame-corner tr"></div>
        <div class="frame-corner bl"></div>
        <div class="frame-corner br"></div>

        <div class="modal-content">
          <div class="modal-header">
            <div class="header-line"></div>
            <h3 class="modal-title">${this.celestialObject.name}</h3>
            <div class="header-line"></div>
          </div>

          <p class="modal-instruction"></p>

          <div class="countdown-container">
            <div class="hourglass">
              <div class="hourglass-top"></div>
              <div class="hourglass-bottom"></div>
              <div class="sand"></div>
            </div>
            <span class="countdown-text"></span>
          </div>

          <canvas width="600" height="300"></canvas>

          <div class="challenge-container hidden"></div>
        </div>
      </div>
    `;
    return modal;
  }
  startStudyPhase() {
    this.phase = "study";
    this.updateInstructions();
    this.renderObjectOnCanvas();
    const modalContent = this.modalElement.querySelector(".modal-content");
    modalContent.classList.add("phase-study");
    this.studyTimer = window.setInterval(() => {
      this.studyTimeRemaining -= 0.1;
      this.updateCountdown();
      const countdownContainer = this.modalElement.querySelector(".countdown-container");
      if (this.studyTimeRemaining <= 2 && this.studyTimeRemaining > 0) {
        countdownContainer.classList.add("urgent");
      }
      if (this.studyTimeRemaining <= 0) {
        this.startChallengePhase();
      }
    }, 100);
  }
  startChallengePhase() {
    if (this.studyTimer) {
      clearInterval(this.studyTimer);
      this.studyTimer = null;
    }
    const modalContent = this.modalElement.querySelector(".modal-content");
    modalContent.classList.add("phase-transitioning");
    setTimeout(() => {
      this.phase = "challenge";
      this.updateInstructions();
      const challengeContainer = this.modalElement.querySelector(".challenge-container");
      challengeContainer.innerHTML = "";
      challengeContainer.appendChild(this.createChallengeContent());
      challengeContainer.classList.remove("hidden");
      modalContent.classList.remove("phase-study", "phase-transitioning");
      modalContent.classList.add("phase-challenge");
      this.modalElement.querySelector(".countdown-container").classList.add("hidden");
    }, 350);
  }
  updateInstructions() {
    const instructionEl = this.modalElement.querySelector(".modal-instruction");
    if (this.phase === "study") {
      instructionEl.textContent = this.getStudyInstruction();
    } else {
      instructionEl.textContent = this.getChallengeInstruction();
    }
  }
  updateCountdown() {
    const countdownText = this.modalElement.querySelector(".countdown-text");
    countdownText.textContent = `${Math.ceil(this.studyTimeRemaining)}s`;
    const progress = 1 - this.studyTimeRemaining / this.studyTimeDuration;
    const sand = this.modalElement.querySelector(".sand");
    if (sand) {
      sand.style.setProperty("--progress", progress.toString());
    }
  }
  renderObjectOnCanvas() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    const wasDiscovered = this.celestialObject.isDiscovered;
    this.celestialObject.isDiscovered = true;
    this.celestialObject.render(this.ctx, this.celestialObject.x, this.celestialObject.y, this.canvas.width, this.canvas.height);
    this.celestialObject.isDiscovered = wasDiscovered;
  }
  playCorrectSound() {
    if (this.audioManager) {
      this.audioManager.playStarConnectionSound(0, 1);
    }
  }
  playErrorTone() {
    if (!this.audioManager || !this.audioManager.audioContext)
      return;
    const ctx = this.audioManager.audioContext;
    const masterGain = this.audioManager.masterGain;
    if (!ctx || !masterGain)
      return;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.value = 150;
    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.03, now + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
    osc.connect(gain);
    gain.connect(masterGain);
    osc.start(now);
    osc.stop(now + 0.15);
  }
  flashIncorrect() {
    this.canvas.style.filter = "brightness(1.3) sepia(0.3)";
    setTimeout(() => {
      this.canvas.style.filter = "none";
    }, 150);
  }
  completeChallenge() {
    const instructionEl = this.modalElement.querySelector(".modal-instruction");
    instructionEl.textContent = "Discovery Complete!";
    instructionEl.classList.add("pattern-complete");
    if (this.audioManager) {
      this.audioManager.playCosmicFlash();
    }
    setTimeout(() => {
      this.onComplete();
    }, 1500);
  }
  render() {
    return this.modalElement;
  }
  destroy() {
    if (this.studyTimer) {
      clearInterval(this.studyTimer);
    }
  }
}

// src/utils/array.ts
function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1;i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// src/ui/NebulaFeatureModal.ts
class NebulaFeatureModal extends BaseDSOModal {
  nebula;
  challengeStatements = [];
  constructor(nebula, onComplete, audioManager) {
    super(nebula, onComplete, 5, audioManager);
    this.nebula = nebula;
  }
  getStudyInstruction() {
    return "Study this nebula carefully...";
  }
  getChallengeInstruction() {
    return "Which features did you observe?";
  }
  generateChallengeStatements() {
    const data = this.nebula.getData();
    const features = data.features || [];
    if (features.length === 0) {
      setTimeout(() => this.completeChallenge(), 100);
      return [];
    }
    const trueFeatures = features.filter((f) => f.isPresent);
    const falseFeatures = features.filter((f) => !f.isPresent);
    const selectedTrue = shuffleArray([...trueFeatures]).slice(0, Math.min(3, trueFeatures.length));
    const selectedFalse = shuffleArray([...falseFeatures]).slice(0, Math.min(2, falseFeatures.length));
    const combined = [...selectedTrue, ...selectedFalse];
    const shuffled = shuffleArray(combined);
    return shuffled.map((feature) => ({ feature, answer: null }));
  }
  createChallengeContent() {
    const container = document.createElement("div");
    container.className = "nebula-feature-challenge";
    this.challengeStatements = this.generateChallengeStatements();
    if (this.challengeStatements.length === 0) {
      container.innerHTML = '<p class="no-features">Processing discovery...</p>';
      return container;
    }
    const subheading = document.createElement("p");
    subheading.className = "challenge-subheading";
    subheading.textContent = "Mark each observation as present or absent:";
    container.appendChild(subheading);
    const checklist = document.createElement("div");
    checklist.className = "feature-checklist";
    this.challengeStatements.forEach((statement, index) => {
      const item = this.createFeatureItem(statement, index);
      checklist.appendChild(item);
    });
    container.appendChild(checklist);
    const submitBtn = document.createElement("button");
    submitBtn.className = "submit-btn";
    submitBtn.textContent = "Submit Observations";
    submitBtn.onclick = () => this.handleSubmit();
    container.appendChild(submitBtn);
    return container;
  }
  createFeatureItem(statement, index) {
    const item = document.createElement("div");
    item.className = "feature-item";
    item.dataset.index = index.toString();
    const description = document.createElement("span");
    description.className = "feature-text";
    description.textContent = statement.feature.description;
    item.appendChild(description);
    const toggleGroup = document.createElement("div");
    toggleGroup.className = "toggle-group";
    const trueBtn = document.createElement("button");
    trueBtn.className = "toggle-btn toggle-true";
    trueBtn.textContent = "PRESENT";
    trueBtn.dataset.value = "true";
    trueBtn.onclick = () => this.handleToggle(index, true, item);
    toggleGroup.appendChild(trueBtn);
    const falseBtn = document.createElement("button");
    falseBtn.className = "toggle-btn toggle-false";
    falseBtn.textContent = "ABSENT";
    falseBtn.dataset.value = "false";
    falseBtn.onclick = () => this.handleToggle(index, false, item);
    toggleGroup.appendChild(falseBtn);
    item.appendChild(toggleGroup);
    return item;
  }
  handleToggle(index, value, itemElement) {
    this.challengeStatements[index].answer = value;
    const buttons = itemElement.querySelectorAll(".toggle-btn");
    buttons.forEach((btn) => {
      const btnValue = btn.dataset.value === "true";
      if (btnValue === value) {
        btn.classList.add("selected");
      } else {
        btn.classList.remove("selected");
      }
    });
    this.playCorrectSound();
  }
  handleSubmit() {
    const allAnswered = this.challengeStatements.every((s) => s.answer !== null);
    if (!allAnswered) {
      this.flashUnansweredItems();
      return;
    }
    const allCorrect = this.challengeStatements.every((s) => s.answer === s.feature.isPresent);
    if (allCorrect) {
      this.playCorrectSound();
      setTimeout(() => {
        this.completeChallenge();
      }, 600);
    } else {
      this.flashIncorrectAnswers();
    }
  }
  flashUnansweredItems() {
    const items = this.modalElement.querySelectorAll(".feature-item");
    items.forEach((item, index) => {
      if (this.challengeStatements[index].answer === null) {
        item.classList.add("unanswered-flash");
        setTimeout(() => {
          item.classList.remove("unanswered-flash");
        }, 400);
      }
    });
    this.playErrorTone();
  }
  flashIncorrectAnswers() {
    const items = this.modalElement.querySelectorAll(".feature-item");
    items.forEach((item, index) => {
      const statement = this.challengeStatements[index];
      if (statement.answer !== null && statement.answer !== statement.feature.isPresent) {
        item.classList.add("incorrect-flash");
        setTimeout(() => {
          item.classList.remove("incorrect-flash");
        }, 800);
      }
    });
    this.playErrorTone();
  }
}

// src/ui/ClusterMatchModal.ts
class ClusterMatchModal extends BaseDSOModal {
  targetCluster;
  allClusters;
  options = [];
  constructor(cluster, allClusters, onComplete, audioManager) {
    super(cluster, onComplete, 4, audioManager);
    this.targetCluster = cluster;
    this.allClusters = allClusters;
    this.generateDecoys();
    if (this.options.length < 2) {
      setTimeout(() => this.completeChallenge(), 100);
    }
  }
  getStudyInstruction() {
    return "Remember this cluster's appearance...";
  }
  getChallengeInstruction() {
    return "Which cluster did you just observe?";
  }
  generateDecoys() {
    const targetData = this.targetCluster.getData();
    const candidates = this.allClusters.filter((c) => c.id !== targetData.id && c.getData().observatory === targetData.observatory);
    if (candidates.length === 0) {
      this.options = [this.targetCluster];
      return;
    }
    const scored = candidates.map((cluster) => ({
      cluster,
      score: this.calculateDissimilarity(targetData, cluster.getData())
    }));
    scored.sort((a, b) => b.score - a.score);
    const decoys = scored.slice(0, Math.min(3, scored.length)).map((s) => s.cluster);
    this.options = shuffleArray([this.targetCluster, ...decoys]);
  }
  calculateDissimilarity(target, candidate) {
    let score = 0;
    score += Math.abs(target.starCount - candidate.starCount);
    if (target.color !== candidate.color) {
      score += 50;
    }
    score += Math.abs(target.radius - candidate.radius);
    return score;
  }
  createChallengeContent() {
    const container = document.createElement("div");
    container.className = "cluster-match-challenge";
    if (this.options.length < 2) {
      container.innerHTML = '<p class="insufficient-clusters">Processing discovery...</p>';
      return container;
    }
    const subheading = document.createElement("p");
    subheading.className = "challenge-subheading";
    subheading.textContent = "Select the cluster you observed:";
    container.appendChild(subheading);
    const optionsGrid = document.createElement("div");
    optionsGrid.className = "cluster-options";
    this.options.forEach((cluster) => {
      const option = this.createClusterOption(cluster);
      optionsGrid.appendChild(option);
    });
    container.appendChild(optionsGrid);
    return container;
  }
  createClusterOption(cluster) {
    const option = document.createElement("div");
    option.className = "cluster-option";
    option.dataset.clusterId = cluster.id;
    const canvas = document.createElement("canvas");
    canvas.width = 200;
    canvas.height = 200;
    option.appendChild(canvas);
    this.renderClusterOnCanvas(canvas, cluster);
    option.onclick = () => this.handleOptionClick(cluster.id, option);
    return option;
  }
  renderClusterOnCanvas(canvas, cluster) {
    const ctx = canvas.getContext("2d");
    if (!ctx)
      return;
    ctx.fillStyle = "rgba(5, 8, 20, 1)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    const wasDiscovered = cluster.isDiscovered;
    cluster.isDiscovered = true;
    cluster.render(ctx, cluster.x, cluster.y, canvas.width, canvas.height);
    cluster.isDiscovered = wasDiscovered;
  }
  handleOptionClick(clusterId, optionElement) {
    const targetId = this.targetCluster.getData().id;
    if (clusterId === targetId) {
      optionElement.classList.add("correct");
      this.playCorrectSound();
      setTimeout(() => {
        this.completeChallenge();
      }, 600);
    } else {
      optionElement.classList.add("incorrect");
      this.playErrorTone();
      this.flashIncorrect();
      setTimeout(() => {
        optionElement.classList.remove("incorrect");
      }, 400);
    }
  }
}

// src/ui/GalaxyStructureModal.ts
class GalaxyStructureModal extends BaseDSOModal {
  galaxy;
  selectedType = null;
  featureStatements = [];
  constructor(galaxy, onComplete, audioManager) {
    super(galaxy, onComplete, 5, audioManager);
    this.galaxy = galaxy;
  }
  getStudyInstruction() {
    return "Observe this galaxy's structure...";
  }
  getChallengeInstruction() {
    return "Classify and identify features";
  }
  generateFeatureStatements() {
    const data = this.galaxy.getData();
    const features = data.features || [];
    if (features.length === 0) {
      return [];
    }
    const shuffled = shuffleArray([...features]);
    const selected = shuffled.slice(0, Math.min(3, shuffled.length));
    return selected.map((feature) => ({ feature, answer: null }));
  }
  createChallengeContent() {
    const container = document.createElement("div");
    container.className = "galaxy-structure-challenge";
    this.featureStatements = this.generateFeatureStatements();
    const typeSection = this.createTypeSection();
    container.appendChild(typeSection);
    if (this.featureStatements.length > 0) {
      const featureSection = this.createFeatureSection();
      container.appendChild(featureSection);
    }
    const submitBtn = document.createElement("button");
    submitBtn.className = "submit-btn";
    submitBtn.textContent = "Submit Classification";
    submitBtn.onclick = () => this.handleSubmit();
    container.appendChild(submitBtn);
    return container;
  }
  createTypeSection() {
    const section = document.createElement("div");
    section.className = "challenge-section type-section";
    const header = document.createElement("h4");
    header.className = "section-header";
    header.textContent = "Morphological Classification";
    section.appendChild(header);
    const question = document.createElement("p");
    question.className = "section-question";
    question.textContent = "What type of galaxy is this?";
    section.appendChild(question);
    const typeOptions = document.createElement("div");
    typeOptions.className = "type-options";
    const types = [
      { value: "spiral", label: "Spiral" },
      { value: "elliptical", label: "Elliptical" },
      { value: "irregular", label: "Irregular" }
    ];
    types.forEach((type) => {
      const btn = document.createElement("button");
      btn.className = "type-btn";
      btn.textContent = type.label;
      btn.dataset.type = type.value;
      btn.onclick = () => this.handleTypeSelection(type.value, typeOptions);
      typeOptions.appendChild(btn);
    });
    section.appendChild(typeOptions);
    return section;
  }
  createFeatureSection() {
    const section = document.createElement("div");
    section.className = "challenge-section feature-section";
    const header = document.createElement("h4");
    header.className = "section-header";
    header.textContent = "Structural Features";
    section.appendChild(header);
    const question = document.createElement("p");
    question.className = "section-question";
    question.textContent = "Which features did you observe?";
    section.appendChild(question);
    const checklist = document.createElement("div");
    checklist.className = "feature-checklist";
    this.featureStatements.forEach((statement, index) => {
      const item = this.createFeatureItem(statement, index);
      checklist.appendChild(item);
    });
    section.appendChild(checklist);
    return section;
  }
  createFeatureItem(statement, index) {
    const item = document.createElement("div");
    item.className = "feature-item";
    item.dataset.index = index.toString();
    const description = document.createElement("span");
    description.className = "feature-text";
    description.textContent = statement.feature.description;
    item.appendChild(description);
    const toggleGroup = document.createElement("div");
    toggleGroup.className = "toggle-group";
    const trueBtn = document.createElement("button");
    trueBtn.className = "toggle-btn toggle-true";
    trueBtn.textContent = "YES";
    trueBtn.dataset.value = "true";
    trueBtn.onclick = () => this.handleFeatureToggle(index, true, item);
    toggleGroup.appendChild(trueBtn);
    const falseBtn = document.createElement("button");
    falseBtn.className = "toggle-btn toggle-false";
    falseBtn.textContent = "NO";
    falseBtn.dataset.value = "false";
    falseBtn.onclick = () => this.handleFeatureToggle(index, false, item);
    toggleGroup.appendChild(falseBtn);
    item.appendChild(toggleGroup);
    return item;
  }
  handleTypeSelection(type, container) {
    this.selectedType = type;
    const buttons = container.querySelectorAll(".type-btn");
    buttons.forEach((btn) => {
      const btnType = btn.dataset.type;
      if (btnType === type) {
        btn.classList.add("selected");
      } else {
        btn.classList.remove("selected");
      }
    });
    this.playCorrectSound();
  }
  handleFeatureToggle(index, value, itemElement) {
    this.featureStatements[index].answer = value;
    const buttons = itemElement.querySelectorAll(".toggle-btn");
    buttons.forEach((btn) => {
      const btnValue = btn.dataset.value === "true";
      if (btnValue === value) {
        btn.classList.add("selected");
      } else {
        btn.classList.remove("selected");
      }
    });
    this.playCorrectSound();
  }
  handleSubmit() {
    if (this.selectedType === null) {
      this.flashTypeSection();
      return;
    }
    if (this.featureStatements.length > 0) {
      const allAnswered = this.featureStatements.every((s) => s.answer !== null);
      if (!allAnswered) {
        this.flashUnansweredFeatures();
        return;
      }
    }
    const galaxyData = this.galaxy.getData();
    const typeCorrect = this.selectedType === galaxyData.galaxyType;
    const featuresCorrect = this.featureStatements.every((s) => s.answer === s.feature.isPresent);
    if (typeCorrect && featuresCorrect) {
      this.playCorrectSound();
      setTimeout(() => {
        this.completeChallenge();
      }, 600);
    } else {
      this.flashIncorrectAnswers(typeCorrect);
    }
  }
  flashTypeSection() {
    const typeSection = this.modalElement.querySelector(".type-section");
    if (typeSection) {
      typeSection.classList.add("unanswered-flash");
      setTimeout(() => {
        typeSection.classList.remove("unanswered-flash");
      }, 400);
    }
    this.playErrorTone();
  }
  flashUnansweredFeatures() {
    const items = this.modalElement.querySelectorAll(".feature-item");
    items.forEach((item, index) => {
      if (this.featureStatements[index].answer === null) {
        item.classList.add("unanswered-flash");
        setTimeout(() => {
          item.classList.remove("unanswered-flash");
        }, 400);
      }
    });
    this.playErrorTone();
  }
  flashIncorrectAnswers(typeCorrect) {
    if (!typeCorrect) {
      const typeSection = this.modalElement.querySelector(".type-section");
      if (typeSection) {
        typeSection.classList.add("incorrect-flash");
        setTimeout(() => {
          typeSection.classList.remove("incorrect-flash");
        }, 800);
      }
    }
    const items = this.modalElement.querySelectorAll(".feature-item");
    items.forEach((item, index) => {
      const statement = this.featureStatements[index];
      if (statement.answer !== null && statement.answer !== statement.feature.isPresent) {
        item.classList.add("incorrect-flash");
        setTimeout(() => {
          item.classList.remove("incorrect-flash");
        }, 800);
      }
    });
    this.playErrorTone();
  }
}

// src/audio/AudioManager.ts
var AMBIENT_CONFIG = {
  AMBIENT_MASTER_GAIN: 0.22,
  FADE_IN_TIME: 3,
  FADE_OUT_TIME: 2,
  SUB_BASS: {
    FREQUENCY: 55,
    GAIN: 0.025,
    LFO_RATE: 0.008,
    LFO_DEPTH: 3
  },
  DRONE: {
    FREQUENCIES: [130.81, 196, 261.63],
    DETUNE_HZ: [0.7, 0.5, 0.3],
    GAINS: [0.018, 0.015, 0.012],
    FILTER_FREQ: 500,
    FILTER_Q: 0.5,
    FILTER_LFO_RATE: 0.025,
    FILTER_LFO_MIN: 400,
    FILTER_LFO_MAX: 800
  },
  TEXTURE: {
    GAIN: 0.008,
    HPF_FREQ: 800,
    BPF_FREQ_LEFT: 1800,
    BPF_FREQ_RIGHT: 2200,
    BPF_Q: 0.3,
    LFO_RATE: 0.015,
    LFO_DEPTH: 400
  },
  SHIMMER: {
    FREQUENCIES: [1046.5, 1318.5, 1568, 2093],
    GAIN_MIN: 0.004,
    GAIN_MAX: 0.012,
    FADE_TIME_MIN: 5,
    FADE_TIME_MAX: 10,
    HOLD_TIME_MIN: 3,
    HOLD_TIME_MAX: 12,
    MAX_CONCURRENT: 3
  },
  BUSES: {
    SUB_BASS: 0.25,
    DRONE: 0.6,
    TEXTURE: 0.5,
    SHIMMER: 0.45
  },
  SPATIAL: {
    DELAY_LEFT: 1.2,
    DELAY_RIGHT: 1.7,
    FEEDBACK_LEFT: 0.15,
    FEEDBACK_RIGHT: 0.12,
    WET_MIX: 0.08,
    DELAY_LPF: 2000
  },
  MASTER_HPF: 20,
  MASTER_LPF: 8000
};

class AudioManager {
  audioContext = null;
  masterGain = null;
  ambientGain = null;
  ambientNodes = [];
  isAmbientPlaying = false;
  initialized = false;
  subBassOsc = null;
  subBassGain = null;
  subBassLFO = null;
  subBassLFOGain = null;
  droneOscillators = [];
  droneGains = [];
  droneFilter = null;
  droneLFO = null;
  droneLFOGain = null;
  textureSource = null;
  textureGainNode = null;
  textureLFO = null;
  textureFiltersLeft = [];
  textureFiltersRight = [];
  shimmerOscillators = new Map;
  shimmerGains = new Map;
  shimmerPanners = new Map;
  shimmerTimeouts = [];
  activeShimmerCount = 0;
  subBassBus = null;
  droneBus = null;
  textureBus = null;
  shimmerBus = null;
  ambientMaster = null;
  ambientHPF = null;
  ambientLPF = null;
  spatialMerger = null;
  delayLeft = null;
  delayRight = null;
  delayFeedbackLeft = null;
  delayFeedbackRight = null;
  delayWetGain = null;
  delayFilterLeft = null;
  delayFilterRight = null;
  buildUpOscillators = [];
  buildUpGains = [];
  isBuildUpPlaying = false;
  pentatonicScale = [
    523.25,
    587.33,
    659.25,
    783.99,
    880,
    1046.5
  ];
  constructor() {
    this.initOnInteraction();
  }
  initOnInteraction() {
    const initAudio = () => {
      this.ensureInitialized();
      document.removeEventListener("click", initAudio);
      document.removeEventListener("keydown", initAudio);
      document.removeEventListener("mousemove", initAudio);
    };
    document.addEventListener("click", initAudio);
    document.addEventListener("keydown", initAudio);
    document.addEventListener("mousemove", initAudio);
  }
  ensureInitialized() {
    if (this.initialized && this.audioContext) {
      if (this.audioContext.state === "suspended") {
        this.audioContext.resume();
      }
      return true;
    }
    try {
      this.audioContext = new AudioContext;
      this.masterGain = this.audioContext.createGain();
      this.masterGain.gain.value = 0.3;
      this.masterGain.connect(this.audioContext.destination);
      this.ambientGain = this.audioContext.createGain();
      this.ambientGain.gain.value = 0;
      this.ambientGain.connect(this.masterGain);
      this.initialized = true;
      console.log("\uD83D\uDD0A Audio initialized, state:", this.audioContext.state);
      if (this.audioContext.state === "suspended") {
        this.audioContext.resume();
      }
      return true;
    } catch (e) {
      console.warn("Audio initialization failed:", e);
      return false;
    }
  }
  createAmbientBuses() {
    if (!this.audioContext || !this.masterGain)
      return;
    const ctx = this.audioContext;
    this.subBassBus = ctx.createGain();
    this.subBassBus.gain.value = AMBIENT_CONFIG.BUSES.SUB_BASS;
    this.droneBus = ctx.createGain();
    this.droneBus.gain.value = AMBIENT_CONFIG.BUSES.DRONE;
    this.textureBus = ctx.createGain();
    this.textureBus.gain.value = AMBIENT_CONFIG.BUSES.TEXTURE;
    this.shimmerBus = ctx.createGain();
    this.shimmerBus.gain.value = AMBIENT_CONFIG.BUSES.SHIMMER;
    this.ambientHPF = ctx.createBiquadFilter();
    this.ambientHPF.type = "highpass";
    this.ambientHPF.frequency.value = AMBIENT_CONFIG.MASTER_HPF;
    this.ambientLPF = ctx.createBiquadFilter();
    this.ambientLPF.type = "lowpass";
    this.ambientLPF.frequency.value = AMBIENT_CONFIG.MASTER_LPF;
    this.ambientMaster = ctx.createGain();
    this.ambientMaster.gain.value = 0;
    this.subBassBus.connect(this.ambientHPF);
    this.droneBus.connect(this.ambientHPF);
    this.textureBus.connect(this.ambientHPF);
    this.shimmerBus.connect(this.ambientHPF);
    this.ambientHPF.connect(this.ambientLPF);
    this.ambientLPF.connect(this.ambientMaster);
    this.ambientMaster.connect(this.masterGain);
  }
  createLFO(rate) {
    if (!this.audioContext)
      throw new Error("AudioContext not initialized");
    const lfo = this.audioContext.createOscillator();
    lfo.type = "sine";
    lfo.frequency.value = rate;
    return lfo;
  }
  connectLFOToParam(lfo, param, min, max) {
    if (!this.audioContext)
      throw new Error("AudioContext not initialized");
    const range = (max - min) / 2;
    const center = min + range;
    const lfoGain = this.audioContext.createGain();
    lfoGain.gain.value = range;
    lfo.connect(lfoGain);
    lfoGain.connect(param);
    param.value = center;
    return lfoGain;
  }
  initSpatialProcessing() {
    if (!this.audioContext || !this.ambientLPF || !this.ambientMaster)
      return;
    const ctx = this.audioContext;
    const cfg = AMBIENT_CONFIG.SPATIAL;
    this.delayLeft = ctx.createDelay(cfg.DELAY_LEFT + 0.1);
    this.delayLeft.delayTime.value = cfg.DELAY_LEFT;
    this.delayRight = ctx.createDelay(cfg.DELAY_RIGHT + 0.1);
    this.delayRight.delayTime.value = cfg.DELAY_RIGHT;
    this.delayFeedbackLeft = ctx.createGain();
    this.delayFeedbackLeft.gain.value = cfg.FEEDBACK_LEFT;
    this.delayFeedbackRight = ctx.createGain();
    this.delayFeedbackRight.gain.value = cfg.FEEDBACK_RIGHT;
    this.delayFilterLeft = ctx.createBiquadFilter();
    this.delayFilterLeft.type = "lowpass";
    this.delayFilterLeft.frequency.value = cfg.DELAY_LPF;
    this.delayFilterRight = ctx.createBiquadFilter();
    this.delayFilterRight.type = "lowpass";
    this.delayFilterRight.frequency.value = cfg.DELAY_LPF;
    this.delayWetGain = ctx.createGain();
    this.delayWetGain.gain.value = cfg.WET_MIX;
    this.spatialMerger = ctx.createChannelMerger(2);
    this.ambientLPF.connect(this.delayLeft);
    this.ambientLPF.connect(this.delayRight);
    this.delayLeft.connect(this.delayFilterLeft);
    this.delayRight.connect(this.delayFilterRight);
    this.delayFilterLeft.connect(this.delayFeedbackLeft);
    this.delayFeedbackLeft.connect(this.delayLeft);
    this.delayFilterRight.connect(this.delayFeedbackRight);
    this.delayFeedbackRight.connect(this.delayRight);
    this.delayFilterLeft.connect(this.spatialMerger, 0, 0);
    this.delayFilterRight.connect(this.spatialMerger, 0, 1);
    this.spatialMerger.connect(this.delayWetGain);
    this.delayWetGain.connect(this.ambientMaster);
  }
  initSubBassLayer() {
    if (!this.audioContext || !this.subBassBus)
      return;
    const ctx = this.audioContext;
    const cfg = AMBIENT_CONFIG.SUB_BASS;
    this.subBassOsc = ctx.createOscillator();
    this.subBassOsc.type = "sine";
    this.subBassOsc.frequency.value = cfg.FREQUENCY;
    this.subBassGain = ctx.createGain();
    this.subBassGain.gain.value = cfg.GAIN;
    this.subBassLFO = this.createLFO(cfg.LFO_RATE);
    this.subBassLFOGain = this.connectLFOToParam(this.subBassLFO, this.subBassOsc.frequency, cfg.FREQUENCY - cfg.LFO_DEPTH, cfg.FREQUENCY + cfg.LFO_DEPTH);
    this.subBassOsc.connect(this.subBassGain);
    this.subBassGain.connect(this.subBassBus);
    this.subBassOsc.start();
    this.subBassLFO.start();
  }
  initDroneLayer() {
    if (!this.audioContext || !this.droneBus)
      return;
    const ctx = this.audioContext;
    const cfg = AMBIENT_CONFIG.DRONE;
    this.droneFilter = ctx.createBiquadFilter();
    this.droneFilter.type = "lowpass";
    this.droneFilter.frequency.value = cfg.FILTER_FREQ;
    this.droneFilter.Q.value = cfg.FILTER_Q;
    this.droneLFO = this.createLFO(cfg.FILTER_LFO_RATE);
    this.droneLFOGain = this.connectLFOToParam(this.droneLFO, this.droneFilter.frequency, cfg.FILTER_LFO_MIN, cfg.FILTER_LFO_MAX);
    this.droneLFO.start();
    for (let i = 0;i < cfg.FREQUENCIES.length; i++) {
      const baseFreq = cfg.FREQUENCIES[i];
      const detune = cfg.DETUNE_HZ[i];
      const gain = cfg.GAINS[i];
      const oscA = ctx.createOscillator();
      oscA.type = i === 1 ? "sine" : "triangle";
      oscA.frequency.value = baseFreq;
      const gainA = ctx.createGain();
      gainA.gain.value = gain;
      oscA.connect(gainA);
      gainA.connect(this.droneFilter);
      oscA.start();
      this.droneOscillators.push(oscA);
      this.droneGains.push(gainA);
      const oscB = ctx.createOscillator();
      oscB.type = "sine";
      oscB.frequency.value = baseFreq + detune;
      const gainB = ctx.createGain();
      gainB.gain.value = gain;
      oscB.connect(gainB);
      gainB.connect(this.droneFilter);
      oscB.start();
      this.droneOscillators.push(oscB);
      this.droneGains.push(gainB);
    }
    this.droneFilter.connect(this.droneBus);
  }
  initTextureLayer() {
    if (!this.audioContext || !this.textureBus)
      return;
    const ctx = this.audioContext;
    const cfg = AMBIENT_CONFIG.TEXTURE;
    const bufferSize = ctx.sampleRate * 2;
    const noiseBuffer = ctx.createBuffer(2, bufferSize, ctx.sampleRate);
    for (let channel = 0;channel < 2; channel++) {
      const data = noiseBuffer.getChannelData(channel);
      for (let i = 0;i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }
    }
    this.textureSource = ctx.createBufferSource();
    this.textureSource.buffer = noiseBuffer;
    this.textureSource.loop = true;
    const splitter = ctx.createChannelSplitter(2);
    const merger = ctx.createChannelMerger(2);
    const hpfLeft = ctx.createBiquadFilter();
    hpfLeft.type = "highpass";
    hpfLeft.frequency.value = cfg.HPF_FREQ;
    const bpfLeft = ctx.createBiquadFilter();
    bpfLeft.type = "bandpass";
    bpfLeft.frequency.value = cfg.BPF_FREQ_LEFT;
    bpfLeft.Q.value = cfg.BPF_Q;
    this.textureFiltersLeft = [hpfLeft, bpfLeft];
    const hpfRight = ctx.createBiquadFilter();
    hpfRight.type = "highpass";
    hpfRight.frequency.value = cfg.HPF_FREQ;
    const bpfRight = ctx.createBiquadFilter();
    bpfRight.type = "bandpass";
    bpfRight.frequency.value = cfg.BPF_FREQ_RIGHT;
    bpfRight.Q.value = cfg.BPF_Q;
    this.textureFiltersRight = [hpfRight, bpfRight];
    this.textureGainNode = ctx.createGain();
    this.textureGainNode.gain.value = cfg.GAIN;
    this.textureLFO = this.createLFO(cfg.LFO_RATE);
    const lfoGainLeft = ctx.createGain();
    lfoGainLeft.gain.value = cfg.LFO_DEPTH;
    this.textureLFO.connect(lfoGainLeft);
    lfoGainLeft.connect(bpfLeft.frequency);
    const lfoGainRight = ctx.createGain();
    lfoGainRight.gain.value = cfg.LFO_DEPTH;
    this.textureLFO.connect(lfoGainRight);
    lfoGainRight.connect(bpfRight.frequency);
    this.textureSource.connect(splitter);
    splitter.connect(hpfLeft, 0);
    hpfLeft.connect(bpfLeft);
    bpfLeft.connect(merger, 0, 0);
    splitter.connect(hpfRight, 1);
    hpfRight.connect(bpfRight);
    bpfRight.connect(merger, 0, 1);
    merger.connect(this.textureGainNode);
    this.textureGainNode.connect(this.textureBus);
    this.textureSource.start();
    this.textureLFO.start();
  }
  initShimmerLayer() {
    if (!this.audioContext || !this.shimmerBus)
      return;
    for (let i = 0;i < AMBIENT_CONFIG.SHIMMER.FREQUENCIES.length; i++) {
      this.scheduleNextShimmer(i);
    }
  }
  scheduleNextShimmer(index) {
    if (!this.audioContext || !this.isAmbientPlaying)
      return;
    const cfg = AMBIENT_CONFIG.SHIMMER;
    const delay = (cfg.HOLD_TIME_MIN + Math.random() * (cfg.HOLD_TIME_MAX - cfg.HOLD_TIME_MIN)) * 1000;
    const timeout = setTimeout(() => {
      if (!this.isAmbientPlaying)
        return;
      if (this.activeShimmerCount >= cfg.MAX_CONCURRENT) {
        this.scheduleNextShimmer(index);
        return;
      }
      const freq = cfg.FREQUENCIES[index];
      const fadeTime = cfg.FADE_TIME_MIN + Math.random() * (cfg.FADE_TIME_MAX - cfg.FADE_TIME_MIN);
      const holdTime = cfg.HOLD_TIME_MIN + Math.random() * (cfg.HOLD_TIME_MAX - cfg.HOLD_TIME_MIN);
      this.fadeInShimmer(index, freq, fadeTime, holdTime);
    }, delay);
    this.shimmerTimeouts.push(timeout);
  }
  fadeInShimmer(index, frequency, fadeTime, holdTime) {
    if (!this.audioContext || !this.shimmerBus)
      return;
    const ctx = this.audioContext;
    const cfg = AMBIENT_CONFIG.SHIMMER;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    osc.type = "sine";
    osc.frequency.value = frequency;
    const gain = ctx.createGain();
    const targetGain = cfg.GAIN_MIN + Math.random() * (cfg.GAIN_MAX - cfg.GAIN_MIN);
    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(targetGain, now + fadeTime);
    const panner = ctx.createStereoPanner();
    panner.pan.value = (Math.random() - 0.5) * 1.2;
    osc.connect(gain);
    gain.connect(panner);
    panner.connect(this.shimmerBus);
    this.shimmerOscillators.set(index, osc);
    this.shimmerGains.set(index, gain);
    this.shimmerPanners.set(index, panner);
    this.activeShimmerCount++;
    osc.start();
    const fadeOutTimeout = setTimeout(() => {
      this.fadeOutShimmer(index, fadeTime);
    }, (holdTime + fadeTime) * 1000);
    this.shimmerTimeouts.push(fadeOutTimeout);
  }
  fadeOutShimmer(index, fadeTime) {
    if (!this.audioContext)
      return;
    const ctx = this.audioContext;
    const now = ctx.currentTime;
    const gain = this.shimmerGains.get(index);
    const osc = this.shimmerOscillators.get(index);
    const panner = this.shimmerPanners.get(index);
    if (gain && osc) {
      gain.gain.linearRampToValueAtTime(0, now + fadeTime);
      setTimeout(() => {
        try {
          osc.stop();
          osc.disconnect();
          gain.disconnect();
          panner?.disconnect();
        } catch (e) {}
        this.shimmerOscillators.delete(index);
        this.shimmerGains.delete(index);
        this.shimmerPanners.delete(index);
        this.activeShimmerCount--;
        if (this.isAmbientPlaying) {
          this.scheduleNextShimmer(index);
        }
      }, fadeTime * 1000 + 100);
    }
  }
  cleanupAmbientNodes() {
    for (const timeout of this.shimmerTimeouts) {
      clearTimeout(timeout);
    }
    this.shimmerTimeouts = [];
    for (const [_, osc] of this.shimmerOscillators) {
      try {
        osc.stop();
        osc.disconnect();
      } catch (e) {}
    }
    this.shimmerOscillators.clear();
    this.shimmerGains.forEach((g) => g.disconnect());
    this.shimmerGains.clear();
    this.shimmerPanners.forEach((p) => p.disconnect());
    this.shimmerPanners.clear();
    this.activeShimmerCount = 0;
    if (this.subBassOsc) {
      try {
        this.subBassOsc.stop();
        this.subBassOsc.disconnect();
      } catch (e) {}
      this.subBassOsc = null;
    }
    if (this.subBassLFO) {
      try {
        this.subBassLFO.stop();
        this.subBassLFO.disconnect();
      } catch (e) {}
      this.subBassLFO = null;
    }
    this.subBassGain?.disconnect();
    this.subBassGain = null;
    this.subBassLFOGain?.disconnect();
    this.subBassLFOGain = null;
    for (const osc of this.droneOscillators) {
      try {
        osc.stop();
        osc.disconnect();
      } catch (e) {}
    }
    this.droneOscillators = [];
    this.droneGains.forEach((g) => g.disconnect());
    this.droneGains = [];
    if (this.droneLFO) {
      try {
        this.droneLFO.stop();
        this.droneLFO.disconnect();
      } catch (e) {}
      this.droneLFO = null;
    }
    this.droneLFOGain?.disconnect();
    this.droneLFOGain = null;
    this.droneFilter?.disconnect();
    this.droneFilter = null;
    if (this.textureSource) {
      try {
        this.textureSource.stop();
        this.textureSource.disconnect();
      } catch (e) {}
      this.textureSource = null;
    }
    if (this.textureLFO) {
      try {
        this.textureLFO.stop();
        this.textureLFO.disconnect();
      } catch (e) {}
      this.textureLFO = null;
    }
    this.textureGainNode?.disconnect();
    this.textureGainNode = null;
    this.textureFiltersLeft.forEach((f) => f.disconnect());
    this.textureFiltersLeft = [];
    this.textureFiltersRight.forEach((f) => f.disconnect());
    this.textureFiltersRight = [];
    this.subBassBus?.disconnect();
    this.subBassBus = null;
    this.droneBus?.disconnect();
    this.droneBus = null;
    this.textureBus?.disconnect();
    this.textureBus = null;
    this.shimmerBus?.disconnect();
    this.shimmerBus = null;
    this.delayLeft?.disconnect();
    this.delayLeft = null;
    this.delayRight?.disconnect();
    this.delayRight = null;
    this.delayFeedbackLeft?.disconnect();
    this.delayFeedbackLeft = null;
    this.delayFeedbackRight?.disconnect();
    this.delayFeedbackRight = null;
    this.delayFilterLeft?.disconnect();
    this.delayFilterLeft = null;
    this.delayFilterRight?.disconnect();
    this.delayFilterRight = null;
    this.delayWetGain?.disconnect();
    this.delayWetGain = null;
    this.spatialMerger?.disconnect();
    this.spatialMerger = null;
    this.ambientHPF?.disconnect();
    this.ambientHPF = null;
    this.ambientLPF?.disconnect();
    this.ambientLPF = null;
    this.ambientMaster?.disconnect();
    this.ambientMaster = null;
  }
  startAmbient() {
    if (this.isAmbientPlaying)
      return;
    if (!this.ensureInitialized() || !this.audioContext || !this.masterGain)
      return;
    this.isAmbientPlaying = true;
    const now = this.audioContext.currentTime;
    this.createAmbientBuses();
    this.initSpatialProcessing();
    this.initSubBassLayer();
    this.initDroneLayer();
    this.initTextureLayer();
    this.initShimmerLayer();
    if (this.ambientMaster) {
      this.ambientMaster.gain.linearRampToValueAtTime(AMBIENT_CONFIG.AMBIENT_MASTER_GAIN, now + AMBIENT_CONFIG.FADE_IN_TIME);
    }
  }
  stopAmbient() {
    if (!this.audioContext || !this.isAmbientPlaying)
      return;
    const now = this.audioContext.currentTime;
    if (this.ambientMaster) {
      this.ambientMaster.gain.linearRampToValueAtTime(0, now + AMBIENT_CONFIG.FADE_OUT_TIME);
    }
    setTimeout(() => {
      this.cleanupAmbientNodes();
      this.isAmbientPlaying = false;
    }, AMBIENT_CONFIG.FADE_OUT_TIME * 1000 + 100);
  }
  playDiscoverySound() {
    this.playCosmicFlash();
  }
  playCosmicFlash() {
    if (!this.ensureInitialized() || !this.audioContext || !this.masterGain) {
      return;
    }
    const ctx = this.audioContext;
    const now = ctx.currentTime;
    const subOsc = ctx.createOscillator();
    const subGain = ctx.createGain();
    subOsc.type = "sine";
    subOsc.frequency.setValueAtTime(50, now);
    subOsc.frequency.exponentialRampToValueAtTime(30, now + 0.3);
    subGain.gain.setValueAtTime(0, now);
    subGain.gain.linearRampToValueAtTime(0.5, now + 0.02);
    subGain.gain.exponentialRampToValueAtTime(0.01, now + 0.5);
    subOsc.connect(subGain);
    subGain.connect(this.masterGain);
    subOsc.start(now);
    subOsc.stop(now + 0.6);
    const bufferSize = ctx.sampleRate * 0.8;
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const noiseData = noiseBuffer.getChannelData(0);
    for (let i = 0;i < bufferSize; i++) {
      noiseData[i] = Math.random() * 2 - 1;
    }
    const noiseSource = ctx.createBufferSource();
    noiseSource.buffer = noiseBuffer;
    const noiseFilter = ctx.createBiquadFilter();
    noiseFilter.type = "bandpass";
    noiseFilter.frequency.setValueAtTime(200, now);
    noiseFilter.frequency.exponentialRampToValueAtTime(3000, now + 0.4);
    noiseFilter.Q.value = 1;
    const noiseGain = ctx.createGain();
    noiseGain.gain.setValueAtTime(0, now);
    noiseGain.gain.linearRampToValueAtTime(0.15, now + 0.1);
    noiseGain.gain.linearRampToValueAtTime(0.2, now + 0.3);
    noiseGain.gain.exponentialRampToValueAtTime(0.01, now + 0.7);
    noiseSource.connect(noiseFilter);
    noiseFilter.connect(noiseGain);
    noiseGain.connect(this.masterGain);
    noiseSource.start(now);
    noiseSource.stop(now + 0.8);
    const shimmerFreqs = [1046.5, 1318.5, 1568, 2093];
    for (let i = 0;i < shimmerFreqs.length; i++) {
      const freq = shimmerFreqs[i];
      if (!freq)
        continue;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.value = freq;
      const startTime = now + 0.1 + i * 0.05;
      gain.gain.setValueAtTime(0, startTime);
      gain.gain.linearRampToValueAtTime(0.12, startTime + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.01, startTime + 1.2);
      osc.connect(gain);
      gain.connect(this.masterGain);
      osc.start(startTime);
      osc.stop(startTime + 1.5);
    }
  }
  playPatternCompletionChime() {
    if (!this.ensureInitialized() || !this.audioContext || !this.masterGain) {
      return;
    }
    const currentTime = this.audioContext.currentTime;
    const frequencies = [523.25, 659.25, 783.99, 1046.5];
    const baseVolume = 0.15;
    frequencies.forEach((freq, index) => {
      const osc = this.audioContext.createOscillator();
      const gainNode = this.audioContext.createGain();
      osc.type = "sine";
      osc.frequency.value = freq;
      const startTime = currentTime + index * 0.05;
      const endTime = startTime + 0.8;
      gainNode.gain.setValueAtTime(0, startTime);
      gainNode.gain.linearRampToValueAtTime(baseVolume, startTime + 0.02);
      gainNode.gain.exponentialRampToValueAtTime(0.001, endTime);
      osc.connect(gainNode);
      gainNode.connect(this.masterGain);
      osc.start(startTime);
      osc.stop(endTime);
    });
  }
  playStarConnectionSound(index, total) {
    if (!this.ensureInitialized() || !this.audioContext || !this.masterGain) {
      return;
    }
    const ctx = this.audioContext;
    const now = ctx.currentTime;
    const noteIndex = index % this.pentatonicScale.length;
    const baseFreq = this.pentatonicScale[noteIndex] || 523.25;
    const detuneAmount = 3;
    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.type = "sine";
    osc1.frequency.value = baseFreq - detuneAmount;
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.type = "sine";
    osc2.frequency.value = baseFreq + detuneAmount;
    const harmOsc = ctx.createOscillator();
    const harmGain = ctx.createGain();
    harmOsc.type = "sine";
    harmOsc.frequency.value = baseFreq * 2;
    const attackTime = 0.015;
    const decayTime = 0.6;
    const mainVolume = 0.12;
    const harmVolume = 0.04;
    for (const [osc, gain] of [[osc1, gain1], [osc2, gain2]]) {
      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(mainVolume, now + attackTime);
      gain.gain.exponentialRampToValueAtTime(0.001, now + decayTime);
      osc.connect(gain);
      gain.connect(this.masterGain);
      osc.start(now);
      osc.stop(now + decayTime + 0.1);
    }
    harmGain.gain.setValueAtTime(0, now);
    harmGain.gain.linearRampToValueAtTime(harmVolume, now + attackTime * 2);
    harmGain.gain.exponentialRampToValueAtTime(0.001, now + decayTime * 0.8);
    harmOsc.connect(harmGain);
    harmGain.connect(this.masterGain);
    harmOsc.start(now);
    harmOsc.stop(now + decayTime);
  }
  playDiscoveryBuildUp(progress) {
    if (!this.ensureInitialized() || !this.audioContext || !this.masterGain) {
      return;
    }
    const ctx = this.audioContext;
    if (!this.isBuildUpPlaying) {
      this.isBuildUpPlaying = true;
      const lowOsc = ctx.createOscillator();
      const lowGain = ctx.createGain();
      lowOsc.type = "sine";
      lowOsc.frequency.value = 80;
      lowGain.gain.value = 0;
      lowOsc.connect(lowGain);
      lowGain.connect(this.masterGain);
      lowOsc.start();
      this.buildUpOscillators.push(lowOsc);
      this.buildUpGains.push(lowGain);
      const midOsc = ctx.createOscillator();
      const midGain = ctx.createGain();
      midOsc.type = "sine";
      midOsc.frequency.value = 220;
      midGain.gain.value = 0;
      midOsc.connect(midGain);
      midGain.connect(this.masterGain);
      midOsc.start();
      this.buildUpOscillators.push(midOsc);
      this.buildUpGains.push(midGain);
      const highOsc = ctx.createOscillator();
      const highGain = ctx.createGain();
      highOsc.type = "sine";
      highOsc.frequency.value = 440;
      highGain.gain.value = 0;
      highOsc.connect(highGain);
      highGain.connect(this.masterGain);
      highOsc.start();
      this.buildUpOscillators.push(highOsc);
      this.buildUpGains.push(highGain);
    }
    const now = ctx.currentTime;
    if (this.buildUpGains[0]) {
      this.buildUpGains[0].gain.setTargetAtTime(0.03 * progress, now, 0.1);
    }
    if (this.buildUpOscillators[1] && this.buildUpGains[1]) {
      const midFreq = 220 + progress * 180;
      this.buildUpOscillators[1].frequency.setTargetAtTime(midFreq, now, 0.1);
      this.buildUpGains[1].gain.setTargetAtTime(0.04 * progress, now, 0.1);
    }
    if (this.buildUpOscillators[2] && this.buildUpGains[2]) {
      const highProgress = Math.max(0, (progress - 0.5) * 2);
      const highFreq = 440 + highProgress * 200;
      this.buildUpOscillators[2].frequency.setTargetAtTime(highFreq, now, 0.1);
      this.buildUpGains[2].gain.setTargetAtTime(0.025 * highProgress, now, 0.1);
    }
  }
  stopDiscoveryBuildUp() {
    if (!this.isBuildUpPlaying || !this.audioContext)
      return;
    const now = this.audioContext.currentTime;
    for (const gain of this.buildUpGains) {
      gain.gain.setTargetAtTime(0, now, 0.15);
    }
    setTimeout(() => {
      for (const osc of this.buildUpOscillators) {
        try {
          osc.stop();
          osc.disconnect();
        } catch (e) {}
      }
      this.buildUpOscillators = [];
      this.buildUpGains = [];
      this.isBuildUpPlaying = false;
    }, 300);
  }
  nebulaOscillators = [];
  nebulaGains = [];
  isNebulaPlaying = false;
  startNebulaDrone(progress) {
    if (!this.ensureInitialized() || !this.audioContext || !this.masterGain)
      return;
    const ctx = this.audioContext;
    const now = ctx.currentTime;
    if (!this.isNebulaPlaying) {
      this.isNebulaPlaying = true;
      const osc1 = ctx.createOscillator();
      const gain1 = ctx.createGain();
      osc1.type = "sawtooth";
      osc1.frequency.value = 65.41;
      const filter1 = ctx.createBiquadFilter();
      filter1.type = "lowpass";
      filter1.frequency.value = 200;
      osc1.connect(filter1);
      filter1.connect(gain1);
      gain1.connect(this.masterGain);
      osc1.start();
      gain1.gain.value = 0;
      this.nebulaOscillators.push(osc1);
      this.nebulaGains.push(gain1);
      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();
      osc2.type = "sine";
      osc2.frequency.value = 98;
      osc2.connect(gain2);
      gain2.connect(this.masterGain);
      osc2.start();
      gain2.gain.value = 0;
      this.nebulaOscillators.push(osc2);
      this.nebulaGains.push(gain2);
    }
    const vol = Math.min(0.2, progress * 0.2);
    for (const gain of this.nebulaGains) {
      gain.gain.setTargetAtTime(vol, now, 0.2);
    }
  }
  stopNebulaDrone() {
    if (!this.isNebulaPlaying || !this.audioContext)
      return;
    const now = this.audioContext.currentTime;
    for (const gain of this.nebulaGains) {
      gain.gain.setTargetAtTime(0, now, 0.5);
    }
    setTimeout(() => {
      this.nebulaOscillators.forEach((o) => {
        try {
          o.stop();
          o.disconnect();
        } catch (e) {}
      });
      this.nebulaGains = [];
      this.nebulaOscillators = [];
      this.isNebulaPlaying = false;
    }, 600);
  }
  playClusterSparkle(intensity) {
    if (!this.ensureInitialized() || !this.audioContext || !this.masterGain)
      return;
    const ctx = this.audioContext;
    const now = ctx.currentTime;
    const count = Math.floor(3 + intensity * 5);
    for (let i = 0;i < count; i++) {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      const freqBase = this.pentatonicScale[Math.floor(Math.random() * this.pentatonicScale.length)] || 880;
      osc.frequency.value = freqBase * (Math.random() > 0.5 ? 2 : 4);
      const timeOffset = Math.random() * 0.1;
      const duration = 0.05 + Math.random() * 0.1;
      gain.gain.setValueAtTime(0, now + timeOffset);
      gain.gain.linearRampToValueAtTime(0.05, now + timeOffset + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.001, now + timeOffset + duration);
      osc.connect(gain);
      gain.connect(this.masterGain);
      osc.start(now + timeOffset);
      osc.stop(now + timeOffset + duration + 0.1);
    }
  }
}

// src/game/Game.ts
class Game {
  canvas;
  ctx;
  telescopeOverlay;
  state;
  starField;
  telescope;
  celestialObjects = [];
  constellations = [];
  discoveriesTab;
  modalManager;
  audioManager;
  modalActive = false;
  currentModal = null;
  lastFrameTime = 0;
  animationFrameId = 0;
  mouseMoveHandler;
  resizeHandler;
  keyDownHandler;
  constructor(canvas, telescopeOverlay) {
    this.canvas = canvas;
    this.telescopeOverlay = telescopeOverlay;
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      throw new Error("Could not get 2D context");
    }
    this.ctx = ctx;
    this.state = {
      running: false,
      mouseX: window.innerWidth / 2,
      mouseY: window.innerHeight / 2,
      viewX: SKY_WIDTH / 2,
      viewY: SKY_HEIGHT / 2,
      discoveredCount: 0,
      currentObservatory: "northern"
    };
    this.starField = new StarField(SKY_WIDTH, SKY_HEIGHT);
    this.telescope = new Telescope(telescopeOverlay);
    this.modalManager = new ModalManager;
    this.audioManager = new AudioManager;
    this.discoveriesTab = new DiscoveriesTab(this.state.currentObservatory);
    this.loadCelestialObjects(this.state.currentObservatory);
    this.setupEventListeners();
    this.resizeCanvas();
  }
  setupEventListeners() {
    this.mouseMoveHandler = (e) => {
      this.state.mouseX = e.clientX;
      this.state.mouseY = e.clientY;
    };
    window.addEventListener("mousemove", this.mouseMoveHandler);
    this.resizeHandler = () => this.resizeCanvas();
    window.addEventListener("resize", this.resizeHandler);
    const toggle = document.getElementById("discoveries-toggle");
    const panel = document.getElementById("discoveries-panel");
    const togglePanel = () => {
      if (panel) {
        panel.classList.toggle("collapsed");
      }
    };
    if (toggle && panel) {
      toggle.addEventListener("click", togglePanel);
    }
    const attachLensListeners = () => {
      const lensCase = document.getElementById("lens-case");
      if (lensCase) {
        lensCase.addEventListener("click", (e) => {
          const slot = e.target.closest(".lens-slot");
          if (!slot)
            return;
          const lensType = slot.dataset.lens;
          if (lensType === "standard") {
            this.setLens(1);
          } else if (lensType === "wide") {
            this.setLens(0.5);
          } else if (lensType === "deep") {
            this.setLens(3);
          }
          e.preventDefault();
        });
      } else {
        setTimeout(attachLensListeners, 500);
      }
    };
    attachLensListeners();
    this.keyDownHandler = (e) => {
      if (document.activeElement?.tagName === "INPUT" || document.activeElement?.tagName === "TEXTAREA") {
        return;
      }
      if (e.key === "Tab") {
        e.preventDefault();
        togglePanel();
      }
      if (e.key === "1") {
        this.setLens(1);
      }
      if (e.key === "2") {
        this.setLens(0.5);
      }
      if (e.key === "3") {
        this.setLens(3);
      }
      if (e.key === "ArrowLeft") {
        this.switchObservatory("northern");
      }
      if (e.key === "ArrowRight") {
        this.switchObservatory("southern");
      }
    };
    window.addEventListener("keydown", this.keyDownHandler);
  }
  setLens(magnification) {
    const currentMag = this.telescope.getMagnification();
    if (currentMag === magnification)
      return;
    this.telescope.setMagnification(magnification);
    const standardSlot = document.getElementById("lens-standard");
    const wideSlot = document.getElementById("lens-wide");
    const deepSlot = document.getElementById("lens-deep");
    if (standardSlot && wideSlot && deepSlot) {
      standardSlot.classList.remove("active");
      wideSlot.classList.remove("active");
      deepSlot.classList.remove("active");
      if (magnification === 1) {
        standardSlot.classList.add("active");
      } else if (magnification === 0.5) {
        wideSlot.classList.add("active");
      } else if (magnification === 3) {
        deepSlot.classList.add("active");
      }
    }
  }
  resizeCanvas() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }
  loadCelestialObjects(observatory) {
    this.celestialObjects = [];
    this.constellations = [];
    const constellationData = getConstellationsByObservatory(observatory);
    for (const data of constellationData) {
      const c = new Constellation(data);
      this.constellations.push(c);
      this.celestialObjects.push(c);
    }
    const nebulaeData = getNebulaeByObservatory(observatory);
    for (const data of nebulaeData) {
      this.celestialObjects.push(new Nebula(data));
    }
    const clustersData = getClustersByObservatory(observatory);
    for (const data of clustersData) {
      this.celestialObjects.push(new StarCluster(data));
    }
    const galaxiesData = getGalaxiesByObservatory(observatory);
    for (const data of galaxiesData) {
      this.celestialObjects.push(new Galaxy(data));
    }
  }
  switchObservatory(observatory) {
    if (observatory === this.state.currentObservatory)
      return;
    this.state.currentObservatory = observatory;
    this.state.viewX = SKY_WIDTH / 2;
    this.state.viewY = SKY_HEIGHT / 2;
    this.state.discoveredCount = 0;
    this.loadCelestialObjects(observatory);
    this.discoveriesTab.setObservatory(observatory);
    const dialElement = document.getElementById("observatory-dial");
    if (dialElement) {
      const sectors = dialElement.querySelectorAll(".dial-sector");
      sectors.forEach((sector) => {
        const sectorEl = sector;
        if (sectorEl.dataset.observatory === observatory) {
          sectorEl.classList.add("active");
        } else {
          sectorEl.classList.remove("active");
        }
      });
    }
    const locationEl = document.querySelector(".observatory-location");
    const coordsEl = document.querySelector(".observatory-coords");
    if (locationEl && coordsEl) {
      if (observatory === "northern") {
        locationEl.textContent = "Alpine Observatory";
        coordsEl.textContent = "46°N · Swiss Alps";
      } else {
        locationEl.textContent = "Andean Observatory";
        coordsEl.textContent = "30°S · Chilean Andes";
      }
    }
  }
  getCurrentObservatory() {
    return this.state.currentObservatory;
  }
  start() {
    this.state.running = true;
    this.lastFrameTime = performance.now();
    this.audioManager.startAmbient();
    this.gameLoop();
  }
  stop() {
    this.state.running = false;
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
    this.audioManager.stopAmbient();
    this.cleanup();
  }
  cleanup() {
    window.removeEventListener("mousemove", this.mouseMoveHandler);
    window.removeEventListener("resize", this.resizeHandler);
    window.removeEventListener("keydown", this.keyDownHandler);
    this.telescope.destroy();
    if (this.currentModal) {
      this.currentModal.destroy();
      this.currentModal = null;
    }
  }
  gameLoop = () => {
    if (!this.state.running)
      return;
    const currentTime = performance.now();
    const deltaTime = (currentTime - this.lastFrameTime) / 1000;
    this.lastFrameTime = currentTime;
    this.update(deltaTime);
    this.render();
    this.animationFrameId = requestAnimationFrame(this.gameLoop);
  };
  getWrappedDeltaX(x1, x2) {
    let dx = x1 - x2;
    if (dx > SKY_WIDTH / 2)
      dx -= SKY_WIDTH;
    if (dx < -SKY_WIDTH / 2)
      dx += SKY_WIDTH;
    return dx;
  }
  update(deltaTime) {
    if (this.modalActive)
      return;
    this.telescope.update(this.state.mouseX, this.state.mouseY, deltaTime);
    const viewOffset = this.telescope.getViewOffset();
    const viewSpeedX = viewOffset.x * 0.5;
    const viewSpeedY = viewOffset.y * 0.5;
    this.state.viewX += viewSpeedX * deltaTime;
    this.state.viewY += viewSpeedY * deltaTime;
    if (this.state.viewX < 0)
      this.state.viewX += SKY_WIDTH;
    if (this.state.viewX >= SKY_WIDTH)
      this.state.viewX -= SKY_WIDTH;
    const margin = 400;
    this.state.viewY = Math.max(margin, Math.min(SKY_HEIGHT - margin, this.state.viewY));
    this.checkDiscovery(deltaTime);
    const skyX = this.state.viewX;
    const skyY = this.state.viewY;
    const effectiveTelescopeRadius = this.telescope.getInWorldRadius();
    for (const obj of this.celestialObjects) {
      const dx = this.getWrappedDeltaX(skyX, obj.x);
      const dy = skyY - obj.y;
      const distance = Math.hypot(dx, dy);
      const isInView = distance < obj.radius + effectiveTelescopeRadius * 1.5;
      obj.update(deltaTime, isInView);
    }
  }
  checkDiscovery(deltaTime) {
    if (this.modalActive)
      return;
    const telescopeRadius = this.telescope.getRadius();
    const skyX = this.state.viewX;
    const skyY = this.state.viewY;
    let isHoveringAny = false;
    let hoveringObject = null;
    for (const obj of this.celestialObjects) {
      if (obj.isDiscovered)
        continue;
      const dx = this.getWrappedDeltaX(skyX, obj.x);
      const dy = skyY - obj.y;
      const distance = Math.hypot(dx, dy);
      if (distance < obj.radius + telescopeRadius * 0.3) {
        isHoveringAny = true;
        hoveringObject = obj;
        if (obj.addHoverTime(deltaTime)) {
          this.onObjectDiscovered(obj);
        }
        if (obj instanceof Constellation) {
          const progress = obj.discoveryProgress;
          this.audioManager.playDiscoveryBuildUp(progress);
        } else if (obj instanceof Nebula) {
          const progress = obj.discoveryProgress;
          this.audioManager.startNebulaDrone(progress);
        }
      } else {
        obj.resetHoverTime();
      }
    }
    if (!isHoveringAny) {
      this.audioManager.stopDiscoveryBuildUp();
      this.audioManager.stopNebulaDrone();
    } else if (hoveringObject && !(hoveringObject instanceof Nebula)) {
      this.audioManager.stopNebulaDrone();
    }
  }
  onObjectDiscovered(obj) {
    this.state.discoveredCount++;
    if (obj instanceof Constellation) {
      this.audioManager.stopDiscoveryBuildUp();
      const c = obj;
      const data = c.getData();
      c.setOnConnectionRevealed((index, total) => {
        this.audioManager.playStarConnectionSound(index, total);
      });
      c.setOnAnimationComplete(() => {
        this.audioManager.playCosmicFlash();
        this.openPatternMatchModal(c);
      });
    } else if (obj instanceof Nebula) {
      this.audioManager.stopNebulaDrone();
      const n = obj;
      n.setOnAnimationComplete(() => {
        this.openNebulaFeatureModal(n);
      });
    } else if (obj instanceof StarCluster) {
      this.audioManager.playClusterSparkle(1);
      const sc = obj;
      sc.setOnAnimationComplete(() => {
        this.openClusterMatchModal(sc);
      });
    } else if (obj instanceof Galaxy) {
      this.audioManager.playDiscoverySound();
      const g = obj;
      g.setOnAnimationComplete(() => {
        this.openGalaxyStructureModal(g);
      });
    }
  }
  openPatternMatchModal(constellation) {
    this.modalActive = true;
    const modal = new PatternMatchModal(constellation, () => {
      this.onPatternMatchComplete(constellation);
    }, this.audioManager);
    this.currentModal = modal;
    this.modalManager.show(modal.render());
  }
  onPatternMatchComplete(constellation) {
    const data = constellation.getData();
    this.audioManager.playPatternCompletionChime();
    this.discoveriesTab.addDiscovery(data);
    this.showDiscoveryNotification(data.name);
    if (data.set)
      this.checkSetCompletion(data.set);
    if (this.currentModal) {
      this.currentModal.destroy();
      this.currentModal = null;
    }
    this.modalManager.hide(() => {
      this.modalActive = false;
    });
  }
  openNebulaFeatureModal(nebula) {
    this.modalActive = true;
    const modal = new NebulaFeatureModal(nebula, () => {
      this.onDSOModalComplete(nebula);
    }, this.audioManager);
    this.currentModal = modal;
    this.modalManager.show(modal.render());
  }
  openClusterMatchModal(cluster) {
    this.modalActive = true;
    const allClusters = this.celestialObjects.filter((obj) => obj instanceof StarCluster);
    const modal = new ClusterMatchModal(cluster, allClusters, () => {
      this.onDSOModalComplete(cluster);
    }, this.audioManager);
    this.currentModal = modal;
    this.modalManager.show(modal.render());
  }
  openGalaxyStructureModal(galaxy) {
    this.modalActive = true;
    const modal = new GalaxyStructureModal(galaxy, () => {
      this.onDSOModalComplete(galaxy);
    }, this.audioManager);
    this.currentModal = modal;
    this.modalManager.show(modal.render());
  }
  onDSOModalComplete(obj) {
    this.audioManager.playPatternCompletionChime();
    this.discoveriesTab.addDiscovery(obj.getData());
    this.showDiscoveryNotification(obj.name);
    if (this.currentModal) {
      this.currentModal.destroy();
      this.currentModal = null;
    }
    this.modalManager.hide(() => {
      this.modalActive = false;
    });
  }
  showDiscoveryNotification(name) {
    const notification = document.getElementById("discovery-notification");
    const nameEl = notification?.querySelector(".constellation-name");
    if (notification && nameEl) {
      notification.classList.remove("hidden");
      nameEl.textContent = name;
      requestAnimationFrame(() => {
        notification.classList.add("visible");
      });
      setTimeout(() => {
        notification.classList.remove("visible");
        setTimeout(() => {
          notification.classList.add("hidden");
        }, 500);
      }, 3000);
    }
  }
  render() {
    const { ctx, canvas } = this;
    const { viewX, viewY } = this.state;
    const gradient = ctx.createRadialGradient(canvas.width / 2, canvas.height / 2, 0, canvas.width / 2, canvas.height / 2, canvas.height);
    gradient.addColorStop(0, "#0f1020");
    gradient.addColorStop(0.6, "#0a0a18");
    gradient.addColorStop(1, "#050510");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    const telescopePos = this.telescope.getPosition();
    const telescopeRadius = this.telescope.getRadius();
    ctx.save();
    ctx.beginPath();
    ctx.arc(telescopePos.x, telescopePos.y, telescopeRadius, 0, Math.PI * 2);
    ctx.clip();
    const mag = this.telescope.getMagnification();
    if (mag === 3) {
      const vignetteGradient = ctx.createRadialGradient(telescopePos.x, telescopePos.y, telescopeRadius * 0.4, telescopePos.x, telescopePos.y, telescopeRadius);
      vignetteGradient.addColorStop(0, "rgba(0, 0, 0, 0)");
      vignetteGradient.addColorStop(0.7, "rgba(0, 0, 0, 0.15)");
      vignetteGradient.addColorStop(1, "rgba(0, 0, 0, 0.4)");
      ctx.fillStyle = vignetteGradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
    ctx.translate(telescopePos.x, telescopePos.y);
    ctx.scale(mag, mag);
    ctx.translate(-telescopePos.x, -telescopePos.y);
    const dsoScale = 0.4 + mag / 3 * 0.6;
    const constellationOpacity = mag === 3 ? 0.4 : 1;
    const dsoGlow = mag === 3 ? 1.3 : 1;
    for (const obj of this.celestialObjects) {
      if (obj instanceof Galaxy) {
        obj.render(ctx, viewX, viewY, canvas.width, canvas.height, dsoScale, dsoGlow);
      }
    }
    for (const obj of this.celestialObjects) {
      if (obj instanceof Nebula) {
        obj.render(ctx, viewX, viewY, canvas.width, canvas.height, dsoScale, dsoGlow);
      }
    }
    this.starField.render(ctx, viewX, viewY, canvas.width, canvas.height, telescopePos);
    for (const obj of this.celestialObjects) {
      if (obj instanceof Constellation) {
        obj.render(ctx, viewX, viewY, canvas.width, canvas.height, constellationOpacity);
      } else if (obj instanceof StarCluster) {
        obj.render(ctx, viewX, viewY, canvas.width, canvas.height, dsoScale, dsoGlow);
      }
    }
    ctx.restore();
    this.renderBackgroundStars();
  }
  renderBackgroundStars() {
    const { ctx, canvas } = this;
    const telescopePos = this.telescope.getPosition();
    const telescopeRadius = this.telescope.getRadius();
    const bgStars = this.starField.getBackgroundStars();
    ctx.save();
    ctx.beginPath();
    ctx.rect(0, 0, canvas.width, canvas.height);
    ctx.arc(telescopePos.x, telescopePos.y, telescopeRadius + 30, 0, Math.PI * 2, true);
    ctx.clip();
    for (const star of bgStars) {
      const screenX = star.x / SKY_WIDTH * canvas.width;
      const screenY = star.y / SKY_HEIGHT * canvas.height;
      ctx.beginPath();
      ctx.arc(screenX, screenY, star.size * 0.5, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(200, 210, 255, ${star.brightness * 0.3})`;
      ctx.fill();
    }
    ctx.restore();
  }
  checkSetCompletion(setId) {
    const set = CONSTELLATION_SETS[setId];
    if (!set)
      return;
    const setConstellations = this.constellations.filter((c) => c.getData().set === setId);
    const allFound = setConstellations.every((c) => c.isDiscovered);
    if (allFound) {
      if (set.upgradeId === "stabilizer") {
        this.telescope.setDriftFactor(1);
        this.showUpgradeNotification(set.name, set.upgradeName);
      } else if (set.upgradeId === "wide_angle") {
        this.telescope.setRadiusMultiplier(1.15);
        this.showUpgradeNotification(set.name, set.upgradeName);
      } else {
        this.showDiscoveryNotification(`${set.name} Completed!`);
      }
    }
  }
  showUpgradeNotification(setName, upgradeName) {
    const notification = document.getElementById("discovery-notification");
    const titleEl = notification?.querySelector(".notification-title");
    const nameEl = notification?.querySelector(".constellation-name");
    if (notification && titleEl && nameEl) {
      notification.classList.remove("hidden");
      titleEl.textContent = `${setName} Completed!`;
      nameEl.textContent = `Unlocked: ${upgradeName}`;
      nameEl.classList.add("upgrade-text");
      requestAnimationFrame(() => {
        notification.classList.add("visible");
      });
      setTimeout(() => {
        notification.classList.remove("visible");
        setTimeout(() => {
          notification.classList.add("hidden");
          titleEl.textContent = "Constellation Discovered";
          nameEl.classList.remove("upgrade-text");
        }, 5000);
      }, 5000);
    }
  }
}

// src/ui/ObservatorySwitcher.ts
class ObservatorySwitcher {
  dialElement;
  nameplateElement;
  game;
  currentObservatory;
  constructor(game) {
    this.game = game;
    this.currentObservatory = game.getCurrentObservatory();
    this.dialElement = document.getElementById("observatory-dial");
    this.nameplateElement = document.getElementById("observatory-nameplate");
    this.updateUI();
    this.setupEventListeners();
  }
  updateUI() {
    if (!this.dialElement)
      return;
    const sectors = this.dialElement.querySelectorAll(".dial-sector");
    sectors.forEach((sector) => {
      const sectorEl = sector;
      const observatory = sectorEl.dataset.observatory;
      if (observatory === this.currentObservatory) {
        sectorEl.classList.add("active");
      } else {
        sectorEl.classList.remove("active");
      }
    });
    this.updateNameplate();
  }
  updateNameplate() {
    if (!this.nameplateElement)
      return;
    const obs = OBSERVATORIES[this.currentObservatory];
    const locationEl = this.nameplateElement.querySelector(".observatory-location");
    const coordsEl = this.nameplateElement.querySelector(".observatory-coords");
    if (locationEl) {
      locationEl.textContent = obs.name;
    }
    if (coordsEl) {
      coordsEl.textContent = obs.location;
    }
  }
  setupEventListeners() {
    if (!this.dialElement)
      return;
    this.dialElement.addEventListener("click", (e) => {
      const sector = e.target.closest(".dial-sector");
      if (!sector)
        return;
      const observatory = sector.dataset.observatory;
      if (observatory && observatory !== this.currentObservatory) {
        this.switchTo(observatory);
      }
    });
  }
  switchTo(observatory) {
    this.currentObservatory = observatory;
    this.game.switchObservatory(observatory);
    this.updateUI();
  }
}

// src/main.ts
document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("sky-canvas");
  const telescopeOverlay = document.getElementById("telescope-overlay");
  const startScreen = document.getElementById("start-screen");
  const startButton = document.getElementById("start-button");
  if (!canvas || !telescopeOverlay) {
    console.error("Required elements not found");
    return;
  }
  const game = new Game(canvas, telescopeOverlay);
  new ObservatorySwitcher(game);
  startButton?.addEventListener("click", () => {
    startScreen.classList.add("hidden");
    game.start();
  });
});

//# debugId=3B6B738020D884FD64756E2164756E21
//# sourceMappingURL=main.js.map
