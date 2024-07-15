import { API_URL } from './config';

export const changePassword = async (userId, currentPassword, newPassword) => {
  try {
    const response = await fetch(`${API_URL}/change_password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        user_id: userId, 
        current_password: currentPassword, 
        new_password: newPassword 
      }),
    });

    if (!response.ok) {
      throw new Error('Password change failed');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error during password change:', error);
    throw error;
  }
};