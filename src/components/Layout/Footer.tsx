import React from 'react';
import {
    Box,
    Container,
    Grid,
    Typography,
    Link,
    Stack,
    IconButton,
    Divider,
} from '@mui/material';
import {
    Facebook,
    Twitter,
    Instagram,
    LinkedIn,
} from '@mui/icons-material';

const footerSections = [
    {
        title: 'Company',
        links: [
            { text: 'About Us', href: '#' },
            { text: 'Contact', href: '#' },
            { text: 'Careers', href: '#' },
            { text: 'Blog', href: '#' },
        ],
    },
    {
        title: 'Services',
        links: [
            { text: 'Grooming', href: '#' },
            { text: 'Training', href: '#' },
            { text: 'Daycare', href: '#' },
            { text: 'Boarding', href: '#' },
        ],
    },
    {
        title: 'Support',
        links: [
            { text: 'Help Center', href: '#' },
            { text: 'Privacy Policy', href: '#' },
            { text: 'Terms of Service', href: '#' },
            { text: 'FAQs', href: '#' },
        ],
    },
];

const socialLinks = [
    { icon: <Facebook />, href: '#', label: 'Facebook' },
    { icon: <Twitter />, href: '#', label: 'Twitter' },
    { icon: <Instagram />, href: '#', label: 'Instagram' },
    { icon: <LinkedIn />, href: '#', label: 'LinkedIn' },
];

export const Footer: React.FC = () => {
    const year = new Date().getFullYear();

    return (
        <Box
            component="footer"
            sx={{
                bgcolor: 'background.paper',
                py: 6,
                mt: 'auto',
                borderTop: 1,
                borderColor: 'divider',
            }}
        >
            <Container maxWidth="lg">
                <Grid container spacing={4} justifyContent="space-between">
                    {footerSections.map((section) => (
                        <Grid item xs={12} sm={4} key={section.title}>
                            <Typography
                                variant="h6"
                                color="text.primary"
                                gutterBottom
                            >
                                {section.title}
                            </Typography>
                            <Stack spacing={1}>
                                {section.links.map((link) => (
                                    <Link
                                        key={link.text}
                                        href={link.href}
                                        variant="body2"
                                        color="text.secondary"
                                        underline="hover"
                                    >
                                        {link.text}
                                    </Link>
                                ))}
                            </Stack>
                        </Grid>
                    ))}
                </Grid>

                <Divider sx={{ my: 4 }} />

                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: { xs: 'column', sm: 'row' },
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        gap: 2,
                    }}
                >
                    <Typography
                        variant="body2"
                        color="text.secondary"
                        align="center"
                    >
                        © {year} Pet Grooming Business Manager. All rights reserved.
                    </Typography>

                    <Stack direction="row" spacing={1}>
                        {socialLinks.map((social) => (
                            <IconButton
                                key={social.label}
                                href={social.href}
                                aria-label={social.label}
                                color="inherit"
                                size="small"
                            >
                                {social.icon}
                            </IconButton>
                        ))}
                    </Stack>
                </Box>
            </Container>
        </Box>
    );
}; 