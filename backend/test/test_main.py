from fastapi.testclient import TestClient
from fastapi import status

import sys
 
# setting path
sys.path.append('..')
 
# importing
from app import app


client = TestClient(app=app)

def test_index_returns_correct():
	response = client.get('/')
	
	assert response.status_code == status.HTTP_200_OK
	assert response.json() == {"message":"This is the index"}
	
	