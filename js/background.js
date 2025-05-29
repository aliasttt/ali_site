// Three.js Background Animation
document.addEventListener('DOMContentLoaded', () => {
    try {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({
            canvas: document.querySelector('#bg-canvas'),
            antialias: true,
            alpha: true
        });

        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(window.innerWidth, window.innerHeight);
        camera.position.setZ(30);

        // Create abstract shapes
        const shapes = [];
        const colors = [
            0x6A0DAD, // Purple
            0xFFD700, // Gold
            0x8A2BE2, // Blue Violet
            0xFFA500, // Orange
            0x4B0082  // Indigo
        ];

        // Create multiple shapes
        for (let i = 0; i < 20; i++) {
            const geometry = new THREE.IcosahedronGeometry(Math.random() * 3 + 1, 0);
            const material = new THREE.MeshPhongMaterial({
                color: colors[Math.floor(Math.random() * colors.length)],
                shininess: 100,
                transparent: true,
                opacity: 0.8,
                wireframe: false
            });
            const shape = new THREE.Mesh(geometry, material);
            
            // Random position
            const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(50));
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

        // Add lights
        const pointLight = new THREE.PointLight(0xffffff, 1.5);
        pointLight.position.set(5, 5, 5);
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
        scene.add(pointLight, ambientLight);

        // Animation
        function animate() {
            requestAnimationFrame(animate);
            
            // Rotate shapes
            shapes.forEach(shape => {
                shape.rotation.x += 0.002;
                shape.rotation.y += 0.003;
                shape.rotation.z += 0.002;
                
                // Floating motion
                shape.position.y += Math.sin(Date.now() * 0.001 + shape.position.x) * 0.02;
                shape.position.x += Math.cos(Date.now() * 0.001 + shape.position.y) * 0.02;
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
    } catch (error) {
        console.error('Error initializing Three.js background:', error);
    }
}); 