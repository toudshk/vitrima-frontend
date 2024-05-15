import { WorkService } from "@/services/work/work.service"
import { useEffect } from "react"
import { useMutation } from "react-query"

export const useUpdateCountViews = (workSlug:any) => {
	const { mutateAsync } = useMutation('update count views', () =>
	  WorkService.updateCountViews(workSlug)
	);
  
	useEffect(() => {
	  if (workSlug) {
		mutateAsync();
	  }
	}, [workSlug, mutateAsync]);
  };