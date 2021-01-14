// numbers API

// 1. favorite number is 15
let numbersURL = 'http://numbersapi.com';

axios
	.get(`${numbersURL}/15?json`)
	.then((res) => {
		console.log(res);
	})
	.catch((err) => {
		console.log(err);
	});

// 2. multiple numbers, put the facts from the request on the page
let luckyNums = [ 52, 21, 16 ];
axios
	.get(`${numbersURL}/${luckyNums}?json`)
	.then((res) => {
		console.log(res);
		$('body').append('<p>2.</p>');
		for (let num in res.data) {
			$('body').append(`<p>${res.data[num]} </p>`);
		}
	})
	.catch((err) => console.log(err));

// 3. multiple facts on the same number all resolvign at once
let numPromises = [];
for (let i = 0; i < 4; i++) {
	numPromises.push(axios.get(`${numbersURL}/15?json`));
}

Promise.all(numPromises)
	.then((resArr) => {
		console.log(resArr);
		$('body').append('<hr>');
		$('body').append('<p>3.</p>');
		for (let res of resArr) {
			$('body').append(`<p>${res.data.text}`);
		}
	})
	.catch((err) => console.log(err));
