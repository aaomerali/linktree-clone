// pages/Home.jsx
import { Link } from 'react-router-dom';
import { BeakerIcon, ChartBarIcon, DevicePhoneMobileIcon, PencilSquareIcon } from '@heroicons/react/24/outline';

function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 to-purple-500 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in-down">
            Your Digital Business Card
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90">
            Connect your audience to all your important links in one place
          </p>
          <div className="flex justify-center space-x-4">
            <Link 
              to="/register" 
              className="bg-white text-blue-600 px-8 py-3 rounded-full text-lg font-semibold hover:bg-opacity-90 transition-all shadow-lg"
            >
              Get Started Free
            </Link>
          </div>
          
          {/* Preview Image */}
          <div className="mt-16 max-w-4xl mx-auto bg-white rounded-xl shadow-2xl overflow-hidden border-8 border-white">
            <img 
              src="https://res.cloudinary.com/vistaprint/images/w_1024,h_600,c_scale,w_448,h_262,dpr_2/f_auto,q_auto/v1712327409/ideas-and-advice-sandbox/blogadmin/Social-media-advertising-and-design-tips/Social-media-advertising-and-design-tips.jpg?_i=AA" 
              alt="Profile Preview" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16 text-gray-800">
            Why Choose LinkFolio?
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: PencilSquareIcon,
                title: "Customizable Links",
                desc: "Easily add, edit and organize your links with drag-and-drop"
              },
              {
                icon: BeakerIcon,
                title: "Personal Branding",
                desc: "Upload photos, set colors, and create your unique style"
              },
              {
                icon: ChartBarIcon,
                title: "Analytics",
                desc: "Track clicks and visitor insights (coming soon)"
              },
              {
                icon: DevicePhoneMobileIcon,
                title: "Mobile Ready",
                desc: "Perfectly responsive on all devices"
              }
            ].map((feature, index) => (
              <div key={index} className="bg-white p-8 rounded-xl hover:shadow-lg transition-shadow">
                <feature.icon className="h-12 w-12 text-blue-600 mb-6" />
                <h3 className="text-xl font-bold mb-4 text-gray-800">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16 text-gray-800">
            Simple Setup in 3 Steps
          </h2>
          
          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex-1 text-center p-6">
              <div className="w-16 h-16 bg-blue-600 rounded-full text-white text-2xl font-bold flex items-center justify-center mx-auto mb-6">
                1
              </div>
              <h3 className="text-xl font-bold mb-4">Create Account</h3>
              <p className="text-gray-600">Sign up in 30 seconds with email</p>
            </div>
            
            <div className="flex-1 text-center p-6">
              <div className="w-16 h-16 bg-blue-600 rounded-full text-white text-2xl font-bold flex items-center justify-center mx-auto mb-6">
                2
              </div>
              <h3 className="text-xl font-bold mb-4">Add Your Links</h3>
              <p className="text-gray-600">Social media, websites, portfolios</p>
            </div>
            
            <div className="flex-1 text-center p-6">
              <div className="w-16 h-16 bg-blue-600 rounded-full text-white text-2xl font-bold flex items-center justify-center mx-auto mb-6">
                3
              </div>
              <h3 className="text-xl font-bold mb-4">Share Your Profile</h3>
              <p className="text-gray-600">One link to rule them all</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16">
            What Our Users Say
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white bg-opacity-10 p-8 rounded-xl backdrop-blur-sm">
                <p className="text-lg mb-6">"This platform transformed how I share my work. So easy to use and professional!"</p>
                <div className="flex items-center">
                  <img 
                    src={`https://i.pravatar.cc/100?img=${i}`} 
                    alt="User" 
                    className="w-12 h-12 rounded-full mr-4" 
                  />
                  <div>
                    <h4 className="font-bold">John Doe</h4>
                    <p className="text-blue-200">@johndoe</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="mb-8 text-gray-400">Join thousands of professionals already using LinkFolio</p>
          <Link 
            to="/register" 
            className="inline-block bg-blue-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Create Free Account
          </Link>
          <p className="mt-8 text-gray-400 text-sm">
            © 2025 LinkFolio. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default Home;