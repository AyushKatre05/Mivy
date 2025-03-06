import { ActivityIndicator, View } from "react-native";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/context/Authcontext";
import { useRouter } from "expo-router";
import { onAuthStateChanged } from "firebase/auth";
import axios from "axios";
import { auth } from "@/configs/FirebaseConfig";

export default function Index() {
  const { user, setUser } = useContext(AuthContext);
  const router = useRouter();
  const [loading, setLoading] = useState(true); // Prevent UI flickering

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (userData) => {
      if (userData?.email) {
        const hostUrl = process.env.EXPO_PUBLIC_HOST_URL;
        if (hostUrl) {
          try {
            const result = await axios.get(`${hostUrl}/user?email=${userData.email}`);
            console.log(result?.data);
            setUser(result?.data);
          } catch (error) {
            console.error("Error fetching user data:", error);
          }
        } else {
          console.error("EXPO_PUBLIC_HOST_URL is not defined");
        }
        router.replace("/(tabs)/Home");
      } else {
        router.replace("/landing");
      }
      setLoading(false); // Stop loading after deciding navigation
    });

    return () => unsubscribe(); // Cleanup listener on unmount
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return null; // Prevent rendering before navigation is determined
}
