import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

export default async function HttpClient(config = {
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Token ' + process.env.API_TOKEN,
    },
}) {

    async function post(url, data, callback) {
        try {
            const response = await axios.post(url, data, config);
            if (callback) callback(null, response);
        } catch (error) {
            if (callback) callback(error, null);
            console.log({
                title: 'Error in OrderConsumer',
                message: 'Error consuming third-party API',
                error: error.response?.data?.errors,
            });
        }
    }

    async function get(url, callback) {
        try {
            const response = await axios.get(url, config)
            if (callback) callback(null, response);
        } catch (error) {
            if (callback) callback(error, null);
            console.log({
                title: 'Error in OrderConsumer',
                message: 'Error consuming third-party API',
                error: error.response?.data?.errors,
            });
        }
    }

    async function put(url, data, callback) {
        try {
            const response = await axios.put(url, data, config);
            if (callback) callback(null, response);
        } catch (error) {
            if (callback) callback(error, null);
            console.log({
                title: 'Error in OrderConsumer',
                message: 'Error consuming third-party API',
                error: error.response?.data?.errors,
            });
        }
    }

    async function deleteRequest(url, callback) {
        try {
            const response = await axios.delete(url, config);
            if (callback) callback(null, response);
        } catch (error) {
            if (callback) callback(error, null);
            console.log({
                title: 'Error in OrderConsumer',
                message: 'Error consuming third-party API',
                error: error.response?.data?.errors,
            });
        }
    }

    return {
        post,
        get,
        put,
        delete: deleteRequest
    }
}