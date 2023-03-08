import { useAuthContext } from '../hooks/useAuthContext'
import { Navigate, useLocation } from 'react-router-dom'

export const ProtectedRoute = ({ children }) => {

  const { authorized } = useAuthContext()
  const location = useLocation()

  return authorized 
  ? children
  : <Navigate to="/login" replace state={{ from: location.pathname }} />
}
