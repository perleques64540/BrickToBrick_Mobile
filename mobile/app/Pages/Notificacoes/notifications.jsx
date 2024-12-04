import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import NotificationContainer from "../../../components/NotificationContainer";
import { usePopUp } from "../../_layout";
import notificationsData from "../../../data/notifications.json";

const notifications = () => {
  const { showPopUp } = usePopUp();

  const handleShowPopUp = (itemId) => {
    showPopUp({
      title: "Apagar Notificação?",
      message: "Tem a certeza que deseja apagar esta notificação?",
      primaryBtn: {
        label: "Sim",
        onPress: () => handleDeleteItem(itemId),
      },
      secondaryBtn: {
        label: "Não",
        onPress: () => console.log("Cancel button pressed"),
      },
    });
  };

  const [notifications, setNotifications] = useState(notifications);

  useEffect(() => {
    setNotifications(notificationsData);
  }, []);

  const handleDeleteItem = (itemId) => {
    const updatedData = notificationsData.filter((item) => item.id !== itemId);
    setNotifications(updatedData);
    const taskIndex = notificationsData.findIndex((item) => item.id === itemId);
    if (taskIndex !== -1) {
      notificationsData.splice(taskIndex, 1);
    }
  };

  const renderNotificationItem = ({ item }) => (
    <NotificationContainer
      labelTitle={item.title}
      labelText={item.description}
      onPress={() => handleShowPopUp(item.id)}
    />
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Notificações</Text>

      <FlatList
        data={notifications}
        renderItem={renderNotificationItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
      />

      <View style={styles.bottomContainer}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 50,
    flexDirection: "column",
  },
  listContent: {
    paddingBottom: 50,
  },
  bottomContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#e7efef",
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    textAlign: "center",
    paddingBottom: 20,
  },
});

export default notifications;
