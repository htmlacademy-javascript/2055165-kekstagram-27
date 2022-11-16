const getData = async (onSuccess, onFail) => {
  try {
    const response = await fetch('https://27.javascript.pages.academy/kekstagram/data');
    let photoObjects;
    if (response.ok) {
      photoObjects = await response.json();
    } else {
      throw new Error(`${response.status} ${response.statusText}`);
    }
    return await onSuccess(photoObjects);
  } catch (error) {
    return onFail();
  }
};

const sendData = async (onSuccess, onFail, body) => {
  try {
    const response = await fetch('https://27.javascript.pages.academy/kekstagra',
      {
        method: 'POST',
        body,
      });
    if (response.ok) {
      onSuccess();
    } else {
      throw new Error(`${response.status} ${response.statusText}`);
    }
  } catch (error) {
    return onFail();
  }
};

export {getData, sendData};

