const { ObjectID } = require('bson');
const {db}=require('../model/Database.m');
module.exports = {
    add: async (data) => {
        const rs = await db.collection('Revenue').insertOne(data);
        return rs;
    },
    getAll: async () => {
        const rs=await db.collection('Revenue').find({}).toArray();
        return rs;
    },
    getByID: async(ID) => {
        const rs=await db.collection('Revenue').find({_id:new ObjectID(ID)}).toArray();
        return rs;
    },

    getRevenue: async (month, year) => {
        const rs = await db.collection('MedicalHistory').aggregate([
            {
                // Extract month and year from 'discharge_date' and include all relevant fields
                $project: {
                    Name: 1,                       // Patient name
                    Diagnosis: 1,                  // Disease/Diagnosis
                    DoctorID: 1,                   // Doctor's ID
                    DoctorName: 1,                 // Doctor's name
                    entry_date: 1,                 // Entry date
                    discharge_date: 1,             // Discharge date
                    AllTotal: { $toDouble: "$AllTotal" },  // Convert AllTotal to double
                    month: { $substr: ["$discharge_date", 5, 2] },  // Extract month from discharge_date (YYYY-MM-DD)
                    year: { $substr: ["$discharge_date", 0, 4] }    // Extract year from discharge_date (YYYY-MM-DD)
                }
            },
            {
                // Filter records by the given month and year
                $match: {
                    month: month.toString(),
                    year: year.toString()
                }
            },
            {
                // Group everything and sum the revenue from AllTotal
                $group: {
                    _id: null,  // No grouping by any field, just aggregate everything
                    totalRevenue: { $sum: "$AllTotal" },  // Sum the AllTotal field
                    details: {
                        $push: {
                            Name: "$Name",               // Patient name
                            Diagnosis: "$Diagnosis",     // Disease/Diagnosis
                            DoctorID: "$DoctorID",       // Doctor ID
                            DoctorName: "$DoctorName",   // Doctor's name
                            entry_date: "$entry_date",   // Entry date for the visit
                            discharge_date: "$discharge_date",  // Discharge date for the visit
                            AllTotal: "$AllTotal"        // Total amount for the visit
                        }
                    }
                }
            }
        ]).toArray();
    
        if (rs.length > 0) {
            return {
                totalRevenue: rs[0].totalRevenue,  // Return total revenue
                details: rs[0].details.map(detail => ({
                    Name: detail.Name,                    // Patient name
                    Diagnosis: detail.Diagnosis,          // Disease/Diagnosis
                    DoctorID: detail.DoctorID,            // Doctor's ID
                    DoctorName: detail.DoctorName,        // Doctor's name
                    entry_date: detail.entry_date,        // Entry date for the visit
                    discharge_date: detail.discharge_date, // Discharge date for the visit
                    AllTotal: detail.AllTotal             // Total amount for the visit
                }))
            };
        } else {
            return { totalRevenue: 0, details: [] };  // If no records, return 0 revenue and an empty array
        }
    },


    getRevenueWithDetails : async (month, year) => {
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
                    AllTotal: { $toDouble: "$AllTotal" },
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
                // Group by DoctorID and DoctorName, collect MedicalHistory details for each doctor
                $group: {
                    _id: null,
                    totalRevenue: { $sum: "$AllTotal" },
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
            }
            // ,
            // {
            //     // Calculate the salary: base salary + 1,000,000 VND for each recovered patient
            //     $project: {
            //         _id: 0,
            //         totalRevenue: "$totalRevenue",
            //         DoctorName: "$_id.DoctorName",
            //         totalPatients: "$totalPatients",
            //         salary: { 
            //             $add: [
            //                 7000000,                     // Base salary
            //                 { $multiply: [1000000, "$recoveredPatients"] } // Bonus for recovered patients
            //             ]
            //         },
            //         details: 1                         // Include the MedicalHistory details
            //     }
            // }
        ]).toArray();
    
        return rs;
    }
    
    
    
    
}