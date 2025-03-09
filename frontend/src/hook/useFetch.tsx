import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function useFetch<T>(url: string) {
  const [data, setData] = useState<T>();
  const [error, setError] = useState<string | null>(null);
  const { authTokens, user, logoutUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user ===null) {
      logoutUser();
      return;
    }
    if (authTokens) {
      fetch(url, {
        method: "GET",
        // withCredentials: true,
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "authorization": "Bearer " + String(authTokens?.access),
        },
      })
        .then((res) => {
          if (res.ok) {
            // console.log(res.ok)
            return res.json();
          }
          // console.log(res.statusText)
          throw Error("Server refused or not connected!");
        })
        .then((data) => {
          setData(data);
        })
        .catch((err) => setError(err.message));
    }
  }, [authTokens, logoutUser, navigate, url, user]);
  return { data, error };
}
