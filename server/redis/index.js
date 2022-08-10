const { createClient } = require('redis');


async function redisConnect(){
    
    return new Promise(async function(resolve, reject){
        const client = createClient({
            url: process.env.REDIS_URL
        })
      
        client.on('error', (err) => {
            console.log(err);
            resolve(null)
            return;
        });
    
        try{
            await client.connect();
            console.log("redis connected...");
            resolve(client)
        
        } catch(ex){
            resolve(null)
        }
    })
    
}

module.exports = redisConnect

