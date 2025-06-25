import { useState } from "react";
import { Rows } from "./Rows";

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
          value: 1000,
          children: [
            {
              id: "lenovo",
              label: "Lenovo",
              value: 500,
              children: [
                {
                  id: "330s",
                  label: "330S",
                  value: 250,
                },
                {
                  id: "thinkpad",
                  label: "Thinkpad",
                  value: 250,
                },
              ],
            },
            {
              id: "dell",
              label: "Dell",
              value: 500,
            },
          ],
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
          children: [
            {
              id: "bench",
              label: "Bench",
              value: 150,
              children: [
                {
                  id: "benchWithDesk",
                  label: "Bench With Desk",
                  value: 50,
                },
                {
                  id: "benchWithoutDesk",
                  label: "Bench Without Desk",
                  value: 100,
                },
              ],
            },
            {
              id: "teaTable",
              label: "Tea Table",
              value: 150,
            },
          ],
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
const setRowData = (row) => {
  const updatedChildren = row.children
    ? row.children.map((child) => setRowData(child))
    : [];
  const totalValue = row.children
    ? updatedChildren.reduce((sum, child) => sum + child.value, 0)
    : row.value;
  return {
    ...row,
    value: totalValue,
    children: updatedChildren,
    originalValue: totalValue,
    variance: 0,
  };
};
const setInitialTableData = (rows) => {
  return rows.map((category) => {
    return setRowData(category);
  });
};
const updateData = (category, value, id, by) => {
  if (category.id === id) {
    let newValue;
    if (by === "byValue") {
      newValue = value;
    } else if (by === "byPercentage") {
      newValue = category.value + (category.value * value) / 100;
    }

    const updatedChildren = category.children.map((child) => {
      let newChildValue = (child.value / category.value) * newValue;
      let updatedNestedChild =
        child?.children?.length > 0
          ? updateData(child, newChildValue, child.id, by)
          : [];

      return {
        ...child,
        value: newChildValue,
        children: updatedNestedChild,
        variance:
          ((newChildValue - child.originalValue) / child.originalValue) * 100,
      };
    });

    return {
      ...category,
      value: newValue,
      children: updatedChildren,
      variance:
        ((newValue - category.originalValue) / category.originalValue) * 100,
    };
  }

  const updatedChildren = category.children.map((child) => {
    return updateData(child, value, id, by);
  });

  const updatedParentValue =
    updatedChildren.length > 0
      ? updatedChildren.reduce((sum, child) => sum + child.value, 0)
      : category.value;

  return {
    ...category,
    children: updatedChildren,
    value: updatedParentValue,
    variance:
      ((updatedParentValue - category.originalValue) / category.originalValue) *
      100,
  };
};

export const Table = () => {
  const [tableData, setTableData] = useState(
    setInitialTableData(initialData.rows)
  );
  const grandTotal = tableData.reduce((sum, category) => {
    return (sum += category.value);
  }, 0);
  console.log(tableData, grandTotal);

  const handleChangeByValue = (id, value) => {
    setTableData((prevData) => {
      const newData = prevData.map((category) => {
        return updateData(category, value, id, "byValue");
      });

      return newData;
    });
  };

  const handleChangeByPercentage = (id, value) => {
    setTableData((prevData) => {
      const newData = prevData.map((category) => {
        return updateData(category, value, id, "byPercentage");
      });

      return newData;
    });
  };

  const personList = [
    {
      name: "bhi",
      age: "55",
      gender: "male",
    },
    {
      name: "Ajay",
      age: "24",
      gender: "male",
    },
    {
      name: "jkl",
      age: "15",
      gender: "female",
    },
    {
      name: "abc",
      age: "30",
      gender: "female",
    },
    {
      name: "def",
      age: "45",
      gender: "male",
    },
  ];

  personList.sort((person1, person2) => {
    return person1.name.localeCompare(person2.name);
  });

  console.log(personList);

  const newListBelow40 = personList
    .filter((person) => {
      return parseInt(person.age) < 40;
    })
    .map((person) => person.name).flatMap;

  console.log(newListBelow40);

  const arrayinput = [1, 3, null, 5, 7, 8, null, 2];

  let newArray = [],
    tempArray = [];

  arrayinput.forEach((value) => {
    if (value === null) {
      newArray.push(tempArray);
      tempArray = [];
    } else {
      tempArray.push(value);
    }
  });

  newArray.push(tempArray);

  console.log(newArray);
  const array = [[1, 3], [5, 7, 8], [2]];

  let array1 = [1, 3, 5],
    array2 = [2, 4, 6];

  let mergedArray = [];

  let maxLength = Math.max(array1.length, array2.length);

  // let i = 0;
  // while (i < maxLength) {
  //   if (i < array1.length) {
  //     mergedArray;
  //   }
  // }

  let inputArray = [1, 5, null, 7, 2, 9, 10, 11, 12, 13, null, 4, 5, 6, 7, 8];
  let maxSize = 2;

  let outputarray = [],
    temporaryArray = [];
  inputArray.forEach((value) => {
    if (value === null) {
      outputarray.push(temporaryArray);
      temporaryArray = [];
    } else if (temporaryArray.length === maxSize) {
      outputarray.push(temporaryArray);
      temporaryArray = [value];
    } else {
      temporaryArray.push(value);
    }
  });
  // if (temporaryArray.length === maxSize) {
  //   outputarray.push(temporaryArray);
  //   temporaryArray = [];
  // }
  outputarray.push(temporaryArray);
  console.log(outputarray);
  return (
    tableData && (
      <>
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
            {tableData.map((category, index) => {
              return (
                <>
                  <Rows
                    category={category}
                    handleChangeByPercentage={handleChangeByPercentage}
                    handleChangeByValue={handleChangeByValue}
                    rowNumbers={`${index + 1}`}
                    index={index}
                  />
                </>
              );
            })}
          </tbody>
        </table>
        <div className="square">
          <div className="dot"></div>
        </div>
      </>
    )
  );
};
