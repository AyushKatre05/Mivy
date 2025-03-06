import { Stack } from "expo-router";
import {AuthContext} from "@/context/Authcontext"
import { useState } from "react";

export default function RootLayout() {
  const [user, setUser] = useState(null);
  return (
    <AuthContext.Provider value={{ user, setUser }}>
    <Stack screenOptions={{ headerShown: false }}>
    </Stack>
    </AuthContext.Provider>
  )
}
