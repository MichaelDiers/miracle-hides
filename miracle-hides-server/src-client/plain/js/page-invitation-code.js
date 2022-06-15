const showInvitationCodePage = () => {
    const html = `
        <h1>May I see your conformation code?</h1>
        <form action='/auth' method='post'>
            <label for='code'>Invitation Code</label>
            <input type='text' id='code' mame='code' maxlength='50' placeholder='acfc29b1-7ec5-4ac4-88c9-0f4ea83f8739' required autofocus>
            <input type='submit' value='submit'>
        </form>
    `;

    showPage(html, async () => {});
};
