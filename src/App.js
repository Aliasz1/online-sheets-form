import { useState } from 'react';
import { google } from 'googleapis';
import './App.css';

function App() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');

  const handleSubmit = async () => {
    const auth = new google.auth.GoogleAuth({
      keyFile: '../credentials.json',
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({ version: 'v4', auth });
    const spreadsheetId = '1V7CaG_aexDykyYY7yS07Lv6ixZ5o_sx6Z3EEnfxn38c';
    const range = 'Sheet1!A:D';
    const values = [[fullName, email, description, date]];

    try {
      const response = await sheets.spreadsheets.values.append({
        spreadsheetId,
        range,
        valueInputOption: 'USER_ENTERED',
        resource: { values },
      });

      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Online Form</h1>
      </header>
      <body>
        <div className="App-form">
          <form>
            <label>Full Name:</label>
            <input type="text" onChange={(e) => {setFullName(e.target.value)}} />
            <br />

            <label>Email:</label>
            <input type="text" onChange={(e) => {setEmail(e.target.value)}}/>
            <br />

            <label>Description:</label>
            <input type="text" onChange={(e) => {setDescription(e.target.value)}}/>
            <br />

            <label>Date:</label>
            <input type="date" onChange={(e) => {setDate(e.target.value)}}/>
            <br />

            <button type="submit" onClick={handleSubmit}>Submit</button>
          </form>
        </div>
      </body>
    </div>
  );
}

export default App;
