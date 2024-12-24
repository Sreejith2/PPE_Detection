import React,{useState} from "react"

function ImgUpload({onUpload}) {

  const [industry,setIndustry] = useState("Construction")
  const [file,setFile] = useState(null)

  const handleFileChange = (e)=>{
    setFile(e.target.files[0])
  }

  const handleSubmit=(e)=>{
    e.preventDefault()
    if(file){
        onUpload(file,industry)
    }
  }
  return (
    <div className="flex flex-col justify-center p-2">
        <label className="m-3">
            <strong className="mr-2">Select Industry:</strong>
            <select value={industry} onChange={(e) => setIndustry(e.target.value)}>
                <option value="Construction">Construction</option>
                <option value="Manufacturing">Manufacturing</option>
                <option value="Oil and Gas">Oil and Gas</option>
                <option value="Mining">Mining</option>
                <option value="Warehousing">Warehousing</option>
            </select>
        </label>
        <label className="m-3">
            <strong className="mr-2">Input Image:</strong>
            <input type="file" onChange={handleFileChange} />
        </label>
        <div className="flex m-3 items-center justify-center">
            <button className="bg-white font-bold text-black p-2 w-20 rounded-sm" onClick={handleSubmit}>Upload</button>
        </div>
    </div>
  )
}

export default ImgUpload