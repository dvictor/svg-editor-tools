import {cursorInteraction} from "./cursor-interaction.js";

const svg = document.querySelector('svg') as SVGSVGElement
const g = document.querySelector('svg > g') as SVGGElement

interface Node {
	x: number
	y: number
	ref: SVGGElement
}

function getData(el: any) {
	return el.__data
}

function setData(el: any, data: any) {
	el.__data = data
}

const graph = {
	// build a doc out of what's on screen
	// in a typical app, you'll do the other way around
	nodes: Array.from(g.children).map((el: SVGGElement) => {
		const m = el.transform.baseVal.getItem(0).matrix
		const n = {
			x: m.e,
			y: m.f,
			ref: el,
		}
		setData(el, n)
		return n
	}),
	isSelected(n: Node) {
		return n.ref.classList.contains('selected')
	},
	setSelection(nodes: Node[]) {
		graph.nodes.forEach(n => n.ref.classList.remove('selected'))
		nodes.forEach(n => n.ref.classList.add('selected'))
	},
	moveNode(n: Node, x: number, y: number) {
		n.x = x
		n.y = y
		n.ref.setAttribute('transform', `translate(${x},${y})`)
	}
}

cursorInteraction({
	svg: svg,
	setSelection(nodes: Node[]) {
		graph.setSelection(nodes)
	},
	moveNode(n: Node, x: number, y: number) {
		graph.moveNode(n, x, y)
	},
	nodeFromEvent(e: MouseEvent): Node {
		let el = (e.target as SVGElement).closest('g.node') as SVGElement
		return el && getData(el)
	},
	getSelection(): Node[] {
		return graph.nodes.filter(n => graph.isSelected(n))
	},
	isSelected(node: Node): boolean {
		return graph.isSelected(node)
	},
	setDragging(dragging: boolean) {
	},
	boxSelection(box: DOMRect, add: boolean) {
		graph.setSelection(graph.nodes.filter(n => {
			console.log(n.ref, n.ref.firstChild)
			return (add && graph.isSelected(n)) || svg.checkIntersection(n.ref.firstElementChild as SVGElement, box)
		}))
	},
	getZoom(): number {
		return 1
	},
	updatePanning() {
	}
})