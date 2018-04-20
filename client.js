/*
@description - Express app to control routing. Inputs that contain either a
               unix time, or date/hour will return a JSON data with both.
@author - Brandon - Brandon.Murch@protonmail.com
*/

const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 5000;
const app = express();

module.exports.checkTime = (input) => {
  let timeRegExp = /(\d+):(\d{2}):(\d{2})/gi; //dd:dd:dd || d:dd:dd
  let time = timeRegExp.exec(input);
  if (time) {
    let hours = time[1];
    let minutes = time[2];
    let seconds = time[3];
    if (hours < 24 && minutes <= 60 && seconds <= 60) return time[0];
  }
}

module.exports.checkYear = (input) => {
  let yearRegExp = /(?![\:])([\d]){4}/gi
  let year = yearRegExp.exec(input)
  //Add 20 if only two digits are inputed (e.g. 17 becomes 2017)
  if (year) return (year[0].length == 2 ? '20' + year[0] : year[0]);
};

module.exports.checkMonth = (input) => {
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
  for (i = 0; i < months.length; i++) {
    if (input.toLowerCase().includes(months[i].toLowerCase())) return months[i];
  };
};

module.exports.checkDay = (input) => {
  let dayRegExp = /(?:[ A-z])([\d]{1,2})(?:\D)/gi; // two digits surrounded by non-digit characters
  let day = dayRegExp.exec(input);
  if (day && day[1] < 31) return day[1]; // ensure the date is not over 31
};

module.exports.checkString = (input) => {
  let inputTime = this.checkTime(input);
  let inputMonth = this.checkMonth(input);
  let inputYear = this.checkYear(input);
  let inputDay = this.checkDay(input);
  if (!inputMonth || !inputDay || !inputYear) return false;
  else return (inputTime ? inputTime : '') + ' ' + inputMonth + ' ' + inputDay + ' ' + inputYear;
};

module.exports.calcDate = (input) => {
  if (input.length > 0) {
    // check for a unix time.
    let checkStringResult = this.checkString(input)
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
    } else if (checkStringResult) { // for natural time.
      let date = new Date(checkStringResult);
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
  let response = this.calcDate(req.params.date);
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(response));
});

app.listen(PORT, ()=>{
  console.log('Running');
});
