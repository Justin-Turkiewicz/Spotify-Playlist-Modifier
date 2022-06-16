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