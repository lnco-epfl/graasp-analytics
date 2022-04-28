// custom styling used by react-select select components
const styleConstants = {
  border: 'solid 1px #dfe3e9',
  borderRadius: '4px',
  fontSize: '0.8rem',
  textTransform: 'capitalize',
};

const customStyles = {
  menu: () => ({
    width: '250px',
    position: 'absolute',
    zIndex: 999999,
    backgroundColor: 'white',
    ...styleConstants,
  }),
  control: () => ({
    display: 'flex',
    minWidth: '250px',
    maxWidth: '600px',
    backgroundColor: 'white',
    ...styleConstants,
  }),
};

export default customStyles;
