const formState = 'feedback-form-state';
const form = document.querySelector('.feedback-form');

const localState = JSON.parse(localStorage.getItem(formState));

if (localState) {
    for (const key of Object.keys(localState)) {
    document.querySelector(`[name="${key}"]`).value = localState[key];
  }
}

form.addEventListener('input', onInputSaveToLocalStorage);

form.addEventListener('submit', onSubmitForm);

function onInputSaveToLocalStorage(event) {
  const key = event.target.name;
  const updatedStorage = {
    ...JSON.parse(localStorage.getItem(formState)),
    [key]: event.target.value.trim(),
  };

  localStorage.setItem(formState, JSON.stringify(updatedStorage));
}

function onSubmitForm(event) {
  event.preventDefault();

  const formData = new FormData(event.target);
  const formDataObj = Object.fromEntries(formData.entries());
  if (validateFormFields(formDataObj)) {
   
    console.log('submit', formDataObj);

    localStorage.removeItem(formState);

    event.target.reset();
  }
}

function validateFormFields(formDataObj) {
  let isValid = true;
  for (const key in formDataObj) {
    if (!formDataObj[key]) {
      addBorderInputError(document.querySelector(`[name="${key}"]`));
      isValid = false;
    }
    if (formDataObj[key]) {
      removeBorderInputError(document.querySelector(`[name="${key}"]`));
    }
  }

  return isValid;
}

function addBorderInputError(input) {
  input.classList.add('error');
}

function removeBorderInputError(input) {
  input.classList.remove('error');
}
