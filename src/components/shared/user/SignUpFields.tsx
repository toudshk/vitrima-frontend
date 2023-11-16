"use client";
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

const SignUpFields: FC<IAuthFields> = ({
  selectedButton,
  register,
  formState: { errors },
  isPasswordRequired = false,
}) => {
  return (
    <form>
      {selectedButton === "applicant" ? (
        <div>
          <Field
            {...register("email", {
              required: "Email is required!",
              pattern: {
                value: validEmail,
                message: "Please enter a valid email",
              },
            })}
            placeholder="Почта"
            // error={errors.email}
          />
          <Field
            {...register("nickname")}
            placeholder="Никнейм"

            // error={errors.password}
          />
          <Field
            {...register(
              "password",
              isPasswordRequired
                ? {
                    required: "Password is required!",
                    minLength: {
                      value: 6,
                      message: "Min length should more 6 symbols!",
                    },
                  }
                : {}
            )}
            placeholder="Пароль"
            type="password"
            // error={errors.password}
          />
        </div>
      ) : (
        <div>
          <Field
            {...register("email", {
              required: "Email is required!",
              pattern: {
                value: validEmail,
                message: "Please enter a valid email",
              },
            })}
            placeholder="Почта"
            // error={errors.email}
          />
          <Field
            {...register(
              "inn",
              isPasswordRequired
                ? {
                    required: "Password is required!",
                    minLength: {
                      value: 16,
                      message: "Min length should more 6 symbols!",
                    },
                  }
                : {}
            )}
            placeholder="ИНН"

            // error={errors.password}
          />
          <Field
            {...register("nickname")}
            placeholder="Название компании / ФИО"

            // error={errors.password}
          />
          <Field
            {...register(
              "password",
              isPasswordRequired
                ? {
                    required: "Password is required!",
                    minLength: {
                      value: 6,
                      message: "Min length should more 6 symbols!",
                    },
                  }
                : {}
            )}
            placeholder="Пароль"
            type="password"
            // error={errors.password}
          />
        </div>
      )}
    </form>
  );
};

export default SignUpFields;
