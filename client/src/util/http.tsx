import axios from "axios";

export async function deleteService(token: string | null, id: string) {
  const response = await axios.delete("/administrator/deleteservice/" + id, {
    headers: {
      Authorization: "Bearer " + token,
    }
  });
  return response;
}

export async function deleteReservation(token: string | null, id: string) {
  const response = await axios.delete("/administrator/deletereservation/" + id, {
    headers: {
      Authorization: "Bearer " + token,
    }
  });
  return response;
}

export async function deleteBranch(token: string | null, id: string) {
  const response = await axios.delete("/administrator/deletebranch/" + id, {
    headers: {
      Authorization: "Bearer " + token,
    }
  });
  return response;
}