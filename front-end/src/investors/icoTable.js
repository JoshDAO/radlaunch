import React from 'react'
import { Table } from 'antd'
import './icoTable.css'
import 'react-tabulator/lib/styles.css' // required styles
import 'react-tabulator/lib/css/tabulator.min.css' // theme
import { ReactTabulator } from 'react-tabulator'

const icoTable = (props) => {
  const columns = [
    { title: 'Name', field: 'name', align: 'center' },
    { title: 'Status', field: 'status', align: 'center' },
    { title: 'Type', field: 'type', align: 'center' },
    { title: 'Amount Raised', field: 'amountRaised', align: 'center' },
    { title: 'Start Date', field: 'startDate', align: 'center' },
    { title: 'End Date', field: 'endDate', align: 'center' },
  ]

  var data = [
    {
      id: 1,
      amountRaised: '0',
      contractAddress: '0x068417B9cEC8B4a64d6DB25b58d8128F01DbD4a0',
      endDate: new Date(1612124700000).toString().substr(4, 24),
      imageUrl: undefined,
      minimumRaiseAmount: '2000000000000000000',
      name: 'OtherTestToken',
      numberOfProviders: '0',
      projectDescription: 'test description server hack the database',
      startDate: new Date(1611865500000).toString().substr(4, 24),
      symbol: 'OTHER',
      tokenAddress: '0x6a1B92aE406556c33A199d2f3f5e2c44a2EA690e',
      tokenSupply: '1000000000000000000000000',
      totalSupply: '1000000000000000000000000',
      yourContribution: '0',
      status: 'live',
      type: 'IBCO',
    },
  ]

  return (
    <ReactTabulator style={{ width: '80%', margin: ' 1rem auto' }} columns={columns} data={data} />
  )
}

export default icoTable
