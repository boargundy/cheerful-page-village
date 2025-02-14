
import { motion } from "framer-motion";
import { ChevronDown, Zap, Shield, Globe } from "lucide-react";
import { useEffect, useState } from "react";

const Index = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const features = [
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Lightning Fast",
      description: "Optimized for speed and performance",
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Secure",
      description: "Built with security in mind",
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Global",
      description: "Ready for worldwide deployment",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center section-padding overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-secondary/50 to-transparent pointer-events-none" />
        <div className="relative z-10 text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="px-4 py-2 rounded-full bg-primary/5 text-primary text-sm font-medium mb-6 inline-block">
              Welcome to the future
            </span>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
              Create something extraordinary
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Experience the perfect blend of design and functionality
            </p>
            <button className="px-8 py-4 bg-primary text-white rounded-lg font-medium transition-all hover:translate-y-[-2px] hover:shadow-lg">
              Get Started
            </button>
          </motion.div>
        </div>
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-float">
          <ChevronDown className="w-6 h-6 text-gray-400" />
        </div>
      </section>

      {/* Features Section */}
      <section className="section-padding bg-secondary/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <span className="px-4 py-2 rounded-full bg-primary/5 text-primary text-sm font-medium mb-6 inline-block">
                Features
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Everything you need
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Carefully crafted features that make all the difference
              </p>
            </motion.div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="card-gradient p-8 rounded-2xl"
              >
                <div className="w-12 h-12 bg-primary/5 rounded-xl flex items-center justify-center mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
