import { Pencil, UserPlus, Users, Lock, UserCircle } from 'phosphor-react'

import { HeaderContainer, ProfilePicContainer } from './styles'

import LOGO_IMG from '../../assets/ufca_logo.png'
import { NavLink } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../../contexts/AuthContext'

export function Header() {
  const { isAuthenticated, signOut } = useContext(AuthContext);

  return (
    <HeaderContainer>
      {
        isAuthenticated ?

          <ProfilePicContainer onClick={() => signOut()}>
            <img src={import.meta.env.VITE_ADM_PIC} alt="" />
          </ProfilePicContainer> :
          <UserCircle size="4rem" />
      }

      <nav>
        <NavLink to="/">
          <Users size={24} />
          Contador
        </NavLink>
        {
          isAuthenticated ?
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
