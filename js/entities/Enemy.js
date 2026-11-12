
export class Enemy {
    constructor(data){
        this.data = data;

        this.x = 900;
        this.y = 900;
        
        this.width = data.width;
        this.height = data.height;

        this.speed = data.speed;
        this.collitionRadius = data.collitionRadius;

    }

    spawn(x, y){
        this.x = x;
        this.y = y;
    }

    update(dt, player) {
        // Calcula la direccion del jugador

        const dx = player.x - this.x;
        const dy = player.y - this.y;
        const len = Math.sqrt(dx * dx + dy * dy);

        if (len > 0){
            const normalizeDx = dx/len;
            const normalizeDy = dy/len;

            this.x += normalizeDx * this.speed * dt;
            this.y += normalizeDy * this.speed * dt;
        }
    }
}