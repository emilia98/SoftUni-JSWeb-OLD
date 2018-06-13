$(() => {
    let submitBtn = $('#submit-btn');
    //let homeBtn = $('#home-btn');
    //let div = $('<h1>');

    let successBox = $('<div>');
    let successMsg = $('<h2>');
    successBox.attr('id', 'succssesBox');
    successMsg.attr('id', 'succssesMsg');
    successMsg.appendTo(successBox);

    //div.attr('id', 'cm-message');

    let titleMsg = $('#title-msg');
    let yearMsg = $('#year-msg');
    let authorMsg = $('#author-msg');
    let imageMsg = $('#image-msg');

    //let timer;

    function redirectTimer() {
        return setTimeout(() => {
            //window.location.href = '/books';
            window.location.href = '/books';
            /*
            $.ajax({
                url: '/books',
                type: 'GET',
                //dataType: 'json', // added data type
                success: function () {
                    window.location.href = '/books';
                    //window.location.href = '/books',
                },
                error: (err) => {
                  window.location.href = '/not-found';
                  console.log(err);
                }
            });*/
        }, 2000);
    }

    /*
    submitBtn.click((e) => {
        e.preventDefault();
    });*/
    /*
    homeBtn.click(function(e){
        e.preventDefault();

        $.ajax({
            url: 'http://localhost:5000/home',
            type: 'POST',
            dataType: 'json',
            success: function(data) {
                div.text(data.message);
                div.appendTo($('body'));
            },
            error: (err) => {
                console.log(err)
            }
        });
    });
*/
  submitBtn.click(function(e) {
    e.preventDefault();
    let form = new FormData(submitBtn.parent()[0]);

    $.ajax({
      url: 'http://localhost:5000/books',
      type: 'POST',
      data: form,
      async: false,
      cache: false,
      contentType: false,
      enctype: 'multipart/form-data',
      processData: false,
      success: function (response) {
          $(successMsg).text(response.message);
          successBox.insertAfter($('header'));
          redirectTimer();
          
      },
      error: (err) => {
        let messages = err.responseJSON;

        if (messages.title) {
            titleMsg.text('*' + messages.title);
        } else {
            titleMsg.text('');
        }
        
        if (messages.author) {
            authorMsg.text('*' + messages.author);
        } else {
            authorMsg.text('');
        }

        if (messages.year) {
            yearMsg.text('*' + messages.year);
        } else {
            yearMsg.text('');
        }

        if(messages.image) {
            imageMsg.text('*' + messages.image);
        } else {
            imageMsg.text('');
        }
      }
    });
  });

    /*
    $("form").submit(function(evt){	 
        evt.preventDefault();
        var formData = new FormData($(this)[0]);
     $.ajax({
         url: 'fileUpload',
         type: 'POST',
         data: formData,
         async: false,
         cache: false,
         contentType: false,
         enctype: 'multipart/form-data',
         processData: false,
         success: function (response) {
           alert(response);
         }
     });
     return false;*/
     /*
    $.ajax({
        url: 'http://localhost:5000/books',
        type: 'POST',
        data: JSON.stringify({
            name: 'asfasfsaf'
        }),
        dataType: 'json',
        success: function(data) {
            //console.log(data);
            div.text(data.message);
            div.appendTo($('body'));
        },
        error: (err) => {

            //console.log(err);
            div.text(err.message);
            div.appendTo($('body'));
        }
    });
*/
   
});