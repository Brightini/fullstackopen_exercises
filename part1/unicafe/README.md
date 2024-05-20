# Feedback App

This project is a simple feedback application built with React. Users can provide feedback by clicking on "Good", "Neutral", or "Bad" buttons. The application then calculates and displays the total count, average score, and percentage of positive feedback.

## Components

`App`: The main component that holds the state and renders the header, buttons, and statistics. It manages the state for the counts of each type of feedback, as well as the total count, average score, and percentage of positive feedback.

`Statistics`: This component takes props related to the feedback counts and displays the statistics in a table format. It includes individual StatisticLine components for each statistic.

`StatisticLine`: A reusable component for displaying a single statistic line. It conditionally formats the value as a percentage if specified.

`Header`: A simple component to display a header text.

`Button`: A reusable button component that triggers a feedback update when clicked.

## State Management

The state is managed using React's useState hook. The following state variables are maintained:

- `goodCount`: Count of "Good" feedback.
- `neutralCount`: Count of "Neutral" feedback.
- `badCount`: Count of "Bad" feedback.
- `total`: Total count of feedback.
- `average`: Average score of feedback.
- `percentage`: Percentage of positive feedback.

## Functionality

The `updateFeedbackCount` function updates the counts based on the type of feedback received ("good", "neutral", "bad"). It then recalculates the total count, average score, and percentage of positive feedback.

## Usage

To use this application, simply click on one of the feedback buttons ("Good", "Neutral", "Bad"). The statistics will update accordingly to reflect the new feedback.

```jsx
<Button onClick={() => updateFeedbackCount("good")} text="Good" />
<Button onClick={() => updateFeedbackCount("neutral")} text="Neutral" />
<Button onClick={() => updateFeedbackCount("bad")} text="Bad" />
```

The statistics will be displayed only if there is at least one feedback. Otherwise, a message "No feedback given" will be shown.

## Installation

1. Clone the repository.
2. Install dependencies with npm install.
3. Start the development server with npm start.
