const express = require('express');
const app = express();

const countries = require('../client/src/countries.json');

// console.log(countries);

app.get('/api/countries', (req, res) => {
    res.json(countries);
});

const getCountryByCode = cca3 => countries.find(country => country.cca3 === cca3);

app.get('/api/countries/:countryCode', (req, res) => {
    const country = { ...getCountryByCode(req.params.countryCode) };
    console.log('before', country);
    country.borders = country.borders.map(cca3 => getCountryByCode(cca3));
    console.log('after', country);

    res.json(country);
})

app.listen(5555, () => {
    console.log('Server listening on 5555');
});