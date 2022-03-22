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
      url =
        "https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json";
      break;

    default:
      url = "";
      break;
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

naplozas("XHR állapot figyelése előtt: " + xhr.readyState);
// response esetén
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
    let keresett = document.getElementById("c-keres");
    if (keresett) {
      cityKereses(keresett, kapott);
    }
  }
};

document.getElementById("torol").onclick = function () {
  takaritas();
};
