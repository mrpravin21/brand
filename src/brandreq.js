import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Grid, Box } from '@mui/material';
import { styled } from '@mui/system';

const FormWrapper = styled(Box)(({ theme }) => ({
  width: '100%',
  maxWidth: '600px',
  margin: '0 auto',
  padding: '40px',
  backgroundColor: '#ffffff',
  borderRadius: '25px',
  boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.1)',
  [theme.breakpoints.down('sm')]: {
    width: '90%',
    padding: '20px',
  },
}));

const SubmitButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#1976D2',
  color: '#ffffff',
  width: '100%',
  padding: '14px 20px',
  borderRadius: '8px',
  '&:hover': {
    backgroundColor: '#1565C0',
  },
}));

const Brandreq = () => {
  const [brandName, setBrandName] = useState('');
  const [businessType, setBusinessType] = useState('');
  const [targetCustomer, setTargetCustomer] = useState('');
  const [customerRange, setCustomerRange] = useState('');
  const [campaignGoal, setCampaignGoal] = useState('');
  const [budget, setBudget] = useState('');
  const [platformPreference, setPlatformPreference] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = {
      brandName,
      businessType,
      targetCustomer,
      customerRange,
      campaignGoal,
      budget,
      platformPreference,
    };

    console.log('Form Data Submitted:', formData);

    setMessage('Requirement submitted successfully!');
  };

  return (
    <Container sx={{ maxWidth: '100%', padding: '2rem 0', display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', background: 'linear-gradient(135deg, #eaf3fc, #fdeef1)' }}>
      <FormWrapper>
        <Typography variant="h4" align="center" sx={{ color: '#1976D2', marginBottom: 3 }}>
          Fill Requirement Page
        </Typography>
        <Typography variant="body1" align="center" sx={{ marginBottom: 4 }}>
          Here you can fill your brand's influencer requirements.
        </Typography>

        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Brand Name"
                variant="outlined"
                value={brandName}
                onChange={(e) => setBrandName(e.target.value)}
                required
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Type of Business"
                variant="outlined"
                value={businessType}
                onChange={(e) => setBusinessType(e.target.value)}
                required
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Targeted Customer"
                variant="outlined"
                value={targetCustomer}
                onChange={(e) => setTargetCustomer(e.target.value)}
                required
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Range of Customers"
                variant="outlined"
                value={customerRange}
                onChange={(e) => setCustomerRange(e.target.value)}
                required
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Campaign Goal"
                variant="outlined"
                multiline
                rows={4}
                value={campaignGoal}
                onChange={(e) => setCampaignGoal(e.target.value)}
                required
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Budget for Campaign"
                variant="outlined"
                type="number"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                required
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Preferred Social Media Platform(s)"
                variant="outlined"
                value={platformPreference}
                onChange={(e) => setPlatformPreference(e.target.value)}
                required
              />
            </Grid>

            <Grid item xs={12}>
              <SubmitButton variant="contained" type="submit">
                Submit Requirement
              </SubmitButton>
            </Grid>
          </Grid>
        </form>

        {message && (
          <Box sx={{ marginTop: 2, textAlign: 'center' }}>
            <Typography variant="body1" sx={{ color: '#4caf50' }}>
              {message}
            </Typography>
          </Box>
        )}
      </FormWrapper>
    </Container>
  );
}

export default Brandreq;
