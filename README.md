# PPE Detection System👷‍♂️

This is a web-based **Personal Protective Equipment (PPE) detection system** designed to enhance workplace safety by identifying compliance with safety standards, such as wearing helmets, masks, and safety vests. The system leverages **YOLOv8 (You Only Look Once)** for real-time object detection and is deployed as a web application using **React** for the frontend and **Flask** for the backend.  

## Key Features  

- **PPE Detection:** Detects and classifies PPE, including hardhats, masks, and safety vests, using YOLOv8.  
- **Industry-Specific Safety Information:** Provides tailored safety messages based on the industry (e.g., Construction, Manufacturing) and missing PPE.  
- **Image Upload and Processing:** Users can upload images, which are processed to identify the presence or absence of required PPE.  
- **Fast and Accurate:** Leverages YOLOv8 for high-speed and precise detection.  

## Step-by-Step Working  

1. **Image Upload:**  
   - Users upload an image of workers through the web interface.  
   - The user specifies the **industry type** to customize PPE requirements.  

2. **Image Processing and Detection:**  
   - The uploaded image is sent to the Flask backend.  
   - YOLOv8, pre-trained on a dataset of PPE images, processes the image to detect and classify PPE items such as helmets, vests, and masks.  

3. **PPE Validation:**  
   - The system compares detected PPE against the mandatory requirements for the specified industry.  
   - Missing PPE is identified.  

4. **Safety Message Generation:**  
   - Based on the missing PPE, the system generates safety warnings and recommendations tailored to the industry.  

5. **Results Display:**  
   - The results, including a list of detected PPE, missing PPE, and safety messages, are displayed on the web application.  
   - The user can also view processed images with bounding boxes around detected PPE items.  

## Example Images  

- **Without PPE:** An example showing a worker without the required PPE.  
  ![Without PPE](Without_PPE.png)  

- **With PPE:** An example showing a worker with the required PPE.  
  ![With PPE](WITH_PPE.png)  

## Endpoints  

### 1. **POST /upload**  

**Description:**  
Allows users to upload an image for PPE detection.  

**Parameters:**  
- **file (file):** The image file containing workers.  
- **industry (form data):** The industry for which PPE requirements and safety warnings are calculated  

**Response:**  
Returns a JSON with:  
- **detected_ppe:** List of PPE detected in the image.  
- **missing_ppe:** List of PPE that is missing, based on the industry.  
- **safety_message:** Safety warnings for each missing PPE.  
- **annotated_image:** Image with bounding boxes around detected PPE items.  
