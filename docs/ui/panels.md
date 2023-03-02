
# Panels

Charts, graphs and set-based panels reveal extra information when the mouse is moved over them.

Some panels have an information icon <i class="fa fa-info"></i> in the top left corner. Mouse over this to reveal panel information.

## Panel menu

At the top of each panel and to the right of the panel name is the _panel menu_.

![!image](../_images/PMM_Common_Panel_Menu.jpg)

!!! hint alert alert-success "Tip"
      The menu is hidden until you mouse over it. Look for the <i class="uil uil-angle-down"></i> symbol in the title bar of a panel.

| Item                                      | Description                                                                   |
| ----------------------------------------- | ----------------------------------------------------------------------------- |
| <i class="uil uil-eye"></i> View          | Open the panel in full window mode.                                           |
| <i class="uil uil-share-alt"></i> Share   | [Share the panel's link or image](../how-to/share-dashboard.md). |
| <i class="uil uil-compass"></i> Explore   | Run [PromQL] queries.                                                         |
| <i class="fa fa-info-circle"></i> Inspect | See the panel's data or definition.                                           |
| <i class="uil uil-cube"></i> More         | (Only charts and graphs) Additional options.                                  |

## View

The _View_ menu items opens panels in full-window mode. This is useful for graphs with several metrics.

Exit a panel's full window mode by pressing _Escape_ or clicking the left arrow <i class="uil uil-arrow-left"></i> next to the dashboard name.

!!! info alert alert-info "See also"
- [How to render dashboard images](../how-to/render-dashboard-images.md)
- [How to annotate special events](../how-to/annotate.md)

[grafana]: https://grafana.com/docs/grafana/latest/
[promql]: https://prometheus.io/docs/prometheus/latest/querying/basics/

## Timezones

By default Grafana uses the timezone from your web browser. However, you can change this setting.

### Set user timezone

1. On the left menu, hover your cursor over your avatar and then click _Preferences_.
2. Click to select an option in the _Timezone list_.
3. Click _Save_.
