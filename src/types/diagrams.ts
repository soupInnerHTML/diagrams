import {Vector3} from "three";

export type TViewport = {
    width: number;
    height: number;
}

export interface TDiagramsModel {
    diagrams: TDiagrams
    currentTarget: TTargetDiagram
    maxDiagramID: TDiagramID
    isReachedMaxDiagrams: boolean
    isMobile: boolean
    scaleFactor: number;
    viewport: TViewport | null;
    setViewport: (viewport: TViewport) => void
    selectCurrentTarget(target: TTargetDiagram): void
    deselectCurrentTarget(): void
    addDiagram(): void
    deleteSelectedDiagram(): void
}

export type TDiagrams = TDiagram[]
export interface TDiagram {
    title: string
    id: TDiagramID
    points: RTFVector3[]
    position: RTFVector3
    color: TDiagramColor
    box: TDiagramBox
    text: TDiagramText
    next: TDiagram | undefined
    nextID: TDiagramID | undefined
    topCenter: Vector3
    bottomCenter: Vector3
}
export interface TDiagramBox {
    points: RTFVector3[]
    position: RTFVector3
    color: TDiagramColor
    lineWidth: number
}
export interface TDiagramText {
    position: RTFVector3
    color: TDiagramColor
    fontSize: number
    anchorX:  number | "left" | "center" | "right" | undefined
    anchorY: number | "top" | "top-baseline" | "middle" | "bottom-baseline" | "bottom" | undefined
    children: string
}
export enum TDiagramColor {
    red = "red",
    green = "green"
}
export type TDiagramID = number
export type TTargetDiagram = TDiagramID | null
export type RTFVector3 = [number, number, number]