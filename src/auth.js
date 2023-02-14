import React from "react";
import { useNavigate, Navigate } from "react-router-dom";

const adminList = ['Irisval', 'RetaxMaster', 'freddier'];

const AuthContext = React.createContext();

//funccion para cerificar si esta AUTENTICADO
function AuthProvider({ children }) {
  const navigate = useNavigate()

  //si user es null no estamos autenticados
  const [user, setUser] = React.useState(null);

  const login = ({ username }) => {
    const isAdmin = adminList.find(admin => admin === username);
    //actualizador del estado
    setUser({ username, isAdmin })
    navigate('./profile')
  }
  const logout = () => {
    //actualizador del estado
    setUser(null)
    navigate('/')
  }
  const auth = { user, login, logout };

  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  )
}

function useAuth() {
  const auth = React.useContext(AuthContext);
  return auth;
}

//redireccionar si no esta autenticado
function AuthRoute(props) {
  const auth = useAuth();

  //si no estas autenticado o no existe auth todavia redireccionar a login
  if (!auth.user) {
    return <Navigate to="/login" />
  }
  //y si existe aut o estas autenticado
  return props.children;
}


export {
  AuthProvider,
  AuthRoute,
  useAuth,
};