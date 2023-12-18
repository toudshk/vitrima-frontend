import * as React from "react";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";

import ControlledAccordions from "./Accordion";

type Anchor = "right";

export default function Filter() {
  const [state, setState] = React.useState({
    right: false,
  });

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
      className="pt-14 pl-16 bg-gray-300 h-full"
      role="presentation"
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <div className="w-[50vw] ">
        {/* {[
          "Цена",
          "Вид предпринимательства",
          "Стили",
          "Теги",
          "Расположение",
        ].map((text, index) => (
          
            <div key={text}  className="border-b-2 border-gray-400 w-[26vw] pb-3 mb-10">
              <p className="text-4xl ">{text}</p>

            </div>
  
        ))} */}
        <ControlledAccordions />
      </div>
      
    </Box>
   
  );

  return (
    <div>
      {(["right"] as const).map((anchor) => (
        <React.Fragment key={anchor}>
          <button
            className={"text-xl text-gray-300 uppercase"}
            onClick={toggleDrawer(anchor, true)}
          >
            Фильтр
          </button>
          <SwipeableDrawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
            onOpen={toggleDrawer(anchor, true)}
            disableEnforceFocus={true}
          >
            {list(anchor)}
          </SwipeableDrawer>
        </React.Fragment>


      ))}

</div>
      
  );
}
