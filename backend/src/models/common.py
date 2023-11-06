from pydantic import BaseModel

class MessageResponse(BaseModel):
    detail: str = 'Message'

class OkResponse(BaseModel):
    detail: str = 'OK'

class BadResponse(BaseModel):
    detail: str = 'Bad request'

class NotFoundResponse(BaseModel):
    detail: str = 'Not found'

class UnprocessableResponse(BaseModel):
    detail: str = 'Unprocessable entity'