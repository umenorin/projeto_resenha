var express = require('express');
var router = express.Router();
const BookAnalyst = require('../models/BookAnalyst');



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

module.exports = router;