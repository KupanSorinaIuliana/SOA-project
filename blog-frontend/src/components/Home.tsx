import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";

function Home():JSX.Element {
  let history = useHistory()
  const { isAuthenticated, getIdTokenClaims, user } = useAuth0();

  const [ideas, setIdeas] = useState<any>({});

  const deleteIdea = async(id: string) => {
    const accessToken = await getIdTokenClaims();
    await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/tracker/delete?ideaID=${id}`, {
      method: "delete",
      headers: new Headers({
        "Content-Type": "application/json",
        Accept: "application/json",
        "authorization": `Bearer ${accessToken?.__raw}`
      })
    });
    _removeIdeaFromView(id);
    history.push('/');
  }

  useEffect(() => {
    const fetchIdeas = async (): Promise<any> => {
      const response = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/tracker/ideas`);
      const json = await response.json();
      console.log(json);
      setIdeas(json)
    }
    fetchIdeas();
  }, [])

  const _removeIdeaFromView = (id: string) => {
    const index = ideas.findIndex((idea: { _id: string; }) => idea._id === id);
    ideas.splice(index, 1);
  }

    return (
        <section className="blog-area section">
        <div className="container">
          <div className="row">
            {ideas && !Array.isArray(ideas)? [] :
            ideas.map((idea: { title: React.ReactNode; _id: any; author: any; }) => (
              <div className="col-lg-4 col-md-6" key={idea._id}>
              <div className="card h-100">
                <div className="single-post post-style-1">

                  <div className="blog-image">
                    <img src="https://res.cloudinary.com/yemiwebby-com-ng/image/upload/v1563149789/blog-image_psvipq.jpg" alt="Blog" />
                  </div>

                  <span className="avatar">
                    <img src="http://res.cloudinary.com/yemiwebby-com-ng/image/upload/v1513770253/WEB_FREAK_50PX-01_yaqxg7.png" alt="Profile" />
                  </span>

                  <div className="blog-info">

                    <h4 className="title">
                      <span>
                        <b>{idea.title}</b>
                      </span>
                    </h4>
                  </div>
                </div>

                <ul className="post-footer">
                  <li>
                    <Link to={`/idea/${idea._id}`} className="btn btn-sm btn-outline-secondary">View Post </Link>
                  </li>
                  <li>
                    {
                      isAuthenticated && (user?.name === idea.author) &&
                      <Link to={`/edit/${idea._id}`} className="btn btn-sm btn-outline-secondary">Edit Post </Link>
                    }
                  </li>
                  <li>
                    {
                      isAuthenticated && (user?.name === idea.author) &&
                      <button className="btn btn-sm btn-outline-secondary" onClick={() => deleteIdea(idea._id)}>Delete Post</button>
                    }
                  </li>
                </ul>
              </div>
            </div>
            ))}
          </div>
        </div>
      </section>
    );
}

export default Home;
