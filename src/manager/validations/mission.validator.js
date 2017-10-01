var objectId = require('mongoose').Types.ObjectId;

function typeValidity(type) {
    if(objectId.isValid(type)){
        return true;
    } else {
        throw TypeError("type is not valid");
    }
}

function dateRangeValidity(startDate, endDate) {
    return (new Date(startDate) <= new Date(endDate));
}

function dateValidity(date) {
    if(isNaN(Date.parse(date))){
        throw TypeError("Date is not valid");
    } else {
        return true;
    }
}

function statusValidity(status) {
    if(isNaN(status)){
        throw TypeError("Status is not valid");
    } else {
        return true;
    }
}

function participentsValidity(participents) {
    // Loop through the array and check it's validity.
    participents.forEach(function(participent) {
        if(!objectId.isValid(participent)){
            throw TypeError("participent ID is not valid");
        }  
    }, this);

    return true;
}

module.exports = {
    typeValidity,
    dateRangeValidity,
    dateValidity,
    statusValidity,
    participentsValidity
};