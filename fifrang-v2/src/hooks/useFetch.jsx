
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
            const requestApiUrl = `https://open.api.nexon.com${requestUrl}=${reqValue}`;
            const requestHeader = {
                [apiKey.key] : apiKey.value
            };

            const response = await axios.get(requestApiUrl, { headers: requestHeader });
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