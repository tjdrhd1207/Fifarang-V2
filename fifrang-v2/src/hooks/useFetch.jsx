
import {useState, useCallback} from 'react';
import axios from 'axios';
import { apiKey } from '../utils/data-key';

const useHttpRequest = () => {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    const maxRetries = 5; // 최대 재시도 횟수
    let retryCount = 0;

    const fetchData = useCallback(async(requestUrl, requestMethod = 'get', reqValue, exception = false) => {
        setIsLoading(true);
        let requestApiUrl = '';
        try {
            // console.log(`METHOD : ${requestMethod}`);
            // console.log(`requestBody : ${reqValue}`);
            if (!exception) {
                requestApiUrl = `https://open.api.nexon.com${requestUrl}`;
            } else {
                requestApiUrl = `${requestUrl}`;
            }
            const requestHeader = {
                [apiKey.key] : apiKey.value,
            };
            let url = requestApiUrl;
            if (!exception) { 
                if (reqValue && typeof reqValue === 'object') {
                    const queryString = new URLSearchParams(reqValue).toString();
                    url = `${requestApiUrl}?${queryString}`;    
                } else if (reqValue) {
                    url = `${requestApiUrl}=${reqValue}`;
                }
            } else {
                url = `${requestApiUrl}`;
            }
            let response = null;

            if (requestMethod.toLowerCase() === 'get') {
                const config = exception ? { responseType: 'blob' } : {};
                response = await axios.get(url, { 
                    headers: requestHeader, 
                    withCredentials: true,
                    ...config
                });
            } else {
                response = await axios({
                    method: requestMethod,
                    url: requestApiUrl,
                    headers: requestHeader,
                    withCredentials: true,
                    data: reqValue
                });
            }
            setData(response.data);
        } catch (err) {
            console.log(err);
            if (error.response && error.response.status === 429) {
                console.warn('Rate limit exceeded. Retrying...');
                const retryAfter = parseInt(error.response.headers['retry-after']) || 2000; // 'Retry-After' 헤더 확인
                await delay(retryAfter);
                retryCount++;
              }
            // console.error(err); // Log the error
            // setError(err);
            // setData(null);
        } finally {
            setIsLoading(false);
        }
    }, []);

    // useEffect(() => {
    //     fetchData(requestBody);
    // }, [requestMethod, requestUrl, requestBody]);

    return { data, isLoading, error, fetchData };
}

export default useHttpRequest;