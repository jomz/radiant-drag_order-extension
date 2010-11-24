document.observe("dom:loaded", function() {
  drag_order_index = new DragOrderIndex();
  drag_order_index.initialize();
})

var DragOrderIndex = Class.create({
  
  initialize: function() {
    this.sortPages();
  },
  
  sortPages: function() {
    var route = '/some/url';
    
    Sortable.create('pages', {
      overlap:    'vertical',
      only:       'page',
      handle:     'handle',
      tree:       true,
      dropOnEmpty:true,
      treeTag:    '.kids',
      hoverclass: 'hover',
      onChange: function(element) {
        this.mover = element;
        this.mover.addClassName('move');
      }.bind(this),
      onUpdate: function() {
        this.mover.removeClassName('move');
      }.bind(this)
    })
  }
  
  
})