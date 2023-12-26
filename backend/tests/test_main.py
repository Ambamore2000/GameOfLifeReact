from fastapi.testclient import TestClient
from ..app.main import app

client = TestClient(app)

def print_first_5x5(grid):
    for row in grid[:5]:
        print(row[:5])

def test_initialize_grid():
    response = client.get("/initialize/")
    assert response.status_code == 200
    grid = response.json()['grid']

    print("Initialize Grid:")
    print_first_5x5(grid)

    assert 'grid' in response.json()
    assert len(grid) == 100 and len(grid[0]) == 100
    assert all(all(cell == 0 for cell in row) for row in grid)

def test_model_predict():
    test_grid = {'data': [[0 for _ in range(100)] for _ in range(100)]}
    response = client.post("/model_predict/", json=test_grid)
    if response.status_code != 200:
        print("Response content:", response.content)
    assert response.status_code == 200
    prediction = response.json()['prediction']

    print("Model Predict Grid:")
    print_first_5x5(prediction)

    assert 'prediction' in response.json()
    assert len(prediction) == 100 and len(prediction[0]) == 100

def test_actual_predict_glider():
    glider_grid_data = [[0 for _ in range(100)] for _ in range(100)]
    glider_grid_data[1][2] = 1
    glider_grid_data[2][3] = 1
    glider_grid_data[3][1] = glider_grid_data[3][2] = glider_grid_data[3][3] = 1

    print("Simulation Input Grid:")
    print_first_5x5(glider_grid_data)

    response = client.post("/actual_predict/", json={'data': glider_grid_data})
    if response.status_code != 200:
        print("Response content:", response.content)
    assert response.status_code == 200
    result_grid = response.json()['prediction']

    print("Simulation Output Grid:")
    print_first_5x5(result_grid)

    expected_grid = [[0 for _ in range(100)] for _ in range(100)]
    expected_grid[2][1] = expected_grid[2][3] = 1
    expected_grid[3][2] = expected_grid[3][3] = 1
    expected_grid[4][2] = 1

    print("Simulation Expected Grid:")
    print_first_5x5(expected_grid)
    for i in range(100):
        for j in range(100):
            assert result_grid[i][j] == expected_grid[i][j]