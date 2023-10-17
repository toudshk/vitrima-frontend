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
  return <form>{selectedButton === "button2" ? <div>
    <Field
        // {...register('email', {
        // 	required: 'Email is required!',
        // 	pattern: {
        // 		value: validEmail,
        // 		message: 'Please enter a valid email',
        // 	},
        // })}
        placeholder="Никнейм"
        // error={errors.email}
      />
      <Field
        // {...register(
        // 	'password',
        // 	isPasswordRequired
        // 		? {
        // 				required: 'Password is required!',
        // 				minLength: {
        // 					value: 6,
        // 					message: 'Min length should more 6 symbols!',
        // 				},
        // 		  }
        // 		: {}
        // )}
        placeholder="Пароль"
        type="password"
        // error={errors.password}
      />
  </div> : <div>
  <Field
        // {...register('email', {
        // 	required: 'Email is required!',
        // 	pattern: {
        // 		value: validEmail,
        // 		message: 'Please enter a valid email',
        // 	},
        // })}
        placeholder="Почта"
        // error={errors.email}
      />
      <Field
        // {...register(
        // 	'password',
        // 	isPasswordRequired
        // 		? {
        // 				required: 'Password is required!',
        // 				minLength: {
        // 					value: 6,
        // 					message: 'Min length should more 6 symbols!',
        // 				},
        // 		  }
        // 		: {}
        // )}
        placeholder="ИНН"
      
        // error={errors.password}
      />
      <Field
        // {...register(
        // 	'password',
        // 	isPasswordRequired
        // 		? {
        // 				required: 'Password is required!',
        // 				minLength: {
        // 					value: 6,
        // 					message: 'Min length should more 6 symbols!',
        // 				},
        // 		  }
        // 		: {}
        // )}
        placeholder="Пароль"
        type="password"
        // error={errors.password}
      /></div>}</form>;
};

export default AuthFields;
