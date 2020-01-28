import React from "react";
const DisplayItems = ({ data }) => {
  if (data === undefined) return null;
  console.log("In display item---->", data);

  return (
    <React.Fragment>
      {data.map((d, i) => {
        return (
          <tr key={i}>
            <td>{d.item.fname}</td>
            <td>{d.item.price}</td>
            <td>{d.item.summary}</td>
            <td>{d.item.sku}</td>
            <td>
              {d.variant.name}: {d.variant.option}
            </td>
            <td>{d.qty}</td>
            <td>{d.subTotal}</td>
            <td></td>
          </tr>
        );
      })}
    </React.Fragment>
  );
};

export default DisplayItems;
