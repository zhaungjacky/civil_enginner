import jwtDecode from "jwt-decode";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
  useCallback,
} from "react";
import { useNavigate } from "react-router-dom";

type AuthRes = {
  access: string;
  refresh: string;
};

type User = {
  token_type: string;
  exp: number;
  iat: number;
  jti: string;
  user_id: number;
  username: string;
};

type ContextProviderProps = {
  children: React.ReactNode;
};

export type ContextData = {
  user: User;
  authTokens: AuthRes;
  loginUser: (event: React.FormEvent<HTMLFormElement>) => void;
  logoutUser: () => void;
  setUser: React.Dispatch<React.SetStateAction<User>>;
  setAuthTokens: React.Dispatch<React.SetStateAction<AuthRes>>;
};

const defauleContextData = {
  user: { token_type: "", exp: 1, iat: 1, jti: "", user_id: 1, username: "" },
  authTokens: {
    access: "",
    refresh: "",
  },
  loginUser: (event: React.FormEvent<HTMLFormElement>) => null,
  logoutUser: () => null,
  setUser: ()=>null,
  setAuthTokens: ()=>null,
  // setUser: React.useState<React.SetStateAction<User>>,
  // setAuthTokens: React.useState<React.SetStateAction<AuthRes>>,
};

export const AuthContext = createContext<ContextData>(defauleContextData);

export function useAuth() {
  return useContext(AuthContext);
}

export const AuthProvider = ({ children }: ContextProviderProps) => {
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();
  const [user, setUser] = useState<User>(() =>
    localStorage.getItem("authTokens")
      ? jwtDecode(JSON.parse(localStorage.getItem("authTokens")!).access)
      : defauleContextData.user
  );

  const [authTokens, setAuthTokens] = useState<AuthRes>(() =>
    localStorage.getItem("authTokens")
      ? JSON.parse(localStorage.getItem("authTokens")!)
      : defauleContextData.authTokens
  );

  const loginUser = useCallback((event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    let obj = {
      username: data.get("username"),
      password: data.get("password"),
    };
    try {
      fetch("/api/token/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(obj),
      })
        .then((res) => {
          if (res.ok) {
            return res.json();
          } else {
            console.log(res.statusText);
            logoutUser();
          }
        })
        .then((data: AuthRes) => {
          setUser(jwtDecode(data.access));
          setAuthTokens(data);
          localStorage.setItem("authTokens", JSON.stringify(data));
          navigate('/')
        });
    } catch (err) {
      console.log(err);
    }
  }, [navigate]);

  const logoutUser = () => {
    setUser(defauleContextData.user);
    setAuthTokens(defauleContextData.authTokens);
    localStorage.removeItem("authTokens");
  };

  const updateToken = useCallback(
    () => {
      try {
        if (authTokens?.access) {
          fetch("/api/token/refresh/", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              refresh: authTokens?.refresh,
            }),
          })
            .then((res) => {
              if (res.ok) {
                return res.json();
              } else {
                // loginUser(event: React.FormEvent<HTMLFormElement>);
              }
            })
            .then((data) => {
              setAuthTokens({ ...authTokens, access: data?.access });
              setUser(jwtDecode(data?.access));
              localStorage.setItem(
                "authTokens",
                JSON.stringify({ ...authTokens, access: data?.access })
              );
              setLoading(false);
            });
        }
      } catch (err) {
        console.log(err);
      }
    },
    [authTokens]
  );

  useEffect(() => {
    if (loading && authTokens?.access) {
      updateToken();
    }
    let timeInterval = 1000 * 60 * 58;
    let interval = setInterval(() => {
      if (authTokens?.access) {
        updateToken();
        console.log("update token called!");
      }
      return () => clearInterval(interval);
    }, timeInterval);
  }, [authTokens, loading, updateToken]);

  const contextData = useMemo(
    () => ({
      user: user,
      authTokens: authTokens,
      loginUser: loginUser,
      logoutUser: logoutUser,
      setUser: setUser,
      setAuthTokens: setAuthTokens,
    }),
    [user, authTokens, loginUser]
  );

  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};
