// routes/request_routes.js
var ObjectID = require('mongodb').ObjectID;
var path = require('path');

module.exports = function (app, db) {
	app.get('/api/urls', (req,res) => {
		db.query("SELECT * FROM urls_view ORDER BY resolution", (error, results, fields) =>  {
			if (error) console.log(error)
			res.json(results);
		})
	})

	app.post('/api/urls', (req, res) => {
		let title = db.escape(req.body.title)
		db.query(`INSERT INTO urls (url, title, issue_id, resolution_id) VALUES ('${req.body.url}', ${title}, ${req.body.issueId}, 0);`, (error, results, fields) =>  {
			if (error) console.log(error)
			res.json(results);
		})
	})

	app.get('/api/urls/:id', (req, res) => {
		db.query(`SELECT * FROM urls_view WHERE id = ${req.params.id}`, (error, results, fields) => {
			if (error) console.log(error)
			res.json(results[0])
		})
	})

	app.put('/api/urls/:id', (req, res) => {
		let title = db.escape(req.body.title)
		let nextActionSteps = db.escape(req.body.nextActionSteps)
		db.query(`UPDATE urls SET title = ${title}, url = '${req.body.url}', issue_id = ${req.body.issueId}, resolution_id = ${req.body.resolutionId}, nextActionSteps = ${nextActionSteps} WHERE id = ${req.params.id};`, (error, results, fields) =>  {
			if (error) console.log(error)
			res.json(results);
		})
	})

	app.put('/api/urls/:id/resolution', (req, res) => {
		let resolution = db.escape(req.body.resolution)
		let id = req.params.id
		db.query(`call updateResolution(${resolution}, ${id});`, (error, results, fields) => {
			if (error) console.log(error)
			res.json(results)
		})
	})

	app.get('/api/issues', (req,res) => {
		db.query("SELECT * FROM issues", (error, results, fields) =>  {
			if (error) console.log(error)
			res.json(results);
		})
	})

	app.post('/api/issues', (req, res) => {
		let issue = db.escape(req.body.issue)
		db.query(`INSERT INTO issues (issue, issue_hash, tags) VALUES (LOWER(${issue}), md5(issue), '${req.body.category}');`, (error, results, fields) => {
			if (error) console.log(error)
			res.json(results)
		})
	})

	app.get('/api/issues/:id', (req, res) => {
		id = req.params.id
		db.query(`SELECT * FROM issues WHERE id like ${id}`, (error, results, fields) => {
			res.json(results[0])
		})
	})

	app.put('/api/issues/:id' , (req, res) => {
		let issue = db.escape(req.body.issue)
		db.query(`UPDATE issues SET id=${req.body.id}, issue=${issue}, issue_hash=md5(issue), tags=\'${req.body.tags}\' WHERE id=${req.body.id};`, (error, results, fields) => {
			if (error) console.log(error)
			res.json(results)
		})
	})

	app.get('/api/issues/:id/urls', (req, res) => {
		id = req.params.id 
		db.query(`SELECT * from urls_view WHERE issue_id like ${id}`, (error, results, fields) => {
			res.json(results)
		})
	})

	app.get('/api/issues/:id/resolutions', (req, res) => {
		id = req.params.id
		db.query(`SELECT resolution, COUNT(*) as count FROM urls_view WHERE issue_id = ${id} GROUP BY resolution ORDER BY count DESC;`, (error, results, fields) => {
			res.json(results)
		})
	})

	app.get('/api/troubleshootings', (req, res) => {
		db.query("SELECT * FROM troubleshootings", (error, results, fields) => {
			res.json(results)
		})
	})

	app.get('/api/troubleshootings/:id', (req, res) => {
		id = req.params.id
		db.query(`SELECT * FROM troubleshootings WHERE issue_id like ${id}`, (error, results, fields) => {
			res.json(results)
		})
	})

	app.post('/api/troubleshootings/', (req, res) => {
		let troubleshooting = db.escape(req.body.troubleshooting)
		let issue_id = req.body.issueId
		db.query(`INSERT INTO troubleshootings (troubleshooting, troubleshooting_hash,issue_id) VALUES(LOWER(${troubleshooting}), md5(troubleshooting), ${issue_id}); `, (error, results, fields) => {
			if (error) console.log(error)
			res.json(results)
		})
	})

	app.get('/api/resolutions', (req, res) => {
		db.query("SELECT * FROM resolutions", (error, results, fields) => {
			res.json(results)
		})
	})

	app.get('/api/categories', (req, res) => {
		db.query("SELECT * FROM categories WHERE parent_category_id IS NULL;", (error, results, fields) => {
			if (error) console.log(error)
			res.json(results)
		})
	})

	app.get('/api/categories/:id', (req, res) => {
		db.query(`SELECT * FROM categories WHERE id LIKE ${req.params.id}`, (error,results, fields) => {
			if (error) console.log(error)
			res.json(results[0])
		})
	})

	app.put('/api/categories/:id', (req, res) => {
		let category = db.escape(req.body.category)
		db.query(`UPDATE categories SET category=LOWER(${category}), category_hash=md5(category), parent_category_id=${req.body.parentCategoryId} WHERE id=${req.params.id};`, (error, results, fields) => {
			if (error) console.log(error)
			res.json(results)
		})
	})

	app.get('/api/categories/:id/subCategories', (req, res) => {
		db.query(`SELECT * FROM categories WHERE parent_category_id LIKE ${req.params.id}`, (error,results, fields) => {
			if (error) console.log(error)
			res.json(results)
		})
	})
	
	app.post('/api/categories/:id/subCategories', (req, res) => {
		let subCategory = db.escape(req.body.subCategory)
		db.query(`INSERT INTO categories (category, category_hash, parent_category_id) VALUES(LOWER(${subCategory}), md5(LOWER(category)), ${req.params.id});`, (error, results, fields) => {
			if (error) console.log(error)
			res.json(results)
		})
	})

	app.get('/api/categories/:id/issues', (req, res) => {
		db.query(`SELECT * FROM issues WHERE category_id LIKE ${req.params.id}`, (error,results, fields) => {
			if (error) console.log(error)
			res.json(results)
		})
	})

	app.post('/api/categories/:id/issues', (req, res) => {
		let issue = db.escape(req.body.issue)
		db.query(`INSERT INTO issues (issue, issue_hash, category_id) VALUES (LOWER(${issue}), md5(issue), '${req.params.id}');`, (error, results, fields) => {
			if (error) console.log(error)
			res.json(results)
		})
	})

	app.post('/api/categories', (req, res) => {
		let category = db.escape(req.body.category)
		db.query(`INSERT INTO categories (category, category_hash) VALUES(LOWER(${category}), md5(LOWER(category)));`, (error, results, fields) => {
			if (error) console.log(error)
			res.json(results)
		})
	})

	app.get('/api/requests/elevations', (req, res) => {
		db.collection('requests').find({ requestStatus: "elevations" }).toArray((err, elevations) => {
			if (err) {
				res.send({ 'error': 'An error has occurred' });
			} else {
				res.json(elevations);
			}
		});
	});

	app.get('/api/requests/workInProgress', (req, res) => {
		db.collection('requests').find({ requestStatus: "work-in-progress" }).toArray((err, workInProgress) => {
			if (err) {
				res.send({ 'error': 'An error has occurred' });
			} else {
				res.json(workInProgress);
			}
		});
	});

	app.get('/api/requests/additionalResources', (req, res) => {
		db.collection('requests').find({ requestStatus: "additional-resources" }).toArray((err, additionalResources) => {
			if (err) {
				res.send({ 'error': 'An error has occurred' });
			} else {
				res.json(additionalResources);
			}
		});
	});

	app.get('/api/requests/pendingCustomer', (req, res) => {
		db.collection('requests').find({ requestStatus: "pending-customer" }).toArray((err, pendingCustomer) => {
			if (err) {
				res.send({ 'error': 'An error has occurred' });
			} else {
				res.json(pendingCustomer);
			}
		});
	});
	app.get('/api/requests/webexes', (req, res) => {
		db.collection('requests').find({ requestStatus: "webexes" }).toArray((err, pendingCustomer) => {
			if (err) {
				res.send({ 'error': 'An error has occurred' });
			} else {
				res.json(pendingCustomer);
			}
		});
	});

	app.put('/api/requests/:requestID/tasks/:taskID/order', (req, res) => {
		const requestID = req.params.requestID;
		const taskID = req.params.taskID
		const requestDetails = { '_id': new ObjectID(requestID) };
		const taskDetails = { 'tasks.taskID': new ObjectID(taskID) };
		const request = { $set: { "tasks.$.index": req.body.index } };
		console.log(taskDetails);
		db.collection('requests').update(taskDetails, request, (err, result) => {
			if (err) {
				res.send({ 'error': 'An error has occurred' });
			} else {
				res.send(request);
			}
		});
	});

	app.put('/api/requests/:requestID/tasks/:taskID/edit', (req, res) => {
		const taskID = req.params.taskID
		const taskDetails = { 'tasks.taskID': new ObjectID(taskID) };
		let data = Object.assign({ latestUpdateDate: new Date(Date.now()).toISOString() }, req.body);

		for (var propName in data) {
			if (data[propName] === null || data[propName] === undefined || data[propName] === "") {
				delete data[propName];
			}
		}
		let edit = {};
		for (var propName in data) {
			edit[`tasks.$.${propName}`] = data[propName];
		}
		const request = { $set: edit };
		db.collection('requests').update(taskDetails, request, (err, result) => {
			if (err) {
				res.send({ 'error': 'An error has occurred' });
			} else {
				res.send(request);
			}
		});
	});

	app.get('/api/requests/:requestID/tasks/:taskID', (req, res) => {
		const requestID = req.params.requestID;
		const taskID = req.params.taskID
		const requestDetails = { '_id': new ObjectID(requestID) };
		db.collection('requests').findOne(requestDetails, (err, request) => {
			if (err) {
				res.send({ 'error': 'An error has occurred' });
			} else {
				for (i = 0; i < request.tasks.length; i += 1) {
					if (request.tasks[i].taskID == taskID) {
						res.send(request.tasks[i]);
					}
				}
			}
		});
	})

	app.delete('/api/requests/:requestID/tasks/:taskID', (req, res) => {
		const requestID = req.params.requestID;
		const taskID = req.params.taskID
		const requestDetails = { '_id': new ObjectID(requestID) };
		const taskDetails = new ObjectID(taskID)
		const request = { $pull: { tasks: { taskID: taskDetails } } };
		db.collection('requests').update(requestDetails, request, (err, result) => {
			if (err) {
				res.send({ 'error': 'An error has occurred' });
			} else {
				res.send(request);
			}
		});
	})

	app.put('/api/requests/:requestID/tasks/:taskID', (req, res) => {
		const requestID = req.params.requestID;
		const taskID = req.params.taskID
		const requestDetails = { '_id': new ObjectID(requestID) };
		const taskDetails = { 'tasks.taskID': new ObjectID(taskID) };
		const request = { $set: { "tasks.$.isCompleted": true } };
		db.collection('requests').update(taskDetails, request, (err, result) => {
			if (err) {
				res.send({ 'error': 'An error has occurred' });
			} else {
				console.log("task completed");
				db.collection('requests').update(requestDetails, {$pull: { order: taskID}}, (err, result) => {
					if (err){
						console.log(err);
						res.send({'error': 'An error has occured'});
					} else {
						console.log(result);
						res.send(request);
					}
				})
			}
		});
	});

	app.get('/api/requests/:requestID/tasks', (req, res) => {
		const id = req.params.requestID;
		const details = { '_id': new ObjectID(id) };
		db.collection('requests').findOne(details, { _id: 0, "$.order": 1 }, (err, request) => {
			if (err) {
				res.send({ 'error': 'An error has occurred' });
			} else {
				res.json(request);
			}
		});
	});

	app.put('/api/requests/:requestID/tasks', (req, res) => {
		const id = req.params.requestID;
		const details = { '_id': new ObjectID(id) };
		const order = req.body.order;
		const request = { $set: { "order": order } };
		db.collection('requests').update(details, request, (err, result) => {
			if (err) {
				res.send({ 'error': 'An error has occurred' });
			} else {
				res.send(request);
			}
		});
	})

	app.post('/api/requests/:requestID/tasks', (req, res) => {
		const id = req.params.requestID;
		const details = { '_id': new ObjectID(id) };
		const taskID = new ObjectID();
		const task = {
			taskID: taskID,
			title: req.body.title,
			taskStatus: req.body.taskStatus,
			taskDescription: req.body.taskDescription,
			isCompleted: false,
			dateCreated: new Date(Date.now()).toISOString()
		};
		const request = {
			$push: { order: taskID.toString(), tasks: task }
		}
		db.collection('requests').update(details, request, (err, result) => {
			if (err) {
				res.send({ 'error': 'An error has occurred' });
			} else {
				res.send(request);
			}
		});
	})

	app.get('/api/requests/:requestID/storage', (req, res) => {
		const id = req.params.requestID;
		const details = { '_id': new ObjectID(id) };
		db.collection('requests').findOne(details, (err, request) => {
			if (err) {
				res.send({ 'error': 'An error has occurred' });
			} else {
				directoryUtils.openDirectoryUtil(request.id);
				res.json(request);
			}
		});

	});

	app.post('/api/requests/:requestID/storage', (req, res) => {
		const id = req.params.requestID;
		const details = { '_id': new ObjectID(id) };
		db.collection('requests').findOne(details, (err, request) => {
			if (err) {
				res.send({ 'error': 'An error has occurred' });
			} else {
				directoryUtils.createDirectoryUtil(request.id);
				res.json(request);
			}
		});

	});

	app.get('/api/requests/:requestID', (req, res) => {
		const id = req.params.requestID;
		const details = { '_id': new ObjectID(id) };
		db.collection('requests').findOne(details, (err, request) => {
			if (err) {
				res.send({ 'error': 'An error has occurred' });
			} else {
				res.json(request);
			}
		});
	});

	//use findOneAndDelete in future maybe ??
	app.delete('/api/requests/:requestID', (req, res) => {
		const id = req.params.requestID;
		const details = { '_id': new ObjectID(id) };
		db.collection('requests').findOne(details, (err, request) => {
			if (err) {
				res.send({ 'error': 'An error has occurred' });
			} else {
				directoryUtils.removeDirectoryUtil(request.id);
				db.collection('requests').remove(details, (err, item) => {
					if (err) {
						res.send({ 'error': 'An error has occurred' });
					} else {
						res.json('request ' + id + ' deleted!');
					}
				});
			}
		});
	});

	app.put('/api/requests/:requestID', (req, res) => {
		const id = req.params.requestID;
		const details = { '_id': new ObjectID(id) };
		let data = Object.assign({ latestUpdateDate: new Date(Date.now()).toISOString() }, req.body);

		for (var propName in data) {
			if (data[propName] === null || data[propName] === undefined || data[propName] === "") {
				delete data[propName];
			}
		}
		const request = { $set: data };
		db.collection('requests').findOneAndUpdate(details, request, {upsert: true, returnOriginal: false}, (err, result) => {
			if (err) {
				res.send({ 'error': 'An error has occurred' });
			} else {
				console.log(result)
				res.json(result);
			}
		});
	});

	app.get('/api/tests', (req, res) => {
		let report = excel.returnExcel(["gogo", "mogo", "pogo"]);
		res.attachment('report.xlsx'); // This is sails.js specific (in general you need to set headers)
    	return res.send(report);
	})

	app.get('/api/requests', (req, res) => {
		db.collection('requests').find().sort({ latestUpdateDate: 1 }).toArray((err, requests) => {
			if (err) {
				res.send({ 'error': 'An error has occurred' });
			} else {
				res.json(requests);
			}
		});
	});

	app.post('/api/requests', (req, res) => {
		console.log(res.body)
		const request = {
			title: req.body.title,
			id: req.body.id,
			info: req.body.info,
			description: req.body.description,
			isItFreshInstall: req.body.isItFreshInstall,
			stepsToReproduce: req.body.stepsToReproduce,
			customerExpectation: req.body.customerExpectation,
			oneMachineOrAll: req.body.oneMachineOrAll,
			hotfixes: req.body.hotfixes,
			relatedDocuments: req.body.relatedDocuments,
			troubleshooting: req.body.troubleshooting,
			dataCollection: req.body.dataCollection,
			latestUpdateDate: new Date(Date.now()).toISOString()
		};
		db.collection('requests').insert(request, (err, result) => {
			if (err) {
				console.log(err);
				res.send({ 'error': 'An error has occurred' });
			} else {
				res.send(result.ops[0]);
			}
		});
	})
	
	app.get('*', (req,res) => {
		res.sendFile(path.join(__dirname, '../../../dist/mean-angular6', 'index.html'));
	})
	
	app.get('/tests', (req,res) => {
		res.sendFile(path.join(__dirname, '../../tests', 'index.html'));
	})
	
	
	//app.get('*', (req, res) => {
	//	res.send("page not found");
	//});
};