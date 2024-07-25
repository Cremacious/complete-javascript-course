'use strict';

// fixedURL = 'https://countries-api-836d.onrender.com/countries/';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////

const renderCountry = function (data, className = '', languages, currencies) {
  const html = `<article class="${className}">
                <img class="country__img" src="${data.flags.svg}" />
                <div class="country__data">
                  <h3 class="country__name">${data.name.official}</h3>
                  <h4 class="country__region">${data.region}</h4>
                  <p class="country__row"><span>👫</span>${(
                    +data.population / 1000000
                  ).toFixed(1)} Million People</p>
                  <p class="country__row"><span>🗣️</span>${languages[0]}</p>
                  <p class="country__row"><span>💰</span>${currencies[0].name}
                </div>
              </article>`;
  countriesContainer.insertAdjacentHTML('beforeend', html);
  // countriesContainer.style.opacity = 1;
};

// const request = fetch('https://restcountries.com/v3.1/name/mexico');

const renderError = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
  // countriesContainer.style.opacity = 1;
};

const getJSON = function (url, errorMsg = 'Something went wrong') {
  return fetch(url).then(response => {
    if (!response.ok) throw new Error(`${errorMsg} ${response.status}`);
    return response.json();
  });
};

const getCountryData = function (country) {
  getJSON(
    `https://restcountries.com/v3.1/alpha/${neighbour}`,
    'Country not found'
  )
    .then(data => {
      renderCountry(
        data[0],
        '',
        Object.values(data[0].languages),
        Object.values(data[0].currencies)
      );
      const neighbour = data[0].borders[0];
      if (!neighbour) throw new Error('No neighbour found!');
      return getJSON(
        `https://restcountries.com/v3.1/alpha/${neighbour}`,
        'Country not found'
      );
    })

    .then(response => response.json())
    .catch(err => {
      console.log(error);
      renderError(`Something went wrong! ${err.message}. Try again!`);
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};

btn.addEventListener('click', function () {
  getCountryData('france');
});

getCountryData('fsdasd');
