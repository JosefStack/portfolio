import React, { useState, useEffect, useRef, useCallback } from 'react';
import './SnakeGame.css';

const CANVAS_SIZE = [240, 400]; // width, height
const SNAKE_START = [
    [120, 200],
    [120, 210],
    [120, 220]
];
const APPLE_START = [120, 100];
const SCALE = 10;
const SPEED = 100;
const DIRECTIONS = {
    38: [0, -1], // up
    40: [0, 1], // down
    37: [-1, 0], // left
    39: [1, 0] // right
};

const SnakeGame = () => {
    const canvasRef = useRef();
    const [snake, setSnake] = useState(SNAKE_START);
    const [apple, setApple] = useState(APPLE_START);
    const [dir, setDir] = useState([0, -1]);
    const [speed, setSpeed] = useState(null);
    const [gameOver, setGameOver] = useState(false);
    const [score, setScore] = useState(0);

    const startGame = () => {
        setSnake(SNAKE_START);
        setApple(APPLE_START);
        setDir([0, -1]);
        setSpeed(SPEED);
        setGameOver(false);
        setScore(0);
    };

    const endGame = () => {
        setSpeed(null);
        setGameOver(true);
    };

    const moveSnake = useCallback(({ keyCode }) => {
        if (keyCode >= 37 && keyCode <= 40) {
            e.preventDefault();
            // prevent 180 degree turns
            const attemptDir = DIRECTIONS[keyCode];
            if (attemptDir[0] !== -dir[0] || attemptDir[1] !== -dir[1]) {
                setDir(DIRECTIONS[keyCode]);
            }
        }
    }, [dir]);

    const createApple = () =>
        [
            Math.floor((Math.random() * (CANVAS_SIZE[0] / SCALE))),
            Math.floor((Math.random() * (CANVAS_SIZE[1] / SCALE)))
        ].map(coord => coord * SCALE);

    const checkCollision = (piece, snk = snake) => {
        // Wall collision
        if (
            piece[0] * SCALE >= CANVAS_SIZE[0] ||
            piece[0] < 0 ||
            piece[1] * SCALE >= CANVAS_SIZE[1] ||
            piece[1] < 0
        ) {
            return true;
        }
        // Self collision
        for (const segment of snk) {
            if (piece[0] === segment[0] && piece[1] === segment[1]) return true;
        }
        return false;
    };

    const checkAppleCollision = newSnake => {
        if (newSnake[0][0] === apple[0] && newSnake[0][1] === apple[1]) {
            let newApple = createApple();
            while (checkCollision(newApple, newSnake)) {
                newApple = createApple();
            }
            setApple(newApple);
            setScore(s => s + 10);
            return true;
        }
        return false;
    };

    const gameLoop = () => {
        const snakeCopy = JSON.parse(JSON.stringify(snake));
        const newSnakeHead = [snakeCopy[0][0] + dir[0] * SCALE, snakeCopy[0][1] + dir[1] * SCALE];

        // Check bounds since we check piece directly not * SCALE in bounds check inside here if using coords
        // To simplify: newSnakeHead is already in absolute coord relative to canvas, need to check collision:
        if (
            newSnakeHead[0] >= CANVAS_SIZE[0] ||
            newSnakeHead[0] < 0 ||
            newSnakeHead[1] >= CANVAS_SIZE[1] ||
            newSnakeHead[1] < 0
        ) {
            endGame();
            return;
        }

        for (const segment of snakeCopy) {
            if (newSnakeHead[0] === segment[0] && newSnakeHead[1] === segment[1]) {
                endGame();
                return;
            }
        }

        snakeCopy.unshift(newSnakeHead);
        if (checkAppleCollision(snakeCopy)) {
            // ate apple, don't pop tail
        } else {
            snakeCopy.pop();
        }
        setSnake(snakeCopy);
    };

    useEffect(() => {
        if (speed !== null) {
            const interval = setInterval(() => {
                gameLoop();
            }, speed);
            return () => clearInterval(interval);
        }
    }, [snake, dir, speed]);

    useEffect(() => {
        const context = canvasRef.current.getContext('2d');
        context.clearRect(0, 0, window.innerWidth, window.innerHeight);
        context.fillStyle = '#43D9AD'; // Apple green
        context.fillRect(apple[0], apple[1], SCALE, SCALE);

        snake.forEach((segment, index) => {
            // head is orange, body is slightly darker or same
            context.fillStyle = index === 0 ? '#43D9AD' : '#43D9AD';
            // Actually reference shows orange snake? But let's use green/mint for snake and coral for apple
            if (index === 0) context.fillStyle = '#43D9AD';
            context.fillRect(segment[0], segment[1], SCALE, SCALE);
        });
    }, [snake, apple]);

    // Handle keyboard events when game is focused
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (!speed) return; // ignore if paused/stopped
            if (e.keyCode >= 37 && e.keyCode <= 40) {
                e.preventDefault(); // prevent scrolling
                const attemptDir = DIRECTIONS[e.keyCode];
                if (attemptDir[0] !== -dir[0] || attemptDir[1] !== -dir[1]) {
                    setDir(DIRECTIONS[e.keyCode]);
                }
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [dir, speed]);

    return (
        <div className="snake-game-wrapper">
            <div className="game-screen-container">
                <canvas
                    style={{ border: 'none', backgroundColor: '#011627', borderRadius: '8px', boxShadow: 'inset 0 0 10px rgba(0,0,0,0.5)' }}
                    ref={canvasRef}
                    width={CANVAS_SIZE[0]}
                    height={CANVAS_SIZE[1]}
                />
                {speed === null && (
                    <div className="game-overlay">
                        {gameOver ? (
                            <div className="game-over">
                                <h3 className="game-over-text">GAME OVER!</h3>
                                <button onClick={startGame} className="start-btn">start-again</button>
                            </div>
                        ) : (
                            <button onClick={startGame} className="start-btn">start-game</button>
                        )}
                    </div>
                )}
            </div>
            <div className="game-instructions">
                <p className="instruction-comment">{'// use keyboard'}</p>
                <p className="instruction-comment">{'// arrows to play'}</p>
                <div className="arrow-keys">
                    <div className="arrow-row">
                        <div className="arrow-key" onClick={() => speed && setDir(DIRECTIONS[38])}>▲</div>
                    </div>
                    <div className="arrow-row">
                        <div className="arrow-key" onClick={() => speed && setDir(DIRECTIONS[37])}>◀</div>
                        <div className="arrow-key" onClick={() => speed && setDir(DIRECTIONS[40])}>▼</div>
                        <div className="arrow-key" onClick={() => speed && setDir(DIRECTIONS[39])}>▶</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SnakeGame;
