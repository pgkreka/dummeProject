import React, { useState } from 'react';
import { Button, Container, List, ListItem, Typography } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const isPDF = (file) => {
  return new Promise<void>((resolve, reject) => {
    const reader = new FileReader();

    // Set up an event listener for when the file reading is done
    reader.onloadend = () => {
      const arr = new Uint8Array(reader.result as ArrayBuffer).subarray(0, 4);
      const header = Array.from(arr).map((byte) => byte.toString(16)).join('');

      if (header === '25504446') {
        // Resolve the promise if it's a PDF
        resolve();
      } else {
        // Reject the promise if it's not a PDF
        reject(new Error('Invalid file type. Please select a PDF document.'));
      }
    };

    // Read the first 5 bytes
    const blobSlice = file.slice(0, 5);
    reader.readAsArrayBuffer(blobSlice);
  });
};

const FileUpload = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [error, setError] = useState(null);

  const handleFileChange = async (event) => {
    try {
      const files = event.target.files;
      const newFiles = Array.from(files);

      // Validate each file for PDF format
      for (const file of newFiles) {
        await isPDF(file);
      }
      setSelectedFiles((prevFiles) => [...prevFiles, ...newFiles]);
      setError(null);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleUpload = () => {
    // Handle file upload
    if (selectedFiles.length > 0) {
      console.log('Uploading files:', selectedFiles);
    } else {
      console.error('No files selected');
    }
  };

  const handleRemove = (index) => {
    const newFiles = [...selectedFiles];
    newFiles.splice(index, 1);
    setSelectedFiles(newFiles);
  };

  return (
    <Container>
      <Typography variant="h5" gutterBottom>
        File Upload
      </Typography>
      <input
        style={{ display: 'none' }}
        id="contained-button-files"
        type="file"
        multiple
        onChange={handleFileChange}
      />
      <label htmlFor="contained-button-files">
        <Button variant="contained" component="span">
          Select Files
        </Button>
      </label>
      <Typography variant="body1" style={{ marginTop: '1rem' }}>
        {error && <div style={{ color: 'red' }}>{error}</div>}
        {selectedFiles.length > 0 && <strong>Selected Files:</strong>}
        <List>
          {selectedFiles.map((file, index) => (
            <ListItem key={index}>
              {file.name}
              <Button
                variant="outlined"
                color="secondary"
                size="small"
                onClick={() => handleRemove(index)}
                style={{ marginLeft: '1rem' }}
              >
                Remove
              </Button>
            </ListItem>
          ))}
        </List>
      </Typography>
      <Button
        variant="contained"
        color="primary"
        style={{ marginTop: '1rem', display: 'none'}}
        component="span"
        startIcon={<CloudUploadIcon />}
        onClick={handleUpload}
      >
        Submit
      </Button>
    </Container>
  );
};

export default FileUpload;