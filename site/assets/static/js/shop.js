let contact = document.querySelector('#contact')
if (contact) {

  contact.addEventListener('submit', event => {
    event.preventDefault()
    submitStatus(contact)
    let formData = getFormData(contact)

    let fetchData = {
      area: formData['area'],
      name: formData['name'],
      niceName: formData['niceName'],
      type: formData['type'],
      address: formData['address'],
      phone: formData['phone'],
      openingHours: {
        x: formData['openingHours[x]'],
        y: formData['openingHours[y]'],
        z: formData['openingHours[z]'],
      },
      introduction: formData['introduction'],
      photo: formData['photo'],
      duration: formData['duration'],
      captcha: formData['captcha'],
      userAgent: navigator.userAgent,
    }

    wretch()
      // .errorType('json')
      .catcher(404, () => {
        bModal('', createSmallCenterText('服务器404错误', 'danger'), '', 'sm', true)
        clearFormSpinner(contact)
      })
      .catcher(502, () => {
        bModal('', createSmallCenterText('服务器502错误', 'danger'), '', 'sm', true)
        clearFormSpinner(contact)
      })
      .catcherFallback(() => {
        bModal('', createSmallCenterText('服务器未知错误', 'danger'), '', 'sm', true)
        clearFormSpinner(contact)
      })
      .post(fetchData, `${xxxApiURL}/shop/add.php`)
      .json((response) => {
        response.result === 1
          ? bModal('', createSmallCenterText('提交成功', 'success'), '', 'sm', true)
          : bModal('', createSmallCenterText('提交失败', 'success'), '', 'sm', true)
        clearFormSpinner(contact)
      })
      .catch((error) => {
        console.log('contact_error', error)
        clearFormSpinner(contact)
      })
  })
}
