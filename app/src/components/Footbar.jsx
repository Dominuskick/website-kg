import React from 'react'

import { telegram, instagram, linkedin } from '../assets'

const Footbar = () => {
  return (
    <footer className="h-20 flex">
        <div className="flex flex-wrap items-center justify-between py-[10px] px-[40px]">
            <div className="flex space-x-6">
            <img src={telegram} className="w-8 h-8" alt="Icon 1" />
            <img src={instagram} className="w-8 h-8" alt="Icon 2" />
            <img src={linkedin} className="w-8 h-8" alt="Icon 3" />
            </div>
        </div>
    </footer>
  )
}

export default Footbar