var generisanjeStanja = function() {
  stanje = [];
  for (var i = 0; i < 8; i++) {
    stanje[i] = Math.floor(Math.random() * 8 + 1);
  }
  return stanje;
};

var restartovanjePlaninarenja = function(stanje) {
  brojac = 1;
  stanje = planinarenje(stanje);
  brisanjeKraljica();

  while (!daLiJeRjesenje(stanje)) {
    stanje = generisanjeStanja(stanje.length);
    brojac++;
    stanje = planinarenje(stanje);
  }

  console.log("Broj restartovanja: " + brojac);
  console.log("Rjesenje: " + stanje);
  console.log("----------------------------------------");

  document.getElementById("rezultatPlaninarenja").innerHTML =
    "Broj restartovanja: " + brojac + "<br> Rjesenje je: " + stanje;

  crtanjeKraljica(stanje);
  return [brojac, stanje];
};

var planinarenje = function(start) {
  var najbolji = start;
  var trenutni;
  var trenutniOcjena = ocjeni(start);

  while (true) {
    trenutni = najbolji;
    var kandidati = generisanjeKandidata(trenutni);
    for (var i in kandidati) {
      var ocjenaKandidata = ocjeni(kandidati[i]);
      if (ocjenaKandidata < trenutniOcjena) {
        trenutni = kandidati[i];
        trenutniOcjena = ocjenaKandidata;
      }
    }

    if (najbolji == trenutni) return najbolji;

    najbolji = trenutni;
  }
};

var generisanjeKandidata = function(stanje) {
  kandidati = [];
  for (var i = 0; i < stanje.length; i++) {
    var start = stanje.slice(0, i);
    var kraj = stanje.slice(i + 1, stanje.length);
    for (j = 1; j <= stanje.length; j++) {
      var c = start.concat(
        [Math.floor(Math.random() * stanje.length + 1)].concat(kraj)
      );
      kandidati.push(c);
    }
  }
  return kandidati;
};

var ocjeni = function(stanje) {
  var pravolinijskiNapadi = function(stanje) {
    brojNapada = 0;
    for (var i in stanje) {
      for (var j in stanje) {
        if (j != i) {
          brojNapada = stanje[i] == stanje[j] ? brojNapada + 1 : brojNapada;
        }
      }
    }
    return brojNapada;
  };

  var dijagonalniNapadi = function(stanje) {
    brojNapada = 0;
    for (var i in stanje) {
      for (var j in stanje) {
        if (i != j) {
          d = Math.abs(i - j);
          brojNapada = stanje[i] == stanje[j] + d ? brojNapada + 1 : brojNapada;
          brojNapada = stanje[i] == stanje[j] - d ? brojNapada + 1 : brojNapada;
        }
      }
    }
    return brojNapada / 2;
  };

  return pravolinijskiNapadi(stanje) + dijagonalniNapadi(stanje);
};

var daLiJeRjesenje = function(stanje) {
  return ocjeni(stanje) === 0;
};

var statistika = function() {
  var brojRestartovanja = 0;
  for (i = 0; i < 200; i++) {
    brojRestartovanja =
      brojRestartovanja + restartovanjePlaninarenja(generisanjeStanja())[0];
    console.log("Ukupan broj restartovanja: " + brojRestartovanja);
  }
  var statistika = brojRestartovanja / 200;
  console.log("Statistika za 200 realizacija je: " + statistika);
  document.getElementById("rezultatStatistike").innerHTML =
    "Statistika za 200 realizacija je: " + statistika;
  return statistika;
};

var crtanjeKraljica = function(stanje) {
  for (var i = 0; i <= 7; i++) {
    document.getElementById(stanje[i]).children[i].innerHTML = "&#9819;";
  }
};

var brisanjeKraljica = function() {
  for (var i = 1; i <= 8; i++) {
    for (var j = 0; j <= 7; j++) {
      document.getElementById(i).children[j].innerHTML = "";
    }
  }
};
