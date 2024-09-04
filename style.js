import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    elevation:9,
    flex: 1,
    marginVertical:90,
    marginHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f7f3',
    borderRadius:12,
    paddingBottom: 100
  },
  input: {
    width: '100%',
    height: 50,
    padding: 10,
    marginLeft: 10
  },
  buttonLogin: {
    width: '50%',
    height: 50,
    backgroundColor: '#34C759',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 18,
    marginTop:15,
    elevation: 20,
    
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight:"800",
    fontSize: 18,
    fontStyle:"italic",
    
  },
  icon: {
    left: 10,
    top: 15,
  },
  inputContainer: {
    width: '80%',
    flexDirection: "row",
    marginBottom: 20,
    borderColor: '#DDDDDD',
    borderWidth: 1,
    borderRadius: 12,
  },
  link: {
    color: '#34C759',
    marginTop: 30,
  },
  image: {
    width: 200,
    height: 170,
    marginBottom:0,
    borderRadius: 100   
  },
  nameApp:{
    fontSize:39,
    fontWeight:"800",
    fontStyle:"italic",
    color:"#34C759",
    textAlign: "center",
    marginVertical:15
  }, centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: '#34C759',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  radioLabel: {
    fontSize: 16,
    color: '#333',
    marginRight: 10,
  },
  radioGroup: {
    flexDirection: 'row',
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  radioButtonSelected: {
    backgroundColor: '#34C759',
    borderRadius: 50,
    padding: 5,
    marginRight: 5,
  },
  radioButtonUnselected: {
    borderColor: '#34C759',
    borderWidth: 2,
    borderRadius: 50,
    padding: 5,
    marginRight: 5,
  },
  radioText: {
    fontSize: 16,
    color: '#333',
  },
  circleImageContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#34C759',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  circleImage: {
    width: '100%',
    height: '100%',
    borderRadius: 50,
  },
  circleImagePlaceholder: {
    color: '#34C759',
    fontSize: 14,
  }
});

export default styles;
