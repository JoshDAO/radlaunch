import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Box, Form, Input, Select, Field, Button, Text, Checkbox, Radio } from 'rimble-ui'
import bondingCurveImg from '../assets/bondingCurve.jpeg'

const Label = styled.label`
  padding: 0.9rem;
`

const IbcoSetupForm = (props) => {
  const [validated, setValidated] = useState(false)
  const [tokenName, setTokenName] = useState('')
  const [totalSupply, setTotalSupply] = useState('')
  const [startPrice, setStartPrice] = useState('')
  const [bondingCurveStyle, setBondingCurveStyle] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [paymentCurrency, setPaymentCurrency] = useState('')
  const [fundWallet, setFundWallet] = useState('')
  const [projectDescription, setProjectDescription] = useState('')

  const validateForm = () => {
    // Perform advanced validation here
    if (1 === 1) {
      setValidated(true)
    } else {
      setValidated(false)
    }
  }

  const handleTokenNameInput = (e) => {
    setTokenName(e.target.value)
    validateInput(e)
  }
  const handleTotalSupplyInput = (e) => {
    setTotalSupply(e.target.value)
    validateInput(e)
  }
  const handleStartPriceInput = (e) => {
    setStartPrice(e.target.value)
    validateInput(e)
  }

  const handleBondingCurveStyleInput = (e) => {
    setBondingCurveStyle(e.target.value)
    validateInput(e)
  }
  const handleStartDateInput = (e) => {
    setStartDate(e.target.value)
    validateInput(e)
  }
  const handleEndDateInput = (e) => {
    setEndDate(e.target.value)
    validateInput(e)
  }
  const handlePaymentCurrencyInput = (e) => {
    setPaymentCurrency(e.target.value)
    validateInput(e)
  }
  const handleFundWalletInput = (e) => {
    setFundWallet(e.target.value)
    validateInput(e)
  }
  const handleProjectDescriptionInput = (e) => {
    setProjectDescription(e.target.value)
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
      style={{
        backgroundColor: 'rgba(113, 101, 215, 0.2)',
        display: 'flex',
        flexDirection: 'column',
        fontFamily: "'Source Sans Pro', sans-serif",
        width: '70%',
        margin: 'auto',
        padding: '2rem 0',
      }}
      onSubmit={handleSubmit}
      validated={validated}
    >
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            width: '50%',
          }}
        >
          <Field label='Token name:' style={{ paddingLeft: '7rem' }}>
            <Input type='text' required={true} onChange={handleTokenNameInput} value={tokenName} />
          </Field>
          <Field label='Start date:' style={{ paddingLeft: '7rem' }}>
            <Input type='date' required onChange={handleStartDateInput} value={startDate} />
          </Field>
          <Field label='Start price:' style={{ paddingLeft: '7rem' }}>
            <Input type='text' required onChange={handleStartPriceInput} value={startPrice} />
          </Field>
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            width: '50%',
          }}
        >
          <Field label='Total supply to list:' style={{ paddingLeft: '3rem' }}>
            <Input
              type='text'
              required={true}
              onChange={handleTotalSupplyInput}
              value={totalSupply}
            />
          </Field>
          <Field label='End date:' style={{ paddingLeft: '3rem' }}>
            <Input type='date' required onChange={handleEndDateInput} value={endDate} />
          </Field>
          <Field label='Bonding curve style:' style={{ paddingLeft: '3rem' }}>
            <Radio
              label='Linear'
              value='linear'
              onChange={handleBondingCurveStyleInput}
              checked={bondingCurveStyle === 'linear'}
              required
            />
            <Radio
              label='Sigmoidal'
              value='sigmoidal'
              onChange={handleBondingCurveStyleInput}
              checked={bondingCurveStyle === 'sigmoidal'}
            />
            <Radio
              label='Exponential'
              value='exponential'
              onChange={handleBondingCurveStyleInput}
              checked={bondingCurveStyle === 'exponential'}
            />
          </Field>
        </div>
      </div>
      <img src={bondingCurveImg} width='50%' style={{ margin: 'auto', paddingTop: '1rem' }} />
      <div style={{ display: 'flex', flexDirection: 'row', marginTop: '2rem' }}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            width: '50%',
          }}
        >
          <Field label='Payment Currency:' style={{ paddingLeft: '7rem' }}>
            <Radio
              label='ETH'
              value='ETH'
              onChange={handlePaymentCurrencyInput}
              checked={paymentCurrency === 'ETH'}
              required
            />
            <Radio
              label='DAI'
              value='DAI'
              onChange={handlePaymentCurrencyInput}
              checked={paymentCurrency === 'DAI'}
            />
          </Field>
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            width: '50%',
          }}
        >
          <Field label='Fund wallet:' style={{ paddingLeft: '3rem' }}>
            <Input
              type='text'
              required
              onChange={handleFundWalletInput}
              value={fundWallet}
              placeholder='0x4e9...'
            />
          </Field>
        </div>
      </div>
      <Button type='submit' width='70%' style={{ margin: 'auto', marginTop: '2rem' }}>
        Review and Submit ICO for listing
      </Button>
    </Form>
  )
}

export default IbcoSetupForm
