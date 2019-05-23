function requestPermission() {
    if ('Notification' in window) {
        Notification.requestPermission().then(function (result) {
            if (result === "denied") {
                console.log("Fitur notifikasi tidak diijinkan.");
                return;
            } else if (result === "default") {
                console.error("Pengguna menutup kotak dialog permintaan ijin.");
                return;
            }

            if (('PushManager' in window)) {
                navigator.serviceWorker.getRegistration().then(function(reg) {
                    reg.pushManager.subscribe({
                        userVisibleOnly: true
                    }).then(function(sub) {
                        console.log('Berhasil melakukan subscribe dengan endpoint: ', sub.endpoint);
                        console.log('Berhasil melakukan subscribe dengan p256dh key: ', btoa(String.fromCharCode.apply(null, new Uint8Array(sub.getKey('p256dh')))));
                        console.log('Berhasil melakukan subscribe dengan auth key: ', btoa(String.fromCharCode.apply(null, new Uint8Array(sub.getKey('auth')))));
                    }).catch(function(e) {
                        console.error('Tidak dapat melakukan subscribe ', e);
                    });
                });
            }
        });
    }
}

function registerServiceWorker() {
    window.addEventListener("load", function() {
        navigator.serviceWorker
        .register("/service-worker.js")
        .then(function() {
            console.log("Pendaftaran ServiceWorker berhasil");
        })
        .catch(function() {
            console.log("Pendaftaran ServiceWorker gagal");
        });
    });
}

String.prototype.trunc = String.prototype.trunc || function(n) {
        return (this.length > n) ? this.substr(0, n-1) + '&hellip;' : this;
    };

function loadStandings() {
    var standings = getStandings();

    standings.then(function(data) {
        var html = "";
        console.log(data);

        data.standings.forEach(function(standing) {
            console.log(standing);
            html += `<p><b>${standing.group}</b></p>`;
            html += `
            <table>
                <thead>
                <tr>
                    <th>#</th>
                    <th colspan="2">Team</th>
                    <th>PL</th>
                    <th>W</th>
                    <th>D</th>
                    <th>L</th>
                    <th>Pts</th>
                </tr>
                </thead>
                <tbody>
            `;

            standing.table.forEach(function(result) {
                console.log(result);
                var team_badge = result.team.crestUrl;
                if (team_badge != null) team_badge =  team_badge.replace(/^http:\/\//i, 'https://');

                html += `
                <tr>
                    <td>${result.position}</td>
                    <td><img class="responsive-img" src="${team_badge || 'img/team_badge.png'}" width="24" height="24" onerror="this.onerror=null;this.src='img/team_badge.png';"></td>
                    <td>${result.team.name}</td>
                    <td>${result.playedGames}</td>
                    <td>${result.won}</td>
                    <td>${result.draw}</td>
                    <td>${result.lost}</td>
                    <td>${result.points}</td>
                </tr>
                `
            })

            html += `</tbody></table>`;
        })

        document.getElementById("standings").innerHTML = html;
    }).catch(error);
}

function loadMatches() {
    var matches = getMatches()

    matches.then(function(data) {
        var html = "";
        console.log(data);

        data.matches.sort(compareMatch);
        data.matches.reverse();

        data.matches.forEach(function(match) {
            var homeTeam = match.homeTeam.name;
            var awayTeam = match.awayTeam.name;
            var date = new Date(match.utcDate);

            html += `
            <div class="col l6 s12 offset-l3">
            <div class="card waves-effect" style="width: 100%">
                <div class="card-content">`;

            html += `
            <div class="row valign-wrapper">
                <div class="col s5 right-align"><h5>${homeTeam}</h5></div>
                <div class="col s2 center-align"><h5>VS</h5></div>
                <div class="col s5 left-align"><h5>${awayTeam}</h5></div>
            </div>`

            html += `<p align="center">${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}</p>`;
            html += `<p align="center">${date.toLocaleTimeString()}</p><br>`;

            html += `<p align="center"><b>Full Time</b></p>`;
            html += `<p align="center">${match.score.fullTime.homeTeam} : ${match.score.fullTime.awayTeam}</p>`;

            if (match.score.halfTime.homeTeam != null && match.score.halfTime.awayTeam != null) {
                html += `<p align="center"><b>Half Time</b></p>`;
                html += `<p align="center">${match.score.halfTime.homeTeam} : ${match.score.halfTime.awayTeam}</p>`;
            }

            if (match.score.extraTime.homeTeam != null && match.score.extraTime.awayTeam != null) {
                html += `<p align="center"><b>Extra Time</b></p>`;
                html += `<p align="center">${match.score.extraTime.homeTeam} : ${match.score.extraTime.awayTeam}</p>`;
            }

            if (match.score.penalties.homeTeam != null && match.score.penalties.awayTeam != null) {
                html += `<p align="center"><b>Penalties</b></p>`;
                html += `<p align="center">${match.score.penalties.homeTeam} : ${match.score.penalties.awayTeam}</p>`;
            }

            html += `
                </div>
            </div>
            </div>`;
        })

        document.getElementById("matches").innerHTML = html;
    }).catch(error);
}

function loadTeams() {
    var teams = getTeams();
    teams.then(function(data) {
        var html = "";
        console.log(data);

        data.teams.forEach(function(team) {
            console.log(team);
            var team_badge = team.crestUrl;
            if (team_badge != null) team_badge =  team_badge.replace(/^http:\/\//i, 'https://');

            html += `
            <div class="grid-example col s12 m12 l6 offset-l3">
            <a href="./team.html?id=${team.id}">
                <div class="card waves-effect" style="width:100%">
                    <div class="card-content">
                        <div class="row">
                            <div class="grid-example col s4">
                                <img src="${team_badge || 'img/team_badge.png'}" class="responsive-img" onerror="this.onerror=null;this.src='img/team_badge.png';">
                            </div>
                            <div class="grid-example col s8">
                                <p><b>${team.name}</b></p>
                                <p>${team.venue}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </a>
            </div>
            `;
        })
        document.getElementById("teams").innerHTML = html;
    }).catch(error);
}

function loadTeamById() {
    var urlParams = new URLSearchParams(window.location.search);
    var id = urlParams.get("id");

    var team = getTeamById(id);
    team.then(function(data) {
        var team_badge = data.crestUrl;
        team_badge =  team_badge.replace(/^http:\/\//i, 'https://');

        document.getElementById("team_badge").innerHTML = `<img src="${team_badge || 'img/team_badge.png'}" class="responsive-img">`;
        document.getElementById("team_detail").innerHTML = `
            <h5>${data.name}</h5>
            <p>Stadium: ${data.venue}</p>
            <p>${data.phone}</p>
            <p>${data.website}</p>
            <p>${data.email}</p>
        `;

        var competition_html = "";
        data.activeCompetitions.forEach(function(competition) {
            competition_html += `
            <div class="col s12 l6">
                <div class="row valign-wrapper">
                    <div class="col s2">
                        <i class="circle indigo white-text" style="padding: 8px;width:50px;height:50px">${competition.code}</i>
                    </div>
                    <div class="col s10">
                        <p>${competition.name}</p>
                        <p>${competition.area.name}</p>
                    </div>
                </div>
            </div>
            `;
        });

        document.getElementById("competitions").innerHTML = competition_html;

        var players_html = "";
        data.squad.forEach(function(player) {
            players_html += `
            <div class="col s12 l6">
                <div class="row">
                    <div class="col s2">
                        <i class="material-icons circle indigo white-text" style="padding: 8px;">person</i>
                    </div>
                    <div class="col s10">
                        <p>${player.name}</p>
                        <p>${player.position}</p>
                    </div>
                </div>
            </div>
            `;
        });

        document.getElementById("players").innerHTML = players_html;
    }).catch(error);

    return team;
}

function getSavedTeams() {
    getAll().then(function(data) {
        var html = "";
        console.log(data);

        data.forEach(function(team) {
            console.log(team);
            var team_badge = team.crestUrl;
            if (team_badge != null) team_badge =  team_badge.replace(/^http:\/\//i, 'https://');

            html += `
            <div class="grid-example col s12 m12 l6 offset-l3">
            <a href="./team.html?id=${team.id}&saved=true">
                <div class="card waves-effect" style="width:100%">
                    <div class="card-content">
                        <div class="row">
                            <div class="grid-example col s4">
                                <img src="${team_badge || 'img/team_badge.png'}" class="responsive-img" onerror="this.onerror=null;this.src='img/team_badge.png';">
                            </div>
                            <div class="grid-example col s8">
                                <p><b>${team.name}</b></p>
                                <p>${team.venue}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </a>
            </div>
            `;
        })
        document.getElementById("teams").innerHTML = html;
    });
}

function getSavedTeamById() {
    var urlParams = new URLSearchParams(window.location.search);
    var id = urlParams.get("id");
    console.log(id);

    var team = getById(id);
    console.log(team);

    team.then(function(data) {
        console.log(data);
        var team_badge = data.crestUrl;
        team_badge =  team_badge.replace(/^http:\/\//i, 'https://');

        document.getElementById("team_badge").innerHTML = `<img src="${team_badge || 'img/team_badge.png'}" class="responsive-img">`;
        document.getElementById("team_detail").innerHTML = `
            <h5>${data.name}</h5>
            <p>Stadium: ${data.venue}</p>
            <p>${data.phone}</p>
            <p>${data.website}</p>
            <p>${data.email}</p>
        `;

        var competition_html = "";
        data.activeCompetitions.forEach(function(competition) {
            competition_html += `
            <div class="col s12 l6">
                <div class="row valign-wrapper">
                    <div class="col s2">
                        <i class="circle indigo white-text" style="padding: 8px;width:50px;height:50px">${competition.code}</i>
                    </div>
                    <div class="col s10">
                        <p>${competition.name}</p>
                        <p>${competition.area.name}</p>
                    </div>
                </div>
            </div>
            `;
        });

        document.getElementById("competitions").innerHTML = competition_html;

        var players_html = "";
        data.squad.forEach(function(player) {
            players_html += `
            <div class="col s12 l6">
                <div class="row">
                    <div class="col s2">
                        <i class="material-icons circle indigo white-text" style="padding: 8px;">person</i>
                    </div>
                    <div class="col s10">
                        <p>${player.name}</p>
                        <p>${player.position}</p>
                    </div>
                </div>
            </div>
            `;
        });

        document.getElementById("players").innerHTML = players_html;
    });

    return team;
}

function compareMatch(a, b) {
    var dateA = new Date(a.utcDate);
    var dateB = new Date(b.utcDate);

    if (dateA < dateB) return -1;
    else if (dateB > dateA) return 1;

    return 0;
}