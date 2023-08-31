let vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty('--vh', `${vh}px`);

window.addEventListener('resize', () => {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
});

const areaWrap = document.querySelector('.inner_section');
const area = areaWrap.offsetWidth;
const brush = document.querySelector('.brush');
const girl = document.querySelector('.girl');

const randomImg = () => {
    const num = Math.floor(Math.random() * 4);
    brush.style.backgroundImage = `url(/assets/images/brush${num}.png)`;
    girl.style.backgroundImage = `url(/assets/images/shygirl${num}.png)`;
}

randomImg();

let count = 0;
const shyText = document.querySelector('.text');

const shy = (finalTop, finalLeft) => {
    if (0 > finalTop || finalTop > area || 0 > finalLeft || finalLeft > area) {
        count++;

        if (8 > count) {
            const opacity = count * 0.14;
            brush.style.opacity = `${opacity}`
        } else {
            shyText.style.display = 'block';
        }
    }
}

const draggable = ($target) => {
    let isPress = false,
        prevPosX = 0,
        prevPosY = 0;

    $target.addEventListener('touchstart', start);
    window.addEventListener('touchend', end);

    function start(e) {
        const touch = e.touches[0];
        prevPosX = touch.clientX;
        prevPosY = touch.clientY;
        isPress = true;

        window.addEventListener('touchmove', move);
    }

    function move(e) {
        if (!isPress) return;

        const touch = e.touches[0];
        const posX = prevPosX - touch.clientX;
        const posY = prevPosY - touch.clientY;

        prevPosX = touch.clientX;
        prevPosY = touch.clientY;

        $target.style.left = ($target.offsetLeft - posX) + "px";
        $target.style.top = ($target.offsetTop - posY) + "px";
    }

    function end() {
        if (isPress) {
            isPress = false;

            window.removeEventListener('touchmove', move);

            const finalTop = $target.offsetTop;
            const finalLeft = $target.offsetLeft;
            console.log(`Final top: ${finalTop}px, Final left: ${finalLeft}px`);

            shy(finalTop, finalLeft);
        }
    }
}

const dragItems = document.querySelectorAll('.drag_items');

dragItems.forEach((dragItem) => {
    const top = Math.floor(Math.random() * 100);
    const left = Math.floor(Math.random() * 100);
    const deg = Math.floor(Math.random() * 360);
    dragItem.style.top = `${top}%`;
    dragItem.style.left = `${left}%`;
    dragItem.style.transform = `translate(-50%, -50%) rotate(${deg}deg)`;

    draggable(dragItem);
});
