import axios from 'axios';

async function httpRequest(requestMethod, requestUrl, resquestBody) {
    let responseData = "";

    console.log(`METHOD : ${requestMethod} `);
    console.log(`requestBody : ${resquestBody}`);

    const requestApiUrl = `https://open.api.nexon.com${requestUrl}=${resquestBody}`;
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