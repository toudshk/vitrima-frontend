import Image from "next/image";
import Link from "next/link";
import { FC } from "react";
import baseImage from "@/app/assets/images/base-avatar.jpg";
import styles from "./SearchList.module.scss";
import { IWidgetWork } from "../work.types";
import Masonry from "react-masonry-css";
import GalleryItem from "@/components/ui/masonry/GalleryItem";

const SearchList: FC<{ works: IWidgetWork[]; setSearchTerm: any }> = ({
  works,
  setSearchTerm,
}) => {
  const clearSearchTerm = () => {
    return setSearchTerm("");
  };
  return (
    <div className={styles.wrapper} onClick={clearSearchTerm}>
      <div className={styles.list}>
        {works.length ? (
          <Masonry breakpointCols={4} className="flex gap-3 mx-[1vw] ">
            {works.map((item) => (
              <Link key={item._id} href={`/profile/${item.contractorId._id}`} className=' cursor-pointer '>
                <Image
                  loading="lazy"
                  key={item._id}
                  width={200}
                  height={300}
                  src={item.images[0]}
                  className=" rounded-t-lg opacity-0 "
                  onLoadingComplete={(image) =>
                    image.classList.remove("opacity-0")
                  }
                  alt={`Фотография работы ${item.title}`}
                />
                <div className="text-base bg-gray-300 border-b-gray-400 border-r-gray-400 border-l-gray-400  rounded-b-lg pl-2 mb-2 text-gray-600"  style={{ width: 'calc(100% - 2px)' }}>
                {item.title}
                </div>
              </Link>
            ))}
          </Masonry>
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
