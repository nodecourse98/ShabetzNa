var objectId = require('mongoose').Types.ObjectId;
var Mission = require('../models/mission.model');
var MissionValidation = require('./validations/mission.validator');

async function create(type, startDate, endDate, status, participents) {
    try {
        if (MissionValidation.dateRangeValidity(startDate, endDate)) {

            MissionValidation.typeValidity(type);
            MissionValidation.dateValidity(startDate);
            MissionValidation.dateValidity(endDate);
            MissionValidation.statusValidity(status);
            MissionValidation.participentsValidity(participents);

            var newMission = new Mission({
                type: type,
                startDate: startDate,
                endDate: endDate,
                status: status,
                participents: participents
            });

            return await newMission.save();
        } else {
            return Promise.resolve(null);
        }
    } catch (ex) {
        return Promise.reject(ex);
    }
}

function getAll() {
    return Mission.find({});
}

async function getByDateRange(fromDate, toDate) {
    try {
        MissionValidation.dateValidity(fromDate);
        MissionValidation.dateValidity(toDate);

        //If the input is valid => Search
        if (MissionValidation.dateRangeValidity(fromDate, toDate)) {
            return Mission.find({
                startDate: {
                    '$gte': fromDate,
                    '$lte': toDate
                }
            });
        }
        return Promise.resolve(null);
    } catch (ex) {
        return Promise.reject(ex);
    }
}

function getFromDate(fromDate) {
    try {
        //If the input is valid => Search
        MissionValidation.dateValidity(fromDate);
        return Mission.find({
            startDate: {
                '$gte': fromDate
            },
            endDate: {
                '$lte': fromDate
            }
        });
    } catch (ex) {
        return Promise.reject(ex);
    }
}

function getByUser(user) {
    return Mission.find({
        participents: {
            '$in': [user]
        }
    });
}

function getByUserDateRange(user, fromDate, toDate) {
    return Mission.find({
        participents: {
            '$in': [user]
        },
        startDate: {
            '$gte': fromDate,
            '$lte': toDate
        }
    });
}

function getByUserFromDate(user, fromDate) {
    try {
        //If the input is valid => Search
        MissionValidation.dateValidity(fromDate)
        return Mission.find({
            participents: {
                '$in': [user]
            },
            startDate: {
                '$gte': fromDate
            }
        });
    } catch (ex) {
        return Promise.reject(ex);
    }
}

async function updateDates(id, startDate, endDate) {
    try {
        MissionValidation.dateValidity(startDate);
        MissionValidation.dateValidity(endDate);

        if (MissionValidation.dateRangeValidity(startDate, endDate)) {
            // Find the wanted mission.
            var mission = await Mission.findById(id);
            if (mission) {
                // If something has changed update it, else put the previous data.
                mission.startDate = startDate ? new Date(startDate) : new Date(mission.startDate);
                mission.endDate = endDate ? new Date(endDate) : new Date(mission.endDate);

                // Save it & return.
                return await mission.save();
            }
        }
        return Promise.resolve(null);
    } catch (ex) {
        return Promise.reject(ex);
    }
}

async function changeStatus(id, status) {
    var mission = await Mission.findById(id);

    if (mission) {
        try {
            MissionValidation.statusValidity(status);
            mission.status = status;
            return mission.save();
        } catch (ex) {
            return Promise.reject(ex);
        }
    }
    return Promise.resolve(null);
}

async function addParticipent(id, participent) {
    var mission = await Mission.findById(id);

    if (mission) {
        try {
            MissionValidation.typeValidity(participent);
            mission.participents.push(participent);
            return mission.save();
        } catch (ex) {
            return Promise.reject(ex);
        }
    }
    return Promise.resolve(null);
}

function Delete(id) {
    try {
        if (objectId.isValid(id)) {
            return Mission.remove({
                _id: id
            });
        } else {
            throw TypeError("ID is not valid");
        }
    } catch (ex) {
        return Promise.reject(ex);
    }
}

module.exports = {
    create,
    getAll,
    getByDateRange,
    getFromDate,
    getByUser,
    getByUserDateRange,
    getByUserFromDate,
    Delete,
    updateDates,
    changeStatus,
    addParticipent
};