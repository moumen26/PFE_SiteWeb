import React from 'react'
import { IoIosSettings } from 'react-icons/io'
import NotificationItem from './notificationItem'

export default function Notification() {
  return (
    <div className="Notification">
      <div className="notification-header">
        <h2>Notifications</h2>
        <IoIosSettings size="25px" cursor="pointer" />
      </div>
      <div className="notification-container">
        <NotificationItem />
        <NotificationItem />
        <NotificationItem />
        <NotificationItem />
        <NotificationItem />
        <NotificationItem />
      </div>
    </div>
  );
}
