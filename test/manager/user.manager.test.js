const mongoose = require('mongoose');
const userManager = require('../../src/manager/user.manager');
const except = require('chai').expect;
const config = require('../../src/config');

var collectionName = 'users';

// Global user mock
var globalUser = {
    username: "OmerZamir",
    name: "Omer Zamir / תכניתן",
    email:"email@email.com",
    job:"תפקיד/תפקיד",
    usersPermissions: ["59b657e6ea1e962270ee9017","59b65841ea1e962270ee9018"],
    specialPermissions: [0,1],
    exemptions: [{
        exempt:"59b66e82c9e80b12b17182be",
        description: "some test description"
    }]
};
var replacedusersPermissions = ["59b657e6ea1e962270ee9017", "59b65841ea1e962270ee9018", "59b7962636a244187d128e8a"];
var replacedspecialPermissions = [0,1,2];
var replacedExemptions = [{
    exempt:"59b66e82c9e80b12b17182be",
    description: "some test description replaced"
}];

describe('user Manager', () => {
    before(async function(){
        mongoose.Promise = global.Promise;
        await mongoose.connect('mongodb://' + config.dbHost + '/' + config.dbName, {useMongoClient: true });
        await mongoose.connection.db.dropDatabase(config.dbName);
    });

    describe('Create a User', () => {
        it('should be exported', () => {
            except(userManager.create).to.be.a('function');
        });
        it('should return a promise', () => {
            let promise = userManager.create(
                globalUser.username,
                globalUser.name, 
                globalUser.email,
                globalUser.job,
                globalUser.usersPermissions, 
                globalUser.specialPermissions, 
                globalUser.exemptions
            );
            except(promise.then).to.be.a('function');
        });

        it('should return a user with the inserted values', async () => {
            let user = await userManager.create(
                globalUser.username,
                globalUser.name, 
                globalUser.email,
                globalUser.job,
                globalUser.usersPermissions,
                globalUser.specialPermissions,
                globalUser.exemptions
            );

            except(user.username).to.be.equal(globalUser.username);
            except(user.name).to.be.equal(globalUser.name);
            except(user.usersPermissions.map((id)=>id.toString())).to.be.eql(globalUser.usersPermissions);
            except(user.specialPermissions).to.deep.equal(globalUser.specialPermissions);
            let exemtions = user.exemptions.map( (e) => {
                return {
                    exempt: e.exempt.toString(),
                    description: e.description
                }
            });
            except(exemtions).to.deep.equal(globalUser.exemptions);            
        });

        it('Should return null if there is no username or name', async() => {
            
            // Undefined Case
            let userUndefined = await userManager.create(
                undefined,
                undefined, 
                globalUser.email,
                globalUser.job,
                globalUser.usersPermissions, 
                globalUser.specialPermissions, 
                globalUser.exemptions
            );
            except(userUndefined).to.be.null;
            
            // Null Case
            let userNull = await userManager.create(
                null,
                null, 
                globalUser.email,
                globalUser.job,
                globalUser.usersPermissions, 
                globalUser.specialPermissions, 
                globalUser.exemptions
            );
            except(userNull).to.be.null;
        });
    });

    describe('Get All Users', () => {
        it('Should be exported', () => {
            except(userManager.getAll).to.be.a('function');
        });

        it('Should return a promise', () => {
            let promise = userManager.getAll();
            except(promise.then).to.be.a('function');
        });

        it('Should return TWO Users that are now inserted', async () => {
            // Empty the collection.
            await mongoose.connection.db.dropCollection(collectionName);
            
            // Create Two Users
            await userManager.create(
                globalUser.username,
                globalUser.name, 
                globalUser.email,
                globalUser.job,
                globalUser.usersPermissions, 
                globalUser.specialPermissions, 
                globalUser.exemptions
            );

            await userManager.create(
                globalUser.username + " 2 ",
                globalUser.name + " 2 ",
                globalUser.email,
                globalUser.job,
                globalUser.usersPermissions,
                globalUser.specialPermissions,
                globalUser.exemptions
            );

            var users = await userManager.getAll();

            except(users.length).to.equal(2);
            except(users[0]).to.have.property("_id");
            except(users[1]).to.have.property("_id");
        });
    });

    describe('Get User By UserName', () => {
        it('Should be exported', () => {
            except(userManager.getByUserName).to.be.a('function');
        });

        it('Should return a promise', () => {
            let promise = userManager.getByUserName(globalUser.username);
            except(promise.then).to.be.a('function');
        });

        it('Should return the user that is now inserted', async () => {
            // Empty the collection.
            await mongoose.connection.db.dropCollection(collectionName);
            
            // Create Two Users
            await userManager.create(
                globalUser.username,
                globalUser.name, 
                globalUser.email,
                globalUser.job,
                globalUser.usersPermissions, 
                globalUser.specialPermissions, 
                globalUser.exemptions
            );

            var user = await userManager.getByUserName(globalUser.username);

            except(user.username).to.deep.equal(globalUser.username);
        });
    });


    describe('Update UserPermission', () => {

        it('Should be exported', () => {
            except(userManager.UpdateUserPermissions).to.be.a('function');
        });

        it('Should return a promise', () => {
            let promise = userManager.UpdateUserPermissions(globalUser.username, replacedusersPermissions);
            except(promise.then).to.be.a('function');
        });

        it('Should return expected values if updated', async () => {

            let updated = await userManager.UpdateUserPermissions(globalUser.username, replacedusersPermissions);
            except(updated.ok).to.be.equal(1);
            except(updated.n).to.be.equal(1);
            except(updated.nModified).to.be.equal(1);
        });
    });


    describe('Update specialPermission', () => {

        it('Should be exported', () => {
            except(userManager.UpdatespecialPermissions).to.be.a('function');
        });

        it('Should return a promise', () => {
            let promise = userManager.UpdatespecialPermissions(globalUser.username, replacedspecialPermissions);
            except(promise.then).to.be.a('function');
        });

        it('Should return expected values if updated', async () => {

            let updated = await userManager.UpdatespecialPermissions(globalUser.username, replacedspecialPermissions);
            except(updated.ok).to.be.equal(1);
            except(updated.n).to.be.equal(1);
            except(updated.nModified).to.be.equal(1);
        });
    });

    describe('Update Exemtions', () => {
        
        it('Should be exported', () => {
            except(userManager.UpdatespecialPermissions).to.be.a('function');
        });

        it('Should return a promise', () => {
            let promise = userManager.UpdateExemptions(globalUser.username, replacedExemptions);
            except(promise.then).to.be.a('function');
        });

        it('Should return expected values if updated', async () => {

            let updated = await userManager.UpdateExemptions(globalUser.username, replacedExemptions);
            except(updated.ok).to.be.equal(1);
            except(updated.n).to.be.equal(1);
            except(updated.nModified).to.be.equal(1);
        });
    });

    describe('Add a User Permission', () => {
        var id;
        before(async function(){
            id = await userManager.getByUserName(globalUser.username);
            id = id._id;
        });
        
        it('Should be exported', () => {
            except(userManager.addUserPermission).to.be.a('function');
        });

        it('Should return a promise', () => {
            let promise = userManager.addUserPermission(globalUser.username, id);
            except(promise.then).to.be.a('function');
        });
        it('Should return expected values if updated', async () => {  
            let updated = await userManager.addUserPermission(globalUser.username, id);
            except(updated.usersPermissions).to.deep.include(id);
        });
    });

    describe('Add a Special Permission', () => {

        it('Should be exported', () => {
            except(userManager.addSpecialPermission).to.be.a('function');
        });

        it('Should return a promise', () => {
            let promise = userManager.addSpecialPermission(globalUser.username, 0);
            except(promise.then).to.be.a('function');
        });
        it('Should return expected values if updated', async () => {  
            let updated = await userManager.addSpecialPermission(globalUser.username, 0);
            except(updated.specialPermissions).to.deep.include(0);
        });
    });

    describe('Add an Exempt', () => {
        it('Should be exported', () => {
            except(userManager.addExempt).to.be.a('function');
        });

        it('Should return a promise', () => {
            let promise = userManager.addExempt(globalUser.username, globalUser.exemptions[0]);
            except(promise.then).to.be.a('function');
        });
        it('Should return expected values if updated', async () => {  
            let updated = await userManager.addExempt(globalUser.username, globalUser.exemptions[0]);
            except(updated.exemptions.map((e)=>e.exempt.toString())).to.deep.include(globalUser.exemptions[0].exempt);
        });
    });

    describe('Remove an Exempt', () => {
        it('Should be exported', () => {
            except(userManager.removeExempt).to.be.a('function');
        });

        it('Should return a promise', () => {
            let promise = userManager.removeExempt(globalUser.username, globalUser.exemptions[0]);
            except(promise.then).to.be.a('function');
        });
        it('Should return expected values if updated', async () => {  
            let updated = await userManager.removeExempt(globalUser.username, replacedExemptions[0]);

            except(updated.ok).to.be.equal(1);
            except(updated.n).to.be.equal(1);
            except(updated.nModified).to.be.equal(1);
        });
    });

    describe('Remove a Special Permission', () => {
        it('Should be exported', () => {
            except(userManager.removespecialPermission).to.be.a('function');
        });

        it('Should return a promise', () => {
            let promise = userManager.removespecialPermission(globalUser.username, 0);
            except(promise.then).to.be.a('function');
        });
        it('Should return expected values if updated', async () => {  
            let updated = await userManager.removespecialPermission(globalUser.username, 1);

            except(updated.ok).to.be.equal(1);
            except(updated.n).to.be.equal(1);
            except(updated.nModified).to.be.equal(1);
        });
    });

    describe('Remove a User Permission', () => {
        it('Should be exported', () => {
            except(userManager.removeUserPermission).to.be.a('function');
        });

        it('Should return a promise', () => {
            let promise = userManager.removeUserPermission(globalUser.username, "59b657e6ea1e962270ee9017");
            except(promise.then).to.be.a('function');
        });
        it('Should return expected values if updated', async () => {  
            let updated = await userManager.removeUserPermission(globalUser.username, "59b65841ea1e962270ee9018");

            except(updated.ok).to.be.equal(1);
            except(updated.n).to.be.equal(1);
            except(updated.nModified).to.be.equal(1);
        });
    });

    describe('Delete a User', () => {
        it('Should be exported', () => {
            except(userManager.Delete).to.be.a('function');
        });

        it('Should return a promise', () => {
            let promise = userManager.Delete(globalUser.username);
            except(promise.then).to.be.a('function');
        });
        it('Should return expected values if updated', async () => {  
            let res = await userManager.Delete(globalUser.username);

            except(res.result.ok).to.be.equal(1);
            except(res.result.n).to.be.equal(0);
        });
    });
});