const sinon = require('sinon');
const chai = require('chai');

let request = require('supertest');
request = request('http://localhost:8000');

describe('hello-tests', () => {
	it('PUT request to /api/requests should edit request with data in x-www-urleconded form and return the updated request in json', (done) => {
		request.post('/api/requests/')
			.send('title=1')
			.expect(200)
			.then(res => {
				return request.put(`/api/requests/${res.body._id}`)
					.send('title=2')
					.expect(200)
					.expect(res => {
						chai.expect(res.body.value.title).to.be.equal('2')
					})
			})
			.then((res) => {
				return request.delete(`/api/requests/${res.body.value._id}`)
			})
			.then(res => {
				done()
			})
	})
	it('GET request to /api/requests should return array with requests in json', (done) => {
		request.post('/api/requests/')
			.send('title=1&id=4')
			.then((res => {
				return request.get('/api/requests/')
			}))
			.then((res) => {
				return request.delete(`/api/requests/${res.body[0]._id}`)
			})
			.then((res) => {
				done()
			})
	});
	it('GET request to /api/requests should return array with requests in json in chronological order');
	it('POST request to /api/requests should add request with title in x-www-urleconded form', (done) => {
		request.post('/api/requests')
			.send('title=1&id=2&info=3&description=4&isItFreshInstall=5&stepsToReproduce=6&customerExpectation=7&oneMachineOrAll=8&hotfixes=9&troubleshooting=10&relatedDocuments=11&dataCollection=12')
			.expect(res => {
				chai.expect(res.body.title).to.be.equal('1')
				chai.expect(res.body.id).to.be.equal('2')
				chai.expect(res.body.info).to.be.equal('3')
				chai.expect(res.body.description).to.be.equal('4')
				chai.expect(res.body.isItFreshInstall).to.be.equal('5')
				chai.expect(res.body.stepsToReproduce).to.be.equal('6')
				chai.expect(res.body.customerExpectation).to.be.equal('7')
				chai.expect(res.body.oneMachineOrAll).to.be.equal('8')
				chai.expect(res.body.hotfixes).to.be.equal('9')
				chai.expect(res.body.troubleshooting).to.be.equal('10')
				chai.expect(res.body.relatedDocuments).to.be.equal('11')
				chai.expect(res.body.dataCollection).to.be.equal('12')
			})
			.then((res,err) => {
				if (err) done()
				return request.delete(`/api/requests/${res.body._id}`)
			})
			.then(res => {
				done()
			})

		/* const supportRequest = {
			title: "1",
			id: '2',
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
		}; */
	});
	it('POST request to /api/requests should add request with title in json form', (done) => {
		request.post('/api/requests')
			.send({title: '1'})
			.expect(res => {
				console.log(res.body)
				chai.expect(res.body.title).to.be.equal('1')
			})
			.then((res,err) => {
				if (err) done()
				return request.delete(`/api/requests/${res.body._id}`)
			})
			.then(res => {
				done()
			})

		/* const supportRequest = {
			title: "1",
			id: '2',
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
		}; */
	});
	it('DELETE request to /api/requests/:requestID should remove request by id', (done) => {
		request.get('/api/requests/')
			.expect('Content-Type', /json/)
			.expect(res => {
				chai.expect(res.body).to.be.lengthOf(0);
			})
			.then(res => {
				return request.post('/api/requests')
					.send('title=1&id=2&info=3')
					.expect(res => {
						chai.expect(res.body.title).to.be.equal('1')
					})
			})
			.then(res => {
				return request.delete(`/api/requests/${res.body._id}`)
			})
			.then(res => {
				return request.get('/api/requests/')
					.expect('Content-Type', /json/)
					.expect(res => {
						chai.expect(res.body).to.be.lengthOf(0);
					})
			})
			.then(res => {
				done()
			})
	});
});