from transformers import AutoTokenizer
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
from collections import Counter
from nltk.stem import WordNetLemmatizer
import spacy
from sklearn.feature_extraction.text import TfidfVectorizer
# from spellchecker import SpellChecker # Agar zaroorat ho toh ise baad mein uncomment kar sakte hain

f=
print("--- NLP Pipeline Started ---\n")

# =====================================================================
# 1. SKLEARN (TfidfVectorizer)
# Use: Text ko numbers (vectors) mein badalna aur important words ko weight dena.
# =====================================================================
TEXTi='''# Senior Machine Learning Engineer

**Location:** Bangalore, India (On-site)
**Experience Required:** 5+ Years
**Employment Type:** Full-Time

## About the Role

We are seeking a highly skilled Senior Machine Learning Engineer to join our growing AI team in Bangalore. The ideal candidate will have strong experience designing, developing, deploying, and optimizing machine learning solutions at scale. You will work closely with data scientists, software engineers, and product teams to build intelligent systems that solve real-world business problems.

## Key Responsibilities

* Design, develop, and deploy machine learning models for production environments.
* Build end-to-end ML pipelines for data preprocessing, training, validation, and inference.
* Develop scalable solutions for predictive analytics, recommendation systems, NLP, and computer vision applications.
* Optimize model performance, latency, and scalability.
* Collaborate with cross-functional teams to translate business requirements into AI-driven solutions.
* Monitor model performance and implement continuous improvement strategies.
* Stay updated with the latest advancements in AI, ML, and Generative AI technologies.

## Required Skills (Must Have)

### Machine Learning & AI

* Machine Learning
* Deep Learning
* Natural Language Processing (NLP)
* Generative AI
* Large Language Models (LLMs)
* Model Evaluation & Optimization

### Programming

* Python (Expert Level)
* SQL

### Frameworks & Libraries

* TensorFlow
* PyTorch
* Scikit-learn
* Hugging Face Transformers

### Data Engineering & MLOps

* ML Pipelines
* Feature Engineering
* Model Deployment
* Docker
* Kubernetes
* CI/CD for ML
* MLflow

### Cloud Platforms

* AWS (Preferred)
* Azure or GCP

### Databases

* PostgreSQL
* MongoDB

### Vector Search & Retrieval

* FAISS
* ChromaDB
* Vector Embeddings
* Retrieval-Augmented Generation (RAG)

## Qualifications

* Bachelor's or Master's degree in Computer Science, Artificial Intelligence, Data Science, or related field.
* 5+ years of hands-on experience in Machine Learning Engineering.
* Experience deploying ML models to production environments.
* Strong understanding of data structures, algorithms, and software engineering principles.

## Preferred Qualifications

* Experience with Generative AI applications.
* Experience building RAG-based systems.
* Experience working with LLMs such as Llama, GPT, Claude, Gemini, or Mistral.
* Contributions to open-source AI/ML projects.
* Research publications in AI/ML-related domains.

## Success Metrics

* Production-grade ML model deployment.
* Model accuracy and performance improvements.
* Scalable AI solution delivery.
* Reduced inference latency and infrastructure costs.
* Business impact through AI-driven innovation.
'''
docs=TEXTi.splitlines()


vectorizer = TfidfVectorizer(stop_words='english')
X = vectorizer.fit_transform(docs)
print("[1] TF-IDF Features:", vectorizer.get_feature_names_out())
print("-" * 50)


# =====================================================================
# 2. NLTK (Tokenization, Stopwords) & COLLECTIONS (Counter)
# Use: Text ke tukde (tokens) karna, faltu words hatana, aur frequency count karna.
# =====================================================================
text = "I am learning machine learning and data science in Bangalore"

# Tokenization (Words alag karna)
tokens = word_tokenize(text)

# Stopwords removal (is, am, are, and jaise words hatana)
stop_words = set(stopwords.words('english'))
keywords = [word for word in tokens if word.lower() not in stop_words]

# Counter (Sabse zyada use hone wale words dhoondna)
freq = Counter(keywords)
print("[2] Most Common Keywords:", freq.most_common(3))
print("-" * 50)


# =====================================================================
# 3. SPACY (Named Entity Recognition - NER)
# Use: Text mein se real-world entities (jaise Places, Names, Orgs) pehchanna.
# =====================================================================
nlp = spacy.load("en_core_web_sm")
doc = nlp(text)
print("[3] SpaCy Named Entities:")
for ent in doc.ents:
    print(f"  - {ent.text} -> ({ent.label_})")
print("-" * 50)


# =====================================================================
# 4. NLTK (WordNetLemmatizer)
# Use: Words ko unke base form (root word) mein badalna. (e.g., running -> run)
# =====================================================================
lemmatizer = WordNetLemmatizer()
words = ['running', 'runs', 'ran']
result = [lemmatizer.lemmatize(word, pos='v') for word in words]
print("[4] Lemmatized Words:", result)
print("-" * 50)


# =====================================================================
# 5. TRANSFORMERS (AutoTokenizer)
# Use: LLMs (Large Language Models) jaise BERT ya GPT ke liye tokens banana.
# =====================================================================
# Hum 'bert-base-uncased' model ka tokenizer use kar rahe hain
tokenizer = AutoTokenizer.from_pretrained("bert-base-uncased")
bert_tokens = tokenizer.tokenize(text)
print("[5] Transformers (BERT) Tokens:\n", bert_tokens)

print("\n--- All Libraries Executed Successfully! ---")