const canvas = document.getElementById('canvas');
const toolbar = document.getElementById('toolbar');
const context = canvas.getContext('2d');

const canvasOffsetX = canvas.offsetLeft;
const canvasOffsetY = canvas.offsetTop;

canvas.width = window.innerWidth - canvasOffsetX;
canvas.height = window.innerHeight - canvasOffsetY;

let isPainting = false;
let lineWidth = 5;
let startX;
let startY;

const draw = e => {
    if (!isPainting){
        return;
    }

    context.lineWidth = lineWidth;
    context.lineCap = 'round';

    context.lineTo(e.clientX - canvasOffsetX, e.clientY);
    context.stroke();
}

toolbar.addEventListener('click', e => {
    if (e.target.id === 'clear') {
        context.clearRect(0, 0, canvas.width, canvas.height);
    }
});

toolbar.addEventListener('change', e => {
    if (e.target.id === 'stroke'){
        context.strokeStyle = e.target.value;
    }

    if (e.target.id === 'line-width'){
        lineWidth = e.target.value;
    }
});

canvas.addEventListener('mousedown', e =>{
    isPainting = true;
    startX = e.clientX;
    startY = e.clientY;
});

canvas.addEventListener('mouseup', e => {
    isPainting = false;
    context.stroke();
    context.beginPath();
})

canvas.addEventListener('mousemove', draw);