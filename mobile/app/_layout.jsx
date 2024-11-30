import React, { createContext, useContext, useState } from "react";
import { View, StyleSheet, SafeAreaView, StatusBar } from "react-native";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import { Slot } from "expo-router";
import FlashMessage from "react-native-flash-message";
import TabBar from "@/components/TabBar";
import PopUp from "@/components/PopUp";

const PopUpContext = createContext();

export const usePopUp = () => useContext(PopUpContext);

const Layout = () => {
  const [isPopUpVisible, setIsPopUpVisible] = useState(false);
  const [popUpConfig, setPopUpConfig] = useState({
    title: "",
    message: "",
    primaryBtn: { label: "Ok", onPress: () => {} },
    //secondaryBtn: { label: "Cancel", onPress: () => {} },
  });

  const showPopUp = (config) => {
    setPopUpConfig(config);
    setIsPopUpVisible(true);
  };

  const hidePopUp = () => {
    setIsPopUpVisible(false);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <PopUpContext.Provider value={{ showPopUp, hidePopUp }}>
        <View style={styles.container}>
          <StatusBar
            translucent={true}
            barStyle={"dark-content"}
            backgroundColor={"#ffffff"}
          ></StatusBar>
          <Slot />
          <FlashMessage position="top" />
          <TabBar />

          <PopUp
            title={popUpConfig.title}
            message={popUpConfig.message}
            primaryBtn={{
              label: popUpConfig.primaryBtn.label,
              onPress: () => {
                popUpConfig.primaryBtn.onPress();
                hidePopUp();
              },
            }}
            secondaryBtn={
              popUpConfig.secondaryBtn && {
                label: popUpConfig.secondaryBtn.label,
                onPress: () => {
                  popUpConfig.secondaryBtn.onPress();
                  hidePopUp();
              },
            }
          }
            isVisible={isPopUpVisible}
          />
        </View>
      </PopUpContext.Provider>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    height: "100%",
    backgroundColor: "#FFFFFF",
  },
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
});

export default Layout;
