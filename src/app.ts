import "@babylonjs/core/Debug/debugLayer";
import "@babylonjs/inspector";
import "@babylonjs/loaders/glTF";
import "@babylonjs/loaders/OBJ/objFileLoader";
import { Engine, Scene, ArcRotateCamera, Vector3, HemisphericLight, Mesh, MeshBuilder, Scalar, Color4, CannonJSPlugin, FlyCameraMouseInput, FreeCamera, FreeCameraKeyboardMoveInput, UniversalCamera, SceneLoader } from "@babylonjs/core";

class App {
    constructor() {
        // create the canvas html element and attach it to the webpage
        var canvas = document.createElement("canvas");
        canvas.style.width = "50%";
        canvas.style.height = "50%";
        canvas.id = "gameCanvas";
        document.body.appendChild(canvas);

        // initialize babylon scene and engine
        var engine = new Engine(canvas, true);
        var scene = new Scene(engine);

        var physicsPlugin = new CannonJSPlugin();
        scene.enablePhysics(new Vector3(0.0, -9.8, 0.0), physicsPlugin);

        var camera: UniversalCamera = new UniversalCamera("cam1", new Vector3(5, 10, 5), scene);
        camera.setTarget(Vector3.Zero());
        camera.attachControl(canvas, true);

        var light1: HemisphericLight = new HemisphericLight("light1", new Vector3(1, 1, 0), scene);
        var sphere: Mesh = MeshBuilder.CreateSphere("sphere", { diameter: 1 }, scene);
        MeshBuilder.CreateBox("box", {size: 2}).translate(Vector3.Up(), 3);


        SceneLoader.ImportMesh("hub", "./hub.obj");

        // hide/show the Inspector
        window.addEventListener("keydown", (ev) => {
            // Shift+Ctrl+Alt+I
            if (ev.shiftKey && ev.ctrlKey && ev.altKey && ev.keyCode === 73) {
                if (scene.debugLayer.isVisible()) {
                    scene.debugLayer.hide();
                } else {
                    scene.debugLayer.show();
                }
            }
        });

        // run the main render loop
        engine.runRenderLoop(() => {
            scene.render();
        });
        
    }
}
new App();