import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';



const GRID_SIZE = 20;
const CELL_COUNT = GRID_SIZE * GRID_SIZE;
const SPEED = 100;

const BrutalistHero = () => {
    const [snake, setSnake] = useState([42, 41, 40]); // Initial positions
    const [food, setFood] = useState(55);
    const [direction, setDirection] = useState('RIGHT');
    const [gameOver, setGameOver] = useState(false);
    const [gameActive, setGameActive] = useState(false);
    const [score, setScore] = useState(0);

    // Keyboard controls
    useEffect(() => {
        const handleKeyPress = (e) => {
            if (!gameActive) return;
            switch (e.key) {
                case 'ArrowUp': if (direction !== 'DOWN') setDirection('UP'); break;
                case 'ArrowDown': if (direction !== 'UP') setDirection('DOWN'); break;
                case 'ArrowLeft': if (direction !== 'RIGHT') setDirection('LEFT'); break;
                case 'ArrowRight': if (direction !== 'LEFT') setDirection('RIGHT'); break;
            }
        };
        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, [gameActive, direction]);

    // Game Loop
    useEffect(() => {
        if (!gameActive || gameOver) return;

        const moveSnake = setInterval(() => {
            setSnake(prevSnake => {
                const head = prevSnake[0];
                let newHead;

                // Move logic
                switch (direction) {
                    case 'UP': newHead = head - GRID_SIZE; break;
                    case 'DOWN': newHead = head + GRID_SIZE; break;
                    case 'LEFT': newHead = head - 1; break;
                    case 'RIGHT': newHead = head + 1; break;
                    default: return prevSnake;
                }

                // Wall Collision Checks
                const isWallCollision = (
                    (direction === 'LEFT' && head % GRID_SIZE === 0) ||
                    (direction === 'RIGHT' && (head + 1) % GRID_SIZE === 0) ||
                    (newHead < 0 || newHead >= CELL_COUNT)
                );

                // Self Collision Check
                if (isWallCollision || prevSnake.includes(newHead)) {
                    setGameOver(true);
                    setGameActive(false);
                    return prevSnake;
                }

                const newSnake = [newHead, ...prevSnake];

                // Food Check
                if (newHead === food) {
                    setScore(s => s + 10);
                    let newFood;
                    do {
                        newFood = Math.floor(Math.random() * CELL_COUNT);
                    } while (newSnake.includes(newFood));
                    setFood(newFood);
                } else {
                    newSnake.pop();
                }

                return newSnake;
            });
        }, SPEED);

        return () => clearInterval(moveSnake);
    }, [gameActive, gameOver, direction, food]);

    const resetGame = () => {
        setSnake([42, 41, 40]);
        setScore(0);
        setDirection('RIGHT');
        setGameOver(false);
        setGameActive(true);
        setFood(Math.floor(Math.random() * CELL_COUNT));
    };

    return (
        <section className="relative w-full max-w-6xl mx-auto my-12 border-2 border-neo-black dark:border-white bg-white dark:bg-[#161616] shadow-neo dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)]">
            {/* Header Block */}
            <div className="border-b-2 border-neo-black dark:border-white p-6 md:p-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-6 bg-neo-white dark:bg-[#161616]">
                <div>
                    <h1 className="text-6xl md:text-8xl font-serif font-black tracking-tighter leading-none mb-2 text-neo-black dark:text-neo-white">
                        THE BLOG
                    </h1>
                    <p className="font-mono text-sm md:text-base bg-neo-black text-neo-white dark:bg-neo-white dark:text-neo-black inline-block px-2 py-1">
                        VOL. 2025 /// SYSTEM_READY
                    </p>
                </div>

                <div className="font-mono text-right">
                    <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">HIGH_SCORE</div>
                    <div className="text-4xl font-bold text-neo-black dark:text-neo-white min-w-[120px]">
                        {score.toString().padStart(5, '0')}
                    </div>
                </div>
            </div>

            {/* Scrolling Marquee */}
            <div className="border-b-2 border-neo-black dark:border-white overflow-hidden bg-neo-yellow py-2 select-none">
                <motion.div
                    className="whitespace-nowrap font-mono font-bold text-sm md:text-base text-neo-black"
                    animate={{ x: [0, -1000] }}
                    transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
                >
                    use_arrow_keys_to_navigate /// eat_yellow_pixels /// avoid_walls /// brutalist_snake_v1.0 ///
                </motion.div>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2">
                {/* Left: Description */}
                <div className="p-6 md:p-12 border-b-2 md:border-b-0 md:border-r-2 border-neo-black dark:border-white flex flex-col justify-center">
                    <h2 className="text-3xl font-serif font-bold mb-6 text-neo-black dark:text-neo-white">
                        Snake Protocol
                    </h2>
                    <p className="font-serif text-lg leading-relaxed mb-8 text-neo-black dark:text-neo-white">
                        A classic simulation of consumption and growth.
                        Navigate the grid. Consume data packets.
                        Do not terminate yourself.
                    </p>
                    <div className="flex gap-4">
                        <button
                            onClick={resetGame}
                            className="px-8 py-3 bg-neo-black text-neo-white dark:bg-neo-white dark:text-neo-black font-mono font-bold hover:bg-neo-yellow hover:text-neo-black transition-colors border-2 border-transparent hover:border-neo-black hover:shadow-neo-sm"
                        >
                            {gameOver ? "RETRY_SYSTEM" : gameActive ? "RUNNING..." : "INITIATE"}
                        </button>

                        {/* Mobile Controls (D-Pad visual only, click to trigger) */}
                        <div className="md:hidden grid grid-cols-3 gap-1">
                            <div />
                            <button className="w-10 h-10 border border-neo-black flex items-center justify-center font-bold active:bg-neo-yellow" onClick={() => direction !== 'DOWN' && setDirection('UP')}>↑</button>
                            <div />
                            <button className="w-10 h-10 border border-neo-black flex items-center justify-center font-bold active:bg-neo-yellow" onClick={() => direction !== 'RIGHT' && setDirection('LEFT')}>←</button>
                            <button className="w-10 h-10 border border-neo-black flex items-center justify-center font-bold active:bg-neo-yellow" onClick={() => direction !== 'UP' && setDirection('DOWN')}>↓</button>
                            <button className="w-10 h-10 border border-neo-black flex items-center justify-center font-bold active:bg-neo-yellow" onClick={() => direction !== 'LEFT' && setDirection('RIGHT')}>→</button>
                        </div>
                    </div>
                </div>

                {/* Right: The Grid Game */}
                <div className="aspect-square bg-gray-50 dark:bg-gray-900 border-b-0 md:border-none relative">
                    {gameOver && (
                        <div className="absolute inset-0 bg-neo-black/80 flex items-center justify-center z-20 text-white font-mono text-2xl font-bold">
                            GAME_OVER
                        </div>
                    )}
                    <div className="w-full h-full grid grid-cols-20 grid-rows-20 gap-0 p-4">
                        {Array.from({ length: CELL_COUNT }).map((_, i) => (
                            <div
                                key={i}
                                className={`
                                    relative border-[0.5px] border-gray-200 dark:border-white/5
                                    ${snake.includes(i) ? 'bg-neo-black dark:bg-white' : ''}
                                    ${food === i ? 'bg-neo-yellow animate-pulse' : ''}
                                `}
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* Status Bar */}
            <div className="border-t-2 border-neo-black dark:border-white p-2 bg-neo-black dark:bg-neo-white text-neo-white dark:text-neo-black font-mono text-xs flex justify-between uppercase">
                <span>Status: {gameActive ? "RUNNING" : "STANDBY"}</span>
                <span>DATA_PACKETS: {score / 10}</span>
                <span>SPEED: 100MS</span>
            </div>
        </section>
    );
};

export default BrutalistHero;
