export const SERIES = [
  {
    id: 'series-1',
    label: '01',
    cover: '/images/series-1/01.jpg',
    images: [
      '/images/series-1/01.jpg',
      '/images/series-1/02.jpg',
    ],
  },
  {
    id: 'series-2',
    label: '02',
    cover: '/images/series-2/01.jpg',
    images: [
      '/images/series-2/01.jpg',
      '/images/series-2/02.jpg',
      '/images/series-2/03.jpg',
      '/images/series-2/04.jpg',
      '/images/series-2/05.jpg',
    ],
  },
  {
    id: 'series-3',
    label: '03',
    cover: '/images/series-3/01.jpg',
    images: [
      '/images/series-3/01.jpg',
      '/images/series-3/02.jpg',
      '/images/series-3/03.jpg',
      '/images/series-3/04.jpg',
    ],
  },
] as const;

export type SeriesId = (typeof SERIES)[number]['id'];
