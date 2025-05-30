window.onload = function () {
    const container = document.getElementById('container');
    const containerBGR = document.getElementById('container_Bgr');

    const texts = [
        'Nguyễn Mạnh Cường',
        'Yêu emmmmmm ♥♥',
        'Love u so much ♥',
        'Luôn luôn bên nhau ♥',
        'My heart beats for you',
        'I’m so lucky to have you',
        '♥',
        '❤️',
        '💗',
        '💓',
        '💘'
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

        // chọn màu vs thông điệp chữ
        el.textContent = texts[Math.floor(Math.random() * texts.length)];
        el.style.color = textsColor[Math.floor(Math.random() * textsColor.length)];

        // random độ sâu z (-250 -> 250)
        const z = Math.floor(Math.random() * 500 - 250);
        el.style.setProperty('--z-depth', `${z}px`);
        el.style.zIndex = 500 - Math.abs(z);

        // các lớp xa trung gần
        const absZ = Math.abs(z);
        // thông số chữ
        let fontSize, duration, opacity;

        if (absZ > 180) {
            // xa: nhỏ, mờ, chậm
            fontSize = Math.random() * (18 - 12) + 12;
            duration = Math.random() * 3 + 9;
            opacity = 0.5;
        } else if (absZ > 80) {
            // trung
            fontSize = Math.random() * (25 - 16) + 16;
            duration = Math.random() * 3 + 7;
            opacity = 0.7;
        } else {
            // gần: to, rõ, nhanh
            fontSize = Math.random() * (35 - 20) + 20;
            duration = Math.random() * 2 + 5;
            opacity = 0.9;
        }

        // chiều rộng phân bổ
        const containerWidth = container.offsetWidth;

        // random tầng, font, độ đậm nhạt của chữ
        el.style.left = Math.random() * (containerWidth - 200) + 'px';
        el.style.fontSize = `${fontSize}px`;
        el.style.animationDuration = `${duration}s`;
        el.style.opacity = opacity;

        // hiệu ứng translateZ giả lập 3D
        el.style.transform = `translateZ(${z}px)`;

        // thêm vào màn hình và xoá khi hết thời gian
        container.appendChild(el);
        setTimeout(() => el.remove(), duration * 1000 + 1000);
    }



    setInterval(CreateFallingElement, 150);

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
