export function icoSubmit(ownerAddress, projectDescription) {
  return fetch('https://ico-manager.herokuapp.com/api/create-listing', {
    method: 'POST',
    body: JSON.stringify({ ownerAddress, projectDescription }),
    headers: { 'content-type': 'application/json' },
  }).then((response) => {
    if (!response.ok) {
      const error = new Error('HTTP Error!')
      error.status = response.status
      throw error
    } else {
      return response.json()
    }
  })
}
