const axios = require('axios');

const API_PATH = 'http://localhost:3000/api/v1';

const localApi = require('axios').create({
    baseURL: API_PATH
});

module.exports = { localApi };