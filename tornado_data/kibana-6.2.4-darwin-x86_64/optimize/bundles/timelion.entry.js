
/**
 * Test entry file
 *
 * This is programatically created and updated, do not modify
 *
 * context: {
  "env": "production",
  "kbnVersion": "6.2.4",
  "buildNum": 16627,
  "plugins": [
    "console",
    "elasticsearch",
    "input_control_vis",
    "kbn_doc_views",
    "kbn_vislib_vis_types",
    "kibana",
    "markdown_vis",
    "metric_vis",
    "metrics",
    "region_map",
    "spy_modes",
    "state_session_storage_redirect",
    "status_page",
    "table_vis",
    "tagcloud",
    "tile_map",
    "timelion",
    "vega"
  ]
}
 */

require('ui/chrome');
require('plugins/timelion/app');
require('plugins/console/hacks/register');
require('plugins/kibana/dashboard/saved_dashboard/saved_dashboard_register');
require('plugins/kibana/dev_tools/hacks/hide_empty_tools');
require('plugins/kibana/discover/saved_searches/saved_search_register');
require('plugins/kibana/field_formats/register');
require('plugins/kibana/visualize/saved_visualizations/saved_visualization_register');
require('plugins/timelion/lib/panel_registry');
require('plugins/timelion/panels/timechart/timechart');
require('ui/chrome').bootstrap(/* xoxo */);

