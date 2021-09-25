import json
import random
import requests

class TestBot():
    def __init__(self):
        with open('./api/chatbot/messages.json', 'r') as f:
            self.messages = json.load(f)

        self.activated = False

    def reply(self, msg):

        if msg == "activated":
            self.activated = True
            msg_for_reply = None

        elif "天気" in msg:
            msg_for_reply = self._weather_reply()
        
        else:
            msg_candidates = self.messages["test_messages"]
            reply_ind = random.randint(0, len(msg_candidates)-1)
            msg_for_reply = msg_candidates[reply_ind]

        return msg_for_reply

    def ask_feeling(self):
        ask_feeling_messages = [
            "今の気分はどう？",
            "調子はどうだい？",
            "今日のやる気はどんな感じかな？"
        ]
        return random.choice(ask_feeling_messages)


    def _weather_reply(self):
        API_KEY = '85dfe16ce798f29f97f7ddc7df4a29df'
        city = 'Tokyo'

        params = (
            ('units', 'metric'),
            ('q', f'{city}'),
            ('APPID', f'{API_KEY}'),
        )
        

        response = requests.get('http://api.openweathermap.org/data/2.5/weather', params=params)

        data = response.json()
        weather = data["weather"][0]["main"]

        msg_for_reply = f"今日の天気は{weather}だよ。"
        

        return msg_for_reply