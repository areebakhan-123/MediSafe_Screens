import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from google import genai
from google.genai import types

app = Flask(__name__)
CORS(app)

# Nayi Key jo aapne abhi banayi
client = genai.Client(api_key="AIzaSyAJIDRzDFuoyVvO4epV1uatCAQvGDQW1Rs")

@app.route('/scan', methods=['POST'])
def scan_label():
    print(">>> Request Received for Gemini 2.5!")
    try:
        if 'image' not in request.files:
            return jsonify({"error": "No image"}), 400
        
        file = request.files['image']
        image_bytes = file.read()
        
        # --- MODEL NAME UPDATED FROM YOUR LIST ---
        response = client.models.generate_content(
            model="gemini-2.5-flash", 
            contents=[
                "Extract active ingredients from this medicine and list safety warnings.",
                types.Part.from_bytes(data=image_bytes, mime_type="image/jpeg")
            ]
        )
        
        print(">>> SUCCESS! Gemini 2.5 responded.")
        return jsonify({"extracted_text": [response.text]})

    except Exception as e:
        print(f">>> FAILED: {str(e)}")
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)