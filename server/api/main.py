from fastapi import FastAPI, WebSocket, websockets
from fastapi.responses import HTMLResponse
from fastapi.middleware.cors import CORSMiddleware

from chatbot.testbot import TestBot

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

bot = TestBot()

# html = """
# <!DOCTYPE html>
# <html>
#     <head>
#         <title>Chat</title>
#     </head>
#     <body>
#         <h1>WebSocket Chat</h1>
#         <form action="" onsubmit="sendMessage(event)">
#             <input type="text" id="messageText" autocomplete="off"/>
#             <button>Send</button>
#         </form>
#         <div id="yourMessage">
#         </div>
#         <div id='replyMessage'>
#         </div>
#         <script>
#             var ws = new WebSocket("ws://localhost:5000/ws");
#             ws.onmessage = function(event) {
#                 var content = document.createTextNode(event.data)
                
#                 document.getElementById('replyMessage').innerHTML = "BOT'S REPLY: " + event.data
#             };
#             function sendMessage(event) {
#                 var input = document.getElementById("messageText")
#                 document.getElementById('yourMessage').innerHTML = "YOUR INPUT: " + input.value
#                 ws.send(input.value)
#                 input.value = ''
#                 event.preventDefault()
#             }
#         </script>
#     </body>
# </html>
# """


# @app.get("/")
# async def get():
#     return HTMLResponse(html)


@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    try:
        while True:
            data = await websocket.receive_text()
            reply = bot.reply(data)
            await websocket.send_text(reply)
    except:
        await websocket.close()

if __name__ == "__main__":
    import uvicorn
    
    uvicorn.run("main:app", host="0.0.0.0", port=5000, reload=True)