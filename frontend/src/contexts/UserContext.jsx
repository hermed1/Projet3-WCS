import { useState, useContext, createContext } from "react";
// Définir mon contexte utilisateur
const UserContext = createContext(null);

// Création du provider
// eslint-disable-next-line react/prop-types
function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
// Création de mon hook personnalisé
export const useUser = () => useContext(UserContext);
// Export du provider
export default UserProvider;

// //Dans un composant enfant
// /*
// 1 - Importer context
// 2- Importer "connecteur" useContext
// const {user}=useContext(UserContext);
// =>values={user,setUser}
// function useUser(){
//   return useContext(UserContext) : ({user,setUser})
// }
// ---
// useUser = () => useContext(UserContext);
// 1/ Import du hook useUser
// const {user}=useUSer();
// const {user}=()=>useContext(UserContext);
// */
