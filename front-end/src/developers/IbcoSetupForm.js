import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Box, Form, Input, Select, Field, Button, Text, Checkbox, Radio } from 'rimble-ui'

const Label = styled.label`
  padding: 0.9rem;
`

const IbcoSetupForm = (props) => {
  const [validated, setValidated] = useState(false)
  const [tokenNameInput, setTokenNameInput] = useState('')
  const [totalSupplyInput, setTotalSupplyInput] = useState('')

  const validateForm = () => {
    // Perform advanced validation here
    if (1 === 1) {
      setValidated(true)
    } else {
      setValidated(false)
    }
  }

  const handleTokenNameInput = (e) => {
    setTokenNameInput(e.target.value)
    validateInput(e)
  }
  const handleTotalSupplyInput = (e) => {
    setTotalSupplyInput(e.target.value)
    validateInput(e)
  }

  const validateInput = (e) => {
    e.target.parentNode.classList.add('was-validated')
  }

  useEffect(() => {
    validateForm()
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Submitted valid form')
  }

  return (
    <Form
      style={{ backgroundColor: 'rgba(113, 101, 215, 0.2)' }}
      onSubmit={handleSubmit}
      validated={validated}
    >
      <Label htmlFor='tokenName'>Token name:</Label>
      <Input
        id='tokenName'
        type='text'
        required={true}
        onChange={handleTokenNameInput}
        value={tokenNameInput}
        placeholder='e.g. My hodl wallet'
      />
      <Label htmlFor='supply'>Total supply to list:</Label>
      <Input
        id='supply'
        type='text'
        required={true}
        onChange={handleTotalSupplyInput}
        value={totalSupplyInput}
        placeholder='e.g. My hodl wallet'
      />
    </Form>
  )
}

export default IbcoSetupForm
