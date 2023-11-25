import React, { useEffect, useState, useRef } from 'react';
import styles from '../style';
import Sidebar from '../components/Sidebar';
import p5 from 'p5';
import html2canvas from 'html2canvas';

const colorSchemes = {
  grayscale: [
    [0, 0, 0],       // Black
    [32, 32, 32],     // Dark Gray
    [64, 64, 64],     // Medium Gray
    [128, 128, 128],   // Light Gray
    [192, 192, 192],   // Very Light Gray
    [224, 224, 224],   // Even Lighter Gray
    [255, 255, 255]    // White
  ],
  rainbow: [
    [148, 0, 211],   // Violet
    [75, 0, 130],    // Indigo
    [0, 0, 255],     // Blue
    [0, 255, 0],     // Green
    [255, 255, 0],   // Yellow
    [255, 127, 0],   // Orange
    [255, 0, 0]      // Red
  ],
  custom: [
    [255, 0, 0],     // Red
    [0, 255, 0],     // Green
    [0, 0, 255]      // Blue
  ]
};


  

  
  const Fractals_zsinz = () => {

    const [colorScheme, setColorScheme] = useState('rainbow');
    const myP5 = useRef(null);

  

  
    const sketch = (p) => {

      let dragging = false;
      let previousMouseX = 0;
      let previousMouseY = 0;

      p.mousePressed = () => {
        dragging = true;
        previousMouseX = p.mouseX;
        previousMouseY = p.mouseY;
      };

      p.mouseReleased = () => {
        dragging = false;
      };

      p.mouseWheel = (event) => {
        zoom *= 1 - event.delta / 1000;
      };

      p.mouseDragged = () => {
        if (dragging) {
          console.log(xOffset);
          console.log(yOffset);
          xOffset -= (p.mouseX - previousMouseX) / zoom / 1000;
          yOffset -= (p.mouseY - previousMouseY) / zoom / 1000;
          previousMouseX = p.mouseX;
          previousMouseY = p.mouseY;
        }
      };

      let canvasSize = 800;
      let zoom = 1;
      const maxIterations = 16;
      let xOffset = 0;
      let yOffset = 0;
      
      p.setup = () => {
        p.createCanvas(canvasSize, canvasSize).parent("fractal-container");
        p.pixelDensity(1);
      };
      
      p.draw = () => {
        p.loadPixels();
        let xMin = (-3) / zoom;
        let xMax = (3) / zoom;
        let yMin = (-3) / zoom;
        let yMax = (3) / zoom;
        const maX = 100;

        
  
        for (let x = 0; x < canvasSize; x++) {
          for (let y = 0; y < canvasSize; y++) {
            const zx = xMin + (x / canvasSize + xOffset) * (xMax - xMin);
            const zy = yMin + (y / canvasSize + yOffset) * (yMax - yMin);
            let zx2 = zx;
            let zy2 = zy;
            let i = 0;

            for (i = 0; i < maxIterations; i++) {
              let zx3 = zx2;
              zx2 = zx2 * Math.sin(zx2) * Math.cosh(zy2) - zy2 * Math.cos(zx2) * Math.sinh(zy2);
              zy2 = zx3 * Math.cos(zx3) * Math.sinh(zy2) + zy2 * Math.sin(zx3) * Math.cosh(zy2);

              if (zx2 * zx2 + zy2 * zy2 >= maX) break;
            }
        
            const pixelIndex = (x + y * canvasSize) * 4;

            const colorSchemeArray = colorSchemes[colorScheme];
            const color = colorSchemeArray[i % colorSchemeArray.length];
            p.pixels[pixelIndex] = color[0];
            p.pixels[pixelIndex + 1] = color[1];
            p.pixels[pixelIndex + 2] = color[2];
            p.pixels[pixelIndex + 3] = 255;
          }
        }
  
        p.updatePixels();
      };

      
    };

    useEffect(() => {
      if (myP5.current) {
        myP5.current.remove(); // remove old p5 instance
      }
  
      myP5.current = new p5(sketch); // create new p5 instance and store it in the ref
  
      return () => {
        myP5.current.remove(); // remove p5 instance when the component unmounts
      };
    }, [colorScheme]);

    const saveFractal = () => {
      // Вибираємо контейнер, який потрібно зберегти у вигляді зображення
      const container = document.getElementById('defaultCanvas0');
      
      // Використовуємо html2canvas для збереження контейнера у вигляді зображення
      html2canvas(container).then((canvas) => {
        // Отримане зображення можна зберегти або відобразити в іншому додатку
        const imgData = canvas.toDataURL('image/png');
  
        // Створюємо посилання для збереження зображення
        const a = document.createElement('a');
        a.href = imgData;
        a.download = 'fractal.png';
        a.click();
        console.log(1);
      });
    };
  
    
    return (
      <div className={`h-[1070px] ${styles.flexStart} ${styles.boxWidth}`}>
      <div>
        <Sidebar colorScheme={colorScheme} setColorScheme={setColorScheme} saveFractal={saveFractal} page='zsinz'/>
      </div>
      <div id="fractal-container" className={`${styles.flexCenter} w-[1920px] h-[900px]`}></div>
    </div>
    );
  };

  export default React.memo(Fractals_zsinz);

  
  