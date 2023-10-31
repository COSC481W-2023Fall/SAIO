from fastapi.testclient import TestClient
from fastapi import status
# importing
from ..src.app import app

client = TestClient(app=app)


def test_check_password():
    # Use the TestClient to make a GET request to the check password endpoint
    response = client.get("/api/check-password/123")

    # Assert that the HTTP response status code is as expected
    assert response.status_code == 200

    # Assert the response content
    response_json = response.json()
    assert response_json["password_exists"] == True


