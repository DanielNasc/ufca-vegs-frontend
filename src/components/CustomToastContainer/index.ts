import styled from 'styled-components'
import { ToastContainer } from 'react-toastify'

export const CustomToastContainer = styled(ToastContainer)`
  --toastify-icon-color-success: ${(props) => props.theme['green-500']};

  .Toastify__toast {
    background: ${(props) => props.theme['gray-900']};
  }

  .Toastify__progress-bar {
    background: ${(props) => props.theme['green-500']};
  }
`
