#! /usr/bin/env node

const axios = require('axios');
const yargs = require('yargs/yargs')
const { hideBin } = require('yargs/helpers');

yargs(hideBin(process.argv))
  .command('list-urls <range>', 'list urls', (yargs) => {
    return yargs
      .positional('range', {
        describe: 'to return today or all urls',
		choices: ['all', 'today']
      })
  }, (argv) => {
	  console.log(argv)
    if (argv.range === 'all') {
		axios.get('http://localhost:8000/api/urls')
		.then(response => {
			console.dir(response.data, {'maxArrayLength': null})
		})
		.catch(error => {
			console.log(error);
		});
	}
	else {
		if (argv.range === 'today') {
			axios.get('http://localhost:8000/api/urls?today=null')
			.then(response => {
				console.dir(response.data, {'maxArrayLength': null})
			})
			.catch(error => {
				console.log(error);
			});
		}
	}
  })
  .command('assign-to-me <urlId>', 'assign url by id to me', (yargs) => {
	  return yargs
		.positional('urlId', {
			describe: 'url id'
		})
	}, (argv) => {
		if (typeof argv.urlId !== 'undefined') {
			axios.put(`http://localhost:8000/api/urls/${argv.urlId}?assignee=gdragnev`)
            .then(response => {
                console.log(response.data)
            })
		}
	})
  .command('assign-to-open <urlId>', 'assign url by id to open', (yargs) => {
	  return yargs
	  	.positional('urlId', {
			  describe: 'url id'
		  })
		}, (argv) => {
			if (typeof argv.urlId !== 'undefined') {
				axios.put(`http://localhost:8000/api/urls/${argv.urlId}?assignee=null`)
				.then(response => {
					console.log(response.data)
				})
			}
	})
	.command('update-url <urlId>', 'updates url by url id', (yargs) => {
		return yargs
		 .positional('urlId', {
			describe: 'url id',
			type: 'number'
		 })
		 .options({
			 'na': {
				 alias: 'nextActionSteps',
				 describe: 'nextActionSteps of url',
				 type: 'string'
			 },
			 't': {
				 alias: 'title',
				 describe: 'title of url',
				 type: 'string'
			 }
		 })
		 .strictOptions(enabled=true)
	}, (argv) => {
		newUrlData = {}
		if (typeof argv.nextActionSteps !== 'undefined') {
			if(argv.nextActionSteps === "") {
				argv.nextActionSteps = null
			}
			newUrlData['nextActionSteps'] = argv.nextActionSteps
		}
		if (typeof argv.title !== 'undefined') {
			newUrlData['title'] = argv.title
			console.log(argv.t)
		}

		axios.put(`http://localhost:8000/api/urls/${argv.urlId}`, newUrlData)
		.then(response => {
			console.log(response.data)
		}).catch(error => {
			console.log(error);
		})
	})
  .argv

command = 'gogo'
switch (command) {
	case '-?':
		console.log(`Usage:\n
	--list-urls today        prints today urls on the console\n 
	--list-urls all          prints all urls on the console\n
	--sync-urls              sync all urls from Outlook to the ticketing system\n
	--assign-to-me <id>      given url id assigns the url to today urls queue of the operator\n
	--assign-to-open <id>    given url id assigns the url to the world queue\n`)
		break;
	case '--update-url':
		const urlId = process.argv[3]
		let subCommandUpdateUrl = process.argv[4]
		const nextActionSteps = process.argv[5]
		switch (subCommandUpdateUrl) {
			case '-na':
				axios.put(`http://localhost:8000/api/urls/${urlId}`, {
					nextActionSteps: `${nextActionSteps}`
				}).then(response => {
					console.log(response.data)
				}).catch(error => {
					console.log(error);
				})
				break;
			default:
				break
		}
		break
	case '--sync-urls':
		axios.put('http://localhost:8000/api/urls')
		break
}