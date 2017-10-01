var objectId = require('mongoose').Types.ObjectId;

function exemptionsValidity(exemptions) {
    // Loop through the array and check it's validity.
    exemptions.forEach(function (exempt) {
        if (!objectId.isValid(exempt.exempt)) {
            throw TypeError("Exemption ID is not valid");
        }
    }, this);

    return true;
}

function specialPermissionsValidity(specialPermissions) {
    if (specialPermissions) {
        // Loop through the array and check it's validity.
        specialPermissions.forEach(function (permission) {
            if (isNaN(permission)) {
                console.log(permission, isNaN(permission));
                throw TypeError("Special Permission is not valid");
            }
        }, this);
    }


    return true;
}

function usersPermissionsValidity(usersPermissions) {
    if (usersPermissions) {
        // Loop through the array and check it's validity.
        usersPermissions.forEach(function (userPermission) {
            if (!objectId.isValid(userPermission)) {
                throw TypeError("Users Permission is not valid");
            }
        }, this);
    }
    return true;
}

module.exports = {
    exemptionsValidity,
    specialPermissionsValidity,
    usersPermissionsValidity
};