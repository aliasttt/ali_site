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
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 30;

    const renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        alpha: true,
        antialias: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    // Create game objects
    const objects = [];
    const colors = [0xFF1493, 0x00BFFF, 0x32CD32, 0xFFD700, 0xFF69B4];
    const geometries = [
        new THREE.IcosahedronGeometry(5, 0),
        new THREE.OctahedronGeometry(5, 0),
        new THREE.TetrahedronGeometry(5, 0)
    ];

    // Create multiple objects
    for (let i = 0; i < 15; i++) {
        const geometry = geometries[Math.floor(Math.random() * geometries.length)];
        const material = new THREE.MeshPhongMaterial({
            color: colors[Math.floor(Math.random() * colors.length)],
            transparent: true,
            opacity: 0.8,
            shininess: 100
        });
        const object = new THREE.Mesh(geometry, material);
        
        // Position objects in three layers
        const layer = Math.floor(i / 5);
        object.position.x = (Math.random() - 0.5) * 50;
        object.position.y = (Math.random() - 0.5) * 50;
        object.position.z = -layer * 20;
        
        // Add random rotation
        object.rotation.x = Math.random() * Math.PI;
        object.rotation.y = Math.random() * Math.PI;
        
        // Add random speed
        object.userData = {
            rotationSpeed: {
                x: (Math.random() - 0.5) * 0.02,
                y: (Math.random() - 0.5) * 0.02,
                z: (Math.random() - 0.5) * 0.02
            },
            floatSpeed: Math.random() * 0.02 + 0.01,
            floatOffset: Math.random() * Math.PI * 2
        };
        
        objects.push(object);
        scene.add(object);
    }

    // Add lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0xffffff, 1, 100);
    pointLight1.position.set(10, 10, 10);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0xffffff, 1, 100);
    pointLight2.position.set(-10, -10, 10);
    scene.add(pointLight2);

    // Animation loop
    function animate() {
        requestAnimationFrame(animate);
        
        // Update objects
        objects.forEach((object, index) => {
            // Rotate objects
            object.rotation.x += object.userData.rotationSpeed.x;
            object.rotation.y += object.userData.rotationSpeed.y;
            object.rotation.z += object.userData.rotationSpeed.z;
            
            // Floating motion
            object.position.y += Math.sin(Date.now() * object.userData.floatSpeed + object.userData.floatOffset) * 0.05;
        });
        
        renderer.render(scene, camera);
    }

    // Handle window resize
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });

    // Start animation
    animate();
} 