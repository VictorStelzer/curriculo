import { Box, Drawer, Icon, Text, TextButton } from '@/components';
import { Home, Person, School, ViewList, Widgets, Work, WorkspacePremium } from '@mui/icons-material';
import React from 'react';

export const Footer: React.FC = () => {
    const navs = [
        { id: 'home', name: 'Home', icon: <Home /> },
        { id: 'profile', name: 'Sobre', icon: <Person /> },
        { id: 'education', name: 'Educação', icon: <School /> },
        { id: 'skills', name: 'Skills', icon: <ViewList /> },
        { id: 'experience', name: 'Jobs', icon: <Work /> },
        { id: 'certificates', name: 'Certificados', icon: <WorkspacePremium /> },
    ]

    const scrollToSection = (id: string) => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    }

    return (
        <Box hideUp='md' position="fixed" bottom={0} left={0} width="100%" zIndex={100} bgcolor="background.paper" shadow row between alignItems="center" px={3} sx={{ height: 48 }}>
            <TextButton color='textPrimary' variant='subtitle1'>Victor</TextButton>

            <Drawer
                location="bottom"
                icon={<Icon color='text.primary' size={24} icon={<Widgets />} />}
                slotProps={{ paper: { sx: { borderRadius: '1rem 1rem 0 0', p: '2rem 1.5rem' } } }}
            >
                <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 3 }}>
                    {navs.map((nav, index) => (
                        <Box key={index} column center gap={0.5} onClick={() => scrollToSection(nav.id)}>
                            <Icon color='text.primary' size={22} icon={nav.icon} />
                            <Text variant='subtitle2'>{nav.name}</Text>
                        </Box>
                    ))}
                </Box>
            </Drawer>
        </Box>
    )
}
