window.onload = function () {
    const container = document.getElementById('container');
    const containerBGR = document.getElementById('container_Bgr');

    const texts = [
        'Nguyễn Mạnh Cường',
        'Love u so much ♥',
        'Luôn luôn bên nhau ♥',
        '4 Year Anniversary',
        '♥',
        '❤️',
        '💗',
        '💓'
    ];

    const textsColor = [
        'rgb(255, 169, 185)',
        'rgb(255, 98, 216)',
        'rgb(255, 119, 191)',
        'rgb(255, 240, 251)'
    ];

    function CreateFallingElement() {
        const el = document.createElement('div');
        el.className = 'falling';

        el.textContent = texts[Math.floor(Math.random() * texts.length)];
        el.style.color = textsColor[Math.floor(Math.random() * textsColor.length)];

        const z = Math.floor(Math.random() * 500 - 250);

        el.style.left = Math.random() * window.innerWidth + 'px';
        el.style.fontSize = `${Math.random() * 6 + 20}px`;
        el.style.setProperty('--z-depth', `${z}px`);
        el.style.zIndex = 500 - Math.abs(z);
        el.style.animationDuration = `${Math.random() * 4 + 8}s`;

        container.appendChild(el);
        setTimeout(() => el.remove(), 10000);
    }

    setInterval(CreateFallingElement, 200);

    // PC: di chuột
    document.addEventListener('mousemove', (e) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 60;
        const y = (e.clientY / window.innerHeight - 0.5) * 60;
        rotateContainer(y, -x);
    });

    // MOBILE: vuốt chạm
    let lastTouch = { x: 0, y: 0 };
    document.addEventListener('touchstart', (e) => {
        if (e.touches.length === 1) {
            lastTouch.x = e.touches[0].clientX;
            lastTouch.y = e.touches[0].clientY;
        }
    });

    document.addEventListener('touchmove', (e) => {
        if (e.touches.length === 1) {
            const dx = e.touches[0].clientX - lastTouch.x;
            const dy = e.touches[0].clientY - lastTouch.y;
            const rotateX = dy * 0.3;
            const rotateY = -dx * 0.3;
            rotateContainer(rotateX, rotateY);

            lastTouch.x = e.touches[0].clientX;
            lastTouch.y = e.touches[0].clientY;
        }
    });

    function rotateContainer(rx, ry) {
        container.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg)`;
        containerBGR.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg)`;
    }
};
