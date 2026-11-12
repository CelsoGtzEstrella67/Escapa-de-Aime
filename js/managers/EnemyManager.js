import { aimeData } from "../data/aimeData.js";
import { Enemy } from "../entities/Enemy.js";

export class EnemyManager{
    constructor(){
        this.enemy = new Enemy(aimeData.drifter);
    }

    spawn(x, y){
        this.enemy.spawn(x, y);
    }

    getActiveEnemies(){
        return [this.enemy];
    };

    update(dt, player){
        this.enemy.update(dt, player);

    }

}