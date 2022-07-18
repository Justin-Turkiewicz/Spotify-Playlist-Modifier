export class SongDictionary{
    dictionary: { [name: string]: string; } = {};
    dictionaryURI: { [id: string]: string; } = {};
    constructor(dictionaryParam?: { [name: string]: string; }, dictionaryURIParam?: { [name: string]: string; } ){
        if(dictionaryParam == undefined){
            this.dictionary = {};
            
        }else{
        this.dictionary = dictionaryParam;
        }
        if(dictionaryURIParam == undefined){
            this.dictionaryURI = {};
        }else{
            this.dictionaryURI = dictionaryURIParam;
        }
    }
}