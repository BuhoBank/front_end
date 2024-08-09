import { API_URL } from './config';

export const sendTransferServiceData = async (transferData) => {
  try {
    const response = await fetch(`${API_URL}/pay_bill`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(transferData)
    });

    if (!response.ok) {
      throw new Error('Error en la respuesta del servidor');
    }

    const data = await response.json();
    return { success: true, data };
  } catch (error) {
    console.error('Error al enviar los datos del pago de servicio:', error);
    return { success: false, error: error.message };
  }
};