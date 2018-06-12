$(() => {
    let submitBtn = $('#submit-btn');
    let homeBtn = $('#home-btn');
    let div = $('<h1>');
    div.attr('id', 'cm-message');

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
        console.log(response);
      },
      error: (err) => {
        div.text(err.responseJSON.message);
        div.appendTo($('body'));
        console.log(err.responseJSON.message);
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