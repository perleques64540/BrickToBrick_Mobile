import React, { createContext, useContext, useState } from "react";
import { View, StyleSheet, SafeAreaView, StatusBar } from "react-native";
import { Slot } from "expo-router";
import FlashMessage from "react-native-flash-message";
import TabBar from "@/components/TabBar";
import PopUp from "@/components/PopUp";

// Create a context to manage the PopUp state
const PopUpContext = createContext();

export const usePopUp = () => useContext(PopUpContext);

const Layout = () => {
  const [isPopUpVisible, setIsPopUpVisible] = useState(false);
  const [popUpConfig, setPopUpConfig] = useState({
    title: "",
    message: "",
    primaryBtn: { label: "Ok", onPress: () => {} },
    secondaryBtn: { label: "Cancel", onPress: () => {} },
  });

  // Function to show PopUp with specific config
  const showPopUp = (config) => {
    setPopUpConfig(config);
    setIsPopUpVisible(true);
  };

  // Function to hide PopUp
  const hidePopUp = () => {
    setIsPopUpVisible(false);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <PopUpContext.Provider value={{ showPopUp, hidePopUp }}>
        <View style={styles.container}>
          <StatusBar
            barStyle={"dark-content"}
            backgroundColor={"#ffffff"}
          ></StatusBar>
          <Slot />
          <FlashMessage position="top" />
          <TabBar />

          {/* Render PopUp and pass `isVisible` prop */}
          <PopUp
            title={popUpConfig.title}
            message={popUpConfig.message}
            primaryBtn={{
              label: popUpConfig.primaryBtn.label,
              onPress: () => {
                popUpConfig.primaryBtn.onPress();
                hidePopUp(); // Hide PopUp after primary button press
              },
            }}
            secondaryBtn={{
              label: popUpConfig.secondaryBtn.label,
              onPress: () => {
                popUpConfig.secondaryBtn.onPress();
                hidePopUp(); // Hide PopUp after secondary button press
              },
            }}
            isVisible={isPopUpVisible} // Control visibility with this prop
          />
        </View>
      </PopUpContext.Provider>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FAFAFA",
  },
  container: {
    flex: 1,
    backgroundColor: "#FAFAFA",
  },
});

export default Layout;
