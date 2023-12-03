import { DataType } from "sequelize"

declare module "Professor" {
  interface IProfessorAttributes {
    nome: string;
    dataNascimento: DataType.INTEGER;
    CPF: string;
    email: string;
    senha: string;
    imagem: string;
  }

  interface IProfessorCreationAttributes
    extends Omit<IProfessorAttributes, "id", "timestamp"> { }

  interface IProfessorContitionsAttributes
    extends Optional<IProfessorAttributes, "id", "timestamp"> { }

  interface IProfessorLoginCredentials {
    email: string,
    senha: string
  }
}
