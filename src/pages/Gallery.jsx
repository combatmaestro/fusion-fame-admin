
import React, { useState } from 'react';
import { Typography, Button, Grid, Card, CardMedia } from '@mui/material';

const Gallery = () => {
  const [images, setImages] = useState([]);

  const handleUpload = (e) => {
    const files = Array.from(e.target.files);
    const urls = files.map(file => URL.createObjectURL(file));
    setImages((prev) => [...prev, ...urls]);
  };

  return (
    <>
      <Typography variant="h4" gutterBottom>Gallery</Typography>
      <Button variant="contained" component="label">
        Upload Images
        <input type="file" hidden multiple onChange={handleUpload} />
      </Button>
      <Grid container spacing={2} mt={2}>
        {images.map((src, i) => (
          <Grid item key={i} xs={6} md={3}>
            <Card>
              <CardMedia component="img" height="140" image={src} alt="Uploaded" />
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default Gallery;
