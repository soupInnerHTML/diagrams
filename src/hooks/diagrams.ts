import {useContext, useMemo} from "react";
import {DiagramsContext} from "../context";
import {TDiagram, TDiagramID} from "../types";

export const useDiagramsModel = () => {
    return useContext(DiagramsContext);
};

export const useDiagramModel = (id: TDiagramID): TDiagram => {
    const {diagrams} = useDiagramsModel()

    return useMemo(() => (
        diagrams.find(diagram => diagram.id === id)!
    ), [id, diagrams])
};