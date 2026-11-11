//estee archivo será el que se encargará de manejar el juego
import { GAME_HEIGHT, GAME_WIDTH } from "./constans.js";

// Permite exportar esta clase
export class Game {
    // es el constructor que permite inicializar cuando la clase es instanciada
    constructor(){
        this.canvas = document.getElementById("gameCanva");
        this.ctx = this.canvas.getContext("2d");

        this.init();
    }

    init(){
        this.resizeCanvas();
        window.addEventListener('resize', () => this.resizeCanvas());
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

}