import React from 'react';
import {observer} from "mobx-react-lite";
import {diagramsModel} from "../models";
import {useDiagramsModel} from "../hooks";

export const Controls: React.FC = observer(() => {
    const {addDiagram, deleteSelectedDiagram, isReachedMaxDiagrams} = useDiagramsModel()
    return (
        <div className={'controls'}>
            <button
                onClick={addDiagram}
                disabled={isReachedMaxDiagrams}
            >
                Add
            </button>
            <button
                onClick={deleteSelectedDiagram}
                disabled={!diagramsModel.currentTarget}
            >
                Delete
            </button>
        </div>
    );
});

