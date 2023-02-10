import { Pencil, UserPlus, Users, Lock } from 'phosphor-react'

import { HeaderContainer } from './styles'

import LOGO_IMG from '../../assets/ufca_logo.png'
import { NavLink } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../../contexts/AuthContext'

export function Header() {
  const authContext = useContext(AuthContext);

  return (
    <HeaderContainer>
      <img src={LOGO_IMG} alt="Brasão da UFCA" />

      <nav>
        <NavLink to="/">
          <Users size={24} />
          Contador
        </NavLink>
        {
          authContext.isAuthenticated ?
            <>

              <NavLink to="/create">
                <UserPlus size={24} /> Criar veg
              </NavLink>
              <NavLink to="/edit">
                <Pencil size={24} /> Editar Veg
              </NavLink>
            </>
            :
            <NavLink to="/login">
              <Lock size={24} /> Logar
            </NavLink>
        }
      </nav>
    </HeaderContainer>
  )
}
