export function sendRequest(method, url, onLoadDone, onError, data) {
    const xhr = new XMLHttpRequest();

    xhr.open(method, `http://localhost:3000${url}`);
    xhr.setRequestHeader("Content-type", "application/json; charset=utf-8");

    xhr.onload = function () {
        //  получили ответ от бекенда, парсим
        let response;

        try {
            // ответ от сервера всегда должен быть правильным JSON
            // если нет, то значит что-то сильно сломано и это нештатная ситуация.
            response = JSON.parse(xhr.response);
        } catch (e) {
            // что-то пошло не так, выводим ошибку и вызываем колбек ошибки
            console.error(`Unable to parse response from server: '${xhr.response}'`);
            onError();
        }

        // и возвращаем распаршеный результат вызовом колбека
        onLoadDone(response);
    };

    xhr.onerror = function () {
        // что-то пошло не так, колбек ошибки
        onError();
    };

    // самое важное - отправляем запрос
    xhr.send(data);
}

