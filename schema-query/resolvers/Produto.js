module.exports = {
  precoComDesconto(parent){
    if(parent.desconto)
      return parent.preco * 0.9;
  }
}