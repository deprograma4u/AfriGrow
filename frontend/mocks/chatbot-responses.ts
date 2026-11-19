// Mock data for chatbot responses with translations
export interface ChatbotResponse {
  id: string;
  query: {
    en: string;
    tw: string;
  };
  response: {
    en: string;
    tw: string;
  };
  emoji: string;
}

export const chatbotResponses: ChatbotResponse[] = [
  {
    id: "1",
    query: {
      en: "when plant rice",
      tw: "bere ben na medua mmo"
    },
    response: {
      en: "The best time to plant rice is during the rainy season when there is plenty of water. Prepare your fields by plowing and leveling the soil.",
      tw: "Bere a ɛfata sɛ wodu mmo no yɛ nsusubrata bere a nsuo pii wɔ. Hyɛ wo fam no hɔ sɛnea ɛbɛyɛ a wobehu na woatwa asaase no mu."
    },
    emoji: "🌾",
  },
  {
    id: "2",
    query: {
      en: "tomato disease",
      tw: "nkateɛ yaree"
    },
    response: {
      en: "If your tomato leaves have yellow spots, it might be early blight. Remove affected leaves and spray with a copper-based fungicide.",
      tw: "Sɛ wo nkateɛ ahaban no wɔ mmarima a, ebia ɛyɛ yaree a ɛfata. Pae ahaban a yaree ato no na de duro a ɛwɔ kɔpe a wɔde sa yareɛ no gu so."
    },
    emoji: "🍅",
  },
  {
    id: "3",
    query: {
      en: "best fertilizer corn",
      tw: "aduane pa a ɛfata aburoo"
    },
    response: {
      en: "Corn needs nitrogen-rich fertilizer. Apply when plants are knee-high and again when they start to produce tassels.",
      tw: "Aburoo hia aduan a ɛwɔ nitrogen pii. De gu bere a dua no atɔ wo kotodwe na de bio bere a ɛrefi ase yɛ tassels."
    },
    emoji: "🌽",
  },
  {
    id: "4",
    query: {
      en: "how much water potato",
      tw: "nsuo bɛn na kooko hia"
    },
    response: {
      en: "Potatoes need consistent moisture, about 1-2 inches of water per week. Reduce watering when plants begin to yellow and die back.",
      tw: "Kooko hia nsuo daa, bɛyɛ 1-2 inches wɔ dapɛn biara mu. Fa nsuo a wode ma no so bere a dua no refi ase ayɛ mmarima na ɛrewu."
    },
    emoji: "🥔",
  },
  {
    id: "5",
    query: {
      en: "when harvest wheat",
      tw: "bere ben na mebu aborɔ"
    },
    response: {
      en: "Harvest wheat when the stalks turn from green to yellow and the kernels become hard. If you can dent a kernel with your fingernail, it's not ready yet.",
      tw: "Bu aborɔ bere a nso no afi ahaban ahaban kɔ kokoo na aba no ayɛ duro. Sɛ wubetumi de wo nsa abɔ aba no mu a, ɛnnyɛ bere a ɛfata."
    },
    emoji: "🌾",
  },
];


// // Mock data for chatbot responses
// export interface ChatbotResponse {
//   id: string;
//   query: string;
//   response: string;
//   emoji: string;
// }

// export const chatbotResponses: ChatbotResponse[] = [
//   {
//     id: "1",
//     query: "when plant rice",
//     response:
//       "The best time to plant rice is during the rainy season when there is plenty of water. Prepare your fields by plowing and leveling the soil.",
//     emoji: "🌾",
//   },
//   {
//     id: "2",
//     query: "tomato disease",
//     response:
//       "If your tomato leaves have yellow spots, it might be early blight. Remove affected leaves and spray with a copper-based fungicide.",
//     emoji: "🍅",
//   },
//   {
//     id: "3",
//     query: "best fertilizer corn",
//     response:
//       "Corn needs nitrogen-rich fertilizer. Apply when plants are knee-high and again when they start to produce tassels.",
//     emoji: "🌽",
//   },
//   {
//     id: "4",
//     query: "how much water potato",
//     response:
//       "Potatoes need consistent moisture, about 1-2 inches of water per week. Reduce watering when plants begin to yellow and die back.",
//     emoji: "🥔",
//   },
//   {
//     id: "5",
//     query: "when harvest wheat",
//     response:
//       "Harvest wheat when the stalks turn from green to yellow and the kernels become hard. If you can dent a kernel with your fingernail, it’s not ready yet.",
//     emoji: "🌾",
//   },
// ];
