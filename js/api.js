const API_KEY = "a19a46f97298407091ddad02e432522c";
const LEAGUE_ID = "2001";
const base_url = "https://api.football-data.org/v2/"
var standing_ep = `${base_url}competitions/${LEAGUE_ID}/standings?standingType=TOTAL`
var matches_ep = `${base_url}competitions/${LEAGUE_ID}/matches`
var teams_ep = `${base_url}competitions/${LEAGUE_ID}/teams`

var match_detail = `${base_url}/matches/`
var team_detail = `${base_url}/teams/`

function fetchAPI(url) {
    return fetch(url, {
        headers: {
            'X-Auth-Token': API_KEY
        },
        mode: 'cors'
    });
}

function status(response) {
    if (response.status !== 200) {
        console.log("Error : " + response.status);
        return Promise.reject(new Error(response.statusText));
    } else {
        return Promise.resolve(response);
    }
}

function json(response) {
    return response.json();
}

function error(error) {
    console.log("Error: " + error);
}

function getStandings() {
    return fetchAPI(standing_ep)
    .then(status)
    .then(json)
    .catch(error)
}

function getMatches() {
    return fetchAPI(matches_ep)
        .then(status)
        .then(json)
}

function getTeams() {
    return fetchAPI(teams_ep)
        .then(status)
        .then(json)
}

function getTeamById(id) {
    return fetchAPI(team_detail + id)
        .then(status)
        .then(json)
}