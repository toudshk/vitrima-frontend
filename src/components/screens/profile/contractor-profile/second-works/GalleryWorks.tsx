import { FC } from "react";
import Tags from "./tags/Tags";
import MasonryGallery from "@/components/ui/masonry/MasonryGallery";
import { useWork } from "../profile-works/useWork";

const GalleryWorks: FC = () => {
  const { data, isLoading } = useWork();
  const tagData = data?.flatMap((workItem) => workItem.tags);

console.log(data)
  return (
    <div>
      <div className="mb-20">
        <MasonryGallery data={data} />
      </div>
      <Tags tagData={tagData} isLoading={isLoading} title={"Работы представлены в следующих категориях"}/>
    </div>
  );
};

export default GalleryWorks;
