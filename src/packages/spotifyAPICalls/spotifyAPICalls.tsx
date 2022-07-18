import { SpotifyInfo } from "../../constants/spotify_info";
import { Playlist } from "../../model/playlist/playlist";
import { SongDictionary } from "../../model/songDictionary/songDictionary";

export function callApi(method: any, url: any, body: any, client_id: any, access_token: any){
    return new Promise( (resolve, reject) => {
      let xhr = new XMLHttpRequest();
      xhr.addEventListener("readystatechange", () => {
        if (xhr.readyState === 4 && xhr.status === 200) {
          let data = JSON.parse(xhr.responseText);
          resolve(data);
        } else if (xhr.status == 401) {
          // need to test
          refreshAcessToken(client_id);
          callApi(method, url, body, client_id, sessionStorage.getItem("access_token"));
          reject("API call failed");
        }
      });
    xhr.open(method, url, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('Authorization', 'Bearer '+ access_token);
    xhr.send(body);
});
}
export function removeAllItems(elementId: string){
    let node = document.getElementById(elementId);
    while(node?.firstChild){
        node.removeChild(node.firstChild);
    }
}
export function addPlaylist(item: any, num: number, playlistDictionary: Playlist[]){
    let node = document.createElement("option");
    //Add track totals
    node.value = item.id;
    node.innerHTML = item.name + " (" + item.tracks.total + ")";
    document.getElementById("playlists"+num)?.appendChild(node);
    let playlist = new Playlist(item.id, item.name, item.tracks.total);
    playlistDictionary.push(playlist)
    return playlistDictionary;
}

export function refreshAcessToken(client_id: string){
    let refresh_token = sessionStorage.getItem("refresh_token");
    let body = "grant_type=refresh_token";
    body += "&refresh_token=" + refresh_token;
    body += "&client_id=" + client_id;
    callAuthorizationApi(client_id, body, true);
}

export function callAuthorizationApi(client_id: string, body: string, refreshing: boolean){
  let client_secret = sessionStorage.getItem("client_secret");
  let xhr = new XMLHttpRequest();
  xhr.open("POST", SpotifyInfo.token, true);
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  xhr.setRequestHeader('Authorization', 'Basic '+ btoa(client_id + ":"+ client_secret));
  xhr.send(body);
  xhr.onload = () => {handleAuthorizationResponse(xhr, body, refreshing);}
}

export function handleAuthorizationResponse(xhr: XMLHttpRequest, body: string, refreshing: boolean, callback?: any){
    console.log(xhr);
    if(xhr.readyState == 4){
      if ( xhr.status == 200 ){
          var data = JSON.parse(xhr.responseText);
          console.log(data);
          var data = JSON.parse(xhr.responseText);
          if ( data.access_token != undefined ){
              let access_token = data.access_token;
              sessionStorage.setItem("access_token", access_token);
          }
          if ( data.refresh_token  != undefined ){
              let refresh_token = data.refresh_token;
              sessionStorage.setItem("refresh_token", refresh_token);
          }
          document.getElementById("loginRow")?.remove();
          callback!;
      }
      else if( xhr.status == 401 && !refreshing){
        let client_id = sessionStorage.getItem("client_id");
        if(!refreshing && client_id != null){
        refreshAcessToken(client_id);
        }else{
            console.log("client_id is null");
        }
      }
      else {
        console.log(xhr.responseText);
        alert(xhr.responseText);
    }
    }
  else{
    console.log(xhr.readyState);
    }
  }
export function addTrack(item: any, index: any, songDict: SongDictionary){
    // let node = document.createElement("option");
    // node.value = index;
    // node.innerHTML = item.track.name + " (" + item.track.artists[0].name + ")";
    // document.getElementById("trackss")!.appendChild(node); 
    // console.log(songDict);
    songDict.dictionary[index] = item.track.name;
    return songDict;
}
// refreshAcessToken() {
//     let refresh_token = localStorage.getItem("refresh_token");
//     let body = "grant_type=refresh_token";
//     body += "&refresh_token=" + refresh_token;
//     body += "&client_id=" + client_id;
//     callAuthorizationApi(body);
//   }
export function fetchTracks(playlistID: string, offset: number, index: number, callback: any){
  console.log(playlistID);
  let url = SpotifyInfo.tracks_url;
  url = url.replace("{{PlaylistId}}", playlistID);
  if(offset != 0){
    url += "?=offset="+offset;
  }
  console.log(url);
  callApi("GET", url, null, sessionStorage.getItem("client_id"), sessionStorage.getItem("access_token")).then(
    (data) => {
    handleTracksResponse(data, playlistID, index, callback);
  });
  // console.log(this.xhr);
}
export function handleTracksResponse(data: any, playlistID: string, index: number, callback: any){
    // console.log(data);
    // console.log(data.items);
    // removeAllItems("tracks");
    let songDict = new SongDictionary();
    data.items.forEach( (item: any, index: any) => addTrack(item, index, songDict));
    // console.log(songDict);
    // console.log(this.songDict);
    callback(index,songDict,playlistID);

}

export function handleClick(idName: string){
  let currentButton = document.getElementById(idName);
  console.log(currentButton?.onclick?.toString());
  if(!currentButton?.classList.contains("selected")){
   currentButton?.classList.add("selected");
   currentButton?.classList.remove("unselected");
  }else{
   currentButton?.classList.remove("selected");
   setTimeout(() => {
       currentButton?.classList.add("unselected");
   }, 250)

  }
}