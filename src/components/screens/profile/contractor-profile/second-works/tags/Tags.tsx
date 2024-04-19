import { FC } from "react";
import styles from "./Tags.module.scss";
import { useWorks } from "@/components/screens/profile/useWorks";
import SkeletonLoader from "@/components/ui/skeleton-loader/skeletonLoader";

interface ITag {
  tagData: any;
  isLoading: any;
  title: string;
}

const Tags: FC<ITag> = ({ tagData, isLoading, title }) => {
  if (isLoading) {
    return <SkeletonLoader />;
  }
  const uniqueTags = Array.from(
    new Set(tagData.map((tag: { _id: any }) => tag._id))
  );

  return (
    <div className="mb-16">
      <h1 className={styles.header}>{title}</h1>
      <div className={styles.tags}>
        {uniqueTags.map((tagId) => {
          const tag = tagData.find((tag: { _id: any }) => tag._id === tagId);

          return (
            <div key={tag._id} className={styles.tag}>
              {tag.title}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Tags;
