module DragOrder
  module Controllers
    module Admin
      module PagesController
            
        def self.included(base)
          base.class_eval do
            
            helper_method :order_dragger
            
            def sort
              begin
                parent = Page.find(params[:parent_id])
                params[:children].split(',').each_with_index do |child,index|
                  Page.find(child).update_attributes!(
                    :position  => index,
                    :parent_id => params[:parent_id]
                  )
                end
                
                respond_to do |format|
                  format.js { render :text => 'Pages successfully sorted.' }
                end
              rescue
                respond_to do |format|
                  format.js { render :text => 'Could not sort Pages.', :status => :unprocessable_entity }
                end
              end
            end
            
            private
            
            def order_dragger
              %{<img src="/images/admin/extensions/drag_order/handle.png" alt ="Drag this icon to move the page" />}
            end
            
          end
        end
        
      end
    end
  end
end