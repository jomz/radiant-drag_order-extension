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
        var children  = '';
                
        this.moveHandles(drag.element);
        
        parent.down('.children').immediateDescendants().each(function(page) {
          children += page.readAttribute('data-page_id') + ','
        });
        children = children.slice(0,-1);
        
        new Ajax.Request('/admin/pages/sort.js', {
          method: 'put',
          parameters: {
            'parent_id': parent.readAttribute('data-page_id'),
            'children' : children
          }
        })
        
      }.bind(this)
    });
    tree.setSortable();
  },
  
  moveHandles: function(page) {
    var level = parseInt(page.up('.page').getAttribute('data-level'))
    level += 1;
    page.setAttribute('data-level', level)
    page.down('.handle').setStyle({ left: (level * -25) + 'px' })
    
    page.select('.children').each(function(container) {
      level += 1
      container.select('.page').each(function(child) {
        child.setAttribute('data-level', level)
        child.down('.handle').setStyle({ left: (level * -25) + 'px' })
      });
    });
  }
})