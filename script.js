// Получаем ссылку на форму
const shapeForm = document.getElementById("shapeForm");

// Создаем сцену и движок
const canvas = document.getElementById("renderCanvas");
const engine = new BABYLON.Engine(canvas, true);
const scene = new BABYLON.Scene(engine);

// Создаем камеру
const camera = new BABYLON.ArcRotateCamera("camera", Math.PI / 2, Math.PI / 2, 10, BABYLON.Vector3.Zero(), scene);
camera.attachControl(canvas, true);

// Создаем свет
const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);

// Функция создания фигуры
function createShape(event) {
  event.preventDefault();

  // Получаем значения из формы
  const shapeType = document.getElementById("shapeType").value;
  const shapeSize = parseFloat(document.getElementById("shapeSize").value);
  const shapePositionX = parseFloat(document.getElementById("shapePositionX").value);
  const shapePositionY = parseFloat(document.getElementById("shapePositionY").value);
  const shapePositionZ = parseFloat(document.getElementById("shapePositionZ").value);

  let shape;

  // Создаем фигуру в зависимости от типа
  if (shapeType === "box") {
    // Создаем куб
    shape = BABYLON.Mesh.CreateBox("box", shapeSize, scene);
  } else if (shapeType === "sphere") {
    shape = BABYLON.MeshBuilder.CreateSphere("sphere", {diameter: shapeSize}, scene);
  }

  // Позиционируем фигуру
  shape.position = new BABYLON.Vector3(shapePositionX, shapePositionY, shapePositionZ);
}

// Добавляем обработчик события отправки формы
shapeForm.addEventListener("submit", createShape);

// Запускаем цикл рендеринга
engine.runRenderLoop(() => {
  scene.render();
});
