const { usuarios, proximoId } = require('../../data/db')

function indiceUsuario(filtro){
  if(!filtro) return -1

  const {id, email} = filtro
  if(id){
    return usuarios.findIndex(u => u.id === id)
  }else if(email){
    return usuarios.findIndex(u => u.email === email)
  }

  return -1;
}

module.exports = {
  novoUsuario(_, { dados } ){
    console.log(dados);
    const emailExistente = usuarios.some(u => u.email === dados.email);

    if(emailExistente){
      throw new Error('E-mail já adastrado')
    }

    const novo = {
      id: proximoId(),
      ...dados,
      perfil_id: 1,
      status: 'ATIVO'
    }

    usuarios.push(novo)
    return novo
  },
  excluirUsuario(_,{ filtro }){
    const index = indiceUsuario(filtro)

    //RETORNA NEGATIVO SE NÃO ENCONTRAR
    if( index < 0) return null

    const excluidos = usuarios.splice(index, 1); //PASSA INDEX E QTD PARA EXCLUIR
    
    return excluidos ? excluidos[0] : null;
  },
  alterarUsuario(_, { filtro, dados}){
    const index = indiceUsuario(filtro)

    const usuario = {
      ...usuarios[index],
      ...dados
    }

    const alterado = usuarios.splice(index, 1,usuario); //PASSA INDEX E QTD PARA EXCLUIR e colocar obj novo no lugar
   
    return alterado ? alterado[0] : null
  }
}