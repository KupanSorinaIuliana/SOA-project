import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';

function Weather() {

  let ideaID = useParams();

  const [weather, setWeather] = useState<any>({});

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      const response = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/tracker/weather`);
      const json = await response.json();
      setWeather(json);
    }
    fetchData();
  }, [ideaID]);

    return (
        <section className="post-area">
        <div className="container">
          <div className="row">
            <div className="col-lg-1 col-md-0" />
            <div className="col-lg-10 col-md-12">
              {weather &&
                <div className="main-post">
                  <div className="post-top-area">
                    <h3 className="title">
                      <span>
                        <b>Weather</b>
                      </span>
                    </h3>
                    <span><b>Base: </b> {weather.base}</span><br/>
                    <span><b>Visibility: </b> {weather.visibility}</span><br/>
                  </div>
                </div>              
              }
            </div>

          </div>
        </div>
      </section>
    );
}

export default Weather;