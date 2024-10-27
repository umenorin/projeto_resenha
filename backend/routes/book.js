var express = require('express');
var router = express.Router();
const Book = require('../models/book');
const BookAnalyst = require('../models/BookAnalyst');

router.get('/', async function (req, res, next){
    try{
        const books = await Book.find({}).populate('bookAnalyst');  // Populate the user field
        res.status(200).json({
            myMsgSucesso: "Mensagens recuperadas com sucesso",
            objSMessageSRecuperadoS: books
        });
    }catch(err){
        return res.status(500).json({
            myErrorTItle: "Serve-Side: Um erro aconteceu ao buscar as MensagenS",
            myError: err
        })
    }
});

router.post('/', async function (req, res, next) {
    const bookObject = new Book({
        title: req.body.title,
        author: req.body.author,
        edition: req.body.edition,
        publisher: req.body.publisher,
        gender: req.body.gender,
        bookAnalyst: req.body.bookAnalyst || []  
    });

    console.log("Estou recebendo uma mensagem nova")
    try{
        const bookSave = await bookObject.save();
        console.log(bookSave);
        res.status(201).json({
            myMsgSucesso: "Messagem salva com sucesso",
            objMessageSave: bookSave
        })
    }catch(err){
        return res.status(500).json({
            myErrorTitle: "Serve-Side: Um erro aconteceu ao salvar a msg",
            myError : err
        });
    }

});

router.delete('/:id', async function (req, res, next) {
    const bookId = req.params.id;
    console.log(`Deleting book with ID: ${bookId}`);

    try {
        const bookDeleted = await Book.findByIdAndDelete(bookId);
        
        if (!bookDeleted) {
            console.log(`Livro com ID ${bookId} não encontrada.`);
            return res.status(404).json({
                myErrorTitle: "Serve-Side: Livro não encontrada",
                myError: "Nenhuma livro foi encontrada com o ID fornecido."
            });
        }

        console.log(`Livro deletado:`, bookDeleted

        );
        res.status(200).json({
            myMsgSucesso: "Livro deletado com sucesso",
            objMsgDeleted: bookDeleted
        });
    } catch (err) {
        console.log(`Erro ao deletar Livro:`, err);
        return res.status(500).json({
            myErrorTitle: "Serve-Side: Um erro aconteceu ao deletar o Livro",
            myError: err
        });
    }
});

router.patch('/:id', async function (req, res, next) {
    const bookId = req.params.id;
    const { title, author, edition, publisher, gender } = req.body;  // Campos para atualizar
    console.log(bookId)
    console.log('Atualizando mensagem com ID:', bookId);
    
    try {
        const updatedBook = await Book.findByIdAndUpdate(
            bookId,
            { title, author, edition, publisher, gender },  // Campos atualizados
            { new: true }  // Retorna o documento atualizado
        );

        if (!updatedBook) {
            return res.status(404).json({
                myErrorTitle: "Serve-Side: Mensagem não encontrada",
                myError: "Nenhuma mensagem foi encontrada com o ID fornecido."
            });
        }

        res.status(200).json({
            myMsgSucesso: "Mensagem atualizada com sucesso",
            objUpdatedBook: updatedBook
        });
    } catch (err) {
        return res.status(500).json({
            myErrorTitle: "Serve-Side: Erro ao atualizar a mensagem",
            myError: err
        });
    }
});


// BookAnalyst
router.get('/:bookId/review', async function (req, res, next) {
    try {
        const bookId = req.params.bookId;
        const book = await Book.findById(bookId).populate('bookAnalyst');  // Correção: await adicionado
        if (!book) {
            return res.status(404).json({
                myErrorTitle: "livro não encontrado",
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

router.get('/:bookId/review/:bookAId', async function (req, res, next) {
    try {
        const { bookId, bookAId } = req.params;
        
        // Encontra o usuário e popula a lista de 'bookAnalyst'
        const book = await Book.findById(bookId).populate('bookAnalyst');
        
        if (!book) {
            return res.status(404).json({
                myErrorTitle: "Usuário não encontrado",
                myError: "O ID fornecido não corresponde a nenhum usuário."
            });
        }
        
        // Encontra a resenha específica no array 'bookAnalyst' pelo 'bookAId'
        const bookAnalyst = book.bookAnalyst.find(x => x._id.toString() === bookAId);
        
        if (!bookAnalyst) {
            return res.status(404).json({
                myErrorTitle: "Resenha não encontrada",
                myError: "O ID fornecido não corresponde a nenhuma resenha deste usuário."
            });
        }
        
        res.status(200).json({
            myMsgSucesso: "Resenha do usuário recuperada com sucesso",
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