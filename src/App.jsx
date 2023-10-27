import { useEffect } from "react";
import { useState } from "react";
import { FaAngleDoubleRight } from "react-icons/fa";
const url = "https://course-api.com/react-tabs-project";

function App() {
  const [tabs, setTabs] = useState([]);
  const [value, setValue] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    try {
      const respone = await fetch(url);
      const data = await respone.json();
      setTabs(data);
      setIsLoading(false);
    } catch (error) {
      console.log(error.message);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="section loading">
        <h4>Loading...</h4>
      </div>
    );
  }

  const { id, company, title, dates, duties } = tabs[value];
  return (
    <section className="section">
      <div className="jobs-center">
        <div className="btn-container">
          {tabs.map((item, index) => {
            return (
              <button
                className={`job-btn ${index === value && "active-btn"}`}
                key={item.id}
                onClick={() => setValue(index)}
              >
                {item.company}
              </button>
            );
          })}
        </div>
        {/* job info */}
        <article className="job-info">
          <h3>{title}</h3>
          <h4>{company}</h4>
          <p className="job-date">{dates}</p>
          {tabs.map((item, index) => {
            return (
              <div key={index} className="job-desc">
                <FaAngleDoubleRight className="jpb-icon" />
                <p>{item.duties}</p>
              </div>
            );
          })}
        </article>
      </div>
    </section>
  );
}

export default App;
