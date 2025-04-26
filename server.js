const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Western Zodiac Signs
function calculateWesternSign(month, day) {
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

// Western Element Mapping
function getWesternElement(sign) {
  const fire = ['Aries', 'Leo', 'Sagittarius'];
  const earth = ['Taurus', 'Virgo', 'Capricorn'];
  const air = ['Gemini', 'Libra', 'Aquarius'];
  const water = ['Cancer', 'Scorpio', 'Pisces'];

  if (fire.includes(sign)) return 'Fire';
  if (earth.includes(sign)) return 'Earth';
  if (air.includes(sign)) return 'Air';
  if (water.includes(sign)) return 'Water';
  return 'Unknown';
}

// Chinese Zodiac Animal Mapping
const chineseAnimals = [
  'Rat', 'Ox', 'Tiger', 'Rabbit', 'Dragon', 'Snake',
  'Horse', 'Goat', 'Monkey', 'Rooster', 'Dog', 'Pig'
];

function calculateChineseSign(year) {
  const index = (year - 4) % 12;
  return chineseAnimals[index];
}

// Chinese Element Mapping
function calculateChineseElement(year) {
  const lastDigit = year % 10;
  if (lastDigit === 0 || lastDigit === 1) return 'Metal';
  if (lastDigit === 2 || lastDigit === 3) return 'Water';
  if (lastDigit === 4 || lastDigit === 5) return 'Wood';
  if (lastDigit === 6 || lastDigit === 7) return 'Fire';
  if (lastDigit === 8 || lastDigit === 9) return 'Earth';
  return 'Unknown';
}

// === API Endpoint ===
app.post('/api/zodiac/calculate', (req, res) => {
  console.log('👉 Received a POST request on /api/zodiac/calculate');

  try {
    const { dateOfBirth, timeOfBirth, placeOfBirth } = req.body;
    console.log('👉 Data received:', { dateOfBirth, timeOfBirth, placeOfBirth });

    if (!dateOfBirth || !timeOfBirth || !placeOfBirth) {
      return res.status(400).json({ error: 'Missing fields' });
    }

    const dateObj = new Date(dateOfBirth);
    if (isNaN(dateObj.getTime())) {
      return res.status(400).json({ error: 'Invalid date format' });
    }

    const month = dateObj.getMonth() + 1;
    const day = dateObj.getDate();
    const year = dateObj.getFullYear();

    const sunSign = calculateWesternSign(month, day);
    const westernElement = getWesternElement(sunSign);

    const chineseSign = calculateChineseSign(year);
    const chineseElement = calculateChineseElement(year);

    const result = {
      western: {
        sign: sunSign,
        element: westernElement,
      },
      chinese: {
        sign: chineseSign,
        element: chineseElement,
      },
      vedic: {
        sign: 'Mesha', // dummy for now
        element: 'Fire',
      },
    };

    console.log('✅ Result:', result);

    res.status(200).json(result);
  } catch (error) {
    console.error('🔥 Server error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Backend running on http://0.0.0.0:${PORT}`);
});


