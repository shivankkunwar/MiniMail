import { useEffect, useState } from "react";
import { Email } from "../types/emailTypes";

const EMAIL_API = "https://flipkart-email-mock.now.sh/";

export const useEmails = () => {
  const [emails, setEmails] = useState<Email[]>([]);
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchEmails = async () => {
      setLoading(true);
      const response = await fetch(`${EMAIL_API}?page=${currentPage}`);
      const data = await response.json();
      const storedData = JSON.parse(localStorage.getItem("emailData") || "{}");

      const processedEmails = data.list.map((email: any) => ({
        ...email,
        isRead: storedData[email.id]?.isRead || false,
        isFavorite: storedData[email.id]?.isFavorite || false,
      }));

      setEmails(processedEmails);
      setLoading(false);
    };

    fetchEmails();
  }, [currentPage]);

  const fetchEmailBody = async (id: string) => {
    const response = await fetch(`${EMAIL_API}?id=${id}`);
    const data = await response.json();

    const updatedEmails = emails.map((email) =>
      email.id === id ? { ...email, body: data.body, isRead: true } : email
    );

    setEmails(updatedEmails);
    setSelectedEmail(updatedEmails.find((email) => email.id === id) || null);

    updateLocalStorage(id, { isRead: true });
  };

  const toggleFavorite = (id: string) => {
    const updatedEmails = emails.map((email) =>
      email.id === id ? { ...email, isFavorite: !email.isFavorite } : email
    );

    setEmails(updatedEmails);
    setSelectedEmail(updatedEmails.find((email) => email.id === id) || null);

    updateLocalStorage(id, {
      isFavorite: !emails.find((e) => e.id === id)?.isFavorite,
    });
  };

  const updateLocalStorage = (
    id: string,
    data: { isRead?: boolean; isFavorite?: boolean }
  ) => {
    const storedData = JSON.parse(localStorage.getItem("emailData") || "{}");
    storedData[id] = { ...storedData[id], ...data };
    localStorage.setItem("emailData", JSON.stringify(storedData));
  };

  return {
    emails,
    selectedEmail,
    fetchEmailBody,
    toggleFavorite,
    loading,
    currentPage,
    setCurrentPage,
  };
};
