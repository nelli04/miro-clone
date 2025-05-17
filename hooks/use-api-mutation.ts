import { useMutation } from "convex/react";
import { useState } from "react";

export const useApiMutation = (mutationFn: any) => {
  const [pending, setPending] = useState(false);

  const apiMutation = useMutation(mutationFn);

  const mutate = (payload: any) => {
    setPending(true);

    return apiMutation(payload)
      .finally(() => setPending(false))
      .then((res) => {
        return res;
      })
      .catch((err) => {
        throw err;
      });
  };

  return { mutate, pending };
};
