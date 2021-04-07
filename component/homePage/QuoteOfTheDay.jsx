import { trimString } from "@utils/clientFunctions";

const QuoteOfTheDay = ({ quoteOfTheDay: { phrase, author }, styles, deviceWidth }) => (
  <div className={styles.quoteWrapper}>
    <blockquote className={styles.text} cite="http://www.viewchest.com/">
      <p>{trimString(phrase, deviceWidth >= 520 ? 170 : 130)}</p>
      <footer>{`– ${trimString(author, deviceWidth >= 520 ? 30 : 15)}`}</footer>
    </blockquote>
  </div>
);

export default QuoteOfTheDay;
