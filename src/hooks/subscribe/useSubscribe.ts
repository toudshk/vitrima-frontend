import { UserService } from "@/services/user/user.service";
import { SubmitHandler } from "react-hook-form";
import { useMutation } from "react-query";

export const useSubscribe = (applicantId: string, contractorId: string) => {

   
  
  
    const { mutateAsync } = useMutation(
      "subscribe",
      async () => {
        try {
          await UserService.subscribe(applicantId, contractorId);
         
        } catch (error) {
          console.log(error, "subscribe");
        }
      }
    );
  
    const onSubmit = async () => {
      await mutateAsync();
    };
  
    return { onSubmit };
  };
  