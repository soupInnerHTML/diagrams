import React, {useEffect} from "react";
import {observer} from "mobx-react-lite";
import {useThree} from "@react-three/fiber";
import {useDiagramsModel} from "../../hooks";
import {Diagram} from "../Diagram";

export const ResponsiveDiagramGroup: React.FC = observer(() => {
    const { viewport } = useThree();
    const { diagrams, setViewport, scaleFactor: scale } = useDiagramsModel();

    useEffect(() => {
        setViewport(viewport)
    }, [viewport]);

    return (
        <group scale={[scale, scale, scale]}>
            {diagrams.map((diagram) => (
                <Diagram key={diagram.id} {...{ diagram }} />
            ))}
        </group>
    );
});