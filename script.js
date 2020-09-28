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
  const password = {
    missing: 'Please enter a password',
    invalid: 'Please make sure your password meets the following conditions.'
  }
  const confirmPassword = {
    missing: 'Please confirm your password',
    invalid: 'Your passwords don\'t seem to match, could you please check them again?'
  }
  const submit = {
    valid: 'Thank you for your participation!',
    invalid: 'A few fields seem invalid, could you please check them again?'
  }

  return {
    name,
    email,
    zipCode,
    password,
    confirmPassword,
    submit
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
    password: document.querySelector('#error-password'),
    confirm: document.querySelector('#error-confirm'),
    submit: document.querySelector('#error-submit')
  }

  const _submit = document.querySelector('#submit')

  const _checkMissing = (input, errorElem, error) => {
    if (input.validity.valueMissing) {
      displayError.error(input, errorElem, error)
    }
  }

  const _checkType = (input, errorElem, error) => {
    if (input.validity.typeMismatch) {
      displayError.error(input, errorElem, error)
    }
  }

  const _checkPattern = (input, errorElem, error) => {
    if (input.validity.patternMismatch) {
      displayError.error(input, errorElem, error)
    }
  }

  const _checkValidity = (input, errorElem) => {
    if (input.checkValidity()) displayError.noError(input, errorElem)
  }

  const _checkIdentical = (input1, input2) => {
    if (input1.value !== input2.value) {
      return false
    }
    return true
  }

  const _checkName = () => {
    _checkMissing(_inputs.name, _errors.name, errorContent.name)
    _checkValidity(_inputs.name, _errors.name)
  }

  const _checkMail = () => {
    _checkMissing(_inputs.email, _errors.email, errorContent.email.missing)
    _checkType(_inputs.email, _errors.email, errorContent.email.invalid)
    _checkValidity(_inputs.email, _errors.email)
  }

  const _checkZip = () => {
    _checkMissing(_inputs.zip, _errors.zip, errorContent.zipCode.missing)
    _checkPattern(_inputs.zip, _errors.zip, errorContent.zipCode.invalid)
    _checkValidity(_inputs.zip, _errors.zip)
  }

  const _checkPassword = () => {
    _checkMissing(_inputs.password, _errors.password, errorContent.password.missing)
    _checkPattern(_inputs.password, _errors.password, errorContent.password.invalid)
  }

  const _checkConfirmation = () => {
    if (_inputs.confirm.validity.valueMissing) {
      displayError.error(_inputs.confirm, _errors.confirm, errorContent.confirmPassword.missing)
    } else if (!_checkIdentical(_inputs.password, _inputs.confirm)) {
      displayError.error(_inputs.confirm, _errors.confirm, errorContent.confirmPassword.invalid)
    } else {
      displayError.noError(_inputs.confirm, _errors.confirm)
    }
  }

  const _checkSubmit = (e) => {
    e.preventDefault()
    for (const key in _inputs) {
      console.log(_inputs[key].checkValidity())
      console.log(_checkIdentical(_inputs.password, _inputs.confirm))
      if (!_inputs[key].checkValidity() || !_checkIdentical(_inputs.password, _inputs.confirm)) {
        displayError.error(_submit, _errors.submit, errorContent.submit.invalid)
        _checkName()
        _checkMail()
        _checkZip()
        _checkPassword()
        _checkConfirmation()
      } else {
        displayError.error(_submit, _errors.submit, errorContent.submit.valid)
        displayError.validMessage(_errors.submit)
      }
    }
  }

  const enableChecks = () => {
    _inputs.name.addEventListener('blur', _checkName)
    _inputs.email.addEventListener('blur', _checkMail)
    _inputs.zip.addEventListener('blur', _checkZip)
    _inputs.confirm.addEventListener('blur', _checkConfirmation)
    _inputs.password.addEventListener('blur', _checkPassword)
    _submit.addEventListener('click', _checkSubmit)
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
