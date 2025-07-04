const sURL = '/support/Support/ajax_getdate';
const oParams = { 
	iVar1 : 1, 
	sVar2 : 'abc'
};

// send the request & don't handle the reply
fetch(sURL);


// fetch().then()
fetch(
	sURL, 
	{
		method : 'POST',
		body : JSON.stringify(oParams),
		headers: {'Content-type': 'application/json; charset=UTF-8'}}
)
	.then(response => { return response.text() })
	.then(data => { console.log('Data received:', data) });


// await( await fetch() ).text()
const response = await fetch(
	sURL, 
	{
		method: 'POST',
		body : JSON.stringify(oParams),
		headers: { 'Content-type': 'application/json; charset=UTF-8' }
	}
);
console.log(await response.text());

await (await fetch(sURL)).text();
console.log(await (await fetch(sURL)).text());


// jQuery
// the loaded page should have loaded jQuery (AJAX) library
// $.get(
$.post(sURL, oParams, function ( sData ) { alert('page content: ' + sData); });