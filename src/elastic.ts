interface Point {
	x: number
	y: number
}

// Elastic selection rectangle
export const Elastic = (svg: SVGSVGElement) => {
	let p0: Point | null = null
	let box: DOMRect | null
	return {
		ini(e: MouseEvent) {
			const bb = svg.getBoundingClientRect()
			p0 = {x: e.clientX - bb.x, y: e.clientY - bb.y}
			box = null
		},
		update(dx: number, dy: number) {
			if (!p0) return
			const el = svg.querySelector('.elastic') as SVGRectElement
			box = svg.createSVGRect()
			box.x = dx > 0 ? p0.x : p0.x + dx
			box.y = dy > 0 ? p0.y : p0.y + dy
			box.width = Math.abs(dx)
			box.height = Math.abs(dy)

			el.setAttribute('x', String(box.x))
			el.setAttribute('y', String(box.y))
			el.setAttribute('width', String(box.width))
			el.setAttribute('height', String(box.height))
			el.classList.add('on')
		},
		end() {
			p0 = null
			if (!box) return null
			const el = svg.querySelector('.elastic') as SVGRectElement
			el.classList.remove('on')
			const b = box
			box = null
			return b; //selection box is on the <svg/> element coords space
		},
	}
}
