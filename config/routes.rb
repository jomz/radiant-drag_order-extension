ActionController::Routing::Routes.draw do |map|

  map.with_options :controller => 'admin/pages' do |page|
    page.admin_pages_move_to "admin/pages/:id/move_to/:rel/:pos/:copy", :action => "move_to"
  end
      
end
