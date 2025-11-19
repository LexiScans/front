import React, { useState, useCallback, useEffect } from "react";
import {
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  View,
} from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { styles } from "./styles";
import { useProfileData } from "../hooks/useProfileData";
import { useSubscriptionActions } from "../hooks/useSubscriptionActions";

import ProfileHeader from "../components/ProfileHeader";
import ProfileUserCard from "../components/ProfileUserCard";
import ProfilePaymentSection from "../components/ProfilePaymentSection";
import ProfilePlanSection from "../components/ProfilePlanSection";
import ProfileSettingsSection from "../components/ProfileSettingsSection";
import BottomNav from "../../../components/BottomNav";

type RootStackParamList = {
  Login: undefined;
  BuySubscription: undefined;
  PaymentMethod: undefined;
  Configuracion: undefined;
  Support: undefined;
};

const ProfileScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [userId, setUserId] = useState<string | null>(null);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [errorModal, setErrorModal] = useState<string | null>(null);

  useEffect(() => {
    const loadUserId = async () => {
      const storedUserId = await AsyncStorage.getItem("userId");
      if (storedUserId) {
        setUserId(storedUserId);
      } else {
        navigation.navigate("Login");
      }
    };
    loadUserId();
  }, [navigation]);

  const { user, setUser, loading, error, reloadUser } = useProfileData(
    userId ?? ""
  );

  const { cancelSubscription } = useSubscriptionActions(
    userId ?? "",
    user,
    setUser,
    setErrorModal
  );

  useFocusEffect(
    useCallback(() => {
      if (userId) reloadUser();
    }, [reloadUser, userId])
  );

  const handleLogout = () => {
    AsyncStorage.clear();
    navigation.navigate("Login");
  };
  const handlePayment = () => navigation.navigate("PaymentMethod");
  const handleBuyPlan = () => navigation.navigate("BuySubscription");
  const handleConfiguracion = () => navigation.navigate("Configuracion");
  const handleSupport = () => navigation.navigate("Support");

  if (!userId || loading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color="#6fa7c7ff" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <ProfileHeader onConfigPress={handleConfiguracion} />
        <ProfileUserCard user={user} />
        <ProfilePlanSection
          user={user}
          onCancel={cancelSubscription}
          onBuy={handleBuyPlan}
          onUpgrade={handleBuyPlan}
        />
        <ProfilePaymentSection onPress={handlePayment} />
        <ProfileSettingsSection
          notificationsEnabled={notificationsEnabled}
          setNotificationsEnabled={setNotificationsEnabled}
          onSupport={handleSupport}
          onLogout={handleLogout}
        />
        <View style={styles.bottomSpacer} />
      </ScrollView>
      <BottomNav onPressCentral={() => {}} />
    </SafeAreaView>
  );
};

export default ProfileScreen;
