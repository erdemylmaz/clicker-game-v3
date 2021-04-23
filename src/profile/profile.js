const app = document.querySelector('.profile');

let isCompanyWork = localStorage.getItem('isCompanyWork');

if(isCompanyWork == 1) {
  app.style.display = "block";

  const $companyName = document.querySelector('.company-name');
  const $since = document.querySelector('.since');
  const $totalEarnedMoney = document.querySelector('.total-earned-money');
  const $items = document.querySelector('.items');

  class Profile {
    // company name
    companyName = localStorage.getItem('operationName');

    //since
    addExtraZero = (x) => {
      return x < 10 ? "0" + x : x;
    }

    startHour = localStorage.getItem('startH');
    startMinute = localStorage.getItem('startM');
    startDay = localStorage.getItem('startDay');
    startMonth = localStorage.getItem('startMonth');
    startYear = localStorage.getItem('startYear');
    startTime = localStorage.getItem('startTime');

    currentTime = new Date().getTime();

    companyDay = Math.floor(((((this.currentTime - this.startTime) / 1000) / 60) / 60) / 24);

    dayDate = [this.addExtraZero(this.startDay), this.addExtraZero(this.startMonth), this.startYear].join('.');
    timeDate = [this.addExtraZero(this.startHour), this.addExtraZero(this.startMinute)].join(':');

    date = `${this.dayDate}, ${this.timeDate} (${this.companyDay} Gun)`;

    // total earned money
    totalEarnedMoney = localStorage.getItem('totalEarnedMoney');
  }

  const profile = new Profile();

  $companyName.textContent = profile.companyName;
  document.title = `${profile.companyName}'in Profili`;
  $since.textContent = profile.date;
  $totalEarnedMoney.textContent = `$${profile.totalEarnedMoney}`;

  if(localStorage.getItem('items')) {
    let items = JSON.parse(localStorage.getItem('items'));

    for(let x = 0; x < items.length; x++) {
        let div = document.createElement('div');
        div.className = "item";

        div.innerHTML = `${items[x]}`;

        if(items[x].name) {
          div.innerHTML = `${items[x].name} (${items[x].amount})`;
        }

        $items.appendChild(div);
    }
  }


} else {
  app.style.display = "none";
}
