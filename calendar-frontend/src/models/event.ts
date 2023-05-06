export interface Event {
  id?: number;
  title: string;
  notes: string;
  start: Date;
  end: Date;
  bgcolor: string;
  user: User;
}

interface User {
  _id: string;
  name: string;
}
