let kezdet = Date.now();
let kapott = [];
let url = "https://jsonplaceholder.typicode.com/posts";

naplozas("Új XHR instancia");
let xhr = new XMLHttpRequest();

naplozas("XHR állapotváltozás figyelése előtt: " + xhr.readyState);
xhr.onreadystatechange = function () {
  naplozas("XHR állapot: " + xhr.readyState);
  if (xhr.readyState === 4 && xhr.status === 200) {
    kapott.push(...JSON.parse(xhr.responseText));
    const hanyszor = kapott.reduce((szamol, elem) => {
      if (!szamol[elem.userId]) {
        szamol[elem.userId] = 0;
      }
      szamol[elem.userId]++;
      return szamol;
    }, {});
    let kapottHTML = "";
    for (const [key, value] of Object.entries(hanyszor))
      kapottHTML += `
    <p>${key}. user: ${value} poszt</p>
    `;
    document.getElementById("kapott").innerHTML = kapottHTML;
  }
};

document.getElementById("kuld").onclick = function () {
  naplozas("");
  naplozas("XHR kérés felépítése előtt: " + xhr.readyState);
  xhr.open("GET", url);
  naplozas("XHR kérés elküldése előtt: " + xhr.readyState);
  xhr.send();
};

document.getElementById("torol").onclick = function () {
  takaritas();
};

function naplozas(uzenet) {
  if (uzenet === "") {
    kezdet = Date.now();
  }
  document.getElementById("log-area").value +=
    "\n" + `${Date.now() - kezdet}` + " ms, " + uzenet;
}

function takaritas() {
  document.getElementById("log-area").value = "";
  document.getElementById("kapott").innerHTML = "";
  kapott = [];
}
