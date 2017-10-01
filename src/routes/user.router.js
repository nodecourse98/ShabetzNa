var router = require('express').Router();
var userController = require('../controller/user.controller');


router.get('/', async function (req, res) {
    try {
        var resp = await userController.getAllUsers();
        res.json(resp);
    } catch (ex) {
        res.status(400).send(ex.toString());
    }
});

router.get('/:userName', async function (req, res) {
    try {
        var resp = await userController.getUserByUsername(req.params.userName);
        res.json(resp);
    } catch (ex) {
        res.status(400).send(ex.toString());
    }
});

router.post('/', async function (req, res) {
    try {
        var resp = await userController.createUser(
            req.body.username,
            req.body.name,
            req.body.email,
            req.body.job,
            req.body.userspermissions,
            req.body.specialPermissions,
            req.body.exemptions
        );
        res.json(resp);
    } catch (ex) {
        res.status(400).send(ex.toString());
    }
});

router.put('/permissions/user', async function (req, res) {
    try {
        var resp = await userController.updateAllUserPermission(
            req.body.username,
            req.body.userspermissions
        );
        res.json(resp);
    } catch (ex) {
        res.status(400).send(ex.toString());
    }

});

router.put('/permissions/special', async function (req, res) {
    try {
        var resp = await userController.updateAllSpecialPermissions(
            req.body.username,
            req.body.specialpermissions
        );
        res.json(resp);
    } catch (ex) {
        res.status(400).send(ex.toString());
    }
});

router.put('/exemptions', async function (req, res) {
    try {
        var resp = await userController.updateAllExemptions(
            req.body.username,
            req.body.exemptions
        );
        res.json(resp);
    } catch (ex) {
        res.status(400).send(ex.toString());
    }
});

router.put('/permission/user', async function (req, res) {
    try {
        var resp = await userController.addUserPermission(
            req.body.username,
            req.body.usernameToAddName
        );
        res.json(resp);
    } catch (ex) {
        res.status(400).send(ex.toString());
    }
});

router.put('/permission/special', async function (req, res) {
    try {
        var resp = await userController.addSpecialPermission(
            req.body.username,
            req.body.specialPermission
        );
        res.json(resp);
    }
    catch(ex) {
        res.status(400).send(ex.toString());        
    }
});

router.put('/exemption', async function (req, res) {
    try {
        var resp = await userController.addExemption(
            req.body.username,
            req.body.exemption
        );
        res.json(resp);
    }
    catch(ex) {
        res.status(400).send(ex.toString());        
    }
});

router.delete('/', async function (req, res) {
    try {
        var resp = await userController.DeleteUser(
            req.body.username
        );
        res.json(resp);
    }
    catch(ex) {
        res.status(400).send(ex.toString());        
    }
});

router.delete('/exemption', async function (req, res) {
    try {
        var resp = await userController.removeOneExempt(
            req.body.username,
            req.body.exemption
        );
        res.json(resp);
    }
    catch(ex) {
        res.status(400).send(ex.toString());        
    }
});

router.delete('/permission/special', async function (req, res) {
    try {
        var resp = await userController.removeOneSpecialPermission(
            req.body.username,
            req.body.specialPermission
        );
        res.json(resp);
    }
    catch(ex) {
        res.status(400).send(ex.toString());        
    }
});

router.delete('/permission/user', async function (req, res) {

    try {
        var resp = await userController.removeOneUserPermission(
            req.body.username,
            req.body.usernameToRemove
        );
        res.json(resp);
    }
    catch(ex) {
        res.status(400).send(ex.toString());        
    }
});

module.exports = router;