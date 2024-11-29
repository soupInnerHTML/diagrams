import React from 'react';
import {Line as Box, Text} from "@react-three/drei";
import {TDiagram} from "../../types";
import {observer} from "mobx-react-lite";
import {useDiagramsModel} from "../../hooks";
import {DiagramBackground as Background} from "./Background";
import {ArrowBetweenDiagrams as Arrow} from "./Arrow";

interface TDiagramProps {
    diagram: TDiagram;
}

export const Diagram: React.FC<TDiagramProps> = observer(({
    diagram: {id, box, text, nextID}
}) => {
    const {selectCurrentTarget} = useDiagramsModel()
    const onClick = () => selectCurrentTarget(id)
    return (
        <group {...{onClick}}>
            <Background position={box.position} />
            <Box {...box} />
            <Text {...{onClick, ...text}} />
            {nextID && <Arrow id={id} />}
        </group>
    );
});