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
  const dieMat = new BABYLON.StandardMaterial("dieMat");
  dieMat.diffuseTexture = new BABYLON.Texture("https://i.imgur.com/BksHZBN.jpg"); // TODO: make import assets/dieFace.jpg

  const faceUV = [];
  faceUV[0] = new BABYLON.Vector4(4/6, 0.0, 5/6, 1.0); // back: 5
  faceUV[1] = new BABYLON.Vector4(1/6, 0.0, 2/6, 1.0); // front: 2
  faceUV[2] = new BABYLON.Vector4(2/6, 0.0, 3/6, 1.0); // right: 3
  faceUV[3] = new BABYLON.Vector4(3/6, 0.0, 4/6, 1.0); // left: 4
  faceUV[4] = new BABYLON.Vector4(0.0, 0.0, 1/6, 1.0); // top: 1
  faceUV[5] = new BABYLON.Vector4(5/6, 0.0, 6/6, 1.0); // bottom: 6

  const die = BABYLON.MeshBuilder.CreateBox("die", {faceUV: faceUV, wrap: true});
  die.material = dieMat;

  die.position.y = 0.5;
  die.rotation.z = Math.PI / 4;
  die.position.y += 0.2;

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