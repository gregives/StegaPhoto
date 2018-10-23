
/**
 * Check password field and confirm password are the same.
 */
export function validateHidePassword() {
  const hidePasswordConf = document.querySelector('#hidePasswordConf')
  if (hidePasswordConf.value === document.querySelector('#hidePassword').value) {
    hidePasswordConf.classList.remove('is-invalid')
    hidePasswordConf.classList.add('is-valid')
    return true
  } else {
    hidePasswordConf.classList.remove('is-valid')
    hidePasswordConf.classList.add('is-invalid')
    return false
  }
}
