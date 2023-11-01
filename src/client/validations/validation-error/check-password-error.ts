import PasswordError from "./password-error";

export default class CheckPasswordError extends PasswordError{
    static NEW_PASSWORD_INPUT = '.check-password_box';

    static NEW_PASSWORD_ERROR_SPAN = '.check-password-error_list';


    static passwordErrors(errors: string[]) {
        this.renderErrors(this.NEW_PASSWORD_ERROR_SPAN, errors);
    }

    static removePasswordInvalidBackground() {
        this.removeInvalidBackground(this.NEW_PASSWORD_INPUT)
    }


}