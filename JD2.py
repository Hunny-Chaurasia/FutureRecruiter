import nltk

#tokenization
nltk.download('punkt')
from nltk.tokenize import word_tokenize
input_text="""The Senior Machine Learning Engineer position is a full-time, on-site role based in Bangalore, India, requiring a minimum of 5 years of professional experience in machine learning and artificial intelligence. The ideal candidate should possess strong expertise in designing, developing, deploying, and optimizing machine learning solutions at scale while collaborating with cross-functional teams to solve complex business problems. The role demands proficiency in Python, SQL, Machine Learning, Deep Learning, Natural Language Processing (NLP), Generative AI, Large Language Models (LLMs), and model optimization techniques. Candidates should have hands-on experience with frameworks and tools such as TensorFlow, PyTorch, Scikit-learn, Hugging Face Transformers, Docker, Kubernetes, MLflow, and cloud platforms like AWS, Azure, or GCP. Knowledge of vector databases, embeddings, Retrieval-Augmented Generation (RAG), FAISS, and ChromaDB is highly desirable. Applicants should hold a Bachelor's or Master's degree in Computer Science, Artificial Intelligence, Data Science, or a related field and demonstrate experience in building production-grade ML systems. Additional advantages include expertise in Generative AI applications, RAG-based architectures, and working with modern LLMs such as GPT, Claude, Gemini, Llama, or Mistral. The successful candidate will contribute to delivering scalable AI solutions, improving model performance, reducing inference latency, and driving measurable business impact through innovative machine learning technologies.
"""
tokens=word_tokenize(input_text)
print(tokens)

# removing stopwrds
from nltk.corpus import stopwords
stop=set(stopwords.words('english')) 
clean=[w for w in tokens if w not in stop and ( w.isalpha() or w.isnumeric())]
print(clean)

