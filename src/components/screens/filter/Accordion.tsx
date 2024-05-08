"use client";
import "react-dadata/dist/react-dadata.css";
import { AddressSuggestions } from "react-dadata";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { makeStyles } from "@mui/styles";
import dynamic from "next/dynamic";
import styles from "./Accordion.module.scss";
import { Controller, useForm } from "react-hook-form";
import PriceFilter from "./price-category/PriceFilter";
import { IFilterInput } from "./Filter.interface";
import { useGallery } from "../main-page/UseGallery";
import { useDispatch, useSelector } from "react-redux";
import { selectFilter, updateFilter } from "@/store/work/filter.slice";
import { SyntheticEvent, useState } from "react";
import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import SecondButton from "@/components/ui/Button/SecondButton";
import { usePathname } from "next/navigation";
import { useBuildingTechnique } from "@/hooks/buildingTechnique/useBuildingTechnique";
import { useTypePurpose } from "../add-work/usePurposeTypes";

const DynamicSelect = dynamic(() => import("./select-filter/SelectForFilter"), {
  ssr: false,
});
const DADATA_KEY = "4a9e155a8d8b3989ac9f4a5e58269c44c65f049b";
const useStyles = makeStyles({
  accordion: {
    backgroundColor: "#eaeaea",

    boxShadow: "none",
    marginBottom: "3vw",

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
  horizontalToggleButtonGroup: {
    display: "flex",
  },
  horizontalToggleButton: {
    position: "relative",
    border: "none",
    width: "auto",
    fontSize: "1vw",
    marginLeft: "0",
  },
  checkbox: {
    position: "absolute",
    left: "5px",
    border: "black",
    "&.Mui-checked": {
      color: "#EAEAEA",
    },
  },
});
interface ControlledAccordionsProps {
  setCurrentSubType: any; // Adjust the type based on your actual implementation
  subTypes: any; // Adjust the type based on your actual implementation
}

export default function ControlledAccordions({
  setCurrentSubType,
  subTypes,
}: ControlledAccordionsProps) {
  if (subTypes && subTypes.length > 0) {
    subTypes.sort(function (a: { label: string }, b: { label: string }) {
      var labelA = a.label.toUpperCase(); // Преобразование к верхнему регистру для учёта регистра
      var labelB = b.label.toUpperCase();
      if (labelA < labelB) {
        return -1;
      }
      if (labelA > labelB) {
        return 1;
      }
      // Если labelA и labelB равны
      return 0;
    });
  } else {
    console.log("Ошибка: subTypes не определён или пуст.");
  }

  const pathname = usePathname().substring(1);
  const classes = useStyles();
  const [expanded, setExpanded] = useState<string[]>([]);
  const [selectedValue, setSelectedValue] = useState<string | null>(null);

  const { control, handleSubmit, reset } = useForm<IFilterInput>({
    mode: "onChange",
  });

  const [localMinPrice, setLocalMinPrice] = useState<any>(undefined);
  const [localMaxPrice, setLocalMaxPrice] = useState<any>(undefined);
  const [selectedSubTypes, setSelectedSubTypes] = useState<string>("");
  const [selectedPurposeTypes, setSelectedPurposeTypes] = useState<string>("");

  const [selectedBuildingTechnique, setSelectedBuildingTechnique] = useState<
    string[]
  >([]);
  const [selectedLocation, setSelectedLocation] = useState<string>();

  const handleBuildingTechniqueChange = (selectedBuildingTechnique: any[]) => {
    const selectedIds = selectedBuildingTechnique.map(
      (option: { value: any }) => option.value
    );
    setSelectedBuildingTechnique(selectedIds);
  };
  const handleTypePurposeChange = (selectedValues: any[]) => {
    const selectedIds = selectedValues.map((option: { value: any; }) => option.value);
    setSelectedPurposeTypes(selectedIds.join(","));
  };

  const [contractorType, setContractorType] = useState<string | null>(null);

  const dispatch = useDispatch();
  const { minPrice, maxPrice } = useSelector(selectFilter);
  const { data: buildingTechnique } = useBuildingTechnique();
  const { data: purposeTypes } = useTypePurpose();

  const handleSubTypesChange = (selectedValues: any[]) => {
    const selectedIds = selectedValues.map((option) => option.value);
    setSelectedSubTypes(selectedIds.join(","));
  };
  const handleLocationChange = (selectedValue: any) => {
    setSelectedLocation(selectedValue.data.region_fias_id);
  };
  const handleUpdateButtonClick = () => {
    // Обновление состояния Redux только при нажатии на кнопку "Update"
    dispatch(
      updateFilter({
        minPrice: localMinPrice,
        maxPrice: localMaxPrice,
        subTypes: selectedSubTypes,
        purposeTypes: selectedPurposeTypes,
        contractorType: contractorType,
        buildingTechnique: selectedBuildingTechnique,
        location: selectedLocation,
      })
    );
  };

  const { data } = useGallery(pathname, {
    minPrice,
    maxPrice,
    purposeTypes: selectedPurposeTypes,
    subTypes: selectedSubTypes,
    contractorType,
    location,
  });

  const handleChangeType = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string
  ) => {
    setContractorType(newAlignment);
    setSelectedValue(newAlignment);
  };
  const filterReset = () => {
    dispatch(
      updateFilter({
        minPrice: 0,
        maxPrice: 1000000000,
        subTypes: [],
        purposeTypes: [],
        contractorType: undefined,
        buildingTechnique: undefined,
        location: undefined,
      })
    );
    setLocalMinPrice(0);
    setLocalMaxPrice(1000000000);
    setContractorType(null);
    setSelectedSubTypes("");
    setSelectedPurposeTypes("");
    setSelectedBuildingTechnique([]);
    setSelectedLocation(undefined);
  };

  const handleChange =
    (panel: string) => (_event: SyntheticEvent, isExpanded: boolean) => {
      setExpanded((prevExpanded) => {
        if (isExpanded) {
          return [...prevExpanded, panel];
        } else {
          return prevExpanded.filter((item) => item !== panel);
        }
      });
    };

  return (
    <div className={styles.accordionBlock}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleUpdateButtonClick();
        }}
      >
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
            <p className={styles.title}>Цена</p>
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
        {/* <Accordion
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
            <p className={styles.title}>Вид предпринимательства</p>
          </AccordionSummary>
          <AccordionDetails className={classes.contentAccordion}>
            <ToggleButtonGroup
              className={classes.horizontalToggleButtonGroup}
              orientation="vertical"
              value={contractorType}
              onChange={handleChangeType}
              exclusive
              aria-label="Toggle buttons"
            >
              <ToggleButton
                value="INDIVIDUAL"
                className={classes.horizontalToggleButton}
              >
                <Checkbox
                  className={classes.checkbox}
                  checked={selectedValue === "INDIVIDUAL"}
                />
                <h2 className={styles.checkBoxTitle}>ИП</h2>
              </ToggleButton>
              <ToggleButton
                value="LEGAL"
                className={classes.horizontalToggleButton}
              >
                <Checkbox
                  className={classes.checkbox}
                  checked={selectedValue === "LEGAL"}
                />
                <h2 className={styles.checkBoxTitle}>Юр. лицо</h2>
              </ToggleButton>
            </ToggleButtonGroup>
          </AccordionDetails>
        </Accordion> */}
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
            <p className={styles.title}>Стили</p>
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
                  title={'стиль'}
                  field={field}
                  options={subTypes}
                  isMulti
                  onSelectChange={handleSubTypesChange}
                  setCurrentSubType={setCurrentSubType}
                />
              )}
            />
          </AccordionDetails>
        </Accordion>

        <Accordion
          expanded={expanded.includes("panel4")}
          onChange={handleChange("panel4")}
          className={classes.accordion}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel4bh-content"
            id="panel4bh-header"
            className={classes.titleAccordion}
          >
            <p className={styles.title}>Назначение</p>
          </AccordionSummary>
          <AccordionDetails
            onKeyDown={(e) => e.stopPropagation()}
            className={classes.contentAccordion}
          >
            <Controller
              name="purposeTypes"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <DynamicSelect
                   title={'назначение'}
                error={error}
                field={field}
                options={purposeTypes || []}
                isMulti
                onSelectChange={handleTypePurposeChange}
                setCurrentSubType={setCurrentSubType}
              />
              )}
            />
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded.includes("panel5")}
          onChange={handleChange("panel5")}
          className={classes.accordion}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel5bh-content"
            id="panel5bh-header"
            className={classes.titleAccordion}
          >
            <p className={styles.title}>Расположение</p>
          </AccordionSummary>
          <AccordionDetails
            className={classes.contentAccordion}
            onKeyDown={(e) => e.stopPropagation()}
          >
            <Controller
              name="location"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <AddressSuggestions
                  count={4}
                  inputProps={{
                    placeholder: "Начните вводить область",
                    tabIndex: 0,
                    className:
                      "border  border-gray-400 w-full px-3 text-xl py-3 rounded-2xl bg-gray-300 transition-colors focus-within:border-primary  ",
                  }}
                  token={DADATA_KEY}
                  onChange={(newValue) => {
                    // Проверьте данные в консоли
                    handleLocationChange(newValue);
                  }}
                  value={field.value}
                  filterFromBound="region"
                  filterToBound="region"
                  filterLocations={[{ country: "россия" }]}
                />
              )}
              rules={{
                required: "Выбор",
              }}
            />
          </AccordionDetails>
        </Accordion>

        {pathname === "architecture" && (
          <Accordion
            expanded={expanded.includes("panel6")}
            onChange={handleChange("panel6")}
            className={classes.accordion}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel6bh-content"
              id="panel6bh-header"
              className={classes.titleAccordion}
            >
              <p className={styles.title}>Технологии строительства</p>
            </AccordionSummary>
            <AccordionDetails
              onKeyDown={(e) => e.stopPropagation()}
              className={classes.contentAccordion}
            >
              <Controller
                name="buildingTechnique"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <DynamicSelect
                    error={error}
                       title={'технику'}
                    field={field}
                    options={buildingTechnique || []}
                    isMulti
                    onSelectChange={handleBuildingTechniqueChange} setCurrentSubType={undefined}                   
                  />
                )}
              />
            </AccordionDetails>
          </Accordion>
        )}

        <div className={styles.buttons}>
          <SecondButton type="submit">Применть</SecondButton>
          <button
            className="text-primary border border-primary px-[3vw] rounded-2xl text-xl"
            type="reset"
            onClick={() => filterReset()}
          >
            Сбросить
          </button>
        </div>
      </form>
    </div>
  );
}
