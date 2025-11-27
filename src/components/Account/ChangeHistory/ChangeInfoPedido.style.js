import {StyleSheet} from "react-native";

export const styles = StyleSheet.create({

    listCard:{
        flex: 1, 
        backgroundColor: "#f7f7f7"
    },
    card:{
        backgroundColor: "#fff",
        padding: 15,
        borderRadius: 14,
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 15,
        gap: 15,
        borderWidth: 1,
        borderColor: "#eee",
        elevation: 2,
    },
    colorText:{
        marginTop: 6,
        fontSize: 17,
        fontWeight: "700",
        color: "#ec7f26",
    },
    titleCard:{
        fontSize: 18, 
        fontWeight: "700"
    },
    cardImage:{
        width: 70, 
        height: 70, 
        borderRadius: 10
    },
    cantidadCard:{
        color: "#666", 
        marginTop: 4
    },
    seccionMonto:{
        position: "absolute",
        bottom: 0,
        width: "100%",
        backgroundColor: "#fff",
        paddingVertical: 20,
        borderTopWidth: 1,
        borderColor: "#eee",
    },
    vistaInfo:{
        paddingHorizontal: 20, 
        marginBottom: 15
    },
    infoText:{
        fontSize: 16, 
        fontWeight: "700", 
        marginBottom: 4
    },

    vistaDivisor:{
        height: 1,
        backgroundColor: "#ddd",
        marginBottom: 15,
        marginHorizontal: 20,
    },
    vistaTotal:{
        paddingHorizontal: 20,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 10,
    },
    textTotalVista:{
        fontSize: 22, 
        fontWeight: "700" 
    },
    btnRegresar:{
        backgroundColor: "black",
        paddingVertical: 16,
        borderRadius: 30,
        alignItems: "center",
    },
    textbtn:{
        color: "white", 
        fontSize: 18, 
        fontWeight: "700"
    },
});
