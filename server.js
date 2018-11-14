const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
var app = express();

hbs.registerPartials(__dirname + '/views/partials');

app.use((req, res, next) => {
	var now = new Date().toString();

	var log = `${now}: ${req.method} ${req.url}`;
	console.log(log);
	fs.appendFile('server.log', log + '\n', (err) => {
		if (err) {
			console.log(err);
		}
	});

	next();
});

/*app.use((req, res, next) => {
	res.render('maintanance.hbs');
});*/

app.use(express.static(__dirname + '/public'));

app.set('view engine', 'hbs');

hbs.registerHelper('getCurrentYear', () => {
	return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
	return text.toUpperCase();
});


app.get('/', (req, res) => {
	//res.send('Hello world!');
	res.render('home.hbs', {
		pageTitle: 'Home page'
	});
});

app.get('/about', (req, res) => {
	//res.send('<h1>About page</h1>');
	res.render('about.hbs', {
		pageTitle: 'About page',
		currentYear: new Date().getFullYear()
	});
});

app.get('/bad', (req, res) => {
	res.send({'errorMessage': 'Bad request!'});
});

/*app.get('/maintanance', (req, res) => {

});*/

app.listen(3000, () => {
	console.log('Server up and running.');
});