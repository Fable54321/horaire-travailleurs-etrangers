import { usePersistentAuth } from "../Contexts/AuthContext";
import { useEffect } from "react";
import type { JSX } from "react";

const APP_SLUG = "schedule";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { user, loading } = usePersistentAuth();

  const hasAccess = !!user?.appAccess?.some((app) => app.slug === APP_SLUG);

  useEffect(() => {
    if (loading) return;
     
    console.log("user from ProtectedRoute:", user);

    if (!user || !hasAccess) {
      alert("Vous n'avez pas les permissions nécessaires pour accéder à cette application.");
      window.location.replace("https://vegibec-portail.com/");
      return;
    }

    
  }, [user, loading, hasAccess]);

  if (loading) return <div>Chargement...</div>;

  if (!user || !hasAccess) return null;

  return children;
};



export default ProtectedRoute;
