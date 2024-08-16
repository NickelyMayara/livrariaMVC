/*************** ROTAS DE FUNCIONARIOS ****************/
/** tabela (id, nome, cargo, data_contratacao, salario, email, created_at, updated_at)
 * 1º listar todos os funcionarios
 * 2º cadastrar um funcionario (email é único)
 * 3º Listar um funcionário
 * 4º Atualizar um funcionario (não poder ter o email de outro func.)
 * 5º Deletar um funcionario
 */

import { Router } from "express";
import { getFuncionarios, postFuncionarios, putFuncionarios, deleteFuncionarios, getFuncionariosUnico } from "../controllers/funcionariosController";

const router = Router()

router.get("/funcionarios", getFuncionarios);
router.post("/funcionarios", postFuncionarios);
router.put("/funcionarios/:id", putFuncionarios);
router.delete("/funcionarios/:id", deleteFuncionarios);
router.get("/funcionarios/:id", getFuncionariosUnico);
