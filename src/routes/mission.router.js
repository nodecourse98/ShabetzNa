var router = require('express').Router();
var missionController = require('../controller/mission.controller');

router.get('/', async function (req, res) {
    try {
        var resp = await missionController.getAllMissions();
        res.json(resp);
    } catch (ex) {
        res.status(400).send(ex.toString());
    }
});

router.post('/', async function (req, res) {
    try {
        var resp = await missionController.CreateMission(
            req.body.type,
            req.body.startDate,
            req.body.endDate,
            req.body.status,
            req.body.participents
        );
        res.json(resp);
    } catch (ex) {
        res.status(400).send(ex.toString());
    }
});

router.post('/range', async function (req, res) {
    try {
        var resp = await missionController.getMissionByDateRange(
            req.body.from,
            req.body.to
        );
        res.json(resp);
    } catch (ex) {
        res.status(400).send(ex.toString());
    }
});

router.get('/from/:from', async function (req, res) {
    try {
        var resp = await missionController.getMissionByDateRange(
            req.param.from
        );
        res.json(resp);
    } catch (ex) {
        res.status(400).send(ex.toString());
    }
});

router.get('/user/:user', async function (req, res) {
    try {
        var resp = await missionController.getUserMissions(
            req.param.user
        );
        res.json(resp);
    } catch (ex) {
        res.status(400).send(ex.toString());
    }
});

router.post('/user/range', async function (req, res) {
    try {
        var resp = await await missionController.getUserMissionsByDateRange(
            req.body.user,
            req.body.from,
            req.body.to
        );
        res.json(resp);
    } catch (ex) {
        res.status(400).send(ex.toString());
    }
});

router.post('/user/from', async function (req, res) {
    try {
        var resp = await missionController.getUserMissionsFromDate(
            req.body.user,
            req.body.from
        );
        res.json(resp);
    } catch (ex) {
        res.status(400).send(ex.toString());
    }
});

router.put('/dates', async function (req, res) {
    try {
        var resp = await missionController.ChangeMissionDates(
            req.body.user,
            req.body.from,
            req.body.to
        );
        res.json(resp);
    } catch (ex) {
        res.status(400).send(ex.toString());
    }
});

router.put('/status', async function (req, res) {
    try {
        var resp = await missionController.ChangeMissionStatus(
            req.body.user,
            req.body.status
        );
        res.json(resp);
    } catch (ex) {
        res.status(400).send(ex.toString());
    }
});

router.put('/participent', async function (req, res) {
    try {
        var resp = await missionController.AddParticipentToMission(
            req.body.id,
            req.body.participent
        );
        res.json(resp);
    } catch (ex) {
        res.status(400).send(ex.toString());
    }
});

router.delete('/', async function (req, res) {
    try {
        var resp = await missionController.DeleteMission(
            req.body.mission
        );
        res.json(resp);
    } catch (ex) {
        res.status(400).send(ex.toString());
    }
});

module.exports = router;