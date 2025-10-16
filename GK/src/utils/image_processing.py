import cv2
import numpy as np
from PIL import Image
import io

# ImageNet mean and std for normalization
MEAN = np.array([0.485, 0.456, 0.406])
STD = np.array([0.229, 0.224, 0.225])

def process_image(file):
    # Read image from uploaded file
    image_bytes = file.read()
    image = Image.open(io.BytesIO(image_bytes))
    
    # Convert PIL image to cv2 format
    image = np.array(image)
    image = cv2.cvtColor(image, cv2.COLOR_RGB2BGR)
    
    # Resize image to 224x224 (size expected by ResNet)
    image = cv2.resize(image, (224, 224))
    
    # Convert BGR to RGB
    image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
    
    # Normalize image
    image = image / 255.0
    image = (image - MEAN) / STD
    
    return image