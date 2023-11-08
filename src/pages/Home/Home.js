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
    const [snapshot, setSnapshot] = useState(null);
    // const undoStack = useRef([]);
    // const redoStack = useRef([]);

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');

        const setCanvasBackground = (context) => {
            context.fillStyle = '#fff';
            context.fillRect(0, 0, context.canvas.width, context.canvas.height);
            context.fillStyle = selectedColor;
        };

        if (context) {
            setCanvasBackground(context);
        }
    }, [selectedColor]);

    // const saveCanvasState = (context) => {
    //     const canvas = context.canvas;
    //     const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    //     // undoStack.current.push(imageData);
    //     // redoStack.current = []; // Clear the redoStack after saving a new state
    // };

    const startDraw = (e) => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        if (!context) return;
        setIsDrawing(true);
        setPrevMouseX(e.nativeEvent.offsetX);
        setPrevMouseY(e.nativeEvent.offsetY);
        // saveCanvasState(context);

        context.beginPath();
        context.lineCap = 'round';
        context.strokeStyle = selectedColor;
        context.lineWidth = brushWidth;
        setSnapshot(context.getImageData(0, 0, canvas.width, canvas.height));
    };

    const drawing = (e) => {
        if (!isDrawing) return;
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        if (!context) return;
        context.putImageData(snapshot, 0, 0);

        if (selectedTool === 'brush' || selectedTool === 'eraser') {
            context.strokeStyle = selectedTool === 'eraser' ? '#fff' : selectedColor;
            // context.moveTo(prevMouseX, prevMouseY);
            context.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
            context.stroke();
        }

        // context.beginPath();

        // if (selectedTool === 'brush') {
        //     context.strokeStyle = selectedColor;
        // } else if (selectedTool === 'eraser') {
        //     context.strokeStyle = '#fff';
        // }
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


        setPrevMouseX(e.nativeEvent.offsetX);
        setPrevMouseY(e.nativeEvent.offsetY);
    };

    const stopDrawing = () => {
        setIsDrawing(false);
    };

    return (
        <section className={cx('drawing-board')}>
            <canvas
                ref={canvasRef}
                width={width}
                height={height}
                onMouseDown={startDraw}
                onMouseMove={drawing}
                onMouseUp={stopDrawing}
                onMouseLeave={stopDrawing}
            ></canvas>
        </section>
    );
}

export default Home;
