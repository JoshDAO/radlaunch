export function icoSubmit(owner, projectDescription, tokenAddress) {
  return fetch('https://ico-manager.herokuapp.com/api/create-listing', {
    method: 'POST',
    body: JSON.stringify({ owner, projectDescription, tokenAddress }),
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
