const { perfis } = require('../data/db')

module.exports = {
  salario(parent){ 
    return parent.salario_real;
  },
  chiclete(parent){
    return 'o que eu quiser'
  },
  perfil(parent){
    const selecionados = perfis.filter(p => p.id === parent.perfil_id)

    return selecionados ? selecionados[0] : null 
  }
}