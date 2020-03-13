export default UF => {
  switch (UF.toUpperCase()) {
    case 'AC':
      return 'Acre';
    case 'AL':
      return 'Alagoas';
    case 'AM':
      return 'Amazonas';
    case 'AP':
      return 'Amapá';
    case 'BA':
      return 'Bahia';
    case 'CE':
      return 'Ceará';
    case 'DF':
      return 'Distrito Federal';
    case 'ES':
      return 'Espírito Santo';
    case 'GO':
      return 'Goiás';
    case 'MA':
      return 'Maranhão';
    case 'MG':
      return 'Minas Gerais';
    case 'MS':
      return 'Mato Grosso do Sul';
    case 'MT':
      return 'Mato Grosso';
    case 'PA':
      return 'Pará';
    case 'PB':
      return 'Paraíba';
    case 'PE':
      return 'Pernambuco';
    case 'PI':
      return 'Piauí';
    case 'PR':
      return 'Paraná';
    case 'RJ':
      return 'Rio de Janeiro';
    case 'RN':
      return 'Rio Grande do Norte';
    case 'RO':
      return 'Rondônia';
    case 'RR':
      return 'Roraima';
    case 'RS':
      return 'Rio Grande do Sul';
    case 'SC':
      return 'Santa Catarina';
    case 'SE':
      return 'Sergipe';
    case 'SP':
      return 'São Paulo';
    case 'TO':
      return 'Tocantíns';
    default:
      return null;
  }
};
