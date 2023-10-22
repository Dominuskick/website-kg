import React, { useState, useEffect } from 'react';
import { Stage, Layer, Line, Rect } from 'react-konva';
import Sidebar from '../components/Sidebar';
import WebGLFractal from '../components/WebGLFractal';
import styles from '../style.js';
import html2canvas from 'html2canvas';
import memoize from 'memoize-one';

const zSinZ = memoize((z) => {
  const real = z.real * Math.sin(z.real) - z.imag * Math.cos(z.real);
  const imag = z.real * Math.cos(z.real) + z.imag * Math.sin(z.real);
  return { real, imag };
});                 

function FractalZSinZ({ width, height, maxIterations }) {
  const [pixels, setPixels] = useState([]);

  useEffect(() => {
    function generateFractal() {
      const imageData = [];
      const minReal = -2;
      const maxReal = 2;
      const minImag = -2;
      const maxImag = 2;
      const realRange = maxReal - minReal;
      const imagRange = maxImag - minImag;

      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          const real = (x / width) * realRange + minReal;
          const imag = (y / height) * imagRange + minImag;
          let z = { real, imag };
          let n = 0;

          while (n < maxIterations && (z.real * z.real + z.imag * z.imag) < 4) {
            z = zSinZ(z); // Call the zSinZ function
            n++;
          }

          const brightness = (n / maxIterations) * 255;
          imageData.push(brightness, brightness, brightness);
        }
      }
      setPixels(imageData);
    }

    generateFractal();
  }, [width, height, maxIterations]);

  return (
    <Stage width={width} height={height}>
      <Layer>
      {pixels.map((brightness, index) => (
          <Rect
            key={index}
            x={index % width}
            y={Math.floor(index / width)}
            width={1} // Set the width to 1 pixel
            height={1} // Set the height to 1 pixel
            fill={`rgb(${brightness},${brightness},${brightness})`}
          />
        ))}
      </Layer>
    </Stage>
  );
}

const Fractals_zsinz = () => {
  const x = 300;
  const y = 600;

  const [size] = useState(600);
  const [depth, setDepth] = useState(5);

  const updateDepth = (newDepth) => {
    if(newDepth == 0) {
        setDepth(1)}
    else if (newDepth > 0 && newDepth < 10){
        setDepth(newDepth);
    } 
  };


  return (
    <div className={`h-[950px] ${styles.flexStart} ${styles.boxWidth}`}>
      <div>
        <Sidebar
          depth={depth} // Передаємо color у Sidebar
          updateDepth={updateDepth}
        />
      </div>
      <div className={`${styles.flexCenter}`}>
        <FractalZSinZ width={100} height={100} maxIterations={10}/>
      </div>
    </div>
  );
};

export default Fractals_zsinz;
