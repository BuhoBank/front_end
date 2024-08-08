import { API_URL } from './config';

export const getClientAccounts = async (clientID) => {
  try {
    const response = await fetch(`${API_URL}/client_accounts/${clientID}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        // Aquí puedes agregar headers adicionales si son necesarios, como un token de autenticación
      },
    });

    if (!response.ok) {
      throw new Error('Error en la respuesta del servidor');
    }

    const data = await response.json();
    return { success: true, data };
  } catch (error) {
    console.error('Error al obtener las cuentas del cliente:', error);
    return { success: false, error: error.message };
  }
};
