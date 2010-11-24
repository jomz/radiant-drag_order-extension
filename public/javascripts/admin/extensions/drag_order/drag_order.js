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
      treeTag:    '.kids'
    })
  }
  
  
})