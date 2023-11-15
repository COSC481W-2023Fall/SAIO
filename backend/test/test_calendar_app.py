import pytest

from fastapi.testclient import TestClient
from fastapi import status

# Import root app
from src import app

# Create the Client
client = TestClient(app.app)

# Calendar Root
def test_calendar_root():
    response = client.get("/app/calendar/")
    assert response.status_code == 200
