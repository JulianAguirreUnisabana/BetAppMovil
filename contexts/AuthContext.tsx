import { createContext, useState } from "react";
import { supabase } from "../utils/supabase";

interface AuthContextProps {
  user: any | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  register: (
    email: string,
    password: string,
    names: string
  ) => Promise<boolean>;
  updateProfile: (profileData: {
    name?: string;
    username?: string;
    bio?: string;
    phone?: string;
    gender?: string;
  }) => Promise<boolean>;
}

export const AuthContext = createContext({} as AuthContextProps);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState(null as any);
  const [isLoading, setIsLoading] = useState(false);

  // Función para iniciar sesión
  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error("Login error:", error.message);
        return false;
      }

      if (data.user) {
        const { data: profileData, error: profileError } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", data.user.id)
          .maybeSingle();

        if (profileError) {
          console.error("Profile fetch error:", profileError.message);
        }

        if (!profileData) {
          console.warn("No se encontró un perfil para este usuario.");
          setUser({
            id: data.user.id,
            email: data.user.email!,
            name:
              data.user.user_metadata?.name || data.user.email!.split("@")[0],
          });
        } else {
          setUser(profileData);
        }

        return true;
      }

      return false;
    } catch (error) {
      console.error("Login error:", error);
      return false;
    }
  };

  // Función para cerrar sesión
  const logout = async (): Promise<void> => {
    setIsLoading(true);
    const { error } = await supabase.auth.signOut();
    setIsLoading(false);

    if (error) {
      console.error("Error al cerrar sesión:", error.message);
      return;
    }

    setUser(null);
  };

  // Función para registrar un nuevo usuario
  const register = async (
    email: string,
    password: string,
    names: string
  ): Promise<boolean> => {
    try {
      // Validar que los campos no estén vacíos
      if (!email || !password || !names) {
        console.error("Todos los campos son obligatorios.");
        return false;
      }

      // Intentar registrar al usuario en auth.users
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        console.error("Registration error:", error.message);
        return false;
      }

      // Verificar si el usuario fue creado correctamente
      if (data.user) {
        // Intentar insertar el perfil en la tabla profiles
        const { error: profileError } = await supabase.from("profiles").insert({
          id: data.user.id,
          email: email,
          name: names,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        });

        if (profileError) {
          console.error("Profile creation error:", profileError.message);
          return false;
        }

        // Actualizar el estado del usuario
        setUser({
          id: data.user.id,
          email: data.user.email!,
          name: names,
        });

        return true;
      }

      console.error("No se pudo crear el usuario en auth.users.");
      return false;
    } catch (error) {
      console.error("Unexpected registration error:", error);
      return false;
    }
  };

  // Función para actualizar el perfil
  const updateProfile = async (profileData: {
    name?: string;
    username?: string;
    bio?: string;
    phone?: string;
    gender?: string;
  }): Promise<boolean> => {
    try {
      if (!user) {
        console.error("No hay un usuario autenticado.");
        return false;
      }

      const { error } = await supabase
        .from("profiles")
        .update({
          ...profileData,
          updated_at: new Date().toISOString(),
        })
        .eq("id", user.id);

      if (error) {
        console.error("Error al actualizar el perfil:", error.message);
        return false;
      }

      // Actualizar el estado del usuario con los nuevos datos
      setUser((prevUser: any) => ({
        ...prevUser,
        ...profileData,
      }));

      return true;
    } catch (error) {
      console.error("Error inesperado al actualizar el perfil:", error);
      return false;
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, isLoading, login, logout, register, updateProfile }}
    >
      {children}
    </AuthContext.Provider>
  );
};
