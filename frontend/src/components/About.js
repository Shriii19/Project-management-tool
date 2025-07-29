import React from 'react';
import { motion } from 'framer-motion';
import { 
  CheckCircleIcon, 
  ClipboardDocumentListIcon,
  ArrowTrendingUpIcon,
  UserGroupIcon,
  LightBulbIcon,
  StarIcon
} from '@heroicons/react/24/outline';

const About = () => {
  const features = [
    {
      icon: CheckCircleIcon,
      title: 'Task Management',
      description: 'Create, edit, and organize your tasks with ease. Set priorities and due dates to stay on track.',
      color: 'green'
    },
    {
      icon: ClipboardDocumentListIcon,
      title: 'Project Organization',
      description: 'Keep all your projects organized in one place with intuitive categorization and filtering.',
      color: 'blue'
    },
    {
      icon: ArrowTrendingUpIcon,
      title: 'Progress Tracking',
      description: 'Monitor your productivity with detailed analytics and completion tracking.',
      color: 'purple'
    },
    {
      icon: UserGroupIcon,
      title: 'Team Collaboration',
      description: 'Work together with your team members and share project progress seamlessly.',
      color: 'yellow'
    }
  ];

  const benefits = [
    'Boost productivity by up to 40%',
    'Never miss a deadline again',
    'Streamlined workflow management',
    'Real-time collaboration features',
    'Comprehensive reporting tools',
    'Mobile-friendly interface'
  ];

  const stats = [
    { value: '10K+', label: 'Active Users' },
    { value: '50K+', label: 'Tasks Completed' },
    { value: '99.9%', label: 'Uptime' },
    { value: '4.8★', label: 'User Rating' }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <motion.div 
      className="about-page"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Hero Section */}
      <motion.section className="hero-section" variants={itemVariants}>
        <div className="hero-content">
          <motion.div 
            className="hero-icon"
            animate={{ 
              rotate: [0, 5, -5, 0],
              scale: [1, 1.05, 1]
            }}
            transition={{ 
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <ClipboardDocumentListIcon className="w-20 h-20" />
          </motion.div>
          <h1>ProjectFlow</h1>
          <p className="hero-subtitle">
            The ultimate task management solution designed to streamline your workflow 
            and boost productivity. Built for individuals and teams who value efficiency.
          </p>
          <motion.div 
            className="hero-cta"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <LightBulbIcon className="w-5 h-5" />
            Empowering productivity since 2024
          </motion.div>
        </div>
      </motion.section>

      {/* Stats Section */}
      <motion.section className="stats-section" variants={itemVariants}>
        <div className="stats-grid">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="stat-item"
              variants={itemVariants}
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <div className="stat-value">{stat.value}</div>
              <div className="stat-label">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Features Section */}
      <motion.section className="features-section" variants={itemVariants}>
        <div className="section-header">
          <h2>Powerful Features</h2>
          <p>Everything you need to manage your projects effectively</p>
        </div>
        
        <div className="features-grid">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                className={`feature-card feature-${feature.color}`}
                variants={itemVariants}
                whileHover={{ 
                  scale: 1.03, 
                  y: -5,
                  transition: { duration: 0.2 }
                }}
              >
                <div className="feature-icon">
                  <Icon className="w-8 h-8" />
                </div>
                <div className="feature-content">
                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.section>

      {/* Benefits Section */}
      <motion.section className="benefits-section" variants={itemVariants}>
        <div className="benefits-content">
          <div className="benefits-text">
            <h2>Why Choose ProjectFlow?</h2>
            <p>
              Our platform is designed with user experience in mind, offering intuitive 
              interfaces and powerful features that adapt to your workflow.
            </p>
            <ul className="benefits-list">
              {benefits.map((benefit, index) => (
                <motion.li
                  key={benefit}
                  variants={itemVariants}
                  whileHover={{ x: 5 }}
                >
                  <CheckCircleIcon className="w-5 h-5" />
                  {benefit}
                </motion.li>
              ))}
            </ul>
          </div>
          
          <motion.div 
            className="benefits-visual"
            animate={{ 
              y: [0, -10, 0],
            }}
            transition={{ 
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <div className="visual-card">
              <div className="visual-header">
                <div className="visual-dots">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
                <span>ProjectFlow</span>
              </div>
              <div className="visual-content">
                <div className="visual-task completed">
                  <CheckCircleIcon className="w-4 h-4" />
                  Design Homepage
                </div>
                <div className="visual-task">
                  <div className="task-circle"></div>
                  Implement Authentication
                </div>
                <div className="visual-task">
                  <div className="task-circle"></div>
                  Write Documentation
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Mission Section */}
      <motion.section className="mission-section" variants={itemVariants}>
        <div className="mission-content">
          <h2>Our Mission</h2>
          <p>
            To provide a seamless, intuitive, and powerful project management experience 
            that empowers individuals and teams to achieve their goals efficiently. We believe 
            that great tools should get out of your way and let you focus on what matters most.
          </p>
          
          <div className="mission-values">
            <div className="value">
              <StarIcon className="w-6 h-6" />
              <h4>Excellence</h4>
              <p>We strive for perfection in every feature</p>
            </div>
            <div className="value">
              <UserGroupIcon className="w-6 h-6" />
              <h4>Collaboration</h4>
              <p>Building tools that bring teams together</p>
            </div>
            <div className="value">
              <LightBulbIcon className="w-6 h-6" />
              <h4>Innovation</h4>
              <p>Constantly evolving with user needs</p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Contact Section */}
      <motion.section className="contact-section" variants={itemVariants}>
        <div className="contact-content">
          <h2>Get in Touch</h2>
          <p>Have questions or feedback? We'd love to hear from you!</p>
          
          <div className="contact-info">
            <div className="contact-item">
              <strong>Email:</strong> hello@projectflow.com
            </div>
            <div className="contact-item">
              <strong>Support:</strong> support@projectflow.com
            </div>
            <div className="contact-item">
              <strong>Phone:</strong> +1 (555) 123-4567
            </div>
          </div>
        </div>
      </motion.section>

      <style jsx>{`
        .about-page {
          max-width: 1200px;
          margin: 0 auto;
          padding: 2rem 1rem;
        }

        .hero-section {
          text-align: center;
          padding: 4rem 0;
          background: linear-gradient(135deg, var(--primary-color), var(--primary-dark));
          border-radius: var(--radius-lg);
          color: white;
          margin-bottom: 3rem;
        }

        .hero-content {
          max-width: 600px;
          margin: 0 auto;
        }

        .hero-icon {
          display: inline-block;
          margin-bottom: 2rem;
        }

        .hero-section h1 {
          font-size: 3.5rem;
          font-weight: 700;
          margin-bottom: 1rem;
        }

        .hero-subtitle {
          font-size: 1.25rem;
          line-height: 1.6;
          margin-bottom: 2rem;
          opacity: 0.9;
        }

        .hero-cta {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1.5rem;
          background: rgba(255, 255, 255, 0.2);
          border-radius: 9999px;
          font-weight: 500;
          backdrop-filter: blur(10px);
        }

        .stats-section {
          margin-bottom: 4rem;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 2rem;
        }

        .stat-item {
          text-align: center;
          padding: 2rem;
          background: var(--background-light);
          border-radius: var(--radius-lg);
          box-shadow: var(--shadow-md);
          border: 1px solid var(--border-color);
        }

        .stat-value {
          font-size: 3rem;
          font-weight: 700;
          color: var(--primary-color);
          margin-bottom: 0.5rem;
        }

        .stat-label {
          color: var(--text-secondary);
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          font-size: 0.875rem;
        }

        .features-section {
          margin-bottom: 4rem;
        }

        .section-header {
          text-align: center;
          margin-bottom: 3rem;
        }

        .section-header h2 {
          font-size: 2.5rem;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 1rem;
        }

        .section-header p {
          font-size: 1.125rem;
          color: var(--text-secondary);
        }

        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
        }

        .feature-card {
          padding: 2rem;
          background: var(--background-light);
          border-radius: var(--radius-lg);
          box-shadow: var(--shadow-sm);
          border: 1px solid var(--border-color);
          transition: all 0.3s ease-in-out;
        }

        .feature-icon {
          width: 4rem;
          height: 4rem;
          border-radius: var(--radius-lg);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1.5rem;
          color: white;
        }

        .feature-green .feature-icon {
          background: linear-gradient(135deg, #10b981, #047857);
        }

        .feature-blue .feature-icon {
          background: linear-gradient(135deg, #3b82f6, #1d4ed8);
        }

        .feature-purple .feature-icon {
          background: linear-gradient(135deg, #8b5cf6, #7c3aed);
        }

        .feature-yellow .feature-icon {
          background: linear-gradient(135deg, #f59e0b, #d97706);
        }

        .feature-content h3 {
          font-size: 1.25rem;
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: 1rem;
        }

        .feature-content p {
          color: var(--text-secondary);
          line-height: 1.6;
        }

        .benefits-section {
          margin-bottom: 4rem;
        }

        .benefits-content {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          align-items: center;
        }

        .benefits-text h2 {
          font-size: 2.5rem;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 1rem;
        }

        .benefits-text p {
          font-size: 1.125rem;
          color: var(--text-secondary);
          line-height: 1.6;
          margin-bottom: 2rem;
        }

        .benefits-list {
          list-style: none;
          padding: 0;
        }

        .benefits-list li {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.75rem 0;
          font-weight: 500;
          color: var(--text-primary);
        }

        .benefits-list li svg {
          color: var(--accent-color);
          flex-shrink: 0;
        }

        .benefits-visual {
          display: flex;
          justify-content: center;
        }

        .visual-card {
          background: var(--background-light);
          border-radius: var(--radius-lg);
          box-shadow: var(--shadow-lg);
          border: 1px solid var(--border-color);
          overflow: hidden;
          width: 300px;
        }

        .visual-header {
          padding: 1rem;
          background: var(--secondary-color);
          display: flex;
          align-items: center;
          gap: 1rem;
          border-bottom: 1px solid var(--border-color);
        }

        .visual-dots {
          display: flex;
          gap: 0.25rem;
        }

        .visual-dots span {
          width: 0.75rem;
          height: 0.75rem;
          border-radius: 50%;
          background: var(--text-secondary);
        }

        .visual-header span {
          font-weight: 600;
          color: var(--text-primary);
        }

        .visual-content {
          padding: 1.5rem;
        }

        .visual-task {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.75rem 0;
          color: var(--text-primary);
        }

        .visual-task.completed {
          color: var(--accent-color);
        }

        .visual-task.completed svg {
          color: var(--accent-color);
        }

        .task-circle {
          width: 1rem;
          height: 1rem;
          border: 2px solid var(--border-color);
          border-radius: 50%;
        }

        .mission-section {
          text-align: center;
          padding: 4rem 2rem;
          background: var(--secondary-color);
          border-radius: var(--radius-lg);
          margin-bottom: 4rem;
        }

        .mission-content h2 {
          font-size: 2.5rem;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 2rem;
        }

        .mission-content p {
          font-size: 1.125rem;
          color: var(--text-secondary);
          line-height: 1.7;
          max-width: 800px;
          margin: 0 auto 3rem;
        }

        .mission-values {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 2rem;
          max-width: 800px;
          margin: 0 auto;
        }

        .value {
          padding: 1.5rem;
          background: var(--background-light);
          border-radius: var(--radius-md);
          border: 1px solid var(--border-color);
        }

        .value svg {
          color: var(--primary-color);
          margin-bottom: 1rem;
        }

        .value h4 {
          font-size: 1.125rem;
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: 0.5rem;
        }

        .value p {
          color: var(--text-secondary);
          font-size: 0.875rem;
          margin: 0;
        }

        .contact-section {
          text-align: center;
          padding: 3rem 2rem;
          background: var(--background-light);
          border-radius: var(--radius-lg);
          box-shadow: var(--shadow-md);
          border: 1px solid var(--border-color);
        }

        .contact-content h2 {
          font-size: 2rem;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 1rem;
        }

        .contact-content p {
          font-size: 1.125rem;
          color: var(--text-secondary);
          margin-bottom: 2rem;
        }

        .contact-info {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          max-width: 400px;
          margin: 0 auto;
        }

        .contact-item {
          padding: 1rem;
          background: var(--secondary-color);
          border-radius: var(--radius-md);
          text-align: left;
        }

        .contact-item strong {
          color: var(--text-primary);
        }

        @media (max-width: 768px) {
          .hero-section h1 {
            font-size: 2.5rem;
          }

          .section-header h2,
          .benefits-text h2,
          .mission-content h2 {
            font-size: 2rem;
          }

          .stats-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .features-grid {
            grid-template-columns: 1fr;
          }

          .benefits-content {
            grid-template-columns: 1fr;
            gap: 2rem;
          }

          .mission-values {
            grid-template-columns: 1fr;
          }

          .contact-info {
            gap: 0.5rem;
          }
        }
      `}</style>
    </motion.div>
  );
};

export default About;
