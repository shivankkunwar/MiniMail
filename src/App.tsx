import React, { useState } from "react";
import { useEmails } from "./hooks/useEmails";
import EmailList from "./components/EmailList";
import EmailDetail from "./components/EmailDetail";
import Filter from "./components/Filter";
import Pagination from "./components/Pagination";
import "./App.css";

const App: React.FC = () => {
  const {
    emails,
    selectedEmail,
    fetchEmailBody,
    toggleFavorite,
    loading,
    currentPage,
    setCurrentPage,
  } = useEmails();
  const [filter, setFilter] = useState<string>("");

  const handleEmailClick = (id: string) => {
    fetchEmailBody(id);
  };

  const handleFilterChange = (newFilter: string) => {
    setFilter(newFilter);
  };

  const filteredEmails = emails.filter((email) => {
    if (filter === "unread") return !email.isRead;
    if (filter === "read") return email.isRead;
    if (filter === "favorites") return email.isFavorite;
    return true;
  });

  return (
    <div className="app">
      <Filter currentFilter={filter} onFilterChange={handleFilterChange} />
      <div className={`content ${selectedEmail ? "split" : ""}`}>
        {loading ? (
          <p className="loading">Loading...</p>
        ) : (
          <>
            <div className="email-container">
              <EmailList
                emails={filteredEmails}
                onEmailClick={handleEmailClick}
                selectedEmailId={selectedEmail?.id}
              />
              <Pagination
                currentPage={currentPage}
                onPageChange={setCurrentPage}
                totalPages={2}
              />
            </div>
            {selectedEmail && (
              <EmailDetail
                email={selectedEmail}
                onFavoriteToggle={toggleFavorite}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default App;
