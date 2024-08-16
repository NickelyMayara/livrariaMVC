import { v4 as uuidv4 } from "uuid";
import conn from "../config/conn";

export const getFuncionarios = (request, response) => {
    //request, não existe
    const sql = /*sql*/ `SELECT * FROM funcionarios`;
    conn.query(sql, (err, data) => {
        if (err) {
            console.error(err);
            response.status(500).json({ err: "Erro ao listar funcionarios" });
            return;
        }
        const funcionarios = data;
        response.status(200).json(funcionarios);
    });
}
export const postFuncionarios = (request, response) => {
    const { nome, email, cargo, data_contratacao, salario } = request.body;

    if (!nome) {
        return response.status(400).json({ message: "O nome é obrigatório" });
    }
    if (!email) {
        return response.status(400).json({ message: "O Email é obrigatório" });
    }
    if (!cargo) {
        return response.status(400).json({ message: "O Cargo é obrigatório" });
    }
    if (!data_contratacao) {
        return response
            .status(400)
            .json({ message: "A data de contratação é obrigatório" });
    }
    if (!salario) {
        return response.status(400).json({ message: "O salário é obrigatório" });
    }

    if (!email.includes("@")) {
        return response.status(400).json({ message: "Email faltando @" });
    }
    //1- não existe funcionario com emails iguais
    const sql = /*sql*/ `SELECT * FROM funcionarios WHERE email = "${email}"`;
    conn.query(sql, (err, data) => {
        if (err) {
            console.error(err);
            response.status(500).json({ err: "Erro ao castrar funcionarios" });
            return;
        }
        if (data.length > 0) {
            response.status(409).json({ err: "E-mail já está em uso" });
            return;
        }

        const id = uuidv4();
        const insertSql = /*sql*/ `INSERT INTO funcionarios
      (funcionario_id, nome, email, cargo, data_contratacao, salario)
      VALUES
      ("${id}","${nome}", "${email}", "${cargo}", 
      "${data_contratacao}", "${salario}")
      `;
        conn.query(insertSql, (err) => {
            if (err) {
                console.error(err);
                response.status(500).json({ err: "Erro ao castrar funcionarios" });
                return;
            }
            response.status(201).json({ mesaage: "Usuário cadastrado" });
        });
    });
}
export const putFuncionarios = (request, response) => {
    const { id } = request.params;
    const { nome, email, cargo, data_contratacao, salario } = request.body;

    if (!nome) {
        return response.status(400).json({ message: "O nome é obrigatório" });
    }
    if (!email) {
        return response.status(400).json({ message: "O Email é obrigatório" });
    }
    if (!cargo) {
        return response.status(400).json({ message: "O Cargo é obrigatório" });
    }
    if (!data_contratacao) {
        return response
            .status(400)
            .json({ message: "A data de contratação é obrigatório" });
    }
    if (!salario) {
        return response.status(400).json({ message: "O salário é obrigatório" });
    }

    if (!email.includes("@")) {
        return response.status(400).json({ message: "Email faltando @" });
    }

    //1º verificar se funcionario existe
    const checkSql = /*sql*/ `SELECT * FROM funcionarios WHERE funcionario_id = "${id}"`;
    conn.query(checkSql, (err, data) => {
        if (err) {
            console.error(err);
            response.status(500).json({ err: "Erro ao procurar funcionarios" });
            return;
        }

        if (data.length === 0) {
            response.status(404).json({ err: "funcionario não encontrado" });
            return;
        }

        //2º - Se o email está disponível
        const checkEmailSql = /*sql*/ `SELECT * FROM funcionarios WHERE email = "${email}" AND funcionario_id != "${id}"`;
        conn.query(checkEmailSql, (err, data) => {
            if (err) {
                console.error(err);
                response.status(500).json({ err: "Erro ao procurar funcionarios" });
                return;
            }

            if (data.length > 0) {
                response.status(409).json({ err: "Email já existe" });
                return;
            }

        //3º Atualizar o email
        const updateSql = /*sql*/ ` UPDATE funcionarios SET nome = "${nome}", email = "${email}", cargo = "${cargo}", data_contratacao = "${data_contratacao}", salario = "${salario}" WHERE funcionario_id = "${id}"`;
            conn.query(updateSql, (err) => {
                if (err) {
                    console.error(err);
                    response.status(500).json({ err: "Erro ao atualizar funcionarios" });
                    return;
                }
                response.status(200).json({ message: "Funcionário atualizado" });
            });
        });
    });
}
export const deleteFuncionarios = (request, response) => {
    const { id } = request.params;
    const sql = /*sql*/ `DELETE FROM funcionarios WHERE funcionario_id = "${id}"`;
    conn.query(sql, (err, info) => {
        if (err) {
            console.error(err);
            response.status(500).json({ err: "Erro ao deletar funcionarios" });
            return;
        }
        if (info.affectedRows) {
            response.status(404).json({ err: "Funcinário não encontrado" });
            return;
        }
        response.status(200).json({ message: "Funcionario Deletado" })
    });
}
export const getFuncionariosUnico = (request, response) => {
    const { id } = request.params;
    const sql = /*sql*/ `SELECT * FROM funcionario WHERE funcionario_id = "${id}"`;
    conn.query(sql, (err, data) => {
        if (err) {
            console.error(err);
            response.status(500).json({ err: "Erro ao selecionar funcionarios" });
            return;
        }

        const funcionario = data[0]
        response.status(200).json(funcionario);
    });
}