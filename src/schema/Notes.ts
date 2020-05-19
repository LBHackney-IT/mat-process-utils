export interface Note {
  value: string;
  isPostVisitAction: boolean;
  createdAt?: string;
}

export type Notes = Note[];
