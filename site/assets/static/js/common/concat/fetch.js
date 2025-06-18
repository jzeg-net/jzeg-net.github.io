const fetchPostOptions = fetchData => ({
  method: 'POST',
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
    'Accept': 'application/json',
  },
  cache: 'no-store',
  body: JSON.stringify(fetchData),
})

const fetchGetOptions = () => ({
  method: 'GET',
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
    'Accept': 'application/json',
  },
})
