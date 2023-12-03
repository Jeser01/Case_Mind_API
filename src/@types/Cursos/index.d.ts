import { DataType } from "sequelize"

declare module "Cursos" {
  interface ICursosAttributes {
    nome: string;
    professor: DataType.INTEGER;
    categoria: string;
    descricao: string;
    imagem: string;
  }

  interface ICursosCreationAttributes
    extends Omit<ICursosAttributes, "id", "timestamp"> { }

  interface ICursosContitionsAttributes
    extends Optional<ICursosAttributes, "id", "timestamp"> { }
}
