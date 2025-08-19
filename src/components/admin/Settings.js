import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaSave, FaUser, FaLock, FaPalette, FaBell } from 'react-icons/fa';

const Container = styled.div`
  padding: 20px;
  max-width: 800px;
`;

const Title = styled.h1`
  color: #333;
  margin-bottom: 30px;
`;

const SettingsSection = styled(motion.div)`
  background: white;
  padding: 25px;
  border-radius: 15px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
`;

const SectionTitle = styled.h2`
  color: #333;
  margin: 0 0 20px 0;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  color: #555;
  font-weight: 600;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 16px;
  transition: border-color 0.3s;

  &:focus {
    outline: none;
    border-color: #667eea;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 16px;
  min-height: 100px;
  resize: vertical;
  transition: border-color 0.3s;

  &:focus {
    outline: none;
    border-color: #667eea;
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 16px;
  transition: border-color 0.3s;

  &:focus {
    outline: none;
    border-color: #667eea;
  }
`;

const ToggleGroup = styled.div`
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
`;

const ToggleItem = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Toggle = styled.input`
  width: 50px;
  height: 25px;
  appearance: none;
  background: #ddd;
  border-radius: 25px;
  position: relative;
  cursor: pointer;
  transition: background 0.3s;

  &:checked {
    background: #667eea;
  }

  &:checked::before {
    transform: translateX(25px);
  }

  &::before {
    content: '';
    position: absolute;
    width: 20px;
    height: 20px;
    background: white;
    border-radius: 50%;
    top: 2.5px;
    left: 2.5px;
    transition: transform 0.3s;
  }
`;

const SaveButton = styled(motion.button)`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 12px 30px;
  border-radius: 25px;
  cursor: pointer;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 10px;
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-2px);
  }
`;

const Settings = () => {
  const [settings, setSettings] = useState({
    siteName: 'Travel & Expense',
    siteDescription: 'Your trusted travel partner',
    adminEmail: 'admin@example.com',
    notifications: {
      newContact: true,
      newApplication: true,
      systemUpdates: true,
    },
    appearance: {
      theme: 'light',
      accentColor: '#667eea',
    },
    security: {
      twoFactorAuth: false,
      sessionTimeout: 30,
    },
  });

  const handleChange = (section, field, value) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  const handleSave = () => {
    // Save settings to backend
    console.log('Settings saved:', settings);
    alert('Settings saved successfully!');
  };

  return (
    <Container>
      <Title>Settings</Title>

      <SettingsSection
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <SectionTitle>
          <FaUser />
          General Settings
        </SectionTitle>
        <FormGroup>
          <Label>Site Name</Label>
          <Input
            type="text"
            value={settings.siteName}
            onChange={(e) => setSettings(prev => ({ ...prev, siteName: e.target.value }))}
          />
        </FormGroup>
        <FormGroup>
          <Label>Site Description</Label>
          <TextArea
            value={settings.siteDescription}
            onChange={(e) => setSettings(prev => ({ ...prev, siteDescription: e.target.value }))}
          />
        </FormGroup>
        <FormGroup>
          <Label>Admin Email</Label>
          <Input
            type="email"
            value={settings.adminEmail}
            onChange={(e) => setSettings(prev => ({ ...prev, adminEmail: e.target.value }))}
          />
        </FormGroup>
      </SettingsSection>

      <SettingsSection
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <SectionTitle>
          <FaBell />
          Notifications
        </SectionTitle>
        <ToggleGroup>
          <ToggleItem>
            <Toggle
              type="checkbox"
              checked={settings.notifications.newContact}
              onChange={(e) => handleChange('notifications', 'newContact', e.target.checked)}
            />
            <Label>New Contact Messages</Label>
          </ToggleItem>
          <ToggleItem>
            <Toggle
              type="checkbox"
              checked={settings.notifications.newApplication}
              onChange={(e) => handleChange('notifications', 'newApplication', e.target.checked)}
            />
            <Label>New Job Applications</Label>
          </ToggleItem>
          <ToggleItem>
            <Toggle
              type="checkbox"
              checked={settings.notifications.systemUpdates}
              onChange={(e) => handleChange('notifications', 'systemUpdates', e.target.checked)}
            />
            <Label>System Updates</Label>
          </ToggleItem>
        </ToggleGroup>
      </SettingsSection>

      <SettingsSection
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <SectionTitle>
          <FaPalette />
          Appearance
        </SectionTitle>
        <FormGroup>
          <Label>Theme</Label>
          <Select
            value={settings.appearance.theme}
            onChange={(e) => handleChange('appearance', 'theme', e.target.value)}
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
            <option value="auto">Auto</option>
          </Select>
        </FormGroup>
        <FormGroup>
          <Label>Accent Color</Label>
          <Input
            type="color"
            value={settings.appearance.accentColor}
            onChange={(e) => handleChange('appearance', 'accentColor', e.target.value)}
          />
        </FormGroup>
      </SettingsSection>

      <SettingsSection
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <SectionTitle>
          <FaLock />
          Security
        </SectionTitle>
        <ToggleGroup>
          <ToggleItem>
            <Toggle
              type="checkbox"
              checked={settings.security.twoFactorAuth}
              onChange={(e) => handleChange('security', 'twoFactorAuth', e.target.checked)}
            />
            <Label>Two-Factor Authentication</Label>
          </ToggleItem>
        </ToggleGroup>
        <FormGroup>
          <Label>Session Timeout (minutes)</Label>
          <Input
            type="number"
            min="5"
            max="120"
            value={settings.security.sessionTimeout}
            onChange={(e) => handleChange('security', 'sessionTimeout', parseInt(e.target.value))}
          />
        </FormGroup>
      </SettingsSection>

      <SaveButton
        onClick={handleSave}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <FaSave />
        Save Settings
      </SaveButton>
    </Container>
  );
};

export default Settings;
