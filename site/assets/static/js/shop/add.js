let shop_add = document.querySelector('#shop_add')
if (shop_add) {

  shop_add.addEventListener('submit', event => {
    event.preventDefault()
    submitStatus(shop_add)

    let fetchData = getFormData(shop_add)

    wretch()
      // .errorType('json')
      .catcher(404, () => {
        modalFailMsg('服务器404错误')
        clearFormSpinner(shop_add)
      })
      .catcher(502, () => {
        modalFailMsg('服务器502错误')
        clearFormSpinner(shop_add)
      })
      .catcherFallback(() => {
        modalFailMsg('服务器未知错误')
        clearFormSpinner(shop_add)
      })
      .post(fetchData, `${xxxApiURL}/shop/add.php`)
      .json((response) => {
        response.result === 1
          ? modalSuccessMsg('提交成功')
          : modalFailMsg('提交失败')
        clearFormSpinner(shop_add)
      })
      .catch((error) => {
        console.log('shop_add_error', error)
        clearFormSpinner(shop_add)
      })
  })
}
