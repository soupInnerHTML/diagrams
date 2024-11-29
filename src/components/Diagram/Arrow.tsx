import React, {useEffect, useRef} from 'react';
import {ArrowHelper, Vector3} from 'three';
import {useThree} from '@react-three/fiber';
import {TDiagramID} from "../../types";
import {useDiagramModel} from "../../hooks";
import {observer} from "mobx-react-lite";

interface TArrowBetweenDiagramsProps {
    id: TDiagramID
}

// можно использовать как хук
// мне показалось, что уместно использовать в этом случае как компонент
export const ArrowBetweenDiagrams: React.FC<TArrowBetweenDiagramsProps> = observer(({ id }) => {
    const diagram = useDiagramModel(id)
    const startVector = diagram.bottomCenter;
    const endVector = diagram.next!.topCenter;

    const ref = useRef<ArrowHelper | null>(null);
    const { scene } = useThree();

    useEffect(() => {
        const direction = new Vector3().subVectors(endVector, startVector).normalize();
        const length = startVector.distanceTo(endVector);
        const color = 0x000;

        if (ref.current) {
            ref.current.setDirection(direction);
            ref.current.position.copy(startVector);
            ref.current.setLength(length);
            ref.current.setColor(color);
        } else {
            const arrow = new ArrowHelper(direction, startVector, length, color);
            ref.current = arrow;
            scene.add(arrow); // Добавляем стрелку в сцену
        }

        return () => {
            if (ref.current) {
                scene.remove(ref.current); // Убираем стрелку из сцены
                ref.current = null; // Очистить ссылку на стрелку
            }
        };
    }, [startVector, endVector, scene]);

    return null; // Здесь нет JSX, стрелка добавляется в сцену напрямую
});
