import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaClock, FaMoneyBill, FaUsers, FaTimes } from 'react-icons/fa';
import CareerApplicationForm from '../components/CareerApplicationForm';
import FloatingBalloonsGlobal from '../components/FloatingBalloonsGlobal';

const CareersSection = styled.section`
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

const JobsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
  margin: 3rem 0;
`;

const JobCard = styled(motion.div)`
  background: white;
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 0 3px 15px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const JobTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  color: ${({ theme }) => theme.colors.text};
`;

const JobDepartment = styled.p`
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 600;
  margin-bottom: 1rem;
`;

const JobDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
`;

const JobDetail = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: ${({ theme }) => theme.colors.text};
  opacity: 0.8;
  font-size: 0.9rem;
`;

const ApplyButton = styled(motion.button)`
  width: 100%;
  padding: 0.75rem;
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  border-radius: 0.5rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.secondary};
  }
`;

const ModalOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 2rem;
`;

const ModalContent = styled(motion.div)`
  background: white;
  border-radius: 1rem;
  max-width: 600px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.text};
  z-index: 10;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const Careers = () => {
  const [selectedJob, setSelectedJob] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const jobs = [
    {
      id: 1,
      title: "Senior Full Stack Developer",
      department: "Engineering",
      location: "Remote",
      type: "Full-time",
      salary: "$120k - $160k",
      description: "We're looking for an experienced full-stack developer to join our growing engineering team."
    },
    {
      id: 2,
      title: "Product Manager",
      department: "Product",
      location: "New York, NY",
      type: "Full-time",
      salary: "$110k - $140k",
      description: "Lead the product vision and strategy for our travel and expense management platform."
    },
    {
      id: 3,
      title: "Sales Executive",
      department: "Sales",
      location: "Multiple Locations",
      type: "Full-time",
      salary: "$80k - $120k + Commission",
      description: "Drive revenue growth by acquiring new enterprise clients and expanding existing accounts."
    },
    {
      id: 4,
      title: "Customer Success Manager",
      department: "Customer Success",
      location: "Remote",
      type: "Full-time",
      salary: "$70k - $90k",
      description: "Ensure our customers achieve their desired outcomes and maximize value from our platform."
    }
  ];

  const handleApplyClick = (job) => {
    setSelectedJob(job);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedJob(null);
  };

  return (
    <CareersSection>
      <FloatingBalloonsGlobal count={5} opacity={0.3} />
      <Container>
        <HeroSection>
          <HeroTitle
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Join Our Team
          </HeroTitle>
          <HeroSubtitle
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Be part of a company that's transforming how businesses manage travel and expenses
          </HeroSubtitle>
        </HeroSection>

        <JobsGrid>
          {jobs.map((job) => (
            <JobCard
              key={job.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <JobTitle>{job.title}</JobTitle>
              <JobDepartment>{job.department}</JobDepartment>
              <JobDetails>
                <JobDetail><FaMapMarkerAlt /> {job.location}</JobDetail>
                <JobDetail><FaClock /> {job.type}</JobDetail>
                <JobDetail><FaMoneyBill /> {job.salary}</JobDetail>
              </JobDetails>
              <p style={{ marginBottom: '1.5rem', color: '#6b7280' }}>{job.description}</p>
              <ApplyButton 
                whileHover={{ scale: 1.05 }} 
                whileTap={{ scale: 0.95 }}
                onClick={() => handleApplyClick(job)}
              >
                Apply Now
              </ApplyButton>
            </JobCard>
          ))}
        </JobsGrid>

        {isModalOpen && selectedJob && (
          <ModalOverlay
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
          >
            <ModalContent
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <CloseButton onClick={closeModal}>
                <FaTimes />
              </CloseButton>
              <CareerApplicationForm jobTitle={selectedJob.title} />
            </ModalContent>
          </ModalOverlay>
        )}
      </Container>
    </CareersSection>
  );
};

export default Careers;
