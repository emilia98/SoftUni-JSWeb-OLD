$(() => {
  let submitBtn = $('#submit-btn');
  let updateBtn = $('#update-btn');
  let deleteBtn = $('#delete-btn').parent();

  let successBox = $('<div>');
  let successMsg = $('<h2>');
  successBox.attr('id', 'succssesBox');
  successMsg.attr('id', 'succssesMsg');
  successMsg.appendTo(successBox);

  let errBox = $('<div>');
  let errorMsg = $('<h2>');
  errBox.attr('id', 'errBox');
  errorMsg.attr('id', 'erMsg');
  errorMsg.appendTo(errorMsg);

  updateBtn.click(function (e) {
    e.preventDefault();

    let actionUrl = updateBtn.parent().attr('action');
    let form = new FormData(updateBtn.parent()[0]);

    $.ajax({
      url: actionUrl,
      type: 'PUT',
      data: form,
      async: false,
      cache: false,
      contentType: false,
      processData: false,
      success: function (response) {
        $(successMsg).text(response.message);
        successBox.insertAfter($('header'));
        titleMsg.text('');
        authorMsg.text('');
        yearMsg.text('');
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
      }
    });
  });

  deleteBtn.click(function (e) {
    e.preventDefault();
    let url = $(this).attr('href');

    $.ajax({
      url: url,
      type: 'DELETE',
      success: function (response) {
        errBox.detach();
        $(successMsg).text(response.message);
        successBox.insertAfter($('header'));
        redirectTimer();
      },
      error: (err) => {
        let message = err.responseJSON.message;
        $(errorMsg).text(message);
        errBox.insertAfter($('header'));
      }
    });
  });

  let titleMsg = $('#title-msg');
  let yearMsg = $('#year-msg');
  let authorMsg = $('#author-msg');
  let imageMsg = $('#image-msg');

  function redirectTimer () {
    return setTimeout(() => {
      window.location.href = '/books';
    }, 2000);
  }

  submitBtn.click(function (e) {
    e.preventDefault();
    let form = new FormData (submitBtn.parent()[0]);

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
        titleMsg.text('');
        authorMsg.text('');
        yearMsg.text('');
        imageMsg.text('');
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

        if (messages.image) {
          imageMsg.text('*' + messages.image);
        } else {
          imageMsg.text('');
        }
      }
    });
  });
});
