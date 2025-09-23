import { Schema, model} from 'mongoose';
// import locais
import produtoDocument from '../../interfaces/produtoInterface';

// schema de produtos.
const produtoSchema:Schema = new Schema<produtoDocument>({
  nome: {type: String, required: true},
  quantidade: {type: Number, required: true},
  preco: {type: Number, required: true},
  id_marca: {type: Schema.Types.ObjectId, ref:"Marca"},
  id_categoria: {type: Schema.Types.ObjectId, ref: "Categoria"}
},{
  timestamps:{
    createdAt: 'criado_em',
    updatedAt: 'atualizado_em'
  }
});

// criando model(collections)
const produtoMongo = model<produtoDocument>('Produto',produtoSchema);

// export 
export default produtoMongo;