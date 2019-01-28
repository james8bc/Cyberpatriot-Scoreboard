class Team {
    constructor(team) {
        this.team = team;
        this.getStats();
    }

    getStats() {
        this.state = "CO";
        this.time = "5:30";
        this.windows = "34";
        this.windowsScore = "96";
        this.server = "34";
        this.serverScore = "96";
        this.ubuntu = "34";
        this.ubuntuScore = "96";
        this.debian = "34";
        this.debianScore = "96";
        this.score = "369";
        this.stateRank = "1/41";
        this.rank = "1/172";
    }

    getTeam() {
        return "11-" + this.team;
    }
    getState() {
        return this.state;
    }
    getTime() {
        return this.time;
    }
    getWindows() {
        return this.windows + "/36";
    }
    getServer() {
        return this.server + "/36";
    }
    getUbuntu() {
        return this.ubuntu + "/36";
    }
    getDebian() {
        return this.debian + "/36";
    }
    getWindowsScore() {
        return this.windowsScore;
    }
    getServerScore() {
        return this.serverScore;
    }
    getUbuntuScore() {
        return this.ubuntuScore;
    }
    getDebianScore() {
        return this.debianScore;
    }
    getScore() {
        return this.score + "/400";
    }
    getStateRank() {
        return this.stateRank;
    }
    getRank() {
        return this.rank;
    }
}

teamsnums = ["5088", "5089", "5090"];
teams = [];
for (var i = 0; i < teamsnums.length; i++) {
    teams[i] = new Team(teamsnums[i]);
}
teams[0].score = 40;
teams[2].score = 69;
teams.sort(function(a, b) {
    return b.score - a.score
});
var body = document.getElementsByTagName('body')[0];
var tbl = document.createElement('table');
tbl.style.width = '100%';
tbl.setAttribute('border', '1');
var tbdy = document.createElement('tbody');
for (var i = 0; i < teams.length + 1; i++) {
    var tr = document.createElement('tr');
    for (var j = 0; j < 14; j++) {
        if (i == teams.length + 1 && j == 9)
            break
        else {
            var td = document.createElement('td');
            if (i % 2 != 0)
                tr.style.backgroundColor = "#f4f9ff"
            else if (i % 2 == 0 && i != 0)
                tr.style.backgroundColor = "#dbebff"
            td.appendChild(document.createTextNode('\u0020'));
            tr.appendChild(td);
        }
        if (i == 0)
            td.style.fontSize = "300%"
        else
            td.style.fontSize = "200%"
    }
    tbdy.appendChild(tr);
}

tbl.appendChild(tbdy);
body.appendChild(tbl);
tbdy.rows[0].deleteCell(7);
tbdy.rows[0].deleteCell(8);
tbdy.rows[0].deleteCell(9);
tbdy.rows[0].deleteCell(10);
tbdy.rows[0].cells[3].innerHTML = tbdy.rows[0].cells[3].innerHTML
tbdy.rows[0].cells[3].colSpan = 2;
tbdy.rows[0].cells[4].innerHTML = tbdy.rows[0].cells[4].innerHTML
tbdy.rows[0].cells[4].colSpan = 2;
tbdy.rows[0].cells[5].innerHTML = tbdy.rows[0].cells[5].innerHTML
tbdy.rows[0].cells[5].colSpan = 2;
tbdy.rows[0].cells[6].innerHTML = tbdy.rows[0].cells[6].innerHTML
tbdy.rows[0].cells[6].colSpan = 2;

for (var i = 0; i < teams.length; i++) {
    tbdy.childNodes[i + 1].childNodes[0].textContent = teams[i].getTeam();
    tbdy.childNodes[i + 1].childNodes[1].textContent = teams[i].getState();
    tbdy.childNodes[i + 1].childNodes[2].textContent = teams[i].getTime();
    tbdy.childNodes[i + 1].childNodes[3].textContent = teams[i].getWindows();
    tbdy.childNodes[i + 1].childNodes[4].textContent = teams[i].getWindowsScore();
    tbdy.childNodes[i + 1].childNodes[5].textContent = teams[i].getServer();
    tbdy.childNodes[i + 1].childNodes[6].textContent = teams[i].getServerScore();
    tbdy.childNodes[i + 1].childNodes[7].textContent = teams[i].getUbuntu();
    tbdy.childNodes[i + 1].childNodes[8].textContent = teams[i].getUbuntuScore();
    tbdy.childNodes[i + 1].childNodes[9].textContent = teams[i].getDebian();
    tbdy.childNodes[i + 1].childNodes[10].textContent = teams[i].getDebianScore();
    tbdy.childNodes[i + 1].childNodes[11].textContent = teams[i].getScore();
    tbdy.childNodes[i + 1].childNodes[12].textContent = teams[i].getStateRank();
    tbdy.childNodes[i + 1].childNodes[13].textContent = teams[i].getRank();
}

tbdy.align = "center"
tbdy.childNodes[0].childNodes[0].textContent = "Team"
tbdy.childNodes[0].childNodes[1].textContent = "State"
tbdy.childNodes[0].childNodes[2].textContent = "Time"
tbdy.childNodes[0].childNodes[3].textContent = "Windows"
tbdy.childNodes[0].childNodes[4].textContent = "Server"
tbdy.childNodes[0].childNodes[5].textContent = "Ubuntu"
tbdy.childNodes[0].childNodes[6].textContent = "Debian"
tbdy.childNodes[0].childNodes[7].textContent = "Score"
tbdy.childNodes[0].childNodes[8].textContent = "State"
tbdy.childNodes[0].childNodes[9].textContent = "Rank"
tbdy.rows[0].cells[6].innerHTML = tbdy.rows[0].cells[6].innerHTML
tbdy.rows[0].cells[6].colSpan = 2;

for (var i = 0; i < teams.length; i++) {
    tbdy.childNodes[i + 1].childNodes[0].textContent = teams[i].getTeam();
    tbdy.childNodes[i + 1].childNodes[1].textContent = teams[i].getState();
    tbdy.childNodes[i + 1].childNodes[2].textContent = teams[i].getTime();
    tbdy.childNodes[i + 1].childNodes[3].textContent = teams[i].getWindows();
    tbdy.childNodes[i + 1].childNodes[4].textContent = teams[i].getWindowsScore();
    tbdy.childNodes[i + 1].childNodes[5].textContent = teams[i].getServer();
    tbdy.childNodes[i + 1].childNodes[6].textContent = teams[i].getServerScore();
    tbdy.childNodes[i + 1].childNodes[7].textContent = teams[i].getUbuntu();
    tbdy.childNodes[i + 1].childNodes[8].textContent = teams[i].getUbuntuScore();
    tbdy.childNodes[i + 1].childNodes[9].textContent = teams[i].getDebian();
    tbdy.childNodes[i + 1].childNodes[10].textContent = teams[i].getDebianScore();
    tbdy.childNodes[i + 1].childNodes[11].textContent = teams[i].getScore();
    tbdy.childNodes[i + 1].childNodes[12].textContent = teams[i].getStateRank();
    tbdy.childNodes[i + 1].childNodes[13].textContent = teams[i].getRank();
}

tbdy.align = "center"
tbdy.childNodes[0].childNodes[0].textContent = "Team"
tbdy.childNodes[0].childNodes[1].textContent = "State"
tbdy.childNodes[0].childNodes[2].textContent = "Time"
tbdy.childNodes[0].childNodes[3].textContent = "Windows"
tbdy.childNodes[0].childNodes[4].textContent = "Server"
tbdy.childNodes[0].childNodes[5].textContent = "Ubuntu"
tbdy.childNodes[0].childNodes[6].textContent = "Debian"
tbdy.childNodes[0].childNodes[7].textContent = "Score"
tbdy.childNodes[0].childNodes[8].textContent = "State"
tbdy.childNodes[0].childNodes[9].textContent = "Rank"