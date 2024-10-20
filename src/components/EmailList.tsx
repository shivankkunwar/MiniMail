import React from "react";
import { Email } from "../types/emailTypes";
import { formatDate } from "../utils/formatDate";

interface EmailListProps {
  emails: Email[];
  onEmailClick: (id: string) => void;
  selectedEmailId: string | undefined;
}

const EmailList: React.FC<EmailListProps> = ({
  emails,
  onEmailClick,
  selectedEmailId,
}) => {
  return (
    <div className="email-list">
      {emails.map((email) => (
        <div
          key={email.id}
          onClick={() => onEmailClick(email.id)}
          className={`email-item ${email.isRead ? "read" : "unread"} ${
            email.id === selectedEmailId ? "selected" : ""
          }`}
        >
          <div className="avatar">{email.from.name[0].toUpperCase()}</div>
          <div className="email-content">
            <p className="from">
              From:{" "}
              <strong>
                {email.from.name} &lt;{email.from.email}&gt;
              </strong>
            </p>
            <p className="subject">
              Subject: <strong>{email.subject}</strong>
            </p>
            <p className="description">{email.short_description}</p>
            <p className="date">{formatDate(email.date)}</p>
            {email.isFavorite && (
              <span className="favorite-badge">Favorite</span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default EmailList;
