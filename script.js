document.addEventListener('DOMContentLoaded', () => {
    const gameArea = document.querySelector('.game-area');
    const snake = document.querySelector('.snake');
    const apple = document.querySelector('.apple');

    let snakeParts = [{ x: 10, y: 10 }];
    let appleX = 0;
    let appleY = 0;
    let posX = 0;
    let posY = 0;
    let intervalTime = 100;
    let interval = 0;
    let ateApple = false;

    function randomApple() {
        appleX = Math.floor(Math.random() * 20) * 20;
        appleY = Math.floor(Math.random() * 20) * 20;
        apple.style.left = appleX + 'px';
        apple.style.top = appleY + 'px';
        apple.style.display = 'block';
    }

    function reset() {
        snakeParts = [{ x: 10, y: 10 }];
        clearInterval(interval);
        intervalTime = 100;
        posX = 0;
        posY = 0;
        randomApple();
        interval = setInterval(moveSnake, intervalTime);
    }

    function moveSnake() {
        const newX = snakeParts[0].x + posX;
        const newY = snakeParts[0].y + posY;

        if (newX >= 400 || newX < 0 || newY >= 400 || newY < 0 || checkSelfCollision(newX, newY)) {
            reset();
            return;
        }

        const head = { x: newX, y: newY };
        snakeParts.unshift(head);

        const distance = Math.sqrt(Math.pow(newX - appleX, 2) + Math.pow(newY - appleY, 2));
        if (distance < 20) {
            apple.style.display = 'none';
            ateApple = true;
            setTimeout(() => {
                randomApple();
            }, 0);
            if (ateApple) {
                ateApple = false;
            }
            return;
        }

        if (snakeParts.length > 1) {
            snakeParts.pop();
        }

        updateSnake();
    }

    function updateSnake() {
        const snakeElements = document.querySelectorAll('.snake');
        snakeElements.forEach((element) => {
            element.remove();
        });

        snakeParts.forEach((part) => {
            const newPart = document.createElement('div');
            newPart.className = 'snake';
            newPart.style.left = part.x + 'px';
            newPart.style.top = part.y + 'px';
            gameArea.appendChild(newPart);
        });
    }

    function checkSelfCollision(x, y) {
        for (let i = 1; i < snakeParts.length; i++) {
            if (x === snakeParts[i].x && y === snakeParts[i].y) {
                return true;
            }
        }
        return false;
    }

    document.addEventListener('keydown', (e) => {
        switch (e.key) {
            case 'ArrowUp':
                if (posY !== 20) {
                    posX = 0;
                    posY = -20;
                }
                break;
            case 'ArrowDown':
                if (posY !== -20) {
                    posX = 0;
                    posY = 20;
                }
                break;
            case 'ArrowLeft':
                if (posX !== 20) {
                    posX = -20;
                    posY = 0;
                }
                break;
            case 'ArrowRight':
                if (posX !== -20) {
                    posX = 20;
                    posY = 0;
                }
                break;
        }
    });

    reset();
});
