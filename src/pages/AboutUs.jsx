import { Link } from "lucide-react";
import Navbar from "../components/Navbar";

const AboutUs = () => {
  return (
    <>
      <Navbar />
      <div className="bg-white text-gray-800 py-12 px-4 sm:px-6 lg:px-8 font-sans">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <div className="bg-gradient-to-r from-blue-900 to-cyan-900 rounded-xl p-8 mb-12 text-white text-center">
            <h1 className="text-4xl font-extrabold mb-6">About CodeBlue</h1>
            <p className="text-xl max-w-4xl mx-auto leading-relaxed">
              Your trusted access to fast and immediate medical aid when it
              matters most.
            </p>
          </div>

          {/* Introduction */}
          <div className="bg-blue-50 rounded-lg p-8 mb-12 border-l-4 border-blue-800">
            <p className="text-lg leading-relaxed">
              Welcome to{" "}
              <span className="font-semibold text-blue-800">CodeBlue</span>! We
              are a team of four passionate web development learners with MEST
              (Meltwater Entrepreneurial School of Technology) who believe that
              timely access to critical medical resources shouldn't be a
              challenge. Our platform bridges the gap between those in immediate
              need and the healthcare facilities that can provide life-saving
              aid.
            </p>
          </div>

          {/* Mission and Vision */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white rounded-lg shadow-md p-6 border-t-4 border-blue-700">
              <h2 className="text-2xl font-bold text-blue-800 mb-4">
                Our Mission
              </h2>
              <p className="text-gray-700 leading-relaxed">
                To provide a{" "}
                <span className="font-semibold text-blue-700">
                  fast and immediate solution
                </span>
                for locating essential vaccines and medications. With CodeBlue,
                you can quickly identify nearby hospitals and pharmacies that
                stock rare vaccines, ensuring you get help when it matters most.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 border-t-4 border-cyan-700">
              <h2 className="text-2xl font-bold text-cyan-800 mb-4">
                Our Vision
              </h2>
              <p className="text-gray-700 leading-relaxed">
                CodeBlue is just the beginning. We're expanding our database and
                features to partner with healthcare providers, empowering
                individuals and improving health outcomes across communities
                through technology.
              </p>
            </div>
          </div>

          {/* Team Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
              Meet Our Team
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Team Member 1 */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="h-64 bg-blue-100 flex items-center justify-center p-4">
                  <img
                    src="/images/LInda.jpg"
                    alt="Linda A.K. Mensah"
                    className="h-full w-full object-contain"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    Linda A.K. Mensah
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Lead front-end developer focused on creating intuitive
                    interfaces for urgent situations.
                  </p>
                </div>
              </div>

              {/* Team Member 2 */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="h-64 bg-blue-100 flex items-center justify-center p-4">
                  <img
                    src="/images/Me.jpg"
                    alt="Victoria B. Amponsah"
                    className="h-full w-full object-contain"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    Victoria B. Amponsah
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Junior Web Developer with a background in information
                    management and administrative excellence.
                  </p>
                </div>
              </div>

              {/* Team Member 3 */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="h-64 bg-blue-100 flex items-center justify-center p-4">
                  <img
                    src="/images/Maame.jpg"
                    alt="Maame Yaa Akoto-Sampong"
                    className="h-full w-full object-contain"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    Maame Yaa Akoto-Sampong
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Backend Developer and Data Analyst with expertise in
                    Node.js, Express.js, and MongoDB.
                  </p>
                </div>
              </div>

              {/* Team Member 4 */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="h-64 bg-blue-100 flex items-center justify-center p-4">
                  <img
                    src="/images/Christable.jpg"
                    alt="Christabel Aidoo"
                    className="h-full w-full object-contain"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    Christabel Aidoo
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Full-stack Developer skilled in RESTful APIs, authentication
                    flows, and deployment pipelines.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-blue-900 rounded-xl p-8 text-center text-white">
            <h2 className="text-2xl font-bold mb-4">
              Join Us in Making a Difference
            </h2>
            <p className="mb-6 max-w-2xl mx-auto">
              Together, we can ensure immediate aid is always within reach when
              lives are on the line.
            </p>
            <button className="bg-cyan-600 hover:bg-cyan-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors">
              Contact Our Team
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutUs;
