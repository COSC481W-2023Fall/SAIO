from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def index():
    return "This is the index"