game();
function game() {
    let animationId = null;
    let inPause = false;

    const speed = 1.5;

    const car = document.querySelector('.car');
    const carHiegth = car.clientHeight;
    const carWidth = car.clientWidth;

    const road = document.querySelector('.road');
    const roadWidth = road.clientWidth;
    const roadHiegth = road.clientHeight;

    const coin = document.querySelector('.coin');
    const coinWidth = coin.clientWidth;
    const coinCoords = getCoordinate(coin);

    const danger = document.querySelector('.danger');
    const dangerWidth = danger.clientWidth;
    const dangerCoords = getCoordinate(danger);
    
    const arrow = document.querySelector('.arrow');
    const arrowWidth = arrow.clientWidth;
    const arrowCoords = getCoordinate(arrow);

    const trees = document.querySelectorAll('.tree');
    const playBtn = document.querySelector('.playBtn');

    const treesCoords = [];
    const carCoords = getCoordinate(car);
    const carMove = {
        top: null,
        right: null,
        bottom: null,
        left: null,
    }
    trees.forEach((item) => {
        coords = getCoordinate(item)
        treesCoords.push(coords);
    })
    document.addEventListener('keydown', (event) => {
        if (inPause) return;
        const code = event.code;
        if (code === 'KeyW' && carMove.top === null) {
            carMove.top = requestAnimationFrame(carMoveToTop)
        }
        else if (code === 'KeyD' && carMove.right === null) {
            carMove.right = requestAnimationFrame(carMoveToRight)
        }
        else if (code === 'KeyS' && carMove.bottom === null) {
            carMove.bottom = requestAnimationFrame(carMoveToBottom)
        }
        else if (code === 'KeyA' && carMove.left === null) {
            carMove.left = requestAnimationFrame(carMoveToLeft)
        }
    })
    document.addEventListener('keyup', (event) => {
        const code = event.code;
        if (code === 'KeyW') {
            cancelAnimationFrame(carMove.top)
            carMove.top = null;
        }
        else if (code === 'KeyD') {
            cancelAnimationFrame(carMove.right)
            carMove.right = null;
        }
        else if (code === 'KeyS') {
            cancelAnimationFrame(carMove.bottom)
            carMove.bottom = null;
        }
        else if (code === 'KeyA') {
            cancelAnimationFrame(carMove.left)
            carMove.left = null;
        }
    })
    function carMoveToTop() {
        const y = carCoords.y - 5;
        if (y < 0) return;
        carCoords.y = y;
        car.style.top = `${y}px`
        carMove.top = requestAnimationFrame(carMoveToTop)
    }
    function carMoveToRight() {
        const x = carCoords.x - 5;
        if (x < 590) return;
        carCoords.x = x;
        car.style.right = `${x}px`
        carMove.right = requestAnimationFrame(carMoveToRight)
    }
    function carMoveToBottom() {
        const y = carCoords.y + 5;
        if (y > 910) return;
        carCoords.y = y;
        car.style.top = `${y}px`
        carMove.bottom = requestAnimationFrame(carMoveToBottom)
    }
    function carMoveToLeft() {
        const x = carCoords.x + 5;
        if (x > 815) return;
        carCoords.x = x;
        car.style.right = `${x}px`
        carMove.left = requestAnimationFrame(carMoveToLeft)
    }
    function getCoordinate(item) {
        const x = window.getComputedStyle(item).right;
        const y = window.getComputedStyle(item).top;
        return { x: parseInt(x), y: parseInt(y) };
    }
    animationId = requestAnimationFrame(startGame);
    function startGame() {
        treesAnimation()
        dangerAnimation()
        coinAnimation()
        arrowAnimation()
        animationId = requestAnimationFrame(startGame);
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
    function dangerAnimation() {
        let newCoordY = dangerCoords.y + speed;
        let newCoordX = dangerCoords.x;
        if (newCoordY > window.innerHeight) {
            newCoordY = -100;
            newCoordX = parseInt(Math.random() * (roadWidth - (dangerWidth * 2)));
        }
        dangerCoords.y = newCoordY;
        dangerCoords.x = newCoordX;
        danger.style.top = `${newCoordY}px`
        danger.style.right = `${newCoordX}px`
    }
    function coinAnimation() {
        let newCoordY = coinCoords.y + speed;
        let newCoordX = coinCoords.x;
        if (newCoordY > window.innerHeight) {
            newCoordY = -100;
            newCoordX = parseInt(Math.random() * (roadWidth - (coinWidth * 2)));
        }
        coinCoords.y = newCoordY;
        coinCoords.x = newCoordX;
        coin.style.top = `${newCoordY}px`
        coin.style.right = `${newCoordX}px`
    }
    function arrowAnimation() {
        let newCoordY = arrowCoords.y + speed;
        let newCoordX = arrowCoords.x;
        if (newCoordY > window.innerHeight) {
            newCoordY = -100;
            newCoordX = parseInt(Math.random() * (roadWidth - (arrowWidth * 2)));
        }
        arrowCoords.y = newCoordY;
        arrowCoords.x = newCoordX;
        arrow.style.top = `${newCoordY}px`
        arrow.style.right = `${newCoordX}px`
    }
    playBtn.addEventListener('click', () => {
        let img = document.querySelector('.pause')
        const imgList = ["./img/pause.png", "./img/play.png"]
        if (inPause) {
            requestAnimationFrame(startGame)
            img.src = imgList[0];
        }
        else {
            cancelAnimationFrame(animationId)
            cancelAnimationFrame(carMove.top)
            cancelAnimationFrame(carMove.right)
            cancelAnimationFrame(carMove.bottom)
            cancelAnimationFrame(carMove.left)
        }
        inPause = !inPause;
    })
}