const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5000;

// MIDDLEWARES
app.use(cors());
app.use(express.json());

// HELPER FUNCTION
function calculateZodiacSign(month, day) {
  if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return 'Aries';
  if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return 'Taurus';
  if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return 'Gemini';
  if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return 'Cancer';
  if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return 'Leo';
  if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return 'Virgo';
  if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return 'Libra';
  if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return 'Scorpio';
  if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return 'Sagittarius';
  if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return 'Capricorn';
  if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return 'Aquarius';
  if ((month === 2 && day >= 19) || (month === 3 && day <= 20)) return 'Pisces';
  return 'Unknown';
}

// ROUTES
app.get('/', (req, res) => {
  res.status(200).send('Backend is running.');
});

app.post('/api/zodiac/calculate', (req, res) => {
  console.log('👉 Received a POST request on /api/zodiac/calculate');
  
  try {
    const { dateOfBirth, timeOfBirth, placeOfBirth } = req.body;
    console.log('👉 Data received:', { dateOfBirth, timeOfBirth, placeOfBirth });

    if (!dateOfBirth || !timeOfBirth || !placeOfBirth) {
      console.log('❗ Missing fields!');
      return res.status(400).json({ error: 'Missing fields' });
    }

    const dateObj = new Date(dateOfBirth);
    if (isNaN(dateObj)) {
      console.log('❗ Invalid date format:', dateOfBirth);
      return res.status(400).json({ error: 'Invalid date format' });
    }

    const month = dateObj.getMonth() + 1;
    const day = dateObj.getDate();

    const sunSign = calculateZodiacSign(month, day);
    console.log(`✅ Calculated sun sign: ${sunSign}`);

    const result = {
      western: {
        sign: sunSign,
        element: 'TBD',
      },
      chinese: {
        sign: 'Dragon',
        element: 'Wood',
      },
      vedic: {
        sign: 'Mesha',
        element: 'Fire',
      },
    };

    res.status(200).json(result);
  } catch (error) {
    console.error('🔥 Server error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// SERVER
app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Backend running on http://0.0.0.0:${PORT}`);
});

