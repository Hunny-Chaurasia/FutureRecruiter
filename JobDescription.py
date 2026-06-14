import os
import spacy
from spacy.language import Language
from spacy_langdetect import LanguageDetector
# lines = []

# while True:
#     line = input()
#     if line == "END":
#         break
#     lines.append(line)

# input_Text = "\n".join(lines)

# print(input_Text)
# if os.path.exists("JobDescription.txt"):
#     with open("JobDescription.txt", "w") as file:
#         file.write(input_Text)
# else:
#     with open("JobDescription.txt", "x") as file:
#         file.write(input_Text)

input_text="""The Senior Machine Learning Engineer position is a full-time, on-site role based in Bangalore, India, requiring a minimum of 5 years of professional experience in machine learning and artificial intelligence. The ideal candidate should possess strong expertise in designing, developing, deploying, and optimizing machine learning solutions at scale while collaborating with cross-functional teams to solve complex business problems. The role demands proficiency in Python, SQL, Machine Learning, Deep Learning, Natural Language Processing (NLP), Generative AI, Large Language Models (LLMs), and model optimization techniques. Candidates should have hands-on experience with frameworks and tools such as TensorFlow, PyTorch, Scikit-learn, Hugging Face Transformers, Docker, Kubernetes, MLflow, and cloud platforms like AWS, Azure, or GCP. Knowledge of vector databases, embeddings, Retrieval-Augmented Generation (RAG), FAISS, and ChromaDB is highly desirable. Applicants should hold a Bachelor's or Master's degree in Computer Science, Artificial Intelligence, Data Science, or a related field and demonstrate experience in building production-grade ML systems. Additional advantages include expertise in Generative AI applications, RAG-based architectures, and working with modern LLMs such as GPT, Claude, Gemini, Llama, or Mistral. The successful candidate will contribute to delivering scalable AI solutions, improving model performance, reducing inference latency, and driving measurable business impact through innovative machine learning technologies.
"""

# skillsREq=[]
# ExperienceReq=[]
# EligibilityReq=[]


# lines=para.split(".")
# for i in lines:
#     print(i)

#  Multilingual NER Model Loading 
try:
    nlp = spacy.load("en_core_web_sm") 
except Exception:
    print("Model nahi mila! Pehle terminal mein run karein: python3 -m spacy download xx_ent_wiki_sm")
    nlp = spacy.blank("xx")

#  Language Detector Setup 
@Language.factory("language_detector")
def get_lang_detector(nlp, name):
    return LanguageDetector()

# Pipeline mein language detector adding
if "language_detector" not in nlp.pipe_names:
    nlp.add_pipe("language_detector", last=True)

print(" Universal NLP + NER Pipeline Started \n")


# UNIVERSAL PARSER FUNCTION (With NER)

def process_text_universal(input_text):
    doc = nlp(input_text)
    
    # 1. Language Detection
    detected_lang = doc._.language['language']
    print(f"==================================================")
    print(f"📝 [Detected Language]: {detected_lang.upper()}")
    print(f"==================================================")
    
    # 2. Named Entity Recognition (NER)
    print("\n🔍 [Named Entities Found]:")
    entities_found = False
    # doc.ents se hume saari entities (Places, Names, Orgs) mil jati hain
    for ent in doc.ents:
        entities_found = True
        # ent.text = actual word, ent.label_ = category (LOC=Location, ORG=Organization, PER=Person)
        print(f"  - {ent.text} -> ({ent.label_})")
        
    if not entities_found:
        print("  - Koi specific named entity nahi mili.")

    # 3. Dynamic Text Cleaning (Removing Helping Verbs / Stopwords)
    clean_words = []
    try:
        lang_stopwords = nlp.vocab.lang_data.get("stop_words", set())
    except Exception:
        lang_stopwords = set()

    for token in doc:
        word = token.text.strip()
        # Token level filtration
        if word and not token.is_punct and not token.is_space:
            if word.lower() not in lang_stopwords:
                clean_words.append(word)
                
    print("\n🧹 [Cleaned Tokens (No Helping Verbs)]:")
    print("  -", clean_words[:15]) # Pehle 15 clean words print kar rahe hain
    print("\n")


# TESTING NER WITH DIFFERENT LANGUAGES


# Test 1: English (Aapki Job Description ka chunk)
eng_jd = "Senior Machine Learning Engineer needed at Google in Bangalore India. Experience required."
process_text_universal(eng_jd)

# Test 2: Hindi (Devanagari)
hindi_resume = "अमित कुमार दिल्ली में रहते हैं और Microsoft में काम करते हैं।"
process_text_universal(hindi_resume)

# Test 3: Spanish
spanish_text = "Carlos vive en Madrid y trabaja para Apple."
process_text_universal(spanish_text)