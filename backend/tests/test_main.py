from fastapi.testclient import TestClient
from ..app.main import app

# Initialize TestClient
client = TestClient(app)

def test_initialize_grid():
    """
    Test the '/initialize/' endpoint to ensure it returns
    a 100x100 grid initialized to zeros.
    """
    response = client.get("/initialize/")
    assert response.status_code == 200
    grid = response.json()['grid']
    assert 'grid' in response.json()
    assert len(grid) == 100 and len(grid[0]) == 100
    assert all(all(cell == 0 for cell in row) for row in grid)

def test_model_predict():
    """
    Test the '/model_predict/' endpoint with a 100x100 empty grid.
    The endpoint's response structure and status code are validated.
    """
    test_grid = {'data': [[0 for _ in range(100)] for _ in range(100)]}
    response = client.post("/model_predict/", json=test_grid)
    assert response.status_code == 200
    assert 'prediction' in response.json()
    prediction = response.json()['prediction']
    assert len(prediction) == 100 and len(prediction[0]) == 100

def test_actual_predict_glider():
    """
    Test the '/actual_predict/' endpoint with the first iteration
    of the glider pattern. Validates that the response matches the
    expected second iteration of the glider pattern.
    """
    # Define the initial glider pattern
    glider_grid = [[0 for _ in range(100)] for _ in range(100)]
    glider_grid[1][2] = 1
    glider_grid[2][3] = 1
    glider_grid[3][1] = glider_grid[3][2] = glider_grid[3][3] = 1

    # Test the endpoint
    response = client.post("/actual_predict/", json={"data": glider_grid})
    assert response.status_code == 200
    result_grid = response.json()['prediction']

    # Define the expected pattern after one iteration
    expected_grid = [[0 for _ in range(100)] for _ in range(100)]
    expected_grid[1][3] = 1
    expected_grid[2][1] = expected_grid[2][3] = 1
    expected_grid[3][2] = expected_grid[3][3] = 1

    # Check that the result matches the expected pattern
    for i in range(100):
        for j in range(100):
            assert result_grid[i][j] == expected_grid[i][j]
