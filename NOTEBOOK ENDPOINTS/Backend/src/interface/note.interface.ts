export interface newNote {
  Note_id: string;
  Title: string;
  Content: string;
  createdAt: {
    type: Date;
    default: Date;
  };
}
