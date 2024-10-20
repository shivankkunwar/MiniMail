import { useEffect, useState } from 'react';
import { Email } from '../types/emailTypes';

const EMAIL_API = "https://flipkart-email-mock.now.sh/";

export const useEmails = () => {
  const [emails, setEmails] = useState<Email[]>([]);
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(EMAIL_API)
      .then((response) => response.json())
      .then((data) => {
        const processedEmails = data.list.map((email: any) => ({
          ...email,
          isRead: false,
          isFavorite: false,
        }));
        setEmails(processedEmails);
        setLoading(false);
      });
  }, []);

  const fetchEmailBody = (id: string) => {
    fetch(`${EMAIL_API}?id=${id}`)
      .then((response) => response.json())
      .then((data) => {
        const updatedEmails = emails.map((email) =>
          email.id === id ? { ...email, body: data.body, isRead: true } : email
        );
        setEmails(updatedEmails);
        setSelectedEmail(updatedEmails.find((email) => email.id === id) || null);
      });
  };

  const toggleFavorite = (id: string) => {
    const updatedEmails = emails.map((email) =>
      email.id === id ? { ...email, isFavorite: !email.isFavorite } : email
    );
    setEmails(updatedEmails);
  };

  return { emails, selectedEmail, fetchEmailBody, toggleFavorite, loading };
};
