"use client"
import { Fragment, useState } from "react";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Image from "next/image";
import ControlledAccordions from "./Accordion";
import SkeletonLoader from "@/components/ui/skeleton-loader/skeletonLoader";
import { useSubTypes } from "../add-work/useSubTypes";
import { usePathname } from "next/navigation";
import styles from "./Filter.module.scss";
import { ISubType } from "@/components/shared/types/work.types";
import { useMediaQuery } from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
type Anchor = "right";

export default function Filter() {
  const isMobile = useMediaQuery("(max-width:700px)");

  const pathname = usePathname();
  const interiorId = "656c0a3cfad5c309cd6a9433";
  const architectureId = "656c0a67fad5c309cd6a9853";
  const typeId = pathname === "/architecture" ? architectureId : interiorId;

  const [state, setState] = useState({
    right: false,
  });
  const { data: subTypes, isLoading: isSubTypeLoading } = useSubTypes(typeId);
  const [currentSubType, setCurrentSubType] = useState<ISubType | null>(null);
  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event &&
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setState({ ...state, [anchor]: open });
    };

  const list = (anchor: Anchor) => (
    <Box
      className="pt-[4vw] pl-[3vw]   h-full"
      role="presentation"
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <div className={styles.container}>
        <ControlledAccordions
          setCurrentSubType={setCurrentSubType}
          subTypes={subTypes}
          toggleDrawer={toggleDrawer}
          anchor={anchor}
        />

        <div className={styles.imageBlock}>
          {isSubTypeLoading ? (
            <SkeletonLoader count={1} />
          ) : (
            currentSubType !== null && (
              <Image
                src={currentSubType.image}
                width={300}
                height={200}
                alt=""
                className="transition-opacity opacity-0 duration-[0.7s] mb-[2vw] w-full"
                onLoadingComplete={(image) =>
                  image.classList.remove("opacity-0")
                }
              />
            )
          )}

          <h2 className={styles.title}>{currentSubType?.label}</h2>
          <p className={styles.subscription}>{currentSubType?.description}</p>
        </div>
      </div>
    </Box>
  );

  return (
    <div>
      {(["right"] as const).map((anchor) => (
        <Fragment key={anchor}>
          <button
            className={
              "text-primary items-center  text-xl font-bold p-2  rounded-2xl border border-gray-300 hover:bg-gray-300 "
            }
            onClick={toggleDrawer(anchor, true)}
          >
            <FilterListIcon className="pb-1" />
            Фильтр
          </button>
          <SwipeableDrawer
            PaperProps={{
              style: {
                backgroundColor: isMobile ? "#ffffff" : "rgb(234, 234, 234)",
              },
            }}
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
            onOpen={toggleDrawer(anchor, true)}
            disableEnforceFocus={true}
          >
            {list(anchor)}
          </SwipeableDrawer>
        </Fragment>
      ))}
    </div>
  );
}
