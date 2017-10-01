const mongoose = require('mongoose');
const missionManager = require('../../src/manager/mission.manager');
const userManager = require('../../src/manager/user.manager');
const missionTypeManager = require('../../src/manager/missiontype.manager');
const except = require('chai').expect;
const config = require('../../src/config');

var collectionName = 'missions';

// Global Mission
var globalMission = {
    type:"",
    startDate: new Date(2017, 1, 1),
    endDate: new Date(2017, 1, 2),
    status: 0,
    participents: []
};

describe('Mission Manager', () => {
    before(async function(){
        mongoose.Promise = global.Promise;
        await mongoose.connect('mongodb://' + config.dbHost + '/' + config.dbName, {useMongoClient: true });
        await mongoose.connection.db.dropDatabase(config.dbName);

        globalMission.type = (await missionTypeManager.create("בדיקה","checktest",0))._id;
        globalMission.participents.push((await userManager.create(
            "OmerZamir",
            "Omer",
            "email@email.com",
            "תפקיד/תפקיד",
            ["59b657e6ea1e962270ee9017","59b65841ea1e962270ee9018"],
            [0,1],
            [{
                exempt:"59b66e82c9e80b12b17182be",
                description: "some test description"
            }]
        ))._id);
    });

    describe('Create a mission', () => {
        it('should be exported', () => {
            except(missionManager.create).to.be.a('function');
        });
        it('should return a promise', () => {
            let promise = missionManager.create(
                globalMission.type,
                globalMission.startDate,
                globalMission.endDate,
                globalMission.status,
                globalMission.participents
            );
            except(promise.then).to.be.a('function');
        });

        it('should return a missionType with the inserted values', async () => {
            let mission = await missionManager.create(
                globalMission.type,
                globalMission.startDate,
                globalMission.endDate,
                globalMission.status,
                globalMission.participents
            );

            except(globalMission.name).to.be.equal(mission.name);
            except(globalMission.description).to.be.equal(mission.description);
            except(globalMission.type).to.be.equal(mission.type);            
        });
    });

    describe('Get All missions', () => {
        it('Should be exported', () => {
            except(missionManager.getAll).to.be.a('function');
        });
        it('Should return a promise', () => {
            let promise = missionManager.getAll();
            except(promise.then).to.be.a('function');
        });

        it('Should return Two missions', async () => {

            await mongoose.connection.db.dropCollection(collectionName);
            
            await missionManager.create(
                globalMission.type,
                globalMission.startDate,
                globalMission.endDate,
                globalMission.status,
                globalMission.participents
            );
            await missionManager.create(
                globalMission.type,
                globalMission.startDate,
                globalMission.endDate,
                globalMission.status,
                globalMission.participents
            );

            let missions = await missionManager.getAll();

            except(missions.length).to.equal(2);
            except(missions[0]).to.have.property("_id");
            except(missions[1]).to.have.property("_id");         
        });
    });

    describe('Get missions by date range', () => {
        it('Should be exported', () => {
            except(missionManager.getByDateRange).to.be.a('function');
        });
        it('Should return a promise', () => {
            let promise = missionManager.getByDateRange(globalMission.startDate,globalMission.endDate);
            except(promise.then).to.be.a('function');
        });

        it('Should return Two missions', async () => {

            await mongoose.connection.db.dropCollection(collectionName);
            
            await missionManager.create(
                globalMission.type,
                globalMission.startDate,
                globalMission.endDate,
                globalMission.status,
                globalMission.participents
            );
             await missionManager.create(
                globalMission.type,
                new Date(2017,1,5),
                globalMission.endDate,
                globalMission.status,
                globalMission.participents
            );

            

            let missions = await missionManager.getByDateRange(globalMission.startDate,globalMission.endDate);
            except(missions.length).to.equal(1);
            except(missions[0].startDate).is.gte(globalMission.startDate);    
        });
    });

    describe('Get missions from specific date', () => {
        it('Should be exported', () => {
            except(missionManager.getFromDate).to.be.a('function');
        });
        it('Should return a promise', () => {
            let promise = missionManager.getFromDate(globalMission.startDate);
            except(promise.then).to.be.a('function');
        });

        it('Should return Two missions', async () => {

            await mongoose.connection.db.dropCollection(collectionName);
            
            await missionManager.create(
                globalMission.type,
                globalMission.startDate,
                globalMission.endDate,
                globalMission.status,
                globalMission.participents
            );
            await missionManager.create(
                globalMission.type,
                new Date(2016, 1, 1),
                globalMission.endDate,
                globalMission.status,
                globalMission.participents
            );


            let missions = await missionManager.getFromDate(globalMission.startDate);
            except(missions.length).to.equal(1);
            except(missions[0].startDate).is.gte(globalMission.startDate);        
        });
    });

    describe('Get missions Of A Chosen User', () => {
        it('Should be exported', () => {
            except(missionManager.getByUser).to.be.a('function');
        });
        it('Should return a promise', () => {
            let promise = missionManager.getByUser("");
            except(promise.then).to.be.a('function');
        });

        it('Should return Two missions', async () => {

            await mongoose.connection.db.dropCollection(collectionName);
            
            await missionManager.create(
                globalMission.type,
                globalMission.startDate,
                globalMission.endDate,
                globalMission.status,
                globalMission.participents
            );
            await missionManager.create(
                globalMission.type,
                new Date(2016, 1, 1),
                globalMission.endDate,
                globalMission.status,
                globalMission.participents
            );

            let missions = await missionManager.getByUser(globalMission.participents[0]);
            except(missions.length).to.equal(2);
            except(missions[0].participents).is.deep.contains(globalMission.participents[0]);
            except(missions[1].participents).is.deep.contains(globalMission.participents[0]);
        });
    });

    describe('Get missions Of A Chosen User and Date Range', () => {
        it('Should be exported', () => {
            except(missionManager.getByUserDateRange).to.be.a('function');
        });
        it('Should return a promise', () => {
            let promise = missionManager.getByUserDateRange("", new Date(), new Date());
            except(promise.then).to.be.a('function');
        });

        it('Should return One missions', async () => {

            await mongoose.connection.db.dropCollection(collectionName);
            
            await missionManager.create(
                globalMission.type,
                globalMission.startDate,
                globalMission.endDate,
                globalMission.status,
                globalMission.participents
            );
            await missionManager.create(
                globalMission.type,
                new Date(2016, 1, 1),
                new Date(2016, 1, 2),
                globalMission.status,
                globalMission.participents
            );

            let missions = await missionManager.getByUserDateRange(globalMission.participents[0], globalMission.startDate, globalMission.endDate);
            console.log(missions)
            except(missions.length).to.equal(1);
            except(missions[0].participents).is.deep.contains(globalMission.participents[0]);
            except(missions[0].startDate).is.gte(globalMission.startDate);                    
        });
    });
    
    describe('Get missions Of A Chosen User and From Date', () => {
        it('Should be exported', () => {
            except(missionManager.getByUserFromDate).to.be.a('function');
        });
        it('Should return a promise', () => {
            let promise = missionManager.getByUserFromDate("", new Date());
            except(promise.then).to.be.a('function');
        });

        it('Should return One missions', async () => {

            await mongoose.connection.db.dropCollection(collectionName);
            
            await missionManager.create(
                globalMission.type,
                globalMission.startDate,
                globalMission.endDate,
                globalMission.status,
                globalMission.participents
            );
            await missionManager.create(
                globalMission.type,
                new Date(2016, 1, 1),
                globalMission.endDate,
                globalMission.status,
                globalMission.participents
            );

            let missions = await missionManager.getByUserFromDate(globalMission.participents[0], globalMission.startDate);
            except(missions.length).to.equal(1);
            except(missions[0].participents).is.deep.contains(globalMission.participents[0]);
            except(missions[0].startDate).is.gte(globalMission.startDate);                    
        });
    });

    describe('Update missions Dates', () => {
        it('Should be exported', () => {
            except(missionManager.updateDates).to.be.a('function');
        });
        it('Should return a promise', () => {
            let promise = missionManager.updateDates("59b657e6ea1e962270ee9017", globalMission.startDate, globalMission.endDate);
            except(promise.then).to.be.a('function');
        });

        it('Should return One mission updated', async () => {
            await mongoose.connection.db.dropCollection(collectionName);
            
            var mission = await missionManager.create(
                globalMission.type,
                globalMission.startDate,
                globalMission.endDate,
                globalMission.status,
                globalMission.participents
            );                        

            let updated = await missionManager.updateDates(mission._id, new Date(2016, 1, 1), new Date(2016,5,5));

            except(updated._id).to.be.eql(mission._id);
            except(updated.startDate).to.deep.equal(new Date(2016, 1, 1));
            except(updated.endDate).to.deep.equal(new Date(2016,5,5));
        });
    });

    describe('Change mission Status', () => {
        it('Should be exported', () => {
            except(missionManager.changeStatus).to.be.a('function');
        });
        it('Should return a promise', () => {
            let promise = missionManager.changeStatus("59b657e6ea1e962270ee9017", 1);
            except(promise.then).to.be.a('function');
        });

        it('Should return updated missions', async () => {
            await mongoose.connection.db.dropCollection(collectionName);
            
            var mission = await missionManager.create(
                globalMission.type,
                globalMission.startDate,
                globalMission.endDate,
                globalMission.status,
                globalMission.participents
            );

            let updated = await missionManager.changeStatus(mission._id, 1);

            except(updated._id).to.be.eql(mission._id);
            except(updated.status).to.deep.equal(1);
        });
    });

    describe('add participent to mission', () => {
        it('Should be exported', () => {
            except(missionManager.addParticipent).to.be.a('function');
        });
        it('Should return a promise', () => {
            let promise = missionManager.addParticipent("59b657e6ea1e962270ee9017", "59b65841ea1e962270ee9018");
            except(promise.then).to.be.a('function');
        });

        it('Should return updated missions', async () => {
            await mongoose.connection.db.dropCollection(collectionName);
            
            var mission = await missionManager.create(
                globalMission.type,
                globalMission.startDate,
                globalMission.endDate,
                globalMission.status,
                globalMission.participents
            );

            let updated = await missionManager.addParticipent(mission._id, "59b65841ea1e962270ee9018");

            except(updated._id).to.be.eql(mission._id);
            except(updated.participents.map((e)=>e.toString())).to.be.contains("59b65841ea1e962270ee9018");
        });
    });

    describe('Delete a mission', () => {
        it('Should be exported', () => {
            except(missionManager.Delete).to.be.a('function');
        });
        it('Should return a promise', () => {
            let promise = missionManager.Delete("59b657e6ea1e962270ee9017");
            except(promise.then).to.be.a('function');
        });

        it('Should return updated missions', async () => {
            await mongoose.connection.db.dropCollection(collectionName);
            
            var mission = await missionManager.create(
                globalMission.type,
                globalMission.startDate,
                globalMission.endDate,
                globalMission.status,
                globalMission.participents
            );

            let res = await missionManager.Delete(mission._id);

            except(res.result.ok).to.be.equal(1);
            except(res.result.n).to.be.equal(1);
        });
    });

});