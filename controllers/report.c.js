const medicalRecordM = require('../model/MedicalRecords.m');
const ServicesM = require('../model/Services.m');
const UsersM = require('../model/Users.m');
const DoctorsM = require('../model/Doctors.m');
const DrugsM = require('../model/Drugs.m');
const RevenueM = require('../model/Revenue.m');

String.prototype.replaceAt = function (index, replacement) {
    return this.substring(0, index) + replacement + this.substring(index + replacement.length);
}


exports.getDiseases = async (req, res, next) => {

        const rs = await medicalRecordM.getDiseases('09','2024');
        console.log(rs);

        res.render('patientRecord', { records: rs, display1:"d-none",display2:"d-block", role:"doctor"});

}


exports.getPayslip = async (req, res, next) => {

        const rs = await DoctorsM.getDoctorSalariesWithDetails('09','2024');
        console.log(rs);

        res.render('payslip', { records: rs, display1:"d-none",display2:"d-block", role:"doctor"});

}


exports.getRevenue = async (req, res, next) => {

    const rs = await RevenueM.getRevenueWithDetails('09','2024');
    console.log(rs);

    res.render('revenue', { records: rs, display1:"d-none",display2:"d-block", role:"doctor"});

}