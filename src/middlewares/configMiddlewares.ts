/**
 * @description Funçao para deixar em maiúscula à primeira letra da palavra.
 * @param {string} palavra - Palavra para ter maiúscula.
 * @returns string
 * @author Bruno Pessoa
 */
const palavraMauiscula = (palavra:string):string => {
  return palavra.replace(palavra[0],palavra[0].toUpperCase());
};

export default palavraMauiscula;