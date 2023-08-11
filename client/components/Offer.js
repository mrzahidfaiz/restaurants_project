import { useState } from "react";

const Offer = () => {
  const [showResults, setShowResults] = useState(true);

  return (
    <div className="sticky top-20 z-20">
      {showResults ? (
        <div>
          <div className="flex flex-row justify-between items-center p-4 lg:mx-60 mx-6 bg-red-500 mt-4 rounded-md shadow-lg">
            <p className="ml-4 blink">
              <strong>Limited offer!</strong> Get it now before it's to late{" "}
            </p>
            <div>
              <button className="bg-white p-2 mr-4 rounded-md shadow-md text-sm">
                CLAIM OFFER
              </button>
              {/* <span className="rounded p-2 focus:outline-none focus:ring-2 focus:ring-white hover:bg-blue-600">
                <svg
                  className="h-6 w-6 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </span> */}

              <span className="rounded p-2 focus:outline-none focus:ring-2 focus:ring-white hover:bg-red-600 hover:text-white cursor-pointer hover:text-lg" onClick={(e) => setShowResults(false)}>X</span>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Offer;
