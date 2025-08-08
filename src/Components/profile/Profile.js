import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../Sidebar";
import BadgesContent from "./BadgesContent";
import AboutMeContent from "./AboutMeContent";

const UserProfile = ({ currentUser, session, setCurrentUser }) => {
  // This component is for

  const navigate = useNavigate();

  useEffect(() => {
    if (!session || !session.session_id) {
      navigate("/login");
    }
  }, [session, navigate]);

  // conditionally rendering the page contents on click
  const [activeContent, setActiveContent] = useState(null);

  const handleButtonClick = (content) => {
    setActiveContent(content);
  };

  return (
    <div className="min-h-full">
      {/* First Section */}
      <Sidebar
        currentUser={currentUser}
        session={session}
        setCurrentUser={setCurrentUser}
      />

      <head>
        <title>Profile</title>
        <meta charSet="utf-8" />
        <meta name="description" content="" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
        />
        <link rel="stylesheet" href="css/tailwind/tailwind.min.css" />
        <link rel="stylesheet" href="css/main.css" />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="shuffle-for-tailwind.png"
        />
        <script src="js/main.js"></script>
      </head>
      <div className="antialiased bg-body text-body font-body">
        <div>
          <div>
            <nav className="lg:hidden flex items-center justify-between p-8 bg-gray-50 mb-3">
              <div className="w-full xl:w-auto px-2 xl:mr-12">
                <div className="flex items-center justify-between">
                  <button
                    type="button"
                    className="inline-flex items-center h-8"
                  >
                    <img src="trizzle-assets/logos/trizzle-logo.svg" alt="" />
                  </button>
                  <div className="xl:hidden">
                    <button className="navbar-burger text-gray-400 hover focus:outline-none">
                      <svg
                        width="20"
                        height="12"
                        viewBox="0 0 20 12"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <title>Mobile menu</title>
                        <path
                          d="M1 2H19C19.2652 2 19.5196 1.89464 19.7071 1.70711C19.8946 1.51957 20 1.26522 20 1C20 0.734784 19.8946 0.48043 19.7071 0.292893C19.5196 0.105357 19.2652 0 19 0H1C0.734784 0 0.48043 0.105357 0.292893 0.292893C0.105357 0.48043 0 0.734784 0 1C0 1.26522 0.105357 1.51957 0.292893 1.70711C0.48043 1.89464 0.734784 2 1 2ZM19 10H1C0.734784 10 0.48043 10.1054 0.292893 10.2929C0.105357 10.4804 0 10.7348 0 11C0 11.2652 0.105357 11.5196 0.292893 11.7071C0.48043 11.8946 0.734784 12 1 12H19C19.2652 12 19.5196 11.8946 19.7071 11.7071C19.8946 11.5196 20 11.2652 20 11C20 10.7348 19.8946 10.4804 19.7071 10.2929C19.5196 10.1054 19.2652 10 19 10ZM19 5H1C0.734784 5 0.48043 5.10536 0.292893 5.29289C0.105357 5.48043 0 5.73478 0 6C0 6.26522 0.105357 6.51957 0.292893 6.70711C0.48043 6.89464 0.734784 7 1 7H19C19.2652 7 19.5196 6.89464 19.7071 6.70711C19.8946 6.51957 20 6.26522 20 6C20 5.73478 19.8946 5.48043 19.7071 5.29289C19.5196 5.10536 19.2652 5 19 5Z"
                          fill="currentColor"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </nav>
            <div className="hidden lg:block navbar-menu relative z-50">
              <div className="lg:hidden navbar-backdrop fixed top-0 left-0 w-full h-full bg-gray-800 opacity-50"></div>
            </div>
          </div>

          <section className="py-8 lg:ml-80">
            <div className="container px-4 mx-auto">
              <div className="p-6 mb-8 bg-gray-50 rounded-xl header-bg-orange">
                <div className="relative">
                  <img
                    className="block w-full h-72 object-cover"
                    src={
                      currentUser.cover_photo
                        ? currentUser.cover_photo
                        : "https://i.imgur.com/Pwx7wV3.png"
                    }
                    alt=""
                  />
                  <div className="absolute bottom-0 left-0 w-full flex flex-wrap p-6 items-center justify-between">
                    <div className="flex items-center w-full md:w-auto mb-5 md:mb-0">
                      <img
                        className="w-12 sm:w-16 h-12 sm:h-16 mr-2 md:mr-6 rounded-full"
                        src={currentUser.profile_pic}
                        alt=""
                      />
                      <div>
                        <h5 className="text-xl font-bold text-black">
                          {currentUser.first_name} {currentUser.last_name}
                        </h5>
                        <span className="">{currentUser.username}</span>
                      </div>
                    </div>
                    <button
                      type="button"
                      className="text-white bg-orange-500 inline-block w-64 py-3 px-6 text-center text-sm leading-6 font-bold transition duration-200 rounded-xl hover:bg-gray-800"
                      onClick={() =>
                        navigate(`/profile/${currentUser.stytch_id}/edit`)
                      }
                    >
                      Edit{" "}
                    </button>
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap -mx-4">
                <div className="w-full lg:w-1/3 px-4 mb-6 lg:mb-0">
                  <div className="p-3 mb-6 bg-gray-50 rounded-xl ">
                    <ul>
                      <li>
                        <button
                          type="button"
                          className="block w-full text-left py-2 px-3 text-sm leading-6 hover:text-white font-medium rounded-lg transition duration-100 hover:bg-gray-800"
                          onClick={() => handleButtonClick("content1")}
                        >
                          About Me
                        </button>
                      </li>
                      <li>
                        <button
                          type="button"
                          className="block w-full text-left py-2 px-3 text-sm leading-6 hover:text-white font-medium rounded-lg transition duration-100 hover:bg-gray-800"
                          onClick={() => handleButtonClick("content2")}
                        >
                          Badges
                        </button>
                      </li>
                      <li>
                        <button
                          type="button"
                          className="block w-full text-left py-2 px-3 text-sm leading-6 hover:text-white font-medium rounded-lg transition duration-100 hover:bg-gray-800"
                        >
                          Event History
                        </button>
                      </li>
                      <li>
                        <li>
                          <li></li>
                        </li>
                      </li>
                    </ul>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-xl">
                    <ul>
                      <li>
                        <li>
                          <button
                            type="button"
                            className="block w-full text-left py-2 px-3 text-sm leading-6 hover:text-white font-medium rounded-lg transition duration-100 hover:bg-gray-800"
                          >
                            Interests
                          </button>
                        </li>
                        <li>
                          <button
                            type="button"
                            className="block w-full text-left py-2 px-3 text-sm leading-6 hover:text-white font-medium rounded-lg transition duration-100 hover:bg-gray-800"
                          >
                            Recommendations
                          </button>
                        </li>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="w-full lg:w-2/3 px-4">
                  {activeContent === "content1" && (
                    <AboutMeContent currentUser={currentUser} />
                  )}
                  {activeContent === "content2" && <BadgesContent />}
                </div>
              </div>
            </div>
          </section>
        </div>
        <script src="https://cdn.jsdelivr.net/npm/apexcharts"></script>
        <script src="js/charts-demo.js"></script>
      </div>
    </div>
  );
};

export default UserProfile;
