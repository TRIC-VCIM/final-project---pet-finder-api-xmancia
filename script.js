// input to the function callAPI is the URL you want to use in the API - in the then function you process the data.
// I put a simple console.log in these examples so you can see the return object in the console.

callAPI('https://api.petfinder.com/v2/organizations?location=44118').then(function (data) {
    console.log('location', data);

});

callAPI('https://api.petfinder.com/v2/animals').then(function (data) {
    console.log('pets', data);

});









// function for accessing the API - it requires the use of a token, so there are two calls to the API
// the first is to get the token, the second is to use the URL to get the results you are looking for.
async function callAPI(url) {
    var key = 'O3aa1o0gGzt7MPGOpswgygDjeEWoVuYfRzMY9DNst3a7YBvMBh';
    var secret = 'dB4014srUTEDplW3izPO29cHUwl3p1h3FaZhn15x';

    let tokenResult = fetch('https://api.petfinder.com/v2/oauth2/token', {
        method: 'POST',
        body: 'grant_type=client_credentials&client_id=' + key + '&client_secret=' + secret,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    });

    let response = await tokenResult;
    let data = await response.json();

    let apiCall = await fetch(url, {
        headers: {
            'Authorization': data.token_type + ' ' + data.access_token,
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    });

    let responseAPI = await apiCall;
    let dataAPI = await responseAPI.json();

    return dataAPI;
}