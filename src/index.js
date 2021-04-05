const createScene = () => {
  const scene = new BABYLON.Scene(engine);

  const camera = new BABYLON.ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 2.5, 10, new BABYLON.Vector3(0, 0, 0));
  camera.attachControl(canvas, true);

  const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0));
  
  const ground = createGround();
  const die = createDie();

  return scene;
};

const createDie = () => {
  const die = BABYLON.MeshBuilder.CreateBox("die", {});

  die.position.y = 0.5;

  return die;
};

const createGround = () => {
  const ground = BABYLON.MeshBuilder.CreateGround("ground", {height: 8.0, width: 8.0, subdivisions: 4});
  
  const groundMat = new BABYLON.StandardMaterial("groundMat");
  groundMat.diffuseColor = new BABYLON.Color3.Green();
  ground.material = groundMat;

  return ground;
};

const canvas = document.getElementById("renderCanvas"); // Get the canvas element
const engine = new BABYLON.Engine(canvas, true); // Generate the BABYLON 3D engine

// Add your code here matching the playground format
const scene = createScene(); // Call the createScene function

// Register a render loop to repeatedly render the scene
engine.runRenderLoop(function () {
  scene.render();
});

// Watch for browser/canvas resize events
window.addEventListener("resize", function () {
  engine.resize();
});