import { FC, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  createTheme,
  useMediaQuery,
} from "@mui/material";
import { IWork } from "@/components/shared/types/work.types";
import Image from "next/image";
import styles from "../ModalWindow.module.scss";
import SkeletonLoader from "../../skeleton-loader/skeletonLoader";
import Link from "next/link";
import { makeStyles } from "@mui/styles";
import Tags from "@/components/screens/profile/contractor-profile/second-works/tags/Tags";
import { useSimilarWorks } from "../useSimilarWorks";
import MasonryGallery from "../MasonryGallery";
import CloseIcon from "@mui/icons-material/Close";
import baseImage from "@/app/assets/images/base-avatar.jpg";
import { useAuth } from "@/hooks/useAuth";

import { useUser } from "@/components/screens/profile/useUser";
import TimeUpload from "../timeUpload/TimeUpload";

import ModalButtons from "./ModalButtons";
import { usePathname } from "next/navigation";
interface IModalWindow {
  open: any;
  workData: any;
  handleClose: any;
  isLoading: any;
  scroll: any;
}

const theme = createTheme({
  components: {
    MuiDialog: {
      styleOverrides: {
        paper: {
          maxWidth: "100%",
          width: "100%",
          margin: 0,
        },
      },
    },
  },
});

const ModalWindow: FC<IModalWindow> = ({
  open,
  workData,
  handleClose,
  isLoading,
  scroll,
}) => {
  const { user } = useAuth();
  const subTypes = workData?.subTypes || [];
  const fullScreen = useMediaQuery(theme.breakpoints.down("lg"));

  const pathname = usePathname().substring(1);

  const { data: similarWorksData, isLoading: similarWorkLoading } =
    useSimilarWorks(subTypes);

  return (
    <Dialog
      maxWidth="lg"
      fullScreen={fullScreen}
      open={open}
      onClose={handleClose}
      scroll={scroll}
      disableScrollLock
    >
      <DialogContent dividers={scroll === "body"} sx={{ padding: "0px" }}>
        <div className={styles.content}>
          <div className={styles.closeButton}>
            <button onClick={handleClose}>
              <CloseIcon />
            </button>
          </div>
          <div className={styles.selectedWork}>
            <Image
              className={styles.image}
              width={600}
              height={600}
              src={workData?.images[0]}
              alt={""}
            />

            <div className={styles.textBlock}>
              <div>
                <ModalButtons workData={workData} />
                <TimeUpload date={workData?.createdAt} withIcon={true} />

                <div className={styles.title}>{workData?.title}</div>
                <div className={styles.description}>
                  {workData?.description}
                </div>
              </div>
              {["interior", "architecture"].includes(pathname) && (
                <div className={styles.userInfoBlock}>
                  <div className="flex h-14  items-center my-6 ">
                    <Image
                      src={
                        workData?.contractorId.image
                          ? workData.contractorId.image
                          : baseImage
                      }
                      width={60}
                      height={60}
                      alt={""}
                      className="rounded-full mr-3 h-10 w-10 image-like-bg"
                    />

                    <div>
                      <div className="text-xl font-semibold">
                        {workData?.contractorId.nickname}
                      </div>
                      <div className="flex">
                        <p className="text-gray-450 text-base mr-2">
                          Подписчики{" "}
                        </p>
                        <p className="text-base">
                          {workData?.contractorId?.subscribers?.length}
                        </p>
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
              )}
            </div>
          </div>
          <div  className={styles.bottomBlock}>
            <Tags
              title={"Теги"}
              tagData={workData?.tags}
              isLoading={isLoading}
            />
            {similarWorksData?.length > 0 && (
              <div>
                <h1 className="text-3xl mb-6">Похожее</h1>
                <MasonryGallery
                  data={similarWorksData}
                  isLoading={similarWorkLoading}
                />
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ModalWindow;
