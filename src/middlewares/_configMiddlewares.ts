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
/**
 * @descriprion Converter para duas casas decimal
 * @param {number} - numero - número para ter casa decimal
 * @return float
 * @author Bruno Pessoa
 */
export const numDecimal = (numero:number):number => {
  return Number(numero.toFixed(2));
}

export default palavraMaiuscula;