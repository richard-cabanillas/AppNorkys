import { View, Text,FlatList} from 'react-native';
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import {ListItem} from "react-native-elements";
import {map} from "lodash";
import {Modal }from "../../components/Shared";
import {ChangeDisplayNameForm} from "./ChangeDisplayNameForm";
import {ChangeEmailForm} from "./ChangeEmailForm";
import {ChangePasswordForm} from "./ChangePasswordForm";
import {screen} from "../../utils"
//



export function AccountOptions(props) {

  const {onReload, navigation}= props;

  const [showModal, setShowModal] = useState(false);
  const [renderComponent, setRenderComponent] = useState(null);

  const onCloseOpenModal = () => setShowModal((prevState) => !prevState);

  const selectedComponent = (key) => {
    if (key === "displayName") {
      setRenderComponent(<ChangeDisplayNameForm onClose={onCloseOpenModal} onReload={onReload}/>);
      onCloseOpenModal();
    }
    if (key === "Email") {
      setRenderComponent(<ChangeEmailForm onClose={onCloseOpenModal} onReload={onReload}/>);
      onCloseOpenModal();
    }
    if (key === "password") {
      setRenderComponent(<ChangePasswordForm onClose={onCloseOpenModal} />);
      onCloseOpenModal();
    }
    if(key ==="historial"){
        navigation.navigate(screen.account.history)
    }
    
  };

  const menuOptions = getMenuOptions(selectedComponent);

  return (
    <View>
      <FlatList
        data={menuOptions}
        keyExtractor={(item) => item.title}
        renderItem={({ item }) => (
          <ListItem bottomDivider onPress={item.onPress}>
            <Ionicons
              name={item.iconNameLeft}
              color={item.iconColorLeft}
              size={30}
              style={{ marginRight: 10 }}
            />
            <ListItem.Content>
              <ListItem.Title style={{ fontSize: 16, fontWeight: "500" }}>
                {item.title}
              </ListItem.Title>
            </ListItem.Content>
            <Ionicons
              name={item.iconNameRight}
              color={item.iconColorRight}
              size={24}
            />
          </ListItem>
        )}
      />

      <Modal show={showModal} close={onCloseOpenModal}>
        {renderComponent}
      </Modal>
    </View>
  );
}

function getMenuOptions(selectedComponent) {
  return [
    {
      title: "Cambiar Nombre y Apellidos",
      iconNameLeft: "person-circle-outline",
      iconColorLeft: "#ec7f26ff",
      iconNameRight: "chevron-forward-outline",
      iconColorRight: "#ccc",
      onPress: () => selectedComponent("displayName"),
    },
    {
      title: "Cambiar Email",
      iconNameLeft: "at-outline",
      iconColorLeft: "#ec7f26ff",
      iconNameRight: "chevron-forward-outline",
      iconColorRight: "#ccc",
      onPress: () => selectedComponent("Email"),
    },
    {
      title: "Cambiar Contraseña",
      iconNameLeft: "lock-closed-outline",
      iconColorLeft: "#ec7f26ff",
      iconNameRight: "chevron-forward-outline",
      iconColorRight: "#ccc",
      onPress: () => selectedComponent("password"),
    },
    
    {
      title: "Historial de compras",
      iconNameLeft: "receipt-outline",
      iconColorLeft: "#ec7f26",
      iconNameRight: "chevron-forward-outline",
      iconColorRight: "#ccc",
      onPress:() => selectedComponent("historial"),
    }

  ];
}