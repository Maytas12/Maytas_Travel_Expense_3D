import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaEye, FaBullseye, FaHeart, FaUsers, FaAward, FaGlobe } from 'react-icons/fa';
import FloatingBalloonsGlobal from '../components/FloatingBalloonsGlobal';

const AboutSection = styled.section`
  padding: 6rem 0;
  background: ${({ theme }) => theme.colors.light};
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
`;

const HeroSection = styled.div`
  text-align: center;
  margin-bottom: 4rem;
`;

const HeroTitle = styled(motion.h1)`
  font-size: 3rem;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.colors.text};
`;

const HeroSubtitle = styled(motion.p)`
  font-size: 1.3rem;
  color: ${({ theme }) => theme.colors.text};
  opacity: 0.8;
  max-width: 600px;
  margin: 0 auto;
`;

const MissionVisionSection = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 3rem;
  margin: 4rem 0;
`;

const MissionCard = styled(motion.div)`
  background: white;
  padding: 2.5rem;
  border-radius: 1rem;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const CardIcon = styled.div`
  font-size: 3rem;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 1.5rem;
`;

const CardTitle = styled.h3`
  font-size: 1.8rem;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.colors.text};
`;

const CardContent = styled.p`
  color: ${({ theme }) => theme.colors.text};
  opacity: 0.8;
  line-height: 1.8;
`;

const ValuesSection = styled.div`
  margin: 4rem 0;
`;

const SectionTitle = styled(motion.h2)`
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 3rem;
  color: ${({ theme }) => theme.colors.text};
`;

const ValuesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
`;

const ValueCard = styled(motion.div)`
  background: white;
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 0 3px 15px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const About = () => {
  const values = [
    {
      icon: <FaEye />,
      title: "Innovation",
      description: "We continuously innovate to provide cutting-edge solutions that transform how businesses manage travel and expenses."
    },
    {
      icon: <FaUsers />,
      title: "Customer First",
      description: "Our customers are at the heart of everything we do. We strive to exceed expectations and deliver exceptional experiences."
    },
    {
      icon: <FaHeart />,
      title: "Integrity",
      description: "We operate with transparency, honesty, and ethical practices in all our business dealings."
    },
    {
      icon: <FaGlobe />,
      title: "Global Excellence",
      description: "We provide world-class solutions with local expertise, serving clients across the globe."
    }
  ];

  return (
    <AboutSection>
      <FloatingBalloonsGlobal count={5} opacity={0.3} />
      <Container>
        <HeroSection>
          <HeroTitle
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            About Maytas Travel Expense
          </HeroTitle>
          <HeroSubtitle
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Empowering businesses worldwide with intelligent travel and expense management solutions
          </HeroSubtitle>
        </HeroSection>

        <MissionVisionSection>
          <MissionCard
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <CardIcon><FaBullseye /></CardIcon>
            <CardTitle>Our Mission</CardTitle>
            <CardContent>
              To revolutionize business travel and expense management by providing innovative, user-friendly solutions that save time, reduce costs, and enhance compliance for organizations worldwide.
            </CardContent>
          </MissionCard>

          <MissionCard
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <CardIcon><FaEye /></CardIcon>
            <CardTitle>Our Vision</CardTitle>
            <CardContent>
              To become the global leader in travel and expense management, setting new standards for efficiency, transparency, and user experience in corporate travel programs.
            </CardContent>
          </MissionCard>
        </MissionVisionSection>

        <ValuesSection>
          <SectionTitle
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Our Core Values
          </SectionTitle>
          <ValuesGrid>
            {values.map((value, index) => (
              <ValueCard
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <CardIcon>{value.icon}</CardIcon>
                <CardTitle>{value.title}</CardTitle>
                <CardContent>{value.description}</CardContent>
              </ValueCard>
            ))}
          </ValuesGrid>
        </ValuesSection>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          style={{ marginTop: '4rem', textAlign: 'center' }}
        >
          <h3 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Our Journey</h3>
          <p style={{ fontSize: '1.2rem', lineHeight: '1.8', maxWidth: '800px', margin: '0 auto' }}>
            Founded in 2015, Maytas Travel Expense has grown from a small startup to a trusted partner for thousands of businesses worldwide. 
            Our commitment to innovation and customer satisfaction has driven our success, helping organizations save millions in travel costs 
            while improving employee satisfaction and compliance rates.
          </p>
        </motion.div>
      </Container>
    </AboutSection>
  );
};

export default About;
