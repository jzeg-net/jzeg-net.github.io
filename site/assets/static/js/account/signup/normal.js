let signup_normal = document.querySelector('#signup_normal')
if (signup_normal) {
    listenCaptcha(signup_normal)
    listenerPasswordInputType(signup_normal)

    signup_normal.addEventListener('submit', event => {
        event.preventDefault()
        submitStatus(signup_normal)
        let formData = getFormData(signup_normal)

        formData['agreement'] = formData['agreement'] === 'on'
        formData['token'] = getToken()

        wretch()
          // .errorType('json')
          .catcher(404, () => {
            bModal('', createSmallCenterText('服务器404错误', 'danger'), '', 'sm', true)
            clearSubmitStatus(signup_normal)
          })
          .catcher(502, () => {
            bModal('', createSmallCenterText('服务器502错误', 'danger'), '', 'sm', true)
            clearSubmitStatus(signup_normal)
          })
          .catcherFallback((error,originalRequest) => {
            bModal('', createSmallCenterText('服务器未知错误', 'danger'), '', 'sm', true)
            console.log(error)
            clearSubmitStatus(signup_normal)
          })
          .post(formData, `${accountApiUrl}/signup.php`)
          .json((response) => {
            if (response['code']) {
              responseCode(response, signup_normal)
            } else {
              let x = bModal('', createSmallCenterText(response['msg'], 'success'), '', 'sm', true)
              document.querySelector('#' + x).addEventListener('hidden.bs.modal', () => {
                // location.replace('/account/login.php')
              })
            }
            clearSubmitStatus(signup_normal)
          })
          .catch((error) => {
            console.log('signup_error', error)
            clearSubmitStatus(signup_normal)
          })
    })
}
