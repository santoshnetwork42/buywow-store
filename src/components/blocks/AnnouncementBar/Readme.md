# AnnouncementBar Component

A custom announcement bar component that displays left, center, and right content, including a flip clock if specified.

## Props

/\*\*

- Renders an announcement bar component with left, center, and right text/content.
-
- @param {string} leftText - Text/content to display on the left side of the bar.
- @param {object} centerContent - Object containing center content details.
- @param {boolean} isTimer - Flag indicating if center content includes a flip clock.
- @param {string} targetDate - Target date for the flip clock countdown.
- @param {string} centerText - Text/content to display in the center of the bar.
- @param {string} rightText - Text/content to display on the right side of the bar.
- @return {ReactNode} The rendered announcement bar component.
  \*/

## Example Usage

```jsx
import React from "react";
import AnnouncementBar from "./AnnouncementBar";

const App = () => {
  const announcementContent = {
    leftText: "Left Text",
    centerContent: {
      isTimer: true,
      targetDate: new Date("2024-07-01T00:00:00Z"),
      centerText: "Countdown to July 1st",
    },
    rightText: "Right Text",
  };

  return (
    <div>
      <AnnouncementBar
        leftText={announcementContent.leftText}
        centerContent={announcementContent.centerContent}
        rightText={announcementContent.rightText}
      />
    </div>
  );
};

export default App;
```
