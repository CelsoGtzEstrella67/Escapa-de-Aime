export class ImageManager {
    constructor() {
        this.images = {};
    }

    //carga una sola imagen y la guarda
    load(name, path){
        const img = new Image();
        img.src = path;

        this.images[name] = { img, loaded: false};

        img.onload = () => {
            this.images[name].loaded = true;
            console.log(`image loades: ${name}`);
        }

        img.onerror = () => {
            console.log(`Image failes: ${name} (will use fallback)`)
        }

    }

    //para dibujar la imagen en el canvas
    get(name){
        return this.images[name]?.loaded ? this.images[name].img : null;

    }
    //carga todas las imagenes que el juego necesita asi de una
    loadAll(){
        this.load('player', '../resources/images/chiwis.jpg');

    }

}