from fastapi.testclient import TestClient
from fastapi import status
# importing
from app import app

client = TestClient(app=app)


def test_check_email():
    # Use the TestClient to make a GET request to the check email endpoint
    response = client.get("/api/check-email/sample@gmail.com")

    # Assert that the HTTP response status code is as expected
    assert response.status_code == 200

    # Assert the response content
    response_json = response.json()
    assert response_json["email_exists"] == True


