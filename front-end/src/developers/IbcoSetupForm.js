import React, { useState } from 'react'
import styled from 'styled-components'
import { Form, Input, Field, Button, Text } from 'rimble-ui'
import NavBar from '../NavBar'
const IbcoSetupForm = (props) => {
  const [submitted, setSubmitted] = useState(false)
  const [validated, setValidated] = useState(false)
  const [startDateInFuture, setStartDateInFuture] = useState(true)
  const [endAfterStart, setEndAfterStart] = useState(true)
  const [tokenAddress, setTokenAddress] = useState('')
  const [tokenSupply, setTokenSupply] = useState('')
  const [minimumThreshold, setMinimumThreshold] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [projectDescription, setProjectDescription] = useState('')

  const validateForm = () => {
    if (Date.now() > Date.parse(startDate)) {
      setStartDateInFuture(false)
      setValidated(false)
    } else {
      setStartDateInFuture(true)
    }
    if (Date.parse(startDate) >= Date.parse(endDate)) {
      setEndAfterStart(false)
      setValidated(false)
    } else {
      setEndAfterStart(true)
    }
    if (Date.parse(startDate) < Date.parse(endDate) && Date.now() <= Date.parse(startDate)) {
      setValidated(true)
    }
  }

  const handleTokenAddressInput = (e) => {
    setTokenAddress(e.target.value)
    validateInput(e)
  }
  const handleTokenSupplyInput = async (e) => {
    await setTokenSupply(parseInt(e.target.value))
    if (Number.isInteger(tokenSupply)) {
      validateInput(e)
    }
  }
  const handleMinimumThresholdInput = async (e) => {
    await setMinimumThreshold(parseInt(e.target.value))
    if (Number.isInteger(minimumThreshold)) {
      validateInput(e)
    }
  }

  const handleStartDateInput = (e) => {
    setStartDate(e.target.value)
    validateInput(e)
  }
  const handleEndDateInput = (e) => {
    setEndDate(e.target.value)
    validateInput(e)
  }
  const handleProjectDescriptionInput = (e) => {
    setProjectDescription(e.target.value)
    validateInput(e)
  }

  const validateInput = (e) => {
    e.target.parentNode.classList.add('was-validated')
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
    validateForm()
  }

  return (
    <>
      <NavBar titleText={'Type'} />
      <Form
        style={{
          border: '1px solid #4E3FCE',
          borderRadius: '2rem',
          display: 'flex',
          flexDirection: 'column',
          fontFamily: "'Questrial', sans-serif",
          fontWeight: 400,
          fontSize: '1rem',
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
            <Field
              style={{
                marginLeft: '7rem',
                width: '70%',
              }}
            >
              <label for='address-input' style={{ paddingBottom: '0.5rem' }}>
                Token Address - ERC20 Compatible token to list{' '}
              </label>
              <Input
                id='address-input'
                type='text'
                required={true}
                onChange={handleTokenAddressInput}
                value={tokenAddress}
                style={{ width: '100%' }}
              />
            </Field>
            <Field
              style={{
                marginLeft: '7rem',
                width: '70%',
              }}
            >
              <label for='token-input' style={{ paddingBottom: '0.5rem' }}>
                Token supply - number of tokens to be listed for sale
              </label>
              <Input
                id='token-input'
                type='text'
                required={true}
                onChange={handleTokenSupplyInput}
                value={tokenSupply || ''}
                style={{ width: '100%' }}
              />
            </Field>
            <Field
              style={{
                marginLeft: '7rem',
                width: '70%',
                fontFamily: "'Questrial', sans-serif",
                fontWeight: 400,
              }}
            >
              <label for='start-date' style={{ paddingBottom: '0.5rem' }}>
                Start date:
              </label>
              <Input
                id='start-date'
                type='datetime-local'
                required
                onChange={handleStartDateInput}
                value={startDate}
                style={{ width: '100%' }}
              />
            </Field>
            {submitted && !startDateInFuture ? (
              <Text style={{ color: 'red', fontSize: '1rem' }}>
                Your start date is in the past!
              </Text>
            ) : null}
            <Field style={{ marginLeft: '7rem', width: '70%' }}>
              <label for='end-date' style={{ paddingBottom: '0.5rem' }}>
                End date:
              </label>
              <Input
                id='end-date'
                type='datetime-local'
                required
                onChange={handleEndDateInput}
                value={endDate}
                style={{ width: '100%' }}
              />
            </Field>
            {submitted && !endAfterStart ? (
              <Text style={{ color: 'red', fontSize: '1rem' }}>
                Your end date is before your start date!
              </Text>
            ) : null}
            <Field style={{ marginLeft: '7rem', width: '70%' }}>
              <label for='min-threshold' style={{ paddingBottom: '0.5rem', textAlign: 'left' }}>
                Minimum Investment Threshold - tokens will only be distributed if your project
                raises more than this amount in ETH
              </label>
              <Input
                id='min-threshold'
                type='text'
                required
                onChange={handleMinimumThresholdInput}
                value={minimumThreshold || ''}
                style={{ width: '100%' }}
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
            <Text style={{ textAlign: 'left', padding: '1rem 3rem 2rem 3rem', fontSize: '1rem' }}>
              How does this launch type work? This launch type deploys a dynamic swap pool contract.
              In this kind of deployment the number of tokens to be sold are fixed, investors
              participate by committing ETH, thus increasing the price of 1 token in a linear
              fashion. At the end date the settlement price will be set, this price will be the same
              for all investors, regardless of when they invested in the project. This discourages
              any frontrunning and ensures that all investors are equal before a DEX launch for
              example. This launch type requires a minimum investment threshold, if your pool
              doesn’t reach that size then all investors are returned their investment and your
              tokens are returned to you.
            </Text>
            <Field
              style={{
                paddingLeft: '3rem',
                width: '90%',
                fontFamily: "'Questrial', sans-serif",
                fontWeight: 400,
                fontSize: '1rem',
              }}
            >
              <label
                for='project-description'
                style={{ paddingBottom: '0.5rem', textAlign: 'left' }}
              >
                Project Description - describe your project, provide links, token description etc.
                This can be updated on your My Launch page.
              </label>
              <textarea
                id='project-description'
                rows={4}
                cols='20'
                color='text'
                class='Box__StyledBox-ha1bw0-0 Input__StyledInput-vwozih-0 hllauP erlOXA sc-bwzfXH sc-cXWtzU iofgdJ'
                onChange={handleProjectDescriptionInput}
                value={projectDescription}
                style={{
                  height: '11rem',
                  width: '100%',
                  fontFamily: "'Questrial', sans-serif",
                  fontSize: '1rem',
                }}
              ></textarea>
            </Field>
          </div>
        </div>
        <Button type='submit' width='70%' style={{ margin: 'auto', marginTop: '2rem' }}>
          Review and Submit ICO for listing
        </Button>
      </Form>
    </>
  )
}

export default IbcoSetupForm
