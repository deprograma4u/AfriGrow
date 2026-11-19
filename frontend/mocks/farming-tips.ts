export interface FarmingTip {
  id: string;
  title: {
    en: string;
    tw: string;
  };
  emoji: string;
  description: {
    en: string;
    tw: string;
  };
  imageUrl: string;
}

export const farmingTips: FarmingTip[] = [
  {
    id: '1',
    title: {
      en: 'Water in the morning',
      tw: 'Fa nsuo gu anɔpa'
    },
    emoji: '💧',
    description: {
      en: 'Water plants early in the morning to reduce evaporation and fungal growth.',
      tw: 'Fa nsuo gu dua no anɔpa kɔɔpem sɛnea ɛbɛyɛ a nsuo nnwuru na fungi nnwɔ so.'
    },
    imageUrl: require('@/assets/tips/irigation.jpeg'),
  },
  {
    id: '2',
    title: {
      en: 'Crop rotation',
      tw: 'Dua a wosakra'
    },
    emoji: '🔄',
    description: {
      en: 'Change crop locations each season to prevent soil depletion and reduce pests.',
      tw: 'Sakra beae a wodu dua no bere biara sɛnea ɛbɛyɛ a asaase no ho nhia na mmoa a ɛhaw no ato so.'
    },
    imageUrl: require('@/assets/tips/crop-rotation.jpeg'),
  },
  {
    id: '3',
    title: {
      en: 'Natural pest control',
      tw: 'Mmoa a ɛhaw no a wɔde wɔn ho sa'
    },
    emoji: '🐞',
    description: {
      en: 'Use beneficial insects like ladybugs to control harmful pests naturally.',
      tw: 'De mmoa te sɛ ladybugs a ɛyɛ fɛfoɔ di dwuma sɛnea ɛbɛyɛ a wobɛsa mmoa a ɛhaw no.'
    },
    imageUrl: require('@/assets/tips/pest.jpeg'),
  },
  {
    id: '4',
    title: {
      en: 'Mulching',
      tw: 'Mulch a wɔde gu dua ho'
    },
    emoji: '🍂',
    description: {
      en: 'Apply mulch around plants to conserve moisture and suppress weeds.',
      tw: 'De mulch gu dua no ho sɛnea ɛbɛyɛ a nsuo bɛtɔ mu na nhaban bɔne nnwɔ so.'
    },
    imageUrl: require('@/assets/tips/mulching.jpeg'),
  },
  {
    id: '5',
    title: {
      en: 'Composting',
      tw: 'Compost a wɔyɛ'
    },
    emoji: '♻️',
    description: {
      en: 'Create compost from kitchen scraps and yard waste for natural fertilizer.',
      tw: 'Yɛ compost fi aduan a wɔato gua ne efifide a wɔato gua mu ma aduan a ɛyɛ fie.'
    },
    imageUrl: require('@/assets/tips/composting.jpeg'),
  },
  {
    id: '6',
    title: {
      en: 'Soil testing',
      tw: 'Asaase nhwehwɛmu'
    },
    emoji: '🧪',
    description: {
      en: 'Test your soil regularly to understand nutrient needs and pH levels.',
      tw: 'Hwɛ wo asaase no daa sɛnea ɛbɛyɛ a wobɛte aseɛ nea ɛho hia ne pH a ɛwɔ mu.'
    },
    imageUrl: require('@/assets/tips/soiltesting.jpeg'),
  },
];


// export interface FarmingTip {
//     id: string;
//     title: string;
//     emoji: string;
//     description: string;
//     imageUrl: string;
//   }
  
//   export const farmingTips: FarmingTip[] = [
//     {
//       id: '1',
//       title: 'Water in the morning',
//       emoji: '💧',
//       description: 'Water plants early in the morning to reduce evaporation and fungal growth.',
//       imageUrl: require('@/assets/tips/irigation.jpeg'),
//     },
//     {
//       id: '2',
//       title: 'Crop rotation',
//       emoji: '🔄',
//       description: 'Change crop locations each season to prevent soil depletion and reduce pests.',
//       imageUrl: require('@/assets/tips/crop-rotation.jpeg'),
//     },
//     {
//       id: '3',
//       title: 'Natural pest control',
//       emoji: '🐞',
//       description: 'Use beneficial insects like ladybugs to control harmful pests naturally.',
//       imageUrl: require('@/assets/tips/pest.jpeg'),
//     },
//     {
//       id: '4',
//       title: 'Mulching',
//       emoji: '🍂',
//       description: 'Apply mulch around plants to conserve moisture and suppress weeds.',
//       imageUrl: require('@/assets/tips/mulching.jpeg'),
//     },
//     {
//       id: '5',
//       title: 'Composting',
//       emoji: '♻️',
//       description: 'Create compost from kitchen scraps and yard waste for natural fertilizer.',
//       imageUrl: require('@/assets/tips/composting.jpeg'),
//     },
//     {
//       id: '6',
//       title: 'Soil testing',
//       emoji: '🧪',
//       description: 'Test your soil regularly to understand nutrient needs and pH levels.',
//       imageUrl: require('@/assets/tips/soiltesting.jpeg'),
//     },
//   ];