const medicalRecordM = require('../model/MedicalRecords.m');
const ServicesM = require('../model/Services.m');
const nursesM = require('../model/Nurses.m');
const DoctorsM = require('../model/Doctors.m');
const DrugsM = require('../model/Drugs.m');
const RevenueM = require('../model/Revenue.m');
const session = require('express-session');

String.prototype.replaceAt = function (index, replacement) {
    return this.substring(0, index) + replacement + this.substring(index + replacement.length);
}


exports.getDiseases = async (req, res, next) => {

    const month = req.query.month || '00';
    const year = req.query.year || '00';

    console.log(month);
    console.log(year);
    const rs = await medicalRecordM.getDiseases(month,year);
    console.log(rs);

    res.render('patientRecord', { records: rs, display1:"d-none",display2:"d-block", role:"doctor"});

}


exports.getDoctorPayslip = async (req, res, next) => {

    const month = req.query.month || '00';
    const year = req.query.year || '00';
    const docid = req.session.Id;
    if(req.session.Admin !== null){
    const rs = await DoctorsM.getDoctorSalariesWithDetails(month,year,docid);
    console.log(rs);
    res.render('doctor-payslip', { records: rs, display1:"d-none",display2:"d-block", role:"doctor"});
    }else {
    const rs = await DoctorsM.getDoctorSalariesWithDetails(month,year,docid);
    console.log(rs); 
    res.render('doctor-payslip', { records: rs, display1:"d-none",display2:"d-block", role:"admin"});
    }

    

}

exports.getNursePayslip = async (req, res, next) => {

    const month = req.query.month || '00';
    const year = req.query.year || '00';
    const username = req.session.Username;

    console.log("hello");
    console.log(username);

    if(req.session.Admin !== null){
    console.log(req.session.Admin);
    const rs = await nursesM.getNurseSalariesByNWithDetails(month,year,username);
    console.log(rs);
    res.render('nurse-payslip', { records: rs, display1:"d-none",display2:"d-block", role:"nurse"});
    }else{
    const rs = await nursesM.getNurseSalariesWithDetails(month,year);
    console.log(rs);
    res.render('nurse-payslip', { records: rs, display1:"d-none",display2:"d-block", role:"admin"});
    }

    

}


exports.getRevenue = async (req, res, next) => {

    const month = req.query.month || '00';
    const year = req.query.year || '00';

    const rs = await RevenueM.getRevenueWithDetails(month,year);
    console.log(rs);

    res.render('revenue', { records: rs, display1:"d-none",display2:"d-block", role:"doctor"});

}