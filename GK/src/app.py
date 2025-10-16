from flask import Flask, request, render_template, jsonify
from flask_cors import CORS
from keras.models import load_model
import numpy as np
from utils.image_processing import process_image

app = Flask(__name__)
CORS(app)
model = load_model('models/model.h5')

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/predict', methods=['POST'])
def predict():
    if 'image' not in request.files:
        return jsonify({'error': 'No file uploaded'}), 400
    
    file = request.files['image']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400
    
    try:
        img = process_image(file)
        prediction = model.predict(np.expand_dims(img, axis=0))
        # Fix the logic: prediction[0][0] > 0.5 means Closed (label=1), <= 0.5 means Open (label=0)
        result = 'Ngủ gật' if prediction[0][0] > 0.5 else 'Không ngủ gật'
        confidence = float(prediction[0][0]) if prediction[0][0] > 0.5 else float(1 - prediction[0][0])
        return jsonify({
            'success': True, 
            'prediction': result,
            'confidence': f"{confidence:.2%}"
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)