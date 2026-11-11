//estee archivo será el que se encargará de manejar el juego
import { GAME_HEIGHT, GAME_WIDTH } from "./constans.js";
import { RenderSystem as RenderSystem } from "../systems/RenderSystem.js";
import { Player } from "../entities/Player.js";

// Permite exportar esta clase
export class Game {
    // es el constructor que permite inicializar cuando la clase es instanciada
    constructor(){
        this.canvas = document.getElementById("gameCanva");
        this.ctx = this.canvas.getContext("2d");
        //esto es... depency injection? y se hace porque RenderSystem necesita acceso a canvas
        this.renderSystem = new RenderSystem(this.canvas);
        this.player = new Player;
        this.keys = {};
        this.lastTime;

        this.init();
    }

    init(){
        this.resizeCanvas();
        window.addEventListener('resize', () => this.resizeCanvas());
        this.setupInput();

        this.lastTime = performance.now();
        requestAnimationFrame((t) => this.gameLoop(t));
    }

    update(dt){
        this.player.update(dt, this.keys);
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
        window.addEventListener('bur', () => {
            this.keys = {};
        });

    }

    // funcion que cambia el tamaño de el espacio del juego
    resizeCanvas(){
        const ratio = 16/9;
        let w, h;
        const margin = 15;

        const avaliableWidth = window.innerWidth - margin * 2;
        const avaiableHeight = window.innerHeight - margin * 2;

        // dinamismo de pantalla, para que abarque todo en caso de que la pantalla sea distinto al ratio
        if (avaliableWidth/avaiableHeight > ratio) {
            h = avaiableHeight; 
            w = h * ratio;
        } else {
            w = avaliableWidth;
            h = w / ratio;
        }

        this.canvas.width = GAME_WIDTH;
        this.canvas.height = GAME_HEIGHT;

        this.canvas.style.width = w + 'px';
        this.canvas.style.height = h + 'px';
        this.canvas.style.margin = `${margin}px`;

    }

    //timestamp es el mumero de milisegundos que han pasado desde que la pagina inicio
    gameLoop(timestamp) {
        // el tiempo que pasa entre dos frames
        // se agrega la division entre 1000 para trabajar con segundos y no con milisegundos
        const dt = Math.min((timestamp - this.lastTime)/1000, 0.1);
        //console.log(dt);
        this.lastTime = timestamp;

        this.update(dt);
        //console.log(timestamp/1000);
        this.renderSystem.render(this.player);
        // este metodo hace que se ajuste los frames a cada taza de refresco de cada monitor
        requestAnimationFrame((t) => this.gameLoop(t));
    }

   

}