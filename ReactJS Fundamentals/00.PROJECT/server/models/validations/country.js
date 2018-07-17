function checkName (val) {
  return val.length > 0;
}

function checkISOCode (val) {
  return val.length === 2;
}

function checkAbbreviationLength (val) {
  return val.length > 0 && val.length <= 20;
}

function checkLatitude (val) {
  return val >= -90 && val <= 90;
}

function checkLongitude (val) {
  return val >= -180 && val <= 180;
}

let nameValidator = [
  {
    validator: checkName,
    msg: 'Country name cannot be empty!'
  }
];

let codeValidator = [
    {
        validator: checkISOCode,
        msg: 'ISO Country code should be exactly 2 characters long!'
    }
];

let abbreviationValidator = [
  {
    validator: checkAbbreviationLength,
    msg: 'Country abbreviation should be between 1 and 20 characters long!'
  }
];

let latitudeValidator = [
  {
    validator: checkLatitude,
    msg: 'Latitude should be between -90 and 90!'
  }
];

let longitudeValidator = [
  {
    validator: checkLongitude,
    msg: 'Longitude should be between -180 and 180!'
  }
];

module.exports = {
  name: nameValidator,
  code: codeValidator,
  abbreviation: abbreviationValidator,
  latitude: latitudeValidator,
  longitude: longitudeValidator
};
