from flask import Flask, jsonify
import random

app = Flask(__name__)

@app.route('/data')
def data():
    return jsonify({
        "temperature": random.randint(25,35),
        "humidity": random.randint(50,80),
        "soil_moisture": random.randint(30,70),
        "rain": random.choice(["Yes", "No"]),
        "ultrasonic": random.randint(5,100),
        "motion": random.choice(["Detected", "No Motion"]),
        "ldr": random.choice(["Bright", "Dark"])
    })

app.run(host='127.0.0.1', port=5000)