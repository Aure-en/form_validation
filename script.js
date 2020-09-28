const errorContent = (() => {
  const name = 'Please enter an username.'
  const email = {
    missing: 'Please enter a mail address',
    invalid: 'Please enter a valid mail address'
  }
  const zipCode = {
    missing: 'Please enter a zip code',
    invalid: 'Please enter a valid Zip Code (can only contain numbers and letters)'
  }
  const confirmPassword = {
    missing: 'Please confirm your password',
    invalid: 'Your passwords don\'t seem to match, could you check them again please?'
  }

  return {
    name,
    email,
    zipCode,
    confirmPassword
  }
})()

const displayError = (() => {
  const error = (input, errorElem, error) => {
    errorElem.innerHTML = error
    input.style.border = '2px solid rgb(104, 51, 51, .75)'
  }

  const noError = (input, errorElem) => {
    errorElem.innerHTML = ''
    input.style.border = ''
  }

  // Functions used to validate/invalidate <small> messages beneath the password input.
  const validMessage = (errorElem) => {
    errorElem.classList.add('valid')
  }

  const invalidMessage = (errorElem) => {
    errorElem.classList.remove('valid')
  }

  return {
    error,
    noError,
    validMessage,
    invalidMessage
  }
})()

const checkValidity = (() => {
  const _inputs = {
    name: document.querySelector('#name'),
    email: document.querySelector('#email'),
    zip: document.querySelector('#zip'),
    password: document.querySelector('#password'),
    confirm: document.querySelector('#confirm-password')
  }

  const _errors = {
    name: document.querySelector('#error-name'),
    email: document.querySelector('#error-email'),
    zip: document.querySelector('#error-zip'),
    confirm: document.querySelector('#error-confirm')
  }

  const _checkMissing = (input, errorElem, error) => {
    if (input.validity.valueMissing) {
      displayError.error(input, errorElem, error)
    } else {
      displayError.noError(input, errorElem)
    }
  }

  const _checkType = (input, errorElem, error) => {
    if (input.validity.typeMismatch) {
      displayError.error(input, errorElem, error)
    } else {
      displayError.noError(input, errorElem)
    }
  }

  const _checkPattern = (input, errorElem, error) => {
    if (input.validity.patternMismatch) {
      displayError.error(input, errorElem, error)
    } else {
      displayError.noError(input, errorElem)
    }
  }

  const _checkIdentical = (input1, input2, errorElem, error) => {
    if (input1.value !== input2.value) {
      displayError.error(input2, errorElem, error)
    } else {
      displayError.noError(input2, errorElem)
    }
  }

  const _checkName = () => {
    _checkMissing(_inputs.name, _errors.name, errorContent.name)
  }

  const _checkMail = () => {
    _checkType(_inputs.email, _errors.email, errorContent.email.invalid)
    _checkMissing(_inputs.email, _errors.email, errorContent.email.missing)
  }

  const _checkZip = () => {
    _checkPattern(_inputs.zip, _errors.zip, errorContent.zipCode.invalid)
    _checkMissing(_inputs.zip, _errors.zip, errorContent.zipCode.missing)
  }

  const _checkConfirmation = () => {
    _checkIdentical(_inputs.password, _inputs.confirm, _errors.confirm, errorContent.confirmPassword.invalid)
    _checkMissing(_inputs.confirm, _errors.confirm, errorContent.confirmPassword.missing)
  }

  const enableChecks = () => {
    _inputs.name.addEventListener('blur', _checkName)
    _inputs.email.addEventListener('blur', _checkMail)
    _inputs.zip.addEventListener('blur', _checkZip)
    _inputs.confirm.addEventListener('blur', _checkConfirmation)
  }

  return { enableChecks }
})()

checkValidity.enableChecks()

const checkPassword = (() => {
  const _password = document.querySelector('#password')

  const _passwordValidation = {
    lowercase: document.querySelector('#password-lowercase'),
    uppercase: document.querySelector('#password-uppercase'),
    number: document.querySelector('#password-number'),
    special: document.querySelector('#password-special'),
    length: document.querySelector('#password-length')
  }

  const _passwordRegex = {
    lowercase: /(?=.*[a-z])/,
    uppercase: /(?=.*[A-Z])/,
    number: /(?=.*\d)/,
    special: /(?=.*[^a-zA-Z0-9])/,
    length: /(?=.{8,})/
  }

  const _passwordChecks = () => {
    for (const key in _passwordValidation) {
      if (_password.value.match(_passwordRegex[key])) {
        displayError.validMessage(_passwordValidation[key])
      } else {
        displayError.invalidMessage(_passwordValidation[key])
      }
    }
  }

  const enablePasswordCheck = () => {
    _password.addEventListener('input', _passwordChecks)
  }

  return { enablePasswordCheck }
})()

checkPassword.enablePasswordCheck()
