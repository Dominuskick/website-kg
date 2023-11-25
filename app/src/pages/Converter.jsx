import React, { useState, useEffect, useRef } from 'react';
import Sidebar from '../components/Sidebar';
import styles from '../style.js';
import uploadImg from "../assets/upload.png";
import '../App.css';


const RGBtoXYZConverter = () => {
  const [rgbColor, setRGBColor] = useState({ r: 255, g: 0, b: 0 });
  const [xyzColor, setXYZColor] = useState({ x: 0, y: 0, z: 0 });
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageSelectedBool, setImageSelectedBool] = useState(false);
  const [selectedName, setSelectedName] = useState(null);
  const [originalCanvas, setOriginalCanvas] = useState(null);
  const [convertedCanvas, setConvertedCanvas] = useState(null);
  const originalCanvasRef = useRef(null);
  const convertedCanvasRef = useRef(null);
  const [brightness, setBrightness] = useState(0);


  const convertRGBtoXYZ = () => {
    if (selectedImage) {
      const img = new Image();
      img.src = selectedImage;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;

        const originalCanvas = originalCanvasRef.current;
        const originalCtx = originalCanvas.getContext("2d");

        originalCtx.imageSmoothingEnabled = true;
        originalCanvas.setAttribute('willReadFrequently', 'true');

        originalCtx.drawImage(img, 0, 0, img.width, img.height);

        const imageData = originalCtx.getImageData(0, 0, img.width, img.height);
        const data = imageData.data;

        for (let i = 0; i < data.length; i += 4) {
          let r = data[i];
          let g = data[i + 1];
          let b = data[i + 2];

          const isPurple = r >= 128 && r <= 255 && b >= 128 && b <= 255;

          if (true) {
            // Adjust brightness only for purple pixels
            const hslColor = rgbToHsl(r, g, b);
            let adjustedHslColor;
            if(hslColor[0] > 280 && hslColor[0] < 320)
              adjustedHslColor = [hslColor[0], hslColor[1], hslColor[2] + brightness];
            else adjustedHslColor = [hslColor[0], hslColor[1], hslColor[2]];
            
            const adjustedRgbColor = hslToRgb(adjustedHslColor[0], adjustedHslColor[1], adjustedHslColor[2]);
            r = adjustedRgbColor[0];
            g = adjustedRgbColor[1];
            b = adjustedRgbColor[2];
          }

          const transformMatrix = [
            [0.4124564, 0.3575761, 0.1804375],
            [0.2126729, 0.7151522, 0.0721750],
            [0.0193339, 0.1191920, 0.9503041],
          ];

          const xyzArray = transformMatrix.map((row) =>
            row.reduce((acc, value, index) => acc + value * [r, g, b][index], 0)
          );

          data[i] = xyzArray[0];
          data[i + 1] = xyzArray[1];
          data[i + 2] = xyzArray[2];
        }


        const convertedCanvas = document.getElementById('convertedCanvas');
        const convertedCtx = convertedCanvas.getContext('2d');
        convertedCtx.putImageData(imageData, 0, 0);
      };
    } else {
      console.error('No image selected');
    }
  };


  function rgbToHsl(r, g, b) {
    r /= 255, g /= 255, b /= 255;
  
    const max = Math.max(r, g, b),
          min = Math.min(r, g, b);
    
    let h, s, l = (max + min) / 2;
  
    if (max === min) {
      h = s = 0;
    } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
  
      h = (h * 60) % 360;
    }
  
    return [h, s, l];
  }
  
  function hslToRgb(H, s, l) {
    
    let C = (1-Math.abs(2*l-1)) * s;
    let X = C * (1 - Math.abs((H/60)%2 - 1));
    let m = l - C/2;

    let r,g,b;
    if(H>=0 && H<60){
        r = C ; g = X ; b = 0;
    } else if(H>=60 && H<120){
        r = X ; g = C ; b = 0;
    } else if(H>=120 && H<180){
        r = 0 ; g = C ; b = X;
    } else if(H>=180 && H<240){
        r = 0 ; g = X ; b = C;
    } else if(H>=240 && H<300){
        r = X ; g = 0 ; b = C;
    } else if(H>=300 && H<360){
        r = C ; g = 0 ; b = X;
    }

    return [(r+m) * 255, (g+m) * 255, (b+m) * 255];
}
  
  

  const handleBrightnessChange = (event) => {
    const newBrightness = parseFloat(event.target.value);
    setBrightness(newBrightness);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
        setSelectedName(file.name);
        setImageSelectedBool(true);
  
        const image = new Image();
        image.src = reader.result;
  
        image.onload = () => {
          const originalCanvas = document.getElementById('originalCanvas');
          const originalCtx = originalCanvas.getContext('2d');
          originalCtx.drawImage(image, 0, 0, image.width, image.height);
        };
      };
      reader.readAsDataURL(file);
    }
  };
  const reset = () => {
    setSelectedImage(null);
    setImageSelectedBool(false);
    setSelectedName(null);

    const originalCanvas = originalCanvasRef.current;
    const originalCtx = originalCanvas.getContext("2d");
    originalCtx.clearRect(0, 0, originalCanvas.width, originalCanvas.height);

    const convertedCanvas = convertedCanvasRef.current;
    const convertedCtx = convertedCanvas.getContext("2d");
    convertedCtx.clearRect(0, 0, convertedCanvas.width, convertedCanvas.height);
  };
  
  useEffect(() => {
    setOriginalCanvas(document.getElementById('originalCanvas'));
    setConvertedCanvas(document.getElementById('convertedCanvas'));
  }, []);

  return (
    <div className={`h-[1080px] ${styles.flexStart} ${styles.boxWidth}`}>
      <div>
        <Sidebar 
          page="converter"
        />
      </div>
      <div className={`${styles.flexCenter} flex-col w-[1500px] h-[1080px]`}>
          {imageSelectedBool ? (
            <div className='flex flex-row '>
              <canvas id="originalCanvas" className='m-3 flex  justify-center items-center' ref={originalCanvasRef} width="600" height="600" />
              <canvas id="convertedCanvas" className='m-3 flex  justify-center items-center' ref={convertedCanvasRef} width="600" height="600" />

            </div>
          ) : (
            <div className="parent file-upload w flex flex-col justify-center items-center">
              <img src={uploadImg} className="w-32" alt="upload" />
              <h3>Click box to upload</h3>
              <p>Maximun file size 10mb</p>
              <input type="file" onChange={handleImageChange} />
            </div>
          )}
            <div className="flex absolute bottom-[200px] flex-col justify-center items-center">
              <button onClick={convertRGBtoXYZ} className='flex'>Convert to XYZ</button>
              <button onClick={reset} className='flex'>Reset</button>

              <label htmlFor="brightnessRange">Brightness:</label>
              <input
                type="range"
                id="brightnessRange"
                min="-1"
                max="1"
                step="0.1"
                value={brightness}
                onChange={handleBrightnessChange}
              />
            </div>
        </div>  
    </div>
  );
};

export default RGBtoXYZConverter;
