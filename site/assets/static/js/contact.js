let contact = document.querySelector('#contact')
if (contact) {

  contact.addEventListener('submit', event => {
    event.preventDefault()
    submitStatus(contact)
    let formData = getFormData(contact)

    let fetchData = {
      type: formData['type'],
      title: formData['title'],
      content: formData['content'],
      attachment: formData['attachment'],
      captcha: formData['captcha'],
      userAgent: navigator.userAgent,
    }
    let fetchOptions = fetchPostOptions(fetchData)

    fetch(`https://api.zhgh.jzeg.net/contact/index.php`, fetchOptions)
      .then(response => response.json())
      .then(response => {
        console.log(response)
        clearFormSpinner(contact)
      })
      .catch(error => {
        console.error('contact_error:', error)
        clearFormSpinner(contact)
      })
  })
}
