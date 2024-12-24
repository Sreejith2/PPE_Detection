from flask import Flask, request, jsonify, send_from_directory
import os
import cv2
from ultralytics import YOLO
from flask_cors import CORS


app = Flask(__name__)

# Enable CORS for all routes and origins (or specify origins if needed)
CORS(app, origins=["http://localhost:5173"], supports_credentials=True)

# Load the YOLO model
model = YOLO('best.pt')  # Replace with your custom model file

# Define PPE classes and industry data (same as in your code)
class_names = [
    "Hardhat", "Mask", "NO-Hardhat", "NO-Mask", "NO-Safety Vest", "Person",
    "Safety Cone", "Safety Vest", "Machinery", "Vehicle"
]

industry_ppe = {
    "Construction": {
        "required_ppe": ["Hardhat", "Safety Vest", "Mask"],
        "dangers": {
            "Hardhat": "Missing a hard hat increases the risk of head injury from falling objects or bumps.",
            "Safety Vest": "Missing a safety vest reduces visibility, increasing the risk of accidents involving vehicles or machinery.",
            "Mask": "Without a mask, workers are exposed to respiratory hazards like dust, fumes, or chemicals, leading to long-term health problems."
        }
    },
    "Manufacturing": {
        "required_ppe": ["Hardhat", "Safety Vest", "Mask"],
        "dangers": {
            "Hardhat": "Not wearing a hard hat exposes you to head injury risks from falling machinery or materials.",
            "Safety Vest": "Missing a safety vest reduces visibility in areas with moving machinery, increasing the risk of accidents.",
            "Mask": "Absence of a mask exposes workers to harmful fumes, chemicals, or dust, which can cause respiratory issues."
        }
    },
    "Oil and Gas": {
        "required_ppe": ["Hardhat", "Safety Vest", "Mask"],
        "dangers": {
            "Hardhat": "Without a hard hat, you are at a high risk of head injuries due to falling objects, equipment, or impacts.",
            "Safety Vest": "The lack of a safety vest reduces your visibility in hazardous areas, particularly near moving vehicles and machinery.",
            "Mask": "Not wearing a mask exposes workers to toxic fumes, dust, and hazardous gases, which can lead to severe health problems."
        }
    },
    "Mining": {
        "required_ppe": ["Hardhat", "Safety Vest", "Mask"],
        "dangers": {
            "Hardhat": "Without a hard hat, you are at a high risk of head injury from falling rocks or equipment.",
            "Safety Vest": "Without a safety vest, your visibility is reduced in low-light or hazardous areas, increasing the risk of accidents.",
            "Mask": "Absence of a mask exposes workers to dangerous dust particles and toxic gases that could cause serious lung conditions."
        }
    },
    "Warehousing": {
        "required_ppe": ["Safety Vest", "Hardhat"],
        "dangers": {
            "Hardhat": "Not wearing a hard hat in a warehouse exposes you to head injuries from falling objects or collisions.",
            "Safety Vest": "Missing a safety vest means you're less visible, which increases the likelihood of accidents with vehicles or machinery."
        }
    }
}

# Image upload folder
UPLOAD_FOLDER = 'static/uploads'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

# Function to process the image for PPE detection
def process_image_for_ppe(image_path, industry):
    image = cv2.imread(image_path)
    results = model(image)  # Perform object detection

    detections = results[0].boxes
    detected_ppe = []
    for detection in detections:
        class_id = int(detection.cls[0])
        confidence = detection.conf[0]

        if confidence > 0.5:
            label = class_names[class_id]
            detected_ppe.append(label)

    required_ppe = industry_ppe[industry]["required_ppe"]
    missing_ppe = [ppe for ppe in required_ppe if ppe not in detected_ppe]

    return detected_ppe, missing_ppe

# API endpoint to upload and process the image
@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({"error": "No file part"})
    file = request.files['file']
    if file.filename == '':
        return jsonify({"error": "No selected file"})

    # Save the uploaded image
    filename = file.filename
    file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
    file.save(file_path)

    # Get industry from request
    industry = request.form.get('industry')
    if not industry:
        return jsonify({"error": "Industry not specified"})

    # Process the image
    detected_ppe, missing_ppe = process_image_for_ppe(file_path, industry)

    # Generate output message and safety information
    response = {
        "detected_ppe": detected_ppe,
        "missing_ppe": missing_ppe,
        "safety_message": {}
    }

    for ppe in missing_ppe:
        response["safety_message"][ppe] = industry_ppe[industry]["dangers"][ppe]

    return jsonify(response)

# Serve uploaded images
@app.route('/uploads/<filename>')
def uploaded_file(filename):
    return send_from_directory(app.config['UPLOAD_FOLDER'], filename)

if __name__ == '__main__':
    app.run(debug=True)
