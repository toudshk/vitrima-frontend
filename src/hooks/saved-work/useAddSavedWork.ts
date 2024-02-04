import { UserService } from "@/services/user/user.service";
import { SubmitHandler } from "react-hook-form";
import { useMutation } from "react-query";

export const useAddSavedWork = (applicantId: string, workId: string) => {

   
  
  
    const { mutateAsync } = useMutation(
      "add saved work",
      async () => {
        try {
          await UserService.addSavedWork(applicantId, workId);
         
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
  