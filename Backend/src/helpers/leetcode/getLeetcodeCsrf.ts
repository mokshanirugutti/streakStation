import axios from 'axios';
import { CookieJar } from 'tough-cookie';
import { wrapper } from 'axios-cookiejar-support';

export const getLeetCodeCsrf = async () => {
    try {
        // Create a new cookie jar
        const cookieJar = new CookieJar();
        const client = wrapper(axios.create({ jar: cookieJar }));

        const response = await client.get('https://leetcode.com/', {
            headers: {
                "Content-Type": "application/json",
                
            },
        });

        // Log the cookies received in the response
        const cookies = cookieJar.getCookiesSync('https://leetcode.com/');
        console.log('Cookies received:', cookies);

        // Log the response data if needed
        console.log('Response data:', response.data);
    } catch (error) {
        console.error('Error making CSRF token request:', error);
    }
};