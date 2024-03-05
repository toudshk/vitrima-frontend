import Image from "next/image";
import Link from "next/link";
import { FC } from "react";
import baseImage from "@/app/assets/images/base-avatar.jpg";
import styles from "./SearchList.module.scss";
import { IWidgetWork } from "../work.types";

const SearchList: FC<{ works: IWidgetWork[], setSearchTerm: any }> = ({ works, setSearchTerm }) => {
  const clearSearchTerm = () => {
    return setSearchTerm("");
  };
  return (

      <div className={styles.wrapper}  onClick={clearSearchTerm}>
        <div className={styles.list}>
        {works.length ? (
          works.map((work) => (
            <Link key={work._id} href={`/profile/${work.contractorId._id}`}>
              <Image
                loading="lazy"
                className="rounded-l-lg transition-opacity opacity-0 duration-[0.7s]"
                src={work.images[0]}
                width={180}
                height={300}
                onLoadingComplete={(image) =>
                  image.classList.remove("opacity-0")
                }
                alt={work.title}
                draggable={false}
              />

              <div className={styles.textBlock}>
                <span>{work.title}</span>

                <div className={styles.author}>
                  <Image
                    className={styles.profileImg}
                    src={
                      work.contractorId.image
                        ? work.contractorId.image
                        : baseImage
                    }
                    alt={""}
                    height={60}
                    width={60}
                  />
                  <div className="flex justify-between">
                    <p>{work.contractorId.nickname}</p>
                    {/* <p className={styles.link}>Перейти в профиль {">"}</p> */}
                  </div>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <div className="text-gray-500 text-3xl text-center my-[23%]">Таких работ нет</div>
        )}
        </div>
      </div>
    
  );
};

export default SearchList;
