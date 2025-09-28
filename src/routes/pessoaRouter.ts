import { Router } from "express";
// imports locais
import pessoaPipAdd from "../pipelines/pessoaPipeline";

// construir rota
const pessoaRouter: Router = Router();

pessoaRouter.route("/pessoa")
  .post(pessoaPipAdd);

// export
export default pessoaRouter;
