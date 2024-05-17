import Image from "next/image";
import Link from "next/link";
import { FC } from "react";
import baseImage from "@/app/assets/images/base-avatar.jpg";
import styles from "./SearchList.module.scss";
import { IWidgetWork } from "../work.types";
import Masonry from "react-masonry-css";
import GalleryItem from "@/components/ui/masonry/GalleryItem";

import CloseIcon from "@mui/icons-material/Close";
const SearchList: FC<{ works: IWidgetWork[]; setSearchTerm: any }> = ({
  works,
  setSearchTerm,
}) => {
  console.log(works);
  const clearSearchTerm = () => {
    return setSearchTerm("");
  };
  return (
    <div className={styles.wrapper} onClick={clearSearchTerm}>
      <div className={styles.list}>
        <div className="container flex justify-end">
        <button onClick={clearSearchTerm} className="object">
          <CloseIcon />
        </button>
        </div>
        {works.length ? (
          works.map((item, index) => (
            <div key={item._id}>
              <Link
                href={`/profile/${item.contractorId?._id}`}
                className="cursor-pointer flex"
              >
                <Image
                  loading="lazy"
                  width={130}
                  height={150}
                  src={item.images[0]}
                  className="rounded-lg opacity-0 image-like-bg"
                  onLoadingComplete={(image) =>
                    image.classList.remove("opacity-0")
                  }
                  alt={`Фотография работы ${item.title}`}
                />
                <div className=" w-full pl-2">
                  <h4 className="text-gray-400 text-xs font-semibold">
                    {item.workType.title}
                  </h4>
                  <h3
                    className="text-base  rounded-b-lg mb-1 text-gray-700 font-semibold"
                    style={{ width: "calc(100% - 2px)" }}
                  >
                    {item.title}
                  </h3>
                  <h4 className="text-gray-400 text-xs font-semibold">
                    {item.contractorId?.nickname}
                  </h4>
                </div>
              </Link>
              {index < works.length - 1 && (
                <hr className="border-gray-300 my-4 border-1" />
              )}
            </div>
          ))
        ) : (
          <div className="text-gray-500 text-3xl text-center my-[23%]">
            Таких работ нет
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchList;
