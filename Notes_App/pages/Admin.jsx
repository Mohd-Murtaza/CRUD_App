import React from "react";

const Admin = () => {
  const data = [
    { title: "buy something", description: "1 soap,1 brush" },
    { title: "buy something", description: "1 soap,1 brush" },
    { title: "buy something", description: "1 soap,1 brush" },
    { title: "buy something", description: "1 soap,1 brush" },
  ];
  return (
    <div>
      <h1>All the notes here...</h1>
      <div>
        {data.map((ele, ind) => (
          <div key={ind}>
            <h2>{ele.title}</h2>
            <h4>{ele.description}</h4>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Admin;
