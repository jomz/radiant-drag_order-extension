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
        onDrag: function(drag, event) {
          drag.element.addClassName('drag_move');          
        },
        onEnd: function(drag, event) {
          drag.element.removeClassName('drag_move');
        }
      }
    });
    tree.setSortable();
  }
})