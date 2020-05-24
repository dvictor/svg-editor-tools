// Elastic selection rectangle
export var Elastic = function (svg) {
    var p0 = null;
    var box;
    return {
        ini: function (e) {
            var bb = svg.getBoundingClientRect();
            p0 = { x: e.clientX - bb.x, y: e.clientY - bb.y };
            box = null;
        },
        update: function (dx, dy) {
            if (!p0)
                return;
            var el = svg.querySelector('.elastic');
            box = svg.createSVGRect();
            box.x = dx > 0 ? p0.x : p0.x + dx;
            box.y = dy > 0 ? p0.y : p0.y + dy;
            box.width = Math.abs(dx);
            box.height = Math.abs(dy);
            el.setAttribute('x', String(box.x));
            el.setAttribute('y', String(box.y));
            el.setAttribute('width', String(box.width));
            el.setAttribute('height', String(box.height));
            el.classList.add('on');
        },
        end: function () {
            p0 = null;
            if (!box)
                return null;
            var el = svg.querySelector('.elastic');
            el.classList.remove('on');
            var b = box;
            box = null;
            return b; //selection box is on the <svg/> element coords space
        },
    };
};
