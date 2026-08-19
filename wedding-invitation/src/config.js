import couplePhoto from './assets/ahillamohamed.jpeg'
import heroPhoto from './assets/newhero.jpeg'
import portraitPhoto from './assets/us.jpeg'

export const CONFIG = {
  bride: 'Ahilla',
  groom: 'Mohamed',

  weddingDateISO: '2026-10-09T16:00:00',
  displayDate: 'Friday · 9 October 2026',

  music: {
    src: `${import.meta.env.BASE_URL}our-song.mp3`,
    fallbackToSynth: false,
  },

  venue: {
    name: 'Royal Plaza Corniche',
    area: 'El Maadi',
    city: 'Cairo',
    date: 'Friday, 9 October 2026',
    time: '8:00 PM to 12:00 AM',
    address: 'Royal Plaza Corniche, El Maadi, Cairo',
    mapQuery: 'Royal Plaza Corniche El Maadi Cairo',
    mapLink:
      'https://www.google.com/maps/place//data=!4m2!3m1!1s0x14584705b675461d:0x2561ca271438e469?entry=s&sa=X&ved=2ahUKEwjNks27t6yWAxWz97sIHalFGOUQ4kB6BAgWEAA&hl=en',
  },

  photos: {
    cover: couplePhoto,
    hero: heroPhoto,
    portrait: portraitPhoto,
    pair1: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=700&h=900&fit=crop&q=80',
    pair2: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=700&h=900&fit=crop&q=80',
  },

  story: {
    eyebrow: '',
    title: 'Two hearts, one beautiful beginning',
    lead: 'Some loves are written quietly — in glances, in patience, in choosing each other again and again.',
    body: 'From the first hello to the promise of forever, every step of our journey has led us here. We found home in one another, and now we cannot wait to celebrate that love surrounded by the people who mean the most to us.',
    closing: 'Thank you for being part of the chapter we are about to begin.',
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
