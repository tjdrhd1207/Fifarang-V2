
import {useState, useCallback} from 'react';
import axios from 'axios';
import { apiKey } from '../utils/data-key';

const useHttpRequest = () => {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchData = useCallback(async(requestUrl, requestMethod = 'get', userId) => {
        setIsLoading(true);

        try {
            console.log(`METHOD : ${requestMethod}`);
            console.log(`requestBody : ${userId}`);
            const requestApiUrl = `https://open.api.nexon.com${requestUrl}=${userId}`;
            const requestHeader = {
                [apiKey.key] : apiKey.value
            };

            axios.get(requestApiUrl, { headers: requestHeader }).then((res) => {
                setData(res.data);
            }).catch((err) => {
                console.log(err);
                setError(err);
            });
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