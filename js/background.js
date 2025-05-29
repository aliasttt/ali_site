// Three.js Background Animation
console.log('Background script started');

// Wait for DOM to be fully loaded
window.addEventListener('load', () => {
    console.log('Window loaded');
    
    try {
        // Basic setup
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        
        // Get canvas and create renderer
        const canvas = document.querySelector('#bg-canvas');
        console.log('Canvas found:', canvas);
        
        const renderer = new THREE.WebGLRenderer({
            canvas: canvas,
            antialias: true,
            alpha: true
        });
        
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setClearColor(0x000000, 0); // Transparent background
        camera.position.z = 30;

        // Create a simple cube
        const geometry = new THREE.BoxGeometry(10, 10, 10);
        const material = new THREE.MeshPhongMaterial({
            color: 0xff0000,
            shininess: 100,
            transparent: true,
            opacity: 0.8
        });
        const cube = new THREE.Mesh(geometry, material);
        scene.add(cube);

        // Add lights
        const light = new THREE.PointLight(0xffffff, 1, 100);
        light.position.set(10, 10, 10);
        scene.add(light);

        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        scene.add(ambientLight);

        // Animation function
        function animate() {
            requestAnimationFrame(animate);
            
            // Rotate cube
            cube.rotation.x += 0.01;
            cube.rotation.y += 0.01;
            
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