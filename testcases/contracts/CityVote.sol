pragma solidity 0.8.10;

contract CityVote{

    struct City{
        string _name;
        uint256 population;
        string _address;
        uint256 votecount;
        uint256 id;
    }
    uint256 counter;

    mapping(uint256=>string) public  countries;
    mapping(uint256 => City) public cities;
    mapping(address=>bool) hasvoted;
    mapping(address =>bool)  public admins;

constructor(){
    counter =0;
    admins[msg.sender] =true;
    addCity("ktm",456);
    addCity("pkr",789);
}
modifier checkadmin(){
        require(admins[msg.sender],"Only admin can access this function");
        _;
}

event cityadded( string  name);
event voted(uint256 indexed id,address voter);

function addCity(string memory name, uint256 _pop) checkadmin public{
    // require(admins[msg.sender],"Only admin can access this function");
    cities[counter]._name = name;
    cities[counter].id = counter;
    cities[counter].population = _pop;
    counter = counter+1;
    emit cityadded(name);

}
function vote(uint256 id)public{
     require(!hasvoted[msg.sender],"Already voted");
        cities[id].votecount ++;
        hasvoted[msg.sender] = true;
        emit voted(id,msg.sender);
}
function getCitydata(uint256 id) public view returns(string memory name,uint256 votecount){
   return( cities[id]._name,cities[id].votecount);
}
function getVote(uint256 id) public view returns(uint256 votecount){
    return(cities[id].votecount);
}

 

}