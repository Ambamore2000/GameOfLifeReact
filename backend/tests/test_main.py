from fastapi.testclient import TestClient
from ..app.main import app  # Replace with the name of your FastAPI application file

client = TestClient(app)

def test_initialize_grid():
    response = client.get("/initialize/")
    assert response.status_code == 200
    assert 'grid' in response.json()
    assert len(response.json()['grid']) == 100
    assert len(response.json()['grid'][0]) == 100
    assert response.json()['grid'][0][0] == 0  # Assumes the grid is initialized to zeros

# Add more tests for other endpoints
