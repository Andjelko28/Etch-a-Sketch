const DEFAULT_SIZE = 16;
const DEFAULT_COLOR = 'black';

// Creating DOM 

const grid = document.querySelector('.canvas-wrapper');
const sizeValue = document.querySelector('#grid-value');
const sizeSlider = document.querySelector('#grid-size-changer');
const black = document.querySelector('.black');
const rainbow = document.querySelector('.rainbow');
const eraser = document.querySelector('.eraser');
const clearBtn = document.querySelector('.clear-btn');



function etchCreator() {
    let currentSize = DEFAULT_SIZE;
    let currentColor = DEFAULT_COLOR;
    let isDrawing = false;


    const setCurrentColor = (newColor) => currentColor = newColor;

    function setRandomColor() {
        return Math.floor(Math.random() * 256);
        //252, 186, 3
    }

    function setCurrentSize(newSize) {
        currentSize = newSize;
    }

    const getCurrentColor = () => currentColor;

    const getCurrentSize = () => currentSize;

    function getRandomColor() {
        const randomColor = `rgb(${setRandomColor()}, ${setRandomColor()}, ${setRandomColor()})`;
        console.log(randomColor);
        return randomColor;
    }


    return { setCurrentColor, getCurrentColor, setCurrentSize, getRandomColor, getCurrentSize, setRandomColor, isDrawing }
}


function gridCreator() {

    function displayNewSize(element, value) {
        element.innerHTML = `${value} x ${value}`;
    }

    function createGrid(gridArg, colRow) {
        gridArg.style.setProperty('--gridColumn', colRow);
        gridArg.style.setProperty('--gridRows', colRow);

        for (let i = 0; i < colRow * colRow; i++) {
            const cell = document.createElement('div');
            grid.appendChild(cell).className = 'grid-items';
        }
        etch.getCurrentColor();
    }

    function clearGrid(gridParam) {
        gridParam.innerHTML = '';
    }

    function reloadGrid(gridParam) {
        clearGrid(gridParam);
        createGrid(gridParam);
    }


    return { displayNewSize, createGrid, reloadGrid, clearGrid }
}

let timer;

function colGrid() {

    function colorGrid(gridArg) {
        gridArg.addEventListener('mouseover', (e) => {
            etch.isDrawing = true;
            e.target.style.backgroundColor = etch.getCurrentColor();
        });

        grid.addEventListener('mouseover', (e) => {
            if (etch.isDrawing) {
                e.target.style.backgroundColor = etch.getCurrentColor();
            }
        });
        gridArg.addEventListener('mouseup', (e) => {
            etch.isDrawing = true;
        });

        document.addEventListener('mouseup', (e) => {
            etch.isDrawing = true;
        });

        sizeSlider.addEventListener('mouseover', () => {
            etch.isDrawing = true;
        })

    }
    return { colorGrid }
}

const etchGrid = gridCreator();
const etch = etchCreator();
const colorGridEl = colGrid();
etchGrid.createGrid(grid, etch.getCurrentSize());

sizeSlider.addEventListener('change', (e) => {
    etch.setCurrentSize(e.target.value);
    grid.innerHTML = '';
    etchGrid.createGrid(grid, etch.getCurrentSize());
    etchGrid.displayNewSize(sizeValue, etch.getCurrentSize());
})

clearBtn.addEventListener('click', () => { etchGrid.clearGrid(grid), etchGrid.createGrid(grid, etch.getCurrentSize()),clearInterval(timer),etch.setCurrentColor('white'); });

black.addEventListener('click', () => {
    clearInterval(timer);
    etch.setCurrentColor('black');
    colorGridEl.colorGrid(grid);
})

eraser.addEventListener('click', () => {
    clearInterval(timer);
    etch.setCurrentColor('white');
    colorGridEl.colorGrid(grid);
})

rainbow.addEventListener('click', () => {
    timer = setInterval(() => {
        etch.setCurrentColor(etch.getRandomColor());
        colorGridEl.colorGrid(grid);
    }, 100)

})


