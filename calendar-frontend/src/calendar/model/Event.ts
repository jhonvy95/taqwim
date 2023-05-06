export interface PropsEvent {
  event: Event;
  start: Date;
  end: Date;
  isSelected: boolean;
}

export interface Event {
  title: string;
  notes: string;
  start: Date;
  end: Date;
  bgcolor: string;
  user: User;
}

export interface User {
  _id: string;
  name: string;
}
