import marcaInput, { marcaDocument } from '../interfaces/marcaInterface';
import marcaMongo from '../schemas/mongoose/marcaSchema';
import produtoMongo from '../schemas/mongoose/produtoSchema';

/** 
 * @description Adicionar marca
 * @async
 * @function addProd
 * @returns {Promise<marcaDocument>} Retorna uma Promise que retorna marca.
 * @throws {Error} Lança um erro se não houver informações cadastradas.
 * @author Bruno Pessoa
 */
export const addProd = async(dados: marcaInput): Promise<marcaDocument> => {
  // criando um objeto de banco tipado
  const dado: marcaDocument = new marcaMongo({
    ...dados
  });

  // salvando no banco
  const saida: marcaDocument = await dado.save();

  // retorno do registro
  return saida;
}

/** 
 * @description Lista todas as marcas cadastradas no banco de dados.
 * @async
 * @function listMarca
 * @returns {Promise<marcaDocument[]>} Retorna uma Promise que resolve com um array de documentos de marca.
 * @throws {Error} Lança um erro se não houver informações cadastradas.
 * @author Bruno Pessoa
 */
export const listMarca = async(): Promise<marcaDocument[]> => {
  // buscando todas as marcas
  const dados: marcaDocument[] = await marcaMongo.find();

  // ha ou não informaçãos
  if(dados.length <0) {throw new Error('Não há informações')}
  else {return dados}
}

/**
 * @description Mostrar única informação.
 * @async
 * @function idMarca
 * @returns {Promise<marcaDocument | string> } Retorna uma Promise que resolve com um array de documentos de marca ou uma string.
 * @throws {Error} Lança um erro se não houver informações encontrada.
 * @author Bruno Pessoa
 */
export const idMarca = async(id: string): Promise<marcaDocument | string> => {
  // buscando informações.
  const dado: marcaDocument | null = await marcaMongo.findById(id);

  // saidas
  if(!dado) { throw new Error('Informação não encontrada')}
  return dado;
}

/**
 * @description Atualizar informação
 * @async
 * @function updateMarca
 * @returns {Promise<marcaDocument> } Retorna uma Promise que resolve com um documento marca.
 * @throws {Error} Lança um erro se não houver informações encontrada.
 * @author Bruno Pessoa
 */
export const updateMarca = async(id: string, dado: Partial<marcaDocument>): Promise<marcaDocument> => {
  // recebendo documento
  const nome = dado.nome;

  // verificando a existencia do nome
  if(nome){
    const verif = await existNome(nome);
    // caso nome exist
    if(verif) {throw new Error('Nome já existe')}
  }

  // atualizando informações
  const update: marcaDocument | null = await marcaMongo.findByIdAndUpdate(id,dado,{new: true});

  // saidas
  if(!update){ throw new Error('Não existe marca para atualizar')}
  else{ return update}
}

/**
 * @description Deletar marca
 * @async
 * @function deleteMarca
 * @returns {Promise<marcaDocument> } Retorna uma Promise que resolve com um documento marca.
 * @throws {Error} Lança um erro se não houver informações encontrada.
 * @author Bruno Pessoa
 */
export const deleteMarca = async(id: string): Promise<marcaDocument> => {
  // verificando se existe marca vinculado ao produto
  const vincu: boolean = await vinculoMarcaProd(id);

  // retorno se existir vinculo de marca ao produto
  if(vincu) { throw new Error('Não pode excluir marca que esta vinculado ao produto')}
  // deleta senão houver vinculo
  else{
    const marcaDel: marcaDocument | null = await marcaMongo.findByIdAndDelete(id);

    // saidas
    if(!marcaDel){ throw new Error('Error ao excluir')}
    else {return marcaDel}
  }
}

/**
 * @description Verificar se ja existe nome
 * @async
 * @function existNome
 * @returns {Promise<boolean> } Retorna uma Promise de verdadeiro ou falso.
 * @author Bruno Pessoa
 */
export const  existNome = async(nome: string): Promise<boolean> => {
  return !!(await marcaMongo.exists({nome}));
}

/**
 * @description Verificar se marca tem vinculo ao produto
 * @async
 * @function vinculoMarcaProd
 * @returns {Promise<boolean> } Retorna uma Promise de verdadeiro ou falso.
 * @author Bruno Pessoa
 */
export const vinculoMarcaProd = async(id_marca: string): Promise<boolean> => {
  return !!(await produtoMongo.exists({id_marca}));
}

/** 
 * @description Verificar se ja existe CNPJ
 * @async
 * @function existNome
 * @returns {Promise<boolean> } Retorna uma Promise de verdadeiro ou falso.
 * @author Bruno Pessoa
 */
export const existCnpj = async(cnpj: string): Promise<boolean> => {
  return !!(await marcaMongo.exists({cnpj}));
}

/** 
 * @description Verificar se ja existe Nome e CNPJ
 * @async
 * @function existNome
 * @returns {Promise<boolean> } Retorna uma Promise de verdadeiro ou falso.
 * @author Bruno Pessoa
 */
export const existNomeCnpj = async(nome?: string, cnpj?: string): Promise<boolean> => {
  // verificando se existe nome
  if(nome){
    // buscando nome se ja existe
    const verNome= await existNome(nome);
    // se existe
    if(verNome) { throw new Error('Nome já existem')}
  }

  // verificando se cnpj foi enviado
  if(cnpj){
    // validando cnpj
    const verCnpj= await existCnpj(cnpj);
    // caso cnpj existe
    if(verCnpj) { throw new Error('CNPJ já existem')}
  }

  // se nome e cnpj não existe
  return false;
} 

/** 
 * @description Verificar se existe marca
 * @async
 * @function marcaExist
 * @returns {Promise<boolean> } Retorna uma Promise de verdadeiro ou falso.
 * @author Bruno Pessoa
 */
export const marcaExist = async(id: string): Promise<boolean> => {
  // verificando se marca exist.
  const existM: boolean = !!(await marcaMongo.exists({_id: id}));

  // não existe
  if(!existM) { throw new Error('Marca não exite')}
  return true;
}