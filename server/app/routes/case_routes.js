// routes/request_routes.js
var ObjectID = require('mongodb').ObjectID;
var path = require('path');
var fs = require('fs');
var child = require('child_process');
var request = require('request')

module.exports = function (app, db) {
	app.get('/api/comments/:urlId', (req, res) => {
		const options = {
			url: `https://syncplicity.zendesk.com/api/v2/tickets/${req.params.urlId}/comments.json?sort_order=desc&include=users`,
			method: 'GET',
			headers: {
				'Authorization': `Basic Z2RyYWduZXZAYXh3YXkuY29tOk9iaWNoYW1rb3RldG86OA==`
			}
		}

		function callback(error, response, body) {
			res.json(body)
		}

		request(options, callback)
	})
	app.get('/api/excel', (req, res) => {
		fs.readFile('C:\\Users\\gdragnev\\Desktop\\aeuoae\\syncplicity.log', 'utf8', function (err, contents) {
			//let gogo = contents.split(/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/)
			let montents = contents.split("*****")
			montents.forEach(montent => {
				let element = montent.split(/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/)
				return element
			})
			res.json(montents);
		});
	})

	app.get('/api/postFile', (req, res) => {
		let auth = Buffer.from('08652d3d-a922-4a41-94d7-4ab0e76d2c6a:7a778f9a-a16a-4ace-abdd-1236ac715b44').toString('base64')
		const options = {
			url: 'https://api.syncplicity.com/oauth/token',
			method: 'POST',
			headers: {
				'Authorization': `Basic ${auth}`,
				'Content-Type': 'application/x-www-form-urlencoded',
				'Sync-App-Token': 'CwmCQ8ise6MgUW+NtWwj3F3svAdn27M5DUjcVi6zirzTiP2qp/jPgFNrzSvncinp',
				'access-control-allow-origin': '*'
			},
			form: {
				grant_type: 'client_credentials'
			}
		};

		function callback(error, response, body) {
			console.log(response.statusCode)
			let token = JSON.parse(body)
			let options2 = {
				url: 'https://data.syncplicity.com/v2/mime/files?filepath=gogo.txt',
				method: 'POST',
				headers: {
					'Authorization': `Bearer ${token['access_token']}`,
					'AppKey': 'CwmCQ8ise6MgUW+NtWwj3F3svAdn27M5DUjcVi6zirzTiP2qp/jPgFNrzSvncinp'
				},
				formData: {
					sessionKey: `Bearer ${token['access_token']}`,
					virtualFolderId: '10387252',
					fileData: fs.createReadStream('gogo.txt'),
					sha256: '16af0577252ea2fc2b73260d8fe6a4e73155e9f83bb234588b561ab01c9bca6b'
				}
			}

			request(options2, callback2)
		}

		function callback2(error, response, body) {
			console.log(response.statusCode)
			console.log(body)
			const file = fs.createWriteStream("file");
			response.pipe(file)
		}

		request(options, callback);
		res.json('hello')
	})

	app.get('/api/today', (req, res) => {
		db.query(`SELECT * FROM today_view WHERE assignee = 'gdragnev';`, (error, results, fields) => {
			if (error) console.log(error)
			res.json(results);
		})
	})

	app.put('/api/today', (req,res) => {
		res.setHeader('Access-Control-Allow-Origin', 'localhost');
		db.query(`UPDATE today SET points=${req.body.points} WHERE url_id = ${req.body.urlId}`, (error,results, fields) => {
			if (error) console.log(error)
			res.json(results);
		})
	})

	app.get('/api/urls', (req, res) => {
		db.query("SELECT * FROM urls_view ORDER BY resolution<'pending resolution', resolution, id DESC", (error, results, fields) => {
			if (error) console.log(error)
			res.json(results);
		})
	})

	app.post('/api/urls', (req, res) => {
		res.setHeader('Access-Control-Allow-Origin', 'localhost');
		let source = req.query.source
		let urlDecoded

		if (source === 'powershell') {
			let urlEncoded = req.body.url.split('/?url=')[1].split('&data')
			urlDecoded = decodeURIComponent(urlEncoded[0])
		}
		else urlDecoded = req.body.url

		let title = db.escape(req.body.title)
		db.query(`INSERT INTO urls (url, title, resolution_id) VALUES ('${urlDecoded}', ${title}, 0);`, (error, results, fields) => {
			if (error) console.log(error)
			res.json(results);
		})
	})

	app.put('/api/urls', (req, res) => {
		res.setHeader('Access-Control-Allow-Origin', 'localhost');
		let powershell = child.spawn('powershell.exe', ['-NoExit', '-ExecutionPolicy', 'Bypass', '-File', 'C:\\Users\\SPIRE\\Desktop\\aeuoae\\script.ps1'], {
			detached: true,
			shell: true
		})
		powershell.stdout.on('data', (stdout) => {
			console.log(stdout.toString())

		})
		powershell.on('exit', (stdout) => {
			console.log('exited')
			powershell.kill()
		})
	})

	app.get('/api/urls/:id', (req, res) => {
		db.query(`SELECT * FROM urls_view WHERE id = ${req.params.id}`, (error, results, fields) => {
			if (error) console.log(error)
			res.json(results[0])
		})
	})

	app.put('/api/urls/:id', (req, res) => {
		if (req.query.assignee) {
			if (req.query.assignee == 'gdragnev') {
				db.query(`INSERT INTO today(url_id, assignee) VALUES(${req.params.id}, '${req.query.assignee}')`, (error, results, fields) => {
					if (error) console.log(error)
					res.json(results)
				})
			}
			else {
				db.query(`DELETE FROM today WHERE url_id = ${req.params.id};`, (error, results, fields) => {
					if (error) console.log(error)
					res.json(results)
				})
			}
		}
		else {
			if(typeof req.body.title !== 'undefined' || typeof req.body.nextActionSteps !== 'undefined' || typeof req.body.status !== 'undefined'){
				let query = "UPDATE urls SET"
				if (typeof req.body.title !== 'undefined') {
					let title = db.escape(req.body.title)
					query = query + '  title = ' + title + ','
				}
				if (typeof req.body.nextActionSteps !== 'undefined') {
					let nextActionSteps = db.escape(req.body.nextActionSteps)
					query = query + ' nextActionSteps = ' + nextActionSteps + ','
				}
				if (typeof req.body.status !== 'undefined') {
					let status = db.escape(req.body.status)
					query = query + ' status = ' + status + ','
				}
				if (typeof req.body.resolutionId !== 'undefined') {
					query = query + ' resolution_id = ' + req.body.resolutionId + ','
				}

				query = query.replace(/,*$/, "") + ' WHERE id = ' + req.params.id
				db.query(query, (error, results, fields) => {
					if (error) console.log(error)
					res.json(results);
				})
			}
			else {
				res.json('it dont')
			}
		}
	})

	app.put('/api/urls/:id/resolution', (req, res) => {
		let resolution = db.escape(req.body.resolution)
		let id = req.params.id
		db.query(`call updateResolution(${resolution}, ${id});`, (error, results, fields) => {
			if (error) console.log(error)
			res.json(results)
		})
	})

	app.get('/api/urls/:id/nextActionSteps', (req, res) => {
		db.query(`SELECT * FROM nextactionsteps WHERE url_id = ${req.params.id}`, (error, results, fields) => {
			if (error) console.log(error)
			res.json(results)
		})
	})

	app.post('/api/urls/:id/nextActionSteps', (req, res) => {
		let actionStep = db.escape(req.body.actionStep)
		let id = req.params.id
		db.query(`INSERT INTO nextactionsteps (nextActionStep, url_id) VALUES (LOWER(${actionStep}), ${id});`, (error, results, fields) => {
			if (error) console.log(error)
			console.log(results)
			res.json(results)
		})
	})

	app.get('/api/resolutions', (req, res) => {
		db.query("SELECT * FROM resolutions", (error, results, fields) => {
			res.json(results)
		})
	})

	app.get('*', (req, res) => {
		res.sendFile(path.join(__dirname, '../../../dist/mean-angular6', 'index.html'));
	})

	app.get('/tests', (req, res) => {
		res.sendFile(path.join(__dirname, '../../tests', 'index.html'));
	})


	//app.get('*', (req, res) => {
	//	res.send("page not found");
	//});
};