# Memory Game 🧠

![Memory Game Screenshot](https://github.com/user-attachments/assets/465011f0-2e34-45eb-abea-6e885fa11591)

A challenging memory game where players must remember and reproduce number patterns on a 3x3 grid. Test your memory with three difficulty levels!

## Table of Contents
- [About the Project](#about-the-project)
- [Features](#features)
- [How to Play](#how-to-play)
- [Game Rules](#game-rules)
- [Built With](#built-with)
- [Getting Started](#getting-started)
- [Key Functionality](#key-functionality)
- [Contributing](#contributing)
- [Contact](#contact)

## About The Project

This memory challenge game tests your ability to remember number patterns displayed on a 3x3 grid. With three difficulty levels (Easy, Normal, Hard), the game offers varying challenges to push your memory limits.

## Features

- Three difficulty levels with different challenge parameters
- Visual feedback for correct/incorrect answers
- Timer for Hard mode
- Clean, responsive interface
- Instant win/lose feedback

## How to Play

1. Choose a difficulty level:
   - **Easy**: Longer display time, no timer
   - **Normal**: Medium display time, no timer
   - **Hard**: Short display time with countdown timer
2. Observe the numbers that appear on the 9 blocks
3. After numbers disappear, click blocks in ascending order (0 to 8)
4. In Hard mode, complete the pattern before time runs out

## Game Rules

- Click blocks in correct numerical order (0 through 8)
- One mistake ends the game
- Hard mode requires completion before timer expires
- Correct selections turn green, incorrect turn red

## Built With

- HTML
- CSS
- JavaScript

## Getting Started

To run locally:
1. Clone the repository
2. Open `index.html` in your browser
3. Start playing!

## Key Functionality

The core game logic is handled by the `checkForWin` function:

```javascript
function checkForWin(event) {
    if (NewArr[event.target.id] === currentStep) {
        event.target.textContent = currentStep;
        currentStep++;
        total = 10;
        const list = event.target.classList;
        list.add("myStyle");
        
        if (currentStep === 9) {
            message.textContent = "NICE, YOU MAKE IT";
            setTimeout(() => {
                location.reload();
            }, 3000);
        }
    } else {
        const list2 = event.target.classList;
        list2.add("myStyle2");
        
        blocks.forEach((block) => {
            block.addEventListener('click', () => {})
        });
        
        message.textContent = `YOU LOSE :(`;
        setTimeout(() => {
            location.reload();
        }, 3000);
    }
}
