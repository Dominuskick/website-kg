import React from 'react'
import Button from './Button.jsx'
import { BrowserRouter, Route, Link } from "react-router-dom"; 



const ChoosePanel = () => {
  return (
    <div className='flex md:flex-row flex-col space-x-[70px] items-center justify-center h-[570px]'>  
        <Button text="Fractals" to='/fractal-serpinsky'/>
        <Button text="Color scheme"/>
        <Button text="Rotating figures"/>
    </div>
  )
}

export default ChoosePanel