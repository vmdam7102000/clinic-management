const { Logger } = require('mongodb');
const {db}=require('../model/Database.m');
module.exports = {
    getDiseases: async (month, year) => {

        const rs = await db.collection('MedicalHistory').aggregate([
            {
                $project: {
                    Name: 1,
                    Diagnosis: 1,
                    medical_status: 1,
                    discharge_date: 1,
                    month: { $substr: ["$discharge_date", 5, 2] },  // Extract month from discharge_date (YYYY-MM-DD)
                    year: { $substr: ["$discharge_date", 0, 4] }    // Extract year from discharge_date (YYYY-MM-DD)
                }
            },
            {
                $match: {
                    medical_status: "khỏi bệnh",       // Only patients who have recovered
                    month: month.toString(),           // Match the given month
                    year: year.toString()              // Match the given year
                }
            },
            {
                $group: {
                    _id: "$Diagnosis",                // Group by Diagnosis
                    distinctPatients: { $addToSet: "$Name" }  // Collect distinct patient names
                }
            },
            {
                $project: {
                    _id: 1,
                    patientCount: { $size: "$distinctPatients" }  // Count the distinct patients
                }
            },
            {
                $sort: { patientCount: -1 }          // Sort by patient count in descending order
            }
        ]).toArray();
    
        

        return rs;
    }
    
}