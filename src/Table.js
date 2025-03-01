import { useEffect, useState } from "react";

const initialData = {
  rows: [
    {
      id: "electronics",
      label: "Electronics",
      value: 1400, //this value needs to be calculated from the children values (800+700)
      children: [
        {
          id: "phones",
          label: "Phones",
          value: 800,
        },
        {
          id: "laptops",
          label: "Laptops",
          value: 700,
        },
      ],
    },
    {
      id: "furniture",
      label: "Furniture",
      value: 1000, //this need to be calculated from the children values (300+700)
      children: [
        {
          id: "tables",
          label: "Tables",
          value: 300,
        },
        {
          id: "chairs",
          label: "Chairs",
          value: 700,
        },
      ],
    },
  ],
};

export const Table = () => {
  const [tableData, setTableData] = useState(initialData.rows);

  useEffect(() => {
    const updatedData = initialData.rows.map((category) => {
      const updatedChildren = category.children.map((child) => {
        return {
          ...child,
          originalValue: child.value,
          variance: 0,
        };
      });
      const totalValue = category.children.reduce(
        (sum, child) => sum + child.value,
        0
      );
      return {
        ...category,
        value: totalValue,
        originalValue: totalValue,
        children: updatedChildren,
        variance: 0,
      };
    });
    setTableData(updatedData);
  }, []);

  const handleChangeByValue = (id, value) => {
    setTableData((prevData) => {
      return prevData.map((category) => {
        if (category.id === id) {
          const newValue = value;

          const updatedChildren = category.children.map((child) => {
            let newChildValue = (child.value / category.value) * newValue;
            return {
              ...child,
              value: newChildValue,
              variance:
                ((newChildValue - child.originalValue) / child.originalValue) *
                100,
            };
          });
          return {
            ...category,
            value: newValue,
            children: updatedChildren,
            variance:
              ((newValue - category.originalValue) / category.originalValue) *
              100,
          };
        }
        const updatedChildren = category.children.map((child) => {
          if (child.id === id) {
            const newValue = value;
            return {
              ...child,
              value: newValue,
              variance:
                ((newValue - child.originalValue) / child.originalValue) * 100,
            };
          }
          return child;
        });
        const updatedParentValue = updatedChildren.reduce(
          (sum, child) => sum + child.value,
          0
        );
        return {
          ...category,
          children: updatedChildren,
          value: updatedParentValue,
          variance:
            ((updatedParentValue - category.originalValue) /
              category.originalValue) *
            100,
        };
      });
    });
  };

  const handleChangeByPercentage = (id, value) => {
    setTableData((prevData) => {
      return prevData.map((category) => {
        if (category.id === id) {
          const newValue = category.value + (category.value * value) / 100;
          const updatedChildren = category.children.map((child) => {
            let newChildValue = (child.value / category.value) * newValue;
            return {
              ...child,
              value: newChildValue,
              variance:
                ((newChildValue - child.originalValue) / child.originalValue) *
                100,
            };
          });

          return {
            ...category,
            value: newValue,
            children: updatedChildren,
            variance:
              ((newValue - category.originalValue) / category.originalValue) *
              100,
          };
        }
        const updatedChildren = category.children.map((child) => {
          if (child.id === id) {
            const newValue = child.value + (child.value * value) / 100;

            return {
              ...child,
              value: newValue,
              variance:
                ((newValue - child.originalValue) / child.originalValue) * 100,
            };
          }
          return child;
        });
        const updatedParentValue = updatedChildren.reduce(
          (sum, child) => sum + child.value,
          0
        );
        return {
          ...category,
          children: updatedChildren,
          value: updatedParentValue,
          variance:
            ((updatedParentValue - category.originalValue) /
              category.originalValue) *
            100,
        };
      });
    });
  };

  return (
    tableData && (
      <table>
        <thead>
          <tr>
            <th>Label</th>
            <th>Value</th>
            <th>Input</th>
            <th>Allocation %</th>
            <th>Allocation Val</th>
            <th>Variance %</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((category) => (
            <>
              <tr key={category.id}>
                <td>{category.label}</td>
                <td>{category?.value?.toFixed(3)}</td>

                <td>
                  <input
                    type="number"
                    onChange={(e) => {
                      category.input = parseFloat(e.target.value);
                    }}
                  />
                </td>
                <td>
                  <button
                    onClick={(e) => {
                      handleChangeByPercentage(category.id, category.input);
                    }}
                  >{`Increase by ${category?.input || ""}%`}</button>
                </td>
                <td>
                  <button
                    onClick={(e) => {
                      handleChangeByValue(category.id, category.input);
                    }}
                  >{`Increase by ${category?.input || ""} Value`}</button>
                </td>
                <td>{`${category?.variance?.toFixed(3) || "0"}%`}</td>
              </tr>
              {category.children.map((child) => (
                <tr key={child.id}>
                  <td style={{ paddingLeft: "20px" }}>- {child.label}</td>
                  <td>{`${child?.value?.toFixed(3)}`}</td>
                  <td>
                    <input
                      type="number"
                      onChange={(e) => {
                        child.input = parseFloat(e.target.value);
                      }}
                    />
                  </td>
                  <td>
                    <button
                      onClick={(e) => {
                        handleChangeByPercentage(child.id, child.input);
                      }}
                    >{`Increase by ${child?.input || ""}%`}</button>
                  </td>
                  <td>
                    <button
                      onClick={(e) => {
                        handleChangeByValue(child.id, child.input);
                      }}
                    >{`Increase by ${child?.input || ""} Value`}</button>
                  </td>
                  <td>{`${child?.variance?.toFixed(3) || "0"}%`}</td>
                </tr>
              ))}
            </>
          ))}
        </tbody>
      </table>
    )
  );
};
