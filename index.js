let grid = document.querySelector('.canvas-wrapper');


function makeGrid(size) {
    grid.style.setProperty('--gridRows', size);
    grid.style.setProperty('--gridColumn', size);

    for (let i = 0; i < size * size; i++) {
        let cell = document.createElement("div");
        grid.appendChild(cell).className = 'grid-items';
    }
}

function slider() {
    let sliderInput = document.querySelector('#grid-size-changer');
    let output = document.querySelector("#grid-value");
    output.textContent = sliderInput.value;
}


slider();
makeGrid(40);