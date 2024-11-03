const express = require('express');
const router = express.Router();
const Book = require('../models/book');

router.get('/', async function (req, res) {
    try {
        const books = await Book.find({}).populate('bookAnalyst');
        res.status(200).json({
            myMsgSucesso: "Livros recuperados com sucesso",
            objSMessageSRecuperadoS: books
        });
    } catch (err) {
        return res.status(500).json({
            myErrorTitle: "Serve-Side: Um erro aconteceu ao buscar os livros",
            myError: err
        });
    }
});

router.post('/', async function (req, res) {
    const bookObject = new Book({
        title: req.body.title,
        author: req.body.author,
        edition: req.body.edition,
        publisher: req.body.publisher,
        gender: req.body.gender,
        bookAnalyst: req.body.bookAnalyst || []
    });

    console.log("Estou recebendo um novo livro");
    try {
        const bookSave = await bookObject.save();
        console.log(bookSave);
        res.status(201).json({
            myMsgSucesso: "Livro salvo com sucesso",
            objMessageSave: bookSave
        });
    } catch (err) {
        return res.status(500).json({
            myErrorTitle: "Serve-Side: Um erro aconteceu ao salvar o livro",
            myError: err
        });
    }
});

router.delete('/:id', async function (req, res) {
    const bookId = req.params.id;
    console.log(`Deletando livro com ID: ${bookId}`);

    try {
        const bookDeleted = await Book.findByIdAndDelete(bookId);

        if (!bookDeleted) {
            console.log(`Livro com ID ${bookId} não encontrado.`);
            return res.status(404).json({
                myErrorTitle: "Serve-Side: Livro não encontrado",
                myError: "Nenhum livro foi encontrado com o ID fornecido."
            });
        }

        console.log(`Livro deletado:`, bookDeleted);
        res.status(200).json({
            myMsgSucesso: "Livro deletado com sucesso",
            objMsgDeleted: bookDeleted
        });
    } catch (err) {
        console.log(`Erro ao deletar livro:`, err);
        return res.status(500).json({
            myErrorTitle: "Serve-Side: Um erro aconteceu ao deletar o livro",
            myError: err
        });
    }
});

router.patch('/:id', async function (req, res) {
    const bookId = req.params.id;
    const { title, author, edition, publisher, gender } = req.body;
    console.log(`Atualizando livro com ID: ${bookId}`);

    try {
        const updatedBook = await Book.findByIdAndUpdate(
            bookId,
            { title, author, edition, publisher, gender },
            { new: true }
        );

        if (!updatedBook) {
            return res.status(404).json({
                myErrorTitle: "Serve-Side: Livro não encontrado",
                myError: "Nenhum livro foi encontrado com o ID fornecido."
            });
        }

        res.status(200).json({
            myMsgSucesso: "Livro atualizado com sucesso",
            objUpdatedBook: updatedBook
        });
    } catch (err) {
        return res.status(500).json({
            myErrorTitle: "Serve-Side: Erro ao atualizar o livro",
            myError: err
        });
    }
});

router.get('/:bookId/review', async function (req, res) {
    try {
        const bookId = req.params.bookId;
        const book = await Book.findById(bookId).populate('bookAnalyst');
        if (!book) {
            return res.status(404).json({
                myErrorTitle: "Livro não encontrado",
                myError: "O ID fornecido não corresponde a nenhum livro."
            });
        }
        const bookAnalysts = book.bookAnalyst;
        res.status(200).json({
            myMsgSucesso: "Resenhas do livro recuperadas com sucesso",
            objReviewsRecuperados: bookAnalysts
        });
    } catch (err) {
        return res.status(500).json({
            myErrorTitle: "Serve-Side: Um erro aconteceu ao buscar as resenhas",
            myError: err.message
        });
    }
});

router.get('/:bookId/review/:bookAId', async function (req, res) {
    try {
        const { bookId, bookAId } = req.params;

        const book = await Book.findById(bookId).populate('bookAnalyst');

        if (!book) {
            return res.status(404).json({
                myErrorTitle: "Livro não encontrado",
                myError: "O ID fornecido não corresponde a nenhum livro."
            });
        }

        const bookAnalyst = book.bookAnalyst.find(x => x._id.toString() === bookAId);

        if (!bookAnalyst) {
            return res.status(404).json({
                myErrorTitle: "Resenha não encontrada",
                myError: "O ID fornecido não corresponde a nenhuma resenha deste livro."
            });
        }

        res.status(200).json({
            myMsgSucesso: "Resenha do livro recuperada com sucesso",
            objReviewRecuperado: bookAnalyst
        });
    } catch (err) {
        return res.status(500).json({
            myErrorTitle: "Serve-Side: Um erro aconteceu ao buscar a resenha",
            myError: err.message
        });
    }
});

module.exports = router;