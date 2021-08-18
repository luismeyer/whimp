import {
  renderLoginCodeTemplate,
  renderNotificationTemplate,
} from "./react.service";

export const handleMockRequest = (mockName: string) => {
  switch (mockName) {
    case "loginTemplate":
      return renderLoginCodeTemplate("Mocky", "1234");
    case "notificationTemplate":
      return renderNotificationTemplate("Mocky", {
        firstname: "Nach",
        lastname: "Bar",
        floor: 1,
      });
    default:
      return "<h1>Available Mocks: loginTemplate, notificationTemplate</h1>";
  }
};
