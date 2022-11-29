import { useState } from "react";

interface UseMutationState<T> {
  data?: T;
  error?: object;
}

export default function useMutation<T>(url: string) {
  const [state, setState] = useState<UseMutationState<T>>({
    data: undefined,
    error: undefined,
  });
  const mutation = (data: any) => {
    fetch(url, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((res) =>
        res.json().catch((e) => {
          throw new Error(e);
        })
      )
      .then((data) => setState((prev) => ({ ...prev, data })))
      .catch((error) => setState((prev) => ({ ...prev, error })));
  };

  return [mutation, { ...state }];
}
