export default class ValidationError {
  static renderErrors(errorsListTag:string, errors: string[] | string): void {
    const errorList = document.querySelector(errorsListTag);
    if (errors.length === 0) {
      this.cleanErrorsList(errorsListTag)
    }
    if (errorList) {
      this.cleanErrorsList(errorsListTag)
      if (Array.isArray(errors)) {
        errors.forEach((elem) => {
          const errorElement = document.createElement('li');
          errorElement.classList.add('login-error_item');
          errorElement.textContent = elem;
          errorList.append(errorElement);
        });
      } else {
        const errorElement = document.createElement('li');
        errorElement.classList.add('login-error_item');
        errorElement.textContent = errors;
        errorList.append(errorElement);
      }
    }
  }

  static renderErrorsForContainer(container: HTMLElement, errorsListTag:string, errors: string[] | string): void {
    const errorList = container.querySelector(errorsListTag);
    if (errors.length === 0) {
      this.cleanErrorsList(errorsListTag)
    }
    if (errorList) {
      this.cleanErrorsListForContainer(container, errorsListTag)
      if (Array.isArray(errors)) {
        errors.forEach((elem) => {
          const errorElement = document.createElement('li');
          errorElement.classList.add('login-error_item');
          errorElement.textContent = elem;
          errorList.append(errorElement);
        });
      } else {
        const errorElement = document.createElement('li');
        errorElement.classList.add('login-error_item');
        errorElement.textContent = errors;
        errorList.append(errorElement);
      }
    }
  }

  static cleanErrorsList(errorsListTag: string) :void {
    const errorList = document.querySelector(errorsListTag);
    if(errorList) {
      errorList.innerHTML = "";
    }
  }

  static cleanErrorsListForContainer(container: HTMLElement, errorsListTag: string) :void {
    const errorList = container.querySelector(errorsListTag);
    if(errorList) {
      errorList.innerHTML = "";
    }
  }

  static shakeInvalidInput(invalidInput: string) {
    const loginInput = document.querySelector(invalidInput);
    if(loginInput){
      loginInput.classList.add("input-shake");
      setTimeout(() => {
        loginInput.classList.remove("input-shake");
      }, 500)
    }
  }

  static addInvalidBackground(input: string){
    const invalidInput = document.querySelector(input);
    if(invalidInput){
      if(!invalidInput.classList.contains("invalid-input"))
      invalidInput.classList.add("invalid-input");
    }
  }

  static removeInvalidBackground(input:string) {
    const invalidInput = document.querySelector(input);
    if(invalidInput){
      if(invalidInput.classList.contains("invalid-input")){
        invalidInput.classList.remove("invalid-input");
      }
    }
    }

    static removeInvalidBackgroundForContainer(form: HTMLElement,input:string) {
      const invalidInput = form.querySelector(input);
      if(invalidInput){
        if(invalidInput.classList.contains("invalid-input")){
          invalidInput.classList.remove("invalid-input");
        }
      }
      }
}


