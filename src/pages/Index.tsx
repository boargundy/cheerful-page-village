
import { motion } from "framer-motion";
import { ChevronDown, Zap, Shield, Globe } from "lucide-react";
import { useEffect, useState } from "react";
import P5Animation from "@/components/P5Animation";
import { createParticleSystemSketch } from "@/components/sketches/ParticleSystem";
import { createFluidSimulationSketch } from "@/components/sketches/FluidSimulation";
import { createInteractiveWavesSketch } from "@/components/sketches/InteractiveWaves";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const Index = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeSketch, setActiveSketch] = useState<string>("particles");

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

  const testimonials = [
    {
      name: "Sarah Johnson",
      title: "CEO, TechStart",
      content: "This product has transformed our workflow completely. Highly recommended!",
      avatar: "https://i.pravatar.cc/150?img=1",
    },
    {
      name: "Mark Thompson",
      title: "CTO, Innovate Inc",
      content: "The best solution we've found after years of searching. Simply incredible.",
      avatar: "https://i.pravatar.cc/150?img=2",
    },
    {
      name: "Lisa Chen",
      title: "Product Manager, Next Level",
      content: "Our team productivity increased by 200% since we started using this platform.",
      avatar: "https://i.pravatar.cc/150?img=3",
    },
  ];

  return (
    <div className="min-h-screen overflow-hidden">
      {/* Hero Section with Particle Animation */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <P5Animation sketch={createParticleSystemSketch()} className="w-full h-full" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/30 to-background/80 pointer-events-none" />
        
        <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6 inline-block backdrop-blur-md">
              Welcome to the future
            </span>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
              Create something extraordinary
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Experience the perfect blend of design and functionality
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="px-8 hover:scale-105 transition-all">
                Get Started
              </Button>
              <Button size="lg" variant="outline" className="px-8 backdrop-blur-sm bg-background/50 hover:scale-105 transition-all">
                Learn More
              </Button>
            </div>
          </motion.div>
        </div>
        
        <motion.div 
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <ChevronDown className="w-6 h-6 text-primary" />
        </motion.div>
      </section>

      {/* Features Section with Fluid Simulation */}
      <section className="relative py-24">
        <div className="absolute inset-0 -z-10">
          <P5Animation sketch={createFluidSimulationSketch()} className="w-full h-full" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 to-background/60 pointer-events-none" />
        
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <span className="px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6 inline-block backdrop-blur-md">
                Features
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Everything you need
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Carefully crafted features that make all the difference
              </p>
            </motion.div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20, rotateY: 45 }}
                whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
                transition={{ 
                  duration: 0.6, 
                  delay: index * 0.2,
                  type: "spring",
                  stiffness: 100
                }}
                whileHover={{ 
                  scale: 1.05,
                  rotateY: 5,
                  transition: { duration: 0.2 }
                }}
                viewport={{ once: true }}
                className="card-gradient p-8 rounded-2xl backdrop-blur-md"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Product Demo */}
      <section className="relative py-24 bg-gradient-to-b from-background/90 to-background">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <span className="px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6 inline-block">
                Interactive Demo
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                See it in action
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Move your mouse to interact with the animation
              </p>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-2xl border border-border mb-16"
          >
            <P5Animation sketch={createInteractiveWavesSketch()} className="w-full" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-background/30 backdrop-blur-md p-8 rounded-xl max-w-md text-center">
                <h3 className="text-2xl font-bold mb-2">Interactive Experience</h3>
                <p className="mb-4">Move your cursor across the screen to change the wave patterns.</p>
                <Button>Try the full version</Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-gradient-to-b from-background to-background/80">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <span className="px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6 inline-block">
                Testimonials
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                What our clients say
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Don't just take our word for it
              </p>
            </motion.div>
          </div>

          <Carousel className="w-full max-w-4xl mx-auto">
            <CarouselContent>
              {testimonials.map((testimonial, index) => (
                <CarouselItem key={index}>
                  <Card className="border-none bg-gradient-to-br from-primary/5 to-primary/10">
                    <CardContent className="p-8">
                      <div className="flex flex-col items-center text-center">
                        <div className="w-20 h-20 rounded-full overflow-hidden mb-4 border-2 border-primary/20">
                          <img 
                            src={testimonial.avatar} 
                            alt={testimonial.name}
                            className="w-full h-full object-cover" 
                          />
                        </div>
                        <blockquote className="text-xl italic mb-6">"{testimonial.content}"</blockquote>
                        <div>
                          <h4 className="font-semibold">{testimonial.name}</h4>
                          <p className="text-sm text-muted-foreground">{testimonial.title}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex justify-center mt-6 gap-2">
              <CarouselPrevious variant="outline" />
              <CarouselNext variant="outline" />
            </div>
          </Carousel>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-24 bg-gradient-to-b from-background/80 to-background">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-primary/20 to-primary/5 backdrop-blur-md p-12 md:p-16 rounded-3xl text-center"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Ready to get started?</h2>
            <p className="text-lg mb-8 max-w-xl mx-auto text-muted-foreground">
              Join thousands of satisfied customers and transform your experience today.
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button size="lg" className="px-10">
                Get Started Now
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Index;
