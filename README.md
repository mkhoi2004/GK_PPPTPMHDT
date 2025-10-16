# Flask Image Classifier

This project is a Flask web application that allows users to upload images and use a trained machine learning model to make predictions based on the uploaded images.

## Project Structure

```

 src
   ├── app.py                # Main entry point of the Flask application
   ├── models
   │   └── model.h5         # Trained model in HDF5 format
   ├── static
   │   ├── css
   │   │   └── style.css     # CSS styles for the web application
   │   └── js
   │       └── main.js       # JavaScript for client-side functionality
   ├── templates
   │   ├── base.html         # Base HTML template
   │   └── index.html        # Main HTML template for image upload
   └── utils
       └── image_processing.py # Utility functions for image processing
── requirements.txt           # Project dependencies
── README.md                  # Project documentation
```

## Setup Instructions


1. Create a virtual environment:
   ```
   python -m venv venv
   ```

2. Activate the virtual environment:
   - On Windows:
     ```
     venv\Scripts\activate
     ```
   - On macOS/Linux:
     ```
     source venv/bin/activate
     ```

3. Install the required dependencies:
   ```
   pip install -r requirements.txt
   ```

## Usage

1. Run the Flask application:
   ```
   python src/app.py
   ```

2. Open your web browser and go to `http://127.0.0.1:5000`.

3. Use the interface to upload images and view predictions.

## License

This project is licensed under the MIT License.