export interface WeatherInfo {
  id: string;
  condition: {
    en: string;
    tw: string;
  };
  emoji: string;
  temperature: number;
  rainfall: number;
  humidity: number;
  wind: number;
  advice: {
    en: string;
    tw: string;
  };
  date?: string;
}

export const weatherInfo: WeatherInfo[] = [
  {
    id: "1",
    condition: {
      en: "Sunny",
      tw: "Ewia rehyeran"
    },
    emoji: "☀️",
    temperature: 32,
    rainfall: 0,
    humidity: 45,
    wind: 10,
    advice: {
      en: "Good day for harvesting. Ensure adequate irrigation for young plants.",
      tw: "Ɛda pa ma mfitiaseɛ dua. Hwɛ sɛ wode nsuo ma dua a ɛyɛ mmerɛw no yie."
    }
  },
  {
    id: "2",
    condition: {
      en: "Rainy",
      tw: "Osutɔ bere"
    },
    emoji: "🌧️",
    temperature: 24,
    rainfall: 25,
    humidity: 85,
    wind: 15,
    advice: {
      en: "Delay spraying pesticides. Check drainage systems to prevent waterlogging.",
      tw: "Gyae duro a wɔde sa mmoa no gu foforo. Hwɛ nsuo a ɛtɔ fam no kwan sɛ ɛnnhyɛ mu."
    }
  },
  {
    id: "3",
    condition: {
      en: "Cloudy",
      tw: "Esorɔ ne mununkum"
    },
    emoji: "☁️",
    temperature: 28,
    rainfall: 0,
    humidity: 60,
    wind: 8,
    advice: {
      en: "Good conditions for transplanting seedlings. Moderate watering needed.",
      tw: "Ɛhyɛ yie sɛ wotu nkateɛ foforo. Fa nsuo gu dua no mu kakraa bi."
    }
  },
  {
    id: "4",
    condition: {
      en: "Stormy",
      tw: "Mframa kɛse ne osutɔ"
    },
    emoji: "⛈️",
    temperature: 22,
    rainfall: 45,
    humidity: 90,
    wind: 30,
    advice: {
      en: "Secure young plants and structures. Avoid open fields during lightning.",
      tw: "Boa dua a ɛyɛ mmerɛw ne nneɛma a ɛwɔ fam no yie. Gyae kwan wɔ beaeɛ a mframa kɛse reba no mu."
    }
  }
];


// export interface WeatherInfo {
//   id: string;
//   condition: string;
//   emoji: string;
//   temperature: number;
//   rainfall: number;
//   humidity: number;
//   wind: number;
//   advice: string;
// }

// export const weatherInfo: WeatherInfo[] = [
//   {
//     id: "1",
//     condition: "Sunny",
//     emoji: "☀️",
//     temperature: 32,
//     rainfall: 0,
//     humidity: 45,
//     wind: 10,
//     advice:
//       "Good day for harvesting. Ensure adequate irrigation for young plants.",
//   },
//   {
//     id: "2",
//     condition: "Rainy",
//     emoji: "🌧️",
//     temperature: 24,
//     rainfall: 25,
//     humidity: 85,
//     wind: 15,
//     advice:
//       "Delay spraying pesticides. Check drainage systems to prevent waterlogging.",
//   },
//   {
//     id: "3",
//     condition: "Cloudy",
//     emoji: "☁️",
//     temperature: 28,
//     rainfall: 0,
//     humidity: 60,
//     wind: 8,
//     advice:
//       "Good conditions for transplanting seedlings. Moderate watering needed.",
//   },
//   {
//     id: "4",
//     condition: "Stormy",
//     emoji: "⛈️",
//     temperature: 22,
//     rainfall: 45,
//     humidity: 90,
//     wind: 30,
//     advice:
//       "Secure young plants and structures. Avoid open fields during lightning.",
//   },
// ];
