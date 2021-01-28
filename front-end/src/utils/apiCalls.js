export function icoSubmit(owner, projectDescription, tokenAddress, contractAddress) {
  return fetch('https://ico-manager.herokuapp.com/api/create-listing', {
    method: 'POST',
    body: JSON.stringify({ owner, projectDescription, tokenAddress, contractAddress }),
    headers: { 'content-type': 'application/json' },
  })
    .then((response) => {
      if (!response.ok) {
        const error = new Error(response.json())
        error.status = response.status
        throw error
      } else {
        return response.json()
      }
    })
    .catch((error) => {
      throw new Error(error)
    })
}

export function fetchDatabaseIcoData(owner) {
  return fetch(`https://ico-manager.herokuapp.com/api/owner/${owner}`, {
    method: 'GET',
  })
    .then((response) => {
      if (!response.ok) {
        const error = new Error('HTTP Error!')
        error.status = response.status
        throw error
      } else {
        return response.json()
      }
    })
    .catch((error) => {
      throw new Error(error)
    })
}

export function fetchDatabaseInvestorData(contractAddress) {
  return fetch(`https://ico-manager.herokuapp.com/api/address/${contractAddress}`, {
    method: 'GET',
  })
    .then((response) => {
      if (!response.ok) {
        const error = new Error('HTTP Error!')
        error.status = response.status
        throw error
      } else {
        return response.json()
      }
    })
    .catch((error) => {
      throw new Error(error)
    })
}

export function updateIcoImage(owner, tokenAddress, imageUrl) {
  console.log('boop:  ', owner, tokenAddress, imageUrl)
  return fetch(`https://ico-manager.herokuapp.com/api/update-image`, {
    method: 'PUT',
    body: JSON.stringify({ owner, tokenAddress, imageUrl }),
    headers: { 'content-type': 'application/json' },
  })
    .then((response) => {
      if (!response.ok) {
        const error = new Error('HTTP Error!')
        error.status = response.status
        throw error
      } else {
        return response.json()
      }
    })
    .catch((error) => {
      throw new Error(error)
    })
}

export function updateProjectDescription(owner, tokenAddress, projectDescription) {
  return fetch(`https://ico-manager.herokuapp.com/api/update-description`, {
    method: 'PUT',
    body: JSON.stringify({ owner, tokenAddress, projectDescription }),
    headers: { 'content-type': 'application/json' },
  })
    .then((response) => {
      if (!response.ok) {
        const error = new Error('HTTP Error!')
        error.status = response.status
        throw error
      } else {
        return response.json()
      }
    })
    .catch((error) => {
      throw new Error(error)
    })
}
