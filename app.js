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


        const containerWidth = container.offsetWidth;
        el.style.left = Math.random() * (containerWidth - 200) + 'px';

        el.style.fontSize = `${Math.random() * (26 - 12) + 12}px`;
        el.style.setProperty('--z-depth', `${z}px`);
        el.style.zIndex = 500 - Math.abs(z);
        el.style.animationDuration = `${Math.random() * 4 + 6}s`;

        container.appendChild(el);
        setTimeout(() => el.remove(), 10000);
    }


    setInterval(CreateFallingElement, 100);

    // PC: di chuột
    document.addEventListener('mousemove', (e) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 60;
        const y = (e.clientY / window.innerHeight - 0.5) * 60;
        rotateContainer(y, -x);
    });

    // MOBILE: vuốt chạm
    let lastTouch = { x: 0, y: 0 };
    let currentRotation = { x: 0, y: 0 };

    document.addEventListener('touchstart', (e) => {
        if (e.touches.length === 1) {
            lastTouch.x = e.touches[0].clientX;
            lastTouch.y = e.touches[0].clientY;
        }
    }, { passive: false });

    document.addEventListener('touchmove', (e) => {
        if (e.touches.length === 1) {
            e.preventDefault();

            const dx = e.touches[0].clientX - lastTouch.x;
            const dy = e.touches[0].clientY - lastTouch.y;

            // Điều chỉnh độ nhạy
            currentRotation.x += dy * 0.15;
            currentRotation.y += -dx * 0.15;

            // Giới hạn góc xoay (tuỳ chọn)
            currentRotation.x = Math.max(-40, Math.min(40, currentRotation.x));
            currentRotation.y = Math.max(-40, Math.min(40, currentRotation.y));

            rotateContainer(currentRotation.x, currentRotation.y);

            lastTouch.x = e.touches[0].clientX;
            lastTouch.y = e.touches[0].clientY;
        }
    }, { passive: false });

    function rotateContainer(rx, ry) {
        container.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg)`;
        containerBGR.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg)`;
    }


    function rotateContainer(rx, ry) {
        container.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg)`;
        containerBGR.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg)`;
    }
};
