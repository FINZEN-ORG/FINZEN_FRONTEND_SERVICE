import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { GoogleSignin } from "@react-native-google-signin/google-signin";

const AuthContext = createContext<any>(null);

export const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState<any>(null);
  const [jwt, setJwt] = useState<string | null>(null);

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: "436116978721-9ch9qg5j8o62mj6v4aqtqlgccmir8e2g.apps.googleusercontent.com",
      scopes: ["profile", "email", "openid"],
    });

    const loadToken = async () => {
      const token = await AsyncStorage.getItem("jwt");
      if (token) {
        setJwt(token);
        try {
          const response = await axios.get("http://192.168.0.14:8080/api/users/me", {
            headers: { Authorization: `Bearer ${token}` },
          });
          setUser(response.data);
        } catch {
          await AsyncStorage.removeItem("jwt");
        }
      }
    };

    loadToken();
  }, []);

  const handleGoogleLogin = async () => {
    await GoogleSignin.hasPlayServices();
    const userInfo = await GoogleSignin.signIn();
    const idToken = userInfo.data?.idToken;
    if (!idToken) return;

    const response = await axios.post("http://192.168.0.14:8080/api/auth/google", { idToken });
    const token = response.data.accessToken;
    setJwt(token);
    await AsyncStorage.setItem("jwt", token);

    const meResponse = await axios.get("http://192.168.0.14:8080/api/users/me", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setUser(meResponse.data);
  };

  return (
    <AuthContext.Provider value={{ user, jwt, handleGoogleLogin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);