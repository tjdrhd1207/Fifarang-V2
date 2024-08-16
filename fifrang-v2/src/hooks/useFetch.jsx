
import {useState, useCallback} from 'react';
import axios from 'axios';
import { apiKey } from '../utils/data-key';

const useHttpRequest = () => {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchData = useCallback(async(requestUrl, requestMethod = 'get', reqValue) => {
        setIsLoading(true);

        try {
            console.log(`METHOD : ${requestMethod}`);
            console.log(`requestBody : ${reqValue}`);
            const requestApiUrl = `https://open.api.nexon.com${requestUrl}`;
            const requestHeader = {
                [apiKey.key] : apiKey.value
            };
            let url = requestApiUrl;

            if (reqValue && typeof reqValue === 'object') {
                console.log('하모');
                const queryString = new URLSearchParams(reqValue).toString();
                url = `${requestApiUrl}?${queryString}`;    
            } else if (reqValue) {
                url = `${requestApiUrl}=${reqValue}`;
            }
            console.log('----------url======');
            console.log(url)
            let response = null;

            if (requestMethod.toLowerCase() === 'get') {
                response = await axios.get(url, { headers: requestHeader });
            } else {
                response = await axios({
                    method: requestMethod,
                    url: requestApiUrl,
                    headers: requestHeader,
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