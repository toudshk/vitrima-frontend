import { NextPageAuth } from "@/components/shared/types/auth.types"
import { Controller, useForm } from "react-hook-form";
import { ISettingsProfileInput } from "../settings.interface";
import { useProfile } from "../useProfile";
import styles from './PersonalInfo.module.scss'
import SkeletonLoader from "@/components/ui/skeleton-loader/skeletonLoader";
import { Meta } from "@/utils/meta";
import Field from "@/components/ui/Form-elements/Field";
import UploadAvatar from "../upload-avatar/UploadAvatar";
const PersonalInfo:NextPageAuth =() => {
    const {
        handleSubmit,
        register,
        formState: { errors },
        setValue,
        control,
      } = useForm<ISettingsProfileInput>({
        mode: "onChange",
      });
      const { isLoading, onSubmit } = useProfile(setValue);

      return (
        <Meta title="Personal info">
          
    
          <div className={styles.fields}>
            <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
              {isLoading ? (
                <SkeletonLoader count={2} />
              ) : (
                <>
                  <div className={styles.fieldsTitlePhoto}>
                    <Controller
                      name="image"
                      control={control}
                      defaultValue=""
                      render={({
                        field: { value, onChange },
                        fieldState: { error },
                      }) => (
                        <UploadAvatar
                          placeholder="Фотография"
                          error={error}
                          folder="image"
                          image={value}
                          onChange={onChange}
                          title={""}
                        />
                      )}
                    />
    
                    <Field
                      {...register("nickname", {
                        required: "Никнейм обязательно",
                      })}
                      placeholder="Никнейм"
                      error={errors.nickname}
                      title=""
                    />
                  </div>
                  <Field
                    {...register("email", {
                      required: "почта обязательна",
                    })}
                    placeholder="Почта"
                    error={errors.email}
                    title="Почта"
                  />
    
    <Field
                    {...register("description")}
                    placeholder="Напишите ваши услуги, которые вы предоставляете"
                    error={errors.description}
                    title="Описание услуг"
                  />
                </>
              )}
          <button className={styles.button}>Сохранить</button>
    
            </form>
    
          </div>
    
    </Meta>
        
)
}
export default PersonalInfo