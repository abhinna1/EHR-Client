import React from "react";

function HomePage() {
  return (
    <div className="relative bg-gray-100">
      <div
        className="h-96 bg-cover bg-center relative"
        style={{
          backgroundImage:
            "url('https://www.ibm.com/content/dam/connectedassets-adobe-cms/worldwide-content/stock-assets/getty/image/photography/78/91/dsc06521.jpg/_jcr_content/renditions/cq5dam.web.3840.3840.jpeg')",
        }}
      >
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-white text-4xl font-semibold text-center">
            Welcome to Decentral EHR
          </h1>
        </div>
      </div>
      <div className="mx-auto mb-8 py-8 px-8 w-screen">
      <h1 className="text-center text-2xl font-bold mb-5">Our Services</h1>
        <main className=" ">
          <section className="w-full flex justify-evenly gap-y-8">
            <div className="p-4 flex flex-col gap-y-8 border rounded shadow h-[20rem] justify-evenly items-center">
              <img
                src="https://www.svgrepo.com/download/74601/security.svg"
                alt="Secure and Private"
                className="mx-auto h-32"
              />
              <div className="">
                <h2 className="text-xl font-semibold mt-2 text-center">
                  Secure and Private
                </h2>
                <p className="text-center max-w-md">
                  Your health data is stored on a blockchain, ensuring data
                  integrity and privacy.
                </p>
              </div>
            </div>
            <div className="p-4 flex flex-col gap-y-8 border rounded shadow h-[20rem] justify-evenly items-center">
              <img
                src="https://cdn.icon-icons.com/icons2/2440/PNG/512/accessibility_icon_148550.png"
                alt="Accessible Anytime, Anywhere"
                className="mx-auto h-32"
              />
              <div className="">
                <h2 className="text-xl font-semibold mt-2 text-center">
                  Accessible Anytime, Anywhere
                </h2>
                <p className="text-center max-w-md">
                  Access your health records from any device with an internet
                  connection.
                </p>
              </div>
            </div>
            <div className="p-4 flex flex-col gap-y-8 border rounded shadow h-[20rem] justify-evenly items-center">
              <img
                src="https://www.iconpacks.net/icons/1/free-doctor-icon-284-thumb.png"
                alt="Doctor Collaboration"
                className="mx-auto h-32"
              />
              <div className="">
                <h2 className="text-xl font-semibold mt-2 text-center">
                  Doctor Collaboration
                </h2>
                <p className="text-center max-w-md">
                  Share your health records securely with your doctors and
                  healthcare providers.
                </p>
              </div>
            </div>
          </section>
        </main>
      </div>
      <footer className="mt-8 p-4 bg-gray-300 w-full text-center">
        <p>&copy; 2023 Blockchain EHR System</p>
      </footer>
    </div>
  );
}

export default HomePage;
