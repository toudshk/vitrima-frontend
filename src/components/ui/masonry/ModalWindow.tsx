import { FC } from "react";
import {
  Dialog,
  DialogContent,
} from "@mui/material";
import { IWork } from "@/components/shared/types/work.types";
import Image from "next/image";
import styles from "./ModalWindow.module.scss";
import SkeletonLoader from "../skeleton-loader/skeletonLoader";
import Link from "next/link";
import { makeStyles } from "@mui/styles";
import Tags from "@/components/screens/profile/contractor-profile/second-works/tags/Tags";
import { useSimilarWorks } from "./useSimilarWorks";
import MasonryGallery from "./MasonryGallery";
interface IModalWindow {
  open: any;
  workData: IWork;
  handleClose: any;
  isLoading: any;
  scroll: any;
}

const useStyles = makeStyles((theme) => ({
  customDialogContent: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
}));

const ModalWindow: FC<IModalWindow> = ({
  open,
  workData,
  handleClose,
  isLoading,
  scroll,
}) => {
  const classes = useStyles();
  console.log(workData);
  
 
  const subTypes = workData?.subTypes || []; // Ensure subTypes is an array, default to an empty array if undefined

  const { data: similarWorksData, isLoading: similarWorkLoading } =
    useSimilarWorks(subTypes);

  return (
    <Dialog
      fullWidth
      maxWidth="xl"
      open={open}
      onClose={handleClose}
      scroll={scroll}
      disableScrollLock
    >
      <DialogContent dividers={scroll === "body"}>
        <div className={styles.content}>
          <div className={styles.selectedWork}>
            <div className="min-w-[50%]  mr-12">
              <Image
                className={styles.image}
                width={700}
                height={500}
                src={workData?.images[0]}
                alt={""}
              />
            </div>
            <div className={styles.textBlock}>
              <div>
                <div className={styles.title}>{workData?.title}</div>
                <div className={styles.description}>
                  {workData?.description}
                </div>
              </div>
              <div className="w-full">
                <div className="flex h-14 items-center mb-6">
                  <Image
                    src={workData?.contractorId.image}
                    width={40}
                    height={40}
                    alt={""}
                    className="rounded-full mr-3 h-10"
                  />
                  <div>
                    <div className="text-xl font-semibold">
                      {workData?.contractorId.nickname}
                    </div>
                    <div className="flex">
                      <p className="text-gray-450 mr-2">Подписчики</p>
                      {workData?.contractorId.subscribers.length}
                    </div>
                  </div>
                </div>

                <Link
                  className={styles.link}
                  href={`/profile/${workData?.contractorId._id}`}
                >
                  Смотреть профиль
                </Link>
              </div>
            </div>
          </div>
         
  <Tags title={"Теги"} tagData={workData?.tags} isLoading={isLoading} />
{similarWorksData?.length > 0 && (  
        <div>
          <h1 className="text-3xl mb-6">Похожее</h1>
          <MasonryGallery
            data={similarWorksData}
            isLoading={similarWorkLoading}
          />
        </div>)}
         </div>
      </DialogContent>
    </Dialog>
  );
};

export default ModalWindow;
