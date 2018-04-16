# Timestamp Microservice

@Input

The website/API will take a time appended to the website or through the search bar.
The input format can either be a unix time:  
    e.g. website/40408585.  
It can be a written natural time. It must contain a month written as a string, a
month, and a day with the optional value of the exact time also being accepted.
Commas and ordinal indicators are optional.
    e.g. website/12:20:40(optional), December 24th, 2016
    or: website/dec 24 2016
Alternatively the website accepts 'now' and will return the current time.

@ReturningJSON

The website/API will return:

Example:

    {
      "Unixtime" : 1512860610,
      "Natural time" : "Sun Dec 10 2017 10:03:30 GMT+1100 (AEDT)"
    }

@SearchBar

  The search bar on the website will automatically take the user to website/input
  with input being whatever the user has entered. 
