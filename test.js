var query = require('cli-interact').getYesNo;
var query2 = require('cli-interact').getChar
var answer = query('Is it true');
var answer2 = query2('what is your name?')
console.log('you answered:', answer);
console.log('you answered2:', answer2);
