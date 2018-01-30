var axios = require('axios')

var axiosInstance = axios.create(
    {
        baseURL: 'http://localhost:3000',
        withCredentials : true
    }
)

module.exports = axiosInstance
