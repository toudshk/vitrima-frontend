import { FC, useEffect, useState } from "react";
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
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import { useUser } from "@/components/screens/profile/useUser";
import TimeUpload from "../timeUpload/TimeUpload";

import ModalButtons from "./ModalButtons";
import { usePathname } from "next/navigation";
import { useUpdateCountViews } from "./useUpdateCountViews";
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

const useStyles = makeStyles({
  dialogPaper: {
    width: "100%",
    maxWidth: "none", // чтобы убрать ограничение по ширине
    margin: 0,
    cursor: "default",
    "@media (min-width:800px)": {
      height: "95%",
      maxHeight: "none",
      marginTop: "50px",
      borderRadius: "16px 16px 0 0",
    },
  },
  backdrop: {
    // Стили для заднего затемнения (Backdrop)
    zIndex: "-1000",
    cursor: "pointer", // курсор в виде указателя
  },
});

const ModalWindow: FC<IModalWindow> = ({
  open,
  workData,
  handleClose,
  isLoading,
  scroll,
}) => {
  const classes = useStyles();
  const [workSlug, setWorkSlug] = useState(null);

  useEffect(() => {
    if (workData?.slug) {
      setWorkSlug(workData.slug);
    }
  }, [workData]);

  useUpdateCountViews(workSlug);

  const { user } = useAuth();
  const subTypes = workData?.subTypes || [];
  const fullScreen = useMediaQuery(theme.breakpoints.down("lg"));

  const pathname = usePathname().substring(1);

  const { data: similarWorksData, isLoading: similarWorkLoading } =
    useSimilarWorks(subTypes);

  return (
    <Dialog
      classes={{ paper: classes.dialogPaper, container: classes.backdrop }}
      fullScreen={fullScreen}
      open={open}
      onClose={handleClose}
    >
      <DialogContent sx={{ padding: "0px" }}>
        <div className={styles.content}>
          <div className={styles.closeButton}>
            <button onClick={handleClose}>
              <CloseIcon />
            </button>
          </div>

          <div>
            <div className={styles.title}>{workData?.title}</div>
            {["interior", "architecture"].includes(pathname) && (
              <div className={styles.userInfoBlock}>
                <div className="flex items-center justify-between">
                  <div className="flex h-14  items-center my-6 w-3/4">
                    <Link href={`/profile/${workData?.contractorId._id}`}>
                      <Image
                        src={
                          workData?.contractorId.image
                            ? workData.contractorId.image
                            : baseImage
                        }
                        width={120}
                        height={120}
                        alt={""}
                        className="rounded-full mr-3 h-14 w-14 image-like-bg"
                      />
                    </Link>
                    <div className="block w-[75%]">
                      <Link
                        className={styles.nickname}
                        href={`/profile/${workData?.contractorId._id}`}
                      >
                        
                        {workData?.contractorId.nickname}
                      </Link>
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

                  <ModalButtons workData={workData} />
                </div>
              </div>
            )}
          </div>

          <div className={styles.selectedWork}>
            <Image
              className={styles.image}
              width={2500}
              height={2500}
              src={workData?.images[0]}
              alt={""}
            />
          </div>
          <div className={styles.bottomBlock}>
            <div className={styles.textBlock}>
              <div>
                <div className="flex justify-between">
                <TimeUpload date={workData?.createdAt} withIcon={true} />
                <div><RemoveRedEyeOutlinedIcon style={{ color: '#ABABAB', height: "18px" }}/>
              {workData?.countViews || 0}</div>
              </div>
                <p className={styles.description}>
                  {workData?.description}
                </p>
              </div>
            </div>
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
