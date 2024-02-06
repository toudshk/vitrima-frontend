"use client";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { FC, useState } from "react";
import { useServicePrice } from "./useServicePrice";
import EditIcon from "./icon/EditIcon";
import SkeletonLoader from "@/components/ui/skeleton-loader/skeletonLoader";
import styles from "./ServiceAndPrice.module.scss";
import MainButton from "@/components/ui/Button/MainButton";
import { useParams } from "next/navigation";
import Field from "@/components/ui/Form-elements/Field";
import { IServicePriceEditInput } from "./service-price-edit/edit-servicePrice.interface";
import { useForm } from "react-hook-form";
import formStyles from "@/components/ui/Form-elements/Form.module.scss";
import { useServicePriceEdit } from "./service-price-edit/useEditServicePrice";
import SecondButton from "@/components/ui/Button/SecondButton";
const ServiceAndPrice: FC = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
  } = useForm<IServicePriceEditInput>({
    mode: "onChange",
  });

  const { data, isLoading, deleteAsync, onSubmit } = useServicePrice();


  const [creating, setCreating] = useState(false);

  const handleCreateClick = () => {
    setCreating(true);
  };

  return (
    <div className={styles.container}>
      
      <button
        onClick={handleCreateClick}
        className={styles.button}
      >
        Добавить услугу
      </button>

      {creating && (
        <div >
          {/* Ваша форма для создания новой услуги */}
          <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
            {isLoading ? (
              <SkeletonLoader count={3} />
            ) : (
              <div className="flex mt-12 ">
                <div className="flex mr-16">
                  <Field
                    {...register("title", {
                      required: "Пожалуйста, укажите название",
                    })}
                    placeholder="Название"
                    error={errors.title}
                    style={{
                      width: "150%",
                      border: "none",
                      borderBottom: "1px solid #EAEAEA",
                      borderRadius: "0px",
                      marginRight: "60px",
                    }}
                  />

                  <Field
                    {...register("price", {
                      required: "Пожалуйста, укажите цену",
                      pattern: {
                        value: /^\d+$/,
                        message: "Цена должна быть числом",
                      },
                    })}
                    placeholder="Цена"
                   
                    style={{
                      width: "100%",
                      border: "none",
                      borderBottom: "1px solid #EAEAEA",
                      borderRadius: "0px",
                    }}
                  />
                </div>
                <div className="w-[50%]">
                  <SecondButton>Сохранить</SecondButton>
                </div>
              </div>
            )}
          </form>
        </div>
      )}

      {isLoading ? (
        <SkeletonLoader count={1} height={48} className="mt-4" />
      ) : (
     <div className={styles.items}>
        {data?.map((item: any) => (
          <div
            key={item._id}
            className={styles.item}
           
          >
            <p className={styles.title}>{item.title}</p>
            <div className={styles.rightBlock}>
              <p className={styles.price}>{item.price} Р</p>
           
          
              <button onClick={() => deleteAsync(item._id)}>
                <DeleteOutlineIcon style={{ fontSize: 36, marginTop: '-10px' }} />
              </button>
         
            </div>
          </div>
       ))}
        </div>
      )}
    </div>
  );
};

export default ServiceAndPrice;
