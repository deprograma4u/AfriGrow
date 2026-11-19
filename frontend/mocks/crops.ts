// Mock data for crops with translations
export interface Crop {
  id: string;
  name: {
    en: string;
    tw: string;
  };
  emoji: string;
  season: {
    en: string;
    tw: string;
  };
  waterNeeds: {
    en: "low" | "medium" | "high";
    tw: "ketewa" | "mfinimfini" | "kɛse";
  };
  sunNeeds: {
    en: "low" | "medium" | "high";
    tw: "ketewa" | "mfinimfini" | "kɛse";
  };
  growthTime: number; // in days
  tips: {
    en: string[];
    tw: string[];
  };
  imageUrl: string;
}

export const crops: Crop[] = [
  {
    id: "1",
    name: {
      en: "Rice",
      tw: "Mmo"
    },
    emoji: "🌾",
    season: {
      en: "Rainy",
      tw: "Nsusubrata"
    },
    waterNeeds: {
      en: "high",
      tw: "kɛse"
    },
    sunNeeds: {
      en: "high",
      tw: "kɛse"
    },
    growthTime: 120,
    tips: {
      en: [
        "Keep fields flooded during growth",
        "Transplant seedlings when they have 3-4 leaves",
        "Harvest when 80% of grains turn golden yellow"
      ],
      tw: [
        "Mfa nsuo hyɛ wo fam bere a mmo no reyɛ",
        "Fa nkateɛ a wowo no gu foforo bere a ahaban 3-4 wo ho",
        "Bu bere a 80% aba no ayɛ kokoo sika"
      ]
    },
    imageUrl: require("@/assets/crops/rice.jpeg"),
  },
  {
    id: "2",
    name: {
      en: "Corn",
      tw: "Aburoo"
    },
    emoji: "🌽",
    season: {
      en: "Summer",
      tw: "Opepon"
    },
    waterNeeds: {
      en: "medium",
      tw: "mfinimfini"
    },
    sunNeeds: {
      en: "high",
      tw: "kɛse"
    },
    growthTime: 90,
    tips: {
      en: [
        "Plant when soil temperature reaches 60°F",
        "Space plants 8-12 inches apart",
        "Water deeply once a week"
      ],
      tw: [
        "Duu bere a asaase no hyew yɛ 60°F",
        "Fa aburoo no yɛ 8-12 inches ntam",
        "Fa nsuo hyɛ mu koraa dapɛn biara mu baako"
      ]
    },
    imageUrl: require("@/assets/crops/maize.jpeg"),
  },
  {
    id: "3",
    name: {
      en: "Tomato",
      tw: "Ntoose"
    },
    emoji: "🍅",
    season: {
      en: "Summer",
      tw: "Opepon"
    },
    waterNeeds: {
      en: "medium",
      tw: "mfinimfini"
    },
    sunNeeds: {
      en: "high",
      tw: "kɛse"
    },
    growthTime: 70,
    tips: {
      en: [
        "Support plants with stakes or cages",
        "Water at the base to prevent leaf diseases",
        "Harvest when fruits are firm and fully colored"
      ],
      tw: [
        "De abo anaa adaka boa nkateɛ no",
        "Fa nsuo gu ase sɛnea ɛbɛyɛ a ahaban no nnim yareɛ",
        "Bu bere a nkateɛ no ayɛ duro na ato hohoro pa"
      ]
    },
    imageUrl: require("@/assets/crops/tomatos.jpeg"),
  },
  // {
  //   id: "4",
  //   name: {
  //     en: "Wheat",
  //     tw: "Aborɔ"
  //   },
  //   emoji: "🌾",
  //   season: {
  //     en: "Winter",
  //     tw: "Abere"
  //   },
  //   waterNeeds: {
  //     en: "medium",
  //     tw: "mfinimfini"
  //   },
  //   sunNeeds: {
  //     en: "high",
  //     tw: "kɛse"
  //   },
  //   growthTime: 240,
  //   tips: {
  //     en: [
  //       "Plant in well-drained soil",
  //       "Apply nitrogen fertilizer at planting",
  //       "Harvest when grain is hard and plants are yellow"
  //     ],
  //     tw: [
  //       "Duu fam a nsuo tɔ mu yie mu",
  //       "De nitrogen aduan gu bere a woredi kan duu no",
  //       "Bu bere a aba no ayɛ duro na dua no ayɛ kokoo"
  //     ]
  //   },
  //   imageUrl: require("@/assets/crops/wheat.jpeg"),
  // },
  {
    id: "5",
    name: {
      en: "Casava",
      tw: "Bankye"
    },
    emoji: "🍠",
    season: {
      en: "Spring",
      tw: "Akwantu"
    },
    waterNeeds: {
      en: "medium",
      tw: "mfinimfini"
    },
    sunNeeds: {
      en: "medium",
      tw: "mfinimfini"
    },
    growthTime: 100,
    tips: {
      en: [
        "Plant seed casavas 4-6 inches deep",
        "Hill soil around plants as they grow",
        "Harvest after plants flower and begin to yellow"
      ],
      tw: [
        "Duu kooko aba no 4-6 inches fam",
        "Fa asaase hyɛ dua no ho bere a ereyɛ",
        "Bu bere a dua no ahomegye na ɛfifi ase ayɛ kokoo"
      ]
    },
    imageUrl: require("@/assets/crops/casava.jpg"),
  },
  {
    id: "6",
    name: {
      en: "Onion",
      tw: "Gyene"
    },
    emoji: "🧅",
    season: {
      en: "Winter",
      tw: "Abere"
    },
    waterNeeds: {
      en: "medium",
      tw: "mfinimfini"
    },
    sunNeeds: {
      en: "high",
      tw: "kɛse"
    },
    growthTime: 120,
    tips: {
      en: [
        "Plant in loose, well-drained soil",
        "Space plants 4-6 inches apart",
        "Harvest when tops fall over and begin to dry"
      ],
      tw: [
        "Duu fam a ɛyɛ hyew na nsuo tɔ mu yie",
        "Fa gyene no yɛ 4-6 inches ntam",
        "Bu bere a etiri no ato fam na ɛfifi ase ayɛ nwini"
      ]
    },
    imageUrl: require("@/assets/crops/onion.jpeg"),
  }
];

// // Mock data for crops
// export interface Crop {
//   id: string;
//   name: string;
//   emoji: string;
//   season: string;
//   waterNeeds: "low" | "medium" | "high";
//   sunNeeds: "low" | "medium" | "high";
//   growthTime: number; // in days
//   tips: string[];
//   imageUrl: string,
// }

// export const crops: Crop[] = [
//   {
//     id: "1",
//     name: "Rice",
//     emoji: "🌾",
//     season: "Rainy",
//     waterNeeds: "high",
//     sunNeeds: "high",
//     growthTime: 120,
//     tips: [
//       "Keep fields flooded during growth",
//       "Transplant seedlings when they have 3-4 leaves",
//       "Harvest when 80% of grains turn golden yellow",
//     ],
//     imageUrl: require("@/assets/crops/rice.jpeg"),
//     // imageUrl: "https://images.unsplash.com/photo-1536054953991-2f9adc0f9270",
//   },
//   {
//     id: "2",
//     name: "Corn",
//     emoji: "🌽",
//     season: "Summer",
//     waterNeeds: "medium",
//     sunNeeds: "high",
//     growthTime: 90,
//     tips: [
//       "Plant when soil temperature reaches 60°F",
//       "Space plants 8-12 inches apart",
//       "Water deeply once a week",
//     ],
//     imageUrl: require("@/assets/crops/maize.jpeg"),
//     // imageUrl: "https://images.unsplash.com/photo-1601593768799-76ac5b3e8cf2",
//   },
//   {
//     id: "3",
//     name: "Tomato",
//     emoji: "🍅",
//     season: "Summer",
//     waterNeeds: "medium",
//     sunNeeds: "high",
//     growthTime: 70,
//     tips: [
//       "Support plants with stakes or cages",
//       "Water at the base to prevent leaf diseases",
//       "Harvest when fruits are firm and fully colored",
//     ],
//     imageUrl: require("@/assets/crops/tomatos.jpeg"),
//     // imageUrl: "https://images.unsplash.com/photo-1592841200221-a6898f307baa",
//   },
//   {
//     id: "4",
//     name: "Wheat",
//     emoji: "🌾",
//     season: "Winter",
//     waterNeeds: "medium",
//     sunNeeds: "high",
//     growthTime: 240,
//     tips: [
//       "Plant in well-drained soil",
//       "Apply nitrogen fertilizer at planting",
//       "Harvest when grain is hard and plants are yellow",
//     ],
//     imageUrl: require("@/assets/crops/wheat.jpeg"),
//     // imageUrl: "https://images.unsplash.com/photo-1535912559317-99a2ae608c53",
//   },
//   {
//     id: "5",
//     name: "Potato",
//     emoji: "🥔",
//     season: "Spring",
//     waterNeeds: "medium",
//     sunNeeds: "medium",
//     growthTime: 100,
//     tips: [
//       "Plant seed potatoes 4-6 inches deep",
//       "Hill soil around plants as they grow",
//       "Harvest after plants flower and begin to yellow",
//     ],
//     imageUrl: require("@/assets/crops/potato.jpeg"),
//     // imageUrl: "https://images.unsplash.com/photo-1518977676601-b53f82aba655",
//   },
//   {
//     id: "6",
//     name: "Onion",
//     emoji: "🧅",
//     season: "Winter",
//     waterNeeds: "medium",
//     sunNeeds: "high",
//     growthTime: 120,
//     tips: [
//       "Plant in loose, well-drained soil",
//       "Space plants 4-6 inches apart",
//       "Harvest when tops fall over and begin to dry",
//     ],
//     imageUrl: require("@/assets/crops/onion.jpeg"),
//     // imageUrl: "https://images.unsplash.com/photo-1618512496248-a3c12c67b1ce",
//   },
// ];
