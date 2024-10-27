
import {useState, useCallback} from 'react';
import axios from 'axios';
import { apiKey } from '../utils/data-key';

const useHttpRequest = () => {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchData = useCallback(async(requestUrl, requestMethod = 'get', reqValue, exception = false) => {
        setIsLoading(true);
        let requestApiUrl = '';
        try {
            console.log(`METHOD : ${requestMethod}`);
            console.log(`requestBody : ${reqValue}`);
            if (!exception) {
                requestApiUrl = `https://open.api.nexon.com${requestUrl}`;
            } else {
                requestApiUrl = `https://fco.dn.nexoncdn.co.kr${requestUrl}`;
            }
            const requestHeader = {
                [apiKey.key] : apiKey.value
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
                console.log('사진조회');
                url = `${requestApiUrl}`;
            }
            let response = null;

            if (requestMethod.toLowerCase() === 'get') {
                console.log('get조회');
                response = await axios.get(url, { headers: requestHeader, withCredentials: true });
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
            console.error(err); // Log the error
            setError(err);    
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