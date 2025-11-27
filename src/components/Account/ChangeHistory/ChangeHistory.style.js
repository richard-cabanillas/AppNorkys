import{StyleSheet} from "react-native";

export const styles = StyleSheet.create({
    reload:{
        flex: 1, 
        justifyContent: "center", 
        alignItems: "center" 
    },

    cardInfoPedido:{
        backgroundColor: "#fff",
        padding: 15,
        borderRadius: 12,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: "#ddd",
        elevation: 3,
        shadowColor: "#000",
        shadowOpacity: 0.2,
        shadowRadius: 4,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    textPedido:{
        fontSize: 18, 
        fontWeight: "700", 
        color: "#333"
    },
    textTotal:{
        fontSize: 18, 
        fontWeight: "700", 
        color: "#ec7f26"
    }
    
});