const app=require('express');
const router=app.Router();
const editC=require('../controllers/edit.c');
router.post('/thuoc/:ID',editC.postEditDrug);
router.post('/thuoc/xoa/:Name',editC.deleteDrug);
router.post('/dich-vu/:ID',editC.postEditService);
router.post('/dich-vu/xoa/:ID',editC.deleteService);
router.post('/lich-lam-viec',editC.postSchedule);
module.exports=router;