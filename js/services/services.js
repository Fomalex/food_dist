const postData = async (url, data) => {
    const res = await fetch(url, {
        method: 'POST',
        // headers прописываем только если исп-ем JSON, при FormData не нужно
        headers: {
            'Content-type': 'application/json'
        },
        body: data
    });

    return await res.json(); // если исп-ть формат JSON
    // return await res.text(); // если исп-ть formData
};

const getResource = async (url) => {
    const res = await fetch(url);

    if (!res.ok) {
        throw Error(`Could not fetch ${url}, status: ${res.status}`);
    }

    return await res.json();
};

export {postData};
export {getResource};