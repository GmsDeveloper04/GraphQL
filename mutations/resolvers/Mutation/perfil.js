const { perfis, proximoIdPerfil } = require('../../data/db')
const { perfil } = require('../Query/Usuario')

function indicePerfil(filtro){
  if(!filtro) return -1

  const {id, nome} = filtro
  if(id){
    return perfis.findIndex(u => u.id === id)
  }else if(nome){
    return perfis.findIndex(u => u.nome === nome)
  }

  return -1;
}

module.exports = {
  novoPerfil(_,{ dados }){
   if(perfis.some(p => p.nome === dados.nome))
    throw new Error('Ja existe um perfil com este nome')

    const perfil = { 
      id : proximoIdPerfil(),
      ...dados
    }
    perfis.push (perfil)
    return perfil
  },
  alterarPerfil(_, {filtro, dados}){
    const index = indicePerfil(filtro)

    if(index < 0) return null

    if(perfis.some(p => p.nome === dados.nome))
      throw new Error('Ja existe um perfil com este nome')

    const perfilAtualizado = {
      ...perfis[index],
      ...dados
    }

    perfis.splice(index,1,perfilAtualizado)

    return perfilAtualizado;
  },
  excluirPerfil(_, {filtro} ){
    const index = indicePerfil(filtro)

    if(index < 0) return null

    const excluidos = perfis.splice(index,1)

    return excluidos ? excluidos[0] : null
  }
}