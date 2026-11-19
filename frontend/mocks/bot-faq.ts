export interface BotFaqType {
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
  
  export const BotFaqs: BotFaqType[] = [
    {
      id: "1",
      query: {
        en: "When should I plant rice?",
        tw: "Bere ben na medua mmo?"
      },
      response: {
        en: "The ideal time to plant rice is at the beginning of the rainy season when fields can be properly flooded. Rice requires consistent water supply, so planting 2-3 weeks after rains begin ensures adequate moisture for growth.",
        tw: "Bere a ɛfata sɛ wodu mmo no yɛ nsusubrata no mfiase bere a wubetumi ahyɛ nsuo mu yie. Mmo hia nsuo daa, enti sɛ wudu no akyiri aprem 2-3 akyi bere a osu afi ase no, ɛbɛma nsuo a ɛfata wɔ hɔ ma nyinnyin."
      },
      emoji: "🌾",
    },
    {
      id: "2",
      query: {
        en: "How to treat tomato disease?",
        tw: "Meye den asa nkateɛ yaree?"
      },
      response: {
        en: "For common tomato diseases like blight or wilt: 1) Remove infected plants immediately 2) Apply copper-based fungicide weekly 3) Ensure proper spacing (24-36 inches) for air circulation 4) Water at soil level to keep leaves dry 5) Rotate crops yearly to prevent soil-borne diseases.",
        tw: "Ma yaree te sɛ blight anaa wilt a ɛba nkateɛ so no: 1) Pae dua a yaree ato no ntɛm 2) De duro a ɛwɔ kɔpe a wɔde sa yareɛ no gu dapɛn biara 3) Hwɛ sɛ dua no wɔ tɛtrɛtɛ (24-36 inches) ma mframa betumi atɔ mu 4) Fa nsuo gu ase sɛnea ɛbɛyɛ a ahaban no nnim nwini 5) Sesa beae a wodu no afe biara sɛnea ɛbɛyɛ a yaree a efiri asaase mu nnkɔ so."
      },
      emoji: "🍅",
    },
    {
      id: "3",
      query: {
        en: "Best fertilizer for corn?",
        tw: "Emuru ben na ɛfata aburoo?"
      },
      response: {
        en: "Corn responds best to nitrogen-rich fertilizers. Recommended application: 1) Apply 10-15kg of NPK 15-15-15 per acre at planting 2) Side-dress with urea (46-0-0) when plants reach knee height 3) For organic options, use well-composted manure at 15-20 tons per acre before planting.",
        tw: "Aburoo di nnam wɔ emuru a ɛwɔ nitrogen pii mu. Kwan a ɛfata so: 1) De NPK 15-15-15 a ɛyɛ kilogram 10-15 gu acre biara mu bere a wuredu no 2) De urea (46-0-0) gu ne nkyɛn bere a dua no atɔ wo kotodwe 3) Sɛ wopɛ emuru a ɛyɛ fie a, de mfudua a wɔatoto mu yie a ɛyɛ ton 15-20 gu acre biara mu ansa na wudu no."
      },
      emoji: "🌽",
    }
  ];