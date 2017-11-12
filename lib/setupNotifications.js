import { Constants, Notifications, Permissions } from "expo";

export default async function setupNotifications() {
  const notification = {
    title: "Mobile Flashcards",
    body: "Don't forget to take your quiz today"
  };

  const schedulingOptions = {
    time: new Date().getTime() + 1000,
    repeat: "day"
  };

  const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
  if (status === "granted") {
    await Notifications.scheduleLocalNotificationAsync(
      notification,
      schedulingOptions
    );
  }
}
