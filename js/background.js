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
    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(
        window.innerWidth / -2,
        window.innerWidth / 2,
        window.innerHeight / 2,
        window.innerHeight / -2,
        1,
        1000
    );
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        alpha: true,
        antialias: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    // Create 2D shapes
    const shapes = [];
    const colors = [0xFF1493, 0x00BFFF, 0x32CD32, 0xFFD700, 0xFF69B4];
    const geometries = [
        new THREE.PlaneGeometry(50, 50),
        new THREE.CircleGeometry(25, 32),
        new THREE.BoxGeometry(40, 40, 1)
    ];

    // Create multiple shapes
    for (let i = 0; i < 20; i++) {
        const geometry = geometries[Math.floor(Math.random() * geometries.length)];
        const material = new THREE.MeshBasicMaterial({
            color: colors[Math.floor(Math.random() * colors.length)],
            transparent: true,
            opacity: 0.7
        });
        const shape = new THREE.Mesh(geometry, material);
        
        // Position shapes randomly
        shape.position.x = Math.random() * window.innerWidth - window.innerWidth / 2;
        shape.position.y = Math.random() * window.innerHeight - window.innerHeight / 2;
        
        // Add random rotation
        shape.rotation.z = Math.random() * Math.PI * 2;
        
        // Add random speed
        shape.userData = {
            speedX: (Math.random() - 0.5) * 2,
            speedY: (Math.random() - 0.5) * 2,
            rotationSpeed: (Math.random() - 0.5) * 0.02
        };
        
        shapes.push(shape);
        scene.add(shape);
    }

    // Animation loop
    function animate() {
        requestAnimationFrame(animate);
        
        // Update shapes
        shapes.forEach(shape => {
            // Move shapes
            shape.position.x += shape.userData.speedX;
            shape.position.y += shape.userData.speedY;
            
            // Rotate shapes
            shape.rotation.z += shape.userData.rotationSpeed;
            
            // Bounce off edges
            if (Math.abs(shape.position.x) > window.innerWidth / 2) {
                shape.userData.speedX *= -1;
            }
            if (Math.abs(shape.position.y) > window.innerHeight / 2) {
                shape.userData.speedY *= -1;
            }
        });
        
        renderer.render(scene, camera);
    }

    // Handle window resize
    window.addEventListener('resize', () => {
        camera.left = window.innerWidth / -2;
        camera.right = window.innerWidth / 2;
        camera.top = window.innerHeight / 2;
        camera.bottom = window.innerHeight / -2;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });

    // Start animation
    animate();
} 