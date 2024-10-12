const DoctorsM = require('../model/Doctors.m');
const NursesM = require('../model/Nurses.m');
const DrugsM = require('../model/Drugs.m');
const ServicesM = require('../model/Services.m');
const userM=require('../model/Users.m');

exports.renderDoctorRegist= async(req, res, next) =>{
    try {
        res.render('registdoctor', {display:"d-none",display1:"d-block",display2:"d-none"});
    } catch(err) {
        next(err);
    }
};

exports.createDoctor=async(req, res, next)=>{
    
    try {
        var doctor=req.body;
        const rs=await DoctorsM.getMaxID();
        if (rs.length==0) {
            doctor.ID="1";
        }
        else {
            var ID=parseInt(parseInt(rs[0].ID)+1);
            doctor.ID=ID.toString();
        }
        doctor.DOB=new Date(doctor.DOB);
        DoctorsM.getByUsername(doctor.Username).then(rs=>{
            if (rs.length==0) {
                DoctorsM.add(doctor);
                res.redirect('/');
            }
            else {
                res.render('registdoctor',{doctor:doctor, display: "block",display1:"d-block",display2:"d-none", role:"admin"});
            }
        })
    } catch(err) {
        next(err);
    }
};

exports.renderNurseRegist= async(req, res, next) =>{
    try {
        res.render('registnurse', {display:"d-none",display1:"d-block",display2:"d-none"});
    } catch(err) {
        next(err);
    }
};

exports.createNurse=async(req, res, next)=>{
    
    try {
        var nurse=req.body;
        const rs=await NursesM.getMaxID();
        if (rs.length==0) {
            nurse.ID="1";
        }
        else {
            var ID=parseInt(parseInt(rs[0].ID)+1);
            nurse.ID=ID.toString();
        }
        nurse.DOB=new Date(nurse.DOB);
        NursesM.getByUsername(nurse.Username).then(rs=>{
            if (rs.length==0) {
                NursesM.add(nurse);
                res.redirect('/');
            }
            else {
                res.render('registnurse',{nurse:nurse, display: "block",display1:"d-block",display2:"d-none", role:"admin"});
            }
        })
    } catch(err) {
        next(err);
    }
};

exports.renderMedicineRegist= async(req, res, next) =>{
    try {
        res.render('registmedicine', {display:"d-none",display1:"d-block",display2:"d-none"});
    } catch(err) {
        next(err);
    }
};


exports.createMedicine=async(req, res, next)=>{
    
    try {
        var drug=req.body;
        const rs=await DrugsM.getMaxID();
        if (rs.length==0) {
            drug.ID="1";
        }
        else {
            var ID=parseInt(parseInt(rs[0].ID)+1);
            drug.ID=ID.toString();
        }

        DrugsM.getByName(drug.Name).then(rs=>{
            if (rs.length==0) {
                DrugsM.add(drug);
                res.redirect('/');
            }
            else {
                res.render('registmedicine',{drug:drug, display: "block",display1:"d-block",display2:"d-none", role:"admin"});
            }
        })
    } catch(err) {
        next(err);
    }
};