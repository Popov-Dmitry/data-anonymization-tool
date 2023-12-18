import "./Methods.scss";
import React, { useEffect, useState } from "react";
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
import { useRiskAssessment } from "../../providers/risk-assessment-provider";
import { useMethodsInputs } from "../../providers/methods-inputs-provider";

const baseClassName = "methods";
const bem = bemElement(baseClassName);

interface IMethodsData {
  columns: string[];
}

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

const Methods = ({ columns }: IMethodsData) => {
  const [showApplyMethodsModal, setShowApplyMethodsModal] = useState<boolean>(false);
  const [value, setValue] = React.useState(0);
  const { initAttributesType } = useRiskAssessment();
  const { triggerDataCollecting } = useMethodsInputs();

  useEffect(() => {
    initAttributesType(columns);
  }, [columns, initAttributesType]);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const onApply = () => {
    triggerDataCollecting();
    setShowApplyMethodsModal(true);
  };

  return (
    <div className={baseClassName}>
      <div>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs variant="fullWidth" value={value} onChange={handleChange}>
            <Tab label="Обезличивание" {...a11yProps(0)} />
            <Tab label="Оценка рисков" {...a11yProps(1)} />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          <Typography variant="h5" className={`${baseClassName}-title`}>
            Настройка методов обезличивания
          </Typography>
          <div className={bem("list")}>
            <Typography variant="h6">Для групп столбцов</Typography>
            <div>
              <Shuffle columns={columns} />
              <Identifier columns={columns} />
              <MicroAggregation columns={columns} />
              <MicroAggregationBySingleAxis columns={columns} />
            </div>
          </div>
          <div className={bem("list")}>
            <Typography variant="h6" className={bem("list-title")}>
              Для каждого столбца
            </Typography>
            {columns.map((column: string) => (
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
        <CustomTabPanel value={value} index={1}>
          <div>
            <Typography variant="h5" className={`${baseClassName}-title`}>
              Настройка методов оценки рисков
            </Typography>
            <Accordion className="my-16px">
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>Тип признака</Typography>
              </AccordionSummary>
              <AccordionDetails className={bem("list-content")}>
                {columns.map((column: string) => (
                  <Attribute column={column} />
                ))}
              </AccordionDetails>
            </Accordion>
            <RiskAssessmentMethod />
          </div>
        </CustomTabPanel>
        <div className={bem("button")}>
          <Button
            variant="contained"
            fullWidth
            onClick={onApply}
          >
            Запуск
          </Button>
        </div>
      </div>
      <ApplyMethodsModal
        show={showApplyMethodsModal}
        onHide={() => setShowApplyMethodsModal(false)}
      />
    </div>
  );
};

export default Methods;
