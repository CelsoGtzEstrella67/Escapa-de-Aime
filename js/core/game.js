//estee archivo será el que se encargará de manejar el juego
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
    }

    // funcion que cambia el tamaño de el espacio del juego
    resizeCanvas(){
        this.canvas.width = 500;
        this.canvas.height = 200;
    }

}