/**
 * Realiza una solicitud de tipo GET a la URL proporcionada y devuelve los datos obtenidos.
 * @param {string} url - La URL a la que se realizará la solicitud GET.
 * @returns {Promise} - Una promesa que resuelve en los datos obtenidos de la solicitud.
 */
async function fetchGET(url) {
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error.message);
    throw error;
  }
}

/**
 * Realiza una solicitud de tipo POST a la URL proporcionada con los datos especificados y devuelve la respuesta.
 * @param {string} url - La URL a la que se realizará la solicitud POST.
 * @param {Object} data - Los datos que se enviarán en el cuerpo de la solicitud.
 * @returns {Promise} - Una promesa que resuelve en la respuesta de la solicitud POST.
 */
async function fetchPOSTapi(url, data) {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error('Error:', error.message);
    throw error;
  }
}

/**
 * Realiza una solicitud de tipo PATCH a la URL proporcionada con los datos especificados y devuelve la respuesta.
 * @param {string} url - La URL a la que se realizará la solicitud PATCH.
 * @param {Object} data - Los datos que se enviarán en el cuerpo de la solicitud.
 * @returns {Promise} - Una promesa que resuelve en la respuesta de la solicitud PATCH.
 */
async function fetchPATCHapi(url, data) {
  try {
    const response = await fetch(url, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error('Error:', error.message);
    throw error;
  }
}

/**
 * Realiza una solicitud de tipo DELETE a la URL proporcionada y devuelve la respuesta.
 * @param {string} url - La URL a la que se realizará la solicitud DELETE.
 * @returns {Promise} - Una promesa que resuelve en la respuesta de la solicitud DELETE.
 */
async function fetchDELETEapi(url) {
  try {
    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error('Error:', error.message);
    throw error;
  }
}

// Exporta las funciones para su uso en otros módulos.
export {
  fetchDELETEapi,
  fetchGET,
  fetchPOSTapi,
  fetchPATCHapi,
};
