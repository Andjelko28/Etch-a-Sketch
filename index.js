const DEFAULT_SIZE = 16;
const DEFAULT_COLOR = 'black';

// Declaring default parameters

let currentSize = DEFAULT_SIZE;
let currentColor = DEFAULT_COLOR;
let isDrawing = false;
let currentMode = 'black';


// Creating DOM 

const grid = document.querySelector('.canvas-wrapper');
const sizeValue = document.querySelector('#grid-value');
const sizeSlider = document.querySelector('#grid-size-changer');
const black = document.querySelector('.black');
const rainbow = document.querySelector('.rainbow');
const eraser = document.querySelector('.eraser');
const clearBtn = document.querySelector('.clear-btn');

// Set modes for grid

function setBlackMode() {
    currentMode = 'black';
}

function setEraseMode() {
    currentMode = 'erase';
}

function setRainbowMode() {
    currentMode = 'rainbow';
}

function getRandomColor() {
    return Math.floor(Math.random() * 256);
}


// Settign function to set color or eraser

function applyColorOrErase(event) {
    if (currentMode === 'black') {
        event.target.style.backgroundColor = currentColor;
    } else if (currentMode === 'erase') {
        event.target.style.backgroundColor = 'white';
    } else if (currentMode === 'rainbow') {
        const randomR = getRandomColor();
        const randomG = getRandomColor();
        const randomB = getRandomColor();
        event.target.style.backgroundColor = `rgb(${randomR},${randomB},${randomG})`;
    }
}

// Function to set modes for grid  cells
function setModes(mode) {
    if (mode === 'erase') {
        setEraseMode();
    } else if (mode === 'black') {
        setBlackMode();
    } else if (mode === 'rainbow') {
        setRainbowMode()
    }
    colorGrid();
}

// Function that will color grid
function colorGrid() {
    grid.addEventListener('mouseover', (e) => {
        isDrawing = true;
        applyColorOrErase(e);
    })
    grid.addEventListener('mouseover', (e) => {
        if (isDrawing) {
            applyColorOrErase(e);
        }
    });
    grid.addEventListener('mouseup', (e) => {
        isDrawing = false;
    });

    document.addEventListener('mouseup', (e) => {
        isDrawing = false;
    });

    sizeSlider.addEventListener('mouseover', () => {
        isDrawing = false;
    })


}

// Creating grid

function setCurrentSize(newSize) {
    currentSize = newSize;
}


function displayNewSize(value) {
    sizeValue.innerHTML = `${value} x ${value}`;
}

function createGrid() {
    grid.style.setProperty('--gridColumn', currentSize);
    grid.style.setProperty('--gridRows', currentSize);

    for (let i = 0; i < currentSize * currentSize; i++) {
        const cell = document.createElement('div');
        grid.appendChild(cell).className = 'grid-items';
    }
    setModes('black');
}

function clearGrid() {
    grid.innerHTML = '';
}

function reloadGrid() {
    clearGrid();
    createGrid(currentSize);
}

function updateGrdiSize(value) {
    setCurrentSize(value);
    displayNewSize(value);
    reloadGrid();
}

sizeSlider.addEventListener('mousemove', (e) => {
    updateGrdiSize(e.target.value);
});

sizeSlider.addEventListener('change', (e) => updateGrdiSize(e.target.value));
createGrid(currentSize);

// Event listeners
clearBtn.addEventListener('click', reloadGrid);

black.addEventListener("click", () => {
    setModes('black');
})

rainbow.addEventListener('click', () => {
    setModes('rainbow');
})

eraser.addEventListener('click', () => {
    setModes('erase')
})