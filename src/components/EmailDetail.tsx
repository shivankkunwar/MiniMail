import React from 'react';
import { Email } from '../types/emailTypes';
import { formatDate } from '../utils/formatDate';

interface EmailDetailProps {
  email: Email;
  onFavoriteToggle: (id: string) => void;
}

const EmailDetail: React.FC<EmailDetailProps> = ({ email, onFavoriteToggle }) => {
  return (
    <div className="email-detail">
      <div className="email-header">
        <h2>{email.subject}</h2>
        <button onClick={() => onFavoriteToggle(email.id)} className="favorite-button">
          {email.isFavorite ? 'Remove from favorites' : 'Mark as favorite'}
        </button>
      </div>
      <div className="email-meta">
        <p><strong>From:</strong> {email.from.name} &lt;{email.from.email}&gt;</p>
        <p><strong>Date:</strong> {formatDate(email.date)}</p>
      </div>
      <div className="email-body" dangerouslySetInnerHTML={{ __html: email.body || '' }} />
    </div>
  );
};

export default EmailDetail;