import { AuthProvider, UserAuthProvider } from './modules/Auth'

import {
  authManager,
  authService,
  usersService } from 'src/services';
import AppRoutes from 'src/routes/ApplicationRoutes';

import './App.scss'


function App() {

  return (
    <AuthProvider
      authManager={authManager}
      authService={authService}
    >
      <UserAuthProvider userService={usersService}>
        <AppRoutes />
      </UserAuthProvider>
    </AuthProvider>
  )
}

export default App
