import { AdminService } from "@/services/admin/admin.service";
import { FC } from "react";
import { useQuery } from "react-query";
import clsx from "clsx";
import styles from "./statistcs.module.scss";
import SkeletonLoader from "@/components/ui/skeleton-loader/skeletonLoader";

const CountUsers: FC = () => {
  const { isLoading: isLoadingContractors, data: responseContractors } =
  useQuery('CountContractors', () => AdminService.getCountContractors());
const { isLoading: isLoadingApplicants, data: responseApplicants } = useQuery(
  'CountApplicants',
  () => AdminService.getCountApplicants()
);

const isLoading = isLoadingContractors || isLoadingApplicants;

  return (
    <>
    <div className={clsx(styles.block, styles.countUsers)}>
      {isLoading ? (
        <SkeletonLoader className="h-48"/>
      ) : (
        <div className={styles.number}>{responseContractors?.data}</div>
      )}
      <div className={styles.description}>количество подрядчиков</div>
     </div>
      <div className={clsx(styles.block, styles.countUsers)}>
      {isLoading ? (
        <SkeletonLoader  className="h-48"/>
      ) : (
        <div className={styles.number}>{responseApplicants?.data}</div>
      )}
      <div className={styles.description}>количество соискателей</div>
    </div>
    </>
  );
};

export default CountUsers;
