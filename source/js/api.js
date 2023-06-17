import { showConnectionError } from './util.js';

const getData = (onSuccess) => {
  fetch('https://23.javascript.pages.academy/kekstagram/data')
    .then((response) => {
      if (response.ok === true) {
        return response.json()
      }
      showConnectionError('Не удалось загрузить данные с сервера')
    })
    .then((json) => {
      onSuccess(json);
    });
};

const sendData = (userForm, onSuccess, onFail) => {
  userForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    fetch('https://23.javascript.pages.academy/kekstagram',
      {
        method: 'POST',
        body: new FormData(userForm),
      },
    )
      .then((response) => {
        if (response.ok === true) {
          onSuccess();
        } else {
          onFail();
        }
      })
      .catch(() => {
        onFail();
      })
  })

};

export { getData, sendData };
