import { Elastic } from "./elastic.js";
import { addDnd } from "./dnd.js";
// drag-n-drop move node and select functionality
// looks scary but it's actually simple. move all selected nodes together
export function cursorInteraction(conn) {
    var ini;
    var elastic = Elastic(conn.svg);
    addDnd(conn.svg, function (e) {
        var n = conn.nodeFromEvent(e);
        if (!n) {
            ini = []; // no selection
            //init elastic select rect
            elastic.ini(e);
            return;
        }
        var nodes = conn.getSelection();
        if (!conn.isSelected(n)) {
            if (e.shiftKey) { // add to selection
                nodes.push(n);
            }
            else { // set selection to one
                nodes = [n];
            }
        }
        else if (e.shiftKey) { // remove from selection
            nodes = nodes.filter(function (nn) { return nn != n; });
        }
        conn.setSelection(nodes);
        ini = nodes.map(function (n) {
            return { x: n.x, y: n.y, n: n };
        });
    }, function (dx, dy) {
        ini.forEach(function (item) {
            var sc = conn.getZoom();
            conn.moveNode(item.n, item.x + dx / sc, item.y + dy / sc);
        });
        //elastic
        elastic.update(dx, dy);
        conn.setDragging(true);
    }, function (e) {
        conn.setDragging(false);
        var box = elastic.end();
        if (box) {
            conn.boxSelection(box, e.shiftKey);
        }
        else {
            //deselect
            if (!ini.length)
                conn.setSelection([]);
        }
        conn.updatePanning();
    });
}
