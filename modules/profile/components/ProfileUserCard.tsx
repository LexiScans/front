import React from "react";
import { View, Text, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "../screens/styles";
import type { UserData } from "../hooks/useProfileData";

const ProfileUserCard: React.FC<{ user: UserData | null }> = ({ user }) => (
  <View style={styles.userCard}>
    <View style={styles.userInfo}>
      {user?.profileImage ? (
        <Image
          source={{ uri: user.profileImage }}
          style={styles.profileImage}
        />
      ) : (
        <View style={styles.profileIcon}>
          <Ionicons name="person" size={40} color="#6fa7c7ff" />
        </View>
      )}
      <View style={styles.userDetails}>
        <Text style={styles.userName}>{user?.name}</Text>
        <Text style={styles.userEmail}>{user?.email}</Text>
      </View>
    </View>
  </View>
);

export default ProfileUserCard;
