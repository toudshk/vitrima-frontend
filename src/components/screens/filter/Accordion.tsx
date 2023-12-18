"use client";
import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { makeStyles } from "@mui/styles";
import dynamic from "next/dynamic";
import { useSubTypes } from "../add-work/useSubTypes";
import { Controller, useForm } from "react-hook-form";
import MainButton from "@/components/ui/Button/MainButton";
import PriceFilter from "./price-category/PriceFilter";
import { IFilterInput } from "./Filter.interface";
import { useGalleryInterior } from "../main-page-interior/UseGalleryInterior";
import { useDispatch, useSelector } from "react-redux";
import { selectFilter, updateFilter } from "@/store/work/filter.slice";

const DynamicSelect = dynamic(() => import("./select-filter/SelectForFilter"), {
  ssr: false,
});

const useStyles = makeStyles({
  accordion: {
    backgroundColor: "#eaeaea",
    boxShadow: "none",
    marginBottom: "40px",

    // Добавим пустой псевдоэлемент ::before
    "&::before": {
      content: "none",
    },
  },
  titleAccordion: {
    borderBottom: "1px solid #ABABAB",
    paddingLeft: "0px",
    paddingRight: "0px",
  },
  contentAccordion: {
    paddingLeft: "0px",
    paddingRight: "0px",
  },
});

export default function ControlledAccordions() {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState<string[]>([]);
  const { data: subTypes, isLoading: isSubTypeLoading } = useSubTypes(
    "656c0a3cfad5c309cd6a9433"
  );

  const { control, handleSubmit } = useForm<IFilterInput>({
    mode: "onChange",
  });

  const [localMinPrice, setLocalMinPrice] = React.useState<number | undefined>(
    undefined
  );
  const [localMaxPrice, setLocalMaxPrice] = React.useState<number | undefined>(
    undefined
  );
  const [selectedSubTypes, setSelectedSubTypes] = React.useState<string[]>([]);

  const dispatch = useDispatch();
  const { minPrice, maxPrice } = useSelector(selectFilter);

  
  
  const handleSubTypesChange = (selectedValues) => {
    console.log('Selected subTypes:', selectedValues);
    const selectedIds = selectedValues.map((option) => option.value);
  
    // Если вы хотите передать как строку (если isMulti === false)
    setSelectedSubTypes(selectedIds.join(','));
  
    // Если вы хотите передать как массив строк
    //setSelectedSubTypes(selectedIds);
  };
  const handleUpdateButtonClick = () => {
    // Обновление состояния Redux только при нажатии на кнопку "Update"
    dispatch(updateFilter({
      minPrice: localMinPrice,
      maxPrice: localMaxPrice,
      subTypes: selectedSubTypes,
    }));
  };

  const { data, isLoading } = useGalleryInterior("interior", {
    minPrice,
    maxPrice,
    subTypes: selectedSubTypes,
  });

  const handleChange =
    (panel: string) => (_event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded((prevExpanded) => {
        if (isExpanded) {
          return [...prevExpanded, panel];
        } else {
          return prevExpanded.filter((item) => item !== panel);
        }
      });
    };

  return (
    <div className="w-[24vw]">
      <form onSubmit={handleSubmit(handleUpdateButtonClick)}>
        <Accordion
          expanded={expanded.includes("panel1")}
          onChange={handleChange("panel1")}
          className={classes.accordion}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
            className={classes.titleAccordion}
          >
            <p className="text-4xl ">Цена</p>
          </AccordionSummary>
          <AccordionDetails
            onKeyDown={(e) => e.stopPropagation()}
            className={classes.contentAccordion}
          >
            <PriceFilter
              minPrice={localMinPrice}
              maxPrice={localMaxPrice}
              setMinPrice={setLocalMinPrice}
              setMaxPrice={setLocalMaxPrice}
            />
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded.includes("panel2")}
          onChange={handleChange("panel2")}
          className={classes.accordion}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2bh-content"
            id="panel2bh-header"
            className={classes.titleAccordion}
          >
            <p className="text-4xl">Вид предпринимательства</p>
          </AccordionSummary>
          <AccordionDetails className={classes.contentAccordion}>
            <p className="text-4xl">пункты такие-то такие</p>
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded.includes("panel3")}
          onChange={handleChange("panel3")}
          className={classes.accordion}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel3bh-content"
            id="panel3bh-header"
            className={classes.titleAccordion}
          >
            <p className="text-4xl">Стили</p>
          </AccordionSummary>
          <AccordionDetails
            onKeyDown={(e) => e.stopPropagation()}
            className={classes.contentAccordion}
          >
            <Controller
              name="subTypes"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <DynamicSelect
                  error={error}
                  field={field}
                  options={subTypes || []}
                  isLoading={isSubTypeLoading}
                  isMulti
                  onSelectChange={handleSubTypesChange}
                />
              )}
            />
          </AccordionDetails>
        </Accordion>
        {/* <Accordion
        expanded={expanded.includes("panel4")}
        onChange={handleChange("panel4")}
       
        className={classes.accordion}

      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel4bh-content"
          id="panel4bh-header"
        >
          <p className="text-4xl">Теги</p>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>выбор тегов</Typography>
        </AccordionDetails>
      </Accordion> */}
        <Accordion
          expanded={expanded.includes("panel5")}
          onChange={handleChange("panel5")}
          className={classes.accordion}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel4bh-content"
            id="panel4bh-header"
            className={classes.titleAccordion}
          >
            <p className="text-4xl">Расположение</p>
          </AccordionSummary>
          <AccordionDetails className={classes.contentAccordion}>
            <Typography>введите свое расположение</Typography>
          </AccordionDetails>
        </Accordion>
        <MainButton type="submit">Update</MainButton>
      </form>
    </div>
  );
}
