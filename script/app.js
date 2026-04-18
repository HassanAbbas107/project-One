/**
 * Memory Test Master - Game Logic
 * Senior Frontend Developer Refactor
 */

"use strict";

const CONFIG = {
    DIFFICULTIES: {
        easy: { tiles: 3, time: 10, name: "Easy" },
        normal: { tiles: 5, time: 15, name: "Normal" },
        hard: { tiles: 7, time: 20, name: "Hard" }
    },
    HIGHLIGHT_DURATION: 600,
    DELAY_BETWEEN_TILES: 400
};

// State variables
let currentDifficulty = null;
let gameSequence = [];
let userSequence = [];
let score = 0;
let round = 0;
let timerInterval = null;
let timeLeft = 0;
let isPlayingSequence = false;
let isGameOver = false;

// DOM Elements
const elements = {
    message: document.querySelector("#message"),
    countDown: document.querySelector("#countDown"),
    roundCounter: document.querySelector("#roundCounter"),
    scoreCounter: document.querySelector("#scoreCounter"),
    blocks: document.querySelectorAll(".block"),
    difficultyBtns: document.querySelectorAll(".difficulty-btn"),
    grid: document.querySelector("#cellContainer")
};

/**
 * Initialize Event Listeners
 */
function init() {
    elements.difficultyBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const level = btn.id;
            if (CONFIG.DIFFICULTIES[level]) {
                setupGame(level);
            }
        });
    });

    elements.blocks.forEach(block => {
        block.addEventListener('click', handleUserClick);
    });
}

/**
 * Reset and Setup a new game
 * @param {string} level - easy, normal, or hard
 */
function setupGame(level) {
    // Stop any existing game
    clearInterval(timerInterval);
    resetGameState();

    currentDifficulty = CONFIG.DIFFICULTIES[level];
    score = 0;
    round = 1;
    isGameOver = false;

    updateStats();
    startRound();
}

function resetGameState() {
    gameSequence = [];
    userSequence = [];
    timeLeft = 0;
    isPlayingSequence = false;
    elements.countDown.textContent = "Wait for the sequence...";
    elements.blocks.forEach(b => b.classList.remove('active', 'correct', 'wrong'));
}

/**
 * Start a new round
 */
function startRound() {
    userSequence = [];
    generateSequence();
    showPattern();
}

/**
 * Generate a random sequence based on difficulty
 */
function generateSequence() {
    gameSequence = [];
    const blockCount = elements.blocks.length;
    for (let i = 0; i < currentDifficulty.tiles; i++) {
        const randomIndex = Math.floor(Math.random() * blockCount);
        gameSequence.push(randomIndex);
    }
}

/**
 * Display the pattern to the user
 */
async function showPattern() {
    isPlayingSequence = true;
    disableControls(true);
    elements.message.textContent = "Watch carefully...";

    // Small delay before starting
    await new Promise(r => setTimeout(r, 800));

    for (const index of gameSequence) {
        const block = document.getElementById(`block-${index}`);
        await highlightBlock(block);
        await new Promise(r => setTimeout(r, CONFIG.DELAY_BETWEEN_TILES));
    }

    elements.message.textContent = "Your turn! Repeat the pattern.";
    isPlayingSequence = false;
    disableControls(false);
    startTimer();
}

/**
 * Highlight a single block
 * @param {HTMLElement} block 
 */
function highlightBlock(block) {
    return new Promise(resolve => {
        block.classList.add('active');
        setTimeout(() => {
            block.classList.remove('active');
            resolve();
        }, CONFIG.HIGHLIGHT_DURATION);
    });
}

/**
 * Handle user tile clicks
 */
function handleUserClick(event) {
    if (isPlayingSequence || isGameOver || !currentDifficulty) return;

    const blockId = event.target.id;
    const clickedIndex = parseInt(blockId.replace('block-', ''));
    const expectedIndex = gameSequence[userSequence.length];

    userSequence.push(clickedIndex);

    if (clickedIndex === expectedIndex) {
        // Correct click
        event.target.classList.add('correct');
        setTimeout(() => event.target.classList.remove('correct'), 300);

        if (userSequence.length === gameSequence.length) {
            handleRoundWin();
        }
    } else {
        // Wrong click
        event.target.classList.add('wrong');
        handleGameOver("Wrong pattern! Game Over.");
    }
}

/**
 * Successfully completed a round
 */
function handleRoundWin() {
    clearInterval(timerInterval);
    score += (round * 10);
    round++;
    elements.message.textContent = "Excellent! Next round...";
    updateStats();
    
    setTimeout(() => {
        if (!isGameOver) startRound();
    }, 1500);
}

/**
 * Timer logic
 */
function startTimer() {
    timeLeft = currentDifficulty.time;
    elements.countDown.textContent = `${timeLeft}s remaining`;
    
    timerInterval = setInterval(() => {
        timeLeft--;
        elements.countDown.textContent = `${timeLeft}s remaining`;

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            handleGameOver("Time's up! Game Over.");
        }
    }, 1000);
}

/**
 * End the game
 */
function handleGameOver(msg) {
    isGameOver = true;
    clearInterval(timerInterval);
    elements.message.textContent = msg;
    elements.countDown.textContent = "Game Over";
    
    // Highlight correct block if they missed it
    const expectedIndex = gameSequence[userSequence.length - 1] === undefined ? 
                          gameSequence[0] : gameSequence[userSequence.length - 1];
    
    // Wait a bit and show a restart message
    setTimeout(() => {
        elements.message.textContent += " Pick a difficulty to restart.";
    }, 2000);
}

function updateStats() {
    elements.roundCounter.textContent = round;
    elements.scoreCounter.textContent = score;
}

function disableControls(disabled) {
    elements.grid.style.pointerEvents = disabled ? 'none' : 'auto';
}

// Start the app when DOM is ready
document.addEventListener("DOMContentLoaded", init);