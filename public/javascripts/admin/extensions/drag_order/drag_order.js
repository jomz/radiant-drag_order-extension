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
        var level = parseInt(drag.element.up('.page').getAttribute('data-level'))
        level += 1;
        drag.element.setAttribute('data-level', level)
        drag.element.down('.handle').setStyle({ left: (level * -25) + 'px' })
        
        drag.element.select('.children').each(function(container) {
          level += 1
          container.select('.page').each(function(page) {
            page.setAttribute('data-level', level)
            page.down('.handle').setStyle({ left: (level * -25) + 'px' })
          });
        })

        
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