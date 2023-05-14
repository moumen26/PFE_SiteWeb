import React from "react";

export default function NotificationItem() {
  return (
    <div className="Notification-item">
      <div className="notification-pic"></div>
      <div className="notification-item-description">
        <h3>
          Abdelmoumen <span>followed you</span>
        </h3>
        <span>1mo ago</span>
      </div>
    </div>
  );
}
