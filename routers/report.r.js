const app=require('express');
const router=app.Router();
const reportC=require('../controllers/report.c');
router.get('/benh',reportC.getDiseases);
router.get('/luong-bacsi', reportC.getDoctorPayslip)
router.get('/doanhthu',reportC.getRevenue)
router.get('/luong-yta', reportC.getNursePayslip)
// router.post('/thuoc/:ID',editC.postEditDrug);
// router.post('/thuoc/xoa/:Name',editC.deleteDrug);
// router.post('/dich-vu/:ID',editC.postEditService);
// router.post('/dich-vu/xoa/:ID',editC.deleteService);
// router.get('/so-benh-nhan-toi-da',editC.getMaxPatients);
// router.post('/so-benh-nhan-toi-da',editC.postMaxPatients);
// router.post('/lich-lam-viec',editC.postSchedule);
module.exports=router;