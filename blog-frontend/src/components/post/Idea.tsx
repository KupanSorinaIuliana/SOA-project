import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';

function Idea() {

  let ideaID = useParams();
  console.log(Object.values(ideaID)[0]);

  const [idea, setIdea] = useState<any>({});

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      const response = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/tracker/idea?ideaID=${Object.values(ideaID)[0]}`);
      const json = await response.json();
      setIdea(json);
    }
    fetchData();
  }, [ideaID]);

    return (
        <section className="post-area">
        <div className="container">
          <div className="row">
            <div className="col-lg-1 col-md-0" />
            <div className="col-lg-10 col-md-12">
              {idea &&
                <div className="main-post">
                  <div className="post-top-area">
                    <h5 className="pre-title">Nest React Blog</h5>
                    <h3 className="title">
                      <span>
                        <b>{idea.title}</b>
                      </span>
                    </h3>

                    <p className="para">
                      {idea.body}
                    </p>
                  </div>
                </div>              
              }
            </div>

          </div>
        </div>
      </section>
    );
}

export default Idea;