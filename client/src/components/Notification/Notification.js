import { notification } from 'antd';

export const openNotificationWithIcon = ({ type, message, description }) => {
  notification[type]({
    message: message,
    description: description,
    placement: 'bottomRight',
  });
};
