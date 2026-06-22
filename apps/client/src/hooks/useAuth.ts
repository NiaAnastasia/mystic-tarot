import { useEffect } from "react";
import { authApi } from "../api/auth";
import { useAuthStore } from "../store/authStore";

export const useAuth = () => {
  const { user, isLoading, setUser, setLoading } = useAuthStore();

  useEffect(() => {
    authApi
      .me()
      .then((data) => setUser(data.user))
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const login = async (email: string, password: string) => {
    const data = await authApi.login(email, password);
    setUser(data.user);
    return data;
  };

  const register = async (email: string, password: string, name: string) => {
    const data = await authApi.register(email, password, name);
    setUser(data.user);
    return data;
  };

  const logout = async () => {
    await authApi.logout();
    setUser(null);
  };

  return { user, isLoading, login, register, logout };
};
