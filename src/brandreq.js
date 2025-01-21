import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Grid, Box } from '@mui/material';
import { styled } from '@mui/system';

const FormWrapper = styled(Box)(({ theme }) => ({
  width: '100%',
  maxWidth: '800px', // Adjust width for better responsiveness
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
  const [additionalDetails, setAdditionalDetails] = useState('');
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
      additionalDetails,
    };

    console.log('Form Data Submitted:', formData);
    setMessage('Requirement submitted successfully!');
  };

  return (
    <Container sx={{ maxWidth: '100%', padding: '2rem 0', display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', background: 'linear-gradient(135deg, #eaf3fc, #fdeef1)' }}>
      <FormWrapper>
        <Typography variant="h4" align="center" sx={{ color: '#1976D2', marginBottom: 3 }}>
          Brand Campaign Requirement
        </Typography>
        <Typography variant="body1" align="center" sx={{ marginBottom: 4, color: '#555' }}>
          Fill out the information to connect with the right influencers for your campaign.
        </Typography>

        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            {/* Brand Name */}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Brand Name"
                variant="outlined"
                value={brandName}
                onChange={(e) => setBrandName(e.target.value)}
                required
              />
            </Grid>

            {/* Business Type */}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Type of Business"
                variant="outlined"
                value={businessType}
                onChange={(e) => setBusinessType(e.target.value)}
                required
              />
            </Grid>

            {/* Target Customer */}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Target Customer"
                variant="outlined"
                value={targetCustomer}
                onChange={(e) => setTargetCustomer(e.target.value)}
                required
              />
            </Grid>

            {/* Customer Range */}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Range of Customers"
                variant="outlined"
                value={customerRange}
                onChange={(e) => setCustomerRange(e.target.value)}
                required
              />
            </Grid>

            {/* Campaign Goal */}
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

            {/* Budget */}
            <Grid item xs={12} sm={6}>
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

            {/* Preferred Social Media Platform */}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Preferred Social Media Platform(s)"
                variant="outlined"
                value={platformPreference}
                onChange={(e) => setPlatformPreference(e.target.value)}
                required
              />
            </Grid>

            {/* Additional Details */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Additional Campaign Details"
                variant="outlined"
                multiline
                rows={6}
                value={additionalDetails}
                onChange={(e) => setAdditionalDetails(e.target.value)}
                required
              />
            </Grid>

            <Grid item xs={12}>
              <SubmitButton variant="contained" type="submit">
                Submit Campaign Requirement
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

      {/* Filler Content for Screen Balance */}
      <Box sx={{ padding: '50px', textAlign: 'center', backgroundColor: '#f7f7f7', borderRadius: '15px', marginTop: '30px' }}>
        <Typography variant="h6" sx={{ color: '#1976D2', fontWeight: 'bold' }}>
          Connect with the Right Influencers for Your Campaign
        </Typography>
        <Typography variant="body1" sx={{ marginTop: '20px', color: '#555' }}>
          By filling out the form above, you're taking the first step toward collaborating with the right influencers to make your campaign a success.
        </Typography>
      </Box>
    </Container>
  );
};

export default Brandreq;

