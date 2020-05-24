export declare function dnd(onInit: (e: MouseEvent) => void, onMove: (dx: number, dy: number) => void, onEnd: (e: MouseEvent) => void): (e: any) => void;
export declare function addDnd(element: {
    addEventListener: (...x: any) => void;
}, onInit: (e: MouseEvent) => void, onMove: (dx: number, dy: number) => void, onEnd: (e: MouseEvent) => void): void;
