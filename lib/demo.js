import { cursorInteraction } from "./cursor-interaction.js";
var svg = document.querySelector('svg');
var g = document.querySelector('svg > g');
function getData(el) {
    return el.__data;
}
function setData(el, data) {
    el.__data = data;
}
var graph = {
    nodes: Array.from(g.children).map(function (el) {
        var m = el.transform.baseVal.getItem(0).matrix;
        var n = {
            x: m.e,
            y: m.f,
            ref: el,
        };
        setData(el, n);
        return n;
    }),
    isSelected: function (n) {
        return n.ref.classList.contains('selected');
    },
    setSelection: function (nodes) {
        graph.nodes.forEach(function (n) { return n.ref.classList.remove('selected'); });
        nodes.forEach(function (n) { return n.ref.classList.add('selected'); });
    },
    moveNode: function (n, x, y) {
        n.x = x;
        n.y = y;
        n.ref.setAttribute('transform', "translate(" + x + "," + y + ")");
    }
};
cursorInteraction({
    svg: svg,
    setSelection: function (nodes) {
        graph.setSelection(nodes);
    },
    moveNode: function (n, x, y) {
        graph.moveNode(n, x, y);
    },
    nodeFromEvent: function (e) {
        var el = e.target.closest('g.node');
        return el && getData(el);
    },
    getSelection: function () {
        return graph.nodes.filter(function (n) { return graph.isSelected(n); });
    },
    isSelected: function (node) {
        return graph.isSelected(node);
    },
    setDragging: function (dragging) {
    },
    boxSelection: function (box, add) {
        graph.setSelection(graph.nodes.filter(function (n) {
            console.log(n.ref, n.ref.firstChild);
            return (add && graph.isSelected(n)) || svg.checkIntersection(n.ref.firstElementChild, box);
        }));
    },
    getZoom: function () {
        return 1;
    },
    updatePanning: function () {
    }
});
