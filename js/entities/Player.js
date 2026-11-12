import { GAME_WIDTH, GAME_HEIGHT } from "../core/constans.js";
import { playerData } from "../data/playerData.js";

export class Player {
    constructor(){
        this.width = playerData.width;
        this.height = playerData.height;

        // centrar al jugador sin importar su tamaño
        this.x = (GAME_WIDTH - this.width) / 2;
        this.y = (GAME_HEIGHT - this.height) / 2;
        
        this.speed = playerData.speed;
        this.speedMultiplier = 2;

    }

    reset(){
        this.x = (GAME_WIDTH - this.width) / 2;
        this.y = (GAME_HEIGHT - this.height) / 2;

        this.speed = playerData.speed;
        this.speedMultiplier = 2;

    }

    update(dt, keys){

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

            /* con deltatime aseguramos que el jugador vaya a la misma velocidad
            sin importar la tasa de refrescos del computador, al multiplicarlo
            es como decirle "avanza tantos pixeles por segundo"
            */
            this.x += dx * this.speed * this.speedMultiplier * dt;
            this.y += dy * this.speed * this.speedMultiplier * dt;

            //asegurar que el jugaador no salga de la pantalla
            //aqui hace que el jugador no se salga de los lados 
            this.x = Math.max(0, Math.min(GAME_WIDTH - this.width, this.x));
            this.y = Math.max(0, Math.min(GAME_HEIGHT - this.height, this.y));
        }

    }
}