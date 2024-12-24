import React, { useContext } from 'react'
import Upload from './Upload'
import Display from './Display'
import { PpeContext } from '../PpeContext'

function Home() {
    const {imageUrl} = useContext(PpeContext)
    return(
        <div className='flex lg:flex-row md:flex-col sm:flex-col justify-center items-center bg-[#eadbc8] flex-1'>
            <div className='flex items-center justify-center w-1/2'>
                <Upload/>
            </div>
            <div className='w-1/2 flex flex-col justify-center items-center'>
                {imageUrl?<img className=' w-60 h-44' alt='PPE_image' src={imageUrl} />:null}
                <Display/>
            </div>
        </div>
    )
}

export default Home