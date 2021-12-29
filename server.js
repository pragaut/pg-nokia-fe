const next = require('next');
const dev = process.env.MODE !== 'production';
const app = next({ dev: true }) //true for development server and false for production server
const fs = require('fs');
const Router = require('next/router');
const express = require('express');
const fetch = require('node-fetch');
const { createServer } = require('http');
const { json } = require('express');
const handle = app.getRequestHandler();

//const site_url = 'https://nokia.com';


app.prepare()
	.then(() => {
		const server = express();

		createServer((req, res) => {
			// Be sure to pass `true` as the second argument to `url.parse`.
			// This tells it to parse the query portion of the URL.
			const parsedUrl = parse(req.url, true);
			const { pathname, query } = parsedUrl;
			console.log("created query ", query);
			console.log("created parsedUrl ", parsedUrl);
		})
		//console.log("server : ", server);

		const render = (req, res, pageName) => {
			app.render(req, res, '/', {
				page: pageName,
				query: {
					tab: '',
					id: '',
					pageName: '',
					auditFlowMasterId: '',
					multiSectionMasterId: '',
					auditPlanDetailsId: '',

				}
			})
		}

		server.get('/switch-role', (req, res) => {
			const q = req.query;
			return app.render(req, res, '/switchRole', {
				page: 'switchRole',
				...q,
			});
		});
		server.get('/my-account', (req, res) => {
			const q = req.query;
			return app.render(req, res, '/switchRole', {
				page: 'switchRole',
				...q,
			});
		});
		server.get('/admin/master-category', (req, res) => {
			const q = req.query;
			q.tab = 'master-category';
			q.pathname = 'master-category';
			q.pageName = 'Master Category';
			q.MasterName = 'Master Category';
			return app.render(req, res, '/admin', {
				page: q.pageName,
				MasterName: q.MasterName,
				tab: q.tab,
				section: 'master',
				query: {
					...q
				}
			});
		});
		server.get('/admin/group-master', (req, res) => {
			const q = req.query;
			q.tab = 'group-master';
			q.pathname = 'group-master';
			q.pageName = 'Group Master';
			q.MasterName = 'Group Master';
			return app.render(req, res, '/admin', {
				page: q.pageName,
				MasterName: q.MasterName,
				tab: q.tab,
				section: 'master',
				query: {
					...q
				}
			});
		});
		server.get('/admin/org-relation-type-master', (req, res) => {
			const q = req.query;
			q.tab = 'org-relation-type-master';
			q.pathname = 'org-relation-type-master';
			q.pageName = 'Org Relation Type Master';
			q.MasterName = 'Org Relation Type Master';
			return app.render(req, res, '/admin', {
				page: q.pageName,
				MasterName: q.MasterName,
				tab: q.tab,
				section: 'master',
				query: {
					...q
				}
			});
		});
		server.get('/admin/organisation-details', (req, res) => {
			const q = req.query;
			q.tab = 'organisation-details';
			q.pathname = 'organisation-details';
			q.pageName = 'Organisation Details';
			q.MasterName = 'Organisation Details';
			return app.render(req, res, '/admin', {
				page: q.pageName,
				MasterName: q.MasterName,
				tab: q.tab,
				section: 'master',
				query: {
					...q
				}
			});
		});
		server.get('/admin/organisation-employee-details', (req, res) => {
			const q = req.query;
			q.tab = 'organisation-employee-details';
			q.pathname = 'organisation-employee-details';
			q.pageName = 'Organisation Employee Details';
			q.MasterName = 'Organisation Employee Details';
			return app.render(req, res, '/admin', {
				page: q.pageName,
				MasterName: q.MasterName,
				tab: q.tab,
				section: 'master',
				query: {
					...q
				}
			});
		});
		server.get('/admin/alarm-type-master', (req, res) => {
			const q = req.query;
			q.tab = 'alarm-type-master';
			q.pathname = 'alarm-type-master';
			q.pageName = 'Alarm Type Master';
			q.MasterName = 'Alarm Type Master';
			return app.render(req, res, '/admin', {
				page: q.pageName,
				MasterName: q.MasterName,
				tab: q.tab,
				section: 'master',
				query: {
					...q
				}
			});
		});
		server.get('/admin/notification-master', (req, res) => {
			const q = req.query;
			q.tab = 'notification-master';
			q.pathname = 'notification-master';
			q.pageName = 'Notification Master';
			q.MasterName = 'Notification Master';
			return app.render(req, res, '/admin', {
				page: q.pageName,
				MasterName: q.MasterName,
				tab: q.tab,
				section: 'master',
				query: {
					...q
				}
			});
		});
		server.get('/admin/module-master', (req, res) => {
			const q = req.query;
			q.tab = 'module-master';
			q.pathname = 'module-master';
			q.pageName = 'Module Master';
			q.MasterName = 'Module Master';
			return app.render(req, res, '/admin', {
				page: q.pageName,
				MasterName: q.MasterName,
				tab: q.tab,
				section: 'master',
				query: {
					...q
				}
			});
		});
		server.get('/admin/organisation-group-module-master', (req, res) => {
			const q = req.query;
			q.tab = 'organisation-group-module-master';
			q.pathname = 'organisation-group-module-master';
			q.pageName = 'Organisation Module Master';
			q.MasterName = 'Organisation Module Master';
			return app.render(req, res, '/admin', {
				page: q.pageName,
				MasterName: q.MasterName,
				tab: q.tab,
				section: 'master',
				query: {
					...q
				}
			});
		});
		server.get('/admin/role-master', (req, res) => {
			const q = req.query;
			q.tab = 'role-master';
			q.pathname = 'role-master';
			q.pageName = 'Role Master';
			q.MasterName = 'Role Master';
			return app.render(req, res, '/admin', {
				page: q.pageName,
				MasterName: q.MasterName,
				tab: q.tab,
				section: 'master',
				query: {
					...q
				}
			});
		});
		server.get('/admin/tower-master', (req, res) => {
			const q = req.query;
			q.tab = 'tower-master';
			q.pathname = 'tower-master';
			q.pageName = 'Tower Master';
			q.MasterName = 'Tower Master';
			return app.render(req, res, '/admin', {
				page: q.pageName,
				MasterName: q.MasterName,
				tab: q.tab,
				section: 'master',
				query: {
					...q
				}
			});
		});
		server.get('/admin/tower-allotment-master', (req, res) => {
			const q = req.query;
			q.tab = 'tower-allotment-master';
			q.pathname = 'tower-allotment-master';
			q.pageName = 'Tower Allotment Master';
			q.MasterName = 'Tower Allotment Master';
			return app.render(req, res, '/admin', {
				page: q.pageName,
				MasterName: q.MasterName,
				tab: q.tab,
				section: 'master',
				query: {
					...q
				}
			});
		});
		server.get('/admin/tower-antennas-master', (req, res) => {
			const q = req.query;
			q.tab = 'tower-antennas-master';
			q.pathname = 'tower-antennas-master';
			q.pageName = 'Tower Antennas Master';
			q.MasterName = 'Tower Antennas Master';
			return app.render(req, res, '/admin', {
				page: q.pageName,
				MasterName: q.MasterName,
				tab: q.tab,
				section: 'master',
				query: {
					...q
				}
			});
		});
		server.get('/admin/device-registration-master', (req, res) => {
			const q = req.query;
			q.tab = 'device-registration-master';
			q.pathname = 'device-registration-master';
			q.pageName = 'Device Registration Master';
			q.MasterName = 'Device Registration Master';
			return app.render(req, res, '/admin', {
				page: q.pageName,
				MasterName: q.MasterName,
				tab: q.tab,
				section: 'master',
				query: {
					...q
				}
			});
		});
		server.get('/admin/group-company', (req, res) => {
			const q = req.query;
			q.tab = 'group-company';
			q.pathname = 'group-company';
			q.pageName = 'Company Master';
			q.MasterName = 'Company Master';
			return app.render(req, res, '/admin', {
				page: q.pageName,
				MasterName: q.MasterName,
				tab: q.tab,
				section: 'master',
				query: {
					...q
				}
			});
		});
		server.get('/admin/company-plant', (req, res) => {
			const q = req.query;
			q.tab = 'company-plant';
			q.pathname = 'company-plant';
			q.pageName = 'Plant Master';
			q.MasterName = 'Plant Master';
			return app.render(req, res, '/admin', {
				page: q.pageName,
				MasterName: q.MasterName,
				tab: q.tab,
				section: 'master',
				query: {
					...q
				}
			});
		});
		server.get('/admin/user-master', (req, res) => {
			const q = req.query;
			q.tab = 'user-master';
			q.pathname = 'user-master';
			q.pageName = 'User Master';
			q.MasterName = 'User Master';
			return app.render(req, res, '/admin', {
				page: q.pageName,
				MasterName: q.MasterName,
				tab: q.tab,
				section: 'master',
				query: {
					...q
				}
			});
		});
		server.get('/subAdmin/user-master', (req, res) => {
			const q = req.query;
			q.tab = 'user-master';
			q.pathname = 'user-master';
			q.pageName = 'User Master';
			q.MasterName = 'User Master';
			return app.render(req, res, '/subAdmin', {
				page: q.pageName,
				MasterName: q.MasterName,
				tab: q.tab,
				section: 'master',
				query: {
					...q
				}
			});
		});

		server.get('/pragaut/user-master', (req, res) => {
			const q = req.query;
			q.tab = 'user-master';
			q.pathname = 'user-master';
			q.pageName = 'User Master';
			q.MasterName = 'User Master';
			return app.render(req, res, '/pragaut', {
				page: q.pageName,
				MasterName: q.MasterName,
				tab: q.tab,
				section: 'master',
				query: {
					...q
				}
			});
		});
		server.get('/admin/country', (req, res) => {
			return app.render(req, res, '/admin', {
				page: 'country'
			});
		});
		server.get('/admin/state', (req, res) => {
			return app.render(req, res, '/admin', {
				page: 'state'
			});
		});
		server.get('/admin/department', (req, res) => {
			return app.render(req, res, '/admin', {
				page: 'department'
			});
		});


		//-------------------Working AISU Section--------------------//

		server.get('/aisuAdmin/antenna-rotation-details', (req, res) => {
			const q = req.query;
			q.tab = 'antenna-rotation-details';
			q.pathname = 'antenna-rotation-details';
			q.pageName = 'Antenna Movement Details';
			q.MasterName = 'Antenna Movement Details';
			return app.render(req, res, '/aisuAdmin', {
				page: q.pageName,
				MasterName: q.MasterName,
				tab: q.tab,
				section: 'working',
				query: {
					...q
				}
			});
		});
		server.get('/aisuAdmin/device-location-details', (req, res) => {
			const q = req.query;
			q.tab = 'device-location-details';
			q.pathname = 'device-location-details';
			q.pageName = 'Device Location Details';
			q.MasterName = 'Device Location Details';
			return app.render(req, res, '/aisuAdmin', {
				page: q.pageName,
				MasterName: q.MasterName,
				tab: q.tab,
				section: 'working',
				query: {
					...q
				}
			});
		});




		//-------------------Working TMC Section-------------------//

		server.get('/management/device-mapping-details', (req, res) => {
			const q = req.query;
			q.tab = 'device-mapping-details';
			q.pathName = 'management';
			q.pageName = 'Device Mapping Details';
			q.MasterName = 'Device Mapping Details';
			return app.render(req, res, '/management', {
				page: q.pageName,
				MasterName: q.MasterName,
				tab: q.tab,
				section: 'working',
				query: {
					...q
				}
			});
		});

		server.get('/management/tower-notification-details', (req, res) => {
			const q = req.query;
			q.tab = 'tower-notification-details';
			q.pathName = 'management';
			q.pageName = 'Tower Notification Details';
			q.MasterName = 'Tower Notification Details';
			return app.render(req, res, '/management', {
				page: q.pageName,
				MasterName: q.MasterName,
				tab: q.tab,
				section: 'working',
				query: {
					...q
				}
			});
		});

		server.get('/management/closed-tower-notification-details', (req, res) => {
			const q = req.query;
			q.tab = 'closed-tower-notification-details';
			q.pathName = 'management';
			q.pageName = 'Closed Notification Details';
			q.MasterName = 'Closed Notification Details';
			return app.render(req, res, '/management', {
				page: q.pageName,
				MasterName: q.MasterName,
				tab: q.tab,
				section: 'working',
				query: {
					...q
				}
			});
		});

		server.get('/management/tower-monitoring-details', (req, res) => {
			const q = req.query;
			q.tab = 'tower-monitoring-details';
			q.pathName = 'management';
			q.pageName = 'Tower Monitoring Details';
			q.MasterName = 'Tower Monitoring Details';
			return app.render(req, res, '/management', {
				page: q.pageName,
				MasterName: q.MasterName,
				tab: q.tab,
				section: 'working',
				query: {
					...q
				}
			});
		});

		server.get('/management/tower-monitoring-history', (req, res) => {
			const q = req.query;
			q.tab = 'tower-monitoring-history';
			q.pathName = 'management';
			q.pageName = 'Tower Monitoring History Details';
			q.MasterName = 'Tower Monitoring History Details';
			return app.render(req, res, '/management', {
				page: q.pageName,
				MasterName: q.MasterName,
				tab: q.tab,
				section: 'working',
				query: {
					...q
				}
			});
		});



		server.get('/pragaut/device-mapping-details', (req, res) => {
			const q = req.query;
			q.tab = 'device-mapping-details';
			q.pathName = 'pragaut';
			q.pageName = 'Device Mapping Details';
			q.MasterName = 'Device Mapping Details';
			return app.render(req, res, '/pragaut', {
				page: q.pageName,
				MasterName: q.MasterName,
				tab: q.tab,
				section: 'working',
				query: {
					...q
				}
			});
		});

		server.get('/pragaut/tower-notification-details', (req, res) => {
			const q = req.query;
			q.tab = 'tower-notification-details';
			q.pathName = 'pragaut';
			q.pageName = 'Tower Notification Details';
			q.MasterName = 'Tower Notification Details';
			return app.render(req, res, '/pragaut', {
				page: q.pageName,
				MasterName: q.MasterName,
				tab: q.tab,
				section: 'working',
				query: {
					...q
				}
			});
		});

		server.get('/pragaut/closed-tower-notification-details', (req, res) => {
			const q = req.query;
			q.tab = 'closed-tower-notification-details';
			q.pathName = 'pragaut';
			q.pageName = 'Closed Notification Details';
			q.MasterName = 'Closed Notification Details';
			return app.render(req, res, '/pragaut', {
				page: q.pageName,
				MasterName: q.MasterName,
				tab: q.tab,
				section: 'working',
				query: {
					...q
				}
			});
		});

		server.get('/pragaut/tower-monitoring-details', (req, res) => {
			const q = req.query;
			q.tab = 'tower-monitoring-details';
			q.pathName = 'pragaut';
			q.pageName = 'Tower Monitoring Details';
			q.MasterName = 'Tower Monitoring Details';
			return app.render(req, res, '/pragaut', {
				page: q.pageName,
				MasterName: q.MasterName,
				tab: q.tab,
				section: 'working',
				query: {
					...q
				}
			});
		});

		server.get('/pragaut/tower-monitoring-history', (req, res) => {
			const q = req.query;
			q.tab = 'tower-monitoring-history';
			q.pathName = 'pragaut';
			q.pageName = 'Tower Monitoring History Details';
			q.MasterName = 'Tower Monitoring History Details';
			return app.render(req, res, '/pragaut', {
				page: q.pageName,
				MasterName: q.MasterName,
				tab: q.tab,
				section: 'working',
				query: {
					...q
				}
			});
		});


		//------------------Working Section End----------------------//

		//-------------------Change Password Section --------------------//

		server.get('/management/change-password', (req, res) => {
			return app.render(req, res, '/management', {
				page: 'Change Password',
				tab: 'change-password',
				section: 'working',
				query: {
					tab: 'change-password',
					id: undefined,
					pageName: 'Change Password'
				}
			});
		});
		server.get('/pragaut/change-password', (req, res) => {
			return app.render(req, res, '/pragaut', {
				page: 'Change Password',
				tab: 'change-password',
				section: 'working',
				query: {
					tab: 'change-password',
					id: undefined,
					pageName: 'Change Password'
				}
			});
		});
		server.get('/admin/change-password', (req, res) => {
			return app.render(req, res, '/admin', {
				page: 'Change Password',
				tab: 'change-password',
				section: 'working',
				query: {
					tab: 'change-password',
					id: undefined,
					pageName: 'Change Password'
				}
			});
		});
		//------------------Change Password Section End----------------------//

		server.get('*', (req, res, err) => {
			return handle(req, res)
		});

		server.listen(process.env.PORT, (err) => {
			if (err) throw err
			console.log('> Ready on http://localhost:' + process.env.PORT + " MODE " + process.env.MODE);
		});
	})
	.catch((ex) => {
		console.error(ex.stack)
		process.exit(1)
	});
