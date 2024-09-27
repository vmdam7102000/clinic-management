const medicalRecordM = require('../model/MedicalRecords.m');
const ServicesM = require('../model/Services.m');
const UsersM = require('../model/Users.m');
const DoctorsM = require('../model/Doctors.m');
const DrugsM = require('../model/Drugs.m');

String.prototype.replaceAt = function (index, replacement) {
    return this.substring(0, index) + replacement + this.substring(index + replacement.length);
}


exports.getDiseases = async (req, res, next) => {
    // try {
    //     console.Console.log("damvm");
    //     const rs = await medicalRecordM.getDiseases(9,2024);
    //     console.log(rs);
        
    //     // const appointments=await AppointmentM.getByID(rs[0].ID);
    //     // for (let i=0;i<appointments.length;i++) {
    //     //     appointments[i].Date = typeof appointments[i].Date == "object" ? appointments[i].Date.toLocaleDateString('vi-VN') : "";
    //     // }
    //     // rs[0].href = 'https://www.google.com/search?q=' + rs[0].Title + ' ' + rs[0].Name;
    //     // if (rs[0].schedule==undefined) rs[0].error="empty";
    //     // res.render('detailDoctor', { data: rs[0], display1: "d-none", display2: "d-block",role:"doctor", appointments:appointments, username:req.session.Username});
    // } catch (err) {
    //     next(err);
    // }


    // let role = "patient";
    // if (req.session.Doctor) {
    //     role = "doctor";
    // }
    // if (1!=1) {
    //     if (req.session.Username) {
    //         return res.render('error', { display1: "d-none", display2: "d-block", role: role });
    //     }
    //     else {
    //         return res.render('error', { display1: "d-block", display2: "d-none", role: role });
    //     }
    // }
    // else {
        // const patients = await UsersM.getAll();
        // const doctor = await DoctorsM.getByUsername(req.session.Username);
        // var today = new Date();
        // var date=typeof today == "object" ? today.toLocaleDateString('vi-VN') : "";
        // var time=typeof today=="object"?today.toLocaleTimeString('vi-VN') : "";
        // today = typeof today == "object" ? today.toLocaleString('vi-VN') : "";
        // const drugs = await DrugsM.getAll();
        // const services = await ServicesM.getAll();
        // for (let i = 0; i < services.length; i++) {
        //     services[i].Name = services[i].ServiceName;
        //     services[i].Unit = "Dịch vụ";
        //     services[i].Quantity=1;
        //     drugs.push(services[i]);
        // }

        const rs = await medicalRecordM.getDiseases('09','2024');
        console.log(rs);

        res.render('patientRecord', { records: rs, display1:"d-none",display2:"d-block", role:"doctor"});
    // }
}


exports.getPayslip = async (req, res, next) => {
    // try {
    //     console.Console.log("damvm");
    //     const rs = await medicalRecordM.getDiseases(9,2024);
    //     console.log(rs);
        
    //     // const appointments=await AppointmentM.getByID(rs[0].ID);
    //     // for (let i=0;i<appointments.length;i++) {
    //     //     appointments[i].Date = typeof appointments[i].Date == "object" ? appointments[i].Date.toLocaleDateString('vi-VN') : "";
    //     // }
    //     // rs[0].href = 'https://www.google.com/search?q=' + rs[0].Title + ' ' + rs[0].Name;
    //     // if (rs[0].schedule==undefined) rs[0].error="empty";
    //     // res.render('detailDoctor', { data: rs[0], display1: "d-none", display2: "d-block",role:"doctor", appointments:appointments, username:req.session.Username});
    // } catch (err) {
    //     next(err);
    // }


    // let role = "patient";
    // if (req.session.Doctor) {
    //     role = "doctor";
    // }
    // if (1!=1) {
    //     if (req.session.Username) {
    //         return res.render('error', { display1: "d-none", display2: "d-block", role: role });
    //     }
    //     else {
    //         return res.render('error', { display1: "d-block", display2: "d-none", role: role });
    //     }
    // }
    // else {
        // const patients = await UsersM.getAll();
        // const doctor = await DoctorsM.getByUsername(req.session.Username);
        // var today = new Date();
        // var date=typeof today == "object" ? today.toLocaleDateString('vi-VN') : "";
        // var time=typeof today=="object"?today.toLocaleTimeString('vi-VN') : "";
        // today = typeof today == "object" ? today.toLocaleString('vi-VN') : "";
        // const drugs = await DrugsM.getAll();
        // const services = await ServicesM.getAll();
        // for (let i = 0; i < services.length; i++) {
        //     services[i].Name = services[i].ServiceName;
        //     services[i].Unit = "Dịch vụ";
        //     services[i].Quantity=1;
        //     drugs.push(services[i]);
        // }

        const rs = await DoctorsM.getDoctorSalaries('09','2024');
        console.log(rs);

        // res.render('payslip', { records: rs, display1:"d-none",display2:"d-block", role:"doctor"});
    // }
}