
const truffleAssert = require('truffle-assertions');
const CityVote = artifacts.require("CityVote");

contract("CityVoter", function(){
    let cityVote;

    before(async function(){
        [deployer,admin,addr1,addr2] = await web3.eth.getAccounts();
        cityVote = await CityVote.new({from:admin});
    })
    describe("Deployment", function(){
        it("Should deploy the contract successfully", async function(){
            const status = await cityVote.admins(admin);
            const status2 = await cityVote.admins(deployer);
            const city1 = await cityVote.cities(0);
            assert.equal(status,true);
            assert.equal(status2,false);
            assert.equal(city1._name,"ktm");
            assert.equal(city1.id,0);
        })
    describe("Add city", function(){
        it("Should add city successfully", async function(){
            await cityVote.addCity("butwal",45676,{from:admin});
            const city2 = await cityVote.cities(2);
            assert.equal(city2._name,"butwal");
            assert.equal(city2.population,45676);
        })
        it("Should revert when called by other than admin", async function(){
            await truffleAssert.reverts(cityVote.addCity("chitwan",45676,{from:addr1}));
        })
    })

    describe("Vote Function", function(){
        it("Should vote the city", async function(){
            const initalVote = await cityVote.getVote(0);
            assert.equal(initalVote,0);
            await cityVote.vote(0,{from:addr1});
            const city1 = await cityVote.cities(0);
            assert.equal(city1.votecount,1);

        })
        it("Should revert when address has already voted", async function(){
            await truffleAssert.reverts(cityVote.vote(0,{from:addr1}));
        })
    })
    })




})