import { AxiosResponse } from "axios";
import { useState } from "react";
import { getAuthToken } from "../util/auth";

export function useDeleteData(id: string, deleteFn: (token: string | null, id: string) => Promise<AxiosResponse<any,any>>) {
  const [error, setError] = useState<string | null>(null);
  const token = getAuthToken();

  async function deleteData() {
    try {
      setError(null);

      const response = await deleteFn(token, id);
      return response;
    } catch(error) {
      let errorMessage;
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      setError(errorMessage);
      console.log(errorMessage);
    }
  }

  return { deleteData, error};
}