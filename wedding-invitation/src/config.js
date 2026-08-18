export const CONFIG = {
  bride: 'Ahilla',
  groom: 'Mohamed',

  weddingDateISO: '2026-10-09T16:00:00',
  displayDate: 'Friday · 9 October 2026',

  music: {
    src: '/music/our-song.mp3',
    fallbackToSynth: true,
  },

  venue: {
    name: 'The Hall',
    area: 'Maadi',
    city: 'Cairo',
    date: 'Friday, 9 October 2026',
    time: '4:00 in the afternoon',
    address: 'Maadi, Cairo',
    mapQuery: 'Maadi, Cairo',
  },

  photos: {
    /* Replace with /img/cover.jpg once their portrait is in public/img */
    cover: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=1600&h=2200&fit=crop&q=80',
    hero: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=900&h=1200&fit=crop&q=80',
    pair1: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=700&h=900&fit=crop&q=80',
    pair2: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=700&h=900&fit=crop&q=80',
  },

  sections: {
    couplePhotos: false,
    rsvp: false,
    wishes: false,
  },

  upload: {
    endpoint: '/api/upload',
    maxPhotos: 10,
    maxFileSizeMB: 15,
  },

  seedWishes: [
    { name: 'Nour & Karim', text: 'Wishing you a lifetime as beautiful as the day you found each other.', date: '2026-08-02' },
    { name: 'Layla Hassan', text: 'Ahilla, seeing you this happy is the best gift. Congratulations to you both!', date: '2026-08-06' },
    { name: 'The Saleh family', text: 'May your home always be full of laughter, patience and love.', date: '2026-08-09' },
    { name: 'Omar Fathy', text: 'Mohamed, you found your person. Wishing you both endless joy.', date: '2026-08-11' },
    { name: 'Hana & Youssef', text: 'To many years of shared mornings and quiet, ordinary happiness.', date: '2026-08-14' },
    { name: 'Aunt Mervat', text: 'Rabbina yetammem lokom 3ala kheir. Wishing you a blessed union. 🤍', date: '2026-08-16' },
  ],

  storage: { rsvp: 'wedding.rsvp.v2', wishes: 'wedding.wishes.v2' },
}

export function mapsUrl(query) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`
}
