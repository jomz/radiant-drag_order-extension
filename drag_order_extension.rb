class DragOrderExtension < Radiant::Extension
  version YAML::load_file(File.join(File.dirname(__FILE__), 'VERSION'))
  description "Radiant DragOrder allows you to reorder pages funly"
  url "https://github.com/dirkkelly/radiant-drag-order"
  
  def activate    
    Page.send :include, DragOrder::Models::Page
    StandardTags.send :include, DragOrder::Tags::Core
    Admin::PagesController.send :include, DragOrder::Controllers::Admin::PagesController
    
    admin.pages.index.add :sitemap_head, "drag_order_header", :before => "title_column_header"
    admin.pages.index.add :node,         "drag_order",        :before => "title_column"
    admin.pages.index.add :top,          "top"
  end
  
end