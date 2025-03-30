from firebase_config import store_data
def save_user_data():
    user_data = {
        "name": "John Doe",
        "email": "john.doe@example.com",
    }

    try:
        doc_id = user_data("users", user_data)
        print(f"User data stored with document ID: {doc_id}")
    except Exception as error:
        print(f"Failed to store user data: {error}")

if __name__ == "__main__":
    save_user_data()

