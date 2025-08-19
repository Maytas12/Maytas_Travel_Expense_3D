import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaUpload, FaTrash, FaEdit, FaPlus } from 'react-icons/fa';

const Container = styled.div`
  padding: 20px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
`;

const Title = styled.h1`
  color: #333;
  margin: 0;
`;

const UploadButton = styled(motion.button)`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 25px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 600;
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-2px);
  }
`;

const GalleryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
`;

const ImageCard = styled(motion.div)`
  background: white;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
`;

const Image = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const ImageInfo = styled.div`
  padding: 15px;
`;

const ImageTitle = styled.h3`
  margin: 0 0 5px 0;
  color: #333;
  font-size: 1.1rem;
`;

const ImageDate = styled.p`
  margin: 0;
  color: #666;
  font-size: 0.9rem;
`;

const ImageActions = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px 15px;
  background: #f8f9fa;
`;

const ActionButton = styled(motion.button)`
  background: none;
  border: none;
  cursor: pointer;
  padding: 5px;
  font-size: 1.2rem;
  transition: color 0.3s;

  &.edit {
    color: #667eea;
    &:hover {
      color: #764ba2;
    }
  }

  &.delete {
    color: #ff6b6b;
    &:hover {
      color: #ee5a24;
    }
  }
`;

const Modal = styled(motion.div)`
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
`;

const ModalContent = styled(motion.div)`
  background: white;
  padding: 30px;
  border-radius: 15px;
  width: 90%;
  max-width: 500px;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  color: #333;
  font-weight: 600;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 16px;
`;

const FileInput = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
  justify-content: flex-end;
  margin-top: 20px;
`;

const Button = styled(motion.button)`
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: 600;

  &.primary {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
  }

  &.secondary {
    background: #f0f0f0;
    color: #333;
  }
`;

const GalleryManager = () => {
  const [images, setImages] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingImage, setEditingImage] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    file: null
  });

  useEffect(() => {
    // Fetch gallery images from API or use sample data
    const sampleImages = [
      {
        id: 1,
        title: 'Office Building',
        description: 'Modern office space',
        url: 'https://via.placeholder.com/300x200/667eea/ffffff?text=Office',
        date: '2024-01-15'
      },
      {
        id: 2,
        title: 'Team Meeting',
        description: 'Team collaboration session',
        url: 'https://via.placeholder.com/300x200/764ba2/ffffff?text=Team',
        date: '2024-01-14'
      },
      {
        id: 3,
        title: 'Product Launch',
        description: 'New product announcement',
        url: 'https://via.placeholder.com/300x200/ff6b6b/ffffff?text=Launch',
        date: '2024-01-13'
      },
    ];
    setImages(sampleImages);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (editingImage) {
      // Update existing image
      setImages(images.map(img => 
        img.id === editingImage.id 
          ? { ...img, title: formData.title, description: formData.description }
          : img
      ));
    } else {
      // Add new image
      const newImage = {
        id: Date.now(),
        title: formData.title,
        description: formData.description,
        url: formData.file ? URL.createObjectURL(formData.file) : 'https://via.placeholder.com/300x200/667eea/ffffff?text=New',
        date: new Date().toISOString().split('T')[0]
      };
      setImages([...images, newImage]);
    }

    setShowModal(false);
    setEditingImage(null);
    setFormData({ title: '', description: '', file: null });
  };

  const handleEdit = (image) => {
    setEditingImage(image);
    setFormData({ title: image.title, description: image.description, file: null });
    setShowModal(true);
  };

  const handleDelete = (id) => {
    setImages(images.filter(img => img.id !== id));
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'file' ? files[0] : value
    }));
  };

  return (
    <Container>
      <Header>
        <Title>Gallery Manager</Title>
        <UploadButton
          onClick={() => setShowModal(true)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <FaPlus />
          Add Image
        </UploadButton>
      </Header>

      <GalleryGrid>
        {images.map((image) => (
          <ImageCard
            key={image.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <Image src={image.url} alt={image.title} />
            <ImageInfo>
              <ImageTitle>{image.title}</ImageTitle>
              <ImageDate>{image.description}</ImageDate>
            </ImageInfo>
            <ImageActions>
              <ActionButton
                className="edit"
                onClick={() => handleEdit(image)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <FaEdit />
              </ActionButton>
              <ActionButton
                className="delete"
                onClick={() => handleDelete(image.id)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <FaTrash />
              </ActionButton>
            </ImageActions>
          </ImageCard>
        ))}
      </GalleryGrid>

      {showModal && (
        <Modal
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setShowModal(false)}
        >
          <ModalContent
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.8 }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2>{editingImage ? 'Edit Image' : 'Add New Image'}</h2>
            <form onSubmit={handleSubmit}>
              <FormGroup>
                <Label>Title</Label>
                <Input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label>Description</Label>
                <Input
                  type="text"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                />
              </FormGroup>
              {!editingImage && (
                <FormGroup>
                  <Label>Upload Image</Label>
                  <FileInput
                    type="file"
                    name="file"
                    accept="image/*"
                    onChange={handleChange}
                  />
                </FormGroup>
              )}
              <ButtonGroup>
                <Button
                  type="button"
                  className="secondary"
                  onClick={() => {
                    setShowModal(false);
                    setEditingImage(null);
                    setFormData({ title: '', description: '', file: null });
                  }}
                >
                  Cancel
                </Button>
                <Button type="submit" className="primary">
                  {editingImage ? 'Update' : 'Upload'}
                </Button>
              </ButtonGroup>
            </form>
          </ModalContent>
        </Modal>
      )}
    </Container>
  );
};

export default GalleryManager;
