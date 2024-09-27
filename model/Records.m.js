const { db } = require('../model/Database.m');
module.exports = {
    add: async (data) => {
        const rs = await db.collection('MedicalHistory').insertOne(data);
        return rs;
    },
    getByUsername: async(username)=> {
        const rs=await db.collection('MedicalHistory').find({Username:username}).toArray();
        return rs;
    },
    getMaxID: async()=>{
        const rs=await db.collection('MedicalHistory').find({}).sort("ID",-1).limit(1).toArray();
        return rs;
    },
    getAll: async()=> {
        const rs=await db.collection('MedicalHistory').find({}).toArray();
        return rs;
    },
    getByID: async(ID)=> {
        const rs=await db.collection('MedicalHistory').find({ID:ID}).toArray();
        return rs;
    }
}