import { API_URL } from './config'
export const register = async (userData) => {
    try {
        const response = await fetch(`${API_URL}/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });

        if (!response.ok) {
            throw new Error('Registration failed')
        }
        return await response.json();
    }catch(error){
        console.error('Error during registration', error);
        throw error;
    }
};