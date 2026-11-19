
import torch
import warnings
import os
from dotenv import load_dotenv
load_dotenv(os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", ".env.local"))
warnings.filterwarnings("ignore")

# from config.configSettings import Config
from groq import Groq
from openai import OpenAI


# config = Config()
# config.validate()

# groc = config.get('GrocApi_key')
# API_KEY = config.get('ABENA_API')
groc = ""
API_KEY = ""

# Initialize client
# client = AbenasClient(api_key=API_KEY)

class TwiEnglishTranslatorHF:
    def __init__(self, model_name="../models/nllb-200-distilled-600M"):
        """
        Initializing a Twi ↔ English translator using Hugging Face NLLB pipeline.
        Downloads the model locally (first time only).
        """

        # self.client = Groq(api_key=groc)
        self.client = OpenAI(
            api_key=os.getenv("DEEPSEEK_API_KEY"),
            base_url="https://api.deepseek.com"
        )

        # Device setup: 0 = GPU, -1 = CPU
        device = 0 if torch.cuda.is_available() else -1

        # Resolve model path relative to this file so it works regardless of CWD
        # base_dir = os.path.dirname(os.path.abspath(__file__))
        # candidate_path = os.path.normpath(os.path.join(base_dir, model_name))
        # local_model_path = candidate_path if os.path.isdir(candidate_path) else model_name

        # Load Hugging Face translation pipeline
        # self.translator = pipeline(
        #     "translation",
        #     model=local_model_path,
        #     tokenizer=local_model_path,
        #     device=device
        # )

        # # Language codes
        # self.twi_code = "twi_Latn"
        # self.eng_code = "eng_Latn"

    def translate_twi_to_english(self, text):
        
        return self._translate(text, "", "English")
        # query = "Mepɛ sɛ mimme kookoo, mfuturo bɛne na ɛfata?"

        # system_prompt = """
        # You are a professional translator specializing in Akan Twi to English translations.  
        # Your task is to provide an accurate and exact translation from Akan Twi to English.  

        # Context:  
        # - The sentences you will be translating are agricultural-based questions and conversations.  
        # - Do not add extra explanations, cultural notes, or rephrasing—just return the translation in natural, correct English.  
        # - Maintain agricultural terminology as close to the original meaning as possible.  
        # - If a Twi word has no direct English equivalent, provide the closest agricultural English term in brackets.  

        # Format:  
        # Input (Akan Twi): <insert text>  
        # Output (English): <exact translation>
        # """

        # chat_completion = self.client.chat.completions.create(
        #     messages=[
        #         {
        #             "role": "system",
        #             "content": system_prompt
        #         },
        #         {
        #             "role": "user",
        #             "content": text,
        #         }
        #     ],

        #     # The language model which will generate the completion.
        #     model="llama-3.3-70b-versatile"
        # )

        # # Print the completion returned by the LLM.
        # translation = chat_completion.choices[0].message.content
        # # print("Translation: ", translation.split(":")[1])
        # tore = ""
        # try:
        #     tore = translation.split(":")[1]
        # except:
        #     tore = translation


        # return tore

    def translate_twi_to_english_second(self, text):

        # return self._translate(text, self.twi_code, self.eng_code)
        return "Hello"


    def translate_english_to_twi(self, text):
        return self._translate(text, "", "Twi")
        # system_prompt = """
        # You are a professional translator specializing in English to Akan Twi translations.  
        # Your task is to provide an accurate and exact translation from English to Akan Twi.  

        # Context:  
        # - The sentences you will be translating are agricultural-based answers and conversations.  
        # - Do not add extra explanations, cultural notes, return the translation in natural, correct Akan Twi.  
        # - Maintain agricultural terminology as close to the original meaning as possible. 
        
        # Format:  
        # Output (Akan Twi): <exact translation>
        # """

        # chat_completion = self.client.chat.completions.create(
        #     messages=[
        #         {
        #             "role": "system",
        #             "content": system_prompt
        #         },
        #         {
        #             "role": "user",
        #             "content": text,
        #         }
        #     ],

        #     # The language model which will generate the completion.
        #     model="llama-3.3-70b-versatile"
        # )

        # # Print the completion returned by the LLM.
        # translation = chat_completion.choices[0].message.content
        # toret = ""
        # try:
        #     toret = translation.split(":")[1]

        # except:
        #     toret = translation
        # return toret


    def translate_english_to_twi_sec(self, text):
        # return self._translate(text, self.eng_code, self.twi_code)
        return "Hellow"

    def _translate(self, text, src_lang, tgt_lang):
        """
        Internal translation method using Hugging Face pipeline.
        Works with single strings or lists of strings.
        """
        # results = self.translator(
        #     text,
        #     src_lang=src_lang,
        #     tgt_lang=tgt_lang,
        #     max_length=512
        # )

        # # Pipeline returns list of dicts -> extract text
        # if isinstance(results, list):
        #     return [r["translation_text"] for r in results]
        # return results["translation_text"]
        
        system_msg = {
            "role": "system",
            "content": (
                "You are a skilled translator between English and Twi. "
                f"Translate the user input into {tgt_lang}, preserving meaning."
                "in the received text, when you number writen in the form (1-2) convert it to the form (1 to 2)"
                "some twi to english example crops are (ntose/ntos - Tomatoes), (Aburo - Corn/Maize), (Mmo/ɛmo - Rice), (Bankye - Casava), (Gyeene - Onion)"
                """and some twi - english translated sentences are (
                1.	ɛkwan bɛn so na mɛtumi adua aburo ama no anyini yie - How can I plant maize to make it grow well?
                2.	ɛkwan bɛn so na mɛtumi adua ɛmoo ama no anyini yie - How can I plant rice to make it grow well?
                3.	ɛkwan bɛn so na mɛtumi adua entoose ama no anyini yie - How can I plant tomatoes to make it grow well?
                4.	ɛkwan bɛn so na mɛtumi adua bankye ama no anyini yie - How can I plant cassava to make it grow well?
                5.	Anamɔn bɛn na mɛtu a ɛbɛma dɔteɛ ayɛ fɔrɔmfɔrɔm – What steps should I take to make the soil fertile
                6.	mɛyɛ dɛn de nnuru ahyɛ aburo nnɔbaeɛ mu - How do I apply fertilizer to maize plants?
                7.	kwan bɛn so na mɛtumi abɔ me ɛmoo ho ban - How can I protect my rice farm?
                8.	medua aburo a berɛ bɛn na ɛbɛdi ansaana mɛtumi atwa - If I plant maize, how long will it take before I can harvest?
                9.	ɛdɛn na mede bɛyi yareɛ ɛwɔ ntoose ahaban mu - What should I use to treat the disease on the tomato leaves?
                10.	berɛ bɛn na ɛsɛ sɛ medua ɛmoo aa ɛbɛma me anya nfasoɔ - When is the right time to plant rice to get benefits?
                11.	ɛdeɛn na ɛkyerɛ sɛ bankye aso sɛ yɛ tu - What shows that cassava is ready for harvesting?
                12.	sɛn na wogu nsuo wɔ ɛmoo so - How do you water/irrigate rice?
                13.	asaase futuo bɛn na  ɛyɛ ma aburo dua - Which soil type is good for planting maize?
                14.	berɛ bɛn na ɛsɛ sɛ wotwa nnɔbaeɛ yi nyinaa (aburo,ntoose,bankye ne ɛmoo) - When should all these crops (maize, tomatoes, cassava, rice) be harvested?
                15.	ɔhaw bɛn na ɛtaa ba bankye mu ɛbɛrɛ a woretu - What problems usually occur in cassava during the harvesting period?
                16.	sɛ entoose nyini na anso abaa ɛdeɛn na wobɛyɛ - If tomatoes don't grow or are stunted, what should be done?
                17.	sɛ wohu sɛ nnuaba no mo biara ayɛ basaa a deɛn na wobɛyɛ - If you see that all the plant leaves have turned yellow, what should you do?
                18.	mɛyɛ dɛn de nnuru ahyɛ bankye nnɔbaeɛ mu - How do I apply fertilizer to cassava plants?
                19.	kwan bɛn so na mɛtumi abɔ me aburo ho ban - How can I protect my maize farm?
                20.	ɛdɛn na mede bɛyi yareɛ ɛwɔ ɛmoo mu - What should I use to treat the disease in rice?
                21. Sɛ medua eboraa kwan bɛn so na mɛbɔ ho ban - If i plant maize how will i protect it
                22. Anamɔn bɛn na mɛtu a me ntoose bɛso ntɛm - What method should I use so that my tomatoes will grow quickly?
                23. Bɛrɛ bɛn na ɛsɛ sɛ mede agudeɛ gu me ntoose so - At what time should I apply fertilizer to my tomatoes?
                24. Nsuo dodoɔ bɛn na aburoo hia na atumi anyini yie - How much water does maize need to grow well?”
                25. agudeɛ bɛn na ɛsɛ sɛ mede gu ma aburo so berɛ bɛn mu - What type of fertilizer should I apply to maize, and at what time?
                26. Asaase futuo bɛn na ɛyɛ ma ntoose dua - What type of soil is good for tomato cultivation?
                27. Awia dodoɔ bɛn na ntoose hia da biara- How much sunlight do tomatoes need each day?”
                28. Mmoawa bɛn na ɛseɛ ntooose na kwan bɛn so na mɛdi wɔn ho dwuma? - Which insects affect tomatoes and how can I control them? 
                29. Mmoawa bɛn na ɛseɛ gyeene na kwan bɛn so na mɛdi wɔn ho dwuma? - Which insects affect onoin and how can I control them? 
                30. Mmoawa bɛn na ɛseɛ ɛmoo na kwan bɛn so na mɛdi wɔn ho dwuma? - Which insects affect rice and how can I control them? 
                31. Mmoawa bɛn na ɛseɛ bankye na kwan bɛn so na mɛdi wɔn ho dwuma? - Which insects affect cassava and how can I control them? 
                32. Asase ne nsuo tebea bɛn na ɛfata ɛmo dua- What type of soil and water conditions are best for rice farming?”
                33. Bere bɛn na ɛfata sɛ yɛ dua ɛmoo ne bere bɛn na ɛfata sɛ yɛtwa no - When is the best time to plant rice, and when is the best time to harvest it?”
                34. Sɛn na mɛhwɛ ɛmo afuo mu nhwiren ho - How do I control weeds in a rice farm?
                35. Dɛn na mɛyɛ ama me ɛmoo aba ayɛ dɔɔso wɔ akuraa biako mu -What should I do to increase the yield of my rice farm
                36. Asase bɛn na wo bɛtumi adua gyeene wɔ so - What type of soil can you cultivate onion on?
                37. Bɛrɛ bɛn na ɛfata sɛ medua gyeene-eWhat is the right season to plant onion ?
                38. Dɛn nti na gyeene mmɔden no nni aba- Why is the onion farming not yielding well
                39. Sɛ metwa gyeene no wie a kwan bɛn na mefaso abɔ ho ban sɛnea ɛnseɛ -After I harvest the onion, what is the way to preserve it properly from spoiling?
                40. Asase bɛn na ɛfata bankye dua- Of course. What type of soil is suitable for cultivating cassava
                41. Mmerɛ bɛn mu na ɛfata sɛ mete bankye mu translate to english- Of course. In which season is it suitable to harvest my cassava
                42. Bankye betumi anya aba pa wɔ ɔpɛ berɛ mu anaa- Of course. Can cassava yield well in the dry season?
                43. Nsɛnkyerɛmu bɛn na ɛkyerɛ sɛ aburo aba hia nsuo anaa aduro -"Which signs show that maize needs water or fertilizer?
                44. Nsɛnkyerɛmu bɛn na ɛkyerɛ sɛ ntoose aba hia nsuo anaa aduro -"Which signs show that tomatoes needs water or fertilizer?
                45. Nsuo dodoɔ bɛn na aburo hia wɔ ne nkosoɔ ahorow no mu - How much water does maize need during its different growth stages
                46. Mɛyɛ dɛn na masiesie ntoose mma ansaana madua- What should I do to prepare the seed before I plant?
                47. Mpɛn ahe na ɛsɛ sɛɛ megu nsuo wɔ me ntoose no so: How many times should I water my seeds?
                48. Mɛtumi de afifideɛ afoforo afra bankye adua anaa - Of course. Can I intercrop cassava with other plants?
                49. Mɛyɛ dɛn na masi nnomaa sɛ ɔnwe me ɛmoo - Of course. What should I do to prevent birds from eating my corn?
                50. Bɛrɛ bɛn na ɛsɛ sɛɛ megyae sɛɛ megu nsuo wɔ gyeene no so ansaana matwa- When should I stop watering the onion before harvesting?
                )"""
            )
        }

        user_prompt = f"Translate into {tgt_lang}: {text}"

        messages = [
            system_msg,
            {"role": "user", "content": user_prompt}
        ]
        
        response = self.client.chat.completions.create(
            model="deepseek-chat",
            messages=messages,
            stream=False
        )

        # print(response.choices[0].message.content)

        return  response.choices[0].message.content


# translator = TwiEnglishTranslatorHF()
# # translator.translate_english_to_twi("When should I plant my corn in Ghana")
# # translator.translate_twi_to_english("Bɛrɛ bɛn na ɛsɛ sɛ mɛtɛ mɛ aburo wo ghana")
# print(translator.translate_twi_to_english("mɛnkyɛ na mɛtumi dua m’aburu wɔ gana"))