import { memo } from "react";
import { Row } from "./Row";
export const Rows = memo(
  (props) => {
    const {
      category,
      handleChangeByPercentage,
      handleChangeByValue,
      rowNumbers,
      index,
      rowDeepness = 0,
    } = props;

    const rowNumber = `${rowNumbers}${rowDeepness > 0 ? `.${index + 1}` : ""}`;

    return (
      <>
        <Row
          key={category.id}
          category={category}
          handleChangeByPercentage={handleChangeByPercentage}
          handleChangeByValue={handleChangeByValue}
          rowDeepness={rowDeepness}
          rowNumber={rowNumber}
        />
        {category.children &&
          category.children.map((child, index) => {
            const rowNumbers = `${rowNumber}`;
            return (
              <Rows
                key={child.id}
                category={child}
                handleChangeByPercentage={handleChangeByPercentage}
                handleChangeByValue={handleChangeByValue}
                rowDeepness={rowDeepness + 1}
                rowNumbers={rowNumbers}
                index={index}
              />
            );
          })}
      </>
    );
  },
  (prevProps, nextProps) =>
    prevProps.category.value === nextProps.category.value
);
