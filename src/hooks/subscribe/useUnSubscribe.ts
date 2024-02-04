import { UserService } from "@/services/user/user.service";
import { SubmitHandler } from "react-hook-form";
import { useMutation } from "react-query";

export const useUnSubscribe = (applicantId: string, contractorId: string) => {

   
  
  
    const { mutateAsync } = useMutation(
      "unsubscribe",
      async () => {
        try {
          await UserService.unSubscribe(applicantId, contractorId);
          
        } catch (error) {
          console.log(error, "unsubscribe");
        }
      }
    );
  
    const onSubmit = async () => {
      await mutateAsync();
    };
  
    return { onSubmit };
  };
  