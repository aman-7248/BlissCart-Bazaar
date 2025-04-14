import React from "react";

const CategoryForm = ({ handleSubmit, value, setValue }) => {
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="form-group" >
          <input
            type="text"
            className="form-control"
            placeholder="Enter new category"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary"  style={{ margin:'8px 0px 0px 0px'}}>
          Submit
        </button>
      </form>
    </>
  );
};

export default CategoryForm;
