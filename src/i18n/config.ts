import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

const resources = {
  en: {
    translation: {
      auth: {
        signIn: 'Sign In',
        signUp: 'Sign Up',
        signOut: 'Sign Out',
        email: 'Email',
        password: 'Password',
        confirmPassword: 'Confirm Password',
        fullName: 'Full Name',
        businessName: 'Business Name',
        createAccount: 'Create Account',
        alreadyHaveAccount: 'Already have an account?',
        dontHaveAccount: 'Don\'t have an account?',
      },
      errors: {
        invalidCredentials: 'Invalid email or password',
        requiredField: 'This field is required',
        invalidEmail: 'Please enter a valid email',
        passwordMismatch: 'Passwords do not match',
      },
    },
  },
  pt: {
    translation: {
      auth: {
        signIn: 'Entrar',
        signUp: 'Cadastrar',
        signOut: 'Sair',
        email: 'E-mail',
        password: 'Senha',
        confirmPassword: 'Confirmar Senha',
        fullName: 'Nome Completo',
        businessName: 'Nome da Empresa',
        createAccount: 'Criar Conta',
        alreadyHaveAccount: 'Já tem uma conta?',
        dontHaveAccount: 'Não tem uma conta?',
      },
      errors: {
        invalidCredentials: 'E-mail ou senha inválidos',
        requiredField: 'Este campo é obrigatório',
        invalidEmail: 'Digite um e-mail válido',
        passwordMismatch: 'As senhas não conferem',
      },
    },
  },
}

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  })

export default i18n 