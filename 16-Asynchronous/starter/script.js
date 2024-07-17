'use strict';

// fixedURL = 'https://countries-api-836d.onrender.com/countries/';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////

// const getCountryData = function (country) {
//   const request = new XMLHttpRequest();
//   request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
//   request.send();
//   request.addEventListener('load', function () {
//     const [data] = JSON.parse(this.responseText);
//     const languages = Object.values(data.languages);
//     const currencies = Object.values(data.currencies);
//     console.log(data);
//     const html = `<article class="country">
//             <img class="country__img" src="${data.flags.svg}" />
//             <div class="country__data">
//               <h3 class="country__name">${data.name.official}</h3>
//               <h4 class="country__region">${data.region}</h4>
//               <p class="country__row"><span>👫</span>${(
//                 +data.population / 1000000
//               ).toFixed(1)} Million People</p>
//               <p class="country__row"><span>🗣️</span>${languages[0]}</p>
//               <p class="country__row"><span>💰</span>${currencies[0].name}
//             </div>
//           </article>`;
//     countriesContainer.insertAdjacentHTML('beforeend', html);
//     countriesContainer.style.opacity = 1;
//   });
// };

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
  countriesContainer.style.opacity = 1;
};

// const getCountryAndNeighbor = function (country) {
//   const request = new XMLHttpRequest();
//   request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
//   request.send();
//   request.addEventListener('load', function () {
//     const [data] = JSON.parse(this.responseText);
//     const languages = Object.values(data.languages);
//     const currencies = Object.values(data.currencies);
//     renderCountry(data, '', languages, currencies);
//     const neighbour = data.borders?.[0];
//     const request2 = new XMLHttpRequest();
//     request2.open('GET', `https://restcountries.com/v3.1/alpha/${neighbour}`);
//     request2.send();
//     request2.addEventListener('load', function () {
//       const [data2] = JSON.parse(this.responseText);
//       renderCountry(
//         data2,
//         'neighbour',
//         Object.values(data2.languages),
//         Object.values(data2.currencies)
//       );
//     });
//   });
// };
// getCountryAndNeighbor('Germany');

const request = fetch('https://restcountries.com/v3.1/name/mexico');

const getCountryData = function (country) {
  fetch(`https://restcountries.com/v3.1/name/${country}`)
    .then(response => response.json())
    .then(data =>
      renderCountry(
        data[0],
        '',
        Object.values(data[0].languages),
        Object.values(data[0].currencies)
      )
    );
};

getCountryData('mexico');
