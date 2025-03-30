from firebase_config import store_data
def add_location():
    """
    Add a location to the Firestore database.
    """
    # Example data to be added
    data = {
        "location": {
            "latitude": 41.7886,
            "longitude": -87.5987
        },
        "timestamp": "2023-10-01T12:00:00Z"
    }
    
    # Store the data in the Firestore database
    store_data("locations", data)