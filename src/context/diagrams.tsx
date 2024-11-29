import {createContext, FC, PropsWithChildren} from "react";
import {diagramsModel} from "../models";

export const DiagramsContext = createContext(diagramsModel);

export const DiagramsProvider: FC<PropsWithChildren> = ({ children }) => {
    return <DiagramsContext.Provider value={diagramsModel}>
        {children}
    </DiagramsContext.Provider>;
};