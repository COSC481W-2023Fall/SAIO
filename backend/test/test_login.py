from fastapi.testclient import TestClient
from fastapi import status
# importing
from src.app import app

client = TestClient(app=app)


# Define the user  data
user_data = {
   
    "email": "lennon@yahoo.com",
    "password": "123"
}

def test_login():
    # Use the TestClient to make a GET request to the check email endpoint
    response = client.post("http://127.0.0.1:8000/login/token", json=user_data)

    # Assert that the HTTP response status code is as expected
    assert response.status_code == 200



