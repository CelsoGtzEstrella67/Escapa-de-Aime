export const aimeData = {
    drifter: {
        width: 64,
        height: 64,
        speed: 300,
        collitionRadius: 28, 
    }

}

export function setDrifterSpeed(nuevaVelocidad) {
    aimeData.drifter.speed = nuevaVelocidad;
}