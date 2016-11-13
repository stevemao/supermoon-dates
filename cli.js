#!/usr/bin/env node
'use strict';
const meow = require('meow');
const supermoonDates = require('./');

const cli = meow([
	'Usage',
	'  $ supermoon-dates [date]',
	'',
	'Options',
	'  --phase  lunar phase (full, new or both). [Default: both]',
	'',
	'Examples',
	'  $ supermoon-dates',
	'  The next supermoon since November 13 2016 is on Monday, November 14 2016 when the Moon is full Moon and at a distance of, approximately, 356,511 km from Earth.',
	'  $ supermoon-dates --phase full',
	'  The next supermoon since November 13 2016 (full Moon) is on Monday, November 14 2016 at a distance of, approximately, 356,511 km from Earth.'
]);

const input = cli.input[0];
const date = input ? new Date(input) : new Date();
const phase = cli.flags.phase;

let supermoon;

supermoonDates.some(moon => {
	if (new Date(moon['perigee-date']) > date) {
		supermoon = moon;
		return true;
	}
});

function highlight(str) {
	return `\u001B[35m${str}\u001B[39m`;
}

console.log(`The next supermoon (${highlight(supermoon.phase)}) since ${date} is on ${highlight(supermoon.date)} at a distance of, approximately, ${highlight(supermoon.distance)} km from Earth.`);
