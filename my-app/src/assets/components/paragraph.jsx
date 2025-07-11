const Paragraph = ({ index, currentIndex, prevIndex, direction, animateText, paragraph }) => {
  const { title, text } = paragraph;

  const classes = [
    "description-wrapper",
    currentIndex === index ? "active" : "",
    currentIndex === index && direction === "right" ? "enter-from-right" : "",
    currentIndex === index && direction === "left" ? "enter-from-left" : "",
    prevIndex === index && direction === "left" ? "exit-to-right" : "",
    prevIndex === index && direction === "right" ? "exit-to-left" : "",
  ].join(" ");

  return (
    <div className={classes}>
      <div className='description-title'>
        <h3>{title[0]}</h3>
        <h3>{title[1]}</h3>
      </div>
      <h4 className={`animated-text ${animateText ? "animate" : ""}`}>
        {text.split(' ').map((word, i, arr) => (
          <span key={i} className="word" style={{ "--word-index": i }}>
            {word}{i < arr.length - 1 ? ' ' : ''}
          </span>
        ))}
      </h4>
    </div>
  );
};

export default Paragraph;