import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './FeedbackWidget.module.css';

class FeedbackWidget extends Component {
  static propTypes = {
    onLeaveFeedback: PropTypes.func.isRequired,
    good: PropTypes.number.isRequired,
    neutral: PropTypes.number.isRequired,
    bad: PropTypes.number.isRequired,
  };

  render() {
    const { good, neutral, bad } = this.props;
    const totalFeedback = good + neutral + bad;
    const positivePercentage =
      totalFeedback > 0 ? Math.round((good / totalFeedback) * 100) : 0;

    return (
      <div className={styles.container}>
        <p className={styles.title}>Please leave feedback</p>
        <div className={styles['button-group']}>
          <button
            className={styles.button}
            onClick={() => this.props.onLeaveFeedback('good')}
          >
            Good
          </button>
          <button
            className={styles.button}
            onClick={() => this.props.onLeaveFeedback('neutral')}
          >
            Neutral
          </button>
          <button
            className={styles.button}
            onClick={() => this.props.onLeaveFeedback('bad')}
          >
            Bad
          </button>
        </div>
        {totalFeedback > 0 ? (
          <div>
            <p className={styles.title}>Statistics</p>
            <div className={styles.statistics}>
              <p>Good: {good}</p>
              <p>Neutral: {neutral}</p>
              <p>Bad: {bad}</p>
              <p>Total: {totalFeedback}</p>
              <p>Positive feedback: {positivePercentage}%</p>
            </div>
          </div>
        ) : (
          <Notification message="There is no feedback" />
        )}
      </div>
    );
  }
}

const Notification = ({ message }) => (
  <p className={styles.notification}>{message}</p>
);

Notification.propTypes = {
  message: PropTypes.string.isRequired,
};

export default FeedbackWidget;
