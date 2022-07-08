export class Playlist{
    id: string;
    name: string;
    trackAmount: number;
    constructor(id?: string, name?: string, trackAmount?: number){
        if(id == undefined){
            id = "";
        }
        if(name == undefined){
            name = "";
        }
        if(trackAmount == undefined){
            trackAmount = 0;
        }
        this.id = id;
        this.name = name;
        this.trackAmount = trackAmount;
    }
}