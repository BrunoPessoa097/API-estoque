/**
 * @description Funçao para deixar em maiúscula à primeira letra da palavra.
 * @param {string} palavra - Palavra para ter maiúscula.
 * @returns string
 * @author Bruno Pessoa
 */
const palavraMaiuscula = (palavra:string):string => {
  return palavra.replace(palavra[0],palavra[0].toUpperCase());
};

/**
 * @description Função para deixar tudo maiúsculo.
 * @param {string} - palavra - palavra para ser convertida
 * @return string
 * @author Bruno Pessoa
 */
export const palavraUpper = (palavra: string):string => {
  return palavra.toUpperCase();
};

export default palavraMaiuscula;