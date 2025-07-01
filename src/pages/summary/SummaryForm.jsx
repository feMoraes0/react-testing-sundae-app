import React from "react";

const SummaryForm = () => {
  const [isButtonDisabled, setIsButtonDisabled] = React.useState(true);

  return (
    <form>
      <input type="checkbox" id="terms-conditions" defaultChecked={false} onChange={(e) => setIsButtonDisabled(!e.target.checked) } />
      <label htmlFor="terms-conditions">Terms and conditions</label>
      <button disabled={isButtonDisabled}>Confirm order</button>
    </form>
  );
}

export default SummaryForm;
