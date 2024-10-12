const app=require('express');
const router=app.Router();
const adminC=require('../controllers/admin.c');

router.get('/them-bacsi', adminC.renderDoctorRegist)
router.post('/them-bacsi', adminC.createDoctor)
router.get('/them-yta', adminC.renderNurseRegist)
router.post('/them-yta', adminC.createNurse)
router.get('/themthuoc', adminC.renderMedicineRegist)
router.post('/themthuoc', adminC.createMedicine)

module.exports=router;