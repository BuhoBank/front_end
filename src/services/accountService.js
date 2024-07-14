import {API_URL} from './config'

export const createBankAccount = async () => {
  try {
    const response = await fetch(`${API_URL}/create_bank_account`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Aquí puedes agregar headers adicionales si son necesarios, como un token de autenticación
      },
      // Puedes agregar un cuerpo a la solicitud si es necesario
      // body: JSON.stringify({}),
    });

    if (!response.ok) {
      throw new Error('Error en la respuesta del servidor');
    }

    const data = await response.json();
    return { success: true, data };
  } catch (error) {
    console.error('Error al crear la cuenta bancaria:', error);
    return { success: false, error: error.message };
  }
};
