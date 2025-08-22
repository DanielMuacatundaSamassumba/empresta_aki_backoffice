 export const formatarPrecoParaExibicao = (valor:any) => {
    valor = valor.replace(/[^0-9.,]/g, '');
    if (valor.indexOf(',') > valor.indexOf('.')) {
      valor = valor.replace('.', '').replace(',', '.');
    } else {
      valor = valor.replace(',', '');
    }
    const valorNumerico = parseFloat(valor);
    if (isNaN(valorNumerico)) {
      return 'Valor inválido';
    }
    const partes = valorNumerico.toFixed(2).split('.');
    let parteInteira = partes[0];
    const parteDecimal = partes[1];
    parteInteira = parteInteira.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    return `${parteInteira},${parteDecimal} kz`;
  };

 export const formatarPrecoParaArmazenamento = (valor:any) => {
    valor = valor.replace(/[^0-9.,]/g, '');
    if (valor.indexOf(',') > valor.indexOf('.')) {
      valor = valor.replace('.', '').replace(',', '.');
    } else {
      valor = valor.replace(',', '');
    }
    const valorNumerico = parseFloat(valor);
    if (isNaN(valorNumerico)) {
      return null;
    }
    return valorNumerico.toFixed(2);
  };