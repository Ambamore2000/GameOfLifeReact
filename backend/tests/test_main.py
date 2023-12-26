from fastapi.testclient import TestClient
from ..app.main import app

client = TestClient(app)

def test_initialize_grid():
    response = client.get("/initialize/")
    assert response.status_code == 200
    assert 'grid' in response.json()
    assert len(response.json()['grid']) == 100
    assert len(response.json()['grid'][0]) == 100
    assert response.json()['grid'][0][0] == 0

def test_model_predict():
    test_grid = {'prediction': [[0 for _ in range(100)] for _ in range(100)]}
    response = client.post("/model_predict/", json=test_grid)
    assert response.status_code == 200
    assert 'prediction' in response.json()
    assert len(response.json()['prediction']) == 100
    assert len(response.json()['prediction'][0]) == 100

def test_actual_predict_glider():
    glider_grid = [[0 for _ in range(100)] for _ in range(100)]
    glider_grid[1][2] = 1
    glider_grid[2][3] = 1
    glider_grid[3][1] = glider_grid[3][2] = glider_grid[3][3] = 1

    response = client.post("/actual_predict/", json={"prediction": glider_grid})
    assert response.status_code == 200
    result_grid = response.json()['prediction']

    expected_grid = [[0 for _ in range(100)] for _ in range(100)]
    expected_grid[1][3] = 1
    expected_grid[2][1] = expected_grid[2][3] = 1
    expected_grid[3][2] = expected_grid[3][3] = 1
    for i in range(100):
        for j in range(100):
            assert result_grid[i][j] == expected_grid[i][j]