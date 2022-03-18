let kezdet = Date.now();
let kapott = [];
let cel = "";
let url = "";

naplozas("Új XHR instancia");
let xhr = new XMLHttpRequest();

naplozas("<select> figyelése");
const honnan = document.getElementById("celId");
honnan.onchange = function () {
  kapott = []; //struktúra váltás!!
  cel = honnan.value;
  switch (cel) {
    case "posts":
      url = "https://jsonplaceholder.typicode.com/posts";
      break;
    case "comments":
      url = "https://jsonplaceholder.typicode.com/comments";
      break;
    case "albums":
      url = "https://jsonplaceholder.typicode.com/albums";
      break;
    case "users":
      url = "https://jsonplaceholder.typicode.com/users";
      break;
    case "cities":
      url = "https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json";
      break;

    default:
      url = "";
      break;
  }
};

naplozas("XHR állapot figyelése előtt: " + xhr.readyState);
xhr.onreadystatechange = function () {
  naplozas("XHR állapot: " + xhr.readyState);
  if (xhr.readyState === 4 && xhr.status === 200) {
    kapott.push(...JSON.parse(xhr.responseText));
    let kapottHTML = "";
    switch (cel) {
      case "posts":
        kapottHTML = posztok(kapott, kapottHTML);
        break;
      case "comments":
        kapottHTML = kommentek(kapott, kapottHTML);
        break;
      case "albums":
        kapottHTML = albumok(kapott, kapottHTML);
        break;
      case "users":
        kapottHTML = felhasznalok(kapott, kapottHTML);
        break;
      case "cities":
        kapottHTML = varosok(kapott, kapottHTML);
        break;

      default:
        break;
    }
    document.getElementById("kapott").innerHTML = kapottHTML;
  }
};

document.getElementById("kuld").onclick = function () {
  if (url === "") {
    naplozas("!! Válassz cél adatot !!");
    return;
  }
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
  const adatok = document.getElementById("kapott");
  adatok.classList.add("eltunes");
  adatok.ontransitionend = function () {
    adatok.classList.remove("eltunes");
    document.getElementById("log-area").value = "";
    document.getElementById("kapott").innerHTML = "";
    kapott = [];
  };
}
