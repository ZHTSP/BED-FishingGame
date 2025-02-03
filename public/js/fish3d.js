// Set up the scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / 400, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
const container = document.getElementById("fish-3d-container");
renderer.setSize(container.clientWidth, container.clientHeight);
document.getElementById("fish-3d-container").appendChild(renderer.domElement);

// Ambient light provides a base level of illumination
const ambientLight = new THREE.AmbientLight(0xffffff, 2.3);
scene.add(ambientLight);

// Directional light simulates sunlight
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
directionalLight.position.set(10, 10, 10);
scene.add(directionalLight);

// Load the fish model
const loader = new THREE.GLTFLoader();
loader.load("fish-models/fish.glb", function (gltf) {
    const fish = gltf.scene;
    fish.scale.set(0.5, 0.5, 0.5);
    fish.position.set(0, 0, 0.5);
    scene.add(fish);

    // Mouse interaction
    let isMouseDown = false;
    let previousMouseX = 0;
    let previousMouseY = 0;

    document.getElementById("fish-3d-container").addEventListener("mousedown", (event) => {
        isMouseDown = true;
        previousMouseX = event.clientX;
        previousMouseY = event.clientY;
    });

    document.addEventListener("mouseup", () => {
        isMouseDown = false;
    });

    document.addEventListener("mousemove", (event) => {
        if (isMouseDown) {
            // Calculate horizontal and vertical movement
            let deltaX = event.clientX - previousMouseX;
            let deltaY = event.clientY - previousMouseY;

            // Rotate the fish model
            fish.rotation.y += deltaX * 0.01; // Horizontal rotation
            fish.rotation.x += deltaY * 0.01; // Vertical rotation

            // Update previous mouse positions
            previousMouseX = event.clientX;
            previousMouseY = event.clientY;
        }
    });
    container.addEventListener("wheel", (event) => {
        event.preventDefault();
        camera.position.z += event.deltaY * 0.005; // Adjust zoom sensitivity
        camera.position.z = Math.max(3, Math.min(10, camera.position.z)); // Limit zoom range
    });

    // Animation loop
    function animate() {
        requestAnimationFrame(animate);
        fish.rotation.y += 0.003; // Slight automatic rotation
        renderer.render(scene, camera);
    }
    animate();
}, undefined, function (error) {
    console.error("Error loading the fish model:", error);
});

// Set camera position
camera.position.z = 5;

// Handle window resize
window.addEventListener("resize", () => {
    const width = container.clientWidth;
    const height = 400; // Fixed height
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
});