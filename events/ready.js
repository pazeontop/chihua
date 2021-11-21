
const Event = require('../structures/Event');
const config = require('../config.json');

module.exports = class extends Event {
    async run() {

    // ready interval 

    
    const activities = [
      { name: `Eating HotDogs`, type: 'WATCHING' }, 
    ];
  

    this.client.user.setPresence({ status: 'IDLE', activity: activities[0] });
  
    let activity = 0;
  

 

      
  
}

}

