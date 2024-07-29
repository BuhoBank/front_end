import React, { useState } from 'react';
import TermsDialog from './TermsDialog';

const NewAccountForm = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);


  const handleButtonClick = () => {
    setIsDialogOpen(true);
  };

  return (
    <div className="new-account-form">
      <button
        type="button"
        onClick={handleButtonClick}
        className="new-account-button"
      >
        Solicitar
      </button>
      {isDialogOpen && <TermsDialog onClose={() => setIsDialogOpen(false)} />}
    </div>
  );
};

export default NewAccountForm;
