var express = require('express');
var router = express.Router();
const BookAnalyst = require('../models/BookAnalyst');
const User = require('../models/user'); 
const Book = require('../models/book'); 

router.get('/:id', async function (req, res, next){
    try{
        const bookAnalystId = req.params.id;
        const bookAnalyst = await BookAnalyst.findById(bookAnalystId) // Populate the user field
        res.status(200).json({
            myMsgSucesso: "Mensagens recuperadas com sucesso",
            objSMessageSRecuperadoS: book
        });
    }catch(err){
        return res.status(500).json({
            myErrorTItle: "Serve-Side: Um erro aconteceu ao buscar o livro",
            myError: err
        })
    }
});

router.delete('/:userId/:bookAId', async function (req, res, next) {
    try {
        const  userId= req.params.userId;
        const  bookAId= req.params.bookAId;
        // Busca o usuário e verifica se a resenha pertence a ele
        const user = await User.findById(userId)
        if (!user) {
            return res.status(404).json({
                myErrorTitle: "Usuário não encontrado",
                myError: "O ID fornecido não corresponde a nenhum usuário."
            });
        }

        // Remove a resenha da coleção de resenhas do usuário e a exclui
        const bookAnalyst = await BookAnalyst.findOneAndDelete({ _id: bookAId});
        if (!bookAnalyst) {
            return res.status(404).json({
                myErrorTitle: "Resenha não encontrada",
                myError: "A resenha especificada não foi encontrada para este usuário."
            });
        }

        // Remove a resenha do array do usuário e salva o usuário atualizado
        user.bookAnalyst = user.bookAnalyst.filter(
            (reviewId) => reviewId.toString() !== bookAId
        );
        await user.save();

        // Remove a resenha do array do livro associado
        const book = await Book.findOneAndUpdate(
            { bookAnalyst: bookAId },
            { $pull: { bookAnalyst: bookAId } }
        );

        res.status(200).json({
            myMsgSucesso: "Resenha removida com sucesso",
            objReviewRemovido: bookAnalyst
        });
    } catch (err) {
        return res.status(500).json({
            myErrorTitle: "Serve-Side: Um erro aconteceu ao remover a resenha",
            myError: err.message
        });
    }
});

router.patch('/:userId/:bookAId', async function (req, res, next) {
    try {
        const { userId, bookAId } = req.params;
        const { title, content, rating } = req.body;

        // Busca o usuário e garante que a resenha pertence ao usuário
        const user = await User.findById(userId).populate('bookAnalyst');
        if (!user) {
            return res.status(404).json({
                myErrorTitle: "Usuário não encontrado",
                myError: "O ID fornecido não corresponde a nenhum usuário."
            });
        }

        // Encontra a resenha pelo ID e a atualiza
        const bookAnalyst = await BookAnalyst.findOneAndUpdate(
            { _id: bookAId, autor: userId },
            { title, content, rating },
            { new: true }
        );

        if (!bookAnalyst) {
            return res.status(404).json({
                myErrorTitle: "Resenha não encontrada",
                myError: "A resenha especificada não foi encontrada para este usuário."
            });
        }

        res.status(200).json({
            myMsgSucesso: "Resenha atualizada com sucesso",
            objReviewAtualizado: bookAnalyst
        });
    } catch (err) {
        return res.status(500).json({
            myErrorTitle: "Serve-Side: Um erro aconteceu ao atualizar a resenha",
            myError: err.message
        });
    }
});

module.exports = router;