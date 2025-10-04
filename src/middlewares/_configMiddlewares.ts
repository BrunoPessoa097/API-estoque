import bcrypt from 'bcrypt';

/**
 * @description Funçao para deixar em maiúscula à primeira letra da palavra.
 * @function palavraMaiuscula
 * @param {string} palavra - Palavra para ter maiúscula.
 * @returns string
 * @author Bruno Pessoa
 */
const palavraMaiuscula = (palavra:string):string => {
  return palavra.replace(palavra[0],palavra[0].toUpperCase());
};

/**
 * @description Função para deixar tudo maiúsculo.
 * @function palavraUpper
 * @param {string} - palavra - palavra para ser convertida
 * @return string
 * @author Bruno Pessoa
 */
export const palavraUpper = (palavra: string):string => {
  return palavra.toUpperCase();
};
/**
 * @descriprion Converter para duas casas decimal
 * @function numDecimal
 * @param {number} - numero - número para ter casa decimal
 * @return float
 * @author Bruno Pessoa
 */
export const numDecimal = (numero:number):number => {
  return Number(numero.toFixed(2));
}

/**
 * @descriprion fazer um hash para senha
 * @function hashSenha
 * @param {string} - senha - número para ser criptografado
 * @return string
 * @author Bruno Pessoa
 */
export const hashSenha = async(senha: string): Promise<string> => {
  // recebendo os valores padrão
  const vz: number = parseInt(`${process.env.HASH || 10}`);
  // encriptando
  const hash: string = await bcrypt.hash(senha, vz);
  // retorno criptografado
  return hash;
}

// export 
export default palavraMaiuscula;