var express = require('express');
var postgreSQL = require('../services/postgreSQL');

var router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const users = await postgreSQL.getUsers();
    res.json({ data: users.rows });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

router.post('/', async (req, res, next) => {
  const { body } = req;
  const { name, email } = body || {};
  try {
    const users = await postgreSQL.insertUser(name, email);
    res.json({ data: users.rows });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

router.delete('/:email', async (req, res, next) => {
  const { params } = req;
  const { email } = params;
  try {
    const users = await postgreSQL.deleteUser(email);
    res.json({ data: users.rows });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

module.exports = router;
