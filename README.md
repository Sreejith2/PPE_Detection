# PPE Detection System

This is a backend service that uses a YOLO-based object detection model to identify Personal Protective Equipment (PPE) in images. The service checks if workers are wearing the required PPE based on their industry and provides safety warnings for any missing equipment.

## Key Features

- **PPE Detection:** Detects and classifies PPE such as hardhats, masks, and safety vests in images.
- **Industry-Specific Safety Information:** Provides safety messages based on the industry (e.g., Construction, Manufacturing) and missing PPE.
- **Image Upload and Processing:** Users can upload images, which are processed for PPE detection.
  
### Example Images

- **Without PPE**: An example showing worker without the required PPE.
  ![Without PPE](Without_PPE.jpg)

- **With PPE**: An example showing worker with the required PPE.
  ![With PPE](WITH_PPE.jpg)

## Endpoints

### 1. **POST /upload**

**Description:** Allows users to upload an image for PPE detection.

**Parameters:**
- **file (file):** The image file containing workers.
- **industry (form data):** The industry for which PPE requirements and safety warnings are calculated.

**Response:**
Returns a JSON with:
- **detected_ppe:** List of PPE detected in the image.
- **missing_ppe:** List of PPE that is missing, based on the industry.
- **safety_message:** Safety warnings for each missing PPE.


