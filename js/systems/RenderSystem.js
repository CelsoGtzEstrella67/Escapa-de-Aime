
import { GAME_HEIGHT, GAME_WIDTH, GRID_SIZE } from "../core/constans.js";
import { Enemy } from "../entities/Enemy.js";
import { Player } from "../entities/Player.js";

export class RenderSystem {
    constructor(canvas, imageManager){
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.imageManager = imageManager;

    }

    render(player, enemies = []) {
        //Background
        
        const calle = this.imageManager.get('calle');

        if (calle) {
            this.ctx.drawImage(calle, 0, 0, GAME_WIDTH, GAME_HEIGHT);
        } else {
            // Fallback: fondo azul si la imagen aún no carga
            this.ctx.fillStyle = "#223483";
            this.ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
        }

        this.renderGrid();
        this.renderEnemies(enemies);
        this.renderPlayer(player);

    }

    renderEnemies(enemies){
        const aimeImage = this.imageManager.get('enemies');

        for (let i = 0; i < enemies.length; i++){
            if (aimeImage) {
                this.ctx.drawImage(aimeImage, enemies[i].x, enemies[i].y, enemies[i].width, enemies[i].height);
            } else {
                // Fallback: dibuja el cuadro rojo si la imagen aún no carga o no existe
                this.ctx.fillStyle = "#ff0000";
                this.ctx.fillRect(enemies[i].x, enemies[i].y, enemies[i].width, enemies[i].height);
            }
        }
    }

    renderPlayer(player) {
        const playerImage = this.imageManager.get('player');

        if (playerImage){
            this.ctx.drawImage(playerImage, player.x, player.y, player.height, player.width);

        } else {
            //fallback: carga el rectangulo en caso de que la imagen no carge
            this.ctx.fillStyle = "blue";
            this.ctx.fillRect(player.x, player.y, player.width, player.height);
            
            this.ctx.strokeStyle = "white"
            this.ctx.strokeRect(player.x, player.y, player.width, player.height);

        }

        
    }

    
    renderGrid() {
        this.ctx.strokeStyle = "rgba(255, 255, 255, 0)";
        this.ctx.lineWidth = 1;
        this.ctx.beginPath();

        for (let i = 0; i < GAME_WIDTH; i += GRID_SIZE){
            
            this.ctx.moveTo(i, 0);
            this.ctx.lineTo(i, GAME_HEIGHT);
        }

        for (let i = 0; i < GAME_HEIGHT; i += GRID_SIZE){
            
            this.ctx.moveTo(0, i);
            this.ctx.lineTo(GAME_WIDTH, i);
        }
        this.ctx.stroke();
        

    }

}