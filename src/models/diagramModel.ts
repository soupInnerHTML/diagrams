import {RTFVector3, TDiagram, TDiagramBox, TDiagramColor, TDiagramID, TDiagramText} from "../types";
import {diagramsModel} from "./diagramsModel";
import {makeAutoObservable} from "mobx";
import {Vector3} from "three";

export class DiagramModel implements TDiagram {
    id: TDiagramID;
    nextID: TDiagramID | undefined;
    get next() {
        return diagramsModel.diagrams.find(diagram => diagram.id === this.nextID);
    }
    points: RTFVector3[] = [
        [-1, -.25, 0], // bottom left
        [1, -.25, 0], // bottom right
        [1, .25, 0], // top right
        [-1, .25, 0], // top left
        [-1, -.25, 0],
    ]
    private getResponsivePoint(index: number): Vector3 {
        return new Vector3(...this.points[index])
            .add(new Vector3(...this.position))
    }
    private get topLeft(): Vector3 {
        return this.getResponsivePoint(2)
    }
    private get topRight(): Vector3 {
        return this.getResponsivePoint(3)
    }
    private get bottomRight(): Vector3 {
        return this.getResponsivePoint(1)
    }
    private get bottomLeft(): Vector3 {
        return this.getResponsivePoint(0)
    }
    private getCenter(right: Vector3, left: Vector3): Vector3 {
        return new Vector3()
            .add(new Vector3(right.x, right.y, right.z).multiplyScalar(diagramsModel.scaleFactor))
            .add(new Vector3(left.x, left.y, left.z).multiplyScalar(diagramsModel.scaleFactor))
            .divideScalar(2);
    }
    get topCenter() {
        return this.getCenter(this.topRight, this.topLeft)
    }
    get bottomCenter() {
        return this.getCenter(this.bottomRight, this.bottomLeft)
    }
    get position(): RTFVector3 {
        return [diagramsModel.isMobile ? 1 : 0 + this.id, 0 - this.id, 0];
    }
    get title() {
        return "Shape" + this.id;
    }
    get color() {
        return diagramsModel.currentTarget === this.id ? TDiagramColor.red : TDiagramColor.green;
    }
    get box(): TDiagramBox {
        return {
            points: this.points,
            position: this.position,
            color: this.color,
            lineWidth: 1,
        }
    }
    get text(): TDiagramText {
        return {
            position: this.position,
            color: this.color,
            fontSize: .2,
            anchorX: 'center',
            anchorY: 'middle',
            children: this.title,
        }
    }
    constructor(id: TDiagramID, nextID?: TDiagramID) {
        this.id = id;
        this.nextID = nextID;
        makeAutoObservable(this)
    }
}