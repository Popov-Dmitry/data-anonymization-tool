import "./Methods.scss";
import React, { useState } from "react";
import { bemElement } from "../../utils/bem-class-names";
import { Accordion, AccordionDetails, AccordionSummary, Button, Typography } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
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

const baseClassName = "methods";
const bem = bemElement(baseClassName);

interface IMethodsData {
  columns: string[];
}

const Methods = ({ columns }: IMethodsData) => {
  const [showApplyMethodsModal, setShowApplyMethodsModal] = useState<boolean>(false);
  
  const onApply = () => {

  };

  return (
    <div className={baseClassName}>
      <Typography variant="h5" className={`${baseClassName}-title`}>
        Настройка методов обезличивания
      </Typography>
      <div className={bem("list")}>
        <Typography variant="h6">Для групп столбцов</Typography>
        <div>
          <Shuffle columns={columns} />
          <MicroAggregation columns={columns} />
          <MicroAggregationBySingleAxis columns={columns} />
          <Identifier columns={columns} />
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
              <DateAging />
              <Decomposition />
              <GeneralizationString />
              <GeneralizationValue />
              <Round />
              <ValueReplacement />
              <ValueReplacementByPattern />
              <ValueReplacementFromFile />
              <ValueVariance />
            </AccordionDetails>
          </Accordion>
        ))}
      </div>
      <div className={bem("button")}>
        <Button
          variant="contained"
          fullWidth
          onClick={() => setShowApplyMethodsModal(true)}
        >
          Готово
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