export interface Note {
    idNot: number;
    note: number;
    coefficient: number;
    idEdt: number;
    idMat: number;
    idSchool: number;
    idSem: number;
    idCls: number;
  }
  
  export interface Matiere {
    code: string;
    coefficient: number;
    idMat: number;
    name: string;
    idEdt: number;
    idSchool: number;
    notes: Note[];
  }
  