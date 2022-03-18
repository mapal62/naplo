function posztok(adatok, belsoHTML) {
  const hanyszor = adatok.reduce((szamol, elem) => {
    if (!szamol[elem.userId]) {
      szamol[elem.userId] = 0;
    }
    szamol[elem.userId]++;
    return szamol;
  }, {});
  belsoHTML += "<h3>Posztok száma</h3>";
  for (const [key, value] of Object.entries(hanyszor))
    belsoHTML += `
      <p>${key}. user: ${value} poszt</p>
      `;
  return belsoHTML;
}

function kommentek(adatok, belsoHTML) {
  const hanyszor = adatok.reduce((szamol, elem) => {
    const topLevel = elem.email.substring(elem.email.lastIndexOf("."));
    // const darabolt = elem.email.split('.');
    // const topLevel = darabolt[darabolt.length - 1];
    if (!szamol[topLevel]) {
      szamol[topLevel] = 0;
    }
    szamol[topLevel]++;
    return szamol;
  }, {});
  belsoHTML += "<h3>e-mail TLD-k</h3>";

  for (const [key, value] of Object.entries(hanyszor))
    belsoHTML += `
      <p>${key} TLD: ${value} komment</p>
      `;
  return belsoHTML;
}

function albumok(adatok, belsoHTML) {
  const limit = 10;
  belsoHTML += `<h3>Az első ${limit} album címe (${adatok.length}-ból)</h3>`;

  for (let i = 0; i < limit; i++) {
    belsoHTML += `
    <p>${adatok[i].title}</p>
    `;
  }
  return belsoHTML;
}
function varosok(adatok, belsoHTML) {
  const limit = 10;
  belsoHTML += `<h3>Az első ${limit} város (${adatok.length}-ból)</h3>`;

  for (let i = 0; i < limit; i++) {
    belsoHTML += `
    <p>${adatok[i].city} / ${adatok[i].state}</p>
    `;
  }

  belsoHTML += '<input id="c-keres" type="text" placeholder="keresés"><ul>';
  adatok.forEach((element) => {
    belsoHTML += `<li>${element.city} ${element.population}</li>`;
  });
  belsoHTML += "</ul>";
  return belsoHTML;
}
