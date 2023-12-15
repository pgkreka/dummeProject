import React, { useState } from 'react';

const FileUpload = () => {
  const [files, setFiles] = useState([]);

  const handleFileChange = (event) => {
    const selectedFiles = event.target.files;
    setFiles([...files, ...selectedFiles]);
  };

  const handleUpload = () => {
    if (files.length > 0) {
      // Create a FormData object and append each file to it
      const formData = new FormData();
      files.forEach((file, index) => {
        formData.append(`file${index + 1}`, file);
      });
      // For this example, we'll just log the formData to the console
      console.log('FormData:', formData);
    } else {
      console.error('No files selected');
    }
  };

  return (
    <div>
      <h2>Attached files</h2>
      <input type="file" onChange={handleFileChange} multiple />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default FileUpload;