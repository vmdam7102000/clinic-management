const { db } = require('./Database.m');
module.exports = {
    getByUsername: async(Username)=> {
        const rs=await db.collection('Admin').find({Username:Username}).toArray();
        return rs;
    },
    getMaxID: async()=>{
        const rs=await db.collection('Admin').find({}).sort("ID",-1).limit(1).toArray();
        return rs;
    },
    getAll: async()=> {
        const rs=await db.collection('Admin').find({}).toArray();
        return rs;
    },
    update: async(user,data) => {
        await db.collection('Admin').updateOne({Username:user},{$set:data},{upsert:true});
    },
    changePassword: async(user,newpass) =>{
        await db.collection('Admin').updateOne({Username:user},{$set:{Password:newpass}},{upsert:true});
    }
}