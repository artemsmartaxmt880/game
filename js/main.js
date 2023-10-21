const startGame = document.querySelector('.startGame');
document.querySelector('.startGameBtn').addEventListener('click', (event) => {
    game();
    startGame.style.visibility = 'hidden';
})
function game() {
    document.querySelector('.playBtn').style.visibility = 'visible';
    document.querySelector('.score').style.visibility = 'visible';

    let animationId = null;
    let inPause = false;

    let score = 0;

    let speed = 2;

    const car = document.querySelector('.car');
    const carInfo = {
        ...createInfo(car),
        move: {
            top: null,
            right: null,
        },
    }
    const road = document.querySelector('.road');
    const roadInfo = {
        width: road.clientWidth,
        heigth: road.clientHeight,
    }
    const coin = document.querySelector('.coin');
    const coinInfo = createInfo(coin);

    const danger = document.querySelector('.danger');
    const dangerInfo = createInfo(danger);

    const trees = document.querySelectorAll('.tree');
    const playBtn = document.querySelector('.playBtn');

    const treesCoords = [];
    trees.forEach((item) => {
        coords = getCoordinate(item)
        treesCoords.push(coords);
    })

    animationId = requestAnimationFrame(startGame);

    playBtn.addEventListener('click', () => {
        let img = document.querySelector('.pause')
        const imgList = ["./img/pause.png", "./img/play.png"]
        if (inPause) {
            requestAnimationFrame(startGame)
            img.src = imgList[0];
        }
        else {
            img.src = imgList[1];
            cancelAnimationsFrame()
        }
        inPause = !inPause;
    })
    document.querySelector('.endGameBtn').addEventListener('click', (event) => {
        window.location.reload()
    })
    document.addEventListener('keydown', (event) => {
        if (inPause) return;
        const code = event.code;
        if (code === 'KeyW' && carInfo.move.top === null) {
            carInfo.move.top = requestAnimationFrame(carMoveToTop)
        }
        else if (code === 'KeyD' && carInfo.move.right === null) {
            carInfo.move.right = requestAnimationFrame(carMoveToRight)
        }
        else if (code === 'KeyS' && carInfo.move.bottom === null) {
            carInfo.move.bottom = requestAnimationFrame(carMoveToBottom)
        }
        else if (code === 'KeyA' && carInfo.move.left === null) {
            carInfo.move.left = requestAnimationFrame(carMoveToLeft)
        }
    })

    document.addEventListener('keyup', (event) => {
        const code = event.code;
        if (code === 'KeyW') {
            cancelAnimationFrame(carInfo.move.top)
            carInfo.move.top = null;
        }
        else if (code === 'KeyD') {
            cancelAnimationFrame(carInfo.move.right)
            carInfo.move.right = null;
        }
        else if (code === 'KeyS') {
            cancelAnimationFrame(carInfo.move.bottom)
            carInfo.move.bottom = null;
        }
        else if (code === 'KeyA') {
            cancelAnimationFrame(carInfo.move.left)
            carInfo.move.left = null;
        }
    })

    function startGame() {
        itemAnimation(danger, dangerInfo);
        if (itemOverlay(dangerInfo)) {
            return endGame();
        }
        treesAnimation();
        itemAnimation(coin, coinInfo);
        if (itemOverlay(coinInfo) && coinInfo.visible === true) {
            score++;
            document.querySelector('.score').textContent = score;
            coin.style.display = 'none';
            coinInfo.visible = false;
            if (score % 2 === 0) speed++;
        }
        animationId = requestAnimationFrame(startGame);
    }
    function endGame() {
        cancelAnimationsFrame()
        car.style.border = '3px solid black'
        danger.style.border = '3px solid black'
        document.querySelector('.endGame__score').textContent = score;
        document.querySelector('.endGame').style.visibility = 'visible';
        document.querySelector('.playBtn').style.visibility = 'hidden';
        document.querySelector('.score').style.visibility = 'hidden';
        inPause = !inPause;
    }
    function cancelAnimationsFrame() {
        cancelAnimationFrame(animationId)
        cancelAnimationFrame(carInfo.move.top)
        cancelAnimationFrame(carInfo.move.right)
        cancelAnimationFrame(carInfo.move.bottom)
        cancelAnimationFrame(carInfo.move.left)
    }
    function createInfo(item) {
        return {
            width: item.clientWidth,
            heigth: item.clientHeight,
            coords: getCoordinate(item),
            visible: true,
        }
    }
    function carMoveToTop() {
        const y = carInfo.coords.y - 5;
        if (y < 0) return;
        carInfo.coords.y = y;
        car.style.top = `${y}px`
        carInfo.move.top = requestAnimationFrame(carMoveToTop)
    }
    function carMoveToRight() {
        const x = carInfo.coords.x - 5;
        if (x < 0) return;
        carInfo.coords.x = x;
        car.style.right = `${x}px`
        carInfo.move.right = requestAnimationFrame(carMoveToRight)
    }
    function carMoveToBottom() {
        const y = carInfo.coords.y + 5;
        if (y > roadInfo.heigth - carInfo.heigth) return;
        carInfo.coords.y = y;
        car.style.top = `${y}px`
        carInfo.move.bottom = requestAnimationFrame(carMoveToBottom)
    }
    function carMoveToLeft() {
        const x = carInfo.coords.x + 5;
        if (x > roadInfo.width - carInfo.width) return;
        carInfo.coords.x = x;
        car.style.right = `${x}px`
        carInfo.move.left = requestAnimationFrame(carMoveToLeft)
    }
    function getCoordinate(item) {
        const x = window.getComputedStyle(item).right;
        const y = window.getComputedStyle(item).top;
        return { x: parseInt(x), y: parseInt(y) };
    }
    function treesAnimation() {
        for (let i = 0; i < trees.length; i++) {
            const tree = trees[i]
            const coords = treesCoords[i]
            let newCoord = coords.y + speed;
            if (newCoord > window.innerHeight) {
                newCoord = -300;
            }
            coords.y = newCoord;
            tree.style.top = `${newCoord}px`
        }
    }
    function itemAnimation(item, itemInfo) {
        let newCoordY = itemInfo.coords.y + speed;
        let newCoordX = itemInfo.coords.x;
        if (newCoordY > window.innerHeight) {
            newCoordY = -100;
            item.style.display = 'initial';
            itemInfo.visible = true;
            newCoordX = parseInt(Math.random() * (roadInfo.width - (itemInfo.width * 2)));
        }
        itemInfo.coords.y = newCoordY;
        itemInfo.coords.x = newCoordX;
        item.style.top = `${newCoordY}px`
        item.style.right = `${newCoordX}px`
    }
    function itemOverlay(item) {
        const carTop = carInfo.coords.y;
        const carBottom = carInfo.coords.y + carInfo.heigth;
        const carLeft = carInfo.coords.x;
        const carRigth = carInfo.coords.x + carInfo.width;

        const itemTop = item.coords.y;
        const itemBottom = item.coords.y + item.heigth;
        const itemLeft = item.coords.x;
        const itemRigth = item.coords.x + item.width;

        if (carTop > itemBottom || carBottom < itemTop) return false;
        if (carLeft > itemRigth || carRigth < itemLeft) return false;

        return true;
    }
}
