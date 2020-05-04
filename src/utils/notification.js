import React from "react";

const notificationRef = React.createRef();

export const notify = (message, type) => {
  var options = {};
  options = {
    place: "tr",
    message: (
      <div>
        <div>{message}</div>
      </div>
    ),
    type: type,
    icon: "tim-icons icon-bell-55",
    autoDismiss: 3,
  };
  notificationRef.current.notificationAlert(options);
};

export default notificationRef;
