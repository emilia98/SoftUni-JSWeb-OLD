$(() => {
    const submit = $('#submit-btn');
    const replaceMe = $('#replaceMe');

    const memeTitle = $('#memeTitle');
    const memePoster = $('#memePoster');
    const publicStatus = $('#status');
    const privateStatus = $('#private-status');
    const memeDescription = $('#memeDescription');

    const msgDiv = $('<div>');
    const msgH2 = $('<h2>');


    submit.click((e) => {
        let error = false;
        e.preventDefault();

        let validMeme =  memeTitle.val().length > 0 &&
                         memePoster.val().length > 0 &&
                         (publicStatus.attr('checked') === 'checked' ||
                          privateStatus.attr('checked') === 'checked') &&
                          memeDescription.val().length > 0;


                          console.log(validMeme);
        if(validMeme) {
            msgDiv.attr("id", "succssesBox");
            msgH2.text("Movie Added");
            msgH2.attr("id", "succssesMsg");

            error = false;       
        } else {
            msgDiv.attr("id", "errBox");
            msgH2.text("Please fill all fields");
            msgH2.attr("id", "errMsg");
            errorBox = $('#errBox');

            error = true;
        }

        replaceMe.detach();
        msgDiv.append(msgH2);
        $('body').append(msgDiv);

        if(!error) {
            submit.unbind('click');
            let addBtn = $('<input type="submit" id="home" value="Home" />');
            let parent = submit.parent();
            submit.detach();
            parent.append(addBtn);
            addBtn.click(() => {

            });
        }
    });
});