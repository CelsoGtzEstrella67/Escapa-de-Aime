//estee archivo será el que se encargará de manejar el juego
import { GAME_HEIGHT, GAME_WIDTH } from "./constans.js";
import { RenderSystem as RenderSystem } from "../systems/RenderSystem.js";

// Permite exportar esta clase
export class Game {
    // es el constructor que permite inicializar cuando la clase es instanciada
    constructor(){
        this.canvas = document.getElementById("gameCanva");
        this.ctx = this.canvas.getContext("2d");
        //esto es... depency injection? y se hace porque RenderSystem necesita acceso a canvas
        this.RenderSystem = new RenderSystem(this.canvas)

        this.init();
    }

    init(){
        this.resizeCanvas();
        window.addEventListener('resize', () => this.resizeCanvas());

        requestAnimationFrame((t) => this.gameLoop(t));
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
        //console.log(timestamp/1000);
        this.RenderSystem.render();
        // este metodo hace que se ajuste los frames a cada taza de refresco de cada monitor
        requestAnimationFrame((t) => this.gameLoop(t));
    }

   

}