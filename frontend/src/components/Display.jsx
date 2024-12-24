import React from 'react'
import SafetyMsg from './SafetyMsg'

function Display() {
  return (
    <div className='flex flex-col rounded-sm max-w-[600px] shadow-sm shadow-black bg-white border border-black bg-opacity-50 items-center justify-center p-2'>
        <SafetyMsg/>
    </div>
  )
}

export default Display