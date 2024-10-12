const {db}=require('../model/Database.m');
module.exports = {
    getAll: async () => {
        const rs=await db.collection('Nurses').find({}).toArray();
        return rs;
    },
    getByName: async(Name) => {
        const rs=await db.collection('Nurses').find({Name:Name}).toArray();
        return rs;
    },
    getByID: async(ID) => {
        const rs=await db.collection('Nurses').find({ID:ID}).toArray();
        return rs;
    },
    getByUsername: async(Username)=> {
        const rs=await db.collection('Nurses').find({Username:Username}).toArray();
        return rs;
    },
    update: async(user,data) => {
        await db.collection('Nurses').updateOne({Username:user},{$set:data},{upsert:true});
    },
    getMaxID: async()=>{
        const rs=await db.collection('Nurses').find({}).sort("ID",-1).limit(1).toArray();
        return rs;
    },
    add: async (data) => {
        const rs = await db.collection('Nurses').insertOne({
            Username: data.Username,
            Password: data.Password,
            Name: data.Name,
            DOB: data.DOB,
            Gender: data.Gender,
            Phone: data.Phone,
            Email: data.Email,
            Address: data.Address,
            Qualification: data.Qualification,
            Specialty: data.Specialty,
            YOE: data.YOE,
            Idnumber: data.Idnumber,
            ID: data.ID
        });
        return rs;
    },
    getNurseSalariesByNWithDetails : async (month, year, username) => {
        const rs = await db.collection('MedicalHistory').aggregate([
            {
                // Extract month and year from 'discharge_date' and keep the relevant fields
                $project: {
                    NurseUsername: 1,
                    NurseName: 1,
                    medical_status: 1,
                    discharge_date: 1,
                    Name: 1,                       // Patient name
                    Diagnosis: 1,                  // Disease/Diagnosis
                    entry_date: 1,                 // Entry date for the visit
                    discharge_date: 1,             // Discharge date for the visit
                    month: { $substr: ["$discharge_date", 5, 2] },  // Extract month from discharge_date (YYYY-MM-DD)
                    year: { $substr: ["$discharge_date", 0, 4] }    // Extract year from discharge_date (YYYY-MM-DD)
                }
            },
            {
                $match: {
                    NurseUsername: username,
                    month: month.toString(),       // Match the given month
                    year: year.toString()          // Match the given year
                }
            },
            {
                // Group by Nurse username and Nurse name, collect MedicalHistory details for each doctor
                $group: {
                    _id: { NurseUsername: "$NurseUsername", NurseName: "$NurseName" },
                    recoveredPatients: { $sum: 1 },  // Count the number of recovered patients
                    totalPatients: { $sum: 1 },
                    details: {
                        $push: {
                            Name: "$Name",                 // Patient name
                            Diagnosis: "$Diagnosis",       // Disease/Diagnosis
                            entry_date: "$entry_date",     // Entry date of the patient
                            discharge_date: "$discharge_date",  // Discharge date of the patient
                            medical_status: "$medical_status"
                        }
                    }
                }
            },
            {
                // Calculate the salary: base salary + 2000,000 VND for each supported patient
                $project: {
                    _id: 0,
                    NurseUsername: "$_id.NurseUsername",
                    NurseName: "$_id.NurseName",
                    totalPatients: "$totalPatients",
                    salary: { 
                        $add: [
                            5000000,                     // Base salary
                            { $multiply: [200000, "$recoveredPatients"] } // Bonus for supported patients
                        ]
                    },
                    details: 1                         // Include the MedicalHistory details
                }
            }
        ]).toArray();
    
        
        return rs;
    },

    getNurseSalariesWithDetails : async (month, year) => {
        const rs = await db.collection('MedicalHistory').aggregate([
            {
                // Extract month and year from 'discharge_date' and keep the relevant fields
                $project: {
                    NurseUsername: 1,
                    NurseName: 1,
                    medical_status: 1,
                    discharge_date: 1,
                    Name: 1,                       // Patient name
                    Diagnosis: 1,                  // Disease/Diagnosis
                    entry_date: 1,                 // Entry date for the visit
                    discharge_date: 1,             // Discharge date for the visit
                    month: { $substr: ["$discharge_date", 5, 2] },  // Extract month from discharge_date (YYYY-MM-DD)
                    year: { $substr: ["$discharge_date", 0, 4] }    // Extract year from discharge_date (YYYY-MM-DD)
                }
            },
            {
                $match: {
                    month: month.toString(),       // Match the given month
                    year: year.toString()          // Match the given year
                }
            },
            {
                // Group by Nurse username and Nurse name, collect MedicalHistory details for each doctor
                $group: {
                    _id: { NurseUsername: "$NurseUsername", NurseName: "$NurseName" },
                    recoveredPatients: { $sum: 1 },  // Count the number of recovered patients
                    totalPatients: { $sum: 1 },
                    details: {
                        $push: {
                            Name: "$Name",                 // Patient name
                            Diagnosis: "$Diagnosis",       // Disease/Diagnosis
                            entry_date: "$entry_date",     // Entry date of the patient
                            discharge_date: "$discharge_date",  // Discharge date of the patient
                            medical_status: "$medical_status"
                        }
                    }
                }
            },
            {
                // Calculate the salary: base salary + 2000,000 VND for each supported patient
                $project: {
                    _id: 0,
                    NurseUsername: "$_id.NurseUsername",
                    NurseName: "$_id.NurseName",
                    totalPatients: "$totalPatients",
                    salary: { 
                        $add: [
                            5000000,                     // Base salary
                            { $multiply: [200000, "$recoveredPatients"] } // Bonus for supported patients
                        ]
                    },
                    details: 1                         // Include the MedicalHistory details
                }
            }
        ]).toArray();
    
        
        return rs;
    }
}