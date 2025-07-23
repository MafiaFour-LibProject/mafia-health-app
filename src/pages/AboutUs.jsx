import React from "react";

const AboutUs = () => {
  return (
    <div className="bg-white text-gray-800 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* About MaFia Section */}
        <h1 className="text-4xl font-extrabold text-green-600 text-center mb-8">
          About MaFia: Your Access to Immediate Aid
        </h1>
        <p className="text-lg leading-relaxed text-center mb-12">
          Welcome to{" "}
          <span className="font-semibold text-green-600">
            MaFia (My Access to Fast and Immediate Aid)
          </span>
          ! We are a team of four passionate web development Learners with
          Mest(Meiltwater Enterpreneurial School of Technology) who believe that
          timely access to critical medical resources shouldn't be a challenge.
          We've all experienced or heard stories of the frantic search for
          specific vaccines or medications, wasting precious time in urgent
          situations. That's why we created MaFia – to bridge the gap between
          those in immediate need and the healthcare facilities that can provide
          life-saving aid.
        </p>

        {/* --- */}
        <hr className="my-12 border-gray-300" />

        {/* Our Mission Section */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-700 mb-6">Our Mission</h2>
          <p className="text-lg leading-relaxed max-w-3xl mx-auto">
            Our mission is simple: to provide a{" "}
            <span className="font-semibold text-green-600">
              fast and immediate solution
            </span>{" "}
            for locating essential vaccines and medications. No more endless
            searching, no more wasted journeys. With MaFia, you can quickly
            identify nearby hospitals and pharmacies that stock rare vaccines
            like tetanus, snake bite antivenom, and others, ensuring you get the
            help you need when it matters most. We envision a world where
            everyone has instant access to the information that can save lives.
          </p>
        </div>

        {/* --- */}
        <hr className="my-12 border-gray-300" />

        {/* Meet the Team Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-700 text-center mb-10">
            Meet the Team
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            {/* Member 1 */}
            <div className="flex flex-col items-center text-center">
              <div className="w-40 h-40 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden border-4 border-green-500 shadow-lg mb-4">
                {/* Image  */}
                <img
                  src="public/images/Linda.jpg"
                  alt="Linda"
                  className="w-fit h-fit object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold text-green-600 mb-2">
                Linda Mensah
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                As the lead front-end developer, I focused on creating an
                intuitive user interface to ensure easy navigation for urgent
                situations.
              </p>
            </div>
            {/* Member 2 */}
            <div className="flex flex-col items-center text-center">
              <div className="w-40 h-40 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden border-4 border-green-500 shadow-lg mb-4">
                {/* Image  */}
                <img
                  src="public/images/Me.jpg"
                  alt="Vic"
                  className="w-fit h-fit object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold text-green-600 mb-2">
                Victoria B. Amponsah
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                An aspiring Junior Web Developer, currently honing skills at the
                prestigious Meltwater Entrepreneurial School of Technology
                (MEST) through Generation Ghana and the MasterCard Foundation. Victoria brings a robust foundation in information
                management, meticulous data handling, and administrative
                excellence, gained from diverse roles at Rivavic Company Limited
                and Cocoa Marketing Company Limited (CMC). Her journey is driven
                by a passion for problem-solving and a commitment to leveraging
                technology for impactful solutions.
              </p>
            </div>
            {/* Member 3 */}
            <div className="flex flex-col items-center text-center">
              <div className="w-40 h-40 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden border-4 border-green-500 shadow-lg mb-4">
                {/* Image  */}
                <img
                  src="public/images/Maame.jpg"
                  alt="Group Member 3"
                  className="w-fit h-fit object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold text-green-600 mb-2">
                Maame Yaa Akoto-Sampong
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Maame Yaa Akoto-Sampong is a Backend Developer and Data Analyst
                with expertise in Node.js, Express.js, MongoDB, and API
                development. She holds a Bachelor's degree in Political Science
                and History from the University of Ghana.She is currently
                pursuing a Master's in Conflict, Peace and Security. Alongside
                her studies, she is completing backend development training at
                MEST through Generation Ghana and the MasterCard Foundation.Her
                professional experience spans IT, governance, and financial
                services. She has held data analysis roles at Accenture and
                Nutrifoods Ghana. She also contributed to governance research at
                the African Union's APRM-Ghana Secretariat.Maame Yaa gained
                corporate banking experience at Universal Merchant Bank.She has
                built full-stack applications such as a Library Management
                System and a Dynamic Product Management System. Her combined
                technical, analytical, and governance skills position her to
                deliver impactful tech solutions in Ghana's healthcare and
                technology sectors.
              </p>
            </div>
            {/* Member 4 */}
            <div className="flex flex-col items-center text-center">
              <div className="w-40 h-40 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden border-4 border-green-500 shadow-lg mb-4">
                {/* Image  */}
                <img
                  src="public/images/Christable.jpg"
                  alt="Christabel"
                  className="w-fit h-fit object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold text-green-600 mb-2">
                Christable
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Full-stack Developer Skilled in designing RESTful APIs,
                implementing secure authentication flows, and maintaining clean,
                modular codebases with version control. Strong understanding of
                deployment pipelines, Git workflows, and cloud platforms like
                Render and GitHub.
              </p>
            </div>
          </div>
        </div>

        {/* --- */}
        <hr className="my-12 border-gray-300" />

        {/* Our Vision for the Future Section */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-700 mb-6">
            Our Vision for the Future
          </h2>
          <p className="text-lg leading-relaxed max-w-3xl mx-auto">
            MaFia is just the beginning. We are continuously working to expand
            our database, incorporate more features, and partner with healthcare
            providers to make our platform even more comprehensive and
            indispensable. We believe that by leveraging technology, we can
            empower individuals and improve health outcomes across communities.
          </p>
        </div>

        {/* Closing Remark */}
        <p className="text-lg text-center font-semibold text-green-700 mt-12">
          Thank you for being a part of the MaFia journey. We are dedicated to
          serving you and ensuring that immediate aid is always within your
          reach.
        </p>
      </div>
    </div>
  );
};

export default AboutUs;
