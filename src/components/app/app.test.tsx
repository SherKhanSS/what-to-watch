import * as React from "react";
import renderer from "react-test-renderer";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import App from "./app.jsx";
import NameSpace from "../../reducer/name-space.js";

const mockStore = configureStore([]);

const promoFilm = {
  id: 1,
  title: `The Grand Budapest Hotel`,
  genre: `Drama`,
  year: 2014,
  poster: `img/the-grand-budapest-hotel-poster.jpg`,
  cover: `img/bg-the-grand-budapest-hotel.jpg`,
  ratingScore: 8.9,
  ratingLevel: `Very good`,
  ratingCount: 240,
  description: `In the 1930s, the Grand Budapest Hotel is a popular European ski resort, presided over by concierge Gustave H. (Ralph Fiennes). Zero, a junior lobby boy, becomes Gustave&apos;s friend and protege.`,
  textPartTwo: `Gustave prides himself on providing first-className service to the hotel&apos;s guests, including satisfying the sexual needs of the many elderly women who stay there. When one of Gustave&apos;s lovers dies mysteriously, Gustave finds himself the recipient of a priceless painting and the chief suspect in her murder.`,
  director: `Wes Andreson`,
  starring: [`Bill Murray`, `Edward Norton`, `Jude Law`, `Willem Dafoe`],
};

const films = [
  {
    id: 1,
    title: `The Grand Budapest Hotel`,
    genre: `Drama`,
    year: 2014,
    poster: `img/the-grand-budapest-hotel-poster.jpg`,
    cover: `img/bg-the-grand-budapest-hotel.jpg`,
    ratingScore: 8.9,
    ratingCount: 240,
    description: `In the 1930s, the Grand Budapest Hotel is a popular European ski resort, presided over by concierge Gustave H. (Ralph Fiennes). Zero, a junior lobby boy, becomes Gustave&apos;s friend and protege.`,
    textPartTwo: `Gustave prides himself on providing first-className service to the hotel&apos;s guests, including satisfying the sexual needs of the many elderly women who stay there. When one of Gustave&apos;s lovers dies mysteriously, Gustave finds himself the recipient of a priceless painting and the chief suspect in her murder.`,
    director: `Wes Andreson`,
    starring: [`Bill Murray`, `Edward Norton`, `Jude Law`, `Willem Dafoe`],
    preview: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`,
  },
  {
    id: 1,
    title: `Fantastic Beasts: The Crimes of Grindelwald`,
    poster: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,

    genre: `Sci-Fi`,
    year: 2014,
    cover: `img/bg-the-grand-budapest-hotel.jpg`,
    ratingScore: 8.9,
    ratingCount: 240,
    description: `In the 1930s, the Grand Budapest Hotel is a popular European ski resort, presided over by concierge Gustave H. (Ralph Fiennes). Zero, a junior lobby boy, becomes Gustave&apos;s friend and protege.`,
    textPartTwo: `Gustave prides himself on providing first-className service to the hotel&apos;s guests, including satisfying the sexual needs of the many elderly women who stay there. When one of Gustave&apos;s lovers dies mysteriously, Gustave finds himself the recipient of a priceless painting and the chief suspect in her murder.`,
    director: `Wes Andreson`,
    starring: [`Bill Murray`, `Edward Norton`, `Jude Law`, `Willem Dafoe`],
    preview: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
  },
  {
    id: 1,
    title: `Bohemian Rhapsody`,
    poster: `img/bohemian-rhapsody.jpg`,

    genre: `Comedies`,
    year: 2020,
    cover: `img/bg-the-grand-budapest-hotel.jpg`,
    ratingScore: 5.4,
    ratingCount: 140,
    description: `In the 1930s, the Grand Budapest Hotel is a popular European ski resort, presided over by concierge Gustave H. (Ralph Fiennes). Zero, a junior lobby boy, becomes Gustave&apos;s friend and protege.`,
    textPartTwo: `Gustave prides himself on providing first-className service to the hotel&apos;s guests, including satisfying the sexual needs of the many elderly women who stay there. When one of Gustave&apos;s lovers dies mysteriously, Gustave finds himself the recipient of a priceless painting and the chief suspect in her murder.`,
    director: `Wes Andreson`,
    starring: [`Bill Murray`, `Edward Norton`, `Jude Law`, `Willem Dafoe`],
    preview: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`,
  },
];

const reviews = [
  {
    id: 1,
    user: {
      id: 4,
      name: `Kate Muir`
    },
    rating: 8.9,
    comment: `Discerning travellers and Wes Anderson fans will luxuriate in the glorious Mittel-European kitsch of one of the director's funniest and most exquisitely designed movies in years.`,
    date: `2019-05-08T14:13:56.569Z`
  }
];

const genres = [`All genres`];
const currentGenre = `All genres`;
const FILMS_LENGTH = 8;

it(`Render App`, () => {
  const store = mockStore({
    [NameSpace.DATA]: {
      films,
      promoFilm,
      genres,
    },
    [NameSpace.APP_STATE]: {
      currentGenre,
      filmsLength: FILMS_LENGTH,
    },
    [NameSpace.USER]: {
      authorizationStatus: `NO_AUTH`,
      onReviewSuccess: false,
      showSendError: false,
      isSent: false,
      favoritesFilms: [],
      reviews: [],
    }
  });

  const tree = renderer
    .create(
        <Provider store={store}>
          <App
            film={promoFilm}
            films={films}
            reviews={reviews}
            genres={genres}
            favoritesFilms={[]}
            currentGenre={currentGenre}
            filmsLength={FILMS_LENGTH}
            showSendError={false}
            onReviewSuccess={false}
            authorizationStatus={`NO_AUTH`}
            onGenresItemClick={() => {}}
            onShowMoreClick={() => {}}
            onPlayerExitClick={() => {}}
            onAddButtonClick={() => {}}
            login={() => {}}
            sendReview={() => {}}
            isSent={false}
            onFilmCardClick={() => {}}
            onClosingReview={() => {}}
          />
        </Provider>, {
          createNodeMock: () => {
            return {};
          }
        })
    .toJSON();

  expect(tree).toMatchSnapshot();
});