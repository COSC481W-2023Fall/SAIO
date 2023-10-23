from fastapi.testclient import TestClient
from app import app  

client = TestClient(app)

# Define the user registration data
user_registration_data = {
    "name": "Test",
    "email": "test7777@example.com",
    "password": "password"
}


def test_user_registration():
    # Use the TestClient to make a POST request to the user registration endpoint
    response = client.post("/account", json=user_registration_data)
    
    # Assert that the HTTP response status code is as expected
    assert response.status_code == 200  # Change this to the expected status code
    
    # Assert the response content or structure as needed
    # For example, you can check if the response message is as expected
    response_json = response.json()
    assert response_json["message"] == "User registered successfully"

