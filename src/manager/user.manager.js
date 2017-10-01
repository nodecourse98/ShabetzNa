var objectId = require('mongoose').Types.ObjectId;
var User = require('../models/user.model');
var UserValidation = require('./validations/user.validator');

function create(username, name, email, job, usersPermissions, specialPermissions, exemptions) {
    if (username && name){
        try{
            // Exceptions?
            console.log(specialPermissions);            
            UserValidation.usersPermissionsValidity(usersPermissions);
            UserValidation.specialPermissionsValidity(specialPermissions);
            UserValidation.exemptionsValidity(exemptions);
            
            var newUser = User({
                username: username,
                name: name,
                email:email,
                job:job,
                usersPermissions: usersPermissions,
                specialPermissions: specialPermissions,
                exemptions: exemptions
            });

            return newUser.save();
        }
        catch(ex) {
            return Promise.reject(ex);
        } 
    }
    return Promise.resolve(null);
}

function getByUserName(username) {
    return User.findOne({
        username: username
    });

}

function getAll() {
    return User.find();
}

function UpdateUserPermissions(username, usersPermissions) {
    try{
        UserValidation.usersPermissionsValidity(usersPermissions);

        return User.update({
            username: username
        }, {
            usersPermissions: usersPermissions
        });
    } 
    catch(ex) {
        return Promise.reject(ex);
    }
}

function UpdatespecialPermissions(username, specialPermissions) {
    try{
        UserValidation.specialPermissionsValidity(specialPermissions);

        return User.update({
            username: username
        }, {
            specialPermissions: specialPermissions
        });
    }
    catch(ex) {
        return Promise.reject(ex);
    }
}

function UpdateExemptions(username, exemptions) {
    try {
        UserValidation.exemptionsValidity(exemptions);
        return User.update({
            username: username
        }, {
            exemptions: exemptions
        });
    }
    catch(ex) {
        return Promise.reject(ex);
    }
}

async function addUserPermission(username, userToAdd) {
    try {
        var user = await getByUserName(username);
        if (objectId.isValid(userToAdd)) {
            user.usersPermissions.push(userToAdd);
            return await user.save();
        } else {
            return Promise.reject(TypeError("user Id is not valid"));
        }
    }
    catch(ex) {
        return Promise.reject(ex);
    }
}

async function addSpecialPermission(username, specialPermission) {
    try {
        var user = await getByUserName(username);
        user.specialPermissions.push(specialPermission);
        return await user.save();
    }
    catch(ex){
        return Promise.reject(ex);
    }
}

async function addExempt(username, exempt) {
    try {
        var user = await getByUserName(username);
        user.exemptions.push(exempt);
        return await user.save();
    }
    catch(ex){
        return Promise.reject(ex);
    }
}

function removeExempt(username, exempt) {
    return User.update({
        username: username
    }, {
        $pull: {
            exemptions: {
                '$in': [exempt]
            }
        }
    });
}

function removespecialPermission(username, specialPermission) {
    return User.update({
        username: username
    }, {
        $pull: {
            specialPermissions: {
                '$in': [specialPermission]
            }
        }
    });
}

function removeUserPermission(username, userPermission) {
    return User.update({
        username: username
    }, {
        $pull: {
            usersPermissions: {
                '$in': [userPermission]
            }
        }
    });
}

async function Delete(username) {
    return await User.remove({
        username: username
    });
}

module.exports = {
    create,
    getByUserName,
    getAll,
    UpdateUserPermissions,
    UpdatespecialPermissions,
    UpdateExemptions,
    addUserPermission,
    addSpecialPermission,
    addExempt,
    removeExempt,
    removespecialPermission,
    removeUserPermission,
    Delete
};