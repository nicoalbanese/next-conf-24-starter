type Author = {
  name: string;
  initials: string;
  avatarSrc: string;
};

export type Comment = {
  id: number;
  author: Author;
  timestamp: string;
  content: string;
};