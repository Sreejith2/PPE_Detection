import React,{useContext} from 'react'
import axios from 'axios'
import ImgUpload from './ImgUpload'
import { PpeContext } from '../PpeContext.jsx';

function Upload() {
    const { setMissingPpe, setSafetyMessages, setImageUrl,setDetectedPpe } = useContext(PpeContext);

    const handleImageUpload = async (img, industry) => {
        const formData = new FormData();
        formData.append('file', img);
        formData.append('industry', industry);
    
        try {
            const response = await axios.post('http://127.0.0.1:5000/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
    
            console.log("Response from backend:", response.data);  // Debugging step
    
            // Check the structure of the response
            if (response.data.safety_message) {
                setSafetyMessages(response.data.safety_message);  // Update context state
            }
    
            setDetectedPpe(response.data.detected_ppe);
            setMissingPpe(response.data.missing_ppe);
            setImageUrl(`http://127.0.0.1:5000/uploads/${img.name}`);
        } catch (err) {
            console.error('Error uploading image:', err);
        }
    };
    return (
        <div className='flex flex-col items-center justify-center rounded-sm border border-black shadow-sm shadow-black bg-white bg-opacity-30 p-2'>
            <h1 className='text-black text-[30px] font-[500]'>PPE Detection</h1>
            <div className='items-center justify-center'>
                <ImgUpload onUpload={handleImageUpload}/>
            </div>
        </div>
    ) 
}

export default Upload