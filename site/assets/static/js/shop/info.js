let params = new URL(document.URL).searchParams
let id = params.get('id') // is the string "Jonathan Smith".

if (!id) {
  modalFailMsg('无信息')
}

if (id) {
  console.log(id)
}
