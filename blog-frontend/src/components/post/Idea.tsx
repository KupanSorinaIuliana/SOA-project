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
    <div className={'page-wrapper'}>
        {idea &&
          <div className={"col-md-12 form-wrapper"}>
            <h2> View Idea  </h2>
            <br/>
              <div className="form-group col-md-12">
                <label htmlFor="title" className="form-control"> <b>Title:</b> {idea.title} </label>
              </div>

              <div className="form-group col-md-12">
                <label  className="form-control" htmlFor="description"> <b>Description:</b> {idea.body} </label>
              </div>
          </div>
        }
      </div>
    );
}

export default Idea;