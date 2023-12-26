from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import numpy as np
import tensorflow as tf
from tensorflow import keras
import os
#from typing import List

app = FastAPI()

# CORS configuration for cross-origin requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # Configure the allowed origins as needed
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Pydantic model for grid data
class Grid(BaseModel):
    data: list#List[List[int]]

# Custom metric function for TensorFlow model
def dice_coefficient(y_true: tf.Tensor, y_pred: tf.Tensor, smooth: float = 1e-6) -> tf.Tensor:
    y_true_f = tf.reshape(y_true, [-1])
    y_pred_f = tf.reshape(y_pred, [-1])
    intersection = tf.reduce_sum(y_true_f * y_pred_f)
    union = tf.reduce_sum(y_true_f) + tf.reduce_sum(y_pred_f)
    return (2. * intersection + smooth) / (union + smooth)

# Path setup for the TensorFlow model
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
model_path = os.path.join(BASE_DIR, 'models', 'gol_10000_2_100_100_model.h5')

# Model loading with error handling
try:
    model = keras.models.load_model(model_path, custom_objects={'dice_coefficient': dice_coefficient})
except Exception as e:
    raise HTTPException(status_code=500, detail=str(e))

# Endpoints
#@app.get("/initialize/", response_model=Grid)
#async def initialize_grid() -> Grid:
@app.get("/initialize/")
async def initialize_grid():
    # Endpoint to initialize a 100x100 grid
    grid = np.zeros((100, 100), dtype=int).tolist()
    return {"grid": grid}

#@app.post("/model_predict/", response_model=Grid)
#async def model_predict(grid: Grid) -> Grid:
@app.post("/model_predict/")
async def model_predict(grid: Grid):
    # Endpoint to predict the next state of the grid
    prediction_grid = np.array(grid.data)
    predicted_next_state = model.predict(np.expand_dims(np.expand_dims(prediction_grid, axis=0), axis=-1))[0]
    predicted_next_state = (predicted_next_state > 0.5).astype(int)
    predicted_next_state = predicted_next_state.reshape(100, 100)
    return {"prediction": predicted_next_state.tolist()}

#def simulate_game_of_life(grid: List[List[int]]) -> List[List[int]]:
def simulate_game_of_life(grid):
    # Function to simulate the Game of Life rules
    extended_grid = np.pad(grid, pad_width=1, mode='wrap')
    next_state = np.zeros_like(grid)

    for i in range(1, extended_grid.shape[0] - 1):
        for j in range(1, extended_grid.shape[1] - 1):
            total = extended_grid[i-1:i+2, j-1:j+2].sum() - extended_grid[i, j]
            if extended_grid[i, j] == 1:
                next_state[i-1, j-1] = 1 if total in [2, 3] else 0
            else:
                next_state[i-1, j-1] = 1 if total == 3 else 0

    return next_state

#@app.post("/actual_predict/", response_model=Grid)
#async def actual_predict(grid: Grid) -> Grid:
@app.post("/actual_predict/")
async def actual_predict(grid: Grid):
    # Endpoint to predict using the actual game rules
    current_state = np.array(grid.data)
    next_state = simulate_game_of_life(current_state)
    return {"prediction": next_state.tolist()}
