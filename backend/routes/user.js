var express = require('express');
var router = express.Router();
const User = require('../models/user');
const BookAnalyst = require('../models/BookAnalyst'); // Importando para garantir o registro
const Book = require('../models/book');




// GET: Recuperar todos os usuários
router.get('/', async function (req, res, next) {
    try {
        const users = await User.find({}).populate('bookAnalyst');
        res.status(200).json({
            myMsgSucesso: "Usuários recuperados com sucesso",
            objUsersRecuperados: users
        });
    } catch (err) {
        return res.status(500).json({
            myErrorTitle: "Serve-Side: Um erro aconteceu ao buscar os usuários",
            myError: err.message
        });
    }
});

router.get('/:userId', async function (req, res, next) {
    const userId = req.params.userId
    try {
        const users = await User.findById(userId).populate('bookAnalyst');
        res.status(200).json({
            myMsgSucesso: "Usuários recuperados com sucesso",
            objUsersRecuperados: users
        });
    } catch (err) {
        return res.status(500).json({
            myErrorTitle: "Serve-Side: Um erro aconteceu ao buscar os usuários",
            myError: err.message
        });
    }
});

// POST: Criar um novo usuário
router.post('/', async function (req, res, next) {
    console.log("Dados recebidos:", req.body); // Adicione este log para verificar o conteúdo do req.body

    const userObject = new User({
        name: req.body.nome, // Corrigido para corresponder ao campo do formulário
        password: req.body.senha, // Corrigido para corresponder ao campo do formulário
        email: req.body.email,
        bookAnalyst: req.body.bookAnalyst || []  
    });

    console.log("Estou recebendo um novo usuário");
    try {
        const userSave = await userObject.save();
        console.log("Usuário salvo:", userSave); // Adicione este log para verificar o usuário salvo
        res.status(201).json({
            myMsgSucesso: "Usuário salvo com sucesso",
            objUserSave: userSave
        });
    } catch (err) {
        console.error("Erro ao salvar usuário:", err); // Adicione este log para verificar o erro
        return res.status(500).json({
            myErrorTitle: "Serve-Side: Um erro aconteceu ao salvar o usuário",
            myError: err.message
        });
    }
});


// DELETE: Deletar um usuário pelo ID
router.delete('/:id', async function (req, res, next) {
    const userId = req.params.id;
    console.log(`Deleting user with ID: ${userId}`);

    try {
        const userDeleted = await User.findByIdAndDelete(userId);

        if (!userDeleted) {
            console.log(`Usuário com ID ${userId} não encontrado.`);
            return res.status(404).json({
                myErrorTitle: "Serve-Side: Usuário não encontrado",
                myError: "Nenhum usuário foi encontrado com o ID fornecido."
            });
        }

        console.log(`Usuário deletado:`, userDeleted);
        res.status(200).json({
            myMsgSucesso: "Usuário deletado com sucesso",
            objUserDeleted: userDeleted
        });
    } catch (err) {
        console.log(`Erro ao deletar usuário:`, err);
        return res.status(500).json({
            myErrorTitle: "Serve-Side: Um erro aconteceu ao deletar o usuário",
            myError: err
        });
    }
});

// PATCH: Atualizar um usuário pelo ID (agora com upload de nova foto de perfil)
router.patch('/:id', async function (req, res, next) {
    const userId = req.params.id;
    const { name, password, email, } = req.body;

    console.log(`Atualizando usuário com ID: ${userId}`);
    try {
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { name, password, email },
            { new: true }  // Retorna o documento atualizado
        );

        if (!updatedUser) {
            return res.status(404).json({
                myErrorTitle: "Serve-Side: Usuário não encontrado",
                myError: "Nenhum usuário foi encontrado com o ID fornecido."
            });
        }

        res.status(200).json({
            myMsgSucesso: "Usuário atualizado com sucesso",
            objUpdatedUser: updatedUser
        });
    } catch (err) {
        return res.status(500).json({
            myErrorTitle: "Serve-Side: Erro ao atualizar o usuário",
            myError: err
        });
    }
});

router.post('/signin', async (req, res) => {
    const { email, password } = req.body;
  
    // Verifica se o email foi fornecido
    if (!email || !password) {
      return res.status(400).json({ message: 'Email e senha são obrigatórios.' });
    }
  
    try {
      // Busca o usuário pelo email no banco de dados
      const user = await User.findOne({ email });
  
      // Se o usuário não for encontrado
      if (!user) {
        return res.status(404).json({ message: 'Usuário não encontrado.' });
      }
  
      // Compara a senha fornecida com a senha criptografada no banco de dados
      const isMatch = await password === user.password;
  
      // Se a senha estiver correta
      if (isMatch) {
        // Retorna uma resposta de sucesso, por exemplo, um token JWT ou mensagem de sucesso
        res.status(200).json({ message: 'Login bem-sucedido.', objUserRecuperados: user});
      } else {
        // Se a senha não coincidir
        res.status(400).json({ message: 'Senha inválida.' });
      }
  
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erro no servidor.' });
    }
  });


// BookAnalyst
router.get('/:userId/review', async function (req, res, next) {
    try {
        const userId = req.params.userId;
        const user = await User.findById(userId).populate('bookAnalyst');  // Correção: await adicionado
        if (!user) {
            return res.status(404).json({
                myErrorTitle: "Usuário não encontrado",
                myError: "O ID fornecido não corresponde a nenhum usuário."
            });
        }
        const bookAnalysts = user.bookAnalyst;
        res.status(200).json({
            myMsgSucesso: "Resenhas do usuário recuperadas com sucesso",
            objReviewsRecuperados: bookAnalysts
        });
    } catch (err) {
        return res.status(500).json({
            myErrorTitle: "Serve-Side: Um erro aconteceu ao buscar as resenhas",
            myError: err.message
        });
    }
});

router.get('/:userId/review/:bookAId', async function (req, res, next) {
    try {
        const { userId, bookAId } = req.params;
        
        // Encontra o usuário e popula a lista de 'bookAnalyst'
        const user = await User.findById(userId).populate('bookAnalyst');
        
        if (!user) {
            return res.status(404).json({
                myErrorTitle: "Usuário não encontrado",
                myError: "O ID fornecido não corresponde a nenhum usuário."
            });
        }
        
        // Encontra a resenha específica no array 'bookAnalyst' pelo 'bookAId'
        const bookAnalyst = user.bookAnalyst.find(x => x._id.toString() === bookAId);
        
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


router.post('/:userId/:bookId', async function (req, res, next) {
    try {
        const userId = req.params.userId; 
        const bookId = req.params.bookId;
        const user = await User.findById(userId).populate('bookAnalyst'); 
        const book = await Book.findById(bookId).populate('bookAnalyst'); 
        if (!user) {
            return res.status(404).json({ myErrorTitle: "Usuário não encontrado" });
        }
        if (!book) {
            return res.status(404).json({ myErrorTitle: "Livro não encontrado" });
        }
        
        const { title, content, rating } = req.body;
        const bookAnalyst = new BookAnalyst({
            title,
            content,
            rating,
            autor: user._id
        });
        // Salva o novo `bookAnalyst`
        const bookAnalystSaved = await bookAnalyst.save();

        // Adiciona o `bookAnalyst` ao array do usuário e salva o usuário
        user.bookAnalyst.push(bookAnalystSaved._id);
        await user.save();

        book.bookAnalyst.push(bookAnalystSaved._id);
        await book.save();
        res.status(200).json({
            myMsgSucesso: "Resenha adicionada com sucesso ao usuário",
            objBookAnalyst: bookAnalystSaved
        });
    } catch (err) {
        return res.status(500).json({
            myErrorTitle: "Serve-Side: Um erro aconteceu ao adicionar a resenha",
            myError: err.message
        });
    }
});

router.patch('/:userId/review/:bookAId', async function (req, res, next) {
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

router.delete('/:userId/review/:bookAId', async function (req, res, next) {
    try {
        const { userId, bookAId } = req.params;

        // Busca o usuário e verifica se a resenha pertence a ele
        const user = await User.findById(userId).populate('bookAnalyst');
        if (!user) {
            return res.status(404).json({
                myErrorTitle: "Usuário não encontrado",
                myError: "O ID fornecido não corresponde a nenhum usuário."
            });
        }

        // Remove a resenha da coleção de resenhas do usuário e a exclui
        const bookAnalyst = await BookAnalyst.findOneAndDelete({ _id: bookAId, autor: userId });
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

module.exports = router;
