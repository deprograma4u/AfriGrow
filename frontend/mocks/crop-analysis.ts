// Mock data for crop analysis results with translations
export interface CropAnalysis {
  id: string;
  cropName: {
    en: string;
    tw: string;
  };
  condition: {
    en: 'healthy' | 'pest' | 'disease' | 'nutrient' | 'water';
    tw: 'ahooden mu' | 'mmoa bi rehaw' | 'yaree bi' | 'aduane a ɛho hia' | 'nsuo';
  };
  emoji: string;
  description: {
    en: string;
    tw: string;
  };
  recommendations: {
    en: string[];
    tw: string[];
  };
  imageUrl: string;
}

export const cropAnalysisResults: CropAnalysis[] = [
  {
    id: '1',
    cropName: {
      en: 'Rice',
      tw: 'Mmo'
    },
    condition: {
      en: 'healthy',
      tw: 'ahooden mu'
    },
    emoji: '🌾',
    description: {
      en: 'Your rice plants look healthy with good color and growth.',
      tw: 'Wo mmo dua no yɛ hwɛ sɛ ɛwɔ ahooden mu ne hohoro pa ne nyinnyin pa.'
    },
    recommendations: {
      en: [
        'Continue current watering schedule',
        'Apply nitrogen fertilizer during tillering stage',
        'Monitor for pests regularly'
      ],
      tw: [
        'Fa wo nsuo a wode ma no so',
        'De nitrogen aduan gu bere a ɛreyɛ ahaban pii',
        'Hwɛ mmoa a ɛhaw no daa'
      ]
    },
    imageUrl: 'https://images.unsplash.com/photo-1592841200221-a698f307baa',
  },
  {
    id: '2',
    cropName: {
      en: 'Tomato',
      tw: 'Nkateɛ'
    },
    condition: {
      en: 'disease',
      tw: 'yaree bi'
    },
    emoji: '🍅',
    description: {
      en: 'Your tomato plants show signs of early blight with yellow spots.',
      tw: 'Wo nkateɛ dua no reda adanse sɛ ɛwɔ yaree a ɛma ahaban no ayɛ mmarima.'
    },
    recommendations: {
      en: [
        'Remove affected leaves immediately',
        'Apply copper-based fungicide',
        'Improve air circulation between plants',
        'Water at the base to keep leaves dry'
      ],
      tw: [
        'Pae ahaban a yaree ato no ntɛm',
        'De duro a ɛwɔ kɔpe a wɔde sa yareɛ no gu',
        'Ma mframa ntɔ mu yie wɔ dua no ntam',
        'Fa nsuo gu ase sɛnea ɛbɛyɛ a ahaban no nnim nwini'
      ]
    },
    imageUrl: 'https://images.unsplash.com/photo-1592841200221-a698f307baa',
  },
  {
    id: '3',
    cropName: {
      en: 'Corn',
      tw: 'Aburoo'
    },
    condition: {
      en: 'nutrient',
      tw: 'aduane a ɛho hia'
    },
    emoji: '🌽',
    description: {
      en: 'Your corn shows signs of nitrogen deficiency with yellowing leaves.',
      tw: 'Wo aburoo no reda adanse sɛ nitrogen a ɛwɔ mu no nyɛ pɛ na ahaban no reyɛ mmarima.'
    },
    recommendations: {
      en: [
        'Apply nitrogen-rich fertilizer immediately',
        'Side-dress with compost or manure',
        'Consider cover crops for next season'
      ],
      tw: [
        'De aduan a ɛwɔ nitrogen pii gu ntɛm',
        'De compost anaa mfudua gu ne nkyɛn',
        'Hwɛ sɛ wobɛdua dua a ɛbɛboa asaase no wɔ bere a edi hɔ no'
      ]
    },
    imageUrl: 'https://images.unsplash.com/photo-1601593768799-76ac5b3e8cf2',
  },
  {
    id: '4',
    cropName: {
      en: 'Potato',
      tw: 'Kooko'
    },
    condition: {
      en: 'pest',
      tw: 'mmoa bi rehaw'
    },
    emoji: '🥔',
    description: {
      en: 'Your potato plants show signs of Colorado potato beetle damage.',
      tw: 'Wo kooko dua no reda adanse sɛ Colorado potato beetle ahyɛ no so.'
    },
    recommendations: {
      en: [
        'Hand-pick beetles and larvae',
        'Apply neem oil or appropriate insecticide',
        'Consider row covers for young plants',
        'Rotate crops next season'
      ],
      tw: [
        'Fa wo nsa fa mmoa no ne nkwadu no',
        'De neem oil anaa duro a ɛfata a wɔde sa mmoa no gu',
        'Hwɛ sɛ wobɛde adaka kata dua a ɛyɛ mmerɛw no',
        'Sesa wo dua wɔ bere a edi hɔ no'
      ]
    },
    imageUrl: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655',
  },
  {
    id: '5',
    cropName: {
      en: 'Wheat',
      tw: 'Aborɔ'
    },
    condition: {
      en: 'water',
      tw: 'nsuo'
    },
    emoji: '🌾',
    description: {
      en: 'Your wheat appears to be suffering from drought stress.',
      tw: 'Wo aborɔ no reda adanse sɛ ɔkɔm ahyɛ no so.'
    },
    recommendations: {
      en: [
        'Increase irrigation immediately',
        'Apply mulch to retain soil moisture',
        'Water deeply rather than frequently',
        'Consider drought-resistant varieties for next season'
      ],
      tw: [
        'Fa nsuo ma no ntɛm',
        'De mulch gu sɛnea ɛbɛma asaase no nsuo ntɔ mu',
        'Fa nsuo hyɛ mu koraa na mmom mfa nkyɛ',
        'Hwɛ sɛ wobɛdua aborɔ a ɛtumi tena ɔkɔm ase wɔ bere a edi hɔ no'
      ]
    },
    imageUrl: 'https://unsplash.com/photos/wheat-field-y4xZxzN754M',
  },
];


// // Mock data for crop analysis results
// export interface CropAnalysis {
//     id: string;
//     cropName: string;
//     condition: 'healthy' | 'pest' | 'disease' | 'nutrient' | 'water';
//     emoji: string;
//     description: string;
//     recommendations: string[];
//     imageUrl: string;
//   }
  
//   export const cropAnalysisResults: CropAnalysis[] = [
//     {
//       id: '1',
//       cropName: 'Rice',
//       condition: 'healthy',
//       emoji: '🌾',
//       description: 'Your rice plants look healthy with good color and growth.',
//       recommendations: [
//         'Continue current watering schedule',
//         'Apply nitrogen fertilizer during tillering stage',
//         'Monitor for pests regularly',
//       ],
//       imageUrl: 'https://images.unsplash.com/photo-1592841200221-a698f307baa',
//     },
//     {
//       id: '2',
//       cropName: 'Tomato',
//       condition: 'disease',
//       emoji: '🍅',
//       description: 'Your tomato plants show signs of early blight with yellow spots.',
//       recommendations: [
//         'Remove affected leaves immediately',
//         'Apply copper-based fungicide',
//         'Improve air circulation between plants',
//         'Water at the base to keep leaves dry',
//       ],
//       imageUrl: 'https://images.unsplash.com/photo-1592841200221-a698f307baa',
//     },
//     {
//       id: '3',
//       cropName: 'Corn',
//       condition: 'nutrient',
//       emoji: '🌽',
//       description: 'Your corn shows signs of nitrogen deficiency with yellowing leaves.',
//       recommendations: [
//         'Apply nitrogen-rich fertilizer immediately',
//         'Side-dress with compost or manure',
//         'Consider cover crops for next season',
//       ],
//       imageUrl: 'https://images.unsplash.com/photo-1601593768799-76ac5b3e8cf2',
//     },
//     {
//       id: '4',
//       cropName: 'Potato',
//       condition: 'pest',
//       emoji: '🥔',
//       description: 'Your potato plants show signs of Colorado potato beetle damage.',
//       recommendations: [
//         'Hand-pick beetles and larvae',
//         'Apply neem oil or appropriate insecticide',
//         'Consider row covers for young plants',
//         'Rotate crops next season',
//       ],
//       imageUrl: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655',
//     },
//     {
//       id: '5',
//       cropName: 'Wheat',
//       condition: 'water',
//       emoji: '🌾',
//       description: 'Your wheat appears to be suffering from drought stress.',
//       recommendations: [
//         'Increase irrigation immediately',
//         'Apply mulch to retain soil moisture',
//         'Water deeply rather than frequently',
//         'Consider drought-resistant varieties for next season',
//       ],
//       imageUrl: 'https://unsplash.com/photos/wheat-field-y4xZxzN754M',
//     },
//   ];