export const DragAndDrop = (props) => {
  const dragDropListener = (e) => {
    console.log(e);
  };
  return (
    <>
      <input
        onMouseEnter={dragDropListener}
        width={1000}
        height={500}
        type="file"
      />
    </>
  );
};
