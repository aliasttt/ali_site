// Check if Three.js is loaded
if (typeof THREE === 'undefined') {
    console.error('Three.js failed to load');
} else {
    console.log('Three.js loaded successfully');
}

// Get the canvas element
const canvas = document.getElementById('bg-canvas');
if (!canvas) {
    console.error('Canvas element not found');
} else {
    console.log('Canvas found, initializing animation...');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Game objects
    const objects = [];
    const colors = ['#FF1493', '#00BFFF', '#32CD32', '#FFD700', '#FF69B4'];
    const shapes = ['circle', 'square', 'triangle'];

    // Create game objects
    for (let i = 0; i < 20; i++) {
        objects.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 30 + 20,
            color: colors[Math.floor(Math.random() * colors.length)],
            shape: shapes[Math.floor(Math.random() * shapes.length)],
            speedX: (Math.random() - 0.5) * 4,
            speedY: (Math.random() - 0.5) * 4,
            rotation: Math.random() * Math.PI * 2,
            rotationSpeed: (Math.random() - 0.5) * 0.02
        });
    }

    // Draw functions
    function drawCircle(x, y, size, color, rotation) {
        ctx.beginPath();
        ctx.arc(x, y, size / 2, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
        ctx.lineWidth = 2;
        ctx.stroke();
    }

    function drawSquare(x, y, size, color, rotation) {
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(rotation);
        ctx.fillStyle = color;
        ctx.fillRect(-size / 2, -size / 2, size, size);
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
        ctx.lineWidth = 2;
        ctx.strokeRect(-size / 2, -size / 2, size, size);
        ctx.restore();
    }

    function drawTriangle(x, y, size, color, rotation) {
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(rotation);
        ctx.beginPath();
        ctx.moveTo(0, -size / 2);
        ctx.lineTo(size / 2, size / 2);
        ctx.lineTo(-size / 2, size / 2);
        ctx.closePath();
        ctx.fillStyle = color;
        ctx.fill();
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.restore();
    }

    // Animation loop
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Update and draw objects
        objects.forEach(obj => {
            // Update position
            obj.x += obj.speedX;
            obj.y += obj.speedY;
            obj.rotation += obj.rotationSpeed;

            // Bounce off edges
            if (obj.x < 0 || obj.x > canvas.width) obj.speedX *= -1;
            if (obj.y < 0 || obj.y > canvas.height) obj.speedY *= -1;

            // Draw object
            switch (obj.shape) {
                case 'circle':
                    drawCircle(obj.x, obj.y, obj.size, obj.color, obj.rotation);
                    break;
                case 'square':
                    drawSquare(obj.x, obj.y, obj.size, obj.color, obj.rotation);
                    break;
                case 'triangle':
                    drawTriangle(obj.x, obj.y, obj.size, obj.color, obj.rotation);
                    break;
            }
        });

        requestAnimationFrame(animate);
    }

    // Handle window resize
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });

    // Start animation
    console.log('Starting animation...');
    animate();
} 