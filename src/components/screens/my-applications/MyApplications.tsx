"use client";

import { useAuth } from "@/hooks/useAuth";
import { useProjects } from "../profile/applicant-profile/useProject";
import { IProject } from "@/components/shared/types/project.types";
import Link from "next/link";
import NorthEastIcon from "@mui/icons-material/NorthEast";
import styles from "./MyApplications.module.scss";
import { convertMongoDate } from "@/utils/date/ConverMongoDate";
const MyApplications: React.FC = () => {
  const { user } = useAuth();
  const { data } = useProjects(user!._id);
console.log(data)
  return (
    <div className="flex flex-col gap-3 max-w-[1440px] px-2 mx-auto mt-[9vh]">
      {data ? (
        <div>
          <h1 className="text-5xl  text-gray-300 font-bold">У вас нет активных заявок</h1>
          
        </div>
      ) : (
        data?.map((project: IProject) => (
          <Link
            key={project._id}
            href={`my-applications/${project._id}`}
            className={styles.item}
          >
            <div>
              <p className={styles.createdAt}>
                {convertMongoDate(project.createdAt)}
              </p>
              Заявка
            </div>
            <NorthEastIcon />
          </Link>
        ))
      )}
    </div>
  );
};

export default MyApplications;
