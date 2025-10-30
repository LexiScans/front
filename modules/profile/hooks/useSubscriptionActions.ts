import ENV from "../../../config/env";
import type { UserData } from "./useProfileData";

export const useSubscriptionActions = (
  userId: string,
  user: UserData | null,
  setUser: (u: UserData | null) => void,
  setErrorModal: (msg: string) => void
) => {
  const cancelSubscription = async () => {
    try {
      const response = await fetch(
        `${ENV.USER_SERVICE}/suscriptions/cancel/${userId}`,
        { method: "DELETE" }
      );
      if (!response.ok) throw new Error("Error al cancelar suscripción");
      setUser({ ...user!, suscription: undefined });
    } catch (err: any) {
      setErrorModal(err.message);
    }
  };

  return { cancelSubscription };
};
