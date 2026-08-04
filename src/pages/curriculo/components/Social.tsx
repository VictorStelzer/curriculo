import React from 'react';

import { styles } from '../curriculo.styles';

import { Box, Icon, Text, TextButton } from '@/components';

import { GitHub, Instagram, LinkedIn } from '@mui/icons-material';

export const Social: React.FC = () => {
    const socials = [
        {
            icon: <LinkedIn />,
            url: 'https://www.linkedin.com/in/victor-stelzer-machado-6b8a43253/',
            text: '@VictorStelzerMachado'
        },
        {
            icon: <GitHub />,
            url: 'https://github.com/VictorStelzer',
            text: '@VictorStelzer'
        },
        {
            icon: <Instagram />,
            url: 'https://instagram.com/victorsm.dev',
            text: '@victorsm.dev'
        }
    ];

    return (
        <Box>
            <Text sx={styles.title}>Redes Sociais</Text>

            <Box column gap={1}>
                {socials.map((social, index) => (
                    <Box key={index} row alignItems gap={1}>
                        <Icon color='text.primary' size={18} icon={social.icon} />
                        <TextButton color='textPrimary' href={social.url}>
                            {social.text}
                        </TextButton>
                    </Box>
                ))}
            </Box>
        </Box>
    )
}