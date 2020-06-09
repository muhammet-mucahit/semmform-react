import React from "react";
import Image404 from "assets/404.svg";

const Page404 = (props) => {
  return (
    <div className="content text-center">
      <img
        className="warning"
        src={Image404}
        alt="404"
        style={{ marginTop: "100px" }}
      />
      <p>We are sorry but the page you are looking for, does not exist.</p>
    </div>
  );
};

export default Page404;
