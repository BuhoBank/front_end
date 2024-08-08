import { API_URL } from './config';

export const sendTransferData = async (transferData) => {
  try {
    const response = await fetch(`${API_URL}/transfer`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Aquí puedes agregar headers adicionales si son necesarios, como un token de autenticación
      },
      body: JSON.stringify(transferData)
    });

    if (!response.ok) {
      throw new Error('Error en la respuesta del servidor');
    }

    const data = await response.json();
    return { success: true, data };
  } catch (error) {
    console.error('Error al enviar los datos de la transferencia:', error);
    return { success: false, error: error.message };
  }
};
