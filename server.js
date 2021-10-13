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

		// server.get('/robots.txt', (req, res) => {
		// 	res.type('text/plain');

		// 	// if (process.env.SITE_ALLOW === 'y') {
		// 	// 	const robotsText = fs.readFileSync('prod.robots.txt');
		// 	// 	res.send(robotsText);
		// 	// }
		// 	// else {
		// 	// 	const robotsText = fs.readFileSync('staging.robots.txt');
		// 	// 	res.send(robotsText);
		// 	// }
		// });


		// server.get('/sitemap.xml', (req, res) => {
		// 	let data;
		// 	const staticRoutes = [
		// 		{
		// 			url: {
		// 				loc: site_url + '/',
		// 			},
		// 		},
		// 		{
		// 			url: {
		// 				loc: site_url + '/About',
		// 			},
		// 		},
		// 		{
		// 			url: {
		// 				loc: site_url + '/contact-us',
		// 			},
		// 		},
		// 		{
		// 			url: {
		// 				loc: site_url + '/privacy-policy',
		// 			},
		// 		},
		// 	];

		// 	const apiURL = process.env.MODE === 'production' ? 'https://Reconcilation.api.prod.anandgroup.com/' : 'http://localhost:36224/';

		// 	const jsonxml = obj => {
		// 		const items = obj.urlset.map(o => {
		// 			return `<url><loc>${o.url.loc}</loc></url> \n`;
		// 		});

		// 		return items.join('\n');
		// 	};

		// });

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
		
		server.get('/admin/alarmType-master', (req, res) => {
			const q = req.query;
			q.tab = 'alarmType-master';
			q.pathname = 'alarmType-master';
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
		server.get('/admin/dueDays-master', (req, res) => {
			const q = req.query;
			q.tab = 'dueDays-master';
			q.pathname = 'dueDays-master';
			q.pageName = 'Due Days Master';
			q.MasterName = 'Due Days Master';
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
		server.get('/admin/section-master', (req, res) => {
			const q = req.query;
			q.tab = 'section-master';
			q.pathname = 'dueDays-master';
			q.pageName = 'Section Master';
			q.MasterName = 'Section Master';
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
		server.get('/admin/subSection-master', (req, res) => {
			const q = req.query;
			q.tab = 'subSection-master';
			q.pathname = 'subSection-master';
			q.pageName = 'Sub Section Master';
			q.MasterName = 'Sub Section Master';
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
		server.get('/admin/audit-observation-master', (req, res) => {
			const q = req.query;
			q.tab = 'audit-observation-master';
			q.pathname = 'audit-observation-master';
			q.pageName = 'Audit Observation Master';
			q.MasterName = 'Audit Observation Master';
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
		server.get('/admin/Audit_Mode_Master', (req, res) => {
			const q = req.query;
			q.tab = 'Audit_Mode_Master';
			q.pathname = 'admin';
			q.pageName = 'Audit Mode Master';
			q.MasterName = 'Audit Mode Master';
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
		server.get('/admin/criticality-master', (req, res) => {
			const q = req.query;
			q.tab = 'criticality-master';
			q.pathname = 'criticality-master';
			q.pageName = 'Criticality Master';
			q.MasterName = 'Criticality Master';
			return app.render(req, res, '/admin', {
				page: q.pageName,
				MasterName :q.MasterName,
				tab: q.tab,
				section: 'master',
				query: {
					...q
				}
			});
		});	
	

		server.get('/admin/scoring-rule-master', (req, res) => {
			const q = req.query;
			q.tab = 'scoring-rule-master';
			q.pathname = 'scoring-rule-master';
			q.pageName = 'Scoring Rule Master';
			q.MasterName = 'Scoring Rule Master';
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
		server.get('/admin/audit-type-auditor-relation', (req, res) => {
			const q = req.query;
			q.tab = 'audit-type-auditor-relation';
			q.pathname = 'audit-type-auditor-relation';
			q.pageName = 'Audit Type Auditor Relation Master';
			q.MasterName = 'Audit Type Auditor Relation Master';
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
		server.get('/admin/processFlow-master', (req, res) => {
			const q = req.query;
			q.tab = 'processFlow-master';
			q.pathname = 'processFlow-master';
			q.pageName = 'Process Flow Master';
			q.MasterName = 'Process Flow Master';
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
		server.get('/admin/process-flow-responsibility-master', (req, res) => {
			const q = req.query;
			q.tab = 'process-flow-responsibility-master';
			q.pathname = 'process-flow-responsibility-master';
			q.pageName = 'Process Flow Responsibility Master';
			q.MasterName = 'Process Flow Responsibility Master';
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
		server.get('/admin/scope-master', (req, res) => {
			const q = req.query;
			q.tab = 'scope-master';
			q.pathname = 'scope-master';
			q.pageName = 'Scope Master';
			q.MasterName = 'Scope Master';
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
		server.get('/admin/year-master', (req, res) => {
			const q = req.query;
			q.tab = 'year-master';
			q.pathname = 'year-master';
			q.pageName = 'Year Master';
			q.MasterName = 'Year Master';
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


		//-------------------Working Section--------------------//

		server.get('/corporateCoordinator/self-audit-planning', (req, res) => {
			const q = req.query;
			q.tab = 'self-audit-planning';
			q.pageName = 'Self Audit Planning';
			console.log("q", q);
			return app.render(req, res, '/corporateCoordinator', {
				page: 'Self Audit Planning',
				tab: 'self-audit-planning',
				section: 'working',
				query: {
					...q
				}
				// query:{
				// 	tab: 'self-audit-planning', 
				// 	pageName: 'Self Audit Planning',
				// 	...q
				// }
			});
		});
		server.get('/corporateCoordinator/self-audit-reschedule', (req, res) => {
			const q = req.query;
			q.tab = 'self-audit-reschedule';
			q.pageName = 'Self Audit Reschedule';
			return app.render(req, res, '/corporateCoordinator', {
				page: 'Self Audit Reschedule',
				tab: 'self-audit-reschedule',
				section: 'working',
				query: {
					...q
				}
			});
		});

		server.get('/corporateCoordinator/self-audit-planning-details', (req, res) => {
			return app.render(req, res, '/corporateCoordinator', {
				page: 'Self Audit Plan Details',
				tab: 'self-audit-planning-details',
				section: 'working',
				query: {
					tab: 'self-audit-planning-details',
					id: undefined,
					pageName: 'Self Audit Planning details'
				}
			});
		});

		server.get('/corporateCoordinator/final-audit-planning', (req, res) => {
			const q = req.query;
			//console.log("q", q);
			return app.render(req, res, '/corporateCoordinator', {
				page: 'Final Audit Plan',
				tab: 'final-audit-planning',
				section: 'working',
				query: {
					tab: 'final-audit-planning',
					id: undefined,
					pageName: 'Final Audit Plan'
				}
			});
		});
		server.get('/corporateCoordinator', (req, res) => {
			return app.render(req, res, '/corporateCoordinator', {
				page: 'Dashboard',
				tab: 'dashboard',
				section: 'working',
				query: {
					tab: 'dashboard',
					id: undefined,
					page: 'Dashboard',
					pageName: 'Dashboard'
				}
			});
		});
		server.get('/plantHrHead', (req, res) => {
			return app.render(req, res, '/plantHrHead', {
				page: 'Dashboard',
				tab: 'dashboard',
				section: 'working',
				query: {
					tab: 'dashboard',
					page: 'Dashboard',
					id: undefined,
					pageName: 'Dashboard'
				}
			});
		});
		server.get('/plantHrHead/self-audit-team-assigment-and-audit-execution', (req, res) => {
			return app.render(req, res, '/plantHrHead', {
				page: 'Team Assigment & Audit Execution',
				tab: 'self-audit-team-assigment-and-audit-execution',
				section: 'working',
				query: {
					tab: 'self-audit-team-assigment-and-audit-execution',
					id: undefined,
					pageName: 'Team Assigment & Audit Execution'
				}
			});
		});
		server.get('/plantHrHead/self-audit-execution', (req, res) => {
			const q = req.query;
			console.log("router Jaswant ", q);
			return app.render(req, res, '/plantHrHead', {
				page: 'Self Audit Execution',
				tab: 'self-audit-execution',
				section: 'working',
				query: {
					tab: 'self-audit-execution',
					id: undefined,
					pageName: 'Self Audit Execution'
				}
			});
		});

		server.get('/plantHrHead/view-self-audit-score', (req, res) => {
			const q = req.query;
			return app.render(req, res, '/plantHrHead', {
				page: 'Self Audit Score',
				tab: 'view-self-audit-score',
				section: 'working',
				query: {
					tab: 'view-self-audit-score',
					id: undefined,
					pageName: 'Self Audit Score'
				}
			});
		});

		server.get('/corporateCoordinator/view-self-audit-score', (req, res) => {
			const q = req.query;
			return app.render(req, res, '/corporateCoordinator', {
				page: 'Self Audit Score',
				tab: 'view-self-audit-score',
				section: 'working',
				query: {
					tab: 'view-self-audit-score',
					id: undefined,
					pageName: 'Self Audit Score'
				}
			});
		});

		server.get('/corporateCoordinator/final-audit-plan', (req, res) => {
			const q = req.query;
			return app.render(req, res, '/corporateCoordinator', {
				page: 'Final Audit Plan',
				tab: 'final-audit-plan',
				section: 'working',
				query: {
					tab: 'final-audit-plan',
					id: undefined,
					pageName: 'Final Audit Plan'
				}
			});
		});

		server.get('/auditor/view-final-audit-score', (req, res) => {
			const q = req.query;
			return app.render(req, res, '/auditor', {
				page: 'Final Audit Score',
				tab: 'view-final-audit-score',
				section: 'working',
				query: {
					tab: 'view-final-audit-score',
					id: undefined,
					pageName: 'Final Audit Score'
				}
			});
		});

		server.get('/plantHrHead/view-final-audit-score', (req, res) => {
			const q = req.query;
			return app.render(req, res, '/plantHrHead', {
				page: 'Final Audit Score',
				tab: 'view-final-audit-score',
				section: 'working',
				query: {
					tab: 'view-final-audit-score',
					id: undefined,
					pageName: 'Final Audit Score'
				}
			});
		});

		server.get('/corporateCoordinator/reschedule-final-audit', (req, res) => {
			const q = req.query;
			q.tab = 'reschedule-final-audit';
			q.pageName = 'Reschedule Final Audit';
			return app.render(req, res, '/corporateCoordinator', {
				page: 'Reschedule Final Audit',
				pathname: 'corporateCoordinator',
				tab: 'reschedule-final-audit',
				section: 'working',
				query: {
					...q
				}
			});
		});
		server.get('/corporateCoordinator/view-final-audit-action-plan', (req, res) => {
			console.log("req : ", req.query);
			const q = req.query;
			q.tab = 'view-final-audit-action-plan';
			q.pageName = 'View Final Audit Action Plan';
			return app.render(req, res, '/corporateCoordinator', {
				page: 'View Final Audit Action Plan',
				tab: 'view-final-audit-action-plan',
				section: 'working',
				query: {
					...q
				}
			});
		});
		server.get('/corporateCoordinator/view-final-audit-action-plan-details', (req, res) => {
			console.log("req : ", req.query);
			const q = req.query;
			q.tab = 'view-final-audit-action-plan-details';
			q.pageName = 'View Final Audit Action Plan';
			return app.render(req, res, '/corporateCoordinator', {
				page: 'View Final Audit Action Plan',
				tab: 'view-final-audit-action-plan-details',
				section: 'working',
				query: {
					...q
				}
			});
		});

		server.get('/companyHRHead', (req, res) => {
			return app.render(req, res, '/companyHRHead', {
				page: 'Dashboard',
				tab: 'dashboard',
				section: 'working',
				query: {
					tab: 'dashboard',
					page: 'Dashboard',
					id: undefined,
					pageName: 'Dashboard'
				}
			});
		});

		server.get('/companyHRHead/final-audit-closure', (req, res) => {
			const q = req.query;
			return app.render(req, res, '/companyHRHead', {
				page: 'Final Audit Closure',
				tab: 'final-audit-closure',
				section: 'working',
				query: {
					tab: 'final-audit-closure',
					id: undefined,
					pageName: 'Final Audit Closure'
				}
			});
		});

		server.get('/companyHRHead/update-final-audit-closure', (req, res) => {
			const q = req.query;
			return app.render(req, res, '/companyHRHead', {
				page: 'Update Final Audit Closure',
				tab: 'update-final-audit-closure',
				section: 'working',
				query: {
					tab: 'update-final-audit-closure',
					id: undefined,
					pageName: 'Update Final Audit Closure'
				}
			});
		});

		server.get('/auditor', (req, res) => {
			return app.render(req, res, '/auditor', {
				page: 'Dashboard',
				tab: 'dashboard',
				section: 'working',
				query: {
					tab: 'dashboard',
					page: 'Dashboard',
					id: undefined,
					pageName: 'Dashboard'
				}
			});
		});

		server.get('/auditor/dashboard', (req, res) => {
			return app.render(req, res, '/auditor', {
				page: 'Dashboard',
				tab: 'dashboard',
				section: 'working',
				query: {
					tab: 'dashboard',
					page: 'Dashboard',
					id: undefined,
					pageName: 'Dashboard'
				}
			});
		});

		server.get('/auditor/final-audit-execution-index', (req, res) => {
			console.log("req : ", req.query);
			const q = req.query;
			q.tab = 'final-audit-execution-index';
			q.pageName = 'Audit Observation';
			return app.render(req, res, '/auditor', {
				page: 'Audit Observation',
				tab: 'final-audit-execution-index',
				section: 'working',
				query: {
					...q
				}
			});
		});

		server.get('/auditor/update-final-audit-observations', (req, res) => {
			console.log("req : ", req.query);
			const q = req.query;
			q.tab = 'update-final-audit-observations';
			q.pageName = 'Update Final Audit Observation';
			return app.render(req, res, '/auditor', {
				page: 'Update Final Audit Observation',
				tab: 'update-final-audit-observations',
				section: 'working',
				query: {
					...q
				}
			});
		});


		server.get('/plantHrHead/action-plan-update', (req, res) => {
			const q = req.query;
			q.tab = 'action-plan-update';
			q.pageName = 'Action Plan Update';
			return app.render(req, res, '/plantHrHead', {
				page: q.pageName,
				tab: q.tab,
				section: 'working',
				query: {
					...q
				}
			});
		});

		server.get('/plantHrHead/update-observation-action-plan', (req, res) => {
			const q = req.query;
			q.tab = 'update-observation-action-plan';
			q.pageName = 'Update Observation Action Plan';
			return app.render(req, res, '/plantHrHead', {
				page: q.pageName,
				tab: q.tab,
				section: 'working',
				query: {
					...q
				}
			});
		});


		server.get('/plantHrHead/view-action-plan-details', (req, res) => {
			const q = req.query;
			q.tab = 'view-action-plan-details';
			q.pageName = 'View Action Plan Details';
			return app.render(req, res, '/plantHrHead', {
				page: q.pageName,
				tab: q.tab,
				section: 'working',
				query: {
					...q
				}
			});
		});


		server.get('/auditor/view-action-plan-details', (req, res) => {
			const q = req.query;
			q.tab = 'view-action-plan-details';
			q.pageName = 'View Action Plan Details';
			return app.render(req, res, '/auditor', {
				page: q.pageName,
				tab: q.tab,
				section: 'working',
				query: {
					...q
				}
			});
		});

		server.get('/corporateCoordinator/view-action-plan-details', (req, res) => {
			const q = req.query;
			q.tab = 'view-action-plan-details';
			q.pageName = 'View Action Plan Details';
			return app.render(req, res, '/corporateCoordinator', {
				page: q.pageName,
				tab: q.tab,
				section: 'working',
				query: {
					...q
				}
			});
		});

		server.get('/management/view-action-plan-details', (req, res) => {
			const q = req.query;
			q.tab = 'view-action-plan-details';
			q.pageName = 'View Action Plan Details';
			return app.render(req, res, '/management', {
				page: q.pageName,
				tab: q.tab,
				section: 'working',
				query: {
					...q
				}
			});
		});

		server.get('/plantHrHead/monthly-review', (req, res) => {
			const q = req.query;
			q.tab = 'monthly-review';
			q.pageName = 'Monthly Review';
			return app.render(req, res, '/plantHrHead', {
				page: q.pageName,
				tab: q.tab,
				section: 'working',
				query: {
					...q
				}
			});
		});

		server.get('/plantHrHead/monthly-review-update', (req, res) => {
			const q = req.query;
			q.tab = 'monthly-review-update';
			q.pageName = 'Monthly Review';
			return app.render(req, res, '/plantHrHead', {
				page: q.pageName,
				tab: q.tab,
				section: 'working',
				query: {
					...q
				}
			});
		});

		server.get('/plantHrHead/review-final-audit-action-plan', (req, res) => {
			const q = req.query;
			q.tab = 'review-final-audit-action-plan';
			q.pageName = 'Monthly Review';
			return app.render(req, res, '/plantHrHead', {
				page: q.pageName,
				tab: q.tab,
				section: 'working',
				query: {
					...q
				}
			});
		});


		//------------------Working Section End----------------------//
		//------------------View Summary -------------//
		server.get('/plantHrHead/view-audit-complete-summary', (req, res) => {
			const q = req.query;
			q.tab = 'view-audit-complete-summary';
			q.pageName = 'View Audit Summary Details';
			q.page = 'View Audit Summary Details';
			return app.render(req, res, '/plantHrHead', {
				page: q.pageName,
				tab: q.tab,
				section: 'working',
				query: {
					...q
				}
			});
		});

		server.get('/corporateCoordinator/view-audit-complete-summary', (req, res) => {
			const q = req.query;
			q.tab = 'view-audit-complete-summary';
			q.pageName = 'View Audit Summary Details';
			q.page = 'View Audit Summary Details';
			return app.render(req, res, '/corporateCoordinator', {
				page: q.pageName,
				tab: q.tab,
				section: 'working',
				query: {
					...q
				}
			});
		});

		server.get('/management/view-audit-complete-summary', (req, res) => {
			const q = req.query;
			q.tab = 'view-audit-complete-summary';
			q.pageName = 'View Audit Summary Details';
			q.page = 'View Audit Summary Details';
			return app.render(req, res, '/management', {
				page: q.pageName,
				tab: q.tab,
				section: 'working',
				query: {
					...q
				}
			});
		});

		server.get('/auditor/view-audit-complete-summary', (req, res) => {
			const q = req.query;
			q.tab = 'view-audit-complete-summary';
			q.pageName = 'View Audit Summary Details';
			q.page = 'View Audit Summary Details';
			return app.render(req, res, '/auditor', {
				page: q.pageName,
				tab: q.tab,
				section: 'working',
				query: {
					...q
				}
			});
		});
		server.get('/auditor/update-final-audit-execution', (req, res) => {
			const q = req.query;
			q.tab = 'update-final-audit-execution';
			q.pageName = 'Update Final Audit Execution';
			q.page = 'Update Final Audit Execution';
			return app.render(req, res, '/admin', {
				page: q.pageName,
				tab: q.tab,
				section: 'working',
				query: {
					...q
				}
			});
		});

		server.get('/companyHRHead/view-audit-complete-summary', (req, res) => {
			const q = req.query;
			q.tab = 'view-audit-complete-summary';
			q.pageName = 'View Audit Summary Details';
			q.page = 'View Audit Summary Details';
			return app.render(req, res, '/companyHRHead', {
				page: q.pageName,
				tab: q.tab,
				section: 'working',
				query: {
					...q
				}
			});
		}); 

		server.get('/admin/view-audit-complete-summary', (req, res) => {
			const q = req.query;
			q.tab = 'view-audit-complete-summary';
			q.pageName = 'View Audit Summary Details';
			q.page = 'View Audit Summary Details';
			return app.render(req, res, '/admin', {
				page: q.pageName,
				tab: q.tab,
				section: 'working',
				query: {
					...q
				}
			});
		});
		//------------------View Summary Section End----------------------//
		//-------------------Change Password Section Section--------------------//
		server.get('/corporateCoordinator/change-password', (req, res) => {
			return app.render(req, res, '/corporateCoordinator', {
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
		server.get('/plantHrHead/change-password', (req, res) => {
			return app.render(req, res, '/plantHrHead', {
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
		server.get('/auditor/change-password', (req, res) => {
			return app.render(req, res, '/auditor', {
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
		server.get('/subAdmin/change-password', (req, res) => {
			return app.render(req, res, '/subAdmin', {
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
		server.get('/companyHRHead/change-password', (req, res) => {
			return app.render(req, res, '/companyHRHead', {
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

		server.get('/anchor/reconcilition-report', (req, res) => {
			const q = req.query;
			return app.render(req, res, '/anchor', {
				page: 'reconcilition-report',
				tab: 'reconcilition-report',
				section: 'dashboard',
				...q,
			});
		});

		server.get('/anchor/received-invoice-report', (req, res) => {
			const q = req.query;
			return app.render(req, res, '/anchor', {
				page: 'received-invoice-report',
				tab: 'received-invoice-report',
				section: 'dashboard',
				...q,
			});
		});
		server.get('/management/received-invoice-report', (req, res) => {
			const q = req.query;
			return app.render(req, res, '/anchor', {
				page: 'received-invoice-report',
				tab: 'received-invoice-report',
				section: 'dashboard',
				...q,
			});
		});
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
