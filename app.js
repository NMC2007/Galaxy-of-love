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

    // Di chuyển chuột trên PC
    document.addEventListener('mousemove', (e) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 60;
        const y = (e.clientY / window.innerHeight - 0.5) * 60;
        container.style.transform = `rotateX(${y}deg) rotateY(${-x}deg)`;
        containerBGR.style.transform = `rotateX(${y}deg) rotateY(${-x}deg)`;
    });

    // iOS yêu cầu xin quyền cảm biến
    function enableDeviceOrientation() {
        if (
            typeof DeviceOrientationEvent !== 'undefined' &&
            typeof DeviceOrientationEvent.requestPermission === 'function'
        ) {
            // iOS
            DeviceOrientationEvent.requestPermission()
                .then((response) => {
                    if (response === 'granted') {
                        window.addEventListener('deviceorientation', handleOrientation);
                    } else {
                        alert('Bạn cần cấp quyền để dùng cảm biến nghiêng trên iPhone.');
                    }
                })
                .catch(console.error);
        } else {
            // Android
            window.addEventListener('deviceorientation', handleOrientation);
        }
    }

    // Hàm xử lý chuyển động
    function handleOrientation(event) {
        const x = event.beta || 0;  // nghiêng trước sau
        const y = event.gamma || 0; // nghiêng trái phải
        container.style.transform = `rotateX(${x / 35}deg) rotateY(${y / 35}deg)`;
        containerBGR.style.transform = `rotateX(${x / 35}deg) rotateY(${y / 35}deg)`;
    }

    // Gọi khi người dùng nhấn vào màn hình (iOS cần tương tác người dùng)
    document.body.addEventListener('click', enableDeviceOrientation, { once: true });
};
