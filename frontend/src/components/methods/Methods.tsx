import "./Methods.scss";
import React, { useState } from "react";
import { bemElement } from "../../utils/bem-class-names";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Typography,
  Tabs,
  Tab,
  Box
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DateAging from "./DateAging";
import Decomposition from "./Decomposition";
import GeneralizationString from "./GeneralizationString";
import Identifier from "./Identifier";
import MicroAggregation from "./MicroAggregation";
import Round from "./Round";
import ValueReplacementByPattern from "./ValueReplacementByPattern";
import ValueVariance from "./ValueVariance";
import GeneralizationValue from "./GeneralizationValue";
import MicroAggregationBySingleAxis from "./MicroAggregationBySingleAxis";
import ValueReplacement from "./ValueReplacement";
import ValueReplacementFromFile from "./ValueReplacementFromFile";
import Shuffle from "./Shuffle";
import ApplyMethodsModal from "../modals/apply-methods-modal/ApplyMethodsModal";
import RiskAssessmentMethod from "../risk-assessment-method/RiskAssessmentMethod";
import Attribute from "../attribute/Attribute";
import { useMethodsInputs } from "../../providers/methods-inputs-provider";
import { useAttributes } from "../../providers/attributes-provider";
import DataType from "../data-type/DataType";

const baseClassName = "methods";
const bem = bemElement(baseClassName);

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <div className={bem("tab-content")}>
          {children}
        </div>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`
  };
}

const Methods = () => {
  const [showApplyMethodsModal, setShowApplyMethodsModal] = useState<boolean>(false);
  const [value, setValue] = React.useState(0);
  const { triggerDataCollecting } = useMethodsInputs();
  const { attributes } = useAttributes();

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const onApply = () => {
    triggerDataCollecting();
    setShowApplyMethodsModal(true);
  };

  return (
    <div className={baseClassName}>
      <div className={bem("container")}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs variant="fullWidth" value={value} onChange={handleChange}>
            <Tab label="Типы атрибутов" {...a11yProps(0)} />
            <Tab label="Обезличивание" {...a11yProps(1)} />
            <Tab label="Оценка рисков" {...a11yProps(2)} />
            <Tab label="Оценка информационных потерь" {...a11yProps(3)} />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          <div>
            <Typography variant="h5" className={`${baseClassName}-title`}>
              Настройка типов атрибутов
            </Typography>
            <Accordion className="my-16px">
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>Тип атрибута</Typography>
              </AccordionSummary>
              <AccordionDetails className={bem("list-content")}>
                {attributes.map((column: string) => (
                  <Attribute key={column} column={column} />
                ))}
              </AccordionDetails>
            </Accordion>
            <Accordion className="my-16px">
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>Тип данных атрибута</Typography>
              </AccordionSummary>
              <AccordionDetails className={bem("list-content")}>
                {attributes.map((column: string) => (
                  <DataType key={column} column={column} />
                ))}
              </AccordionDetails>
            </Accordion>
          </div>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <Typography variant="h5" className={`${baseClassName}-title`}>
            Настройка методов обезличивания
          </Typography>
          <div className={bem("list")}>
            <Typography variant="h6">Для групп атрибутов</Typography>
            <div>
              <Shuffle />
              <Identifier />
              <MicroAggregation />
              <MicroAggregationBySingleAxis />
            </div>
          </div>
          <div className={bem("list")}>
            <Typography variant="h6" className={bem("list-title")}>
              Для каждого атрибута
            </Typography>
            {attributes.map((column: string) => (
              <Accordion key={column}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography>{column}</Typography>
                </AccordionSummary>
                <AccordionDetails className={bem("list-content")}>
                  <Decomposition column={column} />
                  <ValueReplacement column={column} />
                  <ValueReplacementByPattern column={column} />
                  <ValueReplacementFromFile column={column} />
                  <GeneralizationString column={column} />
                  <GeneralizationValue column={column} />
                  <DateAging column={column} />
                  <Round column={column} />
                  <ValueVariance column={column} />
                </AccordionDetails>
              </Accordion>
            ))}
          </div>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          <div>
            <Typography variant="h5" className={`${baseClassName}-title`}>
              Настройка методов оценки рисков
            </Typography>
            <RiskAssessmentMethod className="my-16px" />
          </div>
        </CustomTabPanel>
      </div>
      <div className={bem("button")}>
        <Button
          variant="contained"
          fullWidth
          onClick={onApply}
        >
          Запуск
        </Button>
      </div>
      <ApplyMethodsModal
        show={showApplyMethodsModal}
        onHide={() => setShowApplyMethodsModal(false)}
      />
    </div>
  );
};

export default Methods;
