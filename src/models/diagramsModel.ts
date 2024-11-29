import {TDiagrams, TDiagramsModel, TTargetDiagram} from "../types";
import {makeAutoObservable, reaction} from "mobx";
import {DiagramModel as Diagram} from "./diagramModel";
import {difference, last} from "lodash-es";
import {makePersistable} from "mobx-persist-store";
import {TViewport} from "../types/diagrams";
import {MAX_HEIGHT} from "../consts";

class DiagramsModel implements TDiagramsModel {
    diagrams: TDiagrams = [];
    currentTarget: TTargetDiagram = null;
    viewport: TViewport | null = null;

    private ratioX = 12
    private ratioY = 8

    get scaleFactor() {
        if(this.viewport) {
            if (this.viewport.width > this.viewport.height) {
                return this.viewport.width / this.ratioX;
            }
            else if (this.viewport.height > this.viewport.width) {
                return Math.min(this.viewport.height, MAX_HEIGHT) / this.ratioY;
            }

            return 1
        }

        return 1
    }
    get isMobile() {
        if(this.viewport) {
            return this.viewport?.height > this.viewport?.width && this.viewport?.width < 500;
        }
        return false;
    }
    private get maxSize()  {
        return this.isMobile ? 12 : 20;
    }

    get maxDiagramID() {
        return this.diagrams.length ? last(this.diagrams)!.id : 0;
    }
    get isReachedMaxDiagrams() {
        return this.maxDiagramID >= this.maxSize;
    }

    selectCurrentTarget = (target: TTargetDiagram) => {
        this.currentTarget = target === this.currentTarget ? null : target;
    }
    deselectCurrentTarget = () => {
        this.currentTarget = null;
    }
    addDiagram = () => {
        const id = this.diagrams.length ? last(this.diagrams)!.id + 1 : 1
        this.diagrams.push(new Diagram(id));
    }
    deleteSelectedDiagram = () => {
        if(this.currentTarget) {
            this.diagrams = this.diagrams.filter(diagram => diagram.id !== this.currentTarget);
            this.deselectCurrentTarget()
        }
    }
    setViewport = (viewport: TViewport): void => {
        this.viewport = viewport;
    }

    private updateDiagramBondsOnChange() {
        reaction(
            () => this.diagrams.slice(),
            (diagrams, prev) => {
                // deleted
                if(diagrams.length < prev.length) {
                    const deleted = difference(prev, diagrams)[0]
                    const beforeDeleted = diagrams.find(diagram => diagram.nextID === deleted.id);

                    if(beforeDeleted) {
                        beforeDeleted.nextID = deleted.nextID;
                    }
                }
                // added
                if(prev.length > 0 && diagrams.length > prev.length && diagrams.length > 1) {
                    last(prev)!.nextID = last(diagrams)!.id;
                }
            })
    }

    constructor() {
        makeAutoObservable(this);
        makePersistable(this, {
            name: 'diagrams',
            properties: ['diagrams'],
            storage: window.localStorage
        }).then(() => {
            this.diagrams = this.diagrams.map(diagram => new Diagram(diagram.id, diagram.nextID))
        });
        this.updateDiagramBondsOnChange()
    }
}

export const diagramsModel: TDiagramsModel = new DiagramsModel();