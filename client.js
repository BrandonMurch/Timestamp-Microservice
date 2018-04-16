/*
@description - Express app to control routing. Inputs that contain either a
               unix time, or date/hour will return a JSON data with both.
@author - Brandon - Brandon.Murch@protonmail.com
*/

const express = require('express');
const path = require('path');
const app = express();
let inputMonth, inputDay, inputYear;
let months = [
  'january',
  'jan',
  'february',
  'feb',
  'march',
  'mar',
  'april',
  'apr',
  'may',
  'june',
  'jun',
  'july',
  'jul',
  'august',
  'aug',
  'september',
  'sep',
  'october',
  'oct',
  'november',
  'nov',
  'december',
  'dec'
];

const checkTime = (input) => {
  let timeRegExp = /(\d+):(\d{2}):(\d{2})/gi; //dd:dd:dd || d:dd:dd
  let time = timeRegExp.exec(input);
  if (time) {
    let hours = time[1];
    let minutes = time[2];
    let seconds = time[3];
    if (hours < 24 && minutes <= 60 && seconds <= 60) return time[0];
  }
}

const checkYear = (input) => {
  let yearRegExp = /([\d])+$/gi
  let year = yearRegExp.exec(input)
  //Add 20 if only two digits are inputed (e.g. 17 becomes 2017)
  if (year) return (year[0].length == 2 ? '20' + year[0] : year[0]);
};

const checkMonth = (input) => {
  for (i = 0; i < months.length; i++) {
    if (input.toLowerCase().includes(months[i].toLowerCase())) return months[i];
  };
};

const checkDay = (input) => {
  let dayRegExp = /(?!\D)([\d]{1,2})(?:[^\n\d])/ig; // two digits surrounded by non-digit characters
  let day = dayRegExp.exec(input);
  if (day && day[1] < 31) return day[1]; // ensure the date is not over 31
};

const checkString = (input) => {
  inputTime = checkTime(input);
  inputMonth = checkMonth(input);
  inputYear = checkYear(input);
  inputDay = checkDay(input);
  if (!inputMonth || !inputDay || !inputYear) return false;
  else return true;
};

const calcDate = (input) => {
  if (input.length > 0) {
    // check for a unix time.
    if ((Number(input)) % 1 === 0) {
      let date = new Date(Number(input * 1000));
      return {
        'Unixtime': date.getTime() / 1000,
        'Natural time': date.toString()
      }
    } // returns current time
    else if (input.toString().toLowerCase() == 'now') {
      let date = new Date();
      return {
        'Unixtime': date.getTime() / 1000,
        'Natural time': date.toString()
      }
    } else if (checkString(input)) { // for natural time.
      let inputDate = (inputTime ? inputTime : '') + ' ' + inputMonth + ' ' + inputDay + ' ' + inputYear;
      let date = new Date(inputDate);
      return {
        'Unixtime': date.getTime() / 1000,
        'Natural time': date.toString()
      }
    } else {
      return { // for invalid input.
        'Unixtime': null,
        'Natural time': null
      }
    }
  }
};
// public file folder
app.use(express.static(__dirname + '/build'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/build/index.html'));
});

app.get('/:date', (req, res) => {
  let response = calcDate(req.params.date);
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(response));
});

app.listen(3000);
