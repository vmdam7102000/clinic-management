const {db}=require('../model/Database.m');
module.exports = {
    getAll: async () => {
        const rs=await db.collection('Doctors').find({}).toArray();
        return rs;
    },
    getByName: async(Name) => {
        const rs=await db.collection('Doctors').find({Name:Name}).toArray();
        return rs;
    },
    getByID: async(ID) => {
        const rs=await db.collection('Doctors').find({ID:ID}).toArray();
        return rs;
    },
    getByUsername: async(Username)=> {
        const rs=await db.collection('Doctors').find({Username:Username}).toArray();
        return rs;
    },
    update: async(user,data) => {
        await db.collection('Doctors').updateOne({Username:user},{$set:data},{upsert:true});
    },

    getDoctorSalaries : async (month, year) => {
        const rs = await db.collection('MedicalHistory').aggregate([
            {
                // Extract month and year from 'discharge_date' and keep the relevant fields
                $project: {
                    DoctorID: 1,
                    DoctorName: 1,
                    medical_status: 1,
                    discharge_date: 1,
                    month: { $substr: ["$discharge_date", 5, 2] },  // Extract month from discharge_date (YYYY-MM-DD)
                    year: { $substr: ["$discharge_date", 0, 4] }    // Extract year from discharge_date (YYYY-MM-DD)
                }
            },
            {
                // Filter records by 'khỏi bệnh' and the given month and year
                $match: {
                    medical_status: "khỏi bệnh",   // Patients recovered
                    month: month.toString(),       // Match the given month
                    year: year.toString()          // Match the given year
                }
            },
            {
                // Group by DoctorID and DoctorName, count the number of recovered patients
                $group: {
                    _id: { DoctorID: "$DoctorID", DoctorName: "$DoctorName" },
                    recoveredPatients: { $sum: 1 }  // Count number of recovered patients for the doctor
                }
            },
            {
                // Calculate the salary: base salary + 1,000,000 VND for each recovered patient
                $project: {
                    _id: 0,
                    DoctorID: "$_id.DoctorID",
                    DoctorName: "$_id.DoctorName",
                    salary: { 
                        $add: [
                            7000000,                     // Base salary
                            { $multiply: [1000000, "$recoveredPatients"] } // Bonus for recovered patients
                        ]
                    }
                }
            }
        ]).toArray();
    
        return rs;
    },

    getDoctorSalariesWithDetails : async (month, year) => {
        const rs = await db.collection('MedicalHistory').aggregate([
            {
                // Extract month and year from 'discharge_date' and keep the relevant fields
                $project: {
                    DoctorID: 1,
                    DoctorName: 1,
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
                // Filter records by 'khỏi bệnh' and the given month and year
                $match: {
                    medical_status: "khỏi bệnh",   // Patients recovered
                    month: month.toString(),       // Match the given month
                    year: year.toString()          // Match the given year
                }
            },
            {
                // Group by DoctorID and DoctorName, collect MedicalHistory details for each doctor
                $group: {
                    _id: { DoctorID: "$DoctorID", DoctorName: "$DoctorName" },
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
                // Calculate the salary: base salary + 1,000,000 VND for each recovered patient
                $project: {
                    _id: 0,
                    DoctorID: "$_id.DoctorID",
                    DoctorName: "$_id.DoctorName",
                    totalPatients: "$totalPatients",
                    salary: { 
                        $add: [
                            7000000,                     // Base salary
                            { $multiply: [1000000, "$recoveredPatients"] } // Bonus for recovered patients
                        ]
                    },
                    details: 1                         // Include the MedicalHistory details
                }
            }
        ]).toArray();
    
        return rs;
    }
    
}