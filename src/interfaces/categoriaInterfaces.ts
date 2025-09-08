interface Categoria {
  nome: string,
  descricao: string,
  data?:{
    createAt?: date,
    updateAt?: date
  }
}

export default Categoria;