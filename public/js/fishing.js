document.addEventListener("DOMContentLoaded", function () {
    const token = localStorage.getItem("token");
    const rodSelect = document.getElementById("rodSelect");
    const fishButton = document.getElementById("fishButton");
    const fishResult = document.getElementById("fishResult");

    if (!token) {
        console.error("No token found. User is not logged in.");
        return;
    }

    // Fetch the user's rods from the API
    fetch("http://localhost:3000/api/userrods", {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
        .then((response) => response.json())
        .then((userRods) => {
            const payload = JSON.parse(atob(token.split('.')[1])); // Decode JWT payload
            const currentUserId = payload.userId;

            // Filter rods belonging to the current user
            const userRodsFiltered = userRods.filter(rod => rod.user_id === currentUserId);

            if (userRodsFiltered.length === 0) {
                rodSelect.innerHTML = '<option value="">No rods available</option>';
                fishButton.disabled = true;
                return;
            }

            // Populate the rod select dropdown
            rodSelect.innerHTML = '<option value="">Select a rod</option>';
            userRodsFiltered.forEach((rod) => {
                const option = document.createElement("option");
                option.value = rod.rod_id;
                option.textContent = `${rod.rod_name} (Durability: ${rod.durability})`;
                rodSelect.appendChild(option);
            });

            fishButton.disabled = false;
        })
        .catch((error) => {
            console.error("Error fetching user rods:", error);
        });

    // Handle fishing
    fishButton.addEventListener("click", function () {
        const rodId = rodSelect.value;

        if (!rodId) {
            fishResult.textContent = "Please select a rod to fish!";
            return;
        }

        const payload = JSON.parse(atob(token.split('.')[1])); // Decode JWT payload
        const currentUserId = payload.userId;

        // Make the fishing request
        fetch(`http://localhost:3000/api/fishing/${currentUserId}/${rodId}`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.success) {
                    fishResult.textContent = `Fish caught: ${data.fish.name}`;
                } else {
                    fishResult.textContent = `Fishing: ${data.message}`;
                }
            })
            .catch((error) => {
                console.error("Error fishing:", error);
                fishResult.textContent = "An error occurred while fishing.";
            });
    });

    // 3D Rod Model Section
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / 400, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    const container = document.getElementById("fish-3d-container");
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0xffffff, 5.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 5, 10);
    scene.add(directionalLight);

    const loader = new THREE.GLTFLoader();
    let currentModel = null;

    // Load default model
    function loadRodModel(rodType) {
        if (currentModel) {
            scene.remove(currentModel);  // Remove the previous model
        }

        let modelPath = `3d-models/${rodType.toLowerCase().replace(' ', '-')}-rod.glb`;
        loader.load(modelPath, function (gltf) {
            currentModel = gltf.scene;
            currentModel.scale.set(1.5, 1.5, 1.5);
            currentModel.position.set(0, -2.5, 0);
            scene.add(currentModel);

        // Mouse interaction
        let isMouseDown = false;
        let previousMouseX = 0;
        let previousMouseY = 0;

        container.addEventListener("mousedown", (event) => {
            isMouseDown = true;
            previousMouseX = event.clientX;
            previousMouseY = event.clientY;
        });

        container.addEventListener("mousemove", (event) => {
            if (isMouseDown && rodModel) {
                let deltaX = event.clientX - previousMouseX;
                let deltaY = event.clientY - previousMouseY;

                rodModel.rotation.y += deltaX * 0.01; // Horizontal rotation
                rodModel.rotation.x += deltaY * 0.01; // Vertical rotation

                previousMouseX = event.clientX;
                previousMouseY = event.clientY;
            }
        });

        container.addEventListener("mouseup", () => {
            isMouseDown = false;
        });

        // Zooming with the mouse wheel
        container.addEventListener("wheel", (event) => {
            event.preventDefault();
            camera.position.z += event.deltaY * 0.005; // Adjust zoom sensitivity
            camera.position.z = Math.max(3, Math.min(15, camera.position.z)); // Limit zoom range
        });

        // Start the animation loop
        animate();
        }, undefined, function (error) {
            console.error("Error loading the rod model:", error);   
        });
    }

    // Load initial model
    loadRodModel("select");

    // Listen for rod selection change
    rodSelect.addEventListener("change", function () {
        const selectedRod = rodSelect.options[rodSelect.selectedIndex].text.split(" ")[0]; // Get the rod name (e.g. "Basic")
        loadRodModel(selectedRod);
    });

    // Animation loop
    function animate() {
        requestAnimationFrame(animate);
        if (currentModel) {
            currentModel.rotation.y += 0.003;  // Slight automatic rotation
        }
        renderer.render(scene, camera);
    }

    animate();

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
});
