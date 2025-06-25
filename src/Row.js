import { memo, useState } from "react";

export const Row = memo(
  (props) => {
    const {
      category,
      handleChangeByPercentage,
      handleChangeByValue,
      rowDeepness,
      rowNumber,
    } = props;

    let updatedLabel = `${Array.from({ length: rowDeepness }, () => "-").join(
      ""
    )} ${rowNumber} ${category.label}`;
    const [rowInput, setRowInput] = useState();
    return (
      <>
        <tr key={category.id}>
          <td className="label">{updatedLabel}</td>
          <td>{category?.value?.toFixed(3)}</td>

          <td>
            <input
              type="number"
              onChange={(e) => {
                e.target.value && setRowInput(parseFloat(e.target.value));
              }}
            />
          </td>
          <td>
            <button
              // disabled={!rowInput}
              onClick={(e) => {
                console.log(rowInput);

                rowInput && handleChangeByPercentage(category.id, rowInput);
              }}
            >{`Change by ${rowInput || ""}%`}</button>
          </td>
          <td>
            <button
              // disabled={!rowInput}
              onClick={(e) => {
                console.log(rowInput);

                rowInput && handleChangeByValue(category.id, rowInput);
              }}
            >{`Change by ${rowInput || ""}`}</button>
          </td>
          <td>{`${category?.variance?.toFixed(3) || "0"}%`}</td>
        </tr>
      </>
    );
  },
  (prevProps, nextProps) =>
    prevProps.category.value === nextProps.category.value
);
