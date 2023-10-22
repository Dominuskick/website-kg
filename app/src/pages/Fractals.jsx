import React, { useState, useMemo } from 'react';
import { Stage, Layer, RegularPolygon } from 'react-konva';
import Sidebar from '../components/Sidebar';
import styles from '../style.js';
import html2canvas from 'html2canvas';




const SierpinskiTriangle = React.memo(({ x, y, size, depth }) => {
  const createSierpinskiTriangle = useMemo(() => {
    const drawTriangle = (x, y, size, depth) => {
      if (depth === 0) {
        return [
          <RegularPolygon
            key={`${x}-${y}`}
            sides={3}
            x={x}
            y={y}
            radius={size / 2}
            fill={'black'}
          />
        ];
      } else {
        const halfSize = size / 2;
        return [
          ...drawTriangle(x, y, halfSize, depth - 1),
          ...drawTriangle(x + halfSize, y, halfSize, depth - 1),
          ...drawTriangle(
            x + halfSize / 2,
            y - (Math.sqrt(3) / 2) * halfSize,
            halfSize,
            depth - 1
          )
        ];
      }
    };
    return drawTriangle(x, y, size, depth);
  }, [x, y, size, depth]);



  return (
    <div id="fractal-container">
      <Stage width={1500} height={800}>
        <Layer>{createSierpinskiTriangle}</Layer>
      </Stage>
    </div>
  );
});

const Fractals = () => {
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

const saveFractal = () => {
    // Вибираємо контейнер, який потрібно зберегти у вигляді зображення
    const container = document.getElementById('fractal-container');
    
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
    <div className={`h-[950px] ${styles.flexStart} ${styles.boxWidth}`}>
      <div>
        <Sidebar
          depth={depth} // Передаємо color у Sidebar
          updateDepth={updateDepth}
          saveFractal={saveFractal}
        />
      </div>
      <div className={`${styles.flexCenter}`}>
        <SierpinskiTriangle x={x} y={y} size={size} depth={depth} />
      </div>
    </div>
  );
};

export default Fractals;
