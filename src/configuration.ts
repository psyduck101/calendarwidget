import { ISettings } from './isettings';

import Q = require('q');

export class Configuration {
  private widgetConfigurationContext = null;
  private $externalUrl = $('#daysOffCalendar-url-input');
  private $externalApiKey = $('#daysOffCalendar-api-key-input');

  constructor(public WidgetHelpers) {}

  public load(widgetSettings, widgetConfigurationContext) {
    this.widgetConfigurationContext = widgetConfigurationContext;

    const settings: ISettings = JSON.parse(widgetSettings.customSettings.data);
    this.$externalApiKey.val(settings.externalApiKey);
    this.$externalUrl.val(settings.externalUrl);

    VSS.resize();

    this.$externalUrl.add(this.$externalApiKey).on('change', () => {
      this.widgetConfigurationContext.notify(
        this.WidgetHelpers.WidgetEvent.ConfigurationChange,
        this.WidgetHelpers.WidgetEvent.Args(this.getCustomSettings())
      );
    });

    return this.WidgetHelpers.WidgetStatusHelper.Success();
  }

  public onSave() {
    const isValid = true;
    if (isValid) {
      return this.WidgetHelpers.WidgetConfigurationSave.Valid(
        this.getCustomSettings()
      );
    } else {
      return this.WidgetHelpers.WidgetConfigurationSave.Invalid();
    }
  }

  private getCustomSettings() {
    const externalUrl = this.$externalUrl.val();
    const externalApiKey = this.$externalApiKey.val();

    const result = {
      data: JSON.stringify({
        externalUrl,
        externalApiKey,
      } as ISettings),
    };
    return result;
  }
}
