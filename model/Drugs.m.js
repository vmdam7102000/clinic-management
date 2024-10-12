const {db}=require('../model/Database.m');
module.exports = {
    getAll: async () => {
        const rs=await db.collection('Drugs').find({}).toArray();
        return rs;
    },
    getMaxID: async()=>{
        const rs=await db.collection('Drugs').find({}).sort("ID",-1).limit(1).toArray();
        return rs;
    },
    getByName: async(Name) => {
        const rs=await db.collection('Drugs').find({Name:Name}).toArray();
        return rs;
    },
    getByID: async(ID) => {
        const rs=await db.collection('Drugs').find({ID:ID}).toArray();
        return rs;
    },
    update: async(ID,data) => {
        await db.collection('Drugs').updateOne({ID:ID},{$set:data},{upsert:true});
    },
    delete: async(ID)=>{
        await db.collection('Drugs').deleteOne({ID:ID});
    },
    add: async (data) => {
        const rs = await db.collection('Drugs').insertOne({
            
            ID: data.ID,
            Name: data.Name,
            Unit: data.Unit,
            Price: data.Price,
            Quantity: data.Quantity,
            Chemicals: data.Chemicals,
            Uses: data.Uses
        });
        return rs;
    },
}