interface Categoria {
  nome: string,
  descricao: string,
  data?:{
    createAt?: Date,
    updateAt?: Date
  }
}

export default Categoria;