import { SubmitHandler, UseFormSetValue } from "react-hook-form";
import { useMutation, useQuery } from "react-query";
import toast from "react-hot-toast";

import { getKeys } from "@/utils/object/getKeys";
import { useCallback, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ProjectService } from "@/services/project/project.service";
import { IDesignerInput } from "./IDesingerInput";
import { IContractor } from "@/components/shared/types/user.types";

export const useDesigner = (selectedDesigners: any) => {
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const router = useRouter();
  const params = useParams();
  const projectId = params?.id;

  const queryData = useQuery(
    ["user list", projectId],
    () => ProjectService.getDesignerByProjectId(projectId),
    {
      enabled: !!projectId, // Ensure query runs only if projectId is available
      select: (data ) => data,
      onError: (error: unknown) => {
        console.error("Error fetching user list:", error);
      },
    }
  );

  const { mutateAsync } = useMutation(
    (designerIds: string[]) =>
      ProjectService.createPotentialDesigners(designerIds, projectId),
    {
      onError: () => {
        toast.error("An error occurred, please try again.");
      },
      onSuccess: () => {
        toast.success("Profile updated successfully.");
        router.back();
      },
    }
  );

  const onSubmit = useCallback(
    async (selectedDesigners: IContractor[]) => {
      const designerIds = selectedDesigners.map((designer) => designer._id);
      await mutateAsync(designerIds);
    },
    [mutateAsync] // Add dependencies here
  );

  return useMemo(
    () => ({
      onSubmit,
      isDataLoaded,
      ...queryData,
    }),
    [queryData, onSubmit, isDataLoaded] // Dependencies for memoization
  );
};
