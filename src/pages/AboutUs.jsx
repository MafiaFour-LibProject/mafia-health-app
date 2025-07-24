import { Link } from "lucide-react";
import Navbar from "../components/Navbar";
import { Mail, Phone, Users, Globe, HeartPulse } from "lucide-react";

const AboutUs = () => {
  return (
    <>
      {/* <Navbar /> */}
      <div className="bg-white text-gray-800 font-sans">
        <div className="relative bg-gradient-to-r from-[#00853e] to-[#043927] py-20 px-6 text-center text-white overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0 bg-[url('/images/medical-pattern.svg')] bg-repeat opacity-30"></div>
          </div>
          <div className="relative max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              About <span className="text-[#a3d5b0]">CodeBlue</span>
            </h1>
            <p className="text-xl md:text-2xl leading-relaxed max-w-3xl mx-auto">
              Your trusted access to fast and immediate medical aid when it
              matters most.
            </p>
          </div>
        </div>

        {/* Introduction */}
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="bg-[#f8faf9] rounded-2xl p-8 md:p-12 border-l-4 border-[#00853e] shadow-sm">
            <div className="flex items-center gap-4 mb-6">
              <HeartPulse className="text-[#00853e] w-8 h-8" />
              <h2 className="text-2xl font-bold text-[#043927]">Our Story</h2>
            </div>
            <p className="text-lg leading-relaxed text-gray-700">
              Welcome to{" "}
              <span className="font-semibold text-[#00853e]">CodeBlue</span>! We
              are a team of four passionate web development learners with MEST
              (Meltwater Entrepreneurial School of Technology) who believe that
              timely access to critical medical resources shouldn't be a
              challenge. Our platform bridges the gap between those in immediate
              need and the healthcare facilities that can provide life-saving
              aid.
            </p>
          </div>
        </div>

        {/* Mission and Vision */}
        <div className="bg-[#f0f7f2] py-16">
          <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-sm border-t-4 border-[#00853e] hover:shadow-md transition-shadow">
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-[#00853e]/10 p-3 rounded-full">
                  <Users className="text-[#00853e] w-6 h-6" />
                </div>
                <h2 className="text-2xl font-bold text-[#043927]">
                  Our Mission
                </h2>
              </div>
              <p className="text-gray-700 leading-relaxed">
                To provide a{" "}
                <span className="font-semibold text-[#00853e]">
                  fast and immediate solution
                </span>
                for locating essential vaccines and medications. With CodeBlue,
                you can quickly identify nearby hospitals and pharmacies that
                stock rare vaccines, ensuring you get help when it matters most.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-sm border-t-4 border-[#66c68c] hover:shadow-md transition-shadow">
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-[#66c68c]/10 p-3 rounded-full">
                  <Globe className="text-[#66c68c] w-6 h-6" />
                </div>
                <h2 className="text-2xl font-bold text-[#043927]">
                  Our Vision
                </h2>
              </div>
              <p className="text-gray-700 leading-relaxed">
                CodeBlue is just the beginning. We're expanding our database and
                features to partner with healthcare providers, empowering
                individuals and improving health outcomes across communities
                through technology.
              </p>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-[#043927] mb-4">
              Meet Our Team
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              The passionate individuals working to make healthcare accessible
              to everyone
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                name: "Linda A.K. Mensah",
                role: "Lead Front-end Developer",
                bio: "Creates intuitive interfaces for urgent medical situations",
                image: "/images/LInda.jpg",
              },
              {
                name: "Victoria B. Amponsah",
                role: "Junior Web Developer",
                bio: "Information management and administrative excellence",
                image: "/images/Me.jpg",
              },
              {
                name: "Maame Yaa Akoto-Sampong",
                role: "Backend Developer & Data Analyst",
                bio: "Expertise in Node.js, Express.js, and MongoDB",
                image: "/images/Maame.jpg",
              },
              {
                name: "Christabel Aidoo",
                role: "Full-stack Developer",
                bio: "Skilled in RESTful APIs and deployment pipelines",
                image: "/images/Christable.jpg",
              },
            ].map((member, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow group"
              >
                <div className="h-64 bg-[#f0f7f2] flex items-center justify-center p-4 relative overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="h-full w-full object-contain group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#043927]/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                    <p className="text-white text-sm">{member.bio}</p>
                  </div>
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-xl font-bold text-[#043927] mb-1">
                    {member.name}
                  </h3>
                  <p className="text-[#00853e] font-medium">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-[#043927] py-16 px-6">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h2 className="text-3xl font-bold mb-6">
              Join Us in Making a Difference
            </h2>
            <p className="text-xl text-[#a3d5b0] mb-8 max-w-2xl mx-auto">
              Together, we can ensure immediate aid is always within reach when
              lives are on the line.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button className="bg-[#00853e] hover:bg-[#006f34] text-white font-semibold py-3 px-8 rounded-lg transition-colors">
                Contact Our Team
              </button>
              <button className="bg-transparent hover:bg-white/10 text-white font-semibold py-3 px-8 rounded-lg border-2 border-white transition-colors">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutUs;
