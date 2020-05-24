import {Elastic} from "./elastic.js";
import {addDnd} from "./dnd.js";

interface Point {
	x: number
	y: number
}

type Node = Point

// provide minimum visibility into the model
// we don't care how the document is structured, we only need these methods
export interface Connector {
	svg: SVGSVGElement
	nodeFromEvent(e: MouseEvent): Node
	getSelection(): Node[]
	setSelection(nodes: Node[]): void
	isSelected(node: Node): boolean
	getZoom(): number
	moveNode(n: Node, x: number, y: number): void
	setDragging(dragging: boolean): void
	boxSelection(box: DOMRect, add: boolean): void
	updatePanning():void
}

// drag-n-drop move node and select functionality
// looks scary but it's actually simple. move all selected nodes together
export function cursorInteraction(conn: Connector) {
	let ini: (Point & { n: Node })[]
	const elastic = Elastic(conn.svg)
	addDnd(conn.svg, (e) => {

		const n = conn.nodeFromEvent(e)
		if (!n) {
			ini = [] // no selection

			//init elastic select rect
			elastic.ini(e)
			return
		}

		let nodes = conn.getSelection();
		if (!conn.isSelected(n)) {
			if (e.shiftKey) { // add to selection
				nodes.push(n)
			} else { // set selection to one
				nodes = [n]
			}
		} else if (e.shiftKey) { // remove from selection
			nodes = nodes.filter(nn => nn != n)
		}
		conn.setSelection(nodes)

		ini = nodes.map(n => {
			return {x: n.x, y: n.y, n}
		})
	}, (dx, dy) => {
		ini.forEach(item => {
			const sc = conn.getZoom()
			conn.moveNode(item.n, item.x + dx / sc, item.y + dy / sc)
		})
		//elastic
		elastic.update(dx, dy)

		conn.setDragging(true)
	}, (e: MouseEvent) => {
		conn.setDragging(false)
		const box = elastic.end()
		if (box) {
			conn.boxSelection(box, e.shiftKey)
		} else {
			//deselect
			if (!ini.length) conn.setSelection([])
		}

		conn.updatePanning()
	})
}