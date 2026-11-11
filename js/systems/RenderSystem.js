
import { GAME_HEIGHT, GAME_WIDTH } from "../core/constans.js";

export class RenderSystem {
    constructor(canvas){
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');


    }

    render() {
        //Backgroubd
        this.ctx.fillStyle = "#223483";
        this.ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

    }

}