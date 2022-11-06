import { Users, Wrench } from 'phosphor-react'

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
        <NavLink to="/pei">
          <Wrench size={24} /> link test
        </NavLink>
      </nav>
    </HeaderContainer>
  )
}
