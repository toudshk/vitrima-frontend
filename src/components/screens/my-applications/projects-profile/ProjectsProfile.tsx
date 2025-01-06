"use client";
import { FC, useRef } from "react";
import plusMarkSvg from "@/app/assets/images/plus.svg";
import styles from "./ProjectProfile.module.scss";
import { IProject } from "@/components/shared/types/project.types";
import { setCurrentChat } from "@/store/chat/chat.slice";
import baseImage from "@/app/assets/images/base-avatar.jpg";
import { convertMongoDate } from "@/utils/date/ConverMongoDate";
import { IContractor } from "@/components/shared/types/user.types";
import DesignerBlock from "./designer-block/DesignerBlock";
import { useFinishedProject } from "../../project/finished-project/useFinishedProject";
import { useDispatch } from "react-redux";
import { useSupportInfo } from "@/hooks/support/useSupportInfo";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import MainButton from "@/components/ui/Button/MainButton";

const ProjectsProfile: FC = () => {
  const designersRef = useRef<HTMLDivElement>(null);
  const { data, isLoading } = useFinishedProject();

  const router = useRouter();
  const { user } = useAuth();
  const { data: supportData } = useSupportInfo();

  const dispatch = useDispatch();
  const scrollSlider = (
    ref: React.RefObject<HTMLDivElement>,
    direction: "left" | "right"
  ) => {
    if (ref.current) {
      const scrollAmount = direction === "left" ? -300 : 300;
      ref.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };
  const handleRedirectToChat = () => {
    dispatch(setCurrentChat({ members: [supportData?._id, user?._id] }));
    router.push(`/chat`);
  };
  return (
    <>
      {isLoading ? (
        <div>Загрузка</div>
      ) : (
        <div className={styles.wrapper}>
          <div className='flex justify-between mb-2 items-center'>
          <p className={styles.createdAt}>{convertMongoDate(data.createdAt)}</p>
          <button className={styles.linkToChat} onClick={() => handleRedirectToChat()}>Чат с поддержкой</button>
          </div>
          {(data.potentialDesigners === null || data.potentialDesigners) && (
            <div className={styles.item}>
              <p className={styles.title}>подбор дизайнера</p>
              <div className={styles.sliderContainer}>
                <div ref={designersRef} className={styles.designersList}>
                  {data.chosenDesigner ? (
                    <DesignerBlock
                      key={data.chosenDesigner._id}
                      data={data?.chosenDesigner}
                      projectId={data._id}
                      isChosenDesigner={true}
                    />
                  ) : (
                    data.potentialDesigners?.map((designer: IContractor) => (
                      <DesignerBlock
                        key={designer._id}
                        data={designer}
                        projectId={data._id}
                        isChosenDesigner={false}
                      />
                    ))
                  )}
                  {data.potentialDesigners.length === 0 && (
                    <p className="pl-3 text-xl">
                      Немного времени и мы найдем вам лучших дизайнеров,
                      ожидайте
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}
          <p>
            {(data.chosenBuilders === null || data.chosenBuilders) && (
              <div className={styles.item}>
                <p className={styles.title}>подбор строителя</p>
                {data.chosenBuilders ? (
                  <div className="pl-3">Строитель найден, проверьте чат</div>
                ) : (
                  <div className="pl-3">В процессе подбора</div>
                )}
              </div>
            )}
          </p>

          {(data.chosenCarpenter === null || data.chosenCarpenter) && (
            <div className={styles.item}>
              <p> производителя</p>
            </div>
          )}
          {(data.constructionManagement === null ||
            data.constructionManagement) && (
            <div className={styles.item}>
              <p>ведение стройки онлайн</p>
            </div>
          )}

          {(data.drawings === null || data.drawings) && (
            <div className={styles.item}>
              <p className={styles.title}>проверка чертежей</p>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default ProjectsProfile;
