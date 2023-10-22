import React from 'react';
import { main_photo } from '../assets';
import "../App.css"
import styles, {layout} from '../style.js'

const Hero = () => {
  return (
    <section className={`${layout.sectionImg}`}>
      <img src={main_photo} className={`w-screen h-[500px] object-cover inset-0 blur-[2px]`}></img>
      <div className="absolute inset-0 bg-black opacity-50 h-full"></div>
      <div className="absolute inset-0 flex items-center justify-center flex-col">
      <span className="text-white font-bold text-6xl font-inter text-inner-shadow">Graphify</span>
      <span className='text-white text-3xl font-inter font-light tracking-[2.4px] mt-[16px]'>
          Open world of graphics to yourself
      </span>
  </div>
</section>



  )
}

export default Hero