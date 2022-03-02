const express = require('express');
const router = express.Router();

const {
  getAllGroceries,
  createGrocery,
  updateGrocery,
  deleteGrocery,
  deleteAllGroceries,
} = require('../controllers/groceryController');

router
  .route('/')
  .get(getAllGroceries)
  .post(createGrocery)
  .delete(deleteAllGroceries);
router.route('/:id').patch(updateGrocery).delete(deleteGrocery);

module.exports = router;
