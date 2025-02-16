import React from 'react'
import Response from '@/components/Response';
import SideBar from '@/components/SideBar';

function Main() {
  return (
    <>
      <div className='flex'>
        <SideBar />
        <Response />
        
      </div>        
    </>
  )
}

export default Main