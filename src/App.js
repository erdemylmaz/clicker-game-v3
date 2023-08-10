//      DATABASE
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDwUF4yeWQHrit6Zz5y7saj5D8CUqPIeW0",
  authDomain: "clicker-game-144ea.firebaseapp.com",
  projectId: "clicker-game-144ea",
  storageBucket: "clicker-game-144ea.appspot.com",
  messagingSenderId: "553930585507",
  appId: "1:553930585507:web:ba7d0125c80312ad859616"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
import {getDatabase, ref, set, get, child, update, remove} from "https://www.gstatic.com/firebasejs/10.1.0/firebase-database.js";

const db = getDatabase();

let users = [];

// isletme adini alma
const form = document.getElementById("operation-name-form");
const input = document.getElementById("operation-name-input");
const startArea = document.getElementById("start");
const gameArea = document.getElementById("game");
let operationName;
const operationNameH1 = document.getElementById("operationName");

function onSubmit(e) {
  e.preventDefault();


  if (input.value !== "") {
    operationName = input.value;
    startArea.style.display = "none";
    gameArea.style.display = "block";
    operationNameH1.innerHTML = operationName;
    document.title = operationName;

    let d = new Date();
    let h = d.getHours();
    let m = d.getMinutes();
    let day = d.getDate();
    let month = d.getMonth();
    let year = d.getFullYear();
    let time = d.getTime();

    localStorage.setItem("operationName", operationName);
    localStorage.setItem("isCompanyWork", 1);
    localStorage.setItem("startH", h);
    localStorage.setItem("startM", m);
    localStorage.setItem("startDay", day);
    localStorage.setItem("startMonth", month);
    localStorage.setItem("startYear", year);
    localStorage.setItem("startTime", time);

    get(ref(db, "APP/USERS")).then((snapshot) => {
      users = snapshot.val();

      users.push({
        title: operationName,
        money: 0,
        createDate: [day, month, year, h, m],
      });

      set(ref(db, "APP/USERS"), users).catch((err) => {
        console.log(err);
      })
    }).catch((err) => {
      console.log(err);
    });

  }
};

form.addEventListener("submit", onSubmit);

document.title = localStorage.getItem("operationName");
// GAME
const upgradeBTN = document.querySelector('.upgrade-btn');
const upgradePriceAREA = document.querySelector('.upgrade-price');

const materialArea = document.getElementById("material");
const moneyArea = document.getElementById("money");
const currentCigKofteArea = document.getElementById("currentCigKofte");
const cigKofteFeeArea = document.getElementById("cigKofteFee");
const makedCigKofteArea = document.getElementById("makedCigKofte");
const makeButton = document.getElementById("makeCigKofteButton");
const buyMaterialButton = document.getElementById("buyMaterial");
const materialCostArea = document.getElementById("materialCost");
const autoBuyerArea = document.getElementById("autoBuyer");
const autoBuyerActivityArea = document.getElementById("autoBuyerActivity");
const autoBuyerCostArea = document.getElementById("autoBuyerCost");
const buyAutoBuyerButton = document.getElementById("buyAutoBuyer");
const increasePriceButton = document.getElementById("increasePrice");
const decreasePriceButton = document.getElementById("decreasePrice");
const changeActivityBtn = document.getElementById("changeAutoBuyerActivity");
// ingredients
// Nar Eksisi
const narPriceArea = document.getElementById("narPrice");
const buyNarButton = document.getElementById("buyNar");
const hasNarArea = document.getElementById("hasNar");

// Marul
const marulPriceArea = document.getElementById("marulPrice");
const buyMarulButton = document.getElementById("buyMarul");
const hasMarulArea = document.getElementById("hasMarul");

// Tursu
const tursuPriceArea = document.getElementById("tursuPrice");
const buyTursuButton = document.getElementById("buyTursu");
const hasTursuArea = document.getElementById("hasTursu");

// Yesillik
const yesillikPriceArea = document.getElementById("yesillikPrice");
const buyYesillikButton = document.getElementById("buyYesillik");
const hasYesillikArea = document.getElementById("hasYesillik");

// Limon
const limonPriceArea = document.getElementById("limonPrice");
const buyLimonButton = document.getElementById("buyLimon");
const hasLimonArea = document.getElementById("hasLimon");

// workers
// errandBoy
const buyErrandBoyButton = document.getElementById("buyErrandBoy");
const errandBoysPriceArea = document.getElementById("errandBoysPrice");
const errandBoysAmountArea = document.getElementById("errandBoysAmount");
// master
const buyMasterButton = document.getElementById("buyMaster");
const mastersPriceArea = document.getElementById("mastersPrice");
const mastersAmountArea = document.getElementById("mastersAmount");

class Game {
  material = 10000;
  items = [];
  money = 0;
  totalEarnedMoney = 0;
  cigKofteFee = 20;
  maxPrice = this.cigKofteFee;
  minPrice = 1;
  cigKofteMaterialAmount = 100;
  makedCigKofte = 0;
  currentCigKofte = 0;
  materialCost = 1000;
  hasAutoBuyer = false;
  isAutoBuyerActive = false;
  autoBuyerCost = 15000;
  autoBuyerShow = 2000;
  upgradePrice = 120000;
  level = 1;
  sellIndex = 5;

  newMaterialCost;

  materialsCost = () => {
    this.newMaterialCost =
      this.materialCost + Math.floor(Math.random() * 300 - Math.random() * 300);

    localStorage.setItem("materialCost", this.newMaterialCost);

    materialCostArea.innerHTML = `${this.newMaterialCost}₺`;
  };

  makeCigKofte = () => {
    this.material -= this.cigKofteMaterialAmount;
    this.makedCigKofte++;
    this.currentCigKofte++;

    materialArea.innerHTML = `${this.material}`;
    currentCigKofteArea.innerHTML = `${game.currentCigKofte}`;
    makedCigKofteArea.innerHTML = `${game.makedCigKofte}`;

    // set datas to local storage
    localStorage.setItem("currentCigKofte", this.currentCigKofte);
    localStorage.setItem("makedCigKofte", this.makedCigKofte);
    localStorage.setItem("material", this.material);
  };

  sellCigKofte = () => {
    this.totalEarnedMoney += this.cigKofteFee;
    this.money += this.cigKofteFee;
    this.currentCigKofte--;

    currentCigKofteArea.innerHTML = `${game.currentCigKofte}`;
    moneyArea.innerHTML = `${addDots(game.money)}₺`;

    // set datas to local storage
    localStorage.setItem("currentCigKofte", this.currentCigKofte);
    localStorage.setItem("money", this.money);
    localStorage.setItem("totalEarnedMoney", this.totalEarnedMoney);
  };

  buyMaterial = () => {
    this.money -= this.newMaterialCost;
    this.material += 10000;

    materialArea.innerHTML = `${this.material}`;
    moneyArea.innerHTML = `${game.money}₺`;

    localStorage.setItem("money", this.money);
    localStorage.setItem("material", this.material);

    makeButton.disabled = false;
  };

  buyAutoBuyer = () => {
    if (this.money > this.autoBuyerCost) {
      this.money -= this.autoBuyerCost;
      this.hasAutoBuyer = true;
      this.isAutoBuyerActive = true;

      localStorage.setItem("hasAutoBuyer", true);
      localStorage.setItem("isAutoBuyerActive", true);

      buyAutoBuyerButton.style.display = "none";
      autoBuyerActivityArea.innerHTML = "Aktif";

      this.items.push("Auto Buyer");
      localStorage.setItem("items", JSON.stringify(this.items));
    }
  };

  changeAutoBuyerActivity = (e) => {
    if (this.isAutoBuyerActive) {
      this.isAutoBuyerActive = false;
      e.target.textContent = "Aktif et!";
      autoBuyerActivityArea.innerHTML = "Durdu";

      localStorage.setItem("isAutoBuyerActive", false);
    } else if (!this.isAutoBuyerActive) {
      this.isAutoBuyerActive = true;
      e.target.textContent = "Durdur!";
      autoBuyerActivityArea.innerHTML = "Aktif";

      localStorage.setItem("isAutoBuyerActive", true);
    }
  };

  canMakeCigKofte = () => {
    return this.material >= this.cigKofteMaterialAmount
      ? (makeButton.disabled = false)
      : (makeButton.disabled = true);
  };
  canBuyMaterial = () => {
    return this.money >= this.newMaterialCost
      ? (buyMaterialButton.disabled = false)
      : (buyMaterialButton.disabled = true);
  };
  canBuyAutoBuyer = () => {
    return this.money >= this.autoBuyerCost
      ? (buyAutoBuyerButton.disabled = false)
      : (buyAutoBuyerButton.disabled = true);
  };

  increasePrice = () => {
    this.cigKofteFee++;
    cigKofteFeeArea.innerHTML = `${this.cigKofteFee}₺`;

    localStorage.setItem("cigKofteFee", this.cigKofteFee);
  };
  decreasePrice = () => {
    this.cigKofteFee--;
    cigKofteFeeArea.innerHTML = `${this.cigKofteFee}₺`;

    localStorage.setItem("cigKofteFee", this.cigKofteFee);
  };

  upgradeCoop = () => {
    this.money -= this.upgradePrice;

    this.upgradePrice = this.upgradePrice * 1.25;
    this.cigKofteFee += 10;
    this.maxPrice += 10;
    this.sellIndex += 0.7;

    localStorage.setItem('sellIndex', this.sellIndex);

    this.level++;
    localStorage.setItem('money', this.money);
    localStorage.setItem('maxPrice', this.maxPrice);
    location.reload();
    localStorage.setItem('level', this.level);
  }
}
class Ingredients {
  totalIngredients = 0;
  // Nar Eksisi
  narsPrice = 50000;
  hasNar = false;

  buyNar = () => {
    game.money -= this.narsPrice;
    game.maxPrice += 10;
    this.hasNar = true;
    this.totalIngredients++;

    localStorage.setItem("money", game.money);
    localStorage.setItem("maxPrice", game.maxPrice);
    localStorage.setItem("hasNar", true);

    moneyArea.innerHTML = `${game.money}₺`;

    game.items.push("Nar Eksisi");
    localStorage.setItem("items", JSON.stringify(game.items));
  };

  // Limon
  lemonsPrice = 100000;
  hasLemon = false;

  buyLemon = () => {
    game.money -= this.lemonsPrice;
    game.maxPrice += 10;
    this.hasLemon = true;
    this.totalIngredients++;

    localStorage.setItem("hasLemon", true);
    localStorage.setItem("maxPrice", game.maxPrice);
    localStorage.setItem("money", game.money);

    moneyArea.innerHTML = `${game.money}`;

    game.items.push("Limon");
    localStorage.setItem("items", JSON.stringify(game.items));
  };

  // Marul
  marulsPrice = 150000;
  hasMarul = false;

  buyMarul = () => {
    game.money -= this.marulsPrice;
    game.maxPrice += 10;
    this.hasMarul = true;
    this.totalIngredients++;

    localStorage.setItem("hasMarul", true);
    localStorage.setItem("maxPrice", game.maxPrice);
    localStorage.setItem("money", game.money);

    moneyArea.innerHTML = `${game.money}`;

    game.items.push("Marul");
    localStorage.setItem("items", JSON.stringify(game.items));
  };

  // Tursu
  tursusPrice = 200000;
  hasTursu = false;

  buyTursu = () => {
    game.money -= this.tursusPrice;
    game.maxPrice += 10;
    this.hasTursu = true;
    this.totalIngredients++;

    localStorage.setItem("hasTursu", true);
    localStorage.setItem("maxPrice", game.maxPrice);
    localStorage.setItem("money", game.money);

    moneyArea.innerHTML = `${game.money}`;

    game.items.push("Tursu");
    localStorage.setItem("items", JSON.stringify(game.items));
  };
  // Yesillik
  yesilliksPrice = 250000;
  hasYesillik = false;

  buyYesillik = () => {
    game.money -= this.yesilliksPrice;
    game.maxPrice += 10;
    this.hasYesillik = true;
    this.totalIngredients++;

    localStorage.setItem("hasYesillik", true);
    localStorage.setItem("maxPrice", game.maxPrice);
    localStorage.setItem("money", game.money);

    moneyArea.innerHTML = `${game.money}`;

    game.items.push("Yesillik");
    localStorage.setItem("items", JSON.stringify(game.items));
  };
}

class yardimcilar {
  // errdand boy
  hasErrandBoy = false;
  errandBoysPrice = 500;
  currentErrandBoy = 0;

  buyErrandBoy = () => {
    game.money -= this.errandBoysPrice;
    this.hasErrandBoy = true;
    this.currentErrandBoy += 1;

    this.errandBoysPrice =
      this.errandBoysPrice + Math.floor((this.errandBoysPrice * 50) / 100);
    errandBoysPriceArea.innerHTML = `${helpers.errandBoysPrice}₺`;

    localStorage.setItem("hasErrandBoy", true);
    localStorage.setItem("currentErrandBoy", this.currentErrandBoy);
    localStorage.setItem("errandBoysPrice", this.errandBoysPrice);
    localStorage.setItem("money", game.money);

    moneyArea.innerHTML = `${game.money}₺`;
    errandBoysAmountArea.innerHTML = `Mevcut: ${this.currentErrandBoy}`;

    for (let x = 0; x < game.items.length; x++) {
      if (game.items[x].name == "Cirak") {
        game.items.splice(x, 1);
      }
    }

    game.items.push({ name: "Cirak", amount: this.currentErrandBoy });

    localStorage.setItem("items", JSON.stringify(game.items));
  };
  errandBoy = () => {
    if (
      this.hasErrandBoy == true &&
      game.material >= game.cigKofteMaterialAmount * this.currentErrandBoy
    ) {
      game.material -= game.cigKofteMaterialAmount * this.currentErrandBoy;
      game.makedCigKofte += this.currentErrandBoy;
      game.currentCigKofte += this.currentErrandBoy;

      localStorage.setItem("material", game.material);
      localStorage.setItem("makedCigKofte", game.makedCigKofte);
      localStorage.setItem("currentCigKofte", game.currentCigKofte);

      materialArea.innerHTML = `${game.material}`;
      currentCigKofteArea.innerHTML = `${game.currentCigKofte}`;
      makedCigKofteArea.innerHTML = `${game.makedCigKofte}`;
    }
  };
  // master
  hasMaster = false;
  mastersPrice = 1250;
  currentMaster = 0;
  master = 3;

  buyMaster = () => {
    game.money -= this.mastersPrice;
    this.hasMaster = true;
    this.currentMaster += 1;

    this.mastersPrice =
      this.mastersPrice + Math.floor((this.mastersPrice * 50) / 100);

    localStorage.setItem("hasMaster", true);
    localStorage.setItem("currentMaster", this.currentMaster);
    localStorage.setItem("mastersPrice", this.mastersPrice);
    localStorage.setItem("money", game.money);

    mastersPriceArea.innerHTML = `${helpers.mastersPrice}₺`;

    moneyArea.innerHTML = `${game.money}₺`;
    mastersAmountArea.innerHTML = `Mevcut: ${this.currentMaster}`;

    for (let x = 0; x < game.items.length; x++) {
      if (game.items[x].name == "Usta") {
        game.items.splice(x, 1);
      }
    }

    game.items.push({ name: "Usta", amount: this.currentMaster });

    localStorage.setItem("items", JSON.stringify(game.items));
  };
  master = () => {
    if (
      this.hasMaster == true &&
      game.material >= game.cigKofteMaterialAmount * this.currentMaster
    ) {
      game.material -= game.cigKofteMaterialAmount * this.currentMaster;
      game.makedCigKofte += this.currentMaster;
      game.currentCigKofte += this.currentMaster;

      localStorage.setItem("material", game.material);
      localStorage.setItem("makedCigKofte", game.makedCigKofte);
      localStorage.setItem("currentCigKofte", game.currentCigKofte);

      materialArea.innerHTML = `${game.material}`;
      currentCigKofteArea.innerHTML = `${game.currentCigKofte}`;
      makedCigKofteArea.innerHTML = `${game.makedCigKofte}`;
    }
  };
}

let helpers = new yardimcilar();
let ingredients = new Ingredients();
let game = new Game();

if(localStorage.getItem('level')) {
  game.level = localStorage.getItem('level');
}

if(localStorage.getItem('sellIndex')) {
  game.sellIndex = localStorage.getItem('sellIndex');
}

if(localStorage.getItem('maxPrice')) {
  game.maxPrice = localStorage.getItem('maxPrice');
}

if(game.level > 1) {
  game.upgradePrice = game.upgradePrice * Math.pow(1.25, game.level - 1);
  game.cigKofteFee += 10 * (game.level - 1);
  game.maxPrice += 10 * (game.level - 1);
}

upgradePriceAREA.textContent = `${addDots(game.upgradePrice)}`;

makeButton.addEventListener("click", game.makeCigKofte);
buyMaterialButton.addEventListener("click", game.buyMaterial);
buyAutoBuyerButton.addEventListener("click", game.buyAutoBuyer);
increasePriceButton.addEventListener("click", game.increasePrice);
decreasePriceButton.addEventListener("click", game.decreasePrice);
changeActivityBtn.addEventListener("click", game.changeAutoBuyerActivity);
buyErrandBoyButton.addEventListener("click", helpers.buyErrandBoy);
buyMasterButton.addEventListener("click", helpers.buyMaster);

// Ingredients
//Nar Eksisi
buyNarButton.addEventListener("click", ingredients.buyNar);
narPriceArea.innerHTML = `${ingredients.narsPrice}₺`;
// Limon
buyLimonButton.addEventListener("click", ingredients.buyLemon);
limonPriceArea.innerHTML = `${ingredients.lemonsPrice}₺`;
// Tursu
buyTursuButton.addEventListener("click", ingredients.buyTursu);
tursuPriceArea.innerHTML = `${ingredients.tursusPrice}₺`;
// Marul
buyMarulButton.addEventListener("click", ingredients.buyMarul);
marulPriceArea.innerHTML = `${ingredients.marulsPrice}₺`;
// Yesillik
buyYesillikButton.addEventListener("click", ingredients.buyYesillik);
yesillikPriceArea.innerHTML = `${ingredients.yesilliksPrice}₺`;

// Ingredients's End

materialArea.innerHTML = `${game.material}`;
moneyArea.innerHTML = `${game.money}₺`;
currentCigKofteArea.innerHTML = `${game.currentCigKofte}`;
makedCigKofteArea.innerHTML = `${game.makedCigKofte}`;
cigKofteFeeArea.innerHTML = `${game.cigKofteFee}₺`;
materialCost.innerHTML = `${game.materialCost}₺`;
autoBuyerCostArea.innerHTML = `${game.autoBuyerCost}₺`;
errandBoysPriceArea.innerHTML = `${helpers.errandBoysPrice}₺`;
errandBoysAmountArea.innerHTML = `Mevcut: ${helpers.currentErrandBoy}`;
mastersPriceArea.innerHTML = `${helpers.mastersPrice}₺`;
mastersAmountArea.innerHTML = `Mevcut: ${helpers.currentMaster}`;

function check() {
  const changeActivityBtns = document.querySelectorAll(
    ".changeAutoBuyerActivity"
  );

  game.canMakeCigKofte();
  game.canBuyMaterial();
  game.canBuyAutoBuyer();

  if(game.money >= game.upgradePrice) {
    upgradeBTN.classList.remove('disabled');
  }

  if (Math.random() * game.cigKofteFee < game.sellIndex && game.currentCigKofte > 0) {
    game.sellCigKofte();
  }

  if (game.makedCigKofte >= game.autoBuyerShow) {
    autoBuyerArea.style.display = "block";
  } else {
    autoBuyerArea.style.display = "none";
  }

  if (!game.hasAutoBuyer) {
    changeActivityBtn.style.display = "none";
  } else {
    changeActivityBtn.style.display = "inline";
    changeActivityBtn.style.marginLeft = "12px";
  }

  if (
    game.hasAutoBuyer &&
    game.isAutoBuyerActive &&
    game.money >= game.newMaterialCost &&
    game.material <=
      game.cigKofteMaterialAmount *
        (helpers.currentErrandBoy + helpers.currentMaster)
  ) {
    game.buyMaterial();
  }

  changeActivityBtns.forEach((btn) => {
    btn.addEventListener("click", game.changeAutoBuyerActivity);
  });

  game.cigKofteFee >= game.maxPrice
    ? (increasePriceButton.disabled = true)
    : (increasePriceButton.disabled = false);

  game.cigKofteFee <= game.minPrice
    ? (decreasePriceButton.disabled = true)
    : (decreasePriceButton.disabled = false);

  game.money <= helpers.errandBoysPrice
    ? (buyErrandBoyButton.disabled = true)
    : (buyErrandBoyButton.disabled = false);
  game.money <= helpers.mastersPrice
    ? (buyMasterButton.disabled = true)
    : (buyMasterButton.disabled = false);

  // ingrediants
  let buyNarButton = document.querySelector("#buyNar");
  let buyLimonButton = document.querySelector("#buyLimon");
  let buyMarulButton = document.querySelector("#buyMarul");
  let buyYesillikButton = document.querySelector("#buyYesillik");
  let buyTursuButton = document.querySelector("#buyTursu");

  if (ingredients.hasNar || localStorage.getItem("hasNar")) {
    buyNarButton.style.display = "none";
    narPriceArea.style.display = "none";
    hasNarArea.innerHTML = `Satın Alındı`;
  }
  if (ingredients.hasLemon) {
    buyLimonButton.style.display = "none";
    limonPriceArea.style.display = "none";
    hasLimonArea.innerHTML = `Satın Alındı`;
  }
  if (ingredients.hasMarul) {
    buyMarulButton.style.display = "none";
    marulPriceArea.style.display = "none";
    hasMarulArea.innerHTML = `Satın Alındı`;
  }
  if (ingredients.hasTursu) {
    buyTursuButton.style.display = "none";
    tursuPriceArea.style.display = "none";
    hasTursuArea.innerHTML = `Satın Alındı`;
  }
  if (ingredients.hasYesillik) {
    buyYesillikButton.style.display = "none";
    yesillikPriceArea.style.display = "none";
    hasYesillikArea.innerHTML = `Satın Alındı`;
  }

  game.money <= ingredients.narsPrice
    ? (buyNarButton.disabled = true)
    : (buyNarButton.disabled = false);
  game.money <= ingredients.lemonsPrice
    ? (buyLimonButton.disabled = true)
    : (buyLimonButton.disabled = false);
  game.money <= ingredients.marulsPrice
    ? (buyMarulButton.disabled = true)
    : (buyMarulButton.disabled = false);
  game.money <= ingredients.yesilliksPrice
    ? (buyYesillikButton.disabled = true)
    : (buyYesillikButton.disabled = false);
  game.money <= ingredients.tursusPrice
    ? (buyTursuButton.disabled = true)
    : (buyTursuButton.disabled = false);
};

setInterval(check, 1000 / 30);
setInterval(helpers.errandBoy, 1000);
setInterval(helpers.master, 1000 / 3);
setInterval(game.materialsCost, 10000);

function initLocalStorage() {
  // opertaions name
  if (localStorage.getItem("operationName")) {
    startArea.style.display = "none";
    gameArea.style.display = "block";

    let $operationName = localStorage.getItem("operationName");

    operationNameH1.innerHTML = `${$operationName}`;
  } else {
    gameArea.style.display = "none";
  }

  // maked cig kofte
  if (localStorage.getItem("makedCigKofte")) {
    game.makedCigKofte = JSON.parse(localStorage.getItem("makedCigKofte"));

    makedCigKofteArea.innerHTML = game.makedCigKofte;
  }

  // currentCigKofte
  if (localStorage.getItem("currentCigKofte")) {
    game.currentCigKofte = JSON.parse(localStorage.getItem("currentCigKofte"));

    currentCigKofteArea.innerHTML = game.currentCigKofte;
  }

  // money
  if (localStorage.getItem("money")) {
    game.money = JSON.parse(localStorage.getItem("money"));

    moneyArea.innerHTML = `${game.money}₺`;
  }

  // material
  if (localStorage.getItem("material")) {
    game.material = JSON.parse(localStorage.getItem("material"));

    materialArea.innerHTML = game.material;
  }

  // cig kofte fee
  if (localStorage.getItem("cigKofteFee")) {
    game.cigKofteFee = JSON.parse(localStorage.getItem("cigKofteFee"));

    cigKofteFeeArea.innerHTML = `${game.cigKofteFee}₺`;
  }

  // cig kofte max price
  if (localStorage.getItem("maxPrice")) {
    game.maxPrice = JSON.parse(localStorage.getItem("maxPrice"));
  }

  // material cost
  if (localStorage.getItem("materialCost")) {
    game.newMaterialCost = JSON.parse(localStorage.getItem("materialCost"));

    materialCostArea.innerHTML = game.newMaterialCost;
  }

  // errandBoy
  if (localStorage.getItem("hasErrandBoy")) {
    helpers.hasErrandBoy = JSON.parse(localStorage.getItem("hasErrandBoy"));
    helpers.currentErrandBoy = JSON.parse(
      localStorage.getItem("currentErrandBoy")
    );
    helpers.errandBoysPrice = JSON.parse(
      localStorage.getItem("errandBoysPrice")
    );

    errandBoysAmountArea.innerHTML = `Mevcut: ${helpers.currentErrandBoy}`;
    errandBoysPriceArea.innerHTML = `${helpers.errandBoysPrice}₺`;
  }

  // master
  if (localStorage.getItem("hasMaster")) {
    helpers.hasMaster = JSON.parse(localStorage.getItem("hasMaster"));
    helpers.currentMaster = JSON.parse(localStorage.getItem("currentMaster"));
    helpers.mastersPrice = JSON.parse(localStorage.getItem("mastersPrice"));

    mastersAmountArea.innerHTML = `Mevcut: ${helpers.currentMaster}`;
    mastersPriceArea.innerHTML = `${helpers.mastersPrice}₺`;
  }

  // auto buyer
  if (localStorage.getItem("hasAutoBuyer")) {
    game.hasAutoBuyer = JSON.parse(localStorage.getItem("hasAutoBuyer"));
    game.isAutoBuyerActive = JSON.parse(
      localStorage.getItem("isAutoBuyerActive")
    );

    buyAutoBuyerButton.style.display = "none";
    if (game.isAutoBuyerActive) {
      autoBuyerActivityArea.innerHTML = "Aktif";
    } else {
      autoBuyerActivityArea.innerHTML = "Durdu";
    }
  }

  // nar eksisi
  if (localStorage.getItem("hasNar")) {
    ingredients.hasNar = true;
  }

  // lemon
  if (localStorage.getItem("hasLemon")) {
    ingredients.hasLemon = true;
  }

  // tursu
  if (localStorage.getItem("hasTursu")) {
    ingredients.hasTursu = true;
  }

  // yesillik
  if (localStorage.getItem("hasYesillik")) {
    ingredients.hasYesillik = true;
  }

  // marul
  if (localStorage.getItem("hasMarul")) {
    ingredients.hasMarul = true;
  }
};

window.onload = initLocalStorage;

// reset game

const resetButton = document.querySelector(".reset");

const nar = document.querySelector(".nar");
const marul = document.querySelector(".marul");
const yesillik = document.querySelector(".yesillik");
const tursu = document.querySelector(".tursu");
const limon = document.querySelector(".limon");

const confirmDOM = document.querySelector(".confirm");
const closeConfirmBtn = document.querySelector(".close-confirm-btn");

const refuseConfirmBtn = document.querySelector(".refuse-btn");
const confirmBtn = document.querySelector(".confirm-btn");

function resetGame() {
  confirmDOM.style.visibility = "hidden";

  // reset local storage
  localStorage.clear();
  document.title = "Cig Kofte Oyunu";

  // reset game class
  game.material = 10000;
  game.money = 0;
  game.cigKofteFee = 20;
  game.maxPrice = this.cigKofteFee;
  game.minPrice = 1;
  game.cigKofteMaterialAmount = 100;
  game.makedCigKofte = 0;
  game.currentCigKofte = 0;
  game.materialCost = 1000;
  game.hasAutoBuyer = false;
  game.autoBuyerCost = 15000;
  game.autoBuyerShow = 2000;
  game.maxPrice = 20;
  game.minPrice = 1;
  game.sellIndex = 5;
  game.upgradePrice = 500000;
  game.level = 1;

  // reset ingredients class
  ingredients.hasMarul = false;
  ingredients.hasTursu = false;
  ingredients.hasLimon = false;
  ingredients.hasYesillik = false;
  ingredients.hasNar = false;

  // reset helpers class
  helpers.hasErrandBoy = false;
  helpers.errandBoysPrice = 500;
  helpers.currentErrandBoy = 0;

  helpers.hasMaster = false;
  helpers.mastersPrice = 1250;
  helpers.currentMaster = 0;

  localStorage.setItem("isCompanyWork", 0);
  localStorage.setItem("totalEarnedMoney", 0);
  localStorage.setItem('sellIndex', 5);
  localStorage.setItem('level', 1);

  // game
  materialArea.innerHTML = `${game.material}`;
  moneyArea.innerHTML = `${game.money}₺`;
  currentCigKofteArea.innerHTML = `${game.currentCigKofte}`;
  makedCigKofteArea.innerHTML = `${game.makedCigKofte}`;
  cigKofteFeeArea.innerHTML = `${game.cigKofteFee}₺`;
  materialCost.innerHTML = `${game.materialCost}₺`;
  autoBuyerCostArea.innerHTML = `${game.autoBuyerCost}₺`;
  errandBoysPriceArea.innerHTML = `${helpers.errandBoysPrice}₺`;
  errandBoysAmountArea.innerHTML = `Mevcut: ${helpers.currentErrandBoy}`;
  mastersPriceArea.innerHTML = `${helpers.mastersPrice}₺`;
  mastersAmountArea.innerHTML = `Mevcut: ${helpers.currentMaster}`;

  // nar
  nar.innerHTML = `<span>${ingredients.narsPrice}₺</span> <button id="buyNar" style="margin-left: 12px;">Satin Al!</button>`;
  document
    .querySelector("#buyNar")
    .addEventListener("click", ingredients.buyNar);

  // marul
  marul.innerHTML = `<span>${ingredients.marulsPrice}₺</span> <button id="buyMarul" style="margin-left: 12px;">Satin Al!</button>`;
  document
    .querySelector("#buyMarul")
    .addEventListener("click", ingredients.buyMarul);
  // limon
  limon.innerHTML = `<span>${ingredients.lemonsPrice}₺</span> <button id="buyLimon" style="margin-left: 12px;">Satin Al!</button>`;
  document
    .querySelector("#buyLimon")
    .addEventListener("click", ingredients.buyLemon);
  // yesillik
  yesillik.innerHTML = `<span>${ingredients.yesilliksPrice}₺</span> <button id="buyYesillik" style="margin-left: 12px;">Satin Al!</button>`;
  document
    .querySelector("#buyYesillik")
    .addEventListener("click", ingredients.buyYesillik);
  // tursu
  tursu.innerHTML = `<span>${ingredients.tursusPrice}₺</span> <button id="buyTursu" style="margin-left: 12px;">Satin Al!</button>`;
  document
    .querySelector("#buyTursu")
    .addEventListener("click", ingredients.buyTursu);

  gameArea.style.display = "none";
  startArea.style.display = "block";

  location.reload();
};

resetButton.addEventListener("click", () => {
  confirmDOM.style.visibility = "visible";
});
closeConfirmBtn.addEventListener("click", () => {
  confirmDOM.style.visibility = "hidden";
});

refuseConfirmBtn.addEventListener("click", () => {
  confirmDOM.style.visibility = "hidden";
});

confirmBtn.addEventListener("click", resetGame);

upgradeBTN.addEventListener('click', (e) => {
  if(!e.currentTarget.classList.contains('disabled')) {
    game.upgradeCoop();
  }
});

confirmDOM.addEventListener("click", (e) => {
  if (e.target.classList.contains("confirm")) {
    confirmDOM.style.visibility = "hidden";
  }
});

// localStorage.clear();

/*
                YAPILACAKLAR LISTESI

      - SATIN ALMA MUDURUNU DURDURUP BASLATMA BUTONU
*/

if (localStorage.getItem("totalEarnedMoney")) {
  game.totalEarnedMoney = parseInt(localStorage.getItem("totalEarnedMoney"));
} else {
  game.totalEarnedMoney = game.money;
}

const rankingListArea = document.querySelector('.ranking-list');

function addDots(number) {
  let array = JSON.stringify(number).split('').reverse();
  let newNumber = '';

  for(let x = array.length - 1; x > -1; x--) {
    newNumber += array[x];

    if(x % 3 == 0 && x != 0) {
      newNumber += '.';
    }
  }
  
  return newNumber;
}

function updateRanking() {
  let users = [];

  get(ref(db, "APP/USERS")).then((snapshot) => {
    users = snapshot.val();

    if(localStorage.getItem('operationName')) {
      let user = null;

      operationName = localStorage.getItem('operationName');

      users.map((u) => {
        if(u.title == operationName) {
          u.totalMakedCigKofte = game.makedCigKofte;
          u.level = game.level;
          u.currentMoney = game.money;
          user = u;
        }
      });

      user.money = game.totalEarnedMoney;
    }

    set(ref(db, "APP/USERS"), users).then(() => {
      // update ranking
      rankingListArea.innerHTML = `<div class="ranking-title">RANKING</div>`;
      let sortedUsers = users.sort((a, b) => b.money - a.money);

      sortedUsers.map((user, index) => {
        let div = document.createElement('div');
        div.className = "ranking-item";

        div.innerHTML = `
        <div class="item-rank">${index + 1}</div>
        <div class="item-name">${user.title} (${user.level} Level) <span class="item-start-date">(${user.createDate[0]}.${user.createDate[1] + 1}.${user.createDate[2]} ${user.createDate[3]}:${user.createDate[4]})</span></div>
        <div class="item-money">${addDots(user.money)}₺ ${user.totalMakedCigKofte ? "/ " + addDots(user.totalMakedCigKofte) + " Cig Kofte" : ""} ${user.currentMoney ? " / " + addDots(user.currentMoney) + "₺" : ""}</div>`

        rankingListArea.appendChild(div);
      });

    }).catch((err) => {
      console.log(err);
    });
  });
}

updateRanking();
setInterval(() => {
 updateRanking(); 
}, 10000);