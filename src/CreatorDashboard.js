import React from 'react';
import { Container, Grid, Card, CardContent, Typography, Button, Box, Avatar, TextField, Rating } from '@mui/material';
import { styled } from '@mui/system';

const DashboardContainer = styled(Box)(({ theme }) => ({
  padding: '2rem',
  background: 'linear-gradient(135deg, #e3f2fd, #fce4ec)',
  minHeight: '100vh',
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  marginBottom: '1rem',
  color: '#1976D2',
}));

const PastCampaignCard = styled(Card)(({ theme }) => ({
  marginBottom: '1rem',
  background: '#ffffff',
  boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
  borderRadius: '10px',
}));

const ProfileCard = styled(Card)(({ theme }) => ({
  background: '#ffffff',
  padding: '1rem',
  borderRadius: '10px',
  boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
  textAlign: 'center',
}));

const ActionButton = styled(Button)(({ theme }) => ({
  marginTop: '1rem',
  backgroundColor: '#1976D2',
  color: '#ffffff',
  '&:hover': {
    backgroundColor: '#1565C0',
  },
}));

const CreatorDashboard = () => {
  const pastCampaigns = [
    { id: 1, name: 'Summer Fashion Campaign', date: '2024-06-15', brand: 'FashionHub', outcome: 'Completed' },
    { id: 2, name: 'Tech Launch Campaign', date: '2024-08-01', brand: 'TechWorld', outcome: 'Completed' },
  ];

  return (
    <DashboardContainer>
      <Container>
        <Grid container spacing={3}>
          {/* Profile Overview */}
          <Grid item xs={12} md={4}>
            <ProfileCard>
              <Avatar sx={{ width: 80, height: 80, margin: '0 auto' }}>C</Avatar>
              <Typography variant="h5" sx={{ marginTop: 2 }}>
                Creator Name
              </Typography>
              <Typography variant="body1" color="textSecondary">
                Follower Count: 25k
              </Typography>
              <Typography variant="body1" color="textSecondary">
                Engagement Rate: 4.5%
              </Typography>
              <Typography variant="body1" color="textSecondary">
                Preferred Niche: Fashion, Technology
              </Typography>
              <ActionButton>Update Profile</ActionButton>
            </ProfileCard>
          </Grid>

          {/* Main Dashboard Content */}
          <Grid item xs={12} md={8}>
            {/* Past Campaigns */}
            <SectionTitle variant="h6">Past Campaigns</SectionTitle>
            {pastCampaigns.map((campaign) => (
              <PastCampaignCard key={campaign.id}>
                <CardContent>
                  <Typography variant="h6">{campaign.name}</Typography>
                  <Typography variant="body2" color="textSecondary">
                    Date: {campaign.date}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Brand: {campaign.brand}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Outcome: {campaign.outcome}
                  </Typography>
                </CardContent>
              </PastCampaignCard>
            ))}

            {/* Rate the Brand */}
            <SectionTitle variant="h6">Rate the Brand</SectionTitle>
            <Card sx={{ padding: '1rem', marginBottom: '2rem' }}>
              <Typography variant="body1" sx={{ marginBottom: 2 }}>
                Provide feedback on your recent brand collaborations.
              </Typography>
              <TextField
                fullWidth
                label="Brand Name"
                variant="outlined"
                sx={{ marginBottom: 2 }}
              />
              <TextField
                fullWidth
                label="Your Feedback"
                multiline
                rows={4}
                variant="outlined"
                sx={{ marginBottom: 2 }}
              />
              <Box display="flex" alignItems="center" gap={1} sx={{ marginBottom: 2 }}>
                <Typography variant="body1">Rate:</Typography>
                <Rating defaultValue={0} precision={0.5} />
              </Box>
              <ActionButton>Submit Feedback</ActionButton>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </DashboardContainer>
  );
};

export default CreatorDashboard;
