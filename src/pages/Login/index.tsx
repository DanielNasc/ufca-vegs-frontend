import { useContext } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Navigate } from "react-router-dom";
import { SubmitFormButton } from "../../components/SubmitFormButton/styles";
import { AuthContext } from "../../contexts/AuthContext";
import { FormContainer, LoginForm, LoginInput } from "./styles";

interface ILoginFormData {
  email: string;
  password: string;
}

export function Login() {
  const { isAuthenticated, signIn } = useContext(AuthContext)

  if (isAuthenticated) return <Navigate to="/" />

  const { register, handleSubmit, reset } = useForm<ILoginFormData>()

  const handleLogin: SubmitHandler<ILoginFormData> = async ({ email, password }) => {
    await signIn({ email, password })
    reset()
  }

  return (
    <FormContainer>
      <LoginForm onSubmit={handleSubmit(handleLogin)}>
        <LoginInput placeholder="Email" {...register("email")} />
        <LoginInput placeholder="Senha" type='password' {...register("password")} />
        <SubmitFormButton type='submit' >
          Logar
        </SubmitFormButton>
      </LoginForm>
    </FormContainer>
  )
}
