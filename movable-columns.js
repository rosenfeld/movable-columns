(function($) {
  $.fn.movableColumns = function() { this.filter('table').each(processTable); return this; };

  function processTable() {
    var table = $(this), tr = table.find('> tr:first, > thead > tr:first').eq(0);
    tr.find('> th').draggable({revert: true}).droppable({ hoverClass: "movable-columns-hover",
      drop: function (_, ui) {
        var all = ui.draggable.closest('tr').find('> th'),
            idxFrom = $.inArray(ui.draggable[0], all),
            idxTo   = $.inArray(this, all);
        moveCol(table, idxFrom, idxTo);
      }
    });
  }

  function moveCol(table, idxFrom, idxTo) {
    table.find('> tr, > thead > tr, > tbody > tr').each(function () {
      var tr = $(this), detached = findColumnAt(tr, idxFrom).detach();
      if (idxFrom > idxTo) detached.insertBefore(findColumnAt(tr, idxTo))
      else detached.insertAfter(findColumnAt(tr, idxTo - 1));
    });
  }

  function findColumnAt(tr, idx) { return tr.find('> td:eq(' + idx + '), > th:eq(' + idx + ')'); }
})( jQuery );
