import { FC } from "react";
import { FormState, UseFormRegister } from "react-hook-form";

import { validEmail } from "../regex";
import Field from "@/components/ui/Form-elements/Field";

interface IAuthFields {
  register: UseFormRegister<any>;
  formState: FormState<any>;
  isPasswordRequired?: boolean;
  selectedButton: string;
}

const AuthFields: FC<IAuthFields> = ({
  selectedButton,
  register,
  formState: { errors },
  isPasswordRequired = false,
}) => {
  return <form>
    <Field
        {...register('email', {
        	required: 'Почта обязательна',
        	pattern: {
        		value: validEmail,
        		message: 'Пожалуйста, введите почту',
        	},
        })}
        placeholder="Почта"
        error={errors.email}
      />
      <Field
        {...register(
        	'password',
        	isPasswordRequired
        		? {
        				required: 'Пароль обязателен',
        				minLength: {
        					value: 6,
        					message: 'Минимальная длина пароля 6 символов',
        				},
        		  }
        		: {}
        )}
        placeholder="Пароль" 
        type="password"
        error={errors.password}
      />
  </form>;
};

export default AuthFields;
