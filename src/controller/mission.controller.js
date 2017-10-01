var missionManager = require('../manager/mission.manager');
var userController = require('./user.controller');

async function CreateMission(type, startDate, endDate, status, participents) {
    try {
        var participentsId = [];

        participents.forEach(async function (participent) {
            participentsId.push((await userController.getUserByUsername(participent))._id);
        }, this);

        return missionManager.create(type, startDate, endDate, status, participentsId);
    } catch (ex) {
        throw ex;
    }
}

function getAllMissions() {
    try {
        return missionManager.getAll();
    } catch (ex) {
        throw ex;
    }
}

function getMissionByDateRange(fromDate, toDate) {
    try {
        return missionManager.getByDateRange(fromDate, toDate);
    } catch (ex) {
        throw ex;
    }
}

function getMissionByFromDate(date) {
    try {
        return missionManager.getFromDate(date);
    } catch (ex) {
        throw ex;
    }
}

async function getUserMissions(user) {
    try {
        var userId = await userController.getUserByUsername(user)._id;

        return missionManager.getByUser(userId);
    } catch (ex) {
        throw ex;
    }
}

async function getUserMissionsByDateRange(user, fromDate, toDate) {
    try {
        var userId = await userController.getUserByUsername(user)._id;

        return missionManager.getByUserDateRange(userId, fromDate, toDate);
    } catch (ex) {
        throw ex;
    }

}

async function getUserMissionsFromDate(user, fromDate) {
    try {
        var userId = await userController.getUserByUsername(user)._id;

        return missionManager.getByUserFromDate(userId, fromDate);
    } catch (ex) {
        throw ex;
    }

}

function ChangeMissionDates(id, startDate, endDate) {
    try {
        return missionManager.updateDates(id, startDate, endDate);
    } catch (ex) {
        throw ex;
    }
}

function ChangeMissionStatus(id, status) {
    try {
        return missionManager.changeStatus(id, status);
    } catch (ex) {
        throw ex;
    }
}

async function AddParticipentToMission(id, participent) {
    try {
        return missionManager.addParticipent(id, (await userController.getUserByUsername(participent))._id);
    } catch (ex) {
        throw ex;
    }
}

function DeleteMission(mission) {
    try {
        return missionManager.Delete(mission);
    } catch (ex) {
        throw ex;
    }
}

module.exports = {
    CreateMission,
    getAllMissions,
    getMissionByDateRange,
    getMissionByFromDate,
    getUserMissions,
    getUserMissionsByDateRange,
    getUserMissionsFromDate,
    ChangeMissionDates,
    ChangeMissionStatus,
    AddParticipentToMission,
    DeleteMission
}