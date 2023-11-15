from fastapi.testclient import TestClient
from src.app import app  

client = TestClient(app)

# Define the user  data
user_edit_data = {
    "name": "Test",
    "email": "test1234@example.com",
    "password": "password",
    "newPass": "123",
    "newEmail": "test12345@gmail.com"
}


def test_user_edit():
    
    response = client.put("https://saio-backend-8b4k2.ondigitalocean.app/edit/", json=user_edit_data)
    
    # Assert that the HTTP response status code is as expected
    assert response.status_code == 200  
    

