import { UserService } from "@/services/user/user.service";
import { SubmitHandler } from "react-hook-form";
import { useMutation } from "react-query";

export const useRemoveSavedWork = (applicantId: string, workId: string) => {

   
  
  
    const { mutateAsync } = useMutation(
      "remove saved work",
      async () => {
        try {
          await UserService.removeSavedWork(applicantId, workId);
          
        } catch (error) {
          console.log(error, "remove saved work");
        }
      }
    );
  
    const onSubmit = async () => {
      await mutateAsync();
    };
  
    return { onSubmit };
  };
  