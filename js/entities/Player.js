import { GAME_WIDTH, GAME_HEIGHT } from "../core/constans.js";

export class Player {
    constructor(){
        this.x = GAME_WIDTH / 2;
        this.y = GAME_HEIGHT / 2;
        this.width = 64;
        this.height = 64;
        this.speed = 3;
        this.speedMultiplier = 2;

    }

    update(keys){

        let dx = 0, dy = 0;

        if(keys ['w'] || keys ['arrowup']) dy -= 1;
        if(keys ['s'] || keys ['arrowdown']) dy += 1;
        if(keys ['a'] || keys ['arrowleft']) dx -= 1;
        if(keys ['d'] || keys ['arrowright']) dx += 1;


        // movimiento diagonal
        if ( dx || dy) {

            // aplicacion del teorema de pitagoras
            const len = Math.sqrt(dx * dx + dy * dy);
            dx /= len;
            dy /= len;

            this.x += dx * this.speed * this.speedMultiplier;
            this.y += dy * this.speed * this.speedMultiplier;

            //asegurar que el jugaador no salga de la pantalla
            //aqui hace que el jugador no se salga de los lados 
            this.x = Math.max(0, Math.min(GAME_WIDTH - this.width, this.x));
            this.y = Math.max(0, Math.min(GAME_HEIGHT - this.height, this.y));
        }

    }
}