import { useState } from "react";

function CustomerForm() {
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [nationalId, setNationalId] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    // ارسال اطلاعات به سرور
    console.log(name, phoneNumber, nationalId);
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        نام:
        <input
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
      </label>
      <label>
        شماره تلفن:
        <input
          type="tel"
          value={phoneNumber}
          onChange={(event) => setPhoneNumber(event.target.value)}
        />
      </label>
      <label>
        شماره ملی:
        <input
          type="text"
          value={nationalId}
          onChange={(event) => setNationalId(event.target.value)}
        />
      </label>
      <button type="submit">ثبت نام</button>
    </form>
  );
}

export default CustomerForm;
