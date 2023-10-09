from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def index():
    return {"message": "This is the index"}
