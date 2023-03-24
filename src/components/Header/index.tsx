import { Pencil, UserPlus, Users, Lock, UserCircle } from 'phosphor-react'

import { HeaderContainer, ProfilePicContainer } from './styles'

import { Link, NavLink } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../../contexts/AuthContext'

export function Header() {
  const { isAuthenticated } = useContext(AuthContext)

  /* const windowWidth = screen.width

  if (windowWidth < 768) {
    return (
      <HeaderContainer>
        <List size={32} />
      </HeaderContainer>
    )
  } */

  return (
    <HeaderContainer>
      {isAuthenticated ? (
        <ProfilePicContainer pfp_src={import.meta.env.VITE_ADM_PIC}>
          <Link to="/dashboard">
            <span />
          </Link>
        </ProfilePicContainer>
      ) : (
        <Link to="/login">
          <UserCircle size="4rem" />
        </Link>
      )}

      <nav>
        <NavLink to="/">
          <Users size={24} />
          <span>Contador</span>
        </NavLink>
        {isAuthenticated ? (
          <>
            <NavLink to="/create">
              <UserPlus size={24} /> <span>Criar veg</span>
            </NavLink>
            <NavLink to="/edit">
              <Pencil size={24} /> <span>Editar Veg</span>
            </NavLink>
          </>
        ) : (
          <NavLink to="/login">
            <Lock size={24} /> <span>Logar</span>
          </NavLink>
        )}
      </nav>
    </HeaderContainer>
  )
}
