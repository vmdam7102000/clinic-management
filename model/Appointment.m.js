const { ObjectID } = require('bson');
const {db}=require('../model/Database.m');
module.exports = {
    add: async (data) => {
        const rs = await db.collection('Appointments').insertOne({
            Patient_Username: data.Patient_Username,
            Patient_Name: data.Patient_Name,
            Patient_DOB: data.Patient_DOB,
            Patient_Gender: data.Gender,
            Patient_Phone: data.Patient_Phone,
            // Email: data.Email,
            DoctorID: data.Doctor.ID,
            Doctor_Name: data.Doctor.Name,
            Datetime: data.Datetime,
            // Time: data.Time,
            Status: data.Status
        });
        return rs;
    },
    getAll: async () => {
        const rs=await db.collection('Appointments').find({}).toArray();
        return rs;
    },
    getByName: async(Name) => {
        const rs=await db.collection('Appointments').find({Name:Name}).toArray();
        return rs;
    },
    getByID: async(ID) => {
        const rs=await db.collection('Appointments').find({ID:ID}).toArray();
        return rs;
    },
    getByUsername: async(Username)=> {
        const rs=await db.collection('Appointments').find({Patient_Username:Username}).toArray();
        return rs;
    },
    changeStatus: async(ID, Status)=>{
        const rs=await db.collection('Appointments').updateOne({_id:new ObjectID(ID)},{$set:{Status:Status}});
        return rs;
    }
}