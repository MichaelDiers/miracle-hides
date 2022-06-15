const showPage = (html, initialize) => {
    const oldCursor = document.body.style.cursor;
    document.body.style.cursor = 'wait';

    document.querySelector('main').innerHTML = html;
    initialize()
        .catch((err) => console.log(err))
        .finally(() => document.body.style.cursor = oldCursor);
};
