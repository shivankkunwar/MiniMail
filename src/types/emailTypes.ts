export interface Email {
    id: string;
    from: { name: string; email: string };
    subject: string;
    short_description: string;
    date: string;
    body?: string;
    isRead: boolean;
    isFavorite: boolean;
  }
  