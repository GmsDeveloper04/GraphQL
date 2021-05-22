const { usuarios, perfis} = require('../data/db')

module.exports = {
  ola(){
    return 'Bom dia!'
  },
  horaAtual(){
    return new Date()
  },
  usuarioLogado(){
    return {
      id : 1,
      nome: 'Guilherme',
      email: 'gmsdev04@icloud.com',
      idade: 23,
      salario_real : 145878.12,
      vip: true
    }
  },
  produtoEmDestaque(){
    return {
      nome: "Sabonete",
      preco: 5.0,
      desconto: true
    }
  },
  numerosMegaSena(){
    return [4, 8, 13, 27, 33, 54]
  },
  usuarios(){
    return usuarios
  },
  usuario(_, { id }){
    const sels = usuarios.filter(u => u.id == id);

    return sels ? sels[0] : null
  },
  perfis(){
    return perfis
  },
  perfil(_,{id}){
    const selecionados = perfis.filter(p => p.id === id)

    return selecionados ? selecionados[0] : null
  }
}