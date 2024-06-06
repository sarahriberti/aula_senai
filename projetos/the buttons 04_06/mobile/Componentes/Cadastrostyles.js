import { StyleSheet } from "react-native";

export default Cadastrostyles = StyleSheet.create({
    background: {
      flex: 1,
      backgroundColor: '#34374f',
      alignItems: 'center',
      justifyContent: 'center',
      width:'100%',
    },
    containerlogo:{
        flex:0.5,
        marginBottom:30,
        justifyContent:'center',
    },
    logo:{
        width:400,
        height:150,
    },
    container:{
        flex:1,
        width: '90%',
        backgroundColor:'#546594',
        borderRadius:10,
    },
    inputs:{
        backgroundColor: '#34374f',
        color:'#fff',
        width:"88%",
        marginBottom:20,
        fontSize:18,
        padding:10,
        marginLeft:10,
    },
    btnSubmit: {
      backgroundColor: '#252942',
        justifyContent:'center',
        marginBottom:10,
        alignItems:'center',
        width:'90%',
        height: 45,
        borderRadius:5,
        marginLeft:12
    },
    submitTxt: {
       color:'white',
       fontSize:18,
    },
    Txt:{
        marginLeft:55,
        color:'white',
        marginBottom:12,
        fontSize:18,
    },
    cores:{
        color:'white',
        fontSize:17,
        marginLeft:10,
    },
    facebook:{
        width:60,
        height:60,
        borderRadius:30,
        marginRight:80,
        borderWidth:2,
        borderColor:"#C39910",
        
    },
    google:{
        width:60,
        height:60,
        borderRadius:29,
        paddingLeft:0,
        borderWidth:2,
        borderColor:"#C39910",
    },
    footerlogos:{
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
    },
    scrollViewContent: {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center',
      },

      senhaContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#34374f',
        borderRadius: 5,
        width: '90%',
        marginLeft: 10,
        marginBottom: 20,
        paddingRight: 10, // Espaço para o ícone
      },
      senhaInput: {
        flex: 1,
        color: '#fff',
        fontSize: 18,
        padding: 10,
      },

});