import React, { useContext, useState } from 'react'
import RegistrationFormView from './RegistrationPageView'
import validationEmail from '../../functions/validateEmail'
import { request } from '../../functions'
import { AuthContext } from '../../contexts/AuthProvider'
import { TagContext } from '../../contexts/TagProvider'

/**
 * RegistrationForm used to register a new user
 */
const RegistrationFormController = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const authContext = useContext(AuthContext)
  const { getTags } = useContext(TagContext)

  /**
   * Validate the user information before sending
   */
  const validation = () => {
    if (!username) {
      setError('Username is required.')
      return false
    }
    if (!email) {
      setError('Email is required.')
      return false
    }
    if (!validationEmail(email)) {
      setError('Email is not valid.')
      return false
    }
    if (!password) {
      setError('Password is required.')
      return false
    }
    if (password.length < 5) {
      setError('Password must be at least 5 characters long.')
      return false
    }
    return true
  }

  /**
   * Submit the new user to the backend
   */
  const submitForm = async () => {
    if (validation()) {
      setLoading(true)
      const { data, err } = await request('auth/register', 'POST', {
        email,
        password,
        username,
        name: username,
      })
      setLoading(false)

      if (err) {
        setError(err)
        return
      }

      const authToken = data.username
      console.log(data)
      if (data) {
        localStorage.setItem('token', authToken)
        localStorage.setItem('username', username)
        authContext.login({ token: authToken, username })
        getTags()
      }
    }
  }

  return (
    <RegistrationFormView
      state={{
        email,
        password,
        username,
        error,
        loading,
      }}
      action={{
        setEmail,
        setPassword,
        setUsername,
        submitForm,
      }}
    />
  )
}
export default RegistrationFormController
