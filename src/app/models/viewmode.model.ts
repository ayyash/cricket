export interface IViewMode {
    
    // for different view modes
    forNew?: boolean;
    forEdit?: boolean;
    forReadonly?: boolean;
    full?: boolean;
    compact?: boolean;
    assigned?: boolean;
}


export enum EnumFormStage {
    info = 1,
    scheduling,
    fees
}