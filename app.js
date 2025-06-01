window.onload = function () {
    const container = document.getElementById('container');

    const texts = [
        'Ngoan xinh yêu♥',
        'cinn♥',
        'Vợ',
        'Em yêu anhh ♥',
        'Luôn bên anh ♥',
        'Love u so much ♥',
        'Dreaming of us ♥',
        'Immersed in your love',
        'Text me, 1 miss you',
        '♥',
        '❤️',
        '💗',
        '💓',
        '💘',
        '🧸',
        '🍓',
        '🫧',
        '🎀'

    ];

    const textsColor = [
        'rgb(255, 169, 185)',
        'rgb(255, 98, 216)',
        'rgb(255, 119, 191)',
        'rgb(255, 240, 251)'
    ];



    // chống cuộn
    document.addEventListener('touchmove', function (e) {
        e.preventDefault();
    }, { passive: false });

    document.addEventListener('wheel', function (e) {
        e.preventDefault();
    }, { passive: false });

    document.addEventListener('gesturestart', function (e) {
        e.preventDefault();
    });

    document.addEventListener('gesturechange', function (e) {
        e.preventDefault();
    });

    document.addEventListener('gestureend', function (e) {
        e.preventDefault();
    });


    // chữ rơi
    function CreateFallingElement() {
        const el = document.createElement('div');
        el.className = 'falling';
    
        el.textContent = texts[Math.floor(Math.random() * texts.length)];
        el.style.color = textsColor[Math.floor(Math.random() * textsColor.length)];
    
        const z = Math.floor(Math.random() * 500 - 250);
        el.style.setProperty('--z-depth', `${z}px`);
    
        const absZ = Math.abs(z);
    
        let fontSize, duration, opacity;
    
        if (absZ > 180) {
            fontSize = Math.random() * (18 - 12) + 12;
            duration = Math.random() * 3 + 9;
            opacity = 0.5;
        } else if (absZ > 80) {
            fontSize = Math.random() * (27 - 16) + 16;
            duration = Math.random() * 3 + 7;
            opacity = 0.7;
        } else {
            fontSize = Math.random() * (35 - 20) + 20;
            duration = Math.random() * 2 + 5;
            opacity = 0.9;
        }
    
        const containerWidth = container.offsetWidth;
        el.style.left = Math.random() * (containerWidth - 200) + 'px';
        el.style.top = '0px';   // Bắt đầu từ trên cùng container
        el.style.fontSize = `${fontSize}px`;
        el.style.animationDuration = `${duration}s`;
        el.style.opacity = opacity;
    
        el.style.transform = `translateZ(${z}px)`; // hiệu ứng chiều sâu
    
        container.appendChild(el);
    
        setTimeout(() => el.remove(), duration * 1000 + 1000);
    }
    

    setInterval(CreateFallingElement, 220);

    // di chuột
    document.addEventListener('mousemove', (e) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 60;
        const y = (e.clientY / window.innerHeight - 0.5) * 60;
        rotateContainer(y, -x);
    });

    // vuốt chạm
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

            // độ nhạy
            currentRotation.x += dy * 0.15;
            currentRotation.y += -dx * 0.15;

            // giới hạn góc xoay
            currentRotation.x = Math.max(-50, Math.min(50, currentRotation.x));
            currentRotation.y = Math.max(-50, Math.min(50, currentRotation.y));

            rotateContainer(currentRotation.x, currentRotation.y);

            lastTouch.x = e.touches[0].clientX;
            lastTouch.y = e.touches[0].clientY;
        }
    }, { passive: false });

    function rotateContainer(rx, ry) {
        container.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg)`;
    }


    function rotateContainer(rx, ry) {
        container.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg)`;
    }
};
