import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaCalendarAlt, FaTimes } from 'react-icons/fa';
import FloatingBalloonsGlobal from '../components/FloatingBalloonsGlobal';
const GallerySection = styled.section`
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

const FilterButtons = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 3rem;
  flex-wrap: wrap;
`;

const FilterButton = styled(motion.button)`
  padding: 0.75rem 1.5rem;
  background: ${({ active, theme }) => active ? theme.colors.primary : 'white'};
  color: ${({ active }) => active ? 'white' : '#6b7280'};
  border: 1px solid #e5e7eb;
  border-radius: 2rem;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.primary};
    color: white;
  }
`;

const GalleryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
`;

const GalleryItem = styled(motion.div)`
  position: relative;
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
  cursor: pointer;

  &:hover {
    .overlay {
      opacity: 1;
    }
  }
`;

const GalleryImage = styled.img`
  width: 100%;
  height: 250px;
  object-fit: cover;
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  opacity: 0;
  transition: opacity 0.3s ease;
  padding: 1rem;
`;

const ImageTitle = styled.h3`
  font-size: 1.3rem;
  margin-bottom: 0.5rem;
  text-align: center;
`;

const ImageDetails = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  opacity: 0.9;
  margin-bottom: 0.25rem;
`;

const Modal = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  padding: 2rem;
`;

const ModalContent = styled.div`
  position: relative;
  max-width: 800px;
  max-height: 90vh;
`;

const ModalImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 1rem;
`;

const CloseButton = styled.button`
  position: absolute;
  top: -40px;
  right: 0;
  background: none;
  border: none;
  color: white;
  font-size: 2rem;
  cursor: pointer;
`;

const Gallery = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedImage, setSelectedImage] = useState(null);

  const galleryItems = [
    {
      id: 1,
      title: "Team Building Event 2024",
      category: "events",
      location: "Bali, Indonesia",
      date: "March 2024",
      image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
    },
    {
      id: 2,
      title: "Corporate Office",
      category: "culture",
      location: "New York, USA",
      date: "January 2024",
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2069&q=80"
    },
    {
      id: 3,
      title: "Business Conference",
      category: "events",
      location: "London, UK",
      date: "February 2024",
      image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
    },
    {
      id: 4,
      title: "Team Lunch",
      category: "culture",
      location: "San Francisco, CA",
      date: "January 2024",
      image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&auto=format&fit=crop&w=2074&q=80"
    },
    {
      id: 5,
      title: "Product Launch",
      category: "events",
      location: "Singapore",
      date: "December 2023",
      image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
    },
    {
      id: 6,
      title: "Office Workspace",
      category: "culture",
      location: "Austin, TX",
      date: "November 2023",
      image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&auto=format&fit=crop&w=2069&q=80"
    },
    {
      id: 7,
      title: "Annual Retreat",
      category: "events",
      location: "Maldives",
      date: "October 2023",
      image: "https://images.unsplash.com/photo-1519677100203-a0e668c92439?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
    },
    {
      id: 8,
      title: "Team Meeting",
      category: "culture",
      location: "Remote",
      date: "September 2023",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
    },
    {
      id: 9,
      title: "Client Meeting",
      category: "events",
      location: "Dubai, UAE",
      date: "August 2023",
      image: "https://images.unsplash.com/photo-1552581234-26160f608093?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
    }
  ];

  const categories = ['all', 'events', 'culture', 'destinations'];
  
  const filteredItems = selectedCategory === 'all' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === selectedCategory);

  return (
    <GallerySection>
      <FloatingBalloonsGlobal count={5} opacity={0.3} />
      <Container>
        <HeroSection>
          <HeroTitle
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Our Gallery
          </HeroTitle>
          <HeroSubtitle
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Explore our journey through photos of events, team culture, and travel destinations
          </HeroSubtitle>
        </HeroSection>

        <FilterButtons>
          {categories.map((category) => (
            <FilterButton
              key={category}
              active={selectedCategory === category}
              onClick={() => setSelectedCategory(category)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </FilterButton>
          ))}
        </FilterButtons>

        <GalleryGrid>
          {filteredItems.map((item, index) => (
            <GalleryItem
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              onClick={() => setSelectedImage(item)}
            >
              <GalleryImage src={item.image} alt={item.title} />
              <Overlay className="overlay">
                <ImageTitle>{item.title}</ImageTitle>
                <ImageDetails>
                  <FaMapMarkerAlt /> {item.location}
                </ImageDetails>
                <ImageDetails>
                  <FaCalendarAlt /> {item.date}
                </ImageDetails>
              </Overlay>
            </GalleryItem>
          ))}
        </GalleryGrid>

        {selectedImage && (
          <Modal
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
          >
            <ModalContent onClick={(e) => e.stopPropagation()}>
              <CloseButton onClick={() => setSelectedImage(null)}>
                <FaTimes />
              </CloseButton>
              <ModalImage src={selectedImage.image} alt={selectedImage.title} />
              <div style={{ padding: '1rem', background: 'white', borderRadius: '0 0 1rem 1rem' }}>
                <h3 style={{ marginBottom: '0.5rem' }}>{selectedImage.title}</h3>
                <div style={{ display: 'flex', gap: '1rem', color: '#6b7280', fontSize: '0.9rem' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                    <FaMapMarkerAlt /> {selectedImage.location}
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                    <FaCalendarAlt /> {selectedImage.date}
                  </span>
                </div>
              </div>
            </ModalContent>
          </Modal>
        )}
      </Container>
    </GallerySection>
  );
};

export default Gallery;
