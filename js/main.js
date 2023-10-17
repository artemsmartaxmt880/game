game();
function game() {
    let animationId = null;
    let inPause = false;

    const speed = 2;

    const car = document.querySelector('.car');
    const trees = document.querySelectorAll('.tree');
    const playBtn = document.querySelector('.playBtn');

    const treeOne = trees[0];
    const treesCoords = [];
    trees.forEach((item) => {
        coords = getCoordinate(item)
        treesCoords.push(coords)
    })
    const coordTreeOne = getCoordinate(treeOne);
    function getCoordinate(item) {
        const coord = window.getComputedStyle(item).top;
        return parseFloat(coord);
    }
    animationId = requestAnimationFrame(startGame);
    function startGame() {
        console.log('inProcess');
        treesAnimation()
        animationId = requestAnimationFrame(startGame);
    }
    function treesAnimation() {
        for (let i = 0; i < trees.length; i++) {
            const tree = trees[i]
            const coords = treesCoords[i]

            let newCoord = coords + speed;
            if (newCoord > window.innerHeight) {
                newCoord = -300;
            }
            treesCoords[i]= newCoord;
            tree.style.top = `${newCoord}px`
        }
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
            img.src = imgList[1];
        }
        inPause = !inPause;
    })
}