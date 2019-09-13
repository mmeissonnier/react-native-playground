import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  textDefault: {
    color: '#FFF',
    fontSize: 40,
    fontWeight: 'bold',
  },

  container: {
    display: 'flex',
    width: '100%',
    height: '100%',
    alignItems: 'stretch',
  },

  containerCentered: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  whiteBackground: {
    backgroundColor: 'white',
  },

  inputField: {
    color: '#000',
    fontSize: 30,
    fontWeight: 'bold',
  },

  inputContainer: {
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },

  listItem: {
    display: 'flex',
    width: '100%',
    backgroundColor: 'white',
    paddingHorizontal: 10,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'black',
  },

  listItemText: {
    fontSize: 30,
    fontWeight: '400',
    color: 'black',
  },
});
