import { Fragment, useState } from "react";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Image from "next/image";
import ControlledAccordions from "./Accordion";
import SkeletonLoader from "@/components/ui/skeleton-loader/skeletonLoader";
import { useSubTypes } from "../add-work/useSubTypes";
import { usePathname } from 'next/navigation'
 import styles from './Filter.module.scss'
type Anchor = "right";

export default function Filter() {
  const pathname = usePathname()
  const interiorId =  '656c0a3cfad5c309cd6a9433'
  const architectureId = '656c0a67fad5c309cd6a9853' 
  const typeId = pathname === '/architecture' ? architectureId: interiorId;

  const [state, setState] = useState({
    right: false,
  });
  const { data: subTypes, isLoading: isSubTypeLoading } = useSubTypes(
    typeId
  );
  const [currentSubType, setCurrentSubType] = useState(null);

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
        <div className="mr-[4.1vw]" >
          <ControlledAccordions
            setCurrentSubType={setCurrentSubType}
            subTypes={subTypes}
          />
        </div>
        <div className={styles.imageBlock}>
          {isSubTypeLoading ? (
            <SkeletonLoader count={1} />
          ) : (
            currentSubType !== null && (
              <Image

                src={currentSubType?.image}
                width={300}
                height={200} 
                alt=""
                className="transition-opacity opacity-0 duration-[0.7s] mb-[2vw] w-[17vw]"
        onLoadingComplete={(image) => image.classList.remove('opacity-0')}
              />
            )
          )}

          <h2 className="text-[2vw] mb-[2vw]">{currentSubType?.label}</h2>
          <p className="text-gray-600 text-[1.1vw]">{currentSubType?.description}</p>
        </div>
      </div>
    </Box>
  );

  return (
    <div >
      {(["right"] as const).map((anchor) => (
        <Fragment key={anchor}>
          <button
            className={"text-[2.3vh] text-gray-300 uppercase mr-[1vw]"}
            onClick={toggleDrawer(anchor, true)}
          >
            Фильтр
          </button>
          <SwipeableDrawer
          PaperProps={{
            style: {
              backgroundColor: 'rgb(234 234 234)'
            }
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
