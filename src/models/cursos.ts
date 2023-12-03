import { ICursosAttributes } from "Cursos";
import { Pool, PoolClient } from 'pg';
import configs from "../configs";

export async function createCourse(data: ICursosAttributes) {
    const { nome, professor, descricao, categoria, imagem } = data

    if (!nome || !professor || !descricao || !categoria) {
        console.log("Os parametros precisam ser preenchidos.")
        return {
            Error: {
                code: 400,
                message: "All parameters should be filled!"
            }
        }
    }

    const client = await OpenConnection();
    const consultaSQL = `INSERT INTO Cursos (nome, professor, descricao, categoria, imagem)
    VALUES (${nome}, ${professor}, ${descricao}, ${categoria}, ${imagem})
    RETURNING *;`;

    const result = await client.query(consultaSQL);

    if (result?.rows) {

        if (client) {
            await CloseConnection(client);
        }
        return {
            Data: result
        }

    }

    if (client) {
        await CloseConnection(client);
    }

    return {
        Error: {
            code: 404,
            message: "Nenhum Curso Encontrado"
        }
    }
}

export async function getCoursesByProfessorId(id: string) {
    if (!id) {
        console.log("Os parametros precisam ser preenchidos.")
        return {
            Error: {
                code: 400,
                message: "The ID parameter should be filled!"
            }
        }
    }

    const client = await OpenConnection();
    const consultaSQL = `SELECT * FROM Cursos WHERE professor = ${id};`;

    try {
        const result = await client.query(consultaSQL);
        const cursos = result.rows;
        if (cursos.length > 0) {
            return {
                Error: {},
                Data: cursos
            }
        } else {
            if (client) {
                await CloseConnection(client);
            }
            return {
                Error: {
                    code: 404,
                    message: "Nenhum Curso Encontrado"
                }
            }
        }
    } catch (error) {
        console.log(`[Cursos-getCoursesByProfessorId]: ${error}`)
        return {
            Error: {
                code: 500,
                message: "Houve um problema ao concluir sua operação. Tente mais tarde!"
            },
            Data: {}
        }
    }
}


export async function deleteCourseByProfessorId(id: string) {
    if (!id) {
        console.log("Os parametros precisam ser preenchidos.")
        return {
            Error: {
                code: 400,
                message: "The ID parameter should be filled!"
            }
        }
    }

    const client = await OpenConnection();
    const consultaSQL = `DELETE FROM Cursos WHERE professor = ${id};`;

    try {
        const result = await client.query(consultaSQL);
        const deletedCurso = result.rows;
        if (deletedCurso.length > 0) {
            return {
                Data: deletedCurso
            }
        } else {
            if (client) {
                await CloseConnection(client);
            }
            return {
                Error: {
                    code: 404,
                    message: "Nenhum Curso Encontrado"
                }
            }
        }
    } catch (error) {
        console.log(`[Cursos-deleteCourseByProfessorId]: ${error}`)
        return {
            Error: {
                code: 500,
                message: "Houve um problema ao concluir sua operação. Tente mais tarde!"
            }
        }
    }
}

async function OpenConnection(): Promise<PoolClient> {
    const pool = new Pool({
        user: configs.database.USER,
        host: configs.database.HOST,
        database: configs.database.DATABASE,
        password: configs.database.PASSWORD,
        port: configs.database.PORT
    });
    try {
        const client = await pool.connect();
        console.log('Connected to the database');
        return client;
    } catch (error) {
        console.error('Error connecting to the database:', error);
        throw error;
    }
}

async function CloseConnection(client: PoolClient): Promise<void> {
    try {
        await client.release();
        console.log('Disconnected from the database');
    } catch (error) {
        console.error('Error disconnecting from the database:', error);
        throw error;
    }
}