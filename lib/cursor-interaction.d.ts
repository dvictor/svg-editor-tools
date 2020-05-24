interface Point {
    x: number;
    y: number;
}
declare type Node = Point;
export interface Connector {
    svg: SVGSVGElement;
    nodeFromEvent(e: MouseEvent): Node;
    getSelection(): Node[];
    setSelection(nodes: Node[]): void;
    isSelected(node: Node): boolean;
    getZoom(): number;
    moveNode(n: Node, x: number, y: number): void;
    setDragging(dragging: boolean): void;
    boxSelection(box: DOMRect, add: boolean): void;
    updatePanning(): void;
}
export declare function cursorInteraction(conn: Connector): void;
export {};
