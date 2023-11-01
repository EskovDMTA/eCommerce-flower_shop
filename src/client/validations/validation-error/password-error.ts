import ValidationError from "./validation-errors";

export default class PasswordError extends ValidationError
{
     static removePasswordInvalidBackground(){

     }

     static passwordErrors(errors: string[]){
        console.log(errors)
     }
}