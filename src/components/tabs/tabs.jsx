import React, {PureComponent, Fragment} from "react";
import PropTypes from "prop-types";
import Comments from "../comments/comments.jsx";

class Tabs extends PureComponent {
  constructor(props) {
    super(props);

    this.getRatingLevel = this.getRatingLevel.bind(this);
    this.getComponentByTab = this.getComponentByTab.bind(this);
  }

  getRatingLevel(rating) {
    if (rating >= 0 && rating < 3) {
      return `Bad`;
    }
    if (rating < 5) {
      return `Normal`;
    }
    if (rating < 8) {
      return `Good`;
    }
    if (rating < 10) {
      return `Very good`;
    }
    if (rating === 10) {
      return `Awesome`;
    }
    return null;
  }

  getComponentByTab(tab) {

    const {genre, year, runTime, ratingScore, ratingCount, textPartOne, textPartTwo, director, starring, comments} = this.props.film;

    switch (tab) {

      case `Overview`:
        return (
        <>
        <div className="movie-rating">
          <div
            className="movie-rating__score">
            {ratingScore}
          </div>
          <p className="movie-rating__meta">
            <span
              className="movie-rating__level">
              {this.getRatingLevel(ratingScore)}
            </span>
            <span
              className="movie-rating__count">
              {ratingCount} ratings
            </span>
          </p>
        </div>

        <div className="movie-card__text">
          <p>{textPartOne}</p>
          <p>{textPartTwo}</p>
          <p className="movie-card__director">
            <strong>
            Director: {director}
            </strong></p>
          <p className="movie-card__starring">
            <strong>
            Starring: {starring}
            </strong>
          </p>
        </div>
        </>
        );


      case `Details`:
        return (
          <div className="movie-card__text movie-card__row">
            <div className="movie-card__text-col">
              <p className="movie-card__details-item">
                <strong className="movie-card__details-name">Director</strong>
                <span className="movie-card__details-value">{director}</span>
              </p>
              <p className="movie-card__details-item">
                <strong className="movie-card__details-name">Starring</strong>
                <span className="movie-card__details-value">
                  {starring.split(`,`).map((actor) => {
                    return (
                      <Fragment key={actor}>
                        {actor} <br/>
                      </Fragment>
                    );
                  })}
                </span>
              </p>
            </div>

            <div className="movie-card__text-col">
              <p className="movie-card__details-item">
                <strong className="movie-card__details-name">Run Time</strong>
                <span className="movie-card__details-value">{runTime}</span>
              </p>
              <p className="movie-card__details-item">
                <strong className="movie-card__details-name">Genre</strong>
                <span className="movie-card__details-value">{genre}</span>
              </p>
              <p className="movie-card__details-item">
                <strong className="movie-card__details-name">Released</strong>
                <span className="movie-card__details-value">{year}</span>
              </p>
            </div>
          </div>
        );


      case `Reviews`:
        return (
          <div className="movie-card__reviews movie-card__row">

            <Comments
              comments={comments.slice(0, 3)}
            />
            <Comments
              comments={comments.slice(3, 7)}
            />

          </div>
        );

      default:
        return null;
    }
  }

  render() {
    const {tabCurrent, onTabClick} = this.props;
    const tabs = [`Overview`, `Details`, `Reviews`];

    return (
      <div className="movie-card__desc">
        <nav className="movie-nav movie-card__nav">
          <ul className="movie-nav__list">
            {tabs.map((tab, index) => {
              return (
                <li
                  onClick={(evt) => {
                    evt.preventDefault();
                    onTabClick(tab);
                  }}
                  key={tab + index}
                  className={`movie-nav__item`
                  + (tabCurrent === tab ? ` movie-nav__item--active` : ``)}>
                  <a href="#" className="movie-nav__link">{tab}</a>
                </li>
              );
            })}
          </ul>
        </nav>

        {this.getComponentByTab(tabCurrent)}

      </div>
    );
  }
}

Tabs.propTypes = {
  film: PropTypes.shape({
    genre: PropTypes.string.isRequired,
    year: PropTypes.number.isRequired,
    runTime: PropTypes.string.isRequired,
    ratingScore: PropTypes.number.isRequired,
    ratingCount: PropTypes.number.isRequired,
    textPartOne: PropTypes.string.isRequired,
    textPartTwo: PropTypes.string.isRequired,
    director: PropTypes.string.isRequired,
    starring: PropTypes.string.isRequired,
    comments: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)).isRequired,
  }),
  tabCurrent: PropTypes.any,
  onTabClick: PropTypes.any,
};

export default Tabs;