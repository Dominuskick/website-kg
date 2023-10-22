import React from 'react';
import { figure_rotating, triangle_serpinskogo, palette, fractal } from '../assets'


const Sidebar = ({depth, updateDepth, saveFractal }) => {
    const handleSaveClick = () => {
        // Викликати функцію збереження фракталу
        saveFractal();
      };


  return (
    <div className="flex h-[700px] bg-gray-200 inner-sidebar-shadow">
      {/* Left sidebar */}
      <div className="bg-white w-32 flex flex-col p-4 space-y-4 items-center">
      <div className='flex flex-col items-center justify-center'>
            <img src={fractal} className="w-[48px]" alt="Icon 1" />
            <span className="font-inter text-xs text-black font-normal leading-4 tracking-tight text-center">
                z * sin(z)
            </span>
        </div>
        <div className='flex flex-col items-center justify-center'>
          <img src={triangle_serpinskogo} className="w-[48px]" alt="Icon 2" />
          <span className="font-inter text-xs text-black font-normal leading-4 tracking-tight text-center">
                Triangle Serpinskogo
            </span>
        </div>
        <div className='flex flex-col items-center justify-center'>
          <img src={figure_rotating} className="w-[48px]" alt="Icon 3" />
          <span className="font-inter text-xs text-black font-normal leading-4 tracking-tight text-center">
                Figure rotating
            </span>
        </div>
        <div className='flex flex-col items-center justify-center'>
          <img src={palette} className="w-[48px]" alt="Icon 4" />
          <span className="font-inter text-xs text-black font-normal leading-4 tracking-tight text-center">
                Palette
            </span>
        </div>
      </div>

      <div className="inner-sidebar-shadow bg-white w-64 flex flex-col p-4">
        {/* Content of right sidebar */}           
        <input 
            type="number" 
            value={depth} 
            onChange={(e) => updateDepth(e.target.value)} 
            className="p-2 border rounded-md" 
            placeholder="Введіть глибину"
        />
        <button className="mt-3" onClick={handleSaveClick}>Зберегти фрактал</button>

        </div>
    </div>
  );
};

export default Sidebar;
