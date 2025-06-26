const zhgh_login = document.querySelector('#zhgh_login')

if (zhgh_login) {
  listenerPasswordInputType(zhgh_login)
  const zhgh_account = document.querySelector('#zhgh_account')
  const password = document.querySelector('#password')
  const account_display = document.querySelector('#account_display')

  const refreshAccountDisplay = () => {
    const phoneNumber = getStorageZhghAccount()
    account_display.innerText = hidePhoneNumber(phoneNumber)
  }

  if (getStorageZhghAccount()) refreshAccountDisplay()

  zhgh_login.addEventListener('submit', event => {
    event.preventDefault()

    if (!zhgh_account.value) {
      bModal('', createSmallCenterText('请输入账号', 'danger'), '', 'sm', true)
    }
    if (!password.value) {
      bModal('', createSmallCenterText('请输入密码', 'danger'), '', 'sm', true)
    }
    if (zhgh_account.value) {
      setStorageZhghAccount(zhgh_account.value)
      refreshAccountDisplay()
    }

    if (password.value) setStorageZhghPassword(password.value)

    bModal('', createSmallCenterText('已更新账号信息', 'success'), '', 'sm', true)
  })

  zhgh_login.addEventListener('reset', event => {
    if (!confirm('确定要删除当前账号信息吗？')) return

    removeStorageZhghAccount()
    removeStorageZhghPassword()
    // refreshAccountDisplay()
    account_display.innerText = getStorageZhghAccount() || '已删除'

    bModal('', createSmallCenterText('已删除当前账号信息', 'success'), '', 'sm', true)
  })
}
