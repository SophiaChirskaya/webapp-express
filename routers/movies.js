const express = require('express');
const router = express.Router();

const upload = require('../middlewares/multer');

const movieController = require("../controllers/moviesController");

router.get('/', movieController.index);
router.get('/:id', movieController.show);
router.post('/:id/reviews', movieController.storeReview);
router.post('/', upload.single('image'),  movieController.store);


module.exports = router;