import { SpotifyInfo } from "../../constants/spotify_info";

export function callApi(method: any, url: any, body: any, callback: any, access_token: any){
    let xhr = new XMLHttpRequest();
    xhr.open(method, url, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('Authorization', 'Bearer '+ access_token);
    xhr.send(body);
    xhr.onload = callback;
    return xhr;
}
export function removeAllItems(elementId: string){
    let node = document.getElementById(elementId);
    while(node?.firstChild){
        node.removeChild(node.firstChild);
    }
}
export function addPlaylist(item: any){
    let node = document.createElement("option");
    node.value = item.id;
    node.innerHTML = item.name + " (" + item.tracks.total + ")";
    document.getElementById("playlists")?.appendChild(node);
}

export function refreshAcessToken(client_id: string, callback?: any){
    let refresh_token = sessionStorage.getItem("refresh_token");
    let body = "grant_type=refresh_token";
    body += "&refresh_token=" + refresh_token;
    body += "&client_id=" + client_id;
    callAuthorizationApi(client_id, body, true);
    if(callback != undefined){
    callback();
    }
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

export function handleAuthorizationResponse(xhr: XMLHttpRequest, body: string, refreshing: boolean){
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
      }
      else if( xhr.status == 401 && !refreshing){
        let client_id = sessionStorage.getItem("client_id");
        if(client_id != null){
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
// refreshAcessToken() {
//     let refresh_token = localStorage.getItem("refresh_token");
//     let body = "grant_type=refresh_token";
//     body += "&refresh_token=" + refresh_token;
//     body += "&client_id=" + client_id;
//     callAuthorizationApi(body);
//   }