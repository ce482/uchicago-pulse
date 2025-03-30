import os
import json
from dotenv import load_dotenv
import firebase_admin
from firebase_admin import credentials, firestore, auth



# Load environment variables from a .env file
load_dotenv()

# Get the Firebase key path from the environment variable
key_path = os.getenv("FIREBASE_KEY_PATH", "pulsefirebase/uchicagopulsedata-firebase-key.json")

# Load the key file dynamically
try:
    with open(key_path) as json_file:
        key_data = json.load(json_file)
except FileNotFoundError:
    raise FileNotFoundError(
        f"Firebase key file not found at {key_path}. Please ensure the file exists and the path is correct."
    )

# Initialize Firebase app with the loaded key data
cred = credentials.Certificate(key_data)
firebase_admin.initialize_app(cred)

# Initialize Firestore
db = firestore.client()

def store_data(collection_type, data):
    """
    Store data in Firestore.
    
    Args:
        collection_type (str): The type of collection to store data in.
        data (dict): The data to store.
    """
    # Reference to the Firestore collection
    collection_ref = db.collection(collection_type)
    
    # Add the data to the collection
    collection_ref.add(data)



