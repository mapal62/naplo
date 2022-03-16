function posztok(adatok, belsoHTML){
    const hanyszor = adatok.reduce((szamol, elem) => {
        if (!szamol[elem.userId]) {
          szamol[elem.userId] = 0;
        }
        szamol[elem.userId]++;
        return szamol;
      }, {});
      for (const [key, value] of Object.entries(hanyszor))
        belsoHTML += `
      <p>${key}. user: ${value} poszt</p>
      `;
  return belsoHTML;
}