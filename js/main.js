game();
function game() {
    let animationId = null;
    let inPause = false;

    const car = document.querySelector('.car');
    const trees = document.querySelectorAll('.tree');
    const playBtn = document.querySelector('.playBtn');
    animationId = requestAnimationFrame(startGame);
    function startGame() {
        console.log('inProcess');
        animationId = requestAnimationFrame(startGame);
    }

    playBtn.addEventListener('click', () => {
        let img = document.querySelector('.pause')
        const imgList = ["./img/pause.png", "./img/play.png"]
        if (inPause) {
            img.src = imgList[0];
        }
        else {
            img.src = imgList[1];
        }
        inPause = !inPause;
        cancelAnimationFrame(animationId)
    })
}