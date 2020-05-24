export function dnd(onInit, onMove, onEnd) {
    var md;
    function convertEvent(e) {
        if (e.changedTouches === undefined)
            return e;
        return e.changedTouches[0];
    }
    function onMouseMove(e) {
        e = convertEvent(e);
        onMove(e.clientX - md.ex, e.clientY - md.ey);
    }
    var remove = function (e) {
        document.removeEventListener('touchmove', onMouseMove);
        document.removeEventListener('mousemove', onMouseMove);
        onEnd(e);
    };
    function onMouseDown(e) {
        e = convertEvent(e);
        md = {
            ex: e.clientX,
            ey: e.clientY,
        };
        onInit(e);
        document.addEventListener('touchmove', onMouseMove);
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', remove);
        document.addEventListener('touchend', remove);
    }
    return onMouseDown;
}
export function addDnd(element, onInit, onMove, onEnd) {
    var onMouseDown = dnd(onInit, onMove, onEnd);
    element.addEventListener('mousedown', onMouseDown);
    element.addEventListener('touchstart', onMouseDown);
}
