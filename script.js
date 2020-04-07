let grid;
let intervalId;

startButton.addEventListener('click', event => {
    restart()
});

stopButton.addEventListener('click', event => {
    clearInterval(intervalId);
});

but3.addEventListener('click', () => {
    window.localStorage.setItem('nCount', '3');
    restart();
});

but4.addEventListener('click', () => {
    window.localStorage.setItem('nCount', '4');
    restart();
});

but5.addEventListener('click', () => {
    window.localStorage.setItem('nCount', '5');
    restart();
});

but6.addEventListener('click', () => {
    window.localStorage.setItem('nCount', '6');
    restart();
});

but7.addEventListener('click', () => {
    window.localStorage.setItem('nCount', '7');
    restart();
});

but8.addEventListener('click', () => {
    window.localStorage.setItem('nCount', '8');
    restart();
});

function restart() {
    clearInterval(intervalId);
    let n = Number(window.localStorage.getItem('nCount'));
    if (n === undefined || n === null || n < 3 || n > 8) {
        n = 3;
    }
    document.querySelector('.wrapper').removeChild(grid);
    createGrid(n);
    count.textContent = 0;
    time.textContent = 0;
    intervalId = setInterval(() => time.textContent = Number(time.textContent) + 1, 1000);
}

function checkResult() {
    let arr = [...document.querySelectorAll('.grid__button')];
    const emptyIndex = arr.findIndex(elem => elem.classList.contains('grid__button_empty'));

    if (emptyIndex === arr.length - 1) {
        let numbers = [];
        let flag = true;
        for (let i = 0; i < arr.length - 1; i++) {
            let number = Number(arr[i].textContent);
            if (number < numbers[numbers.length - 1]) {
                flag = false;
            } else {
                numbers.push(number);
            }
        }
        return flag;
    }
}

function createGrid(n) {
    grid = document.createElement('div');
    grid.classList.add('grid');
    grid.style.gridTemplateRows = `repeat(${n}, 1fr)`;
    grid.style.gridTemplateColumns = `repeat(${n}, 1fr)`;

    let num = 1;
    let buttons = [];
    for (let i = 0; i < n; i++) {

        for (let j = 0; j < n; j++) {
            const newButton = document.createElement('div');
            newButton.classList.add('grid__button');
            newButton.textContent = String(num++);

            newButton.addEventListener('click', event => {
                const target = event.target;
                if (!target.classList.contains('grid__button_empty')) {
                    let arr = [...document.querySelectorAll('.grid__button')];
                    console.log(arr);
                    const indexClicked = arr.findIndex(elem => elem === target);
                    const indexEmpty = arr.findIndex(elem => elem.classList.contains('grid__button_empty'));
                    console.log(indexClicked);
                    console.log(indexEmpty);
                    if (indexClicked + 1 === indexEmpty || indexClicked - 1 === indexEmpty
                        || indexClicked - n === indexEmpty || indexClicked + n === indexEmpty) {
                        const emptyElement = arr[indexEmpty];
                        const targetElement = arr[indexClicked];

                        if (indexClicked + 1 === indexEmpty) {
                            grid.insertBefore(emptyElement, targetElement);
                        } else {
                            grid.insertBefore(targetElement, emptyElement);
                            grid.insertBefore(emptyElement, arr[indexClicked + 1]);
                        }
                    }

                    count.textContent = Number(count.textContent) + 1;
                }

                if (checkResult()) {
                    clearInterval(intervalId);
                    alert(`Ура! Вы решили головоломку за ${time.textContent} секунд и ${count.textContent} ходов`);
                }
            });
            buttons.push(newButton);
        }
    }
    let last = buttons[buttons.length - 1];
    last.textContent = '';
    last.classList.add('grid__button_empty');

    let sortedArr = buttons.sort(() => Math.random() - 0.5);

    sortedArr.forEach(button => {
        grid.appendChild(button)
    });


    document.querySelector('.wrapper').appendChild(grid);
}

window.addEventListener('DOMContentLoaded', () => {
    createGrid(3);
    count.textContent = 0;
    time.textContent = 0;
    intervalId = setInterval(() => time.textContent = Number(time.textContent) + 1, 1000);
});