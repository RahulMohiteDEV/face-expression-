import { RouterProvider } from 'react-router-dom'
import {router} from './app.routes' 
import './features/shared/styles/global.scss'
import { AuthProvider } from './features/auth/auth.context'

function App() {


  return (
           <AuthProvider>
            <RouterProvider router={router} />
           </AuthProvider>
  )
}

export default App
