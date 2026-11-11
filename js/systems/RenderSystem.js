
import { GAME_HEIGHT, GAME_WIDTH, GRID_SIZE } from "../core/constans.js";

export class RenderSystem {
    constructor(canvas){
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');


    }

    render() {
        //Backgroubd
        this.ctx.fillStyle = "#223483";
        this.ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
        this.renderGrid();

    }

    renderGrid() {
        this.ctx.strokeStyle = "rgba(255, 255, 255, 0.2)";
        this.ctx.lineWidth = 1;

        for (let i = 0; i < GAME_WIDTH; i += GRID_SIZE){
            this.ctx.beginPath();
            this.ctx.moveTo(i, 0);
            this.ctx.lineTo(i, GAME_HEIGHT);
            this.ctx.stroke();
        }

        for (let i = 0; i < GAME_HEIGHT; i += GRID_SIZE){
            this.ctx.beginPath();
            this.ctx.moveTo(0, i);
            this.ctx.lineTo(GAME_WIDTH, i);
            this.ctx.stroke();
        }
        

    }

}