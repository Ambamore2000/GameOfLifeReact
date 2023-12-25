from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def read_root():
    return {"message": "GoLSimulator FastAPI backend is up and running!"}
