document.observe("dom:loaded", function() {
  drag_order_index = new DragOrderIndex();
  drag_order_index.initialize();
})

var DragOrderIndex = Class.create({
  
  initialize: function() {
    this.sortPages();
  },
  
  sortPages: function() {
    var tree = new SortableTree('pages', {
      draggable: {
        handle: 'handle',
        ghosting: false,
        constraint:  false,
        onDrag: function(drag, event) {
          drag.element.addClassName('drag_move');          
        },
        onEnd: function(drag, event) {
          drag.element.removeClassName('drag_move');
        }
      },
      onDrop: function(drag, drop, event){
        var parent = drag.element.up('.page')
        var elements = '';
        parent.down('.children').immediateDescendants().each(function(page) {
          elements += page.readAttribute('data-page_id') + ','
        });
        elements = elements.slice(0,-1);
        
        new Ajax.Request('/admin/pages/sort.js', {
          method: 'put',
          parameters: {
            'parent_id': parent.readAttribute('data-page_id'),
            'children' : elements
          }
        })
      }
    });
    tree.setSortable();
  }
})