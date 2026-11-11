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

        this.init();
    }

    init(){
        this.resizeCanvas();
        window.addEventListener('resize', () => this.resizeCanvas());
        this.setupInput();

        requestAnimationFrame((t) => this.gameLoop(t));
    }

    update(){
        this.player.update(this.keys);
    }

    //Controles con las teclas
    setupInput(){
        window.addEventListener('keydown', (e) => {
            this.keys[e.key.toLowerCase()] = true;
            console.log(this.keys);
        });
        // cuando una tecla deja de ser presionada, su valor vuelve a ser falso
        window.addEventListener('keyup', (e) => {
            this.keys[e.key.toLowerCase()] = false;
            console.log(this.keys);
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
        this.update();
        //console.log(timestamp/1000);
        this.renderSystem.render(this.player);
        // este metodo hace que se ajuste los frames a cada taza de refresco de cada monitor
        requestAnimationFrame((t) => this.gameLoop(t));
    }

   

}