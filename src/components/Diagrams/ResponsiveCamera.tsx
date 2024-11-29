import React, {useEffect, useRef} from "react";
import {observer} from "mobx-react-lite";
import {useDiagramsModel} from "../../hooks";
import {useWindowSize} from "@uidotdev/usehooks";
import {OrthographicCamera as DreiOrthographicCamera} from "@react-three/drei";
import {OrthographicCamera as ThreeOrthographicCamera} from "three";
import {DIAGRAM_HEIGHT, MAX_HEIGHT, MAX_WIDTH} from "../../consts";

export const ResponsiveCamera = observer(() => {
    const { maxDiagramID, isMobile } = useDiagramsModel();
    const { width, height } = useWindowSize();
    const cameraRef = useRef<ThreeOrthographicCamera | null>(null);

    useEffect(() => {
        if (cameraRef.current && height && width) {
            const camera = cameraRef.current;
            const diagramsPerScreen = height / DIAGRAM_HEIGHT;
            const ratio = Math.max(maxDiagramID / diagramsPerScreen, isMobile ? 2 : 1);
            camera.top = 0;
            camera.left = -1;
            camera.right = Math.min(width, MAX_WIDTH) * ratio;
            camera.bottom = -Math.min(height, MAX_HEIGHT) * ratio;
            camera.updateProjectionMatrix();
        }
    }, [maxDiagramID, width, height, window.devicePixelRatio]);

    if (height && width) {
        return (
            <DreiOrthographicCamera
                ref={cameraRef}
                makeDefault
                position={[0, 0, 100]}
                zoom={1}
                near={0.1}
                far={1000}
            />
        );
    } else {
        return null;
    }
});
