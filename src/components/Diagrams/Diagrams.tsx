import React from "react";
import {Canvas} from "@react-three/fiber";
import {useDiagramsModel} from "../../hooks";
import {ResponsiveCamera, ResponsiveDiagramGroup} from "./index";

// по умолчанию @react-three/fiber добавляет inline стили
// поэтому я тоже прокидываю их, чтоб не использовать !important
const style = { height: "100vh", width: "100%" }

export const Diagrams: React.FC = () => {
    const {
        deselectCurrentTarget: onPointerMissed,
    } = useDiagramsModel();

    return <Canvas {...{onPointerMissed, style}}>
        <ResponsiveCamera />
        <ResponsiveDiagramGroup />
    </Canvas>
};