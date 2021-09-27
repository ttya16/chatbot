from fastapi import FastAPI, WebSocket, websockets
from fastapi.responses import HTMLResponse
from fastapi.middleware.cors import CORSMiddleware

from chatbot.testbot import TestBot

import settings

app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:3000",
    "http://0.0.0.0:5000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

bot = TestBot(settings.WEATHER_API_KEY)


@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    try:
        while True:
            data = await websocket.receive_text()
            reply = bot.reply(data)
            if reply:
                await websocket.send_text(reply)

    except:
        await websocket.close()    

if __name__ == "__main__":
    import uvicorn
    
    uvicorn.run("main:app", host="0.0.0.0", port=5000, reload=True)