import { Pencil, UserPlus, Users } from 'phosphor-react'

import { HeaderContainer } from './styles'

import LOGO_IMG from '../../assets/ufca_logo.png'
import { NavLink } from 'react-router-dom'

export function Header() {
  return (
    <HeaderContainer>
      <img src={LOGO_IMG} alt="Brasão da UFCA" />

      <nav>
        <NavLink to="/">
          <Users size={24} />
          Contador
        </NavLink>
        <NavLink to="/create">
          <UserPlus size={24} /> Criar veg
        </NavLink>
        <NavLink to="/edit">
          <Pencil size={24} /> Editar Veg
        </NavLink>
      </nav>
    </HeaderContainer>
  )
}
