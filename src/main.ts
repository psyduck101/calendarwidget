import DaysoffCalendarWidget = require('./daysoffCalendarWidget');

VSS.require(['TFS/Dashboards/WidgetHelpers'], WidgetHelpers => {
  WidgetHelpers.IncludeWidgetStyles();
  VSS.register('daysoffCalendarWidget', () => {
    const daysoffCalendarWidget = new DaysoffCalendarWidget.DaysoffCalendarWidget(
      WidgetHelpers
    );
    return daysoffCalendarWidget;
  });
  VSS.notifyLoadSucceeded();
});
