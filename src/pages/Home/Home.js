import styles from './Home.module.scss';
import classNames from 'classnames/bind';

import { useEffect, useRef, useState } from 'react';

const cx = classNames.bind(styles);

function Home({ selectedTool, brushWidth, selectedColor, width, height }) {
    const canvasRef = useRef(null);
    // const offscreenCanvasRef = useRef(null); // Reference for the offscreen canvas

    const [isDrawing, setIsDrawing] = useState(false);
    const [prevMouseX, setPrevMouseX] = useState(0);
    const [prevMouseY, setPrevMouseY] = useState(0);
    // const [snapshot, setSnapshot] = useState(null);
    // const undoStack = useRef([]);
    // const redoStack = useRef([]);

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        context.lineCap = 'round';
        context.strokeStyle = selectedColor;
        context.lineWidth = brushWidth;
    }, [selectedColor, brushWidth]);

    const startDrawing = (e) => {
        setIsDrawing(true);
        setPrevMouseX(e.nativeEvent.offsetX);
        setPrevMouseY(e.nativeEvent.offsetY);
    };

    const draw = (e) => {
        if (!isDrawing) return;
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        context.beginPath();
        context.moveTo(prevMouseX, prevMouseY);

        if (selectedTool === 'brush') {
            context.strokeStyle = selectedColor;
        } else if (selectedTool === 'eraser') {
            context.strokeStyle = '#fff';
        } 
        // else if (selectedTool === 'line') {
        //     context.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
        //     context.stroke();
        // } else if (selectedTool === 'circle') {
        //     const radius = Math.sqrt(
        //         Math.pow(e.nativeEvent.offsetX - prevMouseX, 2) + Math.pow(e.nativeEvent.offsetY - prevMouseY, 2),
        //     );
        //     context.arc(prevMouseX, prevMouseY, radius, 0, 2 * Math.PI);
        //     context.stroke();
        // } else if (selectedTool === 'rectangle') {
        //     const startX = Math.min(prevMouseX, e.nativeEvent.offsetX);
        //     const startY = Math.min(prevMouseY, e.nativeEvent.offsetY);
        //     const width = Math.abs(e.nativeEvent.offsetX - prevMouseX);
        //     const height = Math.abs(e.nativeEvent.offsetY - prevMouseY);
        //     context.strokeRect(startX, startY, width, height);
        // } else if (selectedTool === 'triangle') {
        //     context.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
        //     context.lineTo(prevMouseX * 2 - e.nativeEvent.offsetX, e.nativeEvent.offsetY);
        //     context.closePath();
        //     context.stroke();
        // }

        context.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
        context.stroke();
        setPrevMouseX(e.nativeEvent.offsetX);
        setPrevMouseY(e.nativeEvent.offsetY);
    };

    const stopDrawing = () => {
        setIsDrawing(false);
    };

    console.log(selectedTool);
    console.log(selectedColor);
    console.log(brushWidth);

    return (
        <section className={cx('drawing-board')}>
            <canvas
                ref={canvasRef}
                width={width}
                height={height}
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={stopDrawing}
                onMouseLeave={stopDrawing}
            ></canvas>
        </section>
    );
}

export default Home;
