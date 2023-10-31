from fastapi.testclient import TestClient
from ..src.app import app  

client = TestClient(app)

# Define the user registration data
user_registration_data = {
    "name": "Test",
    "email": "test1234@example.com",
    "password": "password"
}


def test_user_registration():
    # Use the TestClient to make a POST request to the user registration endpoint
    response = client.post("https://saio-backend-8b4k2.ondigitalocean.app/account", json=user_registration_data)
    
    # Assert that the HTTP response status code is as expected
    assert response.status_code == 200  
    
    # Assert the response content 
    response_json = response.json()
    assert "user_id" in response_json
    assert response_json["message"] == "User registered successfully"


