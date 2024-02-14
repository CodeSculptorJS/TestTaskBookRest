const db = require('../models');


const addBook = async(req,res)=>{
    let info = {
        title: req.body.title,
        author: req.body.author,
        year: req.body.year,
        genre: req.body.genre,
    }
    const book = await db.Book.create(info);
    return res.status(200).send(book);
}

const getAllBook = async(req, res)=>{
    let books = await db.Book.findAll();
    return res.status(200).send(books);
}

const updateBook = async(req, res)=>{
    let id = req.params.id;
    if(id)
    {
        const book = await db.Book.update(req.body, { where:{ id: id } });
        return res.status(200).send(book);
    }
    return res.status(500);
}

const deleteBook = async(req,res)=>{
    let id = req.params.id;
    if(id)
    {
        await db.Book.destroy({ where: { id: id } });
        return res.status(200).send('Book deleted');
    }
    return res.status(500);
}

module.exports = {
    addBook,
    getAllBook,
    updateBook,
    deleteBook,
}