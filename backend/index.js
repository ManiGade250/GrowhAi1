const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const headlines = [
  "Why {name} is {location}'s Top Choice in 2025",
  "Discover the Secret Behind {name}'s Success in {location}",
  "How {name} Became a Favorite in {location}",
  "{name}: The Rising Star of {location}'s Local Scene",
  "Inside {name} – {location}'s Most Talked About Business"
];

function generateHeadline(name, location) {
  const template = headlines[Math.floor(Math.random() * headlines.length)];
  return template.replace('{name}', name).replace('{location}', location);
}


app.post('/business-data', (req, res) => {
  const { name, location } = req.body;
  if (!name || !location) {
    return res.status(400).json({ error: 'Name and location are required.' });
  }
  res.json({
    rating: (Math.random() * 1.5 + 3.5).toFixed(1),
    reviews: Math.floor(Math.random() * 200),
    headline: generateHeadline(name, location)
  });
});


app.get('/regenerate-headline', (req, res) => {
  const { name, location } = req.query;
  if (!name || !location) {
    return res.status(400).json({ error: 'Name and location are required.' });
  }
  res.json({
    headline: generateHeadline(name, location)
  });
});

app.listen(3001, () => console.log('🚀 Backend running at http://localhost:3001'));
