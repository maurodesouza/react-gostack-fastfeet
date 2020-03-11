export const options = [
  {
    value: '',
    label: 'Todas',
  },
  {
    value: 'pendente',
    label: 'Pendentes',
  },
  {
    value: 'retirada',
    label: 'Retiradas',
  },
  {
    value: 'entregue',
    label: 'Entregues',
  },
  {
    value: 'cancelada',
    label: 'Canceladas',
  },
  {
    value: 'problemas',
    label: 'Com problemas',
  },
];

export const customStyles = {
  control: provided => ({
    ...provided,
    height: '100%',
    boxShadow: 0,
    background: '#fff',
    width: '235px',
    border: '1px solid #ddd',
    borderRadius: '5px',

    ':hover': {
      border: '1px solid #ddd',
    },
  }),
  placeholder: provider => ({
    ...provider,
    color: '#999',
  }),
  dropdownIndicator: provider => ({
    ...provider,
    color: '#999',

    ':hover': {
      opacity: 0.6,
    },
  }),
  singleValue: provider => ({
    ...provider,
    color: '#999',
  }),
  menuList: provider => ({
    ...provider,
    width: '100%',
    flexDirection: 'column',
  }),
  option: (provider, { isSelected }) => ({
    ...provider,
    background: isSelected ? '#7D40E7' : '#fff',
    color: isSelected ? '#fff' : '#999',

    ':hover': {
      background: isSelected ? '' : '#7D40E799',
      color: '#fff',
    },
  }),
};
