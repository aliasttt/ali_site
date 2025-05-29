// Three.js Background Animation
console.log('Background script started');

// Wait for DOM to be fully loaded
window.addEventListener('load', () => {
    console.log('Window loaded');
    
    // Check if Three.js is available
    if (typeof THREE === 'undefined') {
        console.error('Three.js is not loaded');
        return;
    }
    
    try {
        // Get canvas element
        const canvas = document.querySelector('#bg-canvas');
        if (!canvas) {
            console.error('Canvas element not found');
            return;
        }

        // Setup scene
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({
            canvas: canvas,
            antialias: true,
            alpha: true
        });

        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(window.innerWidth, window.innerHeight);
        camera.position.setZ(50);

        // Create abstract shapes
        const shapes = [];
        const colors = [
            0xFF1493, // Deep Pink
            0x00FFFF, // Cyan
            0xFFD700, // Gold
            0xFF4500, // Orange Red
            0x9400D3, // Dark Violet
            0x00FF7F, // Spring Green
            0xFF69B4, // Hot Pink
            0x1E90FF, // Dodger Blue
            0xFFA500, // Orange
            0x7B68EE  // Medium Slate Blue
        ];

        // Create multiple shapes with different geometries
        const geometries = [
            () => new THREE.IcosahedronGeometry(Math.random() * 8 + 5, 0),
            () => new THREE.OctahedronGeometry(Math.random() * 8 + 5, 0),
            () => new THREE.TetrahedronGeometry(Math.random() * 8 + 5, 0)
        ];

        // Create shapes in three layers (top, middle, bottom)
        for (let layer = 0; layer < 3; layer++) {
            for (let i = 0; i < 10; i++) {
                const geometry = geometries[Math.floor(Math.random() * geometries.length)]();
                const material = new THREE.MeshPhongMaterial({
                    color: colors[Math.floor(Math.random() * colors.length)],
                    shininess: 100,
                    transparent: true,
                    opacity: 0.8,
                    wireframe: false,
                    metalness: 0.8,
                    roughness: 0.2
                });
                const shape = new THREE.Mesh(geometry, material);
                
                // Distribute shapes across the viewport
                const x = THREE.MathUtils.randFloatSpread(150);
                const y = THREE.MathUtils.randFloatSpread(150) + (layer - 1) * 50;
                const z = THREE.MathUtils.randFloatSpread(30);
                shape.position.set(x, y, z);
                
                // Random rotation
                shape.rotation.set(
                    Math.random() * Math.PI,
                    Math.random() * Math.PI,
                    Math.random() * Math.PI
                );
                
                shapes.push(shape);
                scene.add(shape);
            }
        }

        // Add multiple lights for better illumination
        const lights = [
            new THREE.PointLight(0xffffff, 1.5, 100),
            new THREE.PointLight(0xffffff, 1.5, 100),
            new THREE.PointLight(0xffffff, 1.5, 100)
        ];

        lights[0].position.set(50, 50, 50);
        lights[1].position.set(-50, -50, 50);
        lights[2].position.set(0, 0, 50);

        const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
        scene.add(...lights, ambientLight);

        // Animation
        function animate() {
            requestAnimationFrame(animate);
            
            // Rotate shapes
            shapes.forEach((shape, index) => {
                // Different rotation speeds for each shape
                shape.rotation.x += 0.002 * (index % 3 + 1);
                shape.rotation.y += 0.003 * (index % 2 + 1);
                shape.rotation.z += 0.002 * (index % 3 + 1);
                
                // Floating motion with different patterns
                const time = Date.now() * 0.001;
                shape.position.y += Math.sin(time + shape.position.x) * 0.02;
                shape.position.x += Math.cos(time + shape.position.y) * 0.02;
                shape.position.z += Math.sin(time + shape.position.z) * 0.01;
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
        console.log('Starting animation');
        animate();
    } catch (error) {
        console.error('Error in Three.js setup:', error);
    }
}); 