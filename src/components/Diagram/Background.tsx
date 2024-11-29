import React from 'react';
import {Plane} from "@react-three/drei";
import {Vector3} from "@react-three/fiber";

interface DiagramBackgroundProps {
    position: Vector3;
}

export const DiagramBackground: React.FC<DiagramBackgroundProps> = ({position}) => {
    // не стал выносить в store
    const onPointerOver = () => {
        document.body.style.cursor = 'pointer';
    };
    const onPointerOut = () => {
        document.body.style.cursor = 'default';
    };

    return (
        <Plane
            args={[2, .5]}
            {...{position, onPointerOver, onPointerOut}}
        >
            <meshBasicMaterial opacity={0} transparent/>
        </Plane>
    );
};