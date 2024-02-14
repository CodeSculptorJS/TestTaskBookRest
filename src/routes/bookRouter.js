const bookController = require('../controllers/bookController');

const router = require('express').Router();

router.post('/addBook', bookController.addBook); 

router.get('/allBooks', bookController.getAllBook);

router.patch('/:id', bookController.updateBook);

router.delete('/:id', bookController.deleteBook);

module.exports = router;