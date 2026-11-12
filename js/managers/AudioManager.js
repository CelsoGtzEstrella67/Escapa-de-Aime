export class AudioManager {

    constructor(){
        this.sounds = {};
    }

    load(){
        return new Promise((resolve) => {
            const audio = new Audio(path);
        this.sounds[name] = { audio, loaded:false };

        audio.onloadeddata = () => {
            this.sounds[name].loaded = true;
            console.log(`Audio loaded: ${name}`);
            resolve();
        }
        audio.onerror = () => {
            console.log(`Àudio failed: ${name} (se deberá omitir)`);
            resolve();
        }
            
        })

    }

    play(name){
        const sound = this.sounds[name];

        if (sound && sound.loaded){
            sound.audio.currentTime = 0;
            sound.audio.play().catch(err => {
                console.log(`No se puede reproducir ${name}: `, err)
            })
        }
        

    }

    async loadAll(){
        await Promise.all([
            this.load('play', '../resources/audio/play.mp3'),

        ]);
    }
}