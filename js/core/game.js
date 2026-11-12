//estee archivo será el que se encargará de manejar el juego
import { GAME_HEIGHT, GAME_WIDTH, ASPECT_RATIO, CANVAS_MARGIN } from "./constans.js";
import { RenderSystem as RenderSystem } from "../systems/RenderSystem.js";
import { Player } from "../entities/Player.js";
import { ImageManager } from "../managers/ImageManager.js";
import { EnemyManager } from "../managers/EnemyManager.js";
import { setDrifterSpeed } from "../data/aimeData.js";

// Permite exportar esta clase
export class Game {
    // es el constructor que permite inicializar cuando la clase es instanciada
    constructor(){
        this.canvas = document.getElementById("gameCanva");
        this.ctx = this.canvas.getContext("2d");

        this.imageManager = new ImageManager();
        this.imageManager.loadAll();
        this.enemyManager = new EnemyManager();

        //esto es... depency injection? y se hace porque RenderSystem necesita acceso a canvas
        this.renderSystem = new RenderSystem(this.canvas, this.imageManager);
        this.player = new Player;
        this.keys = {};
        this.lastTime = 0;
        this.state = "menu";

        this.init();
    }

    init(){
        
        this.resizeCanvas();
        window.addEventListener('resize', () => this.resizeCanvas());
        this.setupInput();
        this.setupUI();

        this.lastTime = performance.now();
        requestAnimationFrame((t) => this.gameLoop(t));
    }

    update(dt){
        if (this.state !== "playing") return;
        this.player.update(dt, this.keys);
        this.enemyManager.update(dt, this.player);

        this.checklose();

    }

    checklose(){

        const enemies = this.enemyManager.getActiveEnemies();

        // Revisamos cada enemigo para ver si toca al jugador
        for (const enemy of enemies) {
            if (Math.abs(this.player.x - enemy.x) < 50 && Math.abs(this.player.y - enemy.y) < 50) {
                this.returnToMenu();
                return;
                //console.log("murio");
            }
        }

    }

    render(){
        if (this.state === "menu"){
            this.ctx.fillStyle = "#000000";
            this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        } else {
            this.renderSystem.render(this.player);
        }
    }

    //Controles con las teclas
    setupInput(){
        window.addEventListener('keydown', (e) => {
            this.keys[e.key.toLowerCase()] = true;
        });
        // cuando una tecla deja de ser presionada, su valor vuelve a ser falso
        window.addEventListener('keyup', (e) => {
            this.keys[e.key.toLowerCase()] = false;
        });
        // limpia keys cuando se abre el menu de contetos
        window.addEventListener('contextmenu', () => {
            this.keys = {};
        });
        // limpia keys cuando la ventana pierde el foco
        window.addEventListener('blur', () => {
            this.keys = {};
        });

    }

    //inicializa la interfaz grafica
    setupUI(){
        document.getElementById("playBtn").onclick = () => {
            
            this.startGame();
        }
        document.getElementById("reset").onclick = () => this.returnToMenu();

        document.getElementById("hardMode").onclick = () => {
        
            
            const nuevaVelocidad = 550;

            
            setDrifterSpeed(nuevaVelocidad);

            const enemies = this.enemyManager.getActiveEnemies();
            for (const enemy of enemies) {
                enemy.speed = nuevaVelocidad;
            }


        this.startGame();
        };

    }
    hideAllPanels(){
        document.querySelectorAll(".ui-panel").forEach(p => p.classList.remove("active"));
    }
    startGame(){
        this.state = "playing";
        this.hideAllPanels();

        this.player.reset();
        this.enemyManager.spawn(100, 100);

        this.lastTime = performance.now();

    }

    returnToMenu(){

        setDrifterSpeed(300);

        const enemies = this.enemyManager.getActiveEnemies();
        for (const enemy of enemies) {
            enemy.speed = 300;
        }

        this.state = "menu";
        this.hideAllPanels();
        document.getElementById('mainMenu').classList.add('active');
    }

    // funcion que cambia el tamaño de el espacio del juego
    resizeCanvas(){
        let w, h;

        const avaliableWidth = window.innerWidth - CANVAS_MARGIN * 2;
        const avaiableHeight = window.innerHeight - CANVAS_MARGIN * 2;

        // dinamismo de pantalla, para que abarque todo en caso de que la pantalla sea distinto al ratio
        if (avaliableWidth/avaiableHeight > ASPECT_RATIO) {
            h = avaiableHeight; 
            w = h * ASPECT_RATIO;
        } else {
            w = avaliableWidth;
            h = w / ASPECT_RATIO;
        }

        this.canvas.width = GAME_WIDTH;
        this.canvas.height = GAME_HEIGHT;

        this.canvas.style.width = w + 'px';
        this.canvas.style.height = h + 'px';
        this.canvas.style.margin = `${CANVAS_MARGIN}px`;

    }

    //timestamp es el mumero de milisegundos que han pasado desde que la pagina inicio
    gameLoop(timestamp) {
        if (this.lastTime === 0){
            this.lastTime = timestamp;
        }
        // el tiempo que pasa entre dos frames
        // se agrega la division entre 1000 para trabajar con segundos y no con milisegundos
        const dt = Math.min((timestamp - this.lastTime)/1000, 0.1);
        //console.log(dt);
        this.lastTime = timestamp;

        this.update(dt);
        //console.log(timestamp/1000);
        this.renderSystem.render(this.player, this.enemyManager.getActiveEnemies());
        // este metodo hace que se ajuste los frames a cada taza de refresco de cada monitor
        requestAnimationFrame((t) => this.gameLoop(t));
    }

   

}