function checkUsername (val) {
  return val.length >= 3;
}

function checkIfNotEmpty (val) {
  return val.length > 0;
}

function checkPassword (val) {
  return val.length > 4;
}

let usernameValidators = [
  {
    validator: checkUsername,
    msg: 'Username should be at least 3 characters long!'
  }
];

let emailValidators = [
  {
    validator: checkIfNotEmpty,
    msg: 'Email should not be empty'
  }
];

let passwordValidator = [
  {
    validator: checkPassword,
    msg: 'Password should be at least 4 characters long!'
  }
];

module.exports = {
  username: usernameValidators,
  email: emailValidators,
  password: passwordValidator
};
