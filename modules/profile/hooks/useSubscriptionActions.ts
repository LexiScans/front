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

      if (!response.ok) {
        const text = await response.text().catch(() => null);

        let errorMessage = "Error al cancelar suscripción";

        try {
          const json = JSON.parse(text);
          errorMessage = json.error || errorMessage;
        } catch {
          if (text) errorMessage = text;
        }

        throw new Error(errorMessage);
      }

      setUser({ ...user!, suscription: undefined });
    } catch (err: any) {
      console.error("❌ ERROR cancelSubscription:", err);
      setErrorModal(err.message || "Error desconocido");
    }
  };

  return { cancelSubscription };
};
