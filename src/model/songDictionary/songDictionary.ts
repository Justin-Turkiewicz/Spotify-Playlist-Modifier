export class SongDictionary{
    dictionary: { [id: string]: string; } = {};
    constructor(dictionaryParam?: { [id: string]: string; }){
        if(dictionaryParam == undefined){
            this.dictionary = {};
            
        }else{
        this.dictionary = dictionaryParam;
        }
    }
}