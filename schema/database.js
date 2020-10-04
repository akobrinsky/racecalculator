const axios = require("axios");
const { fromGlobalId } = require("graphql-relay");

const CURRENT_USER = "VXNlcjoz";

const db = {};

db.getViewer = () => {
  const { id } = fromGlobalId(CURRENT_USER);
  return axios.get(`http://localhost:3000/users/${id}`).then((res) => res.data);
};

db.getUser = (id) =>
  axios.get(`http://localhost:3000/users/${id}`).then((res) => res.data);

db.getRace = (id) =>
  axios.get(`http://localhost:3000/races/${id}`).then((res) => res.data);

db.getRaces = (id) =>
  axios.get(`http://localhost:3000/users/${id}/races`).then((res) => res.data);

db.getGoals = (id) =>
  axios.get(`http://localhost:3000/users/${id}/goals`).then((res) => res.data);

db.getUsers = () =>
  axios.get("http://localhost:3000/users/").then((res) => res.data);

db.addRace = (type, date, time, userId) =>
  axios
    .post("http://localhost:3000/races", {
      userId,
      type,
      time,
      date,
    })
    .then((race) => ({
      raceId: race.data.id,
      userId: race.data.userId,
    }));

db.editRace = (id, userId, type, date, time) =>
  axios
    .patch(`http://localhost:3000/races/${id}`, {
      userId,
      type,
      time,
      date,
    })
    .then((res) => res.data);

db.deleteRace = async (id, userId) => {
  const race = await db.getRace(id);
  if (race.userId !== userId) return null;
  axios.delete(`http://localhost:3000/races/${id}`);
  return { race, userId };
};

module.exports = db;
