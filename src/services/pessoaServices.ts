import pessoaInput from '../interfaces/pessoaInterface';

const pessoaServiceAdd = (dados:pessoaInput) => {
  if(!!dados && Object.keys(dados).length > 0){
    return dados;
  }
  else{
    throw new Error('Sem informações repassadas');
  }
}

export default pessoaServiceAdd;