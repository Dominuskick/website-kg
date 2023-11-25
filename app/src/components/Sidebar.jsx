import React from 'react';
import { Link } from 'react-router-dom';
import { figure_rotating, triangle_serpinskogo, palette, fractal } from '../assets';

const Sidebar = ({ depth, updateDepth, colorScheme, setColorScheme, saveFractal, page }) => {
  const handleSaveClick = () => {
    // Call the saveFractal function
    saveFractal();
  };

  return (
    <div className="flex h-[700px] bg-gray-200 inner-sidebar-shadow">
      {/* Left sidebar */}
      <div className="bg-white w-32 flex flex-col p-4 space-y-4 items-center">
        <div className=''>
        <Link to="/fractal-zsinz">
          <div className={`bg-primary ${page === 'zsinz' ? 'bg-opacity-50' : 'bg-opacity-0'} rounded-full w-[66px] flex flex-col items-center justify-center`}>
            <img src={fractal} className="w-[48px]" alt="Icon 1" />
            <span className="font-inter text-xs text-black font-normal leading-4 tracking-tight text-center">
              z * sin(z)
            </span>
          </div>
        </Link>
        </div>
        <div className=''>
          <Link to="/fractal-serpinsky" className=''>
            <div className={`bg-primary ${page === 'triangle' ? 'bg-opacity-50' : 'bg-opacity-0'} rounded-full w-[66px] flex flex-col items-center justify-center`}>
              <img src={triangle_serpinskogo} className="w-[48px]" alt="Icon 2" />
              <span className="font-inter text-xs text-black font-normal leading-4 tracking-tight text-center">
                Triangle Serpinskogo
              </span>
            </div>
          </Link>
        </div>
        <div className='flex flex-col items-center justify-center'>
          <img src={figure_rotating} className="w-[48px]" alt="Icon 3" />
          <span className="font-inter text-xs text-black font-normal leading-4 tracking-tight text-center">
            Figure rotating
          </span>
        </div>
        <div className='flex flex-col items-center justify-center'>
        <Link to="/converter" className=''>
          <div className={`bg-primary ${page === 'converter' ? 'bg-opacity-50' : 'bg-opacity-0'} rounded-full w-[66px] flex flex-col items-center justify-center`}>
            <img src={palette} className="w-[48px]" alt="Icon 4" />
            <span className="font-inter text-xs text-black font-normal leading-4 tracking-tight text-center">
              Palette
            </span>
          </div>
        </Link>
        </div>
      </div>

      <div className="inner-sidebar-shadow bg-white w-64 flex flex-col p-4">
        {page === 'triangle' && (
          <div>
            <input
              type="number"
              value={depth}
              onChange={(e) => updateDepth(e.target.value)}
              className="p-2 border rounded-md"
              placeholder="Введіть глибину"
            />
            <button className="mt-3" onClick={handleSaveClick}>Зберегти фрактал</button>
          </div>
        )}
        {page === 'zsinz' && (
          <div>
            <label htmlFor="colorSchemeSelect">Select Color Scheme:</label>
            <select
              id="colorSchemeSelect"
              onChange={(e) => setColorScheme(e.target.value)}
              value={colorScheme}
            >
              <option value="grayscale">Grayscale</option>
              <option value="rainbow">Rainbow</option>
              <option value="custom">Custom</option>
            </select>
            <button className="mt-3" onClick={handleSaveClick}>Зберегти фрактал</button>
        </div>
        )}
        {page === 'figure' && (
          <div></div>
        )}
        {page === 'converter' && (
          <div></div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
