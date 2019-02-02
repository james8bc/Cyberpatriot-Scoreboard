var express = require('express');
var fs = require('fs');
var request = require('request-promise-native');
var cheerio = require('cheerio');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
const util = require('util')

//Store Overall Data in big JSON thing
var importantteams = ["11-0021", "11-0738"];
var json = {
	"teams": {},
	"important": {}
};

if (fs.existsSync("recover.json")) {
	json = JSON.parse(fs.readFileSync('recover.json', 'utf8', err => {
		if (err)
			throw err;
	}));
} else {
	console.log("Recovery file not found...");
}

scrape();
//Scrape CyperPatriot every 25 seconds, this is the live portion
setInterval(scrape, 20000);


async function spinCycle(team) {
	var requrl = "http://scoreboard.uscyberpatriot.org/team.php?team=" + team;
	console.log(requrl)
	console.log(team);
	let html = await request(requrl);
	var indx = html.indexOf("<tr><td>Debian8_cpxi_sf_pg", 2000);
	var e_indx = html.indexOf("</table><br>", 2000);
	//console.log(indx);
	var stuff = (html.substr(indx, indx - 2074));
	console.log(stuff);
	var patt = /<td>\s+([\d:]+)<\/td><td>([\d]+)<\/td><td>([\d]+)<\/td><td>([\d]+)<\/td><td>([\d]+)<\/td><td><\/td>/g;
	var data = patt.exec(stuff);
	var teams_data = [];
	while (data != null) {
		var team_data = [];
		team_data["vulns"] = data[2];
		team_data["remaining"] = data[3];
		team_data["score"] = data[5];
		teams_data.push(team_data);
		data = patt.exec(stuff);
	}
	console.log(teams_data);
	return teams_data;
	//console.log(res);
	var minijson = html.substr(indx, e_indx);
	//var testjson = JSON.parse(minijson);
	//console.log(minijson);
	console.log("hi");
}

function sleep(ms) {
	return new Promise(resolve => {
		setTimeout(resolve, ms)
	})
}

async function scrapeHTML(x) {
	var $ = cheerio.load(x);
	var doc = $.html();
	//console.log(doc);
	var table = $('.CSSTableGenerator');
	//console.log(table);
	var tbody = $(table).contents()[0];
	//console.log($(tbody).html());
	for (var i = 0; i < $(tbody).children().length; i++) {
		//console.log(i+": "+$($(tbody).children()[i]).text());

	}
	//  console.log($(tbody).contents().length);
	//$(tib)
	var rnkctr = [
		[0, 0, 0, 0],
		[0, 0, 0, 0],
		[0, 0, 0, 0],
		[0, 0, 0, 0]
	];
	for (var i = 1; i < $(tbody).children().length; i++) {
		var tdata = $(tbody).children()[i];
		var team_id = $($(tdata).children()[1]).text();
		//check if valid team

		//console.log(i+" team id : "+team_id);
		var team_state = $($(tdata).children()[2]).text();
		//console.log(i+" team state : "+team_state);
		var team_division = $($(tdata).children()[3]).text();

		var team_rank = 0;
		var team_tier = $($(tdata).children()[4]).text();
		//console.log(team_tier);
		switch (team_division[0]) {
			case "O":
				switch (team_tier[0]) {
					case "P":
						rnkctr[2][0]++;
						team_rank = rnkctr[2][0];
						break;
					default:
						//console.log("Incategorized Team - " + team_id);
						break;
				}
				break;
			default:
				//console.log("Invalid Ranking Team - " + team_id);
				break;
		}

		if (importantteams.indexOf(team_id) > -1) {
			console.log(team_id);

			var team_scored_images = $($(tdata).children()[5]).text();
			var team_play_time = $($(tdata).children()[6]).text();
			var team_warning = $($(tdata).children()[7]).text();
			var team_ccs_score = $($(tdata).children()[8]).text();
			console.log(team_id);
			var callback = await spinCycle(team_id)
			var team_data = {
				"rank": team_rank,
				"state": team_state,
				"division": team_division,
				"tier": team_tier,
				//"scored_images": team_scored_images,
				"play_time": team_play_time,
				"warning": team_warning,
				"ccs_score": team_ccs_score,
				"serverVulns": null,
				"serverScore": null,
				"windowsVulns": null,
				"windowsScore": null,
				"ubuntuVulns": null,
				"ubuntuScore": null,
				"debianVulns": null,
				"debianScore": null
			};
			team_data["debianVulns"] = callback[0]["vulns"];
			team_data["debianScore"] = callback[0]["score"];
			team_data["serverVulns"] = callback[1]["vulns"];
			team_data["serverScore"] = callback[1]["score"];
			team_data["ubuntuVulns"] = callback[2]["vulns"];
			team_data["ubuntuScore"] = callback[2]["score"];
			team_data["windowsVulns"] = callback[3]["vulns"];
			team_data["windowsScore"] = callback[3]["score"];
			
			json.important[team_id] = team_data;
			//console.log(json.important[team_id]);
			var bckup = JSON.stringify(json);
			fs.writeFile("backup.json", bckup, 'utf8', err => {
				if (err) {
					throw err;
				}
			});
		}
		//await sleep(0);
	}
	console.log("[INFO] FINISHED SCRAPING");
	return json;
}


function scrape() {
	var url = "http://scoreboard.uscyberpatriot.org/index.php?division=Open&tier=Platinum";
	request(url, function(error, response, html) {
		if (!error) {
			scrapeHTML(html);
		} else {
			url = "cpccs.htm";
			scrapeHTML(fs.readFileSync(url, "utf-8"));
		}
	});
	pushUpdate();
}

io.on('connection', function(socket) {
	console.log("someone connected");
	scrape();
});

function pushUpdate() {
	io.emit('data-updated', json);
}

app.get('/', function(req, res) {
	res.sendFile((__dirname + '/app.html'));
});

server.listen((process.env.PORT || 3000), function() {
	console.log("now listening");
});