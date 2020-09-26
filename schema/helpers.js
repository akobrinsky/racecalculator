const axios = require('axios');

function getUser(id) {
  return axios.get(`http://localhost:3000/users/${id}`)
    .then((res) => res.data);
}

function getRace(id) {
  return axios.get(`http://localhost:3000/races/${id}`)
    .then((res) => res.data);
}

function getRaces(id) {
  return axios.get(`http://localhost:3000/users/${id}/races`)
    .then((res) => res.data);
}

function getGoals(id) {
  return axios.get(`http://localhost:3000/users/${id}/goals`)
    .then((res) => res.data);
}
function getUsers() {
  return axios.get('http://localhost:3000/users/')
    .then((res) => res.data);
}

function addRace(type, date, time, userId) {
  return axios.post('http://localhost:3000/races', {
    userId,
    type,
    time,
    date,
  })
    .then((race) => ({
      raceId: race.data.id,
      userId: race.data.userId,
    }));
}
function editRace(id, userId, type, date, time) {
  return axios.patch(`http://localhost:3000/races${id}`, {
    userId,
    type,
    time,
    date,
  })
    .then((res) => res.data);
}

function deleteRace(id, userId) {
  axios.delete(`http://localhost:3000/races/${id}`);
  return { id, userId };
}
module.exports = {
  getUser,
  getRace,
  getRaces,
  getGoals,
  addRace,
  deleteRace,
  editRace,
  getUsers,
};
