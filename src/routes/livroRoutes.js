import { Router } from "express";

import { getLivros, postLivros, getLivrosUnico, putLivros, deleteLivros} from "../controllers/livrosController";

const router = Router()

router.get("/livros", getLivros );
router.post("/livros", postLivros);
router.get("/livros/:id", getLivrosUnico); //listar 1
router.put("/livros/:id", putLivros ); //atualizar
router.delete("/livros/:id", deleteLivros); //Delete