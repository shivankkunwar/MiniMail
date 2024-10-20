import React, { useState } from 'react';
import { useEmails } from './hooks/useEmails';
import EmailList from './components/EmailList';
import EmailDetail from './components/EmailDetail';
import Filter from './components/Filter';
import './App.css';

const App: React.FC = () => {
  const { emails, selectedEmail, fetchEmailBody, toggleFavorite, loading } = useEmails();
  const [filter, setFilter] = useState<string>('unread');

  const handleEmailClick = (id: string) => {
    fetchEmailBody(id);
  };

  const handleFilterChange = (newFilter: string) => {
    setFilter(newFilter);
  };

  const filteredEmails = emails.filter((email) => {
    if (filter === 'unread') return !email.isRead;
    if (filter === 'read') return email.isRead;
    if (filter === 'favorites') return email.isFavorite;
    return true;
  });

  return (
    <div className="app">
      <Filter currentFilter={filter} onFilterChange={handleFilterChange} />
      <div className="content">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            <EmailList emails={filteredEmails} onEmailClick={handleEmailClick} selectedEmailId={selectedEmail?.id} />
            {selectedEmail && (
              <EmailDetail email={selectedEmail} onFavoriteToggle={toggleFavorite} />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default App;