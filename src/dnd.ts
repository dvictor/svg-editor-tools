export function dnd(
	onInit: (e: MouseEvent) => void,
	onMove: (dx: number, dy: number) => void,
	onEnd: (e: MouseEvent) => void
): (e: any) => void {

	let md: {
		ex: number;
		ey: number;
	};

	function convertEvent(e: any) {
		if (e.changedTouches === undefined) return e;
		return e.changedTouches[0];
	}

	function onMouseMove(e: MouseEvent) {
		e = convertEvent(e);
		onMove(e.clientX - md.ex, e.clientY - md.ey)
	}

	const remove = (e: MouseEvent) => {
		document.removeEventListener('touchmove', onMouseMove);
		document.removeEventListener('mousemove', onMouseMove);
		onEnd(e)
	};
	function onMouseDown(e: MouseEvent) {
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

	return onMouseDown
}

export function addDnd(
	element: { addEventListener: (...x: any) => void },
	onInit: (e: MouseEvent) => void,
	onMove: (dx: number, dy: number) => void,
	onEnd: (e: MouseEvent) => void) {

	const onMouseDown = dnd(onInit, onMove, onEnd)
	element.addEventListener('mousedown', onMouseDown);
	element.addEventListener('touchstart', onMouseDown);
}
