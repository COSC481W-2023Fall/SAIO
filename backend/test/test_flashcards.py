import pytest
from fastapi.testclient import TestClient
from src.app import app

client = TestClient(app=app)


def test_create_flashcard():
    # Sample Data
    sample_flashcard_data = {
        "category": "Pytest",
        "user_email": "pytest@example.com",
        "question": "What is the capital of France?",
        "answer": "Paris",
        "options": ["London", "Berlin", "Madrid"]
    }
    response = client.post("/flashcards", json=sample_flashcard_data)

    # Assert status code
    assert response.status_code == 200

    # Assert response
    response_json = response.json()
    assert response_json["category"] == "Pytest"
    assert response_json["user_email"] == "pytest@example.com"




