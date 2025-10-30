import { useEffect, useState, useCallback } from "react";
import ENV from "../../../config/env";

export type UserData = {
  name: string;
  email: string;
  suscription?: {
    type: string;
    price: string;
    creationDate: string;
    endDate: string;
    ncontracts: number;
    nquestions: number;
  };
  profileImage?: string;
};

export const useProfileData = (userId: string) => {
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUser = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`${ENV.USER_SERVICE}/users/${userId}`);
      if (!res.ok) throw new Error("Error al cargar el perfil");
      const data = await res.json();
      setUser(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return { user, setUser, loading, error, reloadUser: fetchUser };
};
