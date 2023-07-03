import React, { Component } from 'react';
import FeedbackOptions from './FeedbackOptions/FeedbackOptions';
import Statistics from './Statistics/Statistics';
import Section from './Section/Section';
import Notification from './Notification/Notification';
import styles from './App.module.css';

class App extends Component {
  state = {
    feedback: {
      good: 0,
      neutral: 0,
      bad: 0,
    },
  };

  handleFeedback = option => {
    this.setState(prevState => ({
      feedback: {
        ...prevState.feedback,
        [option]: prevState.feedback[option] + 1,
      },
    }));
  };

  countTotalFeedback = () => {
    const { feedback } = this.state;
    const { good, neutral, bad } = feedback;
    return good + neutral + bad;
  };

  countPositiveFeedbackPercentage = () => {
    const { feedback } = this.state;
    const { good } = feedback;
    const total = this.countTotalFeedback();
    return total === 0 ? 0 : Math.round((good / total) * 100);
  };

  render() {
    const { feedback } = this.state;
    const totalFeedback = this.countTotalFeedback();
    const positivePercentage = this.countPositiveFeedbackPercentage();

    return (
      <div className={styles.container}>
        <h1>My App</h1>
        <Section title="Please leave feedback">
          <FeedbackOptions
            options={Object.keys(feedback)}
            onLeaveFeedback={this.handleFeedback}
          />
        </Section>
        <Section title="Statistics">
          {totalFeedback > 0 ? (
            <Statistics
              feedback={feedback}
              total={totalFeedback}
              positivePercentage={positivePercentage}
            />
          ) : (
            <Notification message="There is no feedback" />
          )}
        </Section>
      </div>
    );
  }
}

export default App;
