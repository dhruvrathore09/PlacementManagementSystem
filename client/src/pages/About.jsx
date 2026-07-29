const About = () => {
  return (
    <div className="min-h-screen bg-gray-100 px-6 md:px-20 py-16">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-4xl font-bold text-blue-600">About PlacePro</h1>
        <p className="mt-4 text-gray-600">
          PlacePro is a complete Placement Management System designed to
          simplify and streamline the campus recruitment process for
          educational institutions.
        </p>
      </div>

      <div className="mt-12 grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold text-gray-800">Our Mission</h2>
          <p className="mt-2 text-gray-600">
            To bridge the gap between students and recruiters by providing a
            transparent, efficient, and accessible platform that simplifies
            every step of the placement journey.
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold text-gray-800">Why PlacePro?</h2>
          <p className="mt-2 text-gray-600">
            Traditional placement processes rely on scattered spreadsheets
            and manual coordination. PlacePro brings students, recruiters,
            and placement officers onto a single, unified platform.
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold text-gray-800">Who We Serve</h2>
          <p className="mt-2 text-gray-600">
            Students looking for career opportunities, recruiters seeking
            top talent, and placement officers managing the entire process
            from start to finish.
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold text-gray-800">Our Vision</h2>
          <p className="mt-2 text-gray-600">
            To become the go-to placement management solution for
            institutions, making campus recruitment faster, fairer, and
            fully data-driven.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;