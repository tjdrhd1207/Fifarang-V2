import axios from 'axios';

async function httpRequest(requestMethod, requestUrl, resquestBody, exception = false) {
    let responseData = "";

    console.log(`METHOD : ${requestMethod} `);
    console.log(`requestBody : ${resquestBody}`);
    let requestApiUrl = '';
    if (!exception) {
        requestApiUrl = `https://open.api.nexon.com${requestUrl}=${resquestBody}`;
    } else {
        requestApiUrl = `https://fco.dn.nexoncdn.co.kr${requestUrl}`;
    }
    const requestOptions = {};

    await axios(requestApiUrl, requestOptions)
    .then((response) => {
        responseData = response.data;
    })
    .catch((error) => {
        console.log("에러");
        console.log(error);
    });
    return responseData;
}

export {httpRequest}